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
    <main className="flex-1 bg-discord-chat flex flex-col min-w-0 h-full relative">
      {/* Top Header Bar */}
      <header className="h-12 px-4 border-b border-discord-darkest/30 flex items-center justify-between shadow-sm select-none flex-shrink-0 z-10">
        <div className="flex items-center gap-2 min-w-0">
          <Hash className="w-6 h-6 text-discord-textMuted flex-shrink-0" />
          <h2 className="font-bold text-white text-base truncate">
            {channel?.name || 'kanal'}
          </h2>
          {channel?.description && (
            <>
              <div className="w-[1px] h-4 bg-discord-divider mx-2 flex-shrink-0 hidden md:block" />
              <p className="text-xs text-discord-textMuted truncate hidden md:block font-normal">
                {channel.description}
              </p>
            </>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-4 text-discord-textMuted flex-shrink-0">
          {/* Supabase Status Pill */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-discord-channels/80 text-[11px] font-medium"
            title="Supabase-Echtzeit-Verbindungsstatus"
          >
            <span className="w-2 h-2 rounded-full bg-discord-green animate-pulse" />
            <span className="hidden sm:inline text-discord-textNormal">Supabase Realtime</span>
          </div>

          <button
            onClick={() => alert('Benachrichtigungen für diesen Kanal sind aktiviert.')}
            className="hover:text-discord-textNormal transition"
            title="Benachrichtigungen"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={() => alert('Gepinnte Nachrichten: Regeln und Supabase-Ankündigung wurden angepinnt.')}
            className="hover:text-discord-textNormal transition"
            title="Gepinnte Nachrichten"
          >
            <Pin className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowMemberList(!showMemberList)}
            className={`transition ${
              showMemberList
                ? 'text-white'
                : 'hover:text-discord-textNormal'
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
              className="bg-discord-darkest text-xs px-2 py-1 pr-6 rounded text-discord-textNormal focus:outline-none focus:w-44 w-32 transition-all placeholder-discord-textMuted"
            />
            <Search className="w-3.5 h-3.5 text-discord-textMuted absolute right-2 pointer-events-none" />
          </div>
        </div>
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {/* Welcome Channel Banner */}
        <div className="pt-6 pb-4 border-b border-discord-divider/30">
          <div className="w-16 h-16 rounded-full bg-discord-channels flex items-center justify-center mb-3">
            <Hash className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Willkommen auf #{channel?.name || 'kanal'}!
          </h1>
          <p className="text-sm text-discord-textMuted">
            Dies ist der Beginn des Kanals #{channel?.name || 'kanal'}.
          </p>
        </div>

        {/* Message Items */}
        {messages.map((msg) => {
          const isCurrentUser = msg.author.id === currentUser.id;
          return (
            <div
              key={msg.id}
              className="group relative flex gap-4 -mx-4 px-4 py-1.5 hover:bg-discord-chathover/70 rounded transition"
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
                className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-85 transition"
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
                    className="font-semibold text-sm hover:underline cursor-pointer"
                    style={{ color: msg.author.roleColor || '#f2f3f5' }}
                    title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
                  >
                    {msg.author.displayName || msg.author.username}
                  </span>

                  {msg.author.isBot && (
                    <span className="bg-discord-blurple text-[10px] text-white font-bold px-1.5 py-0.2 rounded uppercase">
                      BOT
                    </span>
                  )}

                  <span className="text-[11px] text-discord-textMuted">
                    {msg.timestamp}
                  </span>
                </div>

                {/* Content text */}
                <div className="text-sm text-discord-textNormal whitespace-pre-wrap break-words leading-relaxed mt-1">
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
                              ? 'bg-discord-blurple/20 border-discord-blurple text-discord-blurple'
                              : 'bg-discord-channels/60 border-transparent hover:bg-discord-channels text-discord-textNormal'
                          }`}
                        >
                          <span>{react.emoji}</span>
                          <span className="font-semibold text-[11px]">
                            {react.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Hover Message Action Bar */}
              <div className="absolute right-4 -top-3 hidden group-hover:flex items-center bg-discord-chat border border-discord-divider/60 rounded shadow-md px-1 py-0.5 gap-1 z-10">
                {POPULAR_EMOJIS.slice(0, 3).map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => onAddReaction(msg.id, emoji)}
                    className="p-1 hover:bg-discord-channels rounded text-sm transition"
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
                  className="p-1 hover:bg-discord-channels rounded text-discord-textMuted hover:text-white text-xs font-bold"
                  title="Alle Emojis"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>

              {/* Extended Reaction Picker Popup */}
              {activeMessageReactionPicker === msg.id && (
                <div className="absolute right-4 top-6 bg-discord-darkest border border-discord-divider rounded-lg p-2 shadow-2xl z-20 flex flex-wrap gap-2 w-48 animate-in fade-in zoom-in-95">
                  {POPULAR_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        onAddReaction(msg.id, emoji);
                        setActiveMessageReactionPicker(null);
                      }}
                      className="text-lg p-1.5 hover:bg-discord-channels rounded transition hover:scale-110"
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
        <div className="relative bg-discord-input rounded-lg flex items-center px-4 py-2.5 focus-within:ring-1 focus-within:ring-discord-blurple">
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
            className="text-discord-textMuted hover:text-discord-textNormal p-1 mr-2 rounded-full hover:bg-discord-channels transition"
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
            className="bg-transparent flex-1 text-sm text-discord-textNormal placeholder-discord-textMuted/60 focus:outline-none min-w-0"
          />

          {/* Right Input Buttons (GIF, Emoji, Send) */}
          <div className="flex items-center gap-2 text-discord-textMuted pl-2">
            <button
              onClick={() => {
                onSendMessage('https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif');
              }}
              className="hover:text-discord-textNormal transition font-bold text-xs bg-discord-darkest/60 px-1.5 py-0.5 rounded"
              title="GIF senden"
            >
              GIF
            </button>
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="hover:text-discord-yellow transition p-1"
                title="Emoji-Auswahl"
              >
                <Smile className="w-5 h-5" />
              </button>

              {/* Emoji Picker Popover */}
              {showEmojiPicker && (
                <div className="absolute bottom-10 right-0 bg-discord-darkest border border-discord-divider rounded-lg p-3 shadow-2xl z-30 w-56 animate-in fade-in zoom-in-95">
                  <div className="text-xs font-bold text-discord-textMuted uppercase mb-2">
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
                        className="text-xl p-1 hover:bg-discord-channels rounded hover:scale-125 transition"
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
                className="p-1 text-discord-blurple hover:text-white bg-discord-blurple/20 hover:bg-discord-blurple rounded transition"
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
