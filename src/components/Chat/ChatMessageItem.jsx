import React from 'react';
import { Smile } from 'lucide-react';

export const POPULAR_EMOJIS = [
  '👍',
  '❤️',
  '🔥',
  '😂',
  '🎉',
  '🚀',
  '💯',
  '✨',
  '🤖',
  '👀',
  '👏',
  '🥳',
];

export default function ChatMessageItem({
  msg,
  currentUser,
  onSelectMember,
  onOpenContextMenu,
  onAddReaction,
  activeMessageReactionPicker,
  setActiveMessageReactionPicker,
}) {
  const author = (typeof msg?.author === 'object' && msg?.author !== null)
    ? msg.author
    : {
        id: msg?.senderId || msg?.authorId || 'author_' + (msg?.id || 'unknown'),
        displayName: typeof msg?.author === 'string' ? msg.author : (msg?.senderName || 'Benutzer'),
        username: typeof msg?.author === 'string' ? msg.author : (msg?.senderName || 'user'),
        avatar: msg?.avatar || '/dilsed-logo.png',
        isBot: Boolean(msg?.isBot),
        roleColor: msg?.roleColor || '#fde68a'
      };

  const authorAvatar = author.avatar || msg?.avatar || '/dilsed-logo.png';
  const authorName = author.displayName || author.username || 'Benutzer';
  const isBot = Boolean(author.isBot || msg?.isBot);
  const content = msg?.content || msg?.text || '';
  const timestamp = msg?.timestamp || 'Heute';

  const reactionsList = Array.isArray(msg?.reactions)
    ? msg.reactions
    : (msg?.reactions && typeof msg.reactions === 'object')
      ? Object.entries(msg.reactions).map(([emoji, count]) => ({
          emoji,
          count: typeof count === 'number' ? count : 1,
          users: []
        }))
      : [];

  return (
    <div className="group relative flex gap-4 -mx-4 px-4 py-1.5 hover:bg-amber-400/5 rounded transition">
      {/* Avatar */}
      <img
        src={authorAvatar}
        alt={authorName}
        onClick={() => onSelectMember && onSelectMember(author)}
        onContextMenu={(e) => {
          e.preventDefault();
          onOpenContextMenu && onOpenContextMenu(e, author);
        }}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-0.5 cursor-pointer hover:opacity-85 transition border border-amber-500/20"
        title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
      />

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            onClick={() => onSelectMember && onSelectMember(author)}
            onContextMenu={(e) => {
              e.preventDefault();
              onOpenContextMenu && onOpenContextMenu(e, author);
            }}
            className="font-bold text-sm hover:underline cursor-pointer"
            style={{ color: author.roleColor || '#fde68a' }}
            title="Linksklick: Profil | Rechtsklick: Moderationsmenü"
          >
            {authorName}
          </span>

          {isBot && (
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] text-neutral-950 font-black px-1.5 py-0.2 rounded uppercase shadow-xs">
              BOT
            </span>
          )}

          <span className="text-[11px] text-amber-200/50">{timestamp}</span>
        </div>

        {/* Content text */}
        <div className="text-sm text-amber-100/90 whitespace-pre-wrap break-words leading-relaxed mt-1 font-normal">
          {content}
        </div>

        {/* Reactions list */}
        {reactionsList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {reactionsList.map((react, i) => {
              const hasReacted = react.users?.includes(currentUser?.id);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onAddReaction && onAddReaction(msg.id, react.emoji)}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-xs transition border cursor-pointer ${
                    hasReacted
                      ? 'bg-amber-400/25 border-amber-400 text-amber-200 font-bold shadow-sm'
                      : 'bg-amber-400/10 border-amber-500/25 hover:bg-amber-400/20 text-amber-300'
                  }`}
                >
                  <span>{react.emoji}</span>
                  <span className="font-bold text-[11px]">{react.count}</span>
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
            type="button"
            onClick={() => onAddReaction && onAddReaction(msg.id, emoji)}
            className="p-1 hover:bg-amber-400/15 rounded text-sm transition cursor-pointer"
            title={`Reagieren mit ${emoji}`}
          >
            {emoji}
          </button>
        ))}
        <button
          type="button"
          onClick={() =>
            setActiveMessageReactionPicker(
              activeMessageReactionPicker === msg.id ? null : msg.id
            )
          }
          className="p-1 hover:bg-amber-400/15 rounded text-amber-400 hover:text-amber-200 text-xs font-bold cursor-pointer"
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
              type="button"
              onClick={() => {
                onAddReaction && onAddReaction(msg.id, emoji);
                setActiveMessageReactionPicker(null);
              }}
              className="text-lg p-1.5 hover:bg-amber-400/15 rounded transition hover:scale-110 cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
