package com.arunpandian.portfolio.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final OffsetDateTime startTime = OffsetDateTime.now();

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "arunpandian-portfolio-backend",
                "version", "1.0.0",
                "runtime", "Java 21 / Spring Boot 3.3.4",
                "startedAt", startTime,
                "timestamp", OffsetDateTime.now()
        ));
    }
}

