'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from './Dashboard';
import AuthModal from './AuthModal';
import { Sparkles, MessageCircle, Mail, Linkedin, Users, Zap, CheckCircle, Star } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const [freeUsageCount, setFreeUsageCount] = useState(0);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const FREE_USAGE_LIMIT = 3;

  const handleFreeUsage = () => {
    if (freeUsageCount >= FREE_USAGE_LIMIT) {
      setShowAuthModal(true);
      return false;
    }
    setFreeUsageCount(prev => prev + 1);
    return true;
  };

  if (user) {
    return <Dashboard />;
  }

  if (showSignupPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center p-2">
            <img 
              src="/PortraitImages/ReMagik-removebg-preview.png" 
              alt="ReMagik Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue with ReMagik</h2>
          <p className="text-gray-600 mb-6">
            You've used your free rewrites! Sign in to continue using ReMagik with unlimited access.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
          <button
            onClick={() => setShowSignupPrompt(false)}
            className="mt-3 text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full bg-gradient-to-br from-blue-100/20 to-purple-100/20"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-20 pb-16 text-center lg:pt-32">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-1">
                    <img 
                      src="/PortraitImages/ReMagik-removebg-preview.png" 
                      alt="ReMagik Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">ReMagik</h1>
                </div>
              </div>
              
              <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl mb-8">
                Transform Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Writing</span>
                <br />
                For Any Platform
              </h2>
              
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                AI-powered tone rewriter that adapts your content for Slack, LinkedIn, Email, Teams, and Articles. 
                Preview exactly how your message will look before you send it.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Sparkles size={20} />
                  <span>Get Started Free</span>
                </button>
                <a
                  href="#demo"
                  className="text-gray-600 hover:text-gray-900 font-medium px-8 py-4 transition-colors"
                >
                  See how it works →
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">100% Free</h4>
                  <p className="text-xs text-gray-600">No hidden costs or premium tiers</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Instant Access</h4>
                  <p className="text-xs text-gray-600">Works directly in your browser</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles size={20} className="text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">AI-Powered</h4>
                  <p className="text-xs text-gray-600">Advanced GPT technology</p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm border border-white/40 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Privacy First</h4>
                  <p className="text-xs text-gray-600">Your data stays secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Try ReMagik Now</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the power of AI-driven tone transformation. Try it free, no signup required.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Dashboard isLandingPage={true} onFreeUsage={handleFreeUsage} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ReMagik?</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most advanced tone rewriting tool for modern professionals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Instant Transformation</h4>
              <p className="text-gray-600">Transform your writing tone in seconds with AI-powered rewriting for any platform.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="text-green-600" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Multi-Platform Support</h4>
              <p className="text-gray-600">Optimized for Slack, LinkedIn, Email, Teams, and Articles with authentic previews.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-purple-600" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Custom Tone Profiles</h4>
              <p className="text-gray-600">Create and save custom tone profiles for different communication contexts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and effective in just three steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Write Your Message</h4>
              <p className="text-gray-600">Type or paste your content into the editor.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">Choose Platform</h4>
              <p className="text-gray-600">Select your target platform and tone style.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">ReMagik & Preview</h4>
              <p className="text-gray-600">Get your transformed text with authentic platform preview.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1">
                  <img 
                    src="/PortraitImages/ReMagik-removebg-preview.png" 
                    alt="ReMagik Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl font-bold">ReMagik</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-powered writing assistant that helps you communicate effectively across all platforms.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-sm">4.9/5 from users</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platforms</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <MessageCircle size={16} />
                  <span>Slack</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>Email</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Teams</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Project</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="https://joyinfant.me/projects/remagik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
                <li>Free to use</li>
                <li>Open source</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 ReMagik. Made with ❤️ by{' '}
              <a 
                href="https://joyinfant.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Joy Infant
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      )}
    </div>
  );
}