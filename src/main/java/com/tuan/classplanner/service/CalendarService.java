package com.tuan.classplanner.service;

import com.tuan.classplanner.dto.CalendarDay;
import com.tuan.classplanner.dto.TeachingSessionResponse;
import com.tuan.classplanner.dto.WeeklyCalendarResponse;
import com.tuan.classplanner.model.TeachingSession;
import com.tuan.classplanner.repository.TeachingSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CalendarService {

    private final TeachingSessionRepository teachingSessionRepository;

    public CalendarService(TeachingSessionRepository teachingSessionRepository) {
        this.teachingSessionRepository = teachingSessionRepository;
    }
    @Transactional(readOnly = true)
    public WeeklyCalendarResponse getWeeklyCalendar(LocalDate date) {
        LocalDate anchor = (date != null) ? date : LocalDate.now();
        LocalDate monday = anchor.with(DayOfWeek.MONDAY);
        LocalDate sunday = monday.plusDays(6);
        List<TeachingSession> sessions =
                teachingSessionRepository.findByStartTimeBetweenOrderByStartTimeAsc(
                        monday.atStartOfDay(),
                        sunday.atTime(23,59,59)
                );
        List<CalendarDay> days = new ArrayList<>();
        for(int i = 0; i < 7; i++) {
            LocalDate dayDate = monday.plusDays(i);
            List<TeachingSessionResponse> morning = new ArrayList<>();
            List<TeachingSessionResponse> afternoon = new ArrayList<>();
            List<TeachingSessionResponse> evening = new ArrayList<>();
            for(TeachingSession session : sessions) {
                if(session.getStartTime().toLocalDate().equals(dayDate)) {
                    int hour = session.getStartTime().getHour();
                    if(hour < 12) {
                        morning.add(mapToResponse(session));
                    }
                    else if(hour < 18) {
                        afternoon.add(mapToResponse(session));
                    }
                    else {
                        evening.add(mapToResponse(session));
                    }
                }
            }
            days.add(
                    CalendarDay.builder()
                            .date(dayDate)
                            .dayOfWeek(dayDate.getDayOfWeek().toString())
                            .morningSessions(morning)
                            .afternoonSessions(afternoon)
                            .eveningSessions(evening)
                            .build()
            );
        }
        return WeeklyCalendarResponse.builder()
                .startDate(monday)
                .endDate(sunday)
                .days(days)
                .build();
    }
    private TeachingSessionResponse mapToResponse(TeachingSession session) {
        return TeachingSessionResponse.builder()
                .id(session.getId())
                .studentId(session.getStudent().getId())
                .studentName(session.getStudent().getName())
                .subject(session.getSubject())
                .startTime(session.getStartTime())
                .endTime(session.getEndTime())
                .customLocation(session.getCustomLocation())
                .note(session.getNote())
                .status(session.getStatus())
                .build();
    }
}