'use client';

import { useState, useEffect } from 'react';
import ChannelIcon from './ChannelIcon';
import RichTextEditor from './RichTextEditor';
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal, Bookmark, Edit3, Settings, Wand2, Sparkles, Copy } from 'lucide-react';

interface PlatformPreviewProps {
  channel: string;
  content: string;
  onCopy?: () => Promise<void>;
  copied?: boolean;
  onRegenerate?: () => Promise<void>;
  isRegenerating?: boolean;
  metadata?: {
    // LinkedIn specific
    linkedin_title?: string;
    linkedin_company?: string;
    profile_image_url?: string;
    
    // Email specific
    email_signature?: string;
    email_subject?: string;
    email_recipients?: string;
    sender_name?: string;
    sender_email?: string;
    
    // Slack specific
    slack_username?: string;
    slack_avatar_url?: string;
    slack_status?: string;
    
    // Article specific
    author_name?: string;
    author_bio?: string;
    article_category?: string;
    
    // Company Communication specific
    teams_display_name?: string;
    teams_status?: string;
    department?: string;
  };
}

export default function PlatformPreview({ channel, content, onCopy, copied, onRegenerate, isRegenerating, metadata = {} }: PlatformPreviewProps) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [editableContent, setEditableContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);
  const [editableMetadata, setEditableMetadata] = useState(metadata);
  const [channelVariant, setChannelVariant] = useState(getDefaultVariant(channel));
  
  // Update editableContent when content prop changes
  useEffect(() => {
    setEditableContent(content);
  }, [content]);

  // Handle click outside to close inline editing
  useEffect(() => {
    const handleCloseEditor = () => {
      setIsEditing(false);
    };
    
    document.addEventListener('closeInlineEditor', handleCloseEditor);
    return () => {
      document.removeEventListener('closeInlineEditor', handleCloseEditor);
    };
  }, []);
  
  // Portrait images from the public folder
  const getRandomPortraitImage = () => {
    const images = ['/PortraitImages/1.jpg', '/PortraitImages/2.jpg', '/PortraitImages/3.jpg'];
    return images[Math.floor(Math.random() * images.length)];
  };
  
  // Truncate content for LinkedIn preview (similar to "see more")
  const truncateLength = 210;
  const shouldTruncate = content.length > truncateLength && !showFullContent;
  const displayContent = shouldTruncate ? content.substring(0, truncateLength) + '...' : content;

  function getDefaultVariant(channel: string) {
    const variants = {
      'Slack': 'Slack',
      'Email': 'Gmail',
      'Company Communication': 'Microsoft Teams',
      'Article': 'Medium',
      'LinkedIn Post': 'LinkedIn'
    };
    return variants[channel as keyof typeof variants] || channel;
  }

  const getChannelVariants = (channel: string) => {
    const variants = {
      'Slack': ['Slack', 'Microsoft Teams', 'Discord'],
      'Email': ['Gmail', 'Outlook', 'Apple Mail'],
      'Company Communication': ['Microsoft Teams', 'Slack', 'Microsoft Viva Engage'],
      'Article': ['Medium', 'Substack', 'LinkedIn Newsletter'],
      'LinkedIn Post': ['LinkedIn', 'LinkedIn Newsletter']
    };
    return variants[channel as keyof typeof variants] || [channel];
  };

  const renderLinkedInPreview = () => (
    <div className="bg-white max-w-md mx-auto">
      {/* LinkedIn Header */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-start gap-3">
          <img 
            src={editableMetadata.profile_image_url || getRandomPortraitImage()}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRandomPortraitImage();
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-medium text-gray-900 text-sm hover:text-[#0A66C2] hover:underline cursor-pointer truncate">
                {editableMetadata.sender_name || 'Alex Johnson'}
              </h3>
              <div className="w-4 h-4 bg-[#0A66C2] rounded-sm flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-500 text-xs flex-shrink-0">• 1st</span>
            </div>
            <p className="text-gray-600 text-xs leading-tight">
              {editableMetadata.linkedin_title || 'Product Manager'} at {editableMetadata.linkedin_company || 'TechCorp'}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-gray-500 text-xs">2h</span>
              <span className="text-gray-400 text-xs">•</span>
              <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z"/>
                <path d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H6a.5.5 0 0 1 0-1h1.5V4a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="p-1.5 hover:bg-gray-100 rounded-full touch-manipulation">
              <MoreHorizontal size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* LinkedIn Content */}
      <div className="px-2 pb-2">
        {isEditing ? (
          <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
            <RichTextEditor
              content={editableContent}
              onChange={setEditableContent}
              placeholder="Edit your content..."
              height="h-32"
              expandable={true}
              hideToolbar={false}
            />
          </div>
        ) : (
          <div 
            className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors break-words overflow-wrap-anywhere"
            onClick={() => setIsEditing(true)}
            title="Click to edit"
            dangerouslySetInnerHTML={{ 
              __html: (editableContent || displayContent)
                .replace(/\n/g, '<br>')
                .replace(/@([\w\s]+)/g, '<span style="color: #0a66c2; font-weight: 500; cursor: pointer;">@$1</span>')
                .replace(/#([\w]+)/g, '<span style="color: #0a66c2; font-weight: 500; cursor: pointer;">#$1</span>')
                .replace(/https?:\/\/[^\s]+/g, '<span style="color: #0a66c2; cursor: pointer; text-decoration: underline;">$&</span>')
            }}
          />
        )}
        {shouldTruncate && !isEditing && (
          <button 
            onClick={() => setShowFullContent(true)}
            className="text-gray-600 hover:text-blue-600 ml-1 font-medium text-sm"
          >
            ...see more
          </button>
        )}
        
        {/* Link Preview Card - only show if content contains links */}
        {(editableContent || content).includes('http') && (
          <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex">
              <img 
                src="/PortraitImages/portrait-smiling-young-multiethnic-woman-600nw-2318383273.webp"
                alt="Link preview"
                className="w-20 h-20 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getRandomPortraitImage();
                }}
              />
              <div className="flex-1 p-3">
                <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">
                  Link Preview Title
                </h4>
                <p className="text-gray-600 text-xs">
                  {(() => {
                    const urlMatch = (editableContent || content).match(/https?:\/\/([^\/\s]+)/);
                    return urlMatch ? urlMatch[1] : 'example.com';
                  })()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LinkedIn Engagement */}
      <div className="px-2 pb-2">
        <div className="flex items-center justify-between py-1 sm:py-2">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-hidden">
            <div className="flex -space-x-1 flex-shrink-0">
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>
              </div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
              </div>
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
              </div>
            </div>
            <span className="text-xs text-gray-600 hover:text-blue-600 cursor-pointer truncate">
              Sarah Chen and 127 others
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 flex-shrink-0">
            <span className="hover:text-blue-600 cursor-pointer">3 comments</span>
            <span>•</span>
            <span className="hover:text-blue-600 cursor-pointer">1 repost</span>
          </div>
        </div>
        
        <div className="flex items-center justify-around pt-2 border-t border-gray-100 px-1">
          <button className="flex items-center space-x-1 py-2 px-1 sm:px-2 hover:bg-gray-50 rounded transition-colors flex-1 justify-center group min-w-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375a7.47 7.47 0 011.938-5.002l.003-.002a.5.5 0 01.723.687l-.003.003A6.47 6.47 0 007 15.375a6.48 6.48 0 00.435 2.387.5.5 0 01-.943.388zM16.507 18.75a.5.5 0 01-.943-.388A6.48 6.48 0 0016 15.375a6.47 6.47 0 00-1.661-4.314l-.003-.003a.5.5 0 01.723-.687l.003.002A7.47 7.47 0 0117 15.375a7.48 7.48 0 01-.518 2.743.82.82 0 01-.975.632z"/>
              <path d="M11.5 15.375a.5.5 0 01-1 0V12a.5.5 0 011 0v3.375zm2.293-3.082l-.707-.707A1 1 0 0112 11a1 1 0 01.707.293l.707.707a.5.5 0 01-.708.708zM9.414 11.293l.707-.707A1 1 0 0112 11a1 1 0 01-.707-.293l-.707-.707a.5.5 0 11.707-.707z"/>
            </svg>
            <span className="text-xs text-gray-700 font-medium group-hover:text-blue-600 hidden sm:inline truncate">Like</span>
          </button>
          <button className="flex items-center space-x-1 py-2 px-1 sm:px-2 hover:bg-gray-50 rounded transition-colors flex-1 justify-center group min-w-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs text-gray-700 font-medium group-hover:text-blue-600 hidden sm:inline truncate">Comment</span>
          </button>
          <button className="flex items-center space-x-1 py-2 px-1 sm:px-2 hover:bg-gray-50 rounded transition-colors flex-1 justify-center group min-w-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-xs text-gray-700 font-medium group-hover:text-blue-600 hidden sm:inline truncate">Repost</span>
          </button>
          <button className="flex items-center space-x-1 py-2 px-1 sm:px-2 hover:bg-gray-50 rounded transition-colors flex-1 justify-center group min-w-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="text-xs text-gray-700 font-medium group-hover:text-blue-600 hidden sm:inline truncate">Send</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSlackPreview = () => (
    <div className="bg-white max-w-md mx-auto">
      <div className="bg-[#4A154B] px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium text-sm"># general</span>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
        <span className="text-white/70 text-xs">🟢 Online</span>
      </div>
      <div className="p-3">
        <div className="flex items-start gap-3">
          <img 
            src={editableMetadata.slack_avatar_url || editableMetadata.profile_image_url || getRandomPortraitImage()}
            alt="Avatar"
            className="w-8 h-8 rounded-lg object-cover flex-shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRandomPortraitImage();
            }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900 text-sm">
                {editableMetadata.slack_username || 'Your Name'}
              </span>
              <span className="text-xs text-gray-500">1:35 PM</span>
            </div>
            <div 
              className="text-gray-800 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: (editableContent || content) }}
            />
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">👍 5</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">🎯 2</span>
              <span className="text-xs text-gray-500 hover:text-[#4A154B] cursor-pointer">6 replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailPreview = () => {
    const isGmail = channelVariant === 'Gmail';
    const isOutlook = channelVariant === 'Outlook';
    
    return (
      <div className="bg-white max-w-2xl mx-auto">
        {/* Email Header */}
        <div className={`px-2 py-2 border-b border-gray-200 ${
          isGmail ? 'bg-gmail-red' : isOutlook ? 'bg-outlook-blue' : 'bg-gray-50'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm ${
                isGmail ? 'bg-white text-gmail-red' : isOutlook ? 'bg-white text-outlook-blue' : 'bg-gray-500'
              }`}>
                {isGmail ? 'G' : isOutlook ? 'O' : 'M'}
              </div>
              <span className={`text-sm font-medium ${
                isGmail || isOutlook ? 'text-white' : 'text-gray-700'
              }`}>
                {channelVariant}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className={`p-1 rounded hover:bg-black/10 ${
                isGmail || isOutlook ? 'text-white/80' : 'text-gray-500'
              }`}>
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Gmail/Outlook Interface */}
        {isGmail ? (
          <div className="bg-white">
            {/* Gmail Header */}
            <div className="border-b border-gray-200 p-2">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-medium text-gray-900">{editableMetadata.email_subject || 'Email Subject'}</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <img 
                    src={editableMetadata.profile_image_url || getRandomPortraitImage()}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = getRandomPortraitImage();
                    }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{editableMetadata.sender_name || 'Your Name'}</div>
                    <div className="text-gray-500 text-xs">to {editableMetadata.email_recipients || 'recipients'}</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Content */}
            <div className="p-2">
              <div className="prose prose-sm max-w-none">
                <p className="mb-4">Hi everyone,</p>
                {isEditing ? (
                  <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
                    <RichTextEditor
                      content={editableContent}
                      onChange={setEditableContent}
                      placeholder="Edit your content..."
                      height="h-32"
                      expandable={true}
                      hideToolbar={false}
                    />
                  </div>
                ) : (
                  <div 
                    className="whitespace-pre-wrap text-gray-900 leading-relaxed cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => setIsEditing(true)}
                    title="Click to edit"
                    dangerouslySetInnerHTML={{ 
                      __html: (editableContent || content)
                    }}
                  />
                )}
                {editableMetadata.email_signature && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed" 
                       dangerouslySetInnerHTML={{ 
                         __html: editableMetadata.email_signature
                           .replace(/\\\\n/g, '\n')
                           .replace(/\n/g, '<br>')
                           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/\*(.*?)\*/g, '<em>$1</em>')
                       }} />
                )}
              </div>
            </div>
          </div>
        ) : isOutlook ? (
          <div className="bg-white">
            {/* Outlook Header */}
            <div className="border-b border-gray-200 p-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <button className="bg-outlook-blue text-white px-4 py-2 rounded text-sm font-medium">Send</button>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a2 2 0 000-2.828z" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-500">Draft saved at 1:34 PM</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-12">To</span>
                  <span className="flex-1 text-sm text-gray-900 border-b border-gray-200 pb-1">jane@example.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-700 w-12"></span>
                  <span className="flex-1 text-sm text-gray-500 border-b border-gray-200 pb-1">Add a subject</span>
                </div>
              </div>
            </div>
            
            {/* Outlook Content */}
            <div className="p-2">
              <div className="mb-4">
                <p className="text-gray-900 mb-4">Hi Jane,</p>
                {isEditing ? (
                  <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
                    <RichTextEditor
                      content={editableContent}
                      onChange={setEditableContent}
                      placeholder="Edit your content..."
                      height="h-32"
                      expandable={true}
                      hideToolbar={false}
                    />
                  </div>
                ) : (
                  <div 
                    className="whitespace-pre-wrap text-gray-900 leading-relaxed cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => setIsEditing(true)}
                    title="Click to edit"
                    dangerouslySetInnerHTML={{ 
                      __html: (editableContent || content)
                    }}
                  />
                )}
                {editableMetadata.email_signature && (
                  <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed" 
                       dangerouslySetInnerHTML={{ 
                         __html: editableMetadata.email_signature
                           .replace(/\\\\n/g, '\n')
                           .replace(/\n/g, '<br>')
                           .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                           .replace(/\*(.*?)\*/g, '<em>$1</em>')
                       }} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-2 border-b border-gray-100 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">From:</span>
              <span className="text-sm text-gray-900">
                {editableMetadata.sender_name || 'Your Name'} &lt;{editableMetadata.sender_email || 'your.email@company.com'}&gt;
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">To:</span>
              <span className="text-sm text-gray-900">recipient@example.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Subject:</span>
              <span className="text-sm text-gray-900">Your Email Subject</span>
            </div>
          </div>
        )}

        {!isGmail && !isOutlook && (
          <div className="p-2">
            {isEditing ? (
              <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
                <RichTextEditor
                  content={editableContent}
                  onChange={setEditableContent}
                  placeholder="Edit your content..."
                  height="h-32"
                  expandable={true}
                  hideToolbar={false}
                />
              </div>
            ) : (
              <div 
                className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => setIsEditing(true)}
                title="Click to edit"
                dangerouslySetInnerHTML={{ 
                  __html: (editableContent || content).replace(/\n/g, '<br>').replace(/• /g, '• ').replace(/- /g, '• ')
                }}
              />
            )}
            {editableMetadata.email_signature && (
              <div className="mt-4 pt-4 border-t border-gray-200 text-gray-600 text-sm leading-relaxed" 
                   dangerouslySetInnerHTML={{ 
                     __html: editableMetadata.email_signature
                       .replace(/\\\\n/g, '\n')
                       .replace(/\n/g, '<br>')
                       .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                       .replace(/\*(.*?)\*/g, '<em>$1</em>')
                   }} />
            )}
          </div>
        )}
      </div>
    );
  };

  const renderArticlePreview = () => (
    <div className="bg-white max-w-2xl mx-auto">
      {/* Article Header */}
      <div className="p-2 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={editableMetadata.profile_image_url || getRandomPortraitImage()}
            alt="Author"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRandomPortraitImage();
            }}
          />
          <div>
            <h3 className="font-medium text-gray-900">
              {editableMetadata.author_name || editableMetadata.sender_name || 'Author Name'}
            </h3>
            <p className="text-sm text-gray-600">
              {editableMetadata.author_bio || 'Author bio and credentials'}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">5 min read</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">Mar 15</span>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">
          Your Article Title Here
        </h1>
        <p className="text-sm text-gray-600">
          {editableMetadata.article_category || 'Technology'} • Published on {channelVariant}
        </p>
      </div>

      {/* Article Content */}
      <div className="p-2">
        {isEditing ? (
          <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
            <RichTextEditor
              content={editableContent}
              onChange={setEditableContent}
              placeholder="Edit your content..."
              height="h-32"
              expandable={true}
              hideToolbar={false}
            />
          </div>
        ) : (
          <div 
            className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            onClick={() => setIsEditing(true)}
            title="Click to edit"
            dangerouslySetInnerHTML={{ 
              __html: (editableContent || content).replace(/\n/g, '<br>').replace(/• /g, '• ').replace(/- /g, '• ') 
            }}
          />
        )}
        
        {/* Article Actions */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-900 text-xs flex items-center space-x-1">
              <span className="text-lg">👏</span>
              <span className="text-sm">42</span>
            </button>
            <button className="text-gray-500 hover:text-gray-900 text-xs">
              <MessageCircle size={16} />
              <span className="text-sm">3</span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded">
              <Bookmark size={16} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <MoreHorizontal size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamsPreview = () => (
    <div className="bg-white max-w-2xl mx-auto">
      {/* Teams Header */}
      <div className="bg-purple-600 px-4 py-2 flex items-center space-x-2">
        <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
          <span className="text-purple-600 font-bold text-xs">T</span>
        </div>
        <span className="text-white font-medium text-sm">Microsoft Teams</span>
      </div>

      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img 
            src={editableMetadata.profile_image_url || getRandomPortraitImage()}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = getRandomPortraitImage();
            }}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-gray-900 text-sm">
                {editableMetadata.teams_display_name || editableMetadata.sender_name || 'Your Name'}
              </span>
              <span className="text-xs text-gray-500">
                {editableMetadata.department || 'Department'}
              </span>
              <span className="text-xs text-gray-500">2:34 PM</span>
            </div>
            {isEditing ? (
              <div className="border border-blue-300 rounded-lg" data-inline-editing="true">
                <RichTextEditor
                  content={editableContent}
                  onChange={setEditableContent}
                  placeholder="Edit your content..."
                  height="h-32"
                  expandable={true}
                  hideToolbar={true}
                />
              </div>
            ) : (
              <div 
                className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                onClick={() => setIsEditing(true)}
                title="Click to edit"
              >
                {editableContent || content}
              </div>
            )}
            <div className="flex items-center space-x-4 mt-2">
              <button className="text-gray-500 hover:text-purple-600 text-xs flex items-center space-x-1">
                <span>👍</span>
                <span>Like</span>
              </button>
              <button className="text-gray-500 hover:text-purple-600 text-xs">
                Reply
              </button>
              <button className="text-gray-500 hover:text-purple-600 text-xs">
                More actions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (channel) {
      case 'LinkedIn Post':
        return renderLinkedInPreview();
      case 'Slack':
        return renderSlackPreview();
      case 'Email':
        return renderEmailPreview();
      case 'Article':
        return renderArticlePreview();
      case 'Company Communication':
        return renderTeamsPreview();
      default:
        return renderLinkedInPreview();
    }
  };


  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Simplified Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <ChannelIcon channel={channel} size={18} />
          <h3 className="text-sm font-medium text-gray-800">
            {channel} Preview
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className={`w-8 h-8 rounded-md text-xs font-medium transition-all flex items-center justify-center ${
                isRegenerating 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
              title="Regenerate"
            >
              {isRegenerating ? (
                <div className="animate-spin h-3 w-3 border border-gray-400 border-t-transparent rounded-full"></div>
              ) : (
                <Sparkles size={14} />
              )}
            </button>
          )}
          
          {onCopy && (
            <button
              onClick={onCopy}
              className={`text-xs px-3 py-1.5 rounded-md border font-medium transition-all ${
                copied 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
              title={copied ? 'Copied!' : 'Copy'}
            >
              {copied ? (
                <>✓ Copied</>
              ) : (
                <>
                  <Copy size={12} className="inline mr-1" />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Direct preview content - no additional wrapper */}
      {renderPreview()}
    </div>
  );
}
