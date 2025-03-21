import React from 'react';
import { motion } from 'framer-motion';
import { Box, Terminal, Cpu, Globe, ExternalLink } from 'lucide-react';

const technologies = [
  { name: 'React 18.3', description: 'Frontend library', icon: <Box className="w-5 h-5" /> },
  { name: 'TypeScript 5.5', description: 'Type-safe JavaScript', icon: <Terminal className="w-5 h-5" /> },
  { name: 'Vite 5.4', description: 'Build tool', icon: <Cpu className="w-5 h-5" /> },
  { name: 'Tailwind CSS', description: 'Utility-first CSS', icon: <Globe className="w-5 h-5" /> },
  { name: 'Framer Motion', description: 'Animation library', icon: <Box className="w-5 h-5" /> },
  { name: 'Google Gemini AI', description: 'AI model integration', icon: <Cpu className="w-5 h-5" /> },
  { name: 'React Router 6', description: 'Navigation', icon: <Globe className="w-5 h-5" /> },
  { name: 'Lucide React', description: 'Icon system', icon: <Box className="w-5 h-5" /> },
  { name: 'React Markdown', description: 'Markdown rendering', icon: <Terminal className="w-5 h-5" /> },
];

const developmentTools = [
  { name: 'ngrok', description: 'Secure tunneling for local development' },
  { name: 'ESLint 9', description: 'Code linting' },
  { name: 'Autoprefixer', description: 'CSS post-processing' },
  { name: 'Vite Dev Server', description: 'Development server with HMR' },
];

interface CreditsModalProps {
  onClose: () => void;
}

export function CreditsModal({ onClose }: CreditsModalProps) {
  return (
    <motion.dialog
      id="credits-modal"
      className="modal backdrop:bg-black/50 bg-transparent"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-2xl p-6 border border-gray-800">
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-blue-400">Technologies & Credits</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Core Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-3">Core Technologies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 flex items-start gap-3"
                >
                  <div className="text-blue-400">{tech.icon}</div>
                  <div>
                    <h4 className="font-semibold">{tech.name}</h4>
                    <p className="text-sm text-gray-400">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Development Tools */}
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Development Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {developmentTools.map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <h4 className="font-semibold">{tool.name}</h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deployment */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Deployment</h3>
            <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <p className="text-gray-300">
                This application is deployed on <span className="text-white font-semibold">Vercel</span>. 
                Development environment is exposed through <span className="text-white font-semibold">ngrok</span> for testing and preview purposes.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Follow My Work
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://medium.com/@bniladridas"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-400 transition-colors">English Network</h4>
                    <p className="text-gray-400 text-sm">My Medium Blog</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
              <a 
                href="https://huggingface.co/cuda-unleashed"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
              >
                <div className="flex items-center gap-3">
                  <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-purple-400 transition-colors">Cuda Unleashed</h4>
                    <p className="text-gray-400 text-sm">My HuggingFace Organization</p>
                  </div>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-6 border-t border-gray-800 text-center text-sm text-gray-400"
          >
            <p className="flex items-center justify-center gap-2">
              Maranatha Prayer Fellowship. <span className="text-red-400">❤️</span> With love, Niladri Das.
            </p>
            <p className="mt-1">© 2025 All rights reserved</p>
          </motion.div>
        </div>
      </div>
    </motion.dialog>
  );
}
