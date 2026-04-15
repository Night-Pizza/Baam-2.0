let csrfTokenCache: string | null = null;
let retry = false;

function getCookie(name: string): string | null {
    const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

async function ensureCsrfToken(): Promise<string> {
    if (csrfTokenCache) {
        return csrfTokenCache;
    }

    const fromCookie = getCookie("XSRF-TOKEN");
    if (fromCookie) {
        csrfTokenCache = fromCookie;
        return fromCookie;
    }

    const response = await fetch("http://localhost:8000/auth/csrf", {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("CSRF_BOOTSTRAP_FAILED");
    }

    const data = await response.json().catch(() => ({} as { token?: string }));
    const tokenFromResponse = typeof data.token === "string" ? data.token : null;
    const token = tokenFromResponse || getCookie("XSRF-TOKEN");

    if (!token) {
        throw new Error("CSRF_TOKEN_MISSING");
    }

    csrfTokenCache = token;
    return token;
}

export async function wrap(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const method = (init.method || "GET").toUpperCase();
  const needsCsrf = ["POST", "PUT", "PATCH", "DELETE"].includes(method);

  async function send(allowRetry: boolean): Promise<Response> {
    const headers = new Headers(init.headers);

    if (needsCsrf) {
      const token = await ensureCsrfToken();
      headers.set("X-CSRF-TOKEN", token);
    }

    const response = await fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });

    if (response.status === 401) {
      csrfTokenCache = null;
      throw new Error("UNAUTHORIZED");
    }

    if (response.status === 403 && needsCsrf && allowRetry) {
      csrfTokenCache = null;
      await ensureCsrfToken();
      return send(false);
    }

    return response;
  }

  return send(true);
}