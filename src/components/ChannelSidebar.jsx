import React, { useState } from 'react';
import {
  ChevronDown,
  Hash,
  Volume2,
  Plus,
  Mic,
  MicOff,
  Headphones,
  Settings,
  PhoneOff,
  Radio,
  Check,
  Bell,
  Shield,
  UserPlus,
  Monitor,
  FolderPlus,
  Calendar,
  Bot,
  User,
  Copy,
  Sparkles,
  CheckSquare,
  Square,
  Video,
  VideoOff,
  Rocket,
  Music,
  Activity,
  Wifi,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  playJoinVoiceSound,
  playLeaveVoiceSound,
  playMuteSound,
  playAirhornSound,
  playQuackSound,
  playBadumTssSound,
  playApplauseSound
} from '../soundEffects';

export default function ChannelSidebar({
  server,
  activeChannelId,
  onSelectChannel,
  connectedVoiceChannel,
  setConnectedVoiceChannel,
  currentUser,
  isMuted,
  setIsMuted,
  isDeafened,
  setIsDeafened,
  onOpenSettings,
  onOpenServerSettings,
  onOpenCreateChannel,
  onOpenVoiceRoomView,
  onOpenInvite,
  onOpenCreateEvent,
  onOpenAppDirectory,
  onOpenNotifications,
  onOpenPrivacy,
  onOpenCreateCategory,
  onOpenEditServerProfile,
  serverMutedUsers = {},
  serverDeafenedUsers = {},
  onOpenVoiceChannelSettings,
}) {
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [hideMutedChannels, setHideMutedChannels] = useState(false);
  const [mutedChannels, setMutedChannels] = useState({});
  const [copyToast, setCopyToast] = useState(false);

  // Voice Bottom Dock State
  const [isKrispEnabled, setIsKrispEnabled] = useState(true);
  const [showKrispTooltip, setShowKrispTooltip] = useState(false);
  const [showSoundboard, setShowSoundboard] = useState(false);
  const [showActivities, setShowActivities] = useState(false);

  const toggleCategory = (categoryId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleVoiceChannelClick = (channel) => {
    if (connectedVoiceChannel?.id === channel.id) {
      onOpenVoiceRoomView();
      return;
    }
    playJoinVoiceSound();
    setConnectedVoiceChannel(channel);
    onOpenVoiceRoomView();
  };

  const handleDisconnectVoice = () => {
    playLeaveVoiceSound();
    setConnectedVoiceChannel(null);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    playMuteSound(next);
  };

  const toggleDeafen = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    if (next && !isMuted) {
      setIsMuted(true);
    }
    playMuteSound(next);
  };

  const handleCopyServerId = () => {
    navigator.clipboard.writeText(server.id);
    setShowServerDropdown(false);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

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

  return (
    <aside className="w-60 bg-[#09090c] flex flex-col select-none flex-shrink-0 border-r border-amber-500/15 relative z-10">
      {/* Toast Notification for ID copy */}
      {copyToast && (
        <div className="absolute top-14 left-2 right-2 bg-[#070709] text-amber-300 text-xs font-bold p-2.5 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-2 z-50 animate-in fade-in">
          <Check className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>Server-ID kopiert: {server.id}</span>
        </div>
      )}

      {/* Server Header */}
      <div className="relative">
        <button
          onClick={() => setShowServerDropdown(!showServerDropdown)}
          className="w-full h-12 px-4 flex items-center justify-between font-bold text-white shadow-sm bg-[#060608] hover:bg-[#121217] transition border-b border-amber-500/15 group"
        >
          <span className="truncate group-hover:text-amber-300 transition-colors">{server.name}</span>
          <ChevronDown
            className={`w-4 h-4 text-amber-400/80 group-hover:text-amber-400 transition-transform duration-200 ${
              showServerDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Server Dropdown Menu in Black & Gold */}
        {showServerDropdown && (
          <div className="absolute top-14 left-2 right-2 bg-[#0a0a0d] border border-amber-500/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenInvite();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-amber-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-bold"
            >
              <span>Leute einladen</span>
              <UserPlus className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenServerSettings();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Server-Einstellungen</span>
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateEvent();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Event erstellen</span>
              <Calendar className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenAppDirectory();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>App-Verzeichnis</span>
              <Bot className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-amber-500/20 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenNotifications();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Benachrichtigungseinstellungen</span>
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenPrivacy();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Datenschutzeinstellungen</span>
              <Shield className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-amber-500/20 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateChannel();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Kanal erstellen</span>
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateCategory();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Kategorie erstellen</span>
              <FolderPlus className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-amber-500/20 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenEditServerProfile();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:text-neutral-950 rounded-lg transition font-semibold"
            >
              <span>Serverprofil bearbeiten</span>
              <User className="w-4 h-4" />
            </button>

            <div
              onClick={() => setHideMutedChannels(!hideMutedChannels)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-neutral-300 hover:bg-white/5 rounded-lg transition cursor-pointer"
            >
              <span>Stumme Kanäle ausblenden</span>
              {hideMutedChannels ? (
                <CheckSquare className="w-4 h-4 text-amber-400" />
              ) : (
                <Square className="w-4 h-4 text-neutral-500" />
              )}
            </div>

            <div className="h-[1px] bg-amber-500/20 my-1" />

            <button
              onClick={handleCopyServerId}
              className="w-full flex items-center justify-between px-2.5 py-2 text-amber-200/60 hover:bg-white/5 hover:text-amber-300 rounded-lg transition font-mono text-[11px]"
            >
              <span>Server-ID kopieren</span>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Channel Categories & Channels List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
        {(server?.categories || []).length === 0 ? (
          <div className="px-4 py-10 text-center text-neutral-400 text-xs">
            <FolderPlus className="w-10 h-10 mx-auto mb-3 text-amber-400/40" />
            <p className="font-bold text-white mb-1">Keine Kanäle vorhanden</p>
            <p className="text-[11px] text-amber-200/50 mb-4">
              Erstelle Kategorien und Kanäle für diesen Server.
            </p>
            <button
              onClick={() => onOpenCreateChannel(null)}
              className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md shadow-amber-500/20 active:scale-95"
            >
              Kanal erstellen
            </button>
          </div>
        ) : (
          (server?.categories || []).map((cat) => {
            const isCollapsed = collapsedCategories[cat.id];
            return (
              <div key={cat.id} className="space-y-0.5">
                <div className="flex items-center justify-between px-1 text-[11px] font-bold text-amber-300/60 tracking-wider uppercase group hover:text-amber-200 cursor-pointer">
                  <div
                    className="flex items-center gap-1 flex-1 py-1"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isCollapsed ? '-rotate-90' : ''
                      }`}
                    />
                    <span>{cat.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenCreateChannel(cat.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white transition"
                    title="Kanal erstellen"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {!isCollapsed && (
                  <div className="space-y-[2px]">
                    {(cat.channels || [])
                      .filter((ch) => !hideMutedChannels || !mutedChannels[ch.id])
                      .map((ch) => {
                      if (ch.type === 'text') {
                        const isActive = activeChannelId === ch.id;
                        return (
                          <button
                            key={ch.id}
                            onClick={() => onSelectChannel(ch.id)}
                            className={`w-full group px-2 py-1.5 rounded-md flex items-center gap-2 text-sm transition ${
                              isActive
                                ? 'bg-amber-400/15 text-amber-300 font-semibold border-l-2 border-amber-400 shadow-sm'
                                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                            }`}
                          >
                            <Hash className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-discord-textMuted group-hover:text-discord-textNormal'}`} />
                            <span className="truncate flex-1 text-left">
                              {ch.name}
                            </span>
                          </button>
                        );
                      } else if (ch.type === 'voice') {
                        const isConnected = connectedVoiceChannel?.id === ch.id;
                        return (
                          <div key={ch.id} className="space-y-1 relative group/vc">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleVoiceChannelClick(ch)}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  if (onOpenVoiceChannelSettings) onOpenVoiceChannelSettings(ch);
                                }}
                                className={`w-full px-2 py-1.5 rounded-md flex items-center gap-2 text-sm transition pr-14 ${
                                  isConnected
                                    ? 'bg-amber-400/15 text-amber-300 font-semibold border-l-2 border-amber-400 shadow-sm'
                                    : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
                                }`}
                              >
                                {ch.isPrivate ? (
                                  <Lock
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isConnected ? 'text-amber-400' : 'text-discord-textMuted'
                                    }`}
                                  />
                                ) : (
                                  <Volume2
                                    className={`w-4 h-4 flex-shrink-0 ${
                                      isConnected
                                        ? 'text-amber-400'
                                        : 'text-discord-textMuted group-hover/vc:text-discord-textNormal'
                                    }`}
                                  />
                                )}
                                <span className="truncate flex-1 text-left">
                                  {ch.name}
                                </span>
                                {ch.userLimit > 0 && (
                                  <span className="text-[11px] text-discord-textMuted group-hover/vc:hidden">
                                    {isConnected ? '1' : '0'}/{ch.userLimit}
                                  </span>
                                )}
                              </button>

                              {/* Hover Action Buttons: Invite & Channel Settings Gear */}
                              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover/vc:flex items-center gap-0.5 text-discord-textMuted z-10">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenInvite();
                                  }}
                                  className="p-1 hover:text-white hover:bg-discord-channels rounded transition"
                                  title="Soforteinladung erstellen"
                                >
                                  <UserPlus className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onOpenVoiceChannelSettings) onOpenVoiceChannelSettings(ch);
                                  }}
                                  className="p-1 hover:text-white hover:bg-discord-channels rounded transition"
                                  title="Kanal bearbeiten (Limit, Berechtigungen, Bitrate...)"
                                >
                                  <Settings className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            {/* Render connected user avatar under voice room */}
                            {isConnected && (
                              <div
                                onClick={onOpenVoiceRoomView}
                                className="pl-6 pr-2 py-1 flex items-center justify-between text-xs text-discord-textNormal hover:bg-discord-hoverChannel rounded cursor-pointer transition"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="relative">
                                    <img
                                      src={currentUser.avatar}
                                      alt={currentUser.displayName}
                                      className={`w-6 h-6 rounded-full object-cover border-2 border-transparent ${
                                        !isMuted && !serverMutedUsers[currentUser.id] && !serverDeafenedUsers[currentUser.id]
                                          ? 'speaking-ring'
                                          : ''
                                      }`}
                                    />
                                    {serverDeafenedUsers[currentUser.id] ? (
                                      <div
                                        className="absolute -bottom-1 -right-1 bg-discord-red rounded-full p-[2px]"
                                        title="Serverweit taub geschaltet"
                                      >
                                        <Headphones className="w-2.5 h-2.5 text-white" />
                                      </div>
                                    ) : (serverMutedUsers[currentUser.id] || isMuted) ? (
                                      <div
                                        className="absolute -bottom-1 -right-1 bg-discord-red rounded-full p-[2px]"
                                        title="Serverweit stummgeschaltet"
                                      >
                                        <MicOff className="w-2.5 h-2.5 text-white" />
                                      </div>
                                    ) : null}
                                  </div>
                                  <span className="truncate font-medium text-white">
                                    {currentUser.displayName}
                                  </span>
                                </div>
                                <span className="text-[10px] text-discord-green bg-discord-green/20 px-1 rounded flex items-center gap-0.5">
                                  <Monitor className="w-3 h-3" />
                                  <span>Live</span>
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>
              )}
            </div>
          );
        })
        )}
      </div>

      {/* ============================================================== */}
      {/* REAL DISCORD BOTTOM VOICE CONNECTION DOCK (KRISP, RTC, EKRAN)  */}
      {/* ============================================================== */}
      {connectedVoiceChannel && (
        <div className="bg-[#07070a] border-t border-amber-500/20 flex flex-col relative z-30 animate-in slide-in-from-bottom-2">
          {/* 1. Top Row: RTC Signal Status + Channel + Krisp + Disconnect */}
          <div className="px-3 py-2 flex items-center justify-between">
            {/* Status & Signal */}
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
                  {connectedVoiceChannel.name} / {server.name}
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
                  className={`p-1.5 rounded-lg transition ${
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
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition"
                title="Verbindung trennen"
              >
                <PhoneOff className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 2. Bottom Row: 4 Quick Action Buttons (Video, Ekran, Roket, Ses Paneli) */}
          <div className="px-2 pb-2 grid grid-cols-4 gap-1">
            {/* Quick Video / Camera */}
            <button
              onClick={onOpenVoiceRoomView}
              className="py-1.5 px-1 bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 rounded-lg text-amber-200/80 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition"
              title="Kamera an"
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>Video</span>
            </button>

            {/* Quick Screen Share */}
            <button
              onClick={onOpenVoiceRoomView}
              className="py-1.5 px-1 bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 rounded-lg text-amber-200/80 hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition"
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
                className={`w-full py-1.5 px-1 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition ${
                  showActivities
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/20'
                    : 'bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 text-amber-200/80 hover:text-white'
                }`}
                title="Aktivität starten"
              >
                <Rocket className="w-3.5 h-3.5 text-amber-400" />
                <span>Aktivität</span>
              </button>

              {/* Activities Popover in Black & Gold */}
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
                        className="w-full p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex items-center gap-2.5 text-left transition"
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
                className={`w-full py-1.5 px-1 rounded-lg text-[10px] font-semibold flex items-center justify-center gap-1 transition ${
                  showSoundboard
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/20'
                    : 'bg-[#101015] hover:bg-[#181820] border border-amber-500/15 hover:border-amber-400/40 text-amber-200/80 hover:text-white'
                }`}
                title="Soundboard"
              >
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>Sound</span>
              </button>

              {/* Soundboard Popover in Black & Gold */}
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
                        className="p-2 rounded-xl bg-[#131318] hover:bg-[#1a1a22] border border-amber-500/15 hover:border-amber-400/40 flex flex-col items-center justify-center text-center transition hover:scale-105"
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
      )}

      {/* User Dock Bar */}
      <div className="h-[52px] bg-[#060608] px-2 flex items-center justify-between flex-shrink-0 border-t border-amber-500/15">
        <div
          onClick={onOpenSettings}
          className="flex items-center gap-2 p-1 -ml-1 rounded-lg hover:bg-white/5 cursor-pointer transition flex-1 min-w-0"
        >
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full object-cover border border-amber-500/30"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${
                currentUser.status === 'online'
                  ? 'bg-emerald-400'
                  : currentUser.status === 'idle'
                  ? 'bg-amber-400'
                  : currentUser.status === 'dnd'
                  ? 'bg-red-500'
                  : 'bg-neutral-600'
              }`}
            />
          </div>
          <div className="truncate min-w-0">
            <div className="text-sm font-bold text-white truncate leading-tight">
              {currentUser.displayName}
            </div>
            <div className="text-[11px] text-amber-200/50 truncate">
              {currentUser.statusText}
            </div>
          </div>
        </div>

        <div className="flex items-center text-amber-400 gap-0.5">
          <button
            onClick={toggleMute}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition hover:scale-105 ${
              isMuted ? 'text-red-400' : 'text-amber-400 hover:text-amber-300'
            }`}
            title={isMuted ? 'Stummschaltung aufheben' : 'Stummschalten'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-400" />}
          </button>
          <button
            onClick={toggleDeafen}
            className={`p-1.5 rounded-lg hover:bg-white/5 transition hover:scale-105 ${
              isDeafened ? 'text-red-400' : 'text-amber-400 hover:text-amber-300'
            }`}
            title={isDeafened ? 'Taubschaltung aufheben' : 'Taub schalten'}
          >
            <Headphones className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg hover:bg-white/5 text-amber-400 hover:text-amber-300 transition hover:scale-105 group"
            title="Benutzereinstellungen"
          >
            <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </aside>
  );
}
