import React, { useState, useEffect } from 'react';
import {
  X,
  Volume2,
  Shield,
  Link,
  Bot,
  Trash2,
  Lock,
  Unlock,
  Check,
  Minus,
  Sliders,
  Users,
  Radio,
  Sparkles,
  Wifi,
  Copy,
  Plus,
  AlertTriangle
} from 'lucide-react';

export default function VoiceChannelSettingsModal({
  isOpen,
  onClose,
  channel,
  onUpdateChannel,
  onDeleteChannel,
  serverRoles = []
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'permissions' | 'invites' | 'integrations'
  
  // Overview form states
  const [channelName, setChannelName] = useState('');
  const [channelTopic, setChannelTopic] = useState('');
  const [userLimit, setUserLimit] = useState(0); // 0 = unlimited
  const [bitrate, setBitrate] = useState(64); // 64kbps default
  const [videoQuality, setVideoQuality] = useState('auto'); // 'auto' | '720p' | '1080p'
  const [region, setRegion] = useState('automatic');
  const [isPushToTalkRequired, setIsPushToTalkRequired] = useState(false);

  // Permissions form states
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState('@everyone');
  const [rolePermissions, setRolePermissions] = useState({
    '@everyone': {
      view: true,
      connect: true,
      speak: true,
      video: true,
      voiceActivity: true,
      prioritySpeaker: false,
      muteMembers: false,
      deafenMembers: false,
      moveMembers: false,
    },
    'r_admin': {
      view: true,
      connect: true,
      speak: true,
      video: true,
      voiceActivity: true,
      prioritySpeaker: true,
      muteMembers: true,
      deafenMembers: true,
      moveMembers: true,
    },
    'r_mod': {
      view: true,
      connect: true,
      speak: true,
      video: true,
      voiceActivity: true,
      prioritySpeaker: true,
      muteMembers: true,
      deafenMembers: true,
      moveMembers: true,
    },
    'r_vip': {
      view: true,
      connect: true,
      speak: true,
      video: true,
      voiceActivity: true,
      prioritySpeaker: false,
      muteMembers: false,
      deafenMembers: false,
      moveMembers: false,
    }
  });

  // Invites state
  const [invites, setInvites] = useState([]);
  const [copiedInvite, setCopiedInvite] = useState(null);

  // Delete channel confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync initial state when channel changes
  useEffect(() => {
    if (channel) {
      setChannelName(channel.name || '');
      setChannelTopic(channel.description || channel.topic || '');
      setUserLimit(channel.userLimit !== undefined ? channel.userLimit : 0);
      setBitrate(channel.bitrate || 64);
      setVideoQuality(channel.videoQuality || 'auto');
      setRegion(channel.region || 'automatic');
      setIsPushToTalkRequired(!!channel.isPushToTalkRequired);
      setIsPrivate(!!channel.isPrivate);
      if (channel.rolePermissions) {
        setRolePermissions(channel.rolePermissions);
      }
      setHasChanges(false);
    }
  }, [channel, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showDeleteConfirm, onClose]);

  if (!isOpen || !channel) return null;

  const handleSaveChanges = () => {
    const updated = {
      ...channel,
      name: channelName.trim() || channel.name,
      description: channelTopic.trim(),
      topic: channelTopic.trim(),
      userLimit: Number(userLimit),
      bitrate: Number(bitrate),
      videoQuality,
      region,
      isPushToTalkRequired,
      isPrivate,
      rolePermissions
    };
    onUpdateChannel(updated);
    setHasChanges(false);
  };

  const handleReset = () => {
    if (channel) {
      setChannelName(channel.name || '');
      setChannelTopic(channel.description || channel.topic || '');
      setUserLimit(channel.userLimit !== undefined ? channel.userLimit : 0);
      setBitrate(channel.bitrate || 64);
      setVideoQuality(channel.videoQuality || 'auto');
      setRegion(channel.region || 'automatic');
      setIsPushToTalkRequired(!!channel.isPushToTalkRequired);
      setIsPrivate(!!channel.isPrivate);
      setHasChanges(false);
    }
  };

  const togglePermission = (permKey, value) => {
    setRolePermissions((prev) => ({
      ...prev,
      [selectedRoleId]: {
        ...(prev[selectedRoleId] || {}),
        [permKey]: value
      }
    }));
    setHasChanges(true);
  };

  const handleCopyInvite = (code) => {
    navigator.clipboard.writeText(`https://${code}`);
    setCopiedInvite(code);
    setTimeout(() => setCopiedInvite(null), 2000);
  };

  const handleDeleteInvite = (invId) => {
    setInvites((prev) => prev.filter((i) => i.id !== invId));
  };

  const handleCreateNewInvite = () => {
    const newCode = `discord.gg/voice-${Math.random().toString(36).substring(2, 7)}`;
    setInvites((prev) => [
      ...prev,
      { id: 'inv_' + Date.now(), code: newCode, author: 'Du', uses: 0, maxUses: 0, expires: '7 Tage' }
    ]);
  };

  const ROLES_LIST = [
    { id: '@everyone', name: '@everyone', color: '#949ba4' },
    { id: 'r_admin', name: 'Administrator', color: '#5865F2' },
    { id: 'r_mod', name: 'Moderator', color: '#23a55a' },
    { id: 'r_vip', name: 'VIP-Unterstützer', color: '#eb459e' },
  ];

  const PERMISSION_CONFIGS = [
    {
      key: 'view',
      title: 'Kanal anzeigen',
      desc: 'Erlaubt Mitgliedern, diesen Sprachkanal in der Kanalliste zu sehen.'
    },
    {
      key: 'connect',
      title: 'Verbinden',
      desc: 'Erlaubt Mitgliedern, sich mit diesem Sprachkanal zu verbinden und andere zu hören.'
    },
    {
      key: 'speak',
      title: 'Sprechen',
      desc: 'Erlaubt Mitgliedern, in diesem Sprachkanal ihr Mikrofon zu verwenden.'
    },
    {
      key: 'video',
      title: 'Video & Bildschirmübertragung',
      desc: 'Erlaubt Mitgliedern, ihre Kamera einzuschalten oder ihren Bildschirm zu teilen.'
    },
    {
      key: 'voiceActivity',
      title: 'Sprachaktivierung nutzen',
      desc: 'Erlaubt Mitgliedern, ohne Push-to-Talk mit automatischer Spracherkennung zu sprechen.'
    },
    {
      key: 'prioritySpeaker',
      title: 'Prioritäts-Sprecher',
      desc: 'Wenn dieses Mitglied spricht, wird die Lautstärke anderer Teilnehmer automatisch reduziert.'
    },
    {
      key: 'muteMembers',
      title: 'Mitglieder stummschalten',
      desc: 'Erlaubt es, andere Mitglieder in diesem Sprachraum serverseitig stummzuschalten.'
    },
    {
      key: 'deafenMembers',
      title: 'Mitglieder taubschalten',
      desc: 'Erlaubt es, die Kopfhörer anderer Mitglieder in diesem Sprachraum stummzuschalten.'
    },
    {
      key: 'moveMembers',
      title: 'Mitglieder verschieben',
      desc: 'Erlaubt es, Mitglieder in andere Sprachräume zu verschieben.'
    },
  ];

  const currentRolePerms = rolePermissions[selectedRoleId] || {};

  return (
    <div className="fixed inset-0 z-50 flex bg-discord-chat animate-in fade-in select-none overflow-hidden">
      {/* 1. LEFT SIDEBAR TABS */}
      <div className="w-60 bg-discord-darkest flex flex-col items-end py-14 pr-6 pl-4 border-r border-discord-divider/20 flex-shrink-0">
        <div className="w-48 space-y-1">
          {/* Channel Name Header */}
          <div className="text-[11px] font-bold text-discord-textMuted uppercase px-2 pb-2 truncate flex items-center gap-1.5 border-b border-discord-divider/30 mb-2">
            <Volume2 className="w-3.5 h-3.5 flex-shrink-0 text-discord-green" />
            <span className="truncate">{channel.name}</span>
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'overview'
                ? 'bg-discord-hoverChannel text-white'
                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Übersicht</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'permissions'
                ? 'bg-discord-hoverChannel text-white'
                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Berechtigungen</span>
          </button>

          <button
            onClick={() => setActiveTab('invites')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'invites'
                ? 'bg-discord-hoverChannel text-white'
                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Einladungen</span>
          </button>

          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'integrations'
                ? 'bg-discord-hoverChannel text-white'
                : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-discord-textNormal'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Integrationen</span>
          </button>

          <div className="h-[1px] bg-discord-divider/30 my-2" />

          {/* Delete Channel Button */}
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between text-discord-red hover:bg-discord-red hover:text-white transition group"
          >
            <span>Kanal löschen</span>
            <Trash2 className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* 2. RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-discord-chat relative overflow-y-auto custom-scrollbar">
        {/* ESC Close Button in top right */}
        <div className="absolute top-12 right-16 flex flex-col items-center gap-1 z-30">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-discord-textMuted hover:border-white flex items-center justify-center text-discord-textMuted hover:text-white transition group"
            title="Schließen (ESC)"
          >
            <X className="w-4 h-4 group-hover:scale-110 transition" />
          </button>
          <span className="text-[10px] font-bold text-discord-textMuted uppercase tracking-wider">
            ESC
          </span>
        </div>

        <div className="max-w-2xl px-10 py-14">
          {/* ========================================================= */}
          {/* TAB 1: ÜBERSICHT (OVERVIEW) */}
          {/* ========================================================= */}
          {activeTab === 'overview' && (
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

              {/* BENUTZERLIMIT (USER LIMIT SLIDER) */}
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

              {/* BITRATE (AUDIOQUALITÄT SLIDER) */}
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

              {/* VIDEOQUALITÄT AUSWAHL */}
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
                      className={`p-3 rounded-xl border text-left transition ${
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
                    className="w-full bg-discord-chat border border-discord-divider/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-discord-blurple"
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
          )}

          {/* ========================================================= */}
          {/* TAB 2: BERECHTIGUNGEN (PERMISSIONS) */}
          {/* ========================================================= */}
          {activeTab === 'permissions' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">
                  Kanalberechtigungen & Zugriff
                </h1>
                <p className="text-xs text-discord-textMuted">
                  Lege fest, wer diesen Sprachraum sehen, betreten und darin sprechen darf.
                </p>
              </div>

              {/* PRIVATER KANAL SWITCH */}
              <div
                onClick={() => {
                  setIsPrivate(!isPrivate);
                  setHasChanges(true);
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  isPrivate
                    ? 'bg-discord-blurple/10 border-discord-blurple'
                    : 'bg-discord-darkest/60 border-discord-divider/40 hover:bg-discord-darkest'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isPrivate ? 'bg-discord-blurple text-white' : 'bg-discord-channels text-discord-textMuted'
                    }`}
                  >
                    {isPrivate ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>Privater Sprachraum</span>
                      {isPrivate && (
                        <span className="text-[10px] bg-discord-blurple/30 text-discord-blurple px-2 py-0.5 rounded-full font-bold">
                          GESCHÜTZT
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-discord-textMuted leading-relaxed">
                      Nur ausgewählte Rollen und Mitglieder können diesen privaten Sprachraum sehen und betreten.
                    </div>
                  </div>
                </div>

                <div
                  className={`w-12 h-6 rounded-full p-1 transition flex items-center ${
                    isPrivate ? 'bg-discord-blurple justify-end' : 'bg-discord-channels justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </div>
              </div>

              {/* ROLLEN & MITGLIEDER LISTE */}
              <div>
                <div className="text-[11px] font-bold text-discord-textMuted uppercase mb-2">
                  ROLLEN ODER MITGLIEDER
                </div>
                <div className="flex flex-wrap gap-2">
                  {ROLES_LIST.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
                        selectedRoleId === role.id
                          ? 'bg-discord-blurple text-white border-discord-blurple shadow-md'
                          : 'bg-discord-darkest/60 border-discord-divider/40 text-discord-textNormal hover:bg-discord-darkest'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ERWEITERTE BERECHTIGUNGSTABELLE */}
              <div className="bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl overflow-hidden">
                <div className="p-3 bg-discord-channels/40 border-b border-discord-divider/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    BERECHTIGUNGEN FÜR {ROLES_LIST.find((r) => r.id === selectedRoleId)?.name}
                  </span>
                  <span className="text-[11px] text-discord-textMuted">
                    [Rot: Verweigern] &bull; [Grau: Neutral] &bull; [Grün: Erlauben]
                  </span>
                </div>

                <div className="divide-y divide-discord-divider/20">
                  {PERMISSION_CONFIGS.map((perm) => {
                    const isGranted = currentRolePerms[perm.key] === true;
                    const isDenied = currentRolePerms[perm.key] === false;

                    return (
                      <div
                        key={perm.key}
                        className="p-3.5 flex items-center justify-between gap-4 hover:bg-discord-channels/30 transition"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white leading-tight">
                            {perm.title}
                          </div>
                          <div className="text-[11px] text-discord-textMuted mt-0.5 leading-normal">
                            {perm.desc}
                          </div>
                        </div>

                        {/* Tri-state Button Control */}
                        <div className="flex items-center bg-discord-darkest border border-discord-divider/60 rounded-xl p-0.5 gap-0.5 flex-shrink-0">
                          {/* Red X (Deny) */}
                          <button
                            type="button"
                            onClick={() => togglePermission(perm.key, false)}
                            className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                              isDenied
                                ? 'bg-discord-red text-white'
                                : 'text-discord-textMuted hover:text-white'
                            }`}
                            title="Nicht erlauben"
                          >
                            <X className="w-3.5 h-3.5 stroke-[3]" />
                          </button>

                          {/* Gray Dash (Neutral / Inherit) */}
                          <button
                            type="button"
                            onClick={() => togglePermission(perm.key, undefined)}
                            className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                              !isGranted && !isDenied
                                ? 'bg-discord-channels text-white'
                                : 'text-discord-textMuted hover:text-white'
                            }`}
                            title="Standard verwenden"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          {/* Green Check (Allow) */}
                          <button
                            type="button"
                            onClick={() => togglePermission(perm.key, true)}
                            className={`w-7 h-6 rounded-lg flex items-center justify-center transition ${
                              isGranted
                                ? 'bg-discord-green text-white'
                                : 'text-discord-textMuted hover:text-white'
                            }`}
                            title="Erlauben"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: EINLADUNGEN (INVITES) */}
          {/* ========================================================= */}
          {activeTab === 'invites' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-white mb-1">
                    Aktive Sprachkanal-Einladungen
                  </h1>
                  <p className="text-xs text-discord-textMuted">
                    Einladungslinks mit direktem Einstieg in diesen Sprachraum.
                  </p>
                </div>

                <button
                  onClick={handleCreateNewInvite}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Neue Einladung</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {invites.length === 0 ? (
                  <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest/40 rounded-2xl border border-discord-divider/30">
                    Keine aktiven Einladungen für diesen Sprachraum. Erstelle eine neue Einladung!
                  </div>
                ) : (
                  invites.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <span>{inv.code}</span>
                        {copiedInvite === inv.code && (
                          <span className="text-[10px] text-discord-green font-sans font-bold bg-discord-green/20 px-1.5 rounded">
                            Kopiert!
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-discord-textMuted mt-1 flex items-center gap-3">
                        <span>Erstellt von: <strong className="text-white">{inv.author}</strong></span>
                        <span>&bull;</span>
                        <span>{inv.uses} Mal verwendet</span>
                        <span>&bull;</span>
                        <span>Gültig bis: {inv.expires}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleCopyInvite(inv.code)}
                        className="px-3 py-1.5 rounded-xl bg-discord-channels hover:bg-discord-hoverChannel text-xs text-white font-medium flex items-center gap-1.5 transition border border-discord-divider/40"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Kopieren</span>
                      </button>

                      <button
                        onClick={() => handleDeleteInvite(inv.id)}
                        className="p-2 rounded-xl text-discord-textMuted hover:text-discord-red hover:bg-discord-red/10 transition"
                        title="Einladung löschen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: ENTEGRASYONLAR (INTEGRATIONS)                       */}
          {/* ========================================================= */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h1 className="text-xl font-bold text-white mb-1">
                  Integrationen & Webhooks
                </h1>
                <p className="text-xs text-discord-textMuted">
                  Verwalte Sprachraum-Aktivitäten und Bot-Integrationen.
                </p>
              </div>

              <div className="p-4 bg-discord-darkest/60 border border-discord-divider/40 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-discord-blurple/20 text-discord-blurple flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Sprachraum-Bots</div>
                    <div className="text-xs text-discord-textMuted">
                      Steuere den Zugriff von Musik-, Aufnahme- und Aktivitäts-Bots auf diesen Raum.
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-discord-channels hover:bg-discord-hoverChannel text-white text-xs font-semibold border border-discord-divider/40 transition"
                >
                  Verwalten
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* SCHWEBENDE SPEICHERLEISTE */}
        {/* ========================================================= */}
        {hasChanges && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-discord-darkest border border-discord-divider/60 rounded-2xl shadow-2xl px-5 py-3 flex items-center justify-between gap-6 z-50 animate-in slide-in-from-bottom-4 w-full max-w-lg">
            <span className="text-xs font-semibold text-white">
              Achtung — Du hast ungespeicherte Änderungen!
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-white hover:underline px-2 py-1 font-medium"
              >
                Zurücksetzen
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-discord-green hover:bg-green-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition shadow-md"
              >
                Änderungen speichern
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* DELETE CHANNEL CONFIRMATION MODAL                         */}
      {/* ========================================================= */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-discord-darkest max-w-md w-full rounded-2xl p-6 border border-discord-divider/50 shadow-2xl">
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
              <AlertTriangle className="w-5 h-5 text-discord-red" />
              <span>Kanal löschen</span>
            </div>
            <p className="text-xs text-discord-textNormal leading-relaxed mb-6">
              Möchtest du den Sprachkanal <strong className="text-white">#{channel.name}</strong> wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-discord-divider/30">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-white hover:underline"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteChannel(channel.id);
                  setShowDeleteConfirm(false);
                  onClose();
                }}
                className="bg-discord-red hover:bg-red-600 text-white px-5 py-2 rounded-xl text-xs font-semibold transition shadow-md flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Kanal löschen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
