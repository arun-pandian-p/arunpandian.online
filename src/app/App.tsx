import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MeltingSheet } from '../components/sections/MeltingSheet';
import { AppRouter } from './router';
import { ResumeProvider } from '../context/ResumeContext';
import { AdminAuthProvider } from '../context/AdminAuthContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes render in their own dedicated workspace layout
    return (
      <div className="min-h-screen bg-[#07090D] text-slate-100">
        <AppRouter />
      </div>
    );
  }

  // Public Portfolio Layout
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 w-full">
        <AppRouter />
      </main>
      {/* The Melting Sheet: Interactive organic noise-driven transition before footer on all pages */}
      <MeltingSheet />
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <ResumeProvider>
          <AppContent />
        </ResumeProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export default App;
