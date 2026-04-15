package com.example.baam2.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SessionGpsCreateDTO(
        @NotBlank(message = "Session title cannot be null or empty")
        String title,

        @NotNull(message ="Session owner id cannot be null or empty")
        Long ownerId,

        @NotNull(message ="Latitude id cannot be null")
        Double latitude,

        @NotNull(message ="Longitude id cannot be null")
        Double longitude,

        @NotNull(message ="Session id cannot be null")
        Double allowedRadius
){}