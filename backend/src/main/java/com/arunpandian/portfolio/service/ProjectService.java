package com.arunpandian.portfolio.service;

import com.arunpandian.portfolio.dto.ProjectDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final Map<String, ProjectDto> projects;

    public ProjectService() {
        List<ProjectDto> projectList = List.of(
                new ProjectDto(
                        "zappy",
                        "Zappy — Restaurant SaaS Platform",
                        "Multi-tenant restaurant ordering platform featuring QR-code digital menus, kitchen order dispatching, role-based access control, and PostgreSQL backend architecture.",
                        "Full Stack",
                        "Active Development",
                        List.of("React", "TypeScript", "Node.js", "Java", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Docker"),
                        "https://github.com/arun-pandian-p/Zappy",
                        "",
                        "Traditional dining spots struggle with slow ordering turnover, paper menu overhead, and fragmented billing systems that fail during peak hours.",
                        "Engineered a multi-tenant SaaS application that enables diners to scan table-specific dynamic QR codes, browse real-time inventory, place customized kitchen orders, and track preparation statuses seamlessly.",
                        "Separation of concerns between high-throughput customer menu queries and mission-critical transactional order flows. Multi-tenant database partitioning on PostgreSQL with tenant-isolated schemas and role-based permissions.",
                        "Built with React 19, TypeScript, and Tailwind CSS. Features dynamic QR code generation, responsive table view, offline cart caching, and live order status tickers.",
                        "RESTful API design powering tenant resolution, kitchen order ticket (KOT) generation, and transactional status transitions with strict data isolation.",
                        "PostgreSQL relational schema modeling tenants, stores, menu categories, modifiers, tables, orders, and item statuses with foreign keys and compound indices on tenant_id.",
                        List.of(
                                "Dynamic QR-based menu access with instant table binding",
                                "Multi-tenant architecture isolating restaurant catalogs and bills",
                                "Role-Based Access Control (RBAC) for Super Admin, Store Manager, and Waitstaff",
                                "Interactive Kitchen Display System (KDS) order dispatching",
                                "Real-time order state machine (Placed -> Preparing -> Served -> Settled)"
                        ),
                        true
                ),
                new ProjectDto(
                        "ashnora",
                        "Ashnora — Restaurant Management System",
                        "All-in-one restaurant operational system integrating Point of Sale (POS), Kitchen Display Systems, real-time inventory tracking, and floor management.",
                        "Full Stack",
                        "Completed",
                        List.of("React", "TypeScript", "REST APIs", "PostgreSQL", "Tailwind CSS", "Chart.js"),
                        "https://github.com/arun-pandian-p",
                        "",
                        "Stand-alone cash registers and disconnected kitchen printers cause inventory discrepancies, missed modifier requests, and delayed customer billing.",
                        "Developed an integrated restaurant management platform unifying dining room floor plans, POS cashier stations, kitchen queue displays, and ingredient-level inventory replenishment alerts.",
                        "Event-driven architecture where billing events trigger atomic inventory decrement queries and update kitchen display boards concurrently.",
                        "Designed with quick-touch tablet POS views, rapid order entry grids, modifier selector dialogs, and interactive dining floor maps.",
                        "High-reliability REST endpoints with transactional safety ensuring inventory counts update atomically upon order fulfillment.",
                        "Normalized PostgreSQL relational schema tracking ingredient recipes, stock levels, table layouts, employee shifts, and hourly sales breakdowns.",
                        List.of(
                                "Touch-optimized Point of Sale (POS) checkout interface",
                                "Interactive visual table floor map with seated timer indicators",
                                "Kitchen Display System (KDS) prioritizing overdue orders",
                                "Ingredient-level recipe costing and low-stock replenishment alerts",
                                "End-of-day sales auditing, discount tracking, and cashier reconciliations"
                        ),
                        true
                ),
                new ProjectDto(
                        "ap-desktop",
                        "Ap Desktop — Placement Preparation Platform",
                        "Offline-first desktop application engineered for computer science engineering students to practice coding patterns, system design, and technical interview roadmaps.",
                        "Java",
                        "Completed",
                        List.of("Electron", "React", "TypeScript", "Java", "SQLite", "Tailwind CSS"),
                        "https://github.com/arun-pandian-p",
                        "",
                        "Students preparing for software engineering placement drives often face distracting online platforms, unstable campus internet, and disorganized study resources.",
                        "Architected an offline-first desktop environment packaging curated DSA problem classifications, company-specific preparation roadmaps, and a local code runner.",
                        "Hybrid architecture pairing an Electron/React front interface with a lightweight embedded SQLite database and a local Java runtime integration for syntax verification.",
                        "Clean desktop UI with dark mode ergonomics, multi-tab pattern roadmaps, bookmarking, and distraction-free problem reading views.",
                        "Local IPC bridge facilitating safe file-system access, state backups, and local problem progress tracking.",
                        "Embedded SQLite database with full-text search indexing over hundreds of coding interview concepts and DSA problem patterns.",
                        List.of(
                                "Completely offline-first operation requiring zero internet connectivity",
                                "Structured Data Structures & Algorithms (DSA) level-wise pattern guides",
                                "Integrated progress tracking with spaced-repetition reminders",
                                "Full-text searchable interview question database with code snippets",
                                "Local backup and JSON export capabilities for student study notes"
                        ),
                        true
                ),
                new ProjectDto(
                        "blog-platform",
                        "Technical Engineering Publishing Platform",
                        "High-performance personal publishing engine built with Java Spring Boot and React, delivering Markdown rendering, syntax highlighting, and database-backed article management.",
                        "Backend",
                        "Completed",
                        List.of("Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "Hibernate", "Docker"),
                        "https://github.com/arun-pandian-p",
                        "",
                        "Commercial blogging platforms introduce bloated trackers, slow loading speeds, paywalls, and proprietary content formats that restrict ownership.",
                        "Built a self-hosted developer publication system with instant static-like reader rendering, database-driven tag filtering, and clean API endpoints.",
                        "Stateless Spring Boot 3 REST API backend serving sanitized article payloads, connected to a PostgreSQL database with JPA / Hibernate caching.",
                        "Minimalist reader UI with typography optimization, code block syntax highlighting, reading time calculation, and reactive search.",
                        "Spring Boot 3 REST controllers, JPA Criteria API for dynamic tag/category filtering, and structured exception handling.",
                        "PostgreSQL schema with indexes on publish dates and slugs, enforcing unique constraints and referential integrity for tags and categories.",
                        List.of(
                                "Fast Markdown to HTML conversion with code block syntax highlighting",
                                "Faceted search across technical tags, categories, and publication dates",
                                "Database-backed article metadata with reading time estimation",
                                "Clean REST API with comprehensive input validation and error handling",
                                "Zero external tracking scripts or telemetry overhead"
                        ),
                        true
                )
        );

        this.projects = Collections.unmodifiableMap(
                projectList.stream().collect(Collectors.toMap(ProjectDto::getSlug, Function.identity()))
        );
    }

    public List<ProjectDto> getAllProjects() {
        return List.copyOf(projects.values());
    }

    public ProjectDto getProjectBySlug(String slug) {
        ProjectDto project = projects.get(slug != null ? slug.toLowerCase() : "");
        if (project == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project with slug '" + slug + "' not found");
        }
        return project;
    }
}

