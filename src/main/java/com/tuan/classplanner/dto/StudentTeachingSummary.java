package com.tuan.classplanner.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudentTeachingSummary {
    private Integer studentId;
    private String studentName;
    private Integer totalSessions;
}