package com.tuan.classplanner.dto;

import com.tuan.classplanner.model.SessionStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class TeachingSessionResponse {
    private Integer id;
    private Integer studentId;
    private String studentName;
    private String subject;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String customLocation;
    private String note;
    private SessionStatus status;
}