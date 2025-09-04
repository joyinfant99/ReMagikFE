'use client';

interface ChannelIconProps {
  channel: string;
  size?: number;
  className?: string;
}

export default function ChannelIcon({ channel, size = 24, className = "" }: ChannelIconProps) {
  const getChannelConfig = (channel: string) => {
    const iconSize = Math.max(16, size * 0.6);
    
    switch (channel) {
      case 'Slack':
        return {
          bg: 'bg-[#4A154B]', // Official Slack purple
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.527 2.527 0 0 1 2.521 2.521 2.527 2.527 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.166 0a2.528 2.528 0 0 1 2.522 2.522v6.312zM15.166 18.956a2.528 2.528 0 0 1 2.522 2.522A2.528 2.528 0 0 1 15.166 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.166 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.312A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.312z"/>
            </svg>
          )
        };
      case 'Email':
        return {
          bg: 'bg-[#EA4335]', // Gmail red
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.887.732-1.636 1.636-1.636.302 0 .587.082.832.225L12 10.341l9.532-6.295a1.636 1.636 0 0 1 .832-.225c.904 0 1.636.749 1.636 1.636z"/>
            </svg>
          )
        };
      case 'Company Communication':
        return {
          bg: 'bg-[#0078D4]', // Microsoft Teams blue
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M21.53 4.306v15.363A.331.331 0 0 1 21.2 20H2.8a.331.331 0 0 1-.33-.331V4.306A.331.331 0 0 1 2.8 3.975h18.4a.331.331 0 0 1 .33.331zM20.85 5.175H3.15v13.65h17.7V5.175z"/>
              <path d="M6.775 7.956a.331.331 0 0 1 .331-.331h9.788a.331.331 0 0 1 .331.331v.662a.331.331 0 0 1-.331.331H7.106a.331.331 0 0 1-.331-.331v-.662zM6.775 10.294a.331.331 0 0 1 .331-.331h9.788a.331.331 0 0 1 .331.331v.662a.331.331 0 0 1-.331.331H7.106a.331.331 0 0 1-.331-.331v-.662zM6.775 12.631a.331.331 0 0 1 .331-.331h6.619a.331.331 0 0 1 .331.331v.662a.331.331 0 0 1-.331.331H7.106a.331.331 0 0 1-.331-.331v-.662z"/>
            </svg>
          )
        };
      case 'Article':
        return {
          bg: 'bg-[#00AB6C]', // Medium green
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
            </svg>
          )
        };
      case 'LinkedIn Post':
        return {
          bg: 'bg-[#0A66C2]', // Official LinkedIn blue
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          )
        };
      default:
        return {
          bg: 'bg-gray-600',
          icon: (
            <svg viewBox="0 0 24 24" fill="white" width={iconSize} height={iconSize}>
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
            </svg>
          )
        };
    }
  };

  const config = getChannelConfig(channel);
  
  return (
    <div className={`${config.bg} rounded-xl flex items-center justify-center shadow-sm ${className}`} style={{ width: size, height: size, padding: Math.max(4, size * 0.2) }}>
      {config.icon}
    </div>
  );
}