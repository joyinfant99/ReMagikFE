'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '../lib/supabase';
import { Plus, Edit3, X, Save, Sparkles } from 'lucide-react';
import ChannelIcon from './ChannelIcon';

interface ToneConfig {
  id?: string;
  channel: string;
  prompt: string;
  example: string;
}

const CHANNELS = ['LinkedIn Post', 'Slack', 'Email', 'Company Communication', 'Article'];

export default function ToneManager() {
  const { user } = useAuth();
  const [tones, setTones] = useState<ToneConfig[]>([]);
  const [editingTone, setEditingTone] = useState<ToneConfig | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadTones = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
    loadTones();
  }, [user, loadTones]);

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
    <div className="space-y-6">
      <div className="glass-surface rounded-2xl p-4 shadow-sm border border-white/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
              <Edit3 className="text-white" size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Tone Settings
              </h2>
              <p className="text-gray-600 text-xs">Customize your writing style for each platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHANNELS.map(channel => {
          const tone = tones.find(t => t.channel === channel);
          return (
            <div key={channel} className="group glass-surface border border-white/20 rounded-2xl shadow-sm hover:shadow-md p-4 spring-smooth hover:scale-102 transition-all">
              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <ChannelIcon channel={channel} size={32} />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{channel}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          tone ? 'bg-green-400' : 'bg-gray-300'
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
                    className="touch-target p-2 bg-gradient-to-br from-gray-600 to-gray-700 text-white rounded-lg spring-smooth hover:scale-105 shadow-sm"
                  >
                    <Edit3 size={12} />
                  </button>
                </div>
                
                {tone ? (
                  <div className="space-y-3">
                    <div className="bg-white/60 rounded-xl p-3 border border-white/40">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p className="text-xs text-gray-600 font-medium">Tone Style</p>
                      </div>
                      <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed">{tone.prompt}</p>
                    </div>
                    {tone.example && (
                      <div className="bg-white/60 rounded-xl p-3 border border-white/40">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <p className="text-xs text-gray-600 font-medium">Example</p>
                        </div>
                        <p className="text-xs text-gray-800 line-clamp-2 leading-relaxed">{tone.example}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Sparkles className="text-white" size={16} />
                    </div>
                    <p className="text-xs text-gray-600 font-medium mb-1">No tone configured</p>
                    <p className="text-xs text-gray-500 leading-relaxed">Click edit to set up your writing style</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && editingTone && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="glass-surface border border-white/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChannelIcon channel={editingTone.channel} size={40} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {editingTone.channel}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {tones.find(t => t.channel === editingTone.channel) ? 'Edit your tone style' : 'Create new tone style'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="touch-target p-2 glass-surface rounded-xl spring-smooth hover:scale-105"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">

              {/* Tone Prompt */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white" size={12} />
                  </div>
                  <label className="text-sm font-medium text-gray-800">Writing Tone & Style</label>
                </div>
                <textarea
                  value={editingTone.prompt}
                  onChange={(e) => setEditingTone({...editingTone, prompt: e.target.value})}
                  placeholder="Describe your ideal writing style: professional, friendly, concise, creative, formal, casual..."
                  className="form-input h-32 resize-none text-sm"
                />
              </div>

              {/* Example */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="white" className="w-3 h-3">
                      <path d="M8 2a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 2z"/>
                    </svg>
                  </div>
                  <label className="text-sm font-medium text-gray-800">Example Text (Optional)</label>
                </div>
                <textarea
                  value={editingTone.example}
                  onChange={(e) => setEditingTone({...editingTone, example: e.target.value})}
                  placeholder="Provide an example of text written in your preferred style to help the AI understand better..."
                  className="form-input h-32 resize-none text-sm"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 border-t border-white/20">
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="btn btn-secondary text-sm"
                >
                  <X size={14} />
                  <span>Cancel</span>
                </button>
                <button
                  onClick={() => saveTone(editingTone)}
                  disabled={!editingTone.prompt.trim() || saving}
                  className="btn btn-primary text-sm spring-bounce"
                >
                  {saving ? (
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
      )}
    </div>
  );
}