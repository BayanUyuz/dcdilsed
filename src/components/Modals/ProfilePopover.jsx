import React, { useState } from 'react';
import { X, MessageSquare, AtSign, CheckCircle2, FileText, Sliders } from 'lucide-react';

export default function ProfilePopover({
  user,
  onClose,
  onStartDm,
  onMention,
  onOpenModView,
  userNote,
  onSaveNote,
  isVerified
}) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(userNote || '');

  if (!user) return null;

  const handleSaveNote = () => {
    if (onSaveNote) {
      onSaveNote(user.id, noteText.trim());
    }
    setIsEditingNote(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative border border-discord-divider/50">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white/80 hover:text-white transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top banner */}
        <div
          className="h-24 w-full relative"
          style={{
            backgroundColor: user.roleColor || '#5865F2',
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(0,0,0,0.4))'
          }}
        />

        {/* Content */}
        <div className="px-4 pb-4 relative">
          <div className="relative -mt-12 mb-3 inline-block">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-20 h-20 rounded-full border-4 border-discord-darkest object-cover shadow-xl"
            />
            <span
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-discord-darkest ${
                user.status === 'online'
                  ? 'bg-discord-green'
                  : user.status === 'idle'
                  ? 'bg-discord-yellow'
                  : user.status === 'dnd'
                  ? 'bg-discord-red'
                  : 'bg-[#747f8d]'
              }`}
            />
          </div>

          <div className="bg-discord-channels/60 rounded-xl p-3.5 space-y-3 border border-discord-divider/30">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base leading-tight">
                  {user.displayName}
                </span>
                {isVerified && (
                  <CheckCircle2
                    className="w-4 h-4 text-discord-green"
                    title="Verifiziertes Mitglied"
                  />
                )}
                {user.isBot && (
                  <span className="bg-discord-blurple text-[10px] text-white font-bold px-1 rounded uppercase">
                    BOT
                  </span>
                )}
              </div>
              <div className="text-xs text-discord-textMuted">
                @{user.username}
              </div>
            </div>

            <div className="h-[1px] bg-discord-divider/30" />

            {/* Custom Status */}
            {user.customStatus && (
              <div>
                <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-1">
                  ÜBER MICH
                </div>
                <div className="text-xs text-discord-textNormal">
                  {user.customStatus}
                </div>
              </div>
            )}

            {/* Role */}
            {user.role && (
              <div>
                <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-1">
                  ROLLEN
                </div>
                <div className="flex flex-wrap gap-1">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${user.roleColor || '#5865f2'}25`,
                      color: user.roleColor || '#5865f2',
                    }}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: user.roleColor || '#5865f2' }}
                    />
                    {user.role}
                  </span>
                </div>
              </div>
            )}

            {/* Private Note section */}
            <div>
              <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-1 flex items-center justify-between">
                <span>NOTIZ</span>
                {!isEditingNote && (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="text-discord-blurple hover:underline text-[10px] font-semibold"
                  >
                    Bearbeiten
                  </button>
                )}
              </div>
              {isEditingNote ? (
                <div className="space-y-1.5">
                  <textarea
                    rows={2}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Klicken, um Notiz hinzuzufügen"
                    className="w-full bg-discord-chat border border-discord-divider rounded-lg p-2 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple resize-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => setIsEditingNote(false)}
                      className="text-[11px] text-discord-textMuted hover:text-white px-2 py-0.5"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="text-[11px] bg-discord-blurple hover:bg-discord-blurpleHover text-white px-2.5 py-0.5 rounded font-semibold"
                    >
                      Speichern
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingNote(true)}
                  className="text-xs text-discord-textMuted hover:text-discord-textNormal cursor-pointer bg-discord-darkest/40 p-2 rounded-lg border border-transparent hover:border-discord-divider/40 transition"
                >
                  {userNote || 'Klicken, um Notiz hinzuzufügen...'}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {onStartDm && (
                <button
                  onClick={() => {
                    onStartDm(user);
                    onClose();
                  }}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Nachricht senden</span>
                </button>
              )}

              {onMention && (
                <button
                  onClick={() => {
                    onMention(user);
                    onClose();
                  }}
                  className="bg-discord-channels hover:bg-discord-hoverChannel text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-discord-divider/40"
                >
                  <AtSign className="w-3.5 h-3.5" />
                  <span>Erwähnen</span>
                </button>
              )}
            </div>

            {onOpenModView && (
              <button
                onClick={() => {
                  onOpenModView(user);
                  onClose();
                }}
                className="w-full bg-discord-channels/80 hover:bg-discord-hoverChannel text-discord-textNormal hover:text-white py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-discord-divider/30"
              >
                <Sliders className="w-3.5 h-3.5 text-discord-blurple" />
                <span>In Moderationsansicht öffnen</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
