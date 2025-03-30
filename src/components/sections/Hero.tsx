import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Search, Cpu, Github, Twitter, 
  Linkedin, Mail, BookOpen, Ship, Cloud, Code2, 
  Image, Copyright, X, Brain, MessageSquare, Server,
  Users, FileText
} from 'lucide-react';
import { Button } from '../ui/button';
import { CreditsModal } from '../ui/CreditsModal';
import { HiringForm } from '../ui/HiringForm';
import { generateHeroImage } from '@/lib/imageGeneration';
import { SystemRequirements } from '../SystemRequirements';
import { SystemRequirementsChecker } from '../SystemRequirementsChecker';

const CompanySection = () => {
  const techStack = [
    { name: 'React', color: 'purple' },
    { name: 'TypeScript', color: 'blue' },
    { name: 'Node.js', color: 'green' },
    { name: 'Python', color: 'yellow' },
    { name: 'TensorFlow', color: 'red' },
    { name: 'PyTorch', color: 'indigo' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/synthara-engineering/',
      color: 'text-blue-400'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/synthara-company',
      color: 'text-purple-400'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="relative max-w-4xl mx-auto px-4 py-8"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl" />
      <div className="absolute inset-0 backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10" />
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Content container */}
      <div className="relative z-10 p-6">
        {/* Company Overview with enhanced title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              About Synthara
            </h2>
          </motion.div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            We are a cutting-edge ML Learning Platform focused on building innovative AI/ML solutions
            and creating interactive learning experiences.
          </motion.p>
        </div>

        {/* Tech Stack Grid with hover effects */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className={`
                relative p-4 rounded-xl backdrop-blur-sm
                bg-gradient-to-br from-${tech.color}-500/10 to-${tech.color}-500/5
                border border-${tech.color}-500/20 hover:border-${tech.color}-500/40
                transition-all duration-300 group
              `}
            >
              <div className={`absolute inset-0 bg-${tech.color}-500/5 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity`} />
              <p className={`relative text-${tech.color}-400 font-medium text-center`}>
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links with floating animation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                p-3 rounded-xl backdrop-blur-sm
                bg-gradient-to-br from-white/10 to-white/5
                border border-white/10 hover:border-white/20
                ${social.color} transition-all duration-300
                hover:shadow-lg hover:shadow-purple-500/10
              `}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const popularModels = [
  { 
    label: 'Llama 3.3 Nemotron Super', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NEW',
    badgeColor: 'bg-green-500/20 text-green-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/llama-3_3-nemotron-super-49b-v1', '_blank'),
    description: '49B parameter model with enhanced reasoning and instruction following'
  },
  { 
    label: 'DeepSeek R1', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NEW',
    badgeColor: 'bg-blue-500/20 text-blue-300', 
    action: () => window.open('https://build.nvidia.com/deepseek-ai/deepseek-r1', '_blank'),
    description: 'Advanced reasoning model with strong mathematical capabilities'
  },
  { 
    label: 'Llama 3.1 Nemotron Nano', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'EFFICIENT',
    badgeColor: 'bg-purple-500/20 text-purple-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/llama-3_1-nemotron-nano-8b-v1', '_blank'),
    description: '8B parameter model optimized for efficiency and speed'
  },
  { 
    label: 'Gemma 3', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'GOOGLE',
    badgeColor: 'bg-yellow-500/20 text-yellow-300', 
    action: () => window.open('https://build.nvidia.com/google/gemma-3-27b-it', '_blank'),
    description: '27B instruction-tuned model with strong multilingual capabilities'
  },
  { 
    label: 'Phi-4 Multimodal', 
    icon: Image, 
    color: 'bg-white/5',
    badge: 'MICROSOFT',
    badgeColor: 'bg-blue-500/20 text-blue-300', 
    action: () => window.open('https://build.nvidia.com/microsoft/phi-4-multimodal-instruct', '_blank'),
    description: 'Advanced vision-language model with instruction following'
  },
  { 
    label: 'Cosmos Predict', 
    icon: Brain, 
    color: 'bg-white/5',
    badge: 'NVIDIA',
    badgeColor: 'bg-green-500/20 text-green-300', 
    action: () => window.open('https://build.nvidia.com/nvidia/cosmos-predict1-7b', '_blank'),
    description: '7B parameter model specialized in predictive analytics'
  }
];

const PopularModelsSection = () => (
  <div className="mt-12 mb-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
      Popular Models
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {popularModels.map((model) => (
        <motion.button
          key={model.label}
          onClick={model.action}
          whileHover={{ scale: 1.02 }}
          className={`relative group overflow-hidden ${model.color} p-6 rounded-xl border border-purple-500/20 
                     hover:border-purple-500/40 transition-all duration-300 text-left w-full`}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg
                            group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                <model.icon className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white group-hover:text-purple-200 transition-colors">
                  {model.label}
                </h3>
                {model.badge && (
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${model.badgeColor}`}>
                    {model.badge}
                  </span>
                )}
              </div>
            </div>
            
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
              {model.description}
            </p>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 
                          rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                          rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </div>
        </motion.button>
      ))}
    </div>
  </div>
);

export function Hero() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [showHiringForm, setShowHiringForm] = useState(false);

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

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/bniladridas',
      color: 'hover:text-purple-400'
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
      color: 'hover:text-yellow-400'
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

  const navigationButtons = [
    { 
      label: 'Start Learning', 
      icon: ChevronRight, 
      color: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700', 
      action: () => navigate('/learn'),
      primary: true
    },
    { 
      label: 'System Check', 
      icon: Cpu, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => {
        const element = document.getElementById('system-requirements');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    { 
      label: 'Deep Research', 
      icon: Search, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => navigate('/research')
    },
    { 
      label: 'API Playground', 
      icon: Cpu, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => navigate('/test')
    },
    { 
      label: 'Generate Art', 
      icon: Image, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => navigate('/generate')
    },
    { 
      label: 'Document Analysis', 
      icon: FileText, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => navigate('/document-analysis')
    },
    { 
      label: 'Microservices', 
      icon: Server, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => navigate('/microservices')
    },
    { 
      label: 'Hook First', 
      icon: Code2, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://hook-first.vercel.app', '_blank')
    },
    { 
      label: 'Our Forum', 
      icon: MessageSquare, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://synthara-developers-forum.vercel.app', '_blank')
    },
    { 
      label: 'Calculus Visualization', 
      icon: Brain, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://synthara-calculus-visualization.vercel.app/', '_blank')
    },
    { 
      label: 'Calculus Image Generator', 
      icon: Image, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://synthara-calculus-image-generator.vercel.app/', '_blank')
    },
    { 
      label: 'AI Chat', 
      icon: MessageSquare, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://synthara-ai-chat.vercel.app', '_blank')
    },
    { 
      label: 'Commit Synthara', 
      icon: Code2, 
      color: 'bg-white/5 hover:bg-white/10 backdrop-blur-sm', 
      action: () => window.open('https://commit-synthara.vercel.app', '_blank')
    },
  ];

  const handleOpenCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.showModal();
  };

  const handleCloseCredits = () => {
    const modal = document.getElementById('credits-modal');
    if (modal) modal.close();
  };

  const announcements = [
    {
      id: 'gemini-2-flash',
      icon: Image,
      badge: 'NEW',
      badgeColor: 'bg-blue-500/20 text-blue-300',
      title: 'Gemini 2.0 Flash Image Generation',
      description: 'Experience native image generation with our experimental model',
      gradientFrom: 'purple-600/20',
      gradientVia: 'blue-600/20',
      gradientTo: 'purple-600/20',
      iconColor: 'text-blue-400',
      buttonGradient: 'from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600',
      buttonText: 'Try Now',
      buttonIcon: Image,
      action: () => navigate('/generate')
    },
    {
      id: 'gemini-2-5-pro',
      icon: Brain,
      badge: 'NEW',
      badgeColor: 'bg-indigo-500/20 text-indigo-300',
      title: 'Gemini 2.5 Pro Research',
      description: 'Enhanced context window with 65,536 tokens and advanced reasoning',
      gradientFrom: 'indigo-600/20',
      gradientVia: 'violet-600/20',
      gradientTo: 'indigo-600/20',
      iconColor: 'text-indigo-400',
      buttonGradient: 'from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600',
      buttonText: 'Try Now',
      buttonIcon: Search,
      action: () => navigate('/research')
    }
  ];

  const renderAnnouncement = (announcement: any) => (
    <motion.div
      key={announcement.id}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="mb-4 relative group"
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r from-${announcement.gradientFrom} via-${announcement.gradientVia} to-${announcement.gradientTo} blur-xl`}
        initial={{ opacity: 0.5 }}
        whileHover={{ opacity: 0.7 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-white/20"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`absolute inset-0 bg-${announcement.iconColor.split('-')[1]}-500 blur-lg opacity-20`} />
              <motion.div
                className={`relative p-3 rounded-xl bg-gradient-to-br from-${announcement.gradientFrom.split('/')[0]} to-${announcement.gradientVia.split('/')[0]} border border-white/10`}
                whileHover={{
                  boxShadow: `0 0 20px ${announcement.iconColor.includes('blue') ? '#60A5FA' : '#818CF8'}`
                }}
              >
                <announcement.icon className={`w-6 h-6 ${announcement.iconColor}`} />
              </motion.div>
            </motion.div>
            
            <div>
              <div className="flex items-center gap-2">
                <motion.span
                  className={`px-2 py-1 rounded-md ${announcement.badgeColor} text-xs font-medium`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {announcement.badge}
                </motion.span>
                <motion.h3
                  className="text-lg font-semibold text-white"
                  whileHover={{ x: 5 }}
                >
                  {announcement.title}
                </motion.h3>
              </div>
              <motion.p
                className="text-gray-400 mt-1"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1, color: "#fff" }}
              >
                {announcement.description}
              </motion.p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button
              onClick={announcement.action}
              className="relative group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
            >
              {/* Multiple geometric instances */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {/* Instance 1 - Rotating hexagons */}
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={`hex-${i}`} 
                    className="absolute inset-0" 
                    style={{
                      transform: `rotate(${i * 30}deg) scale(${1.2 - i * 0.05})`,
                      animation: `spin-${i} ${8 + i * 2}s linear infinite`
                    }}
                  >
                    <div className={`
                      w-full h-full 
                      bg-gradient-to-r from-purple-600/20 to-blue-600/20 
                      clip-hexagon
                    `} />
                  </div>
                ))}

                {/* Instance 2 - Floating triangles */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`tri-${i}`}
                    className="absolute w-4 h-4 clip-triangle"
                    style={{
                      top: `${20 + i * 10}%`,
                      left: `${10 + i * 15}%`,
                      animation: `float-${i} ${3 + i}s ease-in-out infinite`,
                      opacity: 0.2,
                      background: i % 2 ? 'linear-gradient(to right, #9333ea, #2563eb)' : 'linear-gradient(to right, #2563eb, #9333ea)'
                    }}
                  />
                ))}

                {/* Instance 3 - Orbiting dots */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`dot-${i}`}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                      style={{
                        transform: `rotate(${i * 45}deg) translateX(${100}%)`,
                        animation: `orbit ${5 + i * 0.5}s linear infinite`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Main button content */}
              <div className="
                relative px-6 py-3
                backdrop-blur-xl
                overflow-hidden
                clip-hexagon
                border border-white/10
                bg-black/30
                group-hover:bg-black/40
                transition-colors duration-300
              ">
                {/* Animated gradient lines */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={`line-${i}`}
                      className="absolute w-full h-[1px]"
                      style={{
                        top: `${30 + i * 20}%`,
                        background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
                        transform: `translateX(-100%) rotate(${-15 + i * 15}deg)`,
                        animation: `slide-right ${3 + i}s linear infinite`
                      }}
                    />
                  ))}
                </div>

                {/* Instance 4 - Particle system */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 rounded-full bg-white/20"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `particle-fade ${2 + Math.random() * 3}s linear infinite`
                      }}
                    />
                  ))}
                </div>

                {/* Button content */}
                <div className="relative flex items-center gap-3 z-10">
                  <announcement.buttonIcon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <span className="font-medium bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                    {announcement.buttonText}
                  </span>
                </div>
              </div>

              {/* Outer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/0 via-blue-600/20 to-purple-600/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 clip-hexagon" />
            </motion.button>

            <motion.button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-gray-300 p-2 rounded-full relative z-10"
              whileHover={{ 
                scale: 1.1,
                rotate: 90 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Company Logo Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <motion.div 
            className="relative w-32 h-32"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50" />
            <img 
              src="https://avatars.githubusercontent.com/u/203538727?s=200&v=4"
              alt="Synthara Logo"
              className="relative w-full h-full object-contain rounded-full border-2 border-white/20"
            />
          </motion.div>
        </motion.div>

        {/* Announcements section */}
        {showBanner && (
          <>
            {announcements.map(renderAnnouncement)}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          {/* Profile Section */}
          <div className="relative backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-2xl mb-12">
            <div className="flex flex-col items-center">
              {/* Avatar - coding.png with exact resolution */}
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50" />
                <img 
                  src="/coding.png"
                  alt="Coding Profile"
                  className="relative rounded-full border-2 border-white/20"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </motion.div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 transition-colors duration-200 ${social.color} group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Profile Info */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Niladri Das
                </h2>
                <p className="text-lg text-gray-300">Cloud Environment Automation @Brev.dev</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" />
                    Machine Learning
                  </span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    Full Stack Development
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="mb-12 space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Machine Learning Platform
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Your interactive guide to mastering machine learning concepts. Built with practical implementation experience and industry best practices.
            </p>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {navigationButtons.map((button) => (
              <Button 
                key={button.label}
                onClick={button.action}
                className={`${button.color} p-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 
                  ${button.primary ? 'col-span-full sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <span className="text-lg">{button.label}</span>
                <button.icon className="w-5 h-5" />
              </Button>
            ))}
          </motion.div>
        </motion.div>

        {/* Generated Image Container with Enhanced Visual Effects */}
        {generatedImage && (
          <motion.div
            // Fade-in animation with slight scale effect
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              {/* Background gradient effect for depth */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl opacity-30" 
                // Creates a soft, blurred background glow
              />
              
              <img
                src={generatedImage}
                alt="AI Generated Art"
                className="
                  relative                    /* Positions above the gradient background */
                  rounded-3xl                 /* Rounded corners for modern look */
                  border border-white/20      /* Subtle border with 20% opacity */
                  shadow-2xl                  /* Deep shadow for depth */
                  transform                   /* Enables CSS transforms */
                  hover:scale-[1.02]         /* Slight scale up on hover */
                  transition-transform        /* Smooth transition for hover effect */
                  duration-300               /* 300ms animation duration */
                "
              />
            </div>
            
            {/* Caption with modern styling */}
            <p className="
              text-center 
              text-sm 
              text-blue-300/70              /* Light blue text with 70% opacity */
              mt-4 
              font-light                    /* Thin font weight for modern look */
            ">
              AI Generated Visualization
            </p>
          </motion.div>
        )}

        <CreditsModal onClose={handleCloseCredits} />

        {/* Company Section */}
        <div className="mt-16">
          <CompanySection />
        </div>

        {/* System Requirements */}
        <div className="mt-16" id="system-requirements">
          <SystemRequirementsChecker />
        </div>
      </div>
      {showHiringForm && (
        <HiringForm 
          isOpen={showHiringForm} 
          onClose={() => {
            console.log('Closing hiring form'); // Add this for debugging
            setShowHiringForm(false);
          }} 
        />
      )}
      <PopularModelsSection />
    </div>
  );
}
