import React, { useState, useRef, useEffect } from 'react';
import { Hash } from 'lucide-react';
import ChatHeader from './Chat/ChatHeader';
import ChatMessageItem from './Chat/ChatMessageItem';
import ChatInputBar from './Chat/ChatInputBar';
import { playMessagePingSound } from '../soundEffects';

export default function ChatArea({
  channel,
  messages,
  onSendMessage,
  onAddReaction,
  currentUser,
  showMemberList,
  setShowMemberList,
  supabaseConnected,
  onOpenContextMenu,
  onSelectMember,
  mentionTarget,
  setMentionTarget,
}) {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeMessageReactionPicker, setActiveMessageReactionPicker] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Handle incoming mention request
  useEffect(() => {
    if (mentionTarget) {
      setInputText((prev) => `@${mentionTarget.displayName} ` + prev);
      inputRef.current?.focus();
      if (setMentionTarget) setMentionTarget(null);
    }
  }, [mentionTarget, setMentionTarget]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText('');
    playMessagePingSound();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="flex-1 bg-[#0a0a0d] flex flex-col min-w-0 h-full relative">
      <ChatHeader
        channel={channel}
        showMemberList={showMemberList}
        setShowMemberList={setShowMemberList}
      />

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Welcome Channel Banner */}
        <div className="pt-6 pb-4 border-b border-amber-500/20">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 border-2 border-amber-400/50 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
            <Hash className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1">
            Willkommen auf #{channel?.name || 'kanal'}!
          </h1>
          <p className="text-sm text-amber-200/75 font-medium">
            Dies ist der Beginn des Kanals #{channel?.name || 'kanal'}.
          </p>
        </div>

        {/* Message Items */}
        {messages.map((msg) => (
          <ChatMessageItem
            key={msg.id}
            msg={msg}
            currentUser={currentUser}
            onSelectMember={onSelectMember}
            onOpenContextMenu={onOpenContextMenu}
            onAddReaction={onAddReaction}
            activeMessageReactionPicker={activeMessageReactionPicker}
            setActiveMessageReactionPicker={setActiveMessageReactionPicker}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Container */}
      <ChatInputBar
        channel={channel}
        inputText={inputText}
        setInputText={setInputText}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        handleSubmit={handleSubmit}
        onSendMessage={onSendMessage}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
      />
    </main>
  );
}
