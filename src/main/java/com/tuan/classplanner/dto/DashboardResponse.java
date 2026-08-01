package com.tuan.classplanner.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class DashboardResponse {
    private Integer totalStudents;
    private Integer totalCompletedSessions;
    private List<StudentTeachingSummary> studentSummaries;
    private List<TeachingSessionResponse> weeklySessions;
}