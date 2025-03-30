import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/sections/Hero';
import { LearningInterface } from './components/sections/LearningInterface';
import { ResearchInterface } from './components/sections/ResearchInterface';
import { Test } from './components/Test';
import { OpenGraphImage } from './components/OpenGraphImage';
import { OGPreview } from './components/OGPreview';
import { ImageGenerationInterface } from './components/sections/ImageGenerationInterface';
import { FloatingBugReport } from './components/FloatingBugReport';
import { BlurBackground } from './components/BlurBackground';
import { SimpleBlurForm } from './components/SimpleBlurForm';

// Define a type for user data
interface UserData {
  name: string;
  age: number;
}

function App() {
  // State to track if user has submitted the form
  const [formSubmitted, setFormSubmitted] = useState(false);
  // State to store user data
  const [userData, setUserData] = useState<UserData | null>(null);
  // State to track if the initial check has been performed
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  // Check localStorage on mount to see if user has already submitted the form
  useEffect(() => {
    try {
      // Try to get user data from localStorage
      const storedUserData = localStorage.getItem('userData');
      
      if (storedUserData) {
        // Parse the stored data
        const parsedUserData = JSON.parse(storedUserData) as UserData;
        
        // Validate the data
        if (parsedUserData && parsedUserData.name && parsedUserData.age) {
          setUserData(parsedUserData);
          setFormSubmitted(true);
          console.log('User data loaded from localStorage:', parsedUserData);
        }
      }
    } catch (error) {
      console.error('Error loading user data from localStorage:', error);
      // Clear potentially corrupted data
      localStorage.removeItem('userData');
    } finally {
      // Mark the initial check as done
      setInitialCheckDone(true);
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const form = e.currentTarget;
      const nameInput = form.elements.namedItem('name') as HTMLInputElement;
      const ageInput = form.elements.namedItem('age') as HTMLSelectElement;
      
      if (nameInput && ageInput) {
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        
        // Validate input
        if (!name) {
          alert('Please enter your name');
          return;
        }
        
        if (isNaN(age) || age < 18) {
          alert('Please select a valid age');
          return;
        }
        
        // Create user data object
        const newUserData: UserData = { name, age };
        
        // Store user info as a single JSON object
        localStorage.setItem('userData', JSON.stringify(newUserData));
        
        // Update state
        setUserData(newUserData);
        setFormSubmitted(true);
        
        console.log('User data saved:', newUserData);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  // Reset user data and form
  const resetForm = () => {
    try {
      localStorage.removeItem('userData');
      setUserData(null);
      setFormSubmitted(false);
      console.log('User data reset');
    } catch (error) {
      console.error('Error resetting user data:', error);
    }
  };

  // If the initial check hasn't been done yet, show a loading state
  if (!initialCheckDone) {
    return (
      <div className="min-h-screen bg-[#1c2128] flex items-center justify-center">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md"></div>
        <div className="relative z-50 text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1c2128] text-primary tracking-wide leading-relaxed relative">
      {/* Blur overlay - only shown if form not submitted */}
      {!formSubmitted && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-30"
        ></div>
      )}

      {/* User form - only shown if form not submitted */}
      {!formSubmitted && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-8 shadow-2xl border border-blue-500/30 w-full max-w-md mx-auto overflow-hidden">
            {/* Company logo/branding */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-500 text-white font-bold text-xl px-4 py-2 rounded-lg shadow-lg">
                ML Learning Platform
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-6 text-white text-center">
              Welcome to Our Platform
            </h3>
            
            <p className="text-gray-300 mb-6 text-center">
              Please provide your information to get started with our advanced learning tools.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Your Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="pl-10 w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="age" className="block text-gray-300 text-sm font-medium mb-2">Your Age</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="age"
                    name="age"
                    className="pl-10 w-full px-4 py-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>Select your age</option>
                    {Array.from({ length: 83 }, (_, i) => i + 18).map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit" 
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Get Started
                </button>
              </div>
              
              <p className="text-gray-400 text-xs text-center mt-4">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      )}
        
      {/* Application content */}
      <Router>
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/learn" element={<LearningInterface />} />
            <Route path="/research" element={<ResearchInterface />} />
            <Route path="/test" element={<Test />} />
            <Route path="/og-image" element={<OpenGraphImage />} />
            <Route path="/og-preview" element={<OGPreview />} />
            <Route path="/generate" element={<ImageGenerationInterface />} />
            <Route path="/simple-blur" element={<SimpleBlurForm />} />
          </Routes>
          <FloatingBugReport />
        </div>
      </Router>
      
      {/* Welcome message - only shown after form submission */}
      {formSubmitted && userData && (
        <div className="fixed bottom-4 left-4 bg-blue-600/90 text-white px-4 py-2 rounded-full text-sm shadow-lg border border-blue-400/30 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-1">
              <svg className="h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Welcome, <span className="font-semibold">{userData.name}</span></span>
          </div>
        </div>
      )}
      
      {/* Reset button for testing (can be removed in production) */}
      <button
        onClick={resetForm}
        className="fixed top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs z-50 shadow-md transition-colors"
      >
        Reset Form
      </button>
    </div>
  );
}

export default App;
