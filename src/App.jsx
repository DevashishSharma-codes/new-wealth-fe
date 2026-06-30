import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import NotFound from './pages/NotFound';
import AssessmentProvider from './context/AssessmentContext';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/assessment" 
          element={
            <AssessmentProvider>
              <Assessment />
            </AssessmentProvider>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
