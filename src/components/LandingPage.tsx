'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Dashboard from './Dashboard';
import AuthModal from './AuthModal';
import TestFunction from './TestFunction';
import { Sparkles, MessageSquare, Mail, Linkedin, Users, Zap, CheckCircle, Star, ArrowRight, Play } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const [freeUsageCount, setFreeUsageCount] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('freeUsageCount') || '0');
    }
    return 0;
  });
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const FREE_USAGE_LIMIT = 3;

  const handleFreeUsage = () => {
    if (freeUsageCount >= FREE_USAGE_LIMIT) {
      setShowSignupPrompt(true);
      return false;
    }
    const newCount = freeUsageCount + 1;
    setFreeUsageCount(newCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem('freeUsageCount', newCount.toString());
    }
    return true;
  };

  if (user) {
    return <Dashboard />;
  }

  if (showSignupPrompt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="glass-surface rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center spring-bounce">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center p-3 shadow-lg">
            <img 
              src="/PortraitImages/ReMagik-removebg-preview.png" 
              alt="ReMagik Logo" 
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Continue with ReMagik</h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            You've used your {FREE_USAGE_LIMIT} free transformations! Sign in to continue with unlimited access.
          </p>
          <button
            onClick={() => setShowAuthModal(true)}
            className="btn btn-primary w-full mb-3 spring-bounce"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Continue with Google</span>
          </button>
          <button
            onClick={() => setShowSignupPrompt(false)}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            ← Back to demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Enhanced animated background elements for desktop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-64 h-64 lg:w-96 lg:h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 lg:w-96 lg:h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="hidden lg:block absolute top-1/2 left-1/4 w-32 h-32 bg-indigo-200/10 rounded-full blur-2xl animate-bounce"></div>
        </div>
        
        <div className="relative fluid-container">
          <div className="pt-12 pb-8 sm:pt-20 sm:pb-16 text-center">
            {/* Logo and Brand */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <img 
                  src="/PortraitImages/ReMagik-removebg-preview.png" 
                  alt="ReMagik Logo" 
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain spring-bounce"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">ReMagik</h1>
              </div>
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-700 border border-blue-200/50 shadow-sm">
                  <Sparkles size={14} className="text-blue-600" />
                  <span>Professional Writing Assistant</span>
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-6 lg:mb-8 leading-tight text-center tracking-tight">
              Master Professional Communication <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Across Every Platform</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-fluid lg:desktop-subtitle text-gray-600 lg:text-gray-600 mb-8 lg:mb-12 max-w-3xl lg:max-w-5xl mx-auto leading-relaxed text-center">
              Transform your writing with AI-powered tone adaptation. Perfect your message for Slack, LinkedIn, Email, Teams, and Articles with <span className="font-semibold text-gray-700">real-time platform previews</span> and professional polish.
            </p>

            {/* Platform Logos */}
            <div className="mb-8 lg:mb-12">
              <p className="text-sm text-gray-500 mb-4 text-center">Rewrites fine-tuned with platform best practices in mind</p>
              <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 max-w-2xl mx-auto">
                {/* Slack */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
                  </svg>
                </div>
                
                {/* LinkedIn */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                
                {/* Outlook */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#0078D4">
                    <path d="M7.462 0C3.348 0 0 3.348 0 7.462s3.348 7.462 7.462 7.462 7.462-3.348 7.462-7.462S11.576 0 7.462 0zm-.001 11.385c-2.168 0-3.923-1.755-3.923-3.923S5.293 3.539 7.461 3.539s3.923 1.755 3.923 3.923-1.755 3.923-3.923 3.923z"/>
                    <path d="M24 4.615v14.77c0 .339-.276.615-.615.615H9.231c-.339 0-.615-.276-.615-.615V4.615c0-.339.276-.615.615-.615h14.154c.339 0 .615.276.615.615z"/>
                    <path d="M16.923 7.385h4.923v1.846h-4.923V7.385zm0 3.077h4.923v1.846h-4.923v-1.846zm0 3.077h4.923v1.846h-4.923v-1.846z" fill="white"/>
                  </svg>
                </div>
                
                {/* Gmail */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.727L12 10.91l9.637-7.09h.727c.904 0 1.636.732 1.636 1.636z" fill="#EA4335"/>
                  </svg>
                </div>
                
                {/* MS Teams */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#6264A7">
                    <path d="M19.875 4.5h-2.25A2.628 2.628 0 0 0 15 1.875h-4.5A2.628 2.628 0 0 0 7.875 4.5h-2.25A2.628 2.628 0 0 0 3 7.125v9.75A2.628 2.628 0 0 0 5.625 19.5h14.25A2.628 2.628 0 0 0 22.5 16.875v-9.75A2.628 2.628 0 0 0 19.875 4.5zM12 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
                  </svg>
                </div>
                
                {/* Medium */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#000">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </div>
                
                {/* Substack */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#FF6719">
                    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                  </svg>
                </div>
                
                {/* Microsoft Viva */}
                <div className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 spring-smooth">
                  <svg className="w-6 h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="#0078D4">
                    <path d="M0 0h11.377v11.372H0V0zm12.623 0H24v11.372H12.623V0zM0 12.623h11.377V24H0V12.623zm12.623 0H24V24H12.623V12.623z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <button
                onClick={() => setShowAuthModal(true)}
                className="btn btn-primary spring-bounce shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles size={16} />
                <span>Start Writing Better</span>
              </button>
              <button
                onClick={() => {
                  const demoSection = document.getElementById('demo');
                  if (demoSection) {
                    demoSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn btn-secondary spring-bounce group"
              >
                <Play size={16} />
                <span>Try Demo</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-3xl lg:max-w-5xl mx-auto">
              <div className="glass-surface rounded-xl p-3 lg:p-4 text-center spring-smooth hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-xs mb-1">Smart Adaptation</h4>
                <p className="text-xs text-gray-600">Context-aware AI</p>
              </div>
              <div className="glass-surface rounded-xl p-3 lg:p-4 text-center spring-smooth hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Zap size={16} className="text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-xs mb-1">Lightning Fast</h4>
                <p className="text-xs text-gray-600">Instant results</p>
              </div>
              <div className="glass-surface rounded-xl p-3 lg:p-4 text-center spring-smooth hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Sparkles size={16} className="text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-900 text-xs mb-1">Enterprise AI</h4>
                <p className="text-xs text-gray-600">GPT-4 powered</p>
              </div>
              <div className="glass-surface rounded-xl p-3 lg:p-4 text-center spring-smooth hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900 text-xs mb-1">Secure & Private</h4>
                <p className="text-xs text-gray-600">Your data protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <section id="demo" className="py-12 sm:py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="relative fluid-container">
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => {
                const testFunction = document.querySelector('.glass-surface');
                if (testFunction) {
                  testFunction.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 spring-bounce hover:shadow-lg transition-all duration-300"
            >
              <Play size={16} />
              Try it now
            </button>
            <h2 className="heading-fluid lg:desktop-heading font-bold text-gray-900 mb-3 lg:mb-6">See ReMagik in Action</h2>
            <p className="text-fluid lg:desktop-text text-gray-600 max-w-xl lg:max-w-3xl mx-auto leading-relaxed">
              Experience professional-grade AI writing transformation. Try {FREE_USAGE_LIMIT} examples to see the difference.
            </p>
          </div>
          
          <TestFunction onFreeUsage={handleFreeUsage} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="fluid-container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-fluid lg:desktop-heading font-bold text-gray-900 mb-3 lg:mb-6">Why Professionals Choose ReMagik</h2>
            <p className="text-fluid lg:desktop-text text-gray-600 max-w-xl lg:max-w-3xl mx-auto leading-relaxed">
              Advanced AI technology meets professional communication needs. Trusted by teams worldwide for consistent, impactful messaging.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="glass-surface p-5 lg:p-6 rounded-2xl spring-smooth hover:scale-105 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-white" size={18} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Professional Tone Mastery</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Instantly adapt your message tone for maximum impact across all professional platforms and contexts.</p>
            </div>

            <div className="glass-surface p-5 lg:p-6 rounded-2xl spring-smooth hover:scale-105 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="text-white" size={18} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Universal Platform Integration</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Seamlessly optimized for Slack, LinkedIn, Email, Teams, and Articles with real-time authentic previews.</p>
            </div>

            <div className="glass-surface p-5 lg:p-6 rounded-2xl spring-smooth hover:scale-105 hover:shadow-xl transition-all duration-300 border border-gray-100/50">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="text-white" size={18} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Intelligent Tone Profiles</h4>
              <p className="text-gray-600 text-xs leading-relaxed">Build and maintain custom tone profiles that reflect your brand voice across all communication channels.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="fluid-container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="heading-fluid lg:desktop-heading font-bold text-gray-900 mb-3 lg:mb-6">Transform Your Communication in 3 Steps</h2>
            <p className="text-fluid lg:desktop-text text-gray-600 max-w-xl lg:max-w-3xl mx-auto leading-relaxed">
              Professional writing transformation made simple. Get enterprise-quality results in seconds.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold spring-bounce shadow-lg group-hover:shadow-xl transition-all duration-300">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Input Your Content</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Enter your message into our intelligent writing interface with smart suggestions.</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold spring-bounce shadow-lg group-hover:shadow-xl transition-all duration-300">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Select Context</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Choose your target platform and communication style for optimal message delivery.</p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold spring-bounce shadow-lg group-hover:shadow-xl transition-all duration-300">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Deploy Professionally</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Receive polished, platform-optimized content with real-time preview and copy functionality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="fluid-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center p-2">
                  <img 
                    src="/PortraitImages/ReMagik-removebg-preview.png" 
                    alt="ReMagik Logo" 
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-lg font-bold">ReMagik</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-sm text-sm leading-relaxed">
                Professional AI writing assistant trusted by teams worldwide for consistent, impactful communication across all platforms.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400" size={14} />
                  <span className="text-sm text-gray-300">4.9/5</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">Trusted by Professionals</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-sm">Platforms</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                  <span>Slack</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  <span>LinkedIn</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span>Email</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span>Teams</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span>Articles</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-sm">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a 
                    href="https://joyinfant.me/projects/remagik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#demo" className="hover:text-white transition-colors text-sm">
                    Try Demo
                  </a>
                </li>
                <li className="text-sm">Get Started Free</li>
                <li className="text-sm">Privacy First</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 ReMagik by{' '}
              <a 
                href="https://joyinfant.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Joy Infant
              </a>
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Made with Next.js & AI</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Status: Online"></div>
            </div>
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