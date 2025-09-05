'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ToneManager from './ToneManager';
import RichTextEditor from './RichTextEditor';
import ChannelIcon from './ChannelIcon';
import PlatformPreview from './PlatformPreview';
import { Copy, Wand2, Settings, LogOut, Sparkles, Edit3, X, Save } from 'lucide-react';

interface ToneConfig {
  id?: string;
  channel: string;
  prompt: string;
  example: string;
}

const CHANNELS = ['LinkedIn Post', 'Slack', 'Email', 'Company Communication', 'Article'];

const generateRandomTitle = () => {
  const titles = [
    'Software Engineer', 'Product Manager', 'Marketing Director', 'Sales Manager', 
    'Data Scientist', 'UX Designer', 'Business Analyst', 'Operations Manager',
    'Content Creator', 'Growth Manager', 'Technical Lead', 'Project Manager'
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const generateRandomCompany = () => {
  const companies = [
    'TechCorp', 'InnovateLabs', 'DataFlow Inc', 'CloudVision', 'NextGen Solutions',
    'Digital Dynamics', 'FutureTech', 'SmartSystems', 'AgileWorks', 'CodeCraft'
  ];
  return companies[Math.floor(Math.random() * companies.length)];
};

interface DashboardProps {
  isLandingPage?: boolean;
  onFreeUsage?: () => boolean;
}

export default function Dashboard({ isLandingPage = false, onFreeUsage }: DashboardProps = {}) {
  const { user, logout } = useAuth();
  const [tones, setTones] = useState<ToneConfig[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('Slack');
  const [inputHtml, setInputHtml] = useState('');
  const [rewrittenHtml, setRewrittenHtml] = useState('');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToneModal, setShowToneModal] = useState(false);
  const [showToneManager, setShowToneManager] = useState(false);

  useEffect(() => {
    loadTones();
  }, [user]);


  const loadTones = async () => {
    if (!user || !user.email) return;
    
    try {
      console.log('Loading tones for user:', user.email);
      const response = await fetch(`/api/tones?userId=${encodeURIComponent(user.email)}`);
      const data = await response.json();
      
      if (response.ok) {
        console.log('Loaded tones:', data);
        setTones(data);
      } else {
        console.error('Failed to load tones:', data);
      }
    } catch (error) {
      console.error('Error loading tones:', error);
    }
  };

  const rewriteText = async () => {
    const textToRewrite = inputHtml || inputText;
    if (!textToRewrite.trim()) return;
    
    // Check free usage limit for landing page
    if (isLandingPage && onFreeUsage && !onFreeUsage()) {
      return;
    }
    
    const tone = tones.find(t => t.channel === selectedChannel);
    
    setIsRewriting(true);
    
    try {
      console.log('Rewriting with tone:', {
        channel: selectedChannel,
        hasPrompt: !!tone?.prompt,
        hasExample: !!tone?.example,
        promptPreview: tone?.prompt?.substring(0, 50) + '...',
        examplePreview: tone?.example?.substring(0, 50) + '...'
      });
      
      const response = await fetch('/api/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToRewrite,
          channel: selectedChannel,
          prompt: tone?.prompt || '',
          example: tone?.example || ''
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setRewrittenText(data.rewrittenText);
        setRewrittenHtml(data.rewrittenText);
      } else {
        const errorData = await response.json();
        console.error('Rewrite failed:', errorData);
        alert('Failed to rewrite text: ' + (errorData.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error rewriting text:', error);
      alert('Error rewriting text: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsRewriting(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className={`${isLandingPage ? '' : 'min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'}`}>
        {/* Header */}
        {!isLandingPage && (
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="fluid-container py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center">
                  <img 
                    src="/PortraitImages/ReMagik-removebg-preview.png" 
                    alt="ReMagik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">
                    ReMagik
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">AI Writing Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 glass-surface rounded-full px-3 py-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {user?.displayName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-xs font-medium text-gray-700 hidden sm:block">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => setShowToneManager(true)}
                  className="touch-target p-2 glass-surface rounded-xl spring-smooth hover:scale-105"
                  title="Tone Settings"
                >
                  <Settings size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={logout}
                  className="touch-target p-2 glass-surface rounded-xl spring-smooth hover:scale-105"
                  title="Sign out"
                >
                  <LogOut size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className={`fluid-container ${isLandingPage ? 'py-0' : 'py-4 sm:py-6'} space-y-4 sm:space-y-6`}>
            {/* Channel Selector */}
            <div className="glass-surface rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Choose Platform</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {CHANNELS.map(channel => {
                  const isSelected = selectedChannel === channel;
                  return (
                    <button
                      key={channel}
                      onClick={() => setSelectedChannel(channel)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 border-2 ${
                        isSelected 
                          ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-500 shadow-md transform scale-105' 
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                      }`}
                    >
                      <ChannelIcon channel={channel} size={24} />
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isSelected ? 'text-blue-700' : 'text-gray-700'
                      }`}>
                        {channel === 'LinkedIn Post' ? 'LinkedIn' : channel === 'Company Communication' ? 'Teams' : channel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile-First Editor */}
            <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6">
              <div className="glass-surface rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <Edit3 size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Write Message</span>
                  </div>
                  <button
                    onClick={() => setShowToneModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg text-xs font-medium hover:from-purple-200 hover:to-blue-200 transition-all duration-200 border border-purple-200/50"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Customize Tone
                  </button>
                </div>
                
                <div className="mb-4">
                  <RichTextEditor
                    content={inputHtml}
                    onChange={setInputHtml}
                    placeholder="Type your message here..."
                    height="h-32 lg:h-36"
                    expandable={true}
                  />
                </div>
                
                <button
                  onClick={() => rewriteText()}
                  disabled={!inputHtml.trim() || isRewriting}
                  className="btn btn-primary w-full spring-bounce"
                >
                  {isRewriting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>ReMagik ✨</span>
                    </>
                  ) : (
                    <>
                      <Wand2 size={16} />
                      <span>ReMagik ⭐</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview Section */}
              <div className="glass-surface rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{selectedChannel} Preview</span>
                </div>
                
                {rewrittenText ? (
                  <PlatformPreview 
                    channel={selectedChannel}
                    content={rewrittenText}
                    metadata={{
                      sender_name: user?.displayName || 'Your Name',
                      sender_email: user?.email || 'your.email@company.com',
                      profile_image_url: user?.photoURL || undefined,
                      email_subject: 'Email Subject',
                      email_recipients: 'team@company.com',
                      linkedin_title: generateRandomTitle(),
                      linkedin_company: generateRandomCompany(),
                      slack_username: user?.displayName || 'Your Name',
                      author_name: user?.displayName || 'Author Name',
                      teams_display_name: user?.displayName || 'Your Name',
                      email_signature: `Best regards,\\n${user?.displayName || 'Your Name'}\\n${generateRandomTitle()}\\n${generateRandomCompany()}`
                    }}
                    onCopy={copyToClipboard}
                    copied={copied}
                    onRegenerate={rewriteText}
                    isRegenerating={isRewriting}
                  />
                ) : (
                  <div className="h-32 lg:h-40 flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-3">
                      <Sparkles size={20} className="text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 font-medium mb-1">Preview appears here</p>
                    <p className="text-xs text-gray-500 max-w-xs leading-relaxed">Write your message and click "Transform with AI" to see how it looks on {selectedChannel}</p>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>

      {/* Tone Settings Modal */}
      {showToneModal && (
        <ToneEditModal 
          channel={selectedChannel}
          tones={tones}
          onSave={loadTones}
          onClose={() => setShowToneModal(false)}
        />
      )}

      {/* Tone Manager Modal */}
      {showToneManager && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-surface rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-white/20">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
              <h2 className="text-lg font-semibold text-gray-900">Tone Manager</h2>
              <button
                onClick={() => setShowToneManager(false)}
                className="touch-target p-2 glass-surface rounded-xl spring-smooth hover:scale-105"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              <ToneManager />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Tone Edit Modal Component
function ToneEditModal({ channel, tones, onSave, onClose }: {
  channel: string;
  tones: ToneConfig[];
  onSave: () => void;
  onClose: () => void;
}) {
  const tone = tones.find(t => t.channel === channel);
  const [prompt, setPrompt] = useState(tone?.prompt || '');
  const [example, setExample] = useState(tone?.example || '');
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();

  const saveTone = async () => {
    if (!user?.email) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/tones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: tone?.id,
          userId: user.email,
          channel,
          prompt,
          example
        })
      });
      
      if (response.ok) {
        onSave();
        onClose();
      }
    } catch (error) {
      console.error('Error saving tone:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getModalStyle = () => {
    switch (channel) {
      case 'Slack':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-purple-100',
          accent: 'from-purple-600 to-purple-700',
          border: 'border-purple-200'
        };
      case 'LinkedIn Post':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          accent: 'from-blue-600 to-blue-700',
          border: 'border-blue-200'
        };
      case 'Email':
        return {
          bg: 'bg-gradient-to-br from-red-50 to-red-100',
          accent: 'from-red-600 to-red-700',
          border: 'border-red-200'
        };
      case 'Article':
        return {
          bg: 'bg-gradient-to-br from-green-50 to-green-100',
          accent: 'from-green-600 to-green-700',
          border: 'border-green-200'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-gray-100',
          accent: 'from-gray-600 to-gray-700',
          border: 'border-gray-200'
        };
    }
  };

  const style = getModalStyle();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="glass-surface rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden border border-white/20">
        <div className={`bg-gradient-to-r ${style.accent} text-white p-4 sm:p-6 rounded-t-3xl sm:rounded-t-3xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChannelIcon channel={channel} size={24} className="sm:w-8 sm:h-8" />
              <div>
                <h2 className="text-base sm:text-lg font-semibold">{channel} Tone Settings</h2>
                <p className="text-white/80 text-xs">Customize your writing style for {channel}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="touch-target p-2 glass-surface-dark rounded-xl spring-smooth hover:scale-105"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-120px)]">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tone Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe the tone and style for ${channel} messages...`}
              className="form-input h-24 sm:h-28 resize-none text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Example Text
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder={`Provide an example of the desired ${channel} style...`}
              className="form-input h-24 sm:h-28 resize-none text-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="btn btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={saveTone}
              disabled={isSaving}
              className="btn btn-primary text-sm spring-bounce"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
