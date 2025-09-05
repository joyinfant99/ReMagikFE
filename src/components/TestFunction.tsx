'use client';

import { useState } from 'react';
import { Sparkles, Copy, RotateCcw } from 'lucide-react';
import ChannelIcon from './ChannelIcon';
import PlatformPreview from './PlatformPreview';

interface TestFunctionProps {
  onFreeUsage: () => boolean;
}

const DEMO_CHANNELS = ['LinkedIn Post', 'Slack', 'Email'];

const DEFAULT_TONES = {
  'LinkedIn Post': {
    prompt: 'Professional and engaging tone for LinkedIn posts. Use clear, accessible language that encourages professional discussion and networking.',
    example: 'Just finished an interesting project with our team. Working across different departments really showed me how important clear communication is for getting things done. What approaches have worked well for you when collaborating with different teams?'
  },
  'Slack': {
    prompt: 'Friendly and collaborative tone for team communication. Be clear and helpful while maintaining a casual, approachable style.',
    example: 'Hi team! Just got off the call with the client and they really liked the new features. Quick update - we are planning to deploy on Friday afternoon. Let me know if you have any questions. Thanks everyone for the great work!'
  },
  'Email': {
    prompt: 'Professional and courteous tone for business email. Use proper structure, be respectful, and maintain appropriate business formality.',
    example: 'Hi Sarah,\n\nI hope you are doing well. I wanted to follow up on our conversation about the Q4 project timeline. After reviewing everything, I think we can have the first phase ready by November 15th.\n\nPlease let me know if you have any questions or if you would like to set up a call to discuss this further.\n\nBest regards,\nAlex'
  }
};

export default function TestFunction({ onFreeUsage }: TestFunctionProps) {
  const [inputText, setInputText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('LinkedIn Post');
  const [customPrompt, setCustomPrompt] = useState('');
  const [customExample, setCustomExample] = useState('');
  const [useDefaultTone, setUseDefaultTone] = useState(true);
  const [showToneModal, setShowToneModal] = useState(false);
  const [rewrittenText, setRewrittenText] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);

  const rewriteText = async () => {
    if (!inputText.trim()) return;
    
    // Check free usage limit
    if (!onFreeUsage()) {
      return;
    }
    
    setIsRewriting(true);
    
    try {
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          channel: selectedChannel,
          prompt: useDefaultTone ? DEFAULT_TONES[selectedChannel as keyof typeof DEFAULT_TONES]?.prompt || '' : customPrompt,
          example: useDefaultTone ? DEFAULT_TONES[selectedChannel as keyof typeof DEFAULT_TONES]?.example || '' : customExample
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setRewrittenText(data.rewrittenText);
      } else {
        throw new Error('Rewrite failed');
      }
    } catch (error) {
      console.error('Error rewriting text:', error);
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setInputText('');
    setRewrittenText('');
  };

  // Update tone when channel changes
  const handleChannelChange = (channel: string) => {
    setSelectedChannel(channel);
    if (useDefaultTone) {
      const defaultTone = DEFAULT_TONES[channel as keyof typeof DEFAULT_TONES];
      if (defaultTone) {
        setCustomPrompt(defaultTone.prompt);
        setCustomExample(defaultTone.example);
      }
    }
  };

  // Initialize with default tone for LinkedIn
  useState(() => {
    const defaultTone = DEFAULT_TONES['LinkedIn Post'];
    setCustomPrompt(defaultTone.prompt);
    setCustomExample(defaultTone.example);
  });

  return (
    <div className="glass-surface rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
          <Sparkles size={16} />
          Try ReMagik Free
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Experience AI-powered tone transformation. Perfect your message for any platform.
        </p>
      </div>

      {/* Channel Selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose Platform
        </label>
        <div className="flex gap-2 justify-center">
          {DEMO_CHANNELS.map(channel => (
            <button
              key={channel}
              onClick={() => handleChannelChange(channel)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all border-2 min-w-20 ${
                selectedChannel === channel 
                  ? 'bg-blue-50 border-blue-500 shadow-sm scale-105' 
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <ChannelIcon channel={channel} size={28} />
              <span className={`text-xs font-medium text-center leading-tight ${
                selectedChannel === channel ? 'text-blue-700' : 'text-gray-700'
              }`}>
                {channel === 'LinkedIn Post' ? 'LinkedIn' : channel}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tone Customization Button */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setShowToneModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg text-sm font-medium hover:from-purple-200 hover:to-blue-200 transition-all duration-200 border border-purple-200/50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          <span>Customize Tone for {selectedChannel === 'LinkedIn Post' ? 'LinkedIn' : selectedChannel}</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here... For example: 'Thanks for the quick turnaround on this project.'"
            className="form-input resize-none h-24 pr-12"
          />
          {inputText && (
            <button
              onClick={clearText}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Clear text"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={rewriteText}
        disabled={!inputText.trim() || isRewriting}
        className="btn btn-primary w-full mb-4 spring-bounce"
      >
        {isRewriting ? (
          <>
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span>ReMagik ✨</span>
          </>
        ) : (
          <>
            <Sparkles size={16} />
            <span>ReMagik ⭐</span>
          </>
        )}
      </button>

      {/* Result Section with Authentic Platform Preview */}
      {rewrittenText && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium mb-3">
              <span>✨</span>
              <span>Preview: {useDefaultTone ? 'Default' : 'Custom'} tone on {selectedChannel}</span>
            </div>
          </div>
          
          <PlatformPreview 
            channel={selectedChannel}
            content={rewrittenText}
            metadata={{
              sender_name: 'Alex Johnson',
              sender_email: 'alex@company.com',
              profile_image_url: '/PortraitImages/1.jpg',
              email_subject: 'Quick Update',
              email_recipients: 'team@company.com',
              linkedin_title: 'Product Manager',
              linkedin_company: 'TechCorp',
              slack_username: 'Alex Johnson',
              author_name: 'Alex Johnson',
              teams_display_name: 'Alex Johnson',
              email_signature: `Best regards,\nAlex Johnson\nProduct Manager\nTechCorp`
            }}
            onCopy={copyToClipboard}
            copied={copied}
          />
        </div>
      )}

      {/* Call to Action */}
      {rewrittenText && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Like what you see? Get unlimited access with full features.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 border border-green-200/50">
              ✓ Custom tone profiles
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 border border-purple-200/50">
              ✓ All 5 platforms
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 border border-orange-200/50">
              ✓ Unlimited rewrites
            </div>
          </div>
        </div>
      )}

      {/* Tone Customization Modal */}
      {showToneModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Customize {selectedChannel} Tone</h3>
                <button
                  onClick={() => setShowToneModal(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-white/80 text-sm mt-1">Modify the tone and style for this session</p>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tone Description
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => {
                    setCustomPrompt(e.target.value);
                    setUseDefaultTone(false);
                  }}
                  placeholder={`Describe how you want your ${selectedChannel} messages to sound...`}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Example Message
                </label>
                <textarea
                  value={customExample}
                  onChange={(e) => {
                    setCustomExample(e.target.value);
                    setUseDefaultTone(false);
                  }}
                  placeholder={`Write an example of your ideal ${selectedChannel} message...`}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none h-20 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => {
                    const defaultTone = DEFAULT_TONES[selectedChannel as keyof typeof DEFAULT_TONES];
                    if (defaultTone) {
                      setCustomPrompt(defaultTone.prompt);
                      setCustomExample(defaultTone.example);
                      setUseDefaultTone(true);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Reset to Default
                </button>
                <button
                  onClick={() => setShowToneModal(false)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}