import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../features/home/HomePage';
import { AboutPage } from '../features/about/AboutPage';
import { ProjectsPage } from '../features/projects/ProjectsPage';
import { ProjectDetailPage } from '../features/projects/ProjectDetailPage';
import { ExperiencePage } from '../features/experience/ExperiencePage';
import { SkillsPage } from '../features/skills/SkillsPage';
import { ContactPage } from '../features/contact/ContactPage';
import { ResumePage } from '../features/resume/ResumePage';

// Admin Features
import { AdminLoginPage } from '../features/admin/AdminLoginPage';
import { AdminProtectedRoute } from '../features/admin/AdminProtectedRoute';
import { AdminLayout } from '../features/admin/AdminLayout';
import { AdminDashboardHome } from '../features/admin/AdminDashboardHome';
import { AdminGalleryManager } from '../features/admin/AdminGalleryManager';
import { AdminResumeManager } from '../features/admin/AdminResumeManager';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public Portfolio Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />

      {/* Admin Authentication Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="gallery" element={<AdminGalleryManager />} />
        <Route path="resume" element={<AdminResumeManager />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
