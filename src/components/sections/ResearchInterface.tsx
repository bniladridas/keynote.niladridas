import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowLeft, Send, Loader2, Brain, Command, Timer } from 'lucide-react';
import { Button, CopyButton } from '../ui';
import { useNavigate } from 'react-router-dom';
import { AIProviderSwitch } from '../AIProviderSwitch';
import { getAIResponse, getTokenCount, type AIResponse } from '@/lib/ai';
import ReactMarkdown from 'react-markdown';

const RESEARCH_EXAMPLES = [
  {
    title: "Neural Network Architecture",
    prompt: "Explain the architecture and working principles of Convolutional Neural Networks (CNNs) in computer vision. Include details about different layers, feature extraction, and practical applications in image recognition."
  },
  {
    title: "Transfer Learning",
    prompt: "What is transfer learning in machine learning? Explain its benefits, common approaches, and when it's most effective. Include practical examples of popular pre-trained models and their applications."
  },
  {
    title: "Reinforcement Learning",
    prompt: "Analyze the key components of reinforcement learning systems: agents, environments, rewards, and policies. How do algorithms like Q-learning and Deep Q Networks (DQN) work? Include real-world applications and challenges."
  },
  {
    title: "Model Optimization",
    prompt: "What are the best practices for optimizing machine learning models? Cover techniques for improving model performance, reducing overfitting, and handling computational constraints. Include specific examples and metrics."
  }
];

export function ResearchInterface() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    promptTokens: 0,
    completionTokens: 0,
    totalTokens: 0
  });
  const [thoughts, setThoughts] = useState<string[]>([]);

  const handleResearch = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);
    setIsGenerating(true);
    setThoughts([]);
    
    try {
      const promptTokenCount = await getTokenCount(query);
      setGenerationProgress({
        promptTokens: promptTokenCount,
        completionTokens: 0,
        totalTokens: promptTokenCount
      });

      // Initial thinking steps
      setThoughts([
        "Understanding the query...",
        "Analyzing context and scope...",
        "Gathering relevant information..."
      ]);

      const prompt = `Perform a deep analysis on the following machine learning topic: ${query}...`;
      const result = await getAIResponse(prompt);
      
      // Update thoughts with actual AI reasoning
      if (result.thoughts) {
        setThoughts(result.thoughts);
      }

      setGenerationProgress({
        promptTokens: result.promptTokens,
        completionTokens: result.completionTokens,
        totalTokens: result.totalTokens
      });
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setIsGenerating(false);
    }
  };

  const handleExampleClick = (prompt: string) => {
    setQuery(prompt);
  };

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleResearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [query]);

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
          {/* Research form */}
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your research query..."
                  className="w-full bg-[#161b22] border border-[#30363d] rounded-lg p-4 min-h-[120px] text-sm sm:text-base pr-24"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-gray-500 bg-[#1c2128] px-2 py-1 rounded border border-[#30363d]">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <span>↵</span>
                </div>
              </div>
              <Button
                onClick={handleResearch}
                disabled={loading || !query.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 w-full sm:w-auto h-auto sm:h-auto py-4"
              >
                <Send className="h-5 w-5 mr-2" />
                <span>Send</span>
              </Button>
            </div>
          </div>

          {/* Generation Status */}
          {isGenerating && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-4 bg-[#161b22] border border-[#30363d] rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#58a6ff]" />
                    <span className="text-sm">Generating response...</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#8b949e]">
                    <div className="flex items-center gap-2">
                      <span>Prompt: {generationProgress.promptTokens}</span>
                      <span>Response: {generationProgress.completionTokens}</span>
                      <Timer className="h-4 w-4 text-[#58a6ff]" />
                      <span className="font-medium text-[#58a6ff]">
                        {generationProgress.totalTokens} tokens
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 h-1 bg-[#30363d] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#58a6ff] rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((generationProgress.totalTokens / 8192) * 100, 100)}%` 
                    }}
                  />
                </div>
              </motion.div>

              {/* Thinking Process */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-4 bg-[#161b22] border border-[#30363d] rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-[#58a6ff]" />
                  <span className="text-sm font-medium">Thinking Process</span>
                </div>
                <div className="space-y-2">
                  {thoughts.map((thought, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-2 text-sm text-[#8b949e]"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#58a6ff]" />
                      <span>{thought}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </>
          )}

          {/* Empty State Message with Examples */}
          {!query.trim() && !response && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 bg-[#161b22] border border-[#30363d] rounded-lg"
            >
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold mb-2">Your AI Research Assistant</h3>
              <p className="text-[#8b949e] mb-6">
                "I've done my PhD in everything and nothing simultaneously. 
                Quantum superposition of knowledge, you know? 🤓"
              </p>
              
              <div className="space-y-4 mt-8">
                <p className="text-sm text-[#8b949e] font-medium">Research Topic Examples:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RESEARCH_EXAMPLES.map((example, index) => (
                    <div
                      key={index}
                      onClick={() => handleExampleClick(example.prompt)}
                      className="cursor-pointer p-4 bg-[#1c2128] border border-[#30363d] rounded-lg hover:bg-[#2d333b] transition-colors text-left"
                    >
                      <h4 className="text-sm font-medium text-blue-400 mb-2">{example.title}</h4>
                      <p className="text-xs text-[#8b949e] line-clamp-3">{example.prompt}</p>
                      <button className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        Research this topic
                        <Search className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-[#8b949e] mt-6">
                Ask me anything about machine learning, and I'll give you a 
                comprehensive analysis faster than you can say "neural network"!
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500"
            >
              {error}
            </motion.div>
          )}

          {/* Research Results with Token Count */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-sm text-[#8b949e]">Response Generated</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-[#8b949e]">
                    <span>Prompt: {response.promptTokens} tokens</span>
                    <span className="mx-2">Response: {response.completionTokens} tokens</span>
                    <span className="font-bold">Total: {response.totalTokens} tokens</span>
                  </div>
                  <CopyButton content={response.text} />
                </div>
              </div>
              <div className="markdown-content bg-[#161b22] border border-[#30363d] rounded-lg p-6">
                <ReactMarkdown>{response.text}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
