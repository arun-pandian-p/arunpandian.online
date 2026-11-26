import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { uploadResumePdf } from '../../lib/supabase';
import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  FileCheck,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export const AdminResumeManager: React.FC = () => {
  const { resumeUrl, resumeFilename, updatedAt, refreshResume, isLoading } = useResume();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(null), 6000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(null), 6000);
    }
  };

  const handleProcessPdfFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      showNotification('Invalid file format. Please upload a PDF file (.pdf).', true);
      return;
    }

    // Limit check: 20MB
    if (file.size > 20 * 1024 * 1024) {
      showNotification('File size exceeds 20MB limit.', true);
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const publicUrl = await uploadResumePdf(file);
      await refreshResume();
      showNotification(
        `Resume replaced successfully! New PDF is active at ${publicUrl}. Public download buttons in Navbar, Footer, and Resume page have been refreshed.`
      );
    } catch (err: any) {
      showNotification('Failed to upload replacement PDF: ' + err.message, true);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessPdfFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessPdfFile(e.dataTransfer.files[0]);
    }
  };

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Default bundled file';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-emerald-400" />
            <span>Resume Management</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Display currently uploaded resume, upload a replacement PDF, and automatically update public download buttons.
          </p>
        </div>

        <button
          onClick={() => refreshResume()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm leading-relaxed animate-fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm leading-relaxed animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 1. Display currently uploaded resume card */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Current Active Resume</h2>
              <p className="text-xs text-slate-400">
                Served to all visitors clicking "Resume" or "Download PDF" on the portfolio.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
            Live on Website
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
              File Name
            </span>
            <span className="text-white font-medium truncate block" title={resumeFilename}>
              {resumeFilename}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
              Last Updated
            </span>
            <span className="text-white font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formattedDate}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
              Location
            </span>
            <span className="text-emerald-400 font-medium truncate block" title={resumeUrl}>
              {resumeUrl.startsWith('http') ? 'Supabase Storage' : 'Local Public Asset'}
            </span>
          </div>
        </div>

        {/* Preview / Download existing resume buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-xs transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span>Preview Current Resume</span>
          </a>

          <a
            href={resumeUrl}
            download={resumeFilename}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 font-medium text-xs transition-colors"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Download Existing PDF</span>
          </a>
        </div>
      </div>

      {/* 2. Upload replacement PDF */}
      <div className="rounded-2xl border border-white/10 bg-[#0B0F15] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>Upload Replacement Resume</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Uploading a new PDF replaces the active resume and updates the public portfolio automatically without changing public routes.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
              : 'border-white/15 bg-black/30 hover:border-emerald-500/40'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,application/pdf"
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Upload className="w-7 h-7" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Drag and drop your new resume PDF here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                or <span className="text-emerald-400 font-medium hover:underline">browse file</span> from your device
              </p>
            </div>

            <p className="text-[11px] font-mono text-slate-500">
              Strictly PDF format · Maximum file size 20MB
            </p>

            {isUploading && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span>Uploading replacement PDF to Supabase Storage & updating site_settings...</span>
              </div>
            )}
          </div>
        </div>

        {/* Security / System Info */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Automatic sync enabled · Supabase Bucket: assets/resume · Encrypted transmission</span>
        </div>
      </div>
    </div>
  );
};
