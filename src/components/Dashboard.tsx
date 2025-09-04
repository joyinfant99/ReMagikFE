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

const CHANNELS = ['Slack', 'Email', 'Company Communication', 'Article', 'LinkedIn Post'];

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
      <div className={`${isLandingPage ? '' : 'min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'}`}>
        {/* Header - only show for authenticated users */}
        {!isLandingPage && (
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-2">
                  <img 
                    src="/PortraitImages/ReMagik-removebg-preview.png" 
                    alt="ReMagik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    ReMagik
                  </h1>
                  <p className="text-xs text-gray-500">AI-Powered Writing Assistant</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user?.displayName?.charAt(0) || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user?.displayName?.split(' ')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => setShowToneManager(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Tone Settings"
                >
                  <Settings size={18} className="text-gray-600 group-hover:text-gray-800" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Sign out"
                >
                  <LogOut size={18} className="text-gray-600 group-hover:text-gray-800" />
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className={`max-w-7xl mx-auto px-6 ${isLandingPage ? 'py-0' : 'py-6'}`}>
          <div className="space-y-6">
            {/* Horizontal Platform Selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/30 inline-flex">
                {CHANNELS.map(channel => {
                  const isSelected = selectedChannel === channel;
                  return (
                    <button
                      key={channel}
                      onClick={() => setSelectedChannel(channel)}
                      className={`relative px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                        isSelected 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }`}
                    >
                      <ChannelIcon channel={channel} size={20} />
                      <span className="text-sm font-medium whitespace-nowrap">{channel}</span>
                      {isSelected && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Text Editor and Output */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
                        <path d="M8 1.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5v7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Message</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowToneModal(true)}
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 transition-colors"
                      title="Edit tone for this platform"
                    >
                      <ChannelIcon channel={selectedChannel} size={20} />
                      <span className="text-xs font-semibold text-gray-700">
                        {selectedChannel}
                      </span>
                      <Edit3 size={14} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <RichTextEditor
                    content={inputHtml}
                    onChange={setInputHtml}
                    placeholder="Write your message here and watch the magic happen..."
                    height="h-80"
                    expandable={true}
                  />
                </div>
                
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => rewriteText()}
                    disabled={!inputHtml.trim() || isRewriting}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm disabled:cursor-not-allowed"
                  >
                    {isRewriting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>ReMagik...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={16} />
                        <span>ReMagik</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-8">
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
                      email_signature: `Best regards,\n${user?.displayName || 'Your Name'}\n${generateRandomTitle()}\n${generateRandomCompany()}`
                    }}
                    onCopy={copyToClipboard}
                    copied={copied}
                    onRegenerate={rewriteText}
                    isRegenerating={isRewriting}
                  />
                ) : (
                  <div className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                        <Wand2 className="text-white" size={32} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Preview will appear here</h3>
                      <p className="text-gray-600 mb-1">Write your message and click transform to see how it looks on {selectedChannel}</p>
                      <p className="text-gray-500 text-sm">Customize your profile and settings for authentic previews</p>
                    </div>
                  </div>
                )}
              </div>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Tone Manager</h2>
              <button
                onClick={() => setShowToneManager(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
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
        method: tone ? 'PUT' : 'POST',
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`${style.bg} rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden ${style.border} border-2`}>
        <div className={`bg-gradient-to-r ${style.accent} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChannelIcon channel={channel} size={32} />
              <div>
                <h2 className="text-xl font-semibold">{channel} Tone Settings</h2>
                <p className="text-white/80 text-sm">Customize your writing style for {channel}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tone Description
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe the tone and style for ${channel} messages...`}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Example Text
            </label>
            <textarea
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder={`Provide an example of the desired ${channel} style...`}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={saveTone}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
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
