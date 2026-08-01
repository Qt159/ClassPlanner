package com.tuan.classplanner.controller;

import com.tuan.classplanner.dto.TeachingSessionRequest;
import com.tuan.classplanner.dto.TeachingSessionResponse;
import com.tuan.classplanner.model.SessionStatus;
import com.tuan.classplanner.service.TeachingSessionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/sessions")
public class TeachingSessionController {
    private final TeachingSessionService teachingSessionService;

    public TeachingSessionController(TeachingSessionService teachingSessionService) {
        this.teachingSessionService = teachingSessionService;
    }
    @PostMapping
    public ResponseEntity<TeachingSessionResponse> createSession(@Valid @RequestBody TeachingSessionRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(teachingSessionService.createSession(request));
    }
    @GetMapping
    public ResponseEntity<List<TeachingSessionResponse>> getAllSessions() {
        return ResponseEntity.ok(teachingSessionService.getAllSessions());
    }
    @GetMapping("/today")
    public ResponseEntity<List<TeachingSessionResponse>> getTodaySessions() {
        return ResponseEntity.ok(teachingSessionService.getTodaySessions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeachingSessionResponse> getSessionById(@PathVariable Integer id) {
        return ResponseEntity.ok(teachingSessionService.getSessionById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<TeachingSessionResponse> updateSession(@PathVariable Integer id, @RequestBody TeachingSessionRequest request) {
        return ResponseEntity.ok(teachingSessionService.updateSession(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable Integer id) {
        teachingSessionService.deleteSession(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TeachingSessionResponse> updateStatus(@PathVariable Integer id, @RequestParam SessionStatus status) {
        return ResponseEntity.ok(teachingSessionService.updateStatus(id, status));
    }


}