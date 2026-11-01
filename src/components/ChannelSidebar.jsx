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
    <aside className="w-60 bg-discord-channels flex flex-col select-none flex-shrink-0 border-r border-discord-darkest/20 relative z-10">
      {/* Toast Notification for ID copy */}
      {copyToast && (
        <div className="absolute top-14 left-2 right-2 bg-discord-darkest text-discord-green text-xs font-bold p-2.5 rounded-lg shadow-2xl border border-discord-green/40 flex items-center gap-2 z-50 animate-in fade-in">
          <Check className="w-4 h-4 flex-shrink-0" />
          <span>Server-ID kopiert: {server.id}</span>
        </div>
      )}

      {/* Server Header */}
      <div className="relative">
        <button
          onClick={() => setShowServerDropdown(!showServerDropdown)}
          className="w-full h-12 px-4 flex items-center justify-between font-semibold text-discord-textHeader shadow-sm hover:bg-discord-hoverChannel transition border-b border-discord-darkest/30"
        >
          <span className="truncate">{server.name}</span>
          <ChevronDown
            className={`w-4 h-4 text-discord-textMuted transition-transform duration-200 ${
              showServerDropdown ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Server Dropdown Menu */}
        {showServerDropdown && (
          <div className="absolute top-14 left-2 right-2 bg-discord-darkest border border-discord-divider/50 rounded-lg shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenInvite();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-blurple hover:bg-discord-blurple hover:text-white rounded transition font-semibold"
            >
              <span>Leute einladen</span>
              <UserPlus className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenServerSettings();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Server-Einstellungen</span>
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateEvent();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Event erstellen</span>
              <Calendar className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenAppDirectory();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>App-Verzeichnis</span>
              <Bot className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-discord-divider/50 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenNotifications();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Benachrichtigungseinstellungen</span>
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenPrivacy();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Datenschutzeinstellungen</span>
              <Shield className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-discord-divider/50 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateChannel();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Kanal erstellen</span>
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenCreateCategory();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Kategorie erstellen</span>
              <FolderPlus className="w-4 h-4" />
            </button>

            <div className="h-[1px] bg-discord-divider/50 my-1" />

            <button
              onClick={() => {
                setShowServerDropdown(false);
                onOpenEditServerProfile();
              }}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-blurple hover:text-white rounded transition"
            >
              <span>Serverprofil bearbeiten</span>
              <User className="w-4 h-4" />
            </button>

            <div
              onClick={() => setHideMutedChannels(!hideMutedChannels)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textNormal hover:bg-discord-hoverChannel rounded transition cursor-pointer"
            >
              <span>Stumme Kanäle ausblenden</span>
              {hideMutedChannels ? (
                <CheckSquare className="w-4 h-4 text-discord-blurple" />
              ) : (
                <Square className="w-4 h-4 text-discord-textMuted" />
              )}
            </div>

            <div className="h-[1px] bg-discord-divider/50 my-1" />

            <button
              onClick={handleCopyServerId}
              className="w-full flex items-center justify-between px-2.5 py-2 text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white rounded transition font-mono text-[11px]"
            >
              <span>Server-ID kopieren</span>
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Channel Categories & Channels List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {(server?.categories || []).length === 0 ? (
          <div className="px-4 py-10 text-center text-discord-textMuted text-xs">
            <FolderPlus className="w-10 h-10 mx-auto mb-3 opacity-30 text-discord-blurple" />
            <p className="font-bold text-white mb-1">Keine Kanäle vorhanden</p>
            <p className="text-[11px] text-discord-textMuted mb-4">
              Erstelle Kategorien und Kanäle für diesen Server.
            </p>
            <button
              onClick={() => onOpenCreateChannel(null)}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow"
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
        <div className="bg-discord-darkest/95 border-t border-discord-divider/40 flex flex-col relative z-30 animate-in slide-in-from-bottom-2">
          {/* 1. Top Row: RTC Signal Status + Channel + Krisp + Disconnect */}
          <div className="px-3 py-2 flex items-center justify-between">
            {/* Status & Signal */}
            <div
              onClick={onOpenVoiceRoomView}
              className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition min-w-0"
              title="Ping: 18ms (Frankfurt - RTC verbunden)"
            >
              <div className="flex items-end gap-[2px] h-3.5">
                <span className="w-1 h-1.5 bg-discord-green rounded-sm" />
                <span className="w-1 h-2.5 bg-discord-green rounded-sm" />
                <span className="w-1 h-3.5 bg-discord-green rounded-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-discord-green leading-tight">
                  Sprachverbindung hergestellt
                </div>
                <div className="text-[10px] text-discord-textMuted truncate max-w-[100px]">
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
                  className={`p-1.5 rounded transition ${
                    isKrispEnabled
                      ? 'text-discord-green bg-discord-green/10 hover:bg-discord-green/20'
                      : 'text-discord-textMuted hover:text-white hover:bg-discord-hoverChannel'
                  }`}
                  title="Rauschunterdrückung (Krisp)"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                {/* Krisp Tooltip / Status */}
                {showKrispTooltip && (
                  <div className="absolute bottom-9 right-0 bg-[#111214] text-white text-[10px] font-semibold px-2.5 py-1 rounded shadow-xl whitespace-nowrap border border-white/10 z-50 pointer-events-none">
                    Krisp-Rauschunterdrückung: {isKrispEnabled ? 'Aktiviert' : 'Deaktiviert'}
                  </div>
                )}
              </div>

              {/* Red Disconnect Button */}
              <button
                onClick={handleDisconnectVoice}
                className="p-1.5 rounded hover:bg-discord-red/20 text-discord-textMuted hover:text-discord-red transition"
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
              className="py-1.5 px-1 bg-discord-channels hover:bg-discord-hoverChannel rounded text-discord-textNormal hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition"
              title="Kamera an"
            >
              <Video className="w-3.5 h-3.5 text-discord-textMuted" />
              <span>Video</span>
            </button>

            {/* Quick Screen Share */}
            <button
              onClick={onOpenVoiceRoomView}
              className="py-1.5 px-1 bg-discord-channels hover:bg-discord-hoverChannel rounded text-discord-textNormal hover:text-white text-[10px] font-semibold flex items-center justify-center gap-1 transition"
              title="Bildschirm übertragen"
            >
              <Monitor className="w-3.5 h-3.5 text-discord-green" />
              <span>Bildschirm</span>
            </button>

            {/* Quick Activity / Rocket 🚀 */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowActivities(!showActivities);
                  setShowSoundboard(false);
                }}
                className={`w-full py-1.5 px-1 rounded text-[10px] font-semibold flex items-center justify-center gap-1 transition ${
                  showActivities ? 'bg-discord-blurple text-white' : 'bg-discord-channels hover:bg-discord-hoverChannel text-discord-textNormal hover:text-white'
                }`}
                title="Aktivität starten"
              >
                <Rocket className="w-3.5 h-3.5 text-[#ff73fa]" />
                <span>Aktivität</span>
              </button>

              {/* Activities Popover */}
              {showActivities && (
                <div className="absolute bottom-11 left-0 bg-discord-darkest border border-discord-divider/50 rounded-xl p-3 shadow-2xl z-50 w-56 animate-in zoom-in-95">
                  <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-2">
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
                        className="w-full p-2 rounded-lg bg-discord-channels/60 hover:bg-discord-hoverChannel flex items-center gap-2.5 text-left transition"
                      >
                        <span className="text-xl">{act.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{act.name}</div>
                          <div className="text-[9px] text-discord-textMuted truncate">{act.desc}</div>
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
                className={`w-full py-1.5 px-1 rounded text-[10px] font-semibold flex items-center justify-center gap-1 transition ${
                  showSoundboard ? 'bg-discord-blurple text-white' : 'bg-discord-channels hover:bg-discord-hoverChannel text-discord-textNormal hover:text-white'
                }`}
                title="Soundboard"
              >
                <Music className="w-3.5 h-3.5 text-discord-yellow" />
                <span>Sound</span>
              </button>

              {/* Soundboard Popover */}
              {showSoundboard && (
                <div className="absolute bottom-11 right-0 bg-discord-darkest border border-discord-divider/50 rounded-xl p-3 shadow-2xl z-50 w-52 animate-in zoom-in-95">
                  <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-2">
                    SOUNDBOARD
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {SOUNDBOARD_SOUNDS.map((snd) => (
                      <button
                        key={snd.id}
                        onClick={() => {
                          snd.play();
                        }}
                        className="p-2 rounded-lg bg-discord-channels/70 hover:bg-discord-hoverChannel flex flex-col items-center justify-center text-center transition hover:scale-105"
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
      <div className="h-[52px] bg-discord-userdock px-2 flex items-center justify-between flex-shrink-0">
        <div
          onClick={onOpenSettings}
          className="flex items-center gap-2 p-1 -ml-1 rounded-md hover:bg-discord-hoverChannel cursor-pointer transition flex-1 min-w-0"
        >
          <div className="relative flex-shrink-0">
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-discord-userdock ${
                currentUser.status === 'online'
                  ? 'bg-discord-green'
                  : currentUser.status === 'idle'
                  ? 'bg-discord-yellow'
                  : currentUser.status === 'dnd'
                  ? 'bg-discord-red'
                  : 'bg-[#747f8d]'
              }`}
            />
          </div>
          <div className="truncate min-w-0">
            <div className="text-sm font-semibold text-white truncate leading-tight">
              {currentUser.displayName}
            </div>
            <div className="text-[11px] text-discord-textMuted truncate">
              {currentUser.statusText}
            </div>
          </div>
        </div>

        <div className="flex items-center text-discord-textMuted">
          <button
            onClick={toggleMute}
            className={`p-1.5 rounded hover:bg-discord-hoverChannel transition ${
              isMuted ? 'text-discord-red' : 'hover:text-discord-textNormal'
            }`}
            title={isMuted ? 'Stummschaltung aufheben' : 'Stummschalten'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleDeafen}
            className={`p-1.5 rounded hover:bg-discord-hoverChannel transition ${
              isDeafened ? 'text-discord-red' : 'hover:text-discord-textNormal'
            }`}
            title={isDeafened ? 'Taubschaltung aufheben' : 'Taub schalten'}
          >
            <Headphones className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded hover:bg-discord-hoverChannel hover:text-discord-textNormal transition"
            title="Benutzereinstellungen"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
