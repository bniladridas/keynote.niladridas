import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, X, Send, Loader2, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';

interface BugReportProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BugReport({ isOpen, onClose }: BugReportProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    expectedBehavior: '',
    actualBehavior: '',
    browserInfo: navigator.userAgent,
    screenshot: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
    
    // Reset after showing success message
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setStep(1);
      setFormData({
        title: '',
        description: '',
        steps: '',
        expectedBehavior: '',
        actualBehavior: '',
        browserInfo: navigator.userAgent,
        screenshot: null,
      });
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#1c2128] rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#30363d]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-red-400" />
                  <h2 className="text-xl font-semibold text-white">Report a Bug</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-[#30363d]"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <CheckCircle className="w-16 h-16 text-green-400" />
                  <p className="text-lg text-white">Thank you for your report!</p>
                  <p className="text-sm text-gray-400">We'll look into this issue shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Bug Title
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of the issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        placeholder="What went wrong? Please provide as much detail as possible."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Steps to Reproduce
                      </label>
                      <textarea
                        value={formData.steps}
                        onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                        className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1. First step&#10;2. Second step&#10;3. ..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                          Expected Behavior
                        </label>
                        <textarea
                          value={formData.expectedBehavior}
                          onChange={(e) => setFormData({ ...formData, expectedBehavior: e.target.value })}
                          className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="What should have happened?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">
                          Actual Behavior
                        </label>
                        <textarea
                          value={formData.actualBehavior}
                          onChange={(e) => setFormData({ ...formData, actualBehavior: e.target.value })}
                          className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="What happened instead?"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-1">
                        Screenshot (optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({ ...formData, screenshot: e.target.files?.[0] || null })}
                        className="w-full px-3 py-2 bg-[#30363d] rounded-md border border-[#484f58] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={onClose}
                      className="hover:bg-[#30363d]"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}