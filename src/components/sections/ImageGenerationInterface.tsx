import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Image, Loader2, Brain, Command, Copy, Check, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { generateImage } from '@/lib/imageGeneration';

export function ImageGenerationInterface() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGeneration = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      const imageUrl = await generateImage(prompt);
      
      // Create a promise to validate the image URL
      const validateImage = (url: string) => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.onload = () => resolve(url);
          img.onerror = () => reject(new Error('Generated image URL is invalid'));
          img.src = url;
        });
      };

      // Validate the image URL
      await validateImage(imageUrl);
      setGeneratedImage(imageUrl);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
      console.error('Generation error:', err);
      setGeneratedImage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download:', err);
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGeneration();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prompt]);

  return (
    <div className="min-h-screen bg-transparent text-[#c9d1d9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button
            variant="ghost"
            className="hover:bg-[#30363d] text-[#c9d1d9] w-full sm:w-auto"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <AIProviderSwitch />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Generation form */}
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 min-h-[120px] text-sm sm:text-base pr-24"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-500 bg-[#1c2128] px-2 py-1 rounded border border-[#30363d]">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <span>↵</span>
                </div>
              </div>
              <Button
                onClick={handleGeneration}
                disabled={loading || !prompt.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Image className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Empty State Message */}
          {!prompt.trim() && !generatedImage && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 bg-[#161b22] border border-[#30363d] rounded-lg"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">AI Image Generation</h3>
              <p className="text-[#8b949e] mb-4">
                "I can turn your ideas into visual masterpieces. Let's create something amazing! 🎨"
              </p>
              <p className="text-sm text-[#8b949e]">
                Describe what you want to see, and I'll generate a unique image for you.
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 mb-8"
            >
              {error}
            </motion.div>
          )}

          {/* Generated Image */}
          {generatedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="mt-4 flex justify-between items-start">
                  <div className="text-sm text-[#8b949e]">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Prompt:</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyPrompt}
                        className="text-xs flex items-center gap-1 hover:bg-[#30363d]"
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        {copied ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    <p className="mt-1">{prompt}</p>
                  </div>
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-[#30363d]"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
