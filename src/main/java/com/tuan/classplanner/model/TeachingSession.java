package com.tuan.classplanner.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@NoArgsConstructor
@Entity
@Setter
@Getter
@Table(name = "teaching_sessions")
public class TeachingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "custom_location", columnDefinition = "TEXT")
    private String customLocation;

    @Column(columnDefinition = "TEXT")
    private String note;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus status;

    public TeachingSession(Student student, String subject, LocalDateTime startTime, LocalDateTime endTime) {
        this.student = student;
        this.subject = subject;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = SessionStatus.SCHEDULED;
    }
}