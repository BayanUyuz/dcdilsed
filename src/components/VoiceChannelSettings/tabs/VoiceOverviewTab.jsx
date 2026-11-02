import React from 'react';
import { Volume2, Users, Radio } from 'lucide-react';

export default function VoiceOverviewTab({
  channelName,
  setChannelName,
  channelTopic,
  setChannelTopic,
  userLimit,
  setUserLimit,
  bitrate,
  setBitrate,
  videoQuality,
  setVideoQuality,
  region,
  setRegion,
  isPushToTalkRequired,
  setIsPushToTalkRequired,
  setHasChanges
}) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">
          Sprachraum-Übersicht
        </h1>
        <p className="text-xs text-discord-textMuted">
          Passe den Namen, das Benutzerlimit, die Audioqualität und die Region dieses Sprachkanals an.
        </p>
      </div>

      {/* KANALNAME */}
      <div>
        <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-2">
          KANALNAME
        </label>
        <div className="relative flex items-center">
          <Volume2 className="w-4 h-4 text-discord-textMuted absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={channelName}
            onChange={(e) => {
              setChannelName(e.target.value);
              setHasChanges(true);
            }}
            placeholder="sprachkanal"
            className="w-full bg-discord-darkest border border-discord-divider/60 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple transition"
            maxLength={100}
          />
        </div>
      </div>

      {/* KANALSTATUS / THEMA */}
      <div>
        <label className="block text-[11px] font-bold text-discord-textMuted uppercase mb-2">
          KANALSTATUS (OPTIONAL)
        </label>
        <input
          type="text"
          value={channelTopic}
          onChange={(e) => {
            setChannelTopic(e.target.value);
            setHasChanges(true);
          }}
          placeholder="Kanalstatus festlegen (z. B. Gaming-Abend, Chill-Lounge...)"
          className="w-full bg-discord-darkest border border-discord-divider/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple transition"
          maxLength={128}
        />
      </div>

      <div className="h-[1px] bg-discord-divider/30 my-4" />

      {/* BENUTZERLIMIT */}
      <div className="bg-discord-darkest/60 border border-discord-divider/40 p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-discord-blurple" />
              <span>BENUTZERLIMIT</span>
            </div>
            <p className="text-[11px] text-discord-textMuted mt-0.5">
              Begrenzt die maximale Anzahl von Benutzern, die gleichzeitig beitreten können.
            </p>
          </div>

          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${
              userLimit === 0
                ? 'bg-discord-green/20 text-discord-green border border-discord-green/40'
                : 'bg-discord-blurple/20 text-discord-blurple border border-discord-blurple/40'
            }`}
          >
            {userLimit === 0 ? 'UNBEGRENZT' : `${userLimit} BENUTZER`}
          </span>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min={0}
            max={99}
            step={1}
            value={userLimit}
            onChange={(e) => {
              setUserLimit(Number(e.target.value));
              setHasChanges(true);
            }}
            className="w-full accent-discord-blurple cursor-pointer h-1.5 bg-discord-divider rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-discord-textMuted font-semibold mt-1">
            <span>Unendlich (0)</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>99 Max</span>
          </div>
        </div>
      </div>

      {/* BITRATE */}
      <div className="bg-discord-darkest/60 border border-discord-divider/40 p-4 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-discord-green" />
              <span>AUDIO-BITRATE & QUALITÄT</span>
            </div>
            <p className="text-[11px] text-discord-textMuted mt-0.5">
              Höhere Audioqualität benötigt mehr Netzwerk-Bandbreite.
            </p>
          </div>

          <span className="bg-discord-green/20 text-discord-green border border-discord-green/40 px-2.5 py-1 rounded-full text-xs font-bold">
            {bitrate} kbps
          </span>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min={8}
            max={384}
            step={8}
            value={bitrate}
            onChange={(e) => {
              setBitrate(Number(e.target.value));
              setHasChanges(true);
            }}
            className="w-full accent-discord-green cursor-pointer h-1.5 bg-discord-divider rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-discord-textMuted font-semibold mt-1">
            <span>8 kbps</span>
            <span>64 kbps (Standard)</span>
            <span>128 kbps (HD)</span>
            <span>384 kbps (Ultra HD)</span>
          </div>
        </div>
      </div>

      {/* VIDEOQUALITÄT */}
      <div className="bg-discord-darkest/60 border border-discord-divider/40 p-4 rounded-2xl">
        <label className="block text-xs font-bold text-white mb-1">
          VIDEO- UND BILDSCHIRMAUFLÖSUNG
        </label>
        <p className="text-[11px] text-discord-textMuted mb-3">
          Optimiere die Übertragungsqualität für die Teilnehmer des Kanals.
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'auto', label: 'Automatisch', badge: 'Empfohlen' },
            { id: '720p', label: '720p 60 FPS', badge: 'Standard' },
            { id: '1080p', label: '1080p 60 FPS', badge: 'Ultra HD' },
          ].map((vq) => (
            <button
              key={vq.id}
              type="button"
              onClick={() => {
                setVideoQuality(vq.id);
                setHasChanges(true);
              }}
              className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                videoQuality === vq.id
                  ? 'bg-discord-blurple/20 border-discord-blurple text-white'
                  : 'bg-discord-chat/60 border-discord-divider/40 text-discord-textNormal hover:bg-discord-chat'
              }`}
            >
              <div className="font-semibold text-xs text-white">{vq.label}</div>
              <div className="text-[10px] text-discord-textMuted mt-0.5">{vq.badge}</div>
            </button>
          ))}
        </div>
      </div>

      {/* REGION & PUSH-TO-TALK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-discord-darkest/60 border border-discord-divider/40 p-4 rounded-2xl">
          <label className="block text-xs font-bold text-white mb-1">
            REGION ÜBERSCHREIBEN
          </label>
          <p className="text-[10px] text-discord-textMuted mb-2">
            RTC-Sprachserver, mit dem sich Benutzer verbinden.
          </p>
          <select
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setHasChanges(true);
            }}
            className="w-full bg-discord-chat border border-discord-divider/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-discord-blurple cursor-pointer"
          >
            <option value="automatic">Automatisch (Nächstgelegener Standort)</option>
            <option value="frankfurt">Frankfurt (Deutschland) - 18ms</option>
            <option value="rotterdam">Rotterdam (Niederlande) - 22ms</option>
            <option value="london">London (Vereinigtes Königreich) - 31ms</option>
            <option value="us-east">US-Ost (Virginia) - 95ms</option>
          </select>
        </div>

        <div className="bg-discord-darkest/60 border border-discord-divider/40 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <label className="block text-xs font-bold text-white">
              PUSH-TO-TALK ERFORDERLICH
            </label>
            <p className="text-[10px] text-discord-textMuted mt-0.5">
              Teilnehmer müssen eine Push-to-Talk-Taste zum Sprechen verwenden.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isPushToTalkRequired}
            onChange={(e) => {
              setIsPushToTalkRequired(e.target.checked);
              setHasChanges(true);
            }}
            className="w-5 h-5 accent-discord-blurple rounded cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
