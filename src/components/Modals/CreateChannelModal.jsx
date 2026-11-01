import React, { useState } from 'react';
import { X, Hash, Volume2, Lock, Unlock, Users } from 'lucide-react';

export default function CreateChannelModal({
  isOpen,
  onClose,
  onCreateChannel,
  categoryId,
}) {
  const [channelType, setChannelType] = useState('text'); // 'text' | 'voice'
  const [channelName, setChannelName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [userLimit, setUserLimit] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!channelName.trim()) return;

    // Discord format: lowercase with hyphens for text channels
    const formattedName =
      channelType === 'text'
        ? channelName.trim().toLowerCase().replace(/\s+/g, '-')
        : channelName.trim();

    onCreateChannel({
      id: 'c_' + Date.now(),
      name: formattedName,
      type: channelType,
      categoryId: categoryId || 'cat_chat',
      description: `${formattedName}-Kanal`,
      userLimit: channelType === 'voice' ? Number(userLimit) : undefined,
      isPrivate,
      bitrate: channelType === 'voice' ? 64 : undefined,
    });

    onClose();
    setChannelName('');
    setIsPrivate(false);
    setUserLimit(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#0a0a0d] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.18)] w-full max-w-md overflow-hidden relative border border-amber-500/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200/60 hover:text-amber-400 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-black text-white mb-1 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Kanal erstellen
          </h2>
          <p className="text-xs text-amber-200/60 mb-5">
            Erstelle einen Text- oder Sprachkanal für deinen Server.
          </p>

          <div className="space-y-2.5 mb-5">
            <label className="text-[11px] font-bold text-amber-300/80 uppercase block">
              KANALTYP
            </label>

            {/* Text channel radio */}
            <div
              onClick={() => setChannelType('text')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                channelType === 'text'
                  ? 'bg-amber-400/10 border-amber-400/70 shadow-sm shadow-amber-500/10'
                  : 'bg-[#101014] border-white/5 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Hash className={`w-5 h-5 ${channelType === 'text' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <div>
                  <div className={`font-bold text-sm ${channelType === 'text' ? 'text-amber-200' : 'text-white'}`}>Text</div>
                  <div className="text-xs text-neutral-400">
                    Sende Nachrichten, Bilder, Videos und Code
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  channelType === 'text'
                    ? 'border-amber-400 bg-amber-400'
                    : 'border-neutral-500'
                }`}
              >
                {channelType === 'text' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                )}
              </div>
            </div>

            {/* Voice channel radio */}
            <div
              onClick={() => setChannelType('voice')}
              className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                channelType === 'voice'
                  ? 'bg-amber-400/10 border-amber-400/70 shadow-sm shadow-amber-500/10'
                  : 'bg-[#101014] border-white/5 hover:border-amber-500/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Volume2 className={`w-5 h-5 ${channelType === 'voice' ? 'text-amber-400' : 'text-neutral-400'}`} />
                <div>
                  <div className={`font-bold text-sm ${channelType === 'voice' ? 'text-amber-200' : 'text-white'}`}>Sprache</div>
                  <div className="text-xs text-neutral-400">
                    Gemeinsam sprechen, Video übertragen und Bildschirm teilen
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  channelType === 'voice'
                    ? 'border-amber-400 bg-amber-400'
                    : 'border-neutral-500'
                }`}
              >
                {channelType === 'voice' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                )}
              </div>
            </div>
          </div>

          {/* KANALNAME */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1.5">
              KANALNAME
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-amber-400 font-bold">
                {channelType === 'text' ? '#' : '🔊'}
              </span>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder={channelType === 'text' ? 'neuer-kanal' : 'Gaming-Raum'}
                required
                className="w-full bg-[#121216] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
                autoFocus
              />
            </div>
          </div>

          {/* BENUTZERLIMIT FÜR SPRACHKANAL */}
          {channelType === 'voice' && (
            <div className="mb-4 p-3.5 bg-[#101014] rounded-xl border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>BENUTZERLIMIT</span>
                </span>
                <span className="text-xs font-bold text-neutral-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-sm">
                  {userLimit === 0 ? 'UNBEGRENZT' : `${userLimit} BENUTZER`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={99}
                value={userLimit}
                onChange={(e) => setUserLimit(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded"
              />
            </div>
          )}

          {/* PRIVATER KANAL SWITCH */}
          <div
            onClick={() => setIsPrivate(!isPrivate)}
            className="flex items-center justify-between p-3.5 rounded-xl bg-[#101014] border border-amber-500/20 cursor-pointer mb-6 hover:border-amber-400/40 transition"
          >
            <div className="flex items-center gap-2.5">
              {isPrivate ? (
                <Lock className="w-4 h-4 text-amber-400" />
              ) : (
                <Unlock className="w-4 h-4 text-neutral-400" />
              )}
              <div>
                <div className="text-xs font-bold text-white">Privater Kanal</div>
                <div className="text-[11px] text-neutral-400">
                  Nur ausgewählte Mitglieder und Rollen können diesen Kanal sehen
                </div>
              </div>
            </div>

            <div
              className={`w-10 h-5 rounded-full p-0.5 transition flex items-center ${
                isPrivate ? 'bg-amber-400 justify-end' : 'bg-neutral-800 justify-start'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 shadow-md" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-amber-500/15">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-amber-200/70 hover:text-white px-2 py-1"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!channelName.trim()}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-5 py-2.5 rounded-xl text-xs font-black transition disabled:opacity-50 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              Kanal erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
