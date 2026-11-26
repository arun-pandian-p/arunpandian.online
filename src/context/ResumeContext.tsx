import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getResumeConfig, ResumeConfig } from '../lib/supabase';

interface ResumeContextType {
  resumeUrl: string;
  resumeFilename: string;
  updatedAt: string;
  refreshResume: () => Promise<void>;
  isLoading: boolean;
}

const defaultResume: ResumeConfig = {
  url: '/Arun_Pandian_P.pdf',
  filename: 'Arun_Pandian_P.pdf',
  updatedAt: new Date().toISOString(),
};

const ResumeContext = createContext<ResumeContextType>({
  resumeUrl: defaultResume.url,
  resumeFilename: defaultResume.filename,
  updatedAt: defaultResume.updatedAt,
  refreshResume: async () => {},
  isLoading: true,
});

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeConfig>(defaultResume);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchResume = useCallback(async () => {
    try {
      const config = await getResumeConfig();
      if (config && config.url) {
        setResume(config);
      }
    } catch (err) {
      console.warn('Failed to load resume config, using fallback:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return (
    <ResumeContext.Provider
      value={{
        resumeUrl: resume.url,
        resumeFilename: resume.filename,
        updatedAt: resume.updatedAt,
        refreshResume: fetchResume,
        isLoading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
