package com.tuan.classplanner.service;

import com.tuan.classplanner.dto.TeachingSessionRequest;
import com.tuan.classplanner.dto.TeachingSessionResponse;
import com.tuan.classplanner.model.SessionStatus;
import com.tuan.classplanner.model.Student;
import com.tuan.classplanner.model.TeachingSession;
import com.tuan.classplanner.repository.StudentRepository;
import com.tuan.classplanner.repository.TeachingSessionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class TeachingSessionService {
    private final TeachingSessionRepository teachingSessionRepository;
    private final StudentRepository studentRepository;
    public TeachingSessionService(TeachingSessionRepository teachingSessionRepository, StudentRepository studentRepository) {
        this.teachingSessionRepository = teachingSessionRepository;
        this.studentRepository = studentRepository;
    }
    public TeachingSessionResponse createSession(TeachingSessionRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        TeachingSession session = new TeachingSession();
        session.setStudent(student);
        session.setSubject(request.getSubject());
        session.setStartTime(request.getStartTime());
        session.setEndTime(request.getEndTime());
        session.setCustomLocation(request.getCustomLocation());
        session.setNote(request.getNote());
        // mặc định khi tạo
        session.setStatus(SessionStatus.SCHEDULED);
        TeachingSession saved = teachingSessionRepository.save(session);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<TeachingSessionResponse> getAllSessions() {
        List<TeachingSession> sessions = teachingSessionRepository.findAll();
        List<TeachingSessionResponse> responses = new ArrayList<>();
        for (TeachingSession session : sessions) {
            responses.add(mapToResponse(session));
        }
        return responses;
    }

    @Transactional(readOnly = true)
    public TeachingSessionResponse getSessionById(Integer id) {
        TeachingSession session = teachingSessionRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Session not found"));
        return mapToResponse(session);
    }

    public TeachingSessionResponse updateSession(Integer id, TeachingSessionRequest request) {
        TeachingSession session = teachingSessionRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Session not found"));
        Student student = studentRepository.findById(request.getStudentId())
                        .orElseThrow(() -> new EntityNotFoundException("Student not found"));
        session.setStudent(student);
        session.setSubject(request.getSubject());
        session.setStartTime(request.getStartTime());
        session.setEndTime(request.getEndTime());
        session.setCustomLocation(request.getCustomLocation());
        session.setNote(request.getNote());
        TeachingSession updated = teachingSessionRepository.save(session);
        return mapToResponse(updated);
    }

    public void deleteSession(Integer id) {
        if (!teachingSessionRepository.existsById(id)) {
            throw new EntityNotFoundException("Session not found");}
        teachingSessionRepository.deleteById(id);
    }

    public TeachingSessionResponse updateStatus(Integer id, SessionStatus status) {
        TeachingSession session = teachingSessionRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Session not found"));
        session.setStatus(status);
        return mapToResponse(teachingSessionRepository.save(session));
    }
    // TODAY
    @Transactional(readOnly = true)
    public List<TeachingSessionResponse> getTodaySessions() {
        LocalDateTime start = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        List<TeachingSession> sessions = teachingSessionRepository.findByStartTimeBetween(start, end);
        List<TeachingSessionResponse> responses = new ArrayList<>();
        for (TeachingSession session : sessions) {
            responses.add(mapToResponse(session));
        }
        return responses;
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