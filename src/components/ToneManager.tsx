'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Plus, Edit3, X, Save, Sparkles } from 'lucide-react';
import ChannelIcon from './ChannelIcon';

interface ToneConfig {
  id?: string;
  channel: string;
  prompt: string;
  example: string;
}

const CHANNELS = ['Slack', 'Email', 'Company Communication', 'Article', 'LinkedIn Post'];

export default function ToneManager() {
  const { user } = useAuth();
  const [tones, setTones] = useState<ToneConfig[]>([]);
  const [editingTone, setEditingTone] = useState<ToneConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTones();
  }, [user]);

  const loadTones = async () => {
    if (!user || !user.email) return;
    
    try {
      const response = await fetch(`/api/tones?userId=${encodeURIComponent(user.email)}`);
      if (response.ok) {
        const data = await response.json();
        setTones(data);
      }
    } catch (error) {
      console.error('Error loading tones:', error);
    }
  };

  const saveTone = async (tone: ToneConfig) => {
    if (!user || !user.email) return;

    setSaving(true);
    try {
      console.log('Saving tone:', { user_id: user.email, ...tone });
      
      const response = await fetch('/api/tones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.email,
          channel: tone.channel,
          prompt: tone.prompt,
          example: tone.example
        })
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Tone saved successfully:', responseData);
        await loadTones();
        setIsModalOpen(false);
        setEditingTone(null);
      } else {
        const responseData = await response.json();
        console.error('Failed to save tone:', response.status, responseData);
        alert('Failed to save tone: ' + (responseData.error || `HTTP ${response.status}`));
      }
    } catch (error) {
      console.error('Error saving tone:', error);
      alert('Error saving tone: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const openModal = (tone?: ToneConfig) => {
    setEditingTone(tone || { channel: CHANNELS[0], prompt: '', example: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTone(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Edit3 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Tone Settings
              </h2>
              <p className="text-gray-600 text-sm">Customize your writing style for each platform</p>
            </div>
          </div>
          <button
            onClick={() => openModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm"
          >
            <Plus size={16} />
            <span>Add Tone</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {CHANNELS.map(channel => {
          const tone = tones.find(t => t.channel === channel);
          return (
            <div key={channel} className="group bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <ChannelIcon channel={channel} size={48} />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{channel}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          tone ? 'bg-green-400 animate-pulse' : 'bg-gray-300'
                        }`}></div>
                        <span className={`text-xs font-medium ${
                          tone ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {tone ? 'Configured' : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(tone || { channel, prompt: '', example: '' })}
                    className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 shadow-sm"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>
                
                {tone ? (
                  <div className="space-y-4">
                    <div className="bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Tone Style</p>
                      </div>
                      <p className="text-sm text-gray-800 line-clamp-3 leading-relaxed">{tone.prompt}</p>
                    </div>
                    {tone.example && (
                      <div className="bg-white/50 backdrop-blur-sm border border-white/40 rounded-2xl p-4">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Example</p>
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-3 leading-relaxed">{tone.example}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">No tone configured</p>
                    <p className="text-xs text-gray-500">Click edit to set up your writing style</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Modal */}
      {isModalOpen && editingTone && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-md p-8 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ChannelIcon channel={editingTone.channel} size={56} />
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {editingTone.channel}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {tones.find(t => t.channel === editingTone.channel) ? 'Edit your tone style' : 'Create new tone style'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="group relative overflow-hidden p-3 bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-2xl shadow-lg hover:shadow-gray-500/25 transition-all duration-300 hover:scale-110 transform border border-white/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <X className="relative z-10" size={18} />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
              {/* Channel Selection */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
                      <circle cx="8" cy="8" r="3"/>
                    </svg>
                  </div>
                  <label className="text-lg font-semibold text-gray-800">Select Platform</label>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {CHANNELS.map(channel => (
                    <button
                      key={channel}
                      onClick={() => setEditingTone({...editingTone, channel})}
                      className={`group relative p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        editingTone.channel === channel 
                          ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-3 ring-blue-400 ring-offset-2 ring-offset-white/50 shadow-lg' 
                          : 'bg-white/50 hover:bg-white/80 opacity-60 hover:opacity-90 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <ChannelIcon channel={channel} size={40} />
                        <span className={`text-xs font-medium ${
                          editingTone.channel === channel ? 'text-blue-700' : 'text-gray-600'
                        }`}>
                          {channel.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Prompt */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="text-white" size={16} />
                  </div>
                  <label className="text-lg font-semibold text-gray-800">Writing Tone & Style</label>
                </div>
                <textarea
                  value={editingTone.prompt}
                  onChange={(e) => setEditingTone({...editingTone, prompt: e.target.value})}
                  placeholder="Describe your ideal writing style: professional, friendly, concise, creative, formal, casual..."
                  className="w-full h-40 p-6 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-inner resize-none focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-gray-800 placeholder-gray-500 text-base leading-relaxed"
                />
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="white" className="w-4 h-4">
                      <path d="M8 2a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 2z"/>
                    </svg>
                  </div>
                  <label className="text-lg font-semibold text-gray-800">Example Text (Optional)</label>
                </div>
                <textarea
                  value={editingTone.example}
                  onChange={(e) => setEditingTone({...editingTone, example: e.target.value})}
                  placeholder="Provide an example of text written in your preferred style to help the AI understand better..."
                  className="w-full h-40 p-6 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl shadow-inner resize-none focus:ring-3 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 text-gray-800 placeholder-gray-500 text-base leading-relaxed"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-md p-8 border-t border-white/20">
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                >
                  <X size={16} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={() => saveTone(editingTone)}
                  disabled={!editingTone.prompt.trim() || saving}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm disabled:cursor-not-allowed"
                >
                  {saving ? (
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
      )}
    </div>
  );
}