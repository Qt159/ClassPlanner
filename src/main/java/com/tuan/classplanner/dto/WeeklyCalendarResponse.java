package com.tuan.classplanner.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
public class WeeklyCalendarResponse {

    private LocalDate startDate;
    private LocalDate endDate;

    private List<CalendarDay> days;
}