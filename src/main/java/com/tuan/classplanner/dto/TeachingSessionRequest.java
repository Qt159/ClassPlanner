package com.tuan.classplanner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TeachingSessionRequest {
    @NotNull(message = "Vui lòng chọn học viên")
    private Integer studentId;
    private String subject;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String customLocation;
    private String note;
}