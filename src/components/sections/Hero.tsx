import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search, Cpu, Github, Twitter, Linkedin, Mail, BookOpen, Ship, Cloud, Code2, Image, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { CreditsModal } from '../ui/CreditsModal';
import { generateHeroImage } from '@/lib/imageGeneration';
import { SystemRequirements } from '../SystemRequirements';
import { SystemRequirementsChecker } from '../SystemRequirementsChecker';

export function Hero() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const imageUrl = await generateHeroImage();
      setGeneratedImage(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const technologies = [
    { name: 'React 18.3', description: 'Frontend library' },
    { name: 'TypeScript 5.5', description: 'Type-safe JavaScript' },
    { name: 'Vite 5.4', description: 'Build tool' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS' },
    { name: 'Framer Motion', description: 'Animation library' },
    { name: 'Google Gemini AI', description: 'AI model integration' },
    { name: 'React Router 6', description: 'Navigation' },
    { name: 'Lucide React', description: 'Icon system' },
    { name: 'React Markdown', description: 'Markdown rendering' },
  ];

  const developmentTools = [
    { name: 'ngrok', description: 'Secure tunneling for local development' },
    { name: 'ESLint 9', description: 'Code linting' },
    { name: 'Autoprefixer', description: 'CSS post-processing' },
    { name: 'Vite Dev Server', description: 'Development server with HMR' },
  ];

  // Removing testingTools array since there's no testing setup in package.json

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/bniladridas',
      color: 'hover:text-gray-100'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/bniladridas',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Bluesky',
      icon: Cloud,
      url: 'https://bsky.app/profile/bniladridas.bsky.social',
      color: 'hover:text-sky-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/bniladridas',
      color: 'hover:text-blue-500'
    },
    {
      name: 'Docker Hub',
      icon: Ship,
      url: 'https://hub.docker.com/u/bniladridas',
      color: 'hover:text-blue-300'
    },
    {
      name: 'HuggingFace',
      icon: BookOpen,
      url: 'https://huggingface.co/bniladridas',
      color: 'hover:text-yellow-500'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:bniladridas@gmail.com',
      color: 'hover:text-red-400'
    },
    {
      name: 'RubyGems',
      icon: Code2,
      url: 'https://rubygems.org/profiles/bniladridas',
      color: 'hover:text-red-500'
    }
  ];

  const handleOpenCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.showModal();
  };

  const handleCloseCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.close();
  };

  const scrollToSystemRequirements = () => {
    const element = document.getElementById('system-requirements');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-8">
              <img 
                src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
                alt="Synthara Logo"
                className="w-full h-full object-contain rounded-full animate-pulse-slow mix-blend-luminosity brightness-200 contrast-200"
                style={{
                  filter: 'brightness(1.5) contrast(1.2) grayscale(0.1)',
                  backgroundColor: 'transparent'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, transparent 50%, rgba(13, 17, 23, 0.8) 100%)'
                }}
              />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors duration-200 ${social.color} group`}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                </a>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl font-semibold text-white">Niladri Das</h2>
              <p className="text-sm text-gray-400">ML Engineer & Developer</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>🤖 Machine Learning</span>
                <span>•</span>
                <span>💻 Full Stack Development</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Machine Learning Platform
          </h1>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        >
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => navigate('/learn')}
          >
            <span className="relative">Start Learning</span>
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => {
              const element = document.getElementById('system-requirements');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <span className="relative">System Check</span>
            <Cpu className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500/10 group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => navigate('/research')}
          >
            <span className="relative">Deep Research</span>
            <Search className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-green-500 text-green-500 hover:bg-green-500/10 group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => navigate('/test')}
          >
            <span className="relative">Test API</span>
            <Cpu className="ml-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10 group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => navigate('/generate')}
          >
            <span className="relative">Generate Art</span>
            <Image className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>

          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-purple-500 text-purple-500 hover:bg-purple-500/10 group transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-xs sm:text-sm w-full sm:w-auto"
            onClick={handleOpenCredits}
          >
            <span className="relative">Credits</span>
            <Code2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {generatedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mt-8 mx-auto"
        >
          <img
            src={generatedImage}
            alt="AI Generated Art"
            className="w-full h-auto rounded-lg shadow-xl border-2 border-purple-500/20"
          />
          <p className="text-sm text-gray-400 mt-2">AI Generated Artwork</p>
        </motion.div>
      )}

      <CreditsModal onClose={handleCloseCredits} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

      {/* System Requirements Checker */}
      <div className="mt-16" id="system-requirements">
        <SystemRequirementsChecker />
      </div>
    </div>
  );
}
