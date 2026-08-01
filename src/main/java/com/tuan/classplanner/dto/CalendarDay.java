package com.tuan.classplanner.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class CalendarDay {
    private LocalDate date;
    private String dayOfWeek;
    private List<TeachingSessionResponse> morningSessions;
    private List<TeachingSessionResponse> afternoonSessions;
    private List<TeachingSessionResponse> eveningSessions;
}