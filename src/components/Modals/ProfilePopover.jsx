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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#0c0c10] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.25)] w-full max-w-sm overflow-hidden relative border border-amber-500/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 border border-amber-500/30 flex items-center justify-center text-amber-300 hover:text-white transition z-10 shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top banner */}
        <div
          className="h-24 w-full relative"
          style={{
            background: 'linear-gradient(135deg, #b45309 0%, #f59e0b 50%, #78350f 100%)',
          }}
        />

        {/* Content */}
        <div className="px-4 pb-4 relative">
          <div className="relative -mt-12 mb-3 inline-block">
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-20 h-20 rounded-full border-4 border-[#0c0c10] ring-2 ring-amber-400 object-cover shadow-xl"
            />
            <span
              className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-black ${
                user.status === 'online'
                  ? 'bg-emerald-400'
                  : user.status === 'idle'
                  ? 'bg-amber-400'
                  : user.status === 'dnd'
                  ? 'bg-red-500'
                  : 'bg-neutral-600'
              }`}
            />
          </div>

          <div className="bg-[#070709] rounded-xl p-3.5 space-y-3 border border-amber-500/20">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-200 text-base leading-tight">
                  {user.displayName}
                </span>
                {isVerified && (
                  <CheckCircle2
                    className="w-4 h-4 text-amber-400"
                    title="Verifiziertes Mitglied"
                  />
                )}
                {user.isBot && (
                  <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-[10px] text-neutral-950 font-black px-1.5 py-0.2 rounded uppercase shadow-xs">
                    BOT
                  </span>
                )}
              </div>
              <div className="text-xs text-amber-300/60 font-medium">
                @{user.username}
              </div>
            </div>

            <div className="h-[1px] bg-amber-500/20" />

            {/* Custom Status */}
            {user.customStatus && (
              <div>
                <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                  ÜBER MICH
                </div>
                <div className="text-xs text-amber-100/90 font-medium">
                  {user.customStatus}
                </div>
              </div>
            )}

            {/* Role */}
            {user.role && (
              <div>
                <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-1">
                  ROLLEN
                </div>
                <div className="flex flex-wrap gap-1">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md bg-amber-400/15 border border-amber-500/30 text-amber-300"
                  >
                    <span
                      className="w-2 h-2 rounded-full bg-amber-400 shadow-xs"
                    />
                    {user.role}
                  </span>
                </div>
              </div>
            )}

            {/* Private Note section */}
            <div>
              <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>NOTIZ</span>
                {!isEditingNote && (
                  <button
                    onClick={() => setIsEditingNote(true)}
                    className="text-amber-400 hover:text-amber-300 hover:underline text-[10px] font-bold"
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
                    className="w-full bg-[#0c0c10] border border-amber-500/30 rounded-lg p-2 text-xs text-amber-100 placeholder:text-amber-300/40 focus:outline-none focus:border-amber-400 resize-none font-medium"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => setIsEditingNote(false)}
                      className="text-[11px] text-amber-300/60 hover:text-amber-200 px-2 py-0.5 font-medium"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="text-[11px] bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 px-2.5 py-0.5 rounded font-black shadow-sm"
                    >
                      Speichern
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingNote(true)}
                  className="text-xs text-amber-200/70 hover:text-amber-100 cursor-pointer bg-[#0c0c10] p-2 rounded-lg border border-amber-500/20 hover:border-amber-400/40 transition font-medium"
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
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-1.5 transition shadow-md shadow-amber-500/25"
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
                  className="bg-[#111115] hover:bg-[#181820] text-amber-300 hover:text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition border border-amber-500/30"
                >
                  <AtSign className="w-3.5 h-3.5 text-amber-400" />
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
                className="w-full bg-[#111115] hover:bg-[#181820] text-amber-300 hover:text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition border border-amber-500/25"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>In Moderationsansicht öffnen</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
