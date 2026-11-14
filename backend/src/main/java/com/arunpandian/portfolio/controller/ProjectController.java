package com.arunpandian.portfolio.controller;

import com.arunpandian.portfolio.dto.ProjectDto;
import com.arunpandian.portfolio.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDto>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProjectDto> getProjectBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(projectService.getProjectBySlug(slug));
    }
}

