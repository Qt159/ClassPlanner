package com.tuan.classplanner.controller;

import com.tuan.classplanner.dto.WeeklyCalendarResponse;
import com.tuan.classplanner.service.CalendarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
public class CalendarController {
    private final CalendarService calendarService;
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    /**
     * Lấy lịch theo tuần. Nếu không truyền date thì lấy tuần hiện tại.
     * @param date  Bất kỳ ngày nào trong tuần muốn xem, format: yyyy-MM-dd (optional)
     */
    @GetMapping("/week")
    public ResponseEntity<WeeklyCalendarResponse> getWeeklyCalendar(
            @RequestParam(required = false) @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) java.time.LocalDate date) {
        return ResponseEntity.ok(
                calendarService.getWeeklyCalendar(date)
        );
    }
}