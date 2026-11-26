import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects, getResumeConfig, GalleryProject, ResumeConfig } from '../../lib/supabase';
import {
  Images,
  FileText,
  ArrowRight,
  ShieldCheck,
  Database,
  Upload,
} from 'lucide-react';

export const AdminDashboardHome: React.FC = () => {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [resume, setResume] = useState<ResumeConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [projData, resumeData] = await Promise.all([
          getProjects(),
          getResumeConfig(),
        ]);
        setProjects(projData);
        setResume(resumeData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Authorized Administrator</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Dashboard preview · Manage gallery photos, project entries, and public resume.
          </p>
        </div>
      </div>

      {/* Main Spec Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gallery Card matching spec */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 transition-all group relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Images className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Collection
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">Gallery</h2>
              <p className="text-sm text-slate-400 mt-2">
                Project photos, drag-and-drop uploads, thumbnails, titles, and public showcase.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                {loading ? '...' : `${projects.length} Total Projects`}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                Supabase Postgres
              </span>
            </div>
          </div>

          <div className="pt-8">
            <Link
              to="/admin/gallery"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group/btn"
            >
              <span># Manage Project photos</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Resume Card matching spec */}
        <div className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 sm:p-8 flex flex-col justify-between hover:border-primary/40 transition-all group relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Document
              </span>
              <h2 className="text-2xl font-bold text-white mt-0.5">Resume</h2>
              <p className="text-sm text-slate-400 mt-2">
                Upload new resume replacement PDF. Keep public URL intact and auto-update download buttons.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 truncate max-w-[220px]">
                {loading ? '...' : resume?.filename || 'Arun_Pandian_P.pdf'}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                Active
              </span>
            </div>
          </div>

          <div className="pt-8">
            <Link
              to="/admin/resume"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20 group/btn"
            >
              <Upload className="w-4 h-4" />
              <span># Manage Upload new resume</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div className="rounded-xl border border-white/10 bg-[#0B0F15] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-primary">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <p className="font-semibold text-slate-200">Supabase Connected</p>
            <p className="text-slate-400 font-mono text-[11px]">
              Bucket: assets · Auth: JWT Signed · RLS: Configured
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-mono font-medium">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};
