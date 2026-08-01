package com.tuan.classplanner.repository;

import com.tuan.classplanner.model.SessionStatus;
import com.tuan.classplanner.model.TeachingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
public interface TeachingSessionRepository extends JpaRepository<TeachingSession, Integer> {
    List<TeachingSession> findByStartTimeBetweenOrderByStartTimeAsc(LocalDateTime start, LocalDateTime end);

    List<TeachingSession> findByStartTimeBetweenAndStatus(LocalDateTime start, LocalDateTime end,
            SessionStatus status);
    List<TeachingSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
}
