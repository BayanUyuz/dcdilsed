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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-xl font-bold text-white mb-1">Kanal erstellen</h2>
          <p className="text-xs text-discord-textMuted mb-5">
            Erstelle einen Text- oder Sprachkanal für deinen Server.
          </p>

          <div className="space-y-2.5 mb-5">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block">
              KANALTYP
            </label>

            {/* Text channel radio */}
            <div
              onClick={() => setChannelType('text')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                channelType === 'text'
                  ? 'bg-discord-channels border-discord-blurple'
                  : 'bg-discord-darkest/60 border-discord-divider/40 hover:bg-discord-channels'
              }`}
            >
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-discord-textMuted" />
                <div>
                  <div className="font-semibold text-white text-sm">Text</div>
                  <div className="text-xs text-discord-textMuted">
                    Sende Nachrichten, Bilder, Videos und Code
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  channelType === 'text'
                    ? 'border-discord-blurple bg-discord-blurple'
                    : 'border-discord-textMuted'
                }`}
              >
                {channelType === 'text' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </div>

            {/* Voice channel radio */}
            <div
              onClick={() => setChannelType('voice')}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                channelType === 'voice'
                  ? 'bg-discord-channels border-discord-blurple'
                  : 'bg-discord-darkest/60 border-discord-divider/40 hover:bg-discord-channels'
              }`}
            >
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-discord-textMuted" />
                <div>
                  <div className="font-semibold text-white text-sm">Sprache</div>
                  <div className="text-xs text-discord-textMuted">
                    Gemeinsam sprechen, Video übertragen und Bildschirm teilen
                  </div>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  channelType === 'voice'
                    ? 'border-discord-blurple bg-discord-blurple'
                    : 'border-discord-textMuted'
                }`}
              >
                {channelType === 'voice' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>

          {/* KANALNAME */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1.5">
              KANALNAME
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-discord-textMuted">
                {channelType === 'text' ? '#' : '🔊'}
              </span>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder={channelType === 'text' ? 'neuer-kanal' : 'Gaming-Raum'}
                required
                className="w-full bg-discord-darkest rounded-xl pl-9 pr-3 py-2 text-sm text-white border border-discord-divider/60 focus:border-discord-blurple focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* BENUTZERLIMIT FÜR SPRACHKANAL */}
          {channelType === 'voice' && (
            <div className="mb-4 p-3 bg-discord-darkest/60 rounded-xl border border-discord-divider/40">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-discord-blurple" />
                  <span>BENUTZERLIMIT</span>
                </span>
                <span className="text-xs font-bold text-discord-green bg-discord-green/20 px-2 py-0.5 rounded-full">
                  {userLimit === 0 ? 'UNBEGRENZT' : `${userLimit} BENUTZER`}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={99}
                value={userLimit}
                onChange={(e) => setUserLimit(Number(e.target.value))}
                className="w-full accent-discord-blurple cursor-pointer h-1.5 bg-discord-divider rounded"
              />
            </div>
          )}

          {/* PRIVATER KANAL SWITCH */}
          <div
            onClick={() => setIsPrivate(!isPrivate)}
            className="flex items-center justify-between p-3 rounded-xl bg-discord-darkest/60 border border-discord-divider/40 cursor-pointer mb-6"
          >
            <div className="flex items-center gap-2.5">
              {isPrivate ? (
                <Lock className="w-4 h-4 text-discord-blurple" />
              ) : (
                <Unlock className="w-4 h-4 text-discord-textMuted" />
              )}
              <div>
                <div className="text-xs font-semibold text-white">Privater Kanal</div>
                <div className="text-[11px] text-discord-textMuted">
                  Nur ausgewählte Mitglieder und Rollen können diesen Kanal sehen
                </div>
              </div>
            </div>

            <div
              className={`w-10 h-5 rounded-full p-0.5 transition flex items-center ${
                isPrivate ? 'bg-discord-blurple justify-end' : 'bg-discord-channels justify-start'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-white shadow-md" />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-discord-divider/30">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-white hover:underline px-2 py-1"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!channelName.trim()}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded-xl text-xs font-semibold transition disabled:opacity-50 shadow-md"
            >
              Kanal erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
