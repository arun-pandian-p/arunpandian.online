import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MeltingSheet } from '../components/sections/MeltingSheet';
import { AppRouter } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-1 w-full">
          <AppRouter />
        </main>
        {/* The Melting Sheet: Interactive organic noise-driven transition before footer on all pages */}
        <MeltingSheet />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
