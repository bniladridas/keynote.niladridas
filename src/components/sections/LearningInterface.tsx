import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { Brain, BookOpen, Database, Code, BarChart, Rocket, ArrowLeft, Cpu, Settings, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { LearningModule } from './LearningModule';
import { AIProviderSwitch } from '../AIProviderSwitch';

const topics = [
  {
    id: 'intro',
    title: 'Introduction to ML',
    icon: Brain,
    content: 'Learn the fundamentals of Machine Learning and its applications.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['What is Machine Learning?', 'Types of Machine Learning', 'Common Applications']
  },
  {
    id: 'math',
    title: 'Mathematics Behind ML',
    icon: BookOpen,
    content: 'Master the essential mathematical concepts driving ML algorithms.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Linear Algebra Basics', 'Probability Theory', 'Calculus for ML']
  },
  {
    id: 'preprocessing',
    title: 'Data Preprocessing',
    icon: Database,
    content: 'Learn how to prepare and clean data for ML models.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Data Cleaning', 'Feature Engineering', 'Data Normalization']
  },
  {
    id: 'model',
    title: 'Model Building',
    icon: Code,
    content: 'Build ML models from scratch with step-by-step guidance.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Linear Regression', 'Decision Trees', 'Neural Networks']
  },
  {
    id: 'training',
    title: 'Training & Evaluation',
    icon: BarChart,
    content: 'Master model training techniques and performance metrics.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Model Training Process', 'Evaluation Metrics', 'Cross-validation']
  },
  {
    id: 'deployment',
    title: 'Model Deployment',
    icon: Rocket,
    content: 'Learn how to deploy ML models to production environments.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    concepts: ['Model Serialization', 'API Development', 'Cloud Deployment']
  }
];

export function LearningInterface() {
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  
  return (
    <div className="min-h-screen bg-transparent text-[#c9d1d9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <Button
            variant="ghost"
            className="hover:bg-[#30363d] text-[#c9d1d9] group transition-all duration-300"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Button>
          <AIProviderSwitch />
        </div>

        {/* AI Model Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 bg-gradient-to-br from-[#161b22] to-[#1c2128] border border-[#30363d] rounded-lg p-6 shadow-xl"
        >
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <Cpu className="w-8 h-8 text-[#58a6ff]" />
                <div className="absolute inset-0 animate-ping opacity-20 bg-[#58a6ff] rounded-full" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#58a6ff] to-[#a2d2ff] bg-clip-text text-transparent">
                Powered by Gemini 2.0 Flash Lite 🚀
              </h3>
              <p className="text-[#c9d1d9] text-sm sm:text-base leading-relaxed">
                Built for devs who appreciate clean code and fast feedback loops. 
                This isn't your average learning platform – it's your AI-powered coding companion.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3 bg-[#1c2128]/50 p-4 rounded-lg border border-[#30363d]/50">
                  <h4 className="text-[#58a6ff] font-semibold flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Tech Specs
                  </h4>
                  <ul className="space-y-2">
                    {[
                      '0.7 temperature for that perfect vibe',
                      '2048 tokens for detailed explanations',
                      'Optimized for rapid responses'
                    ].map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-[#58a6ff]">→</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 bg-[#1c2128]/50 p-4 rounded-lg border border-[#30363d]/50">
                  <h4 className="text-[#58a6ff] font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Vibe Check
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Clean, concise explanations',
                      'Real-world code examples',
                      'Built for modern developers'
                    ].map((vibe, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-[#58a6ff]">→</span>
                        <span>{vibe}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-[#1c2128]/50 rounded-lg border border-[#30363d]/50">
                <h4 className="text-[#58a6ff] font-semibold flex items-center gap-2 mb-2">
                  <Rocket className="w-4 h-4" />
                  Quick Test Drive
                </h4>
                <p className="text-sm">
                  Want to see it in action? Just add <code className="bg-[#2d333b] px-2 py-0.5 rounded text-[#c9d1d9]">/test</code> to the URL!
                  Example: <code className="bg-[#2d333b] px-2 py-0.5 rounded text-[#c9d1d9]">localhost:3000/test</code>
                </p>
              </div>

              <p className="text-xs text-[#8b949e] italic mt-4">
                Pro tip: The model is tuned for both beginners and experienced devs. 
                No matter your skill level, we've got your back! 💫
              </p>
            </div>
          </div>
        </motion.div>

        {/* Learning Path Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-[#58a6ff] to-[#a2d2ff] bg-clip-text text-transparent">
            Learning Path
          </h1>

          <Tabs.Root 
            defaultValue="intro"
            className="space-y-8"
            onValueChange={(value) => {
              setActiveTopic(topics.find(t => t.id === value) || topics[0]);
              setSelectedConcept(null);
            }}
          >
            <Tabs.List className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <Tabs.Trigger
                  key={topic.id}
                  value={topic.id}
                  className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-[#1c2128] hover:bg-[#2d333b] border border-[#30363d] transition-all duration-300 data-[state=active]:bg-[#58a6ff] data-[state=active]:text-white"
                >
                  <topic.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{topic.title}</span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {topics.map((topic) => (
              <Tabs.Content
                key={topic.id}
                value={topic.id}
                className="space-y-6 focus:outline-none"
              >
                {!selectedConcept ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <div className="space-y-6">
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#58a6ff]">
                        {topic.title}
                      </h2>
                      <p className="text-[#c9d1d9] text-sm sm:text-base leading-relaxed">
                        {topic.content}
                      </p>
                      <div className="grid gap-3">
                        {topic.concepts.map((concept) => (
                          <Button 
                            key={concept}
                            className="w-full justify-start bg-[#1c2128] hover:bg-[#2d333b] border border-[#30363d] text-left p-4 transition-all duration-300 hover:translate-x-1 group"
                            onClick={() => setSelectedConcept(concept)}
                          >
                            <ChevronRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            {concept}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-[300px] sm:h-[400px] rounded-xl overflow-hidden">
                      <img
                        src={topic.image}
                        alt={topic.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent" />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#58a6ff]">
                        {selectedConcept}
                      </h2>
                      <Button
                        variant="ghost"
                        className="hover:bg-[#30363d] group"
                        onClick={() => setSelectedConcept(null)}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Topics
                      </Button>
                    </div>
                    <LearningModule 
                      topic={activeTopic.title} 
                      concept={selectedConcept} 
                    />
                  </motion.div>
                )}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </motion.div>
      </div>
    </div>
  );
}
