import React, { useState } from 'react';
import {
  Sparkles,
  PhoneOff,
  Video,
  Monitor,
  Rocket,
  Music
} from 'lucide-react';
import {
  playAirhornSound,
  playQuackSound,
  playBadumTssSound,
  playApplauseSound
} from '../../soundEffects';

export default function VoiceDock({
  connectedVoiceChannel,
  serverName,
  onOpenVoiceRoomView,
  handleDisconnectVoice
}) {
  const [isKrispEnabled, setIsKrispEnabled] = useState(true);
  const [showKrispTooltip, setShowKrispTooltip] = useState(false);
  const [showSoundboard, setShowSoundboard] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  const SOUNDBOARD_SOUNDS = [
    { id: 'airhorn', name: 'Lufthorn', emoji: '📢', play: playAirhornSound },
    { id: 'quack', name: 'Enten-Quak', emoji: '🦆', play: playQuackSound },
    { id: 'badum', name: 'Ba-Dum-Tss!', emoji: '🥁', play: playBadumTssSound },
    { id: 'applause', name: 'Großer Applaus', emoji: '👏', play: playApplauseSound },
  ];

  const ACTIVITIES = [
    { id: 'youtube', name: 'Watch Together', desc: 'YouTube zusammen mit Freunden ansehen', icon: '📺' },
    { id: 'gartic', name: 'Gartic Phone', desc: 'Stille Post Zeichnen mit Freunden', icon: '🎨' },
    { id: 'chess', name: 'Chess in the Park', desc: 'Spannende Schach-Herausforderung', icon: '♟️' },
    { id: 'poker', name: 'Poker Night', desc: 'Texas Hold\'em Abend mit Freunden', icon: '🃏' },
  ];

  if (!connectedVoiceChannel) return null;

  return (
    <div className="bg-[#07070a] border-t border-amber-500/20 flex flex-col relative z-30 animate-in slide-in-from-bottom-2">
      <div className="px-3 py-2 flex items-center justify-between">
        <div
          onClick={onOpenVoiceRoomView}
          className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition min-w-0"
          title="Ping: 18ms (Frankfurt - RTC verbunden)"
        >
          <div className="flex items-end gap-[2px] h-3.5">
            <span className="w-1 h-1.5 bg-amber-400 rounded-sm" />
            <span className="w-1 h-2.5 bg-amber-400 rounded-sm" />
            <span className="w-1 h-3.5 bg-amber-400 rounded-sm" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-amber-300 leading-tight">
              Sprachverbindung hergestellt
            </div>
            <div className="text-[10px] text-amber-200/60 truncate max-w-[100px]">
              {connectedVoiceChannel.name} / {serverName}
            </div>
          </div>
        </div>

        {/* Krisp Noise Suppression & Disconnect Button */}
        <div className="flex items-center gap-1">
          {/* Krisp Noise Cancellation Button */}
          <div className="relative">
            <button
              onClick={() => setIsKrispEnabled(!isKrispEnabled)}
              onMouseEnter={() => setShowKrispTooltip(true)}
              onMouseLeave={() => setShowKrispTooltip(false)}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                isKrispEnabled
                  ? 'text-amber-400 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Rauschunterdrückung (Krisp)"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            {/* Krisp Tooltip / Status */}
            {showKrispTooltip && (
              <div className="absolute bottom-9 right-0 bg-[#0c0c10] text-amber-200 text-[10px] font-semibold px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap border border-amber-500/30 z-50 pointer-events-none">
                Krisp-Rauschunterdrückung: {isKrispEnabled ? 'Aktiviert' : 'Deaktiviert'}
              </div>
            )}
          </div>

          {/* Red Disconnect Button */}
          <button
            onClick={handleDisconnectVoice}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition cursor-pointer"
            title="Verbindung trennen"
          >
            <PhoneOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-2 pb-2 grid grid-cols-4 gap-1">
        <button
          onClick={onOpenVoiceRoomView}
          className="py-1.5 px-1 bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 rounded-lg text-amber-200/80 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
          title="Kamera an"
        >
          <Video className="w-3.5 h-3.5 text-amber-400" />
          <span>Video</span>
        </button>

        <button
          onClick={onOpenVoiceRoomView}
          className="py-1.5 px-1 bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 rounded-lg text-amber-200/80 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
          title="Bildschirm übertragen"
        >
          <Monitor className="w-3.5 h-3.5 text-amber-400" />
          <span>Bildschirm</span>
        </button>

        {/* Quick Activity / Rocket 🚀 */}
        <div className="relative">
          <button
            onClick={() => {
              setShowActivities(!showActivities);
              setShowSoundboard(false);
            }}
            className={`w-full py-1.5 px-1 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              showActivities
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/20'
                : 'bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 text-amber-200/80 hover:text-white'
            }`}
            title="Aktivität starten"
          >
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span>Aktivität</span>
          </button>

          {showActivities && (
            <div className="absolute bottom-11 left-0 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3 shadow-2xl z-50 w-56 animate-in zoom-in-95">
              <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-2">
                EINE AKTIVITÄT STARTEN
              </div>
              <div className="space-y-1.5">
                {ACTIVITIES.map((act) => (
                  <button
                    key={act.id}
                    onClick={() => {
                      alert(`🚀 "${act.name}" im Sprachkanal gestartet!`);
                      setShowActivities(false);
                    }}
                    className="w-full p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex items-center gap-2.5 text-left transition cursor-pointer"
                  >
                    <span className="text-xl">{act.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{act.name}</div>
                      <div className="text-[9px] text-amber-200/50 truncate">{act.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Soundboard 🔊 */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSoundboard(!showSoundboard);
              setShowActivities(false);
            }}
            className={`w-full py-1.5 px-1 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition cursor-pointer ${
              showSoundboard
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/20'
                : 'bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 text-amber-200/80 hover:text-white'
            }`}
            title="Soundboard"
          >
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Sound</span>
          </button>

          {showSoundboard && (
            <div className="absolute bottom-11 right-0 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3 shadow-2xl z-50 w-52 animate-in zoom-in-95">
              <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-2">
                SOUNDBOARD
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SOUNDBOARD_SOUNDS.map((snd) => (
                  <button
                    key={snd.id}
                    onClick={() => {
                      snd.play();
                    }}
                    className="p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex flex-col items-center justify-center text-center transition hover:scale-105 cursor-pointer"
                  >
                    <span className="text-xl mb-1">{snd.emoji}</span>
                    <span className="text-[10px] font-bold text-white leading-tight">{snd.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
