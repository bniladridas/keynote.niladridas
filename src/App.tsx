import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/sections/Hero';
import { LearningInterface } from './components/sections/LearningInterface';
import { ResearchInterface } from './components/sections/ResearchInterface';
import { Test } from './components/Test';
import { OpenGraphImage } from './components/OpenGraphImage';
import { OGPreview } from './components/OGPreview';
import { ImageGenerationInterface } from './components/sections/ImageGenerationInterface';
import { FloatingBugReport } from './components/FloatingBugReport';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1c2128] text-primary tracking-wide leading-relaxed relative">
        {/* Base background with tiles */}
        <div className="absolute inset-0 bg-tiles-pattern bg-tiles bg-tiles-position opacity-50" />
        
        {/* Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/learn" element={<LearningInterface />} />
            <Route path="/research" element={<ResearchInterface />} />
            <Route path="/test" element={<Test />} />
            <Route path="/og-image" element={<OpenGraphImage />} />
            <Route path="/og-preview" element={<OGPreview />} />
            <Route path="/generate" element={<ImageGenerationInterface />} />
          </Routes>
          <FloatingBugReport />
        </div>
      </div>
    </Router>
  );
}

export default App;
