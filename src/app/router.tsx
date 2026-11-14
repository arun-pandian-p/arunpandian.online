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

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      <Route path="/experience" element={<ExperiencePage />} />
      <Route path="/skills" element={<SkillsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

