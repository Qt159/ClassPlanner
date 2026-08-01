package com.tuan.classplanner.service;

import com.tuan.classplanner.dto.DashboardResponse;
import com.tuan.classplanner.dto.StudentTeachingSummary;
import com.tuan.classplanner.dto.TeachingSessionResponse;
import com.tuan.classplanner.model.SessionStatus;
import com.tuan.classplanner.model.Student;
import com.tuan.classplanner.model.TeachingSession;
import com.tuan.classplanner.repository.StudentRepository;
import com.tuan.classplanner.repository.TeachingSessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DashboardService {

    private final StudentRepository studentRepository;
    private final TeachingSessionRepository teachingSessionRepository;

    public DashboardService(StudentRepository studentRepository,
                            TeachingSessionRepository teachingSessionRepository) {
        this.studentRepository = studentRepository;
        this.teachingSessionRepository = teachingSessionRepository;
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        List<Student> students = studentRepository.findAll();
        LocalDateTime monthStart = LocalDateTime.now()
                .withDayOfMonth(1)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);
        LocalDateTime monthEnd = monthStart.plusMonths(1).minusSeconds(1);
        List<TeachingSession> completedSessions =
                teachingSessionRepository.findByStartTimeBetweenAndStatus(
                        monthStart,
                        monthEnd,
                        SessionStatus.COMPLETED);
        int totalCompletedSessions = completedSessions.size();
        List<StudentTeachingSummary> summaries = new ArrayList<>();
        for(Student student : students) {
            int count = 0;
            for(TeachingSession session : completedSessions) {
                if(session.getStudent().getId().equals(student.getId())) {
                    count++;
                }
            }
            summaries.add(
                    StudentTeachingSummary.builder()
                            .studentId(student.getId())
                            .studentName(student.getName())
                            .totalSessions(count)
                            .build()
            );
        }

        LocalDateTime weekStart = LocalDateTime.now()
                .with(java.time.DayOfWeek.MONDAY)
                .withHour(0)
                .withMinute(0)
                .withSecond(0);

        LocalDateTime weekEnd = weekStart.plusDays(6)
                .withHour(23)
                .withMinute(59)
                .withSecond(59);
        List<TeachingSession> weeklySessions = teachingSessionRepository.
                findByStartTimeBetweenOrderByStartTimeAsc(weekStart, weekEnd);
        List<TeachingSessionResponse> weeklyResponses = new ArrayList<>();

        for(TeachingSession session : weeklySessions) {
            weeklyResponses.add(mapToResponse(session));
        }


        return DashboardResponse.builder()
                .totalStudents(students.size())
                .totalCompletedSessions(totalCompletedSessions)
                .studentSummaries(summaries)
                .weeklySessions(weeklyResponses)
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