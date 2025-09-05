'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import { Bold, Italic, List, ListOrdered, Undo, Redo, Smile, Maximize2, Minimize2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: string;
  expandable?: boolean;
  hideToolbar?: boolean;
}

export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start typing...",
  height = "h-40",
  expandable = false,
  hideToolbar = false
}: RichTextEditorProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Handle click outside to close editor when used inline
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const editorElement = target.closest('.rich-text-editor');
    if (!editorElement) {
      // Click was outside the editor, close it if it's inline editing
      const editingElement = document.querySelector('[data-inline-editing="true"]');
      if (editingElement) {
        // Trigger blur event to close inline editing
        const event = new CustomEvent('closeInlineEditor');
        document.dispatchEvent(event);
      }
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc list-outside ml-4',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal list-outside ml-4',
        },
      }),
      ListItem,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm lg:prose mx-auto focus:outline-none p-1.5 lg:p-3 touch-manipulation text-sm lg:text-base',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
    '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
    '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
    '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
    '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
    '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
    '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
    '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
    '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
    '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿',
    '😾', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞',
    '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍',
    '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
    '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂',
    '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅',
    '👄', '💋', '🩸', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨',
    '🧔', '👩', '🧓', '👴', '👵', '🙍', '🙎', '🙅', '🙆', '💁',
    '🙋', '🧏', '🙇', '🤦', '🤷', '👮', '🕵️', '💂', '🥷', '👷',
    '🤴', '👸', '👳', '👲', '🧕', '🤵', '👰', '🤰', '🤱', '👼',
    '🎅', '🤶', '🦸', '🦹', '🧙', '🧚', '🧛', '🧜', '🧝', '🧞',
    '🧟', '💆', '💇', '🚶', '🧍', '🧎', '🏃', '💃', '🕺', '🕴️',
    '👯', '🧖', '🧗', '🤺', '🏇', '⛷️', '🏂', '🏌️', '🏄', '🚣',
    '🏊', '⛹️', '🏋️', '🚴', '🚵', '🤸', '🤼', '🤽', '🤾', '🤹',
    '🧘', '🛀', '🛌', '👭', '👫', '👬', '💏', '💑', '👪', '🗣️',
    '👤', '👥', '🫂', '👣', '🚀', '🛸', '🌟', '⭐', '✨', '💫'
  ];

  const insertEmoji = (emoji: string) => {
    editor?.chain().focus().insertContent(emoji).run();
    setShowEmojiPicker(false);
  };

  if (!editor) {
    return null;
  }

  const currentHeight = isExpanded ? "h-96" : height;
  
  return (
    <div className={`rich-text-editor relative bg-white border border-gray-200 rounded-xl overflow-hidden spring-smooth transition-all focus-within:ring-2 focus-within:ring-blue-400/50 focus-within:border-blue-400 ${currentHeight}`}>
      {!hideToolbar && (
        <div className="editor-toolbar border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`editor-toolbar button ${
                editor.isActive('bold') ? 'active' : ''
              }`}
              type="button"
              title="Bold"
            >
              <Bold size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`editor-toolbar button ${
                editor.isActive('italic') ? 'active' : ''
              }`}
              type="button"
              title="Italic"
            >
              <Italic size={14} />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`editor-toolbar button ${
                editor.isActive('bulletList') ? 'active' : ''
              }`}
              type="button"
              title="Bullet List"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`editor-toolbar button ${
                editor.isActive('orderedList') ? 'active' : ''
              }`}
              type="button"
              title="Numbered List"
            >
              <ListOrdered size={14} />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className="editor-toolbar button disabled:opacity-40"
              type="button"
              title="Undo"
            >
              <Undo size={14} />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className="editor-toolbar button disabled:opacity-40"
              type="button"
              title="Redo"
            >
              <Redo size={14} />
            </button>
            
            <div className="w-px h-5 bg-gray-300 mx-1" />
            
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="editor-toolbar button"
                type="button"
                title="Add Emoji"
              >
                <Smile size={14} />
              </button>
              
              {showEmojiPicker && (
                <div className="absolute top-10 left-0 z-50 glass-surface border border-white/20 rounded-2xl shadow-2xl p-3 w-64 sm:w-72 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-8 sm:grid-cols-9 gap-1">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => insertEmoji(emoji)}
                        className="p-2 hover:bg-white/50 rounded-lg text-sm spring-smooth hover:scale-110 transition-all touch-manipulation"
                        type="button"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {expandable && (
            <div className="flex-shrink-0 ml-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="editor-toolbar button"
                type="button"
                title={isExpanded ? "Minimize" : "Expand"}
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="relative overflow-auto" style={{ height: hideToolbar ? '100%' : 'calc(100% - 48px)' }}>
        <EditorContent 
          editor={editor} 
          className="min-h-full"
        />
        
        {editor.isEmpty && (
          <div className="absolute top-3 left-3 text-gray-400 pointer-events-none text-sm leading-relaxed">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}