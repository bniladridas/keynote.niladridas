import React, { useState } from 'react';
import { Button } from './button';
import { X, Send, Loader2, Shield, Building2, Linkedin, Github } from 'lucide-react';

interface HiringFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HiringForm({ isOpen, onClose }: HiringFormProps) {
  const [loading, setLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'ml-engineer',
    experience: '',
    portfolio: '',
    message: '',
    acceptedPrivacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedPrivacy) {
      alert('Please accept the privacy policy to continue');
      return;
    }
    setLoading(true);
    
    try {
      const response = await fetch('https://usebasin.com/f/bec2e3c667f5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        onClose();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      alert('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-[#1c2128] rounded-xl w-full max-w-lg border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Privacy Policy</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowPrivacy(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="prose prose-invert">
          <p>By submitting this application, you agree that:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>We will store and process your personal information for recruitment purposes</li>
            <li>Your data will be kept confidential and secure</li>
            <li>We may retain your information for future opportunities unless you request deletion</li>
            <li>You can request access to, modification of, or deletion of your data at any time</li>
          </ul>
          <p className="mt-4">Contact us at synthara.company@gmail.com for any privacy-related concerns.</p>
        </div>
      </div>
    </div>
  );

  const CompanyInfoModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-[#1c2128] rounded-xl w-full max-w-lg border border-white/10 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">About Our Company</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowCompanyInfo(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="prose prose-invert">
          <p>We are a cutting-edge ML Learning Platform focused on:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Building innovative AI/ML solutions</li>
            <li>Creating interactive learning experiences</li>
            <li>Fostering a culture of continuous learning and growth</li>
            <li>Maintaining a flexible, remote-first work environment</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4">Benefits</h3>
          <ul className="list-disc pl-4 space-y-2">
            <li>Competitive salary and equity options</li>
            <li>Flexible working hours</li>
            <li>Remote work opportunities</li>
            <li>Professional development budget</li>
            <li>Health and wellness benefits</li>
          </ul>
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.linkedin.com/company/synthara-engineering/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/synthara-company"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#1c2128] rounded-xl w-full max-w-lg border border-white/10">
          <div className="flex justify-between items-center p-4 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Join Our Team</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Name</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Email</label>
              <input
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Role</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="ml-engineer">ML Engineer</option>
                <option value="full-stack">Full Stack Developer</option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Years of Experience</label>
              <input
                type="text"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={formData.experience}
                onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Portfolio/GitHub URL</label>
              <input
                type="url"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white"
                value={formData.portfolio}
                onChange={e => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Message</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white h-24"
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="privacy"
                checked={formData.acceptedPrivacy}
                onChange={e => setFormData(prev => ({ ...prev, acceptedPrivacy: e.target.checked }))}
                className="rounded border-white/10 bg-white/5"
              />
              <label htmlFor="privacy" className="text-sm text-gray-300">
                I accept the{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-blue-400 hover:underline"
                >
                  privacy policy
                </button>
              </label>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowCompanyInfo(true)}
                className="text-purple-400 hover:underline text-sm"
              >
                Learn more about our company
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Sending...' : 'Submit Application'}
            </Button>
          </form>
        </div>
      </div>
      {showPrivacy && <PrivacyModal />}
      {showCompanyInfo && <CompanyInfoModal />}
    </>
  );
}
