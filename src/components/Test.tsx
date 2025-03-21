import React, { useState } from 'react';
import { getAIResponse } from '@/lib/ai';
import { Button, CopyButton } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Brain, Wand, Loader2, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface TestResult {
  type: 'code' | 'explanation' | 'creative';
  prompt: string;
  response: string;
}

export function Test() {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTest, setCurrentTest] = useState<string | null>(null);

  const tests = [
    {
      type: 'code' as const,
      name: 'Code Generation',
      description: 'Generate React components with detailed explanations',
      icon: Code,
      prompt: 'Write a React component that creates an animated loading spinner with CSS. Include comments explaining the code.',
      className: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      type: 'explanation' as const,
      name: 'Technical Concepts',
      description: 'Get clear explanations of complex topics',
      icon: Brain,
      prompt: 'Explain how React\'s Virtual DOM works and why it improves performance. Keep it clear and concise.',
      className: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      type: 'creative' as const,
      name: 'Creative Writing',
      description: 'Generate engaging stories and content',
      icon: Wand,
      prompt: 'Write a short, creative story about a developer debugging a mysterious bug in their code. Make it engaging and fun.',
      className: 'bg-gradient-to-br from-purple-500 to-purple-600'
    }
  ];

  const runTest = async (type: 'code' | 'explanation' | 'creative', prompt: string) => {
    if (loading) return;
    
    setLoading(true);
    setError('');
    setCurrentTest(type);

    try {
      // Enhanced prompt based on test type
      let enhancedPrompt = prompt;
      if (type === 'code') {
        enhancedPrompt = `${prompt}\n\nPlease format the response in markdown with proper code blocks and explanations.`;
      } else if (type === 'explanation') {
        enhancedPrompt = `${prompt}\n\nPlease provide a clear and structured explanation with examples where appropriate.`;
      }

      const aiResponse = await getAIResponse(enhancedPrompt);
      
      if (!aiResponse || !aiResponse.text) {
        throw new Error('Invalid response from AI service');
      }

      setResults(prev => [{
        type,
        prompt,
        response: aiResponse.text
      }, ...prev]);

    } catch (err) {
      console.error('Test error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while generating the response');
    } finally {
      setLoading(false);
      setCurrentTest(null);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              className="hover:bg-surface text-text-primary"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            {results.length > 0 && (
              <Button
                variant="outline"
                onClick={clearResults}
                className="text-red-400 border-red-400/20 hover:bg-red-400/10 hover:border-red-400/40"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Results
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">AI Capabilities Test</h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore different AI capabilities through these interactive tests. Each test demonstrates a unique aspect of the AI system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tests.map((test) => (
            <div
              key={test.type}
              className="group bg-surface rounded-xl overflow-hidden border border-border/40 hover:border-border/80 transition-all duration-300"
            >
              <div className={`${test.className} p-6 transition-all duration-300`}>
                <test.icon className="h-8 w-8 text-white mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-lg font-semibold text-white mb-2">{test.name}</h3>
                <p className="text-white/80 text-sm">{test.description}</p>
              </div>
              <div className="p-4 bg-surface">
                <Button
                  onClick={() => runTest(test.type, test.prompt)}
                  disabled={loading}
                  variant="outline"
                  className="w-full relative"
                >
                  {loading && currentTest === test.type ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Run Test'
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-surface rounded-xl border border-border/40 overflow-hidden shadow-lg"
            >
              <div className="p-6 border-b border-border/40">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {result.type === 'code' && <Code className="text-blue-400" />}
                    {result.type === 'explanation' && <Brain className="text-green-400" />}
                    {result.type === 'creative' && <Wand className="text-purple-400" />}
                    <h3 className="font-semibold text-lg text-text-primary">
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)} Response
                    </h3>
                  </div>
                  <CopyButton content={result.response} />
                </div>
                <div className="bg-background/50 rounded-lg p-4 text-sm text-text-secondary">
                  <strong className="text-text-primary">Prompt:</strong> {result.prompt}
                </div>
              </div>
              <div className="p-6 bg-background/50 prose prose-invert max-w-none">
                <ReactMarkdown>{result.response}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
