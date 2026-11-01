import React, { useState, useRef, useEffect } from 'react';
import {
  Hash,
  Bell,
  Pin,
  Users,
  Search,
  PlusCircle,
  Smile,
  Send,
  Sparkles,
  Paperclip,
  Check,
  Radio,
  Image as ImageIcon
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMessagePingSound } from '../soundEffects';

const POPULAR_EMOJIS = ['👍', '❤️', '🔥', '😂', '🎉', '🚀', '💯', '✨', '🤖', '👀', '👏', '🥳'];

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
  setMentionTarget
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
      {/* Top Header Bar */}
      <header className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm select-none flex-shrink-0 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="w-6 h-6 text-amber-400 flex-shrink-0" />
          <h2 className="font-extrabold text-amber-200 text-base truncate">
            {channel?.name || 'kanal'}
          </h2>
          {channel?.description && (
            <>
              <div className="w-[1px] h-4 bg-amber-500/20 mx-2 flex-shrink-0 hidden md:block" />
              <p className="text-xs text-amber-300/70 truncate hidden md:block font-medium">
                {channel.description}
              </p>
            </>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4 text-amber-400 flex-shrink-0">
          <button
            onClick={() => alert('Benachrichtigungen für diesen Kanal sind aktiviert.')}
            className="hover:text-amber-300 transition"
            title="Benachrichtigungen"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert('Gepinnte Nachrichten: Regeln wurden angepinnt.')}
            className="hover:text-amber-300 transition"
            title="Gepinnte Nachrichten"
          >
            <Pin className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowMemberList(!showMemberList)}
            className={`transition ${
              showMemberList
                ? 'text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                : 'hover:text-amber-300'
            }`}
            title="Mitgliederliste ein-/ausblenden"
          >
            <Users className="w-5 h-5" />
          </button>

          {/* Search Box */}
          <div className="relative hidden lg:flex items-center">
            <input
              type="text"
              placeholder="Suchen"
              className="bg-[#0c0c10] border border-amber-500/30 text-xs px-2.5 py-1 pr-7 rounded-lg text-amber-100 focus:outline-none focus:border-amber-400 focus:w-44 w-32 transition-all placeholder:text-amber-400/40"
            />
            <Search className="w-3.5 h-3.5 text-amber-400 absolute right-2 pointer-events-none" />
          </div>
        </div>
      </header>

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
        {messages.map((msg) => {
          const isCurrentUser = msg.author.id === currentUser.id;
          return (
            <div
              key={msg.id}
              className="group relative flex gap-4 -mx-4 px-4 py-1.5 hover:bg-amber-400/5 rounded transition"
            >
              {/* Avatar */}
              <img
                src={msg.author.avatar}
                alt={msg.author.displayName}
                onClick={() => onSelectMember && onSelectMember(msg.author)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onOpenContextMenu && onOpenContextMenu(e, msg.author);
                }}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-85 transition border border-amber-500/20"
                title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
              />

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    onClick={() => onSelectMember && onSelectMember(msg.author)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      onOpenContextMenu && onOpenContextMenu(e, msg.author);
                    }}
                    className="font-bold text-sm hover:underline cursor-pointer"
                    style={{ color: msg.author.roleColor || '#fde68a' }}
                    title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
                  >
                    {msg.author.displayName || msg.author.username}
                  </span>

                  {msg.author.isBot && (
                    <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] text-neutral-950 font-black px-1.5 py-0.2 rounded uppercase shadow-xs">
                      BOT
                    </span>
                  )}

                  <span className="text-[11px] text-amber-200/50">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Content text */}
                <div className="text-sm text-amber-100/90 whitespace-pre-wrap break-words leading-relaxed mt-1 font-normal">
                  {msg.content}
                </div>

                {/* Reactions list */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.reactions.map((react, i) => {
                      const hasReacted = react.users?.includes(currentUser.id);
                      return (
                        <button
                          key={i}
                          onClick={() => onAddReaction(msg.id, react.emoji)}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition border ${
                            hasReacted
                              ? 'bg-amber-400/25 border-amber-400 text-amber-200 font-bold shadow-sm'
                              : 'bg-amber-400/10 border-amber-500/25 hover:bg-amber-400/20 text-amber-300'
                          }`}
                        >
                          <span>{react.emoji}</span>
                          <span className="font-bold text-[11px]">
                            {react.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Hover Message Action Bar */}
              <div className="absolute right-4 -top-3 hidden group-hover:flex items-center bg-[#0c0c10] border border-amber-500/30 rounded-lg shadow-xl px-1.5 py-0.5 gap-1 z-10">
                {POPULAR_EMOJIS.slice(0, 3).map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => onAddReaction(msg.id, emoji)}
                    className="p-1 hover:bg-amber-400/15 rounded text-sm transition"
                    title={`Reagieren mit ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setActiveMessageReactionPicker(
                      activeMessageReactionPicker === msg.id ? null : msg.id
                    )
                  }
                  className="p-1 hover:bg-amber-400/15 rounded text-amber-400 hover:text-amber-200 text-xs font-bold"
                  title="Alle Emojis"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>

              {/* Extended Reaction Picker Popup */}
              {activeMessageReactionPicker === msg.id && (
                <div className="absolute right-4 top-6 bg-[#0c0c10] border border-amber-500/30 rounded-xl p-2.5 shadow-2xl z-20 flex flex-wrap gap-2 w-48 animate-in fade-in zoom-in-95">
                  {POPULAR_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onAddReaction(msg.id, emoji);
                        setActiveMessageReactionPicker(null);
                      }}
                      className="text-lg p-1.5 hover:bg-amber-400/15 rounded transition hover:scale-110"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Container */}
      <div className="px-4 pb-6 pt-1 select-none">
        <div className="relative bg-[#0c0c10] rounded-xl flex items-center px-4 py-2.5 border border-amber-500/30 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition">
          {/* File attachment simulation button */}
          <button
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                  onSendMessage(`📎 Datei geteilt: **${file.name}** (${(file.size / 1024).toFixed(1)} KB)`);
                }
              };
              fileInput.click();
            }}
            className="text-amber-400 hover:text-amber-300 p-1 mr-2 rounded-full hover:bg-amber-400/15 transition"
            title="Datei hochladen"
          >
            <PlusCircle className="w-5 h-5" />
          </button>

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Nachricht an #${channel?.name || 'kanal'}`}
            className="bg-transparent flex-1 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none min-w-0 font-medium"
          />

          {/* Right Input Buttons (GIF, Emoji, Send) */}
          <div className="flex items-center gap-2 text-amber-400 pl-2">
            <button
              onClick={() => {
                onSendMessage('https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif');
              }}
              className="hover:text-neutral-950 hover:bg-amber-400 transition font-black text-xs text-amber-300 bg-amber-400/15 border border-amber-500/30 px-2 py-0.5 rounded shadow-sm"
              title="GIF senden"
            >
              GIF
            </button>
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-amber-400 hover:text-amber-300 transition p-1 hover:scale-110"
                title="Emoji-Auswahl"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Emoji Picker Popover in Black & Gold */}
              {showEmojiPicker && (
                <div className="absolute bottom-12 right-0 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] z-30 w-56 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                    Schnelle Emojis
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {POPULAR_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          setInputText((prev) => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl p-1 hover:bg-white/10 rounded-lg hover:scale-125 transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Send Button */}
            {inputText.trim() && (
              <button
                onClick={handleSubmit}
                className="p-1.5 text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition shadow-md shadow-amber-500/25 font-bold"
                title="Senden"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
