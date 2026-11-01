import React, { useState } from 'react';
import {
  X,
  Shield,
  Hash,
  Smile,
  FileText,
  Trash2,
  Plus,
  Upload,
  Check,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Link,
  Users,
  Search,
  UserCheck,
  Ban,
  Radio,
  Sliders,
  Webhook,
  Tag,
  Copy,
  Clock,
  ExternalLink,
  Bot,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  ShieldAlert,
  Flame,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ServerSettingsModal({
  isOpen,
  onClose,
  server,
  onUpdateServer,
  onDeleteServer,
}) {
  // Navigation tabs matching Discord's complete layout
  const [activeTab, setActiveTab] = useState('overview');

  // Overview & Theme state
  const [serverName, setServerName] = useState(server?.name || '');
  const [serverIcon, setServerIcon] = useState(server?.icon || '');
  const [serverBanner, setServerBanner] = useState(server?.banner || '');
  const [serverThemeColor, setServerThemeColor] = useState(server?.themeColor || '#5865F2');
  const [systemChannel, setSystemChannel] = useState('allgemein');
  const [afkTimeout, setAfkTimeout] = useState('300'); // 5 minutes

  // Server Tag & Vanity URL state
  const [serverTag, setServerTag] = useState(server?.tag || 'TR-TOPLULUK');
  const [vanityUrl, setVanityUrl] = useState(server?.vanityUrl || 'topluluk-tr');
  const [copiedVanity, setCopiedVanity] = useState(false);

  // Roles state
  const [roles, setRoles] = useState([
    { id: 'r_admin', name: 'Administrator', color: '#5865F2', isAdmin: true, canManageChannels: true, canKick: true, membersCount: 1 },
    { id: 'r_mod', name: 'Moderator', color: '#23a55a', isAdmin: false, canManageChannels: true, canKick: true, membersCount: 0 },
    { id: 'r_everyone', name: '@everyone', color: '#949ba4', isAdmin: false, canManageChannels: false, canKick: false, membersCount: 1 },
  ]);
  const [activeRoleId, setActiveRoleId] = useState('r_admin');

  // Emojis state
  const [emojis, setEmojis] = useState([]);
  const [newEmojiName, setNewEmojiName] = useState('');
  const [newEmojiChar, setNewEmojiChar] = useState('');

  // Stickers state
  const [stickers, setStickers] = useState([]);
  const [newStickerName, setNewStickerName] = useState('');
  const [newStickerDesc, setNewStickerDesc] = useState('');
  const [newStickerEmoji, setNewStickerEmoji] = useState('🌟');

  // Members state
  const [memberSearch, setMemberSearch] = useState('');
  const [membersList, setMembersList] = useState([
    { id: 'current_user_me', name: 'Benutzer (Du)', username: 'DilsedUser', role: 'Eigentümer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', joined: 'Heute' },
  ]);

  // Invites state
  const [invitesList, setInvitesList] = useState([]);

  // Bans state
  const [bansList, setBansList] = useState([]);

  // AutoMod state
  const [autoModRules, setAutoModRules] = useState({
    blockProfanity: true,
    blockSpam: true,
    blockPhishingLinks: true,
    blockMentionSpam: true,
  });

  // Onboarding & Welcome Screen state
  const [welcomeEnabled, setWelcomeEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState('Willkommen in unserer Community! Schau dir unsere empfohlenen Kanäle an, um loszulegen.');

  // Server Template state
  const [templateName, setTemplateName] = useState('Community-Server-Vorlage');
  const [templateDesc, setTemplateDesc] = useState('Fertiges Template mit Text-, Sprachkanälen, Rollen und AutoMod-Regeln.');
  const [templateUrl, setTemplateUrl] = useState('https://dilsed.new/aB8xQz');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  // Integrations & Webhooks
  const [webhooksList, setWebhooksList] = useState([]);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([
    { user: 'Du', action: 'Server erstellt und eingerichtet', time: 'Heute' }
  ]);

  // Delete server confirmation input
  const [deleteInput, setDeleteInput] = useState('');

  if (!isOpen || !server) return null;

  const currentRole = roles.find((r) => r.id === activeRoleId) || roles[0];

  const handleSaveOverview = () => {
    onUpdateServer({
      ...server,
      name: serverName,
      icon: serverIcon,
      banner: serverBanner,
      themeColor: serverThemeColor,
      tag: serverTag,
      vanityUrl: vanityUrl,
    });
    alert('Servereinstellungen und Design erfolgreich gespeichert!');
  };

  const handleAddNewRole = () => {
    const newRole = {
      id: 'r_' + Date.now(),
      name: 'Neue Rolle',
      color: '#3498db',
      isAdmin: false,
      canManageChannels: false,
      canKick: false,
      membersCount: 0,
    };
    setRoles((prev) => [...prev, newRole]);
    setActiveRoleId(newRole.id);
  };

  const updateRoleProperty = (property, value) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === activeRoleId ? { ...r, [property]: value } : r))
    );
  };

  const handleAddEmoji = (e) => {
    e.preventDefault();
    if (!newEmojiName.trim() || !newEmojiChar.trim()) return;
    setEmojis((prev) => [
      ...prev,
      { id: 'e_' + Date.now(), name: `:${newEmojiName.trim()}:`, emoji: newEmojiChar.trim(), author: 'Du' },
    ]);
    setNewEmojiName('');
    setNewEmojiChar('');
  };

  const handleAddSticker = (e) => {
    e.preventDefault();
    if (!newStickerName.trim()) return;
    setStickers((prev) => [
      ...prev,
      { id: 'st_' + Date.now(), name: newStickerName.trim(), description: newStickerDesc.trim(), image: newStickerEmoji },
    ]);
    setNewStickerName('');
    setNewStickerDesc('');
  };

  const handleRevokeInvite = (code) => {
    setInvitesList((prev) => prev.filter((inv) => inv.code !== code));
  };

  const handleUnban = (id) => {
    setBansList((prev) => prev.filter((b) => b.id !== id));
    alert('Bann für den Benutzer erfolgreich aufgehoben.');
  };

  const handleKickMember = (id, name) => {
    if (confirm(`Soll ${name} wirklich vom Server gekickt werden?`)) {
      setMembersList((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleBanMember = (id, name) => {
    const reason = prompt(`Grund für die Verbannung von ${name}:`, 'Regelverstoß');
    if (reason) {
      setMembersList((prev) => prev.filter((m) => m.id !== id));
      setBansList((prev) => [
        ...prev,
        { id: 'b_' + Date.now(), name: `${name}#0000`, reason, date: 'Heute' }
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#0a0a0d] text-white animate-in fade-in select-none">
      {/* ----------------- LEFT NAVIGATION SIDEBAR ----------------- */}
      <div className="w-64 bg-[#060608] flex flex-col items-end py-10 pr-6 flex-shrink-0 border-r border-amber-500/15 overflow-y-auto custom-scrollbar">
        <div className="w-52 space-y-1 text-xs font-medium">
          {/* Bereich: SERVER-EINSTELLUNGEN */}
          <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 mb-1">
            {server.name.toUpperCase()}
          </div>
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'overview' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Übersicht & Design</span>
          </button>
          <button
            onClick={() => setActiveTab('tag')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'tag' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-amber-400" />
            <span>Server-Tag & URL</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'roles' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Rollen & Berechtigungen</span>
          </button>
          <button
            onClick={() => setActiveTab('emojis')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'emojis' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Smile className="w-3.5 h-3.5 text-amber-400" />
            <span>Emojis</span>
          </button>
          <button
            onClick={() => setActiveTab('stickers')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'stickers' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Sticker</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'audit' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Audit-Log</span>
          </button>

          {/* Section: MODERASYON */}
          <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 pt-3 mb-1">
            SICHERHEIT & MODERATION
          </div>
          <button
            onClick={() => setActiveTab('automod')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'automod' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span>AutoMod (Automatisch)</span>
          </button>
          <button
            onClick={() => setActiveTab('onboarding')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'onboarding' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Onboarding & Willkommen</span>
          </button>
          <button
            onClick={() => setActiveTab('bans')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'bans' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-discord-red" />
            <span>Banns</span>
          </button>

          {/* Section: TOPLULUK & ENTEGRASYON */}
          <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 pt-3 mb-1">
            COMMUNITY & INTEGRATION
          </div>
          <button
            onClick={() => setActiveTab('template')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'template' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Copy className="w-3.5 h-3.5 text-amber-400" />
            <span>Servervorlage</span>
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'integrations' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Webhook className="w-3.5 h-3.5 text-amber-400" />
            <span>Integration & Webhooks</span>
          </button>

          {/* Section: MITGLIEDERVERWALTUNG */}
          <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 pt-3 mb-1">
            MITGLIEDERVERWALTUNG
          </div>
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'members' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Mitglieder ({membersList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('invites')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'invites' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Link className="w-3.5 h-3.5 text-amber-400" />
            <span>Einladungen ({invitesList.length})</span>
          </button>

          <div className="h-[1px] bg-amber-500/20 my-2" />

          {/* Bereich: GEFAHRENZONE */}
          <button
            onClick={() => setActiveTab('delete')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 text-discord-red hover:bg-discord-red/20 ${
              activeTab === 'delete' ? 'bg-discord-red/30 font-semibold' : ''
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Server löschen</span>
          </button>

          <button
            onClick={onClose}
            className="w-full text-left px-2.5 py-1.5 rounded-lg text-amber-200/60 hover:bg-white/5 hover:text-white transition"
          >
            Schließen
          </button>
        </div>
      </div>

      {/* ----------------- RIGHT MAIN CONTENT AREA ----------------- */}
      <div className="flex-1 flex overflow-y-auto px-10 py-10 relative max-w-4xl">
        <div className="w-full max-w-2xl">
          {/* TAB 1: ÜBERSICHT & DESIGN */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Server-Übersicht & Design</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Passe den Namen, das Symbol, das Farbschema und die Systemkanäle deines Servers an.
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="relative group cursor-pointer">
                  <img
                    src={serverIcon || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150'}
                    alt="Server icon"
                    className="w-24 h-24 rounded-full object-cover border-2 border-discord-blurple shadow-xl"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Neue Server-Icon-URL eingeben:', serverIcon);
                      if (url) setServerIcon(url);
                    }}
                    className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-white font-bold transition"
                  >
                    <Upload className="w-5 h-5 mb-1" />
                    ÄNDERN
                  </button>
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    SERVERNAME
                  </label>
                  <input
                    type="text"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
                  />
                </div>
              </div>

              {/* Server Theme Accent Color */}
              <div className="mb-6 bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30">
                <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
                  SERVER-AKZENTFARBE
                </label>
                <div className="flex items-center gap-2.5">
                  {['#5865F2', '#23a55a', '#f0b232', '#eb459e', '#ed4245', '#9b59b6', '#3498db', '#1abc9c'].map((col) => (
                    <button
                      key={col}
                      onClick={() => setServerThemeColor(col)}
                      className={`w-7 h-7 rounded-full border-2 transition ${
                        serverThemeColor === col ? 'border-white scale-110 shadow' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>

              {/* Server Banner & Splash */}
              <div className="mb-6">
                <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
                  SERVER-BANNER & WILLKOMMENS-DESIGN
                </label>
                <div className="h-32 rounded-xl overflow-hidden border border-discord-divider/30 relative group shadow-lg">
                  <img
                    src={serverBanner || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600'}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      const url = prompt('Neue Server-Banner-URL eingeben:', serverBanner);
                      if (url) setServerBanner(url);
                    }}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-semibold transition"
                  >
                    Banner-Bild ändern
                  </button>
                </div>
              </div>

              {/* Channels setup */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    KANAL FÜR SYSTEMNACHRICHTEN
                  </label>
                  <select
                    value={systemChannel}
                    onChange={(e) => setSystemChannel(e.target.value)}
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none"
                  >
                    <option value="allgemein">#allgemein</option>
                    <option value="ankündigungen">#ankündigungen</option>
                    <option value="willkommen">#willkommen</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    AFK-TIMEOUT
                  </label>
                  <select
                    value={afkTimeout}
                    onChange={(e) => setAfkTimeout(e.target.value)}
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none"
                  >
                    <option value="60">1 Minute</option>
                    <option value="300">5 Minuten (Standard)</option>
                    <option value="900">15 Minuten</option>
                    <option value="1800">30 Minuten</option>
                    <option value="3600">1 Stunde</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSaveOverview}
                className="bg-discord-green hover:bg-discord-green/90 text-white font-semibold px-6 py-2 rounded text-xs transition shadow"
              >
                Änderungen speichern
              </button>
            </div>
          )}

          {/* TAB 2: SERVER-TAG & VANITY-URL */}
          {activeTab === 'tag' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Server-Tag & Benutzerdefinierte URL (Vanity URL)</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Erstelle einen einprägsamen Einladungslink und ein Community-Tag für deinen Server.
              </p>

              <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-5">
                {/* Vanity URL */}
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    BENUTZERDEFINIERTER EINLADUNGSLINK (VANITY URL)
                  </label>
                  <div className="flex items-center bg-discord-darkest rounded px-3 py-2 border border-discord-divider/30 focus-within:border-discord-blurple">
                    <span className="text-xs text-discord-textMuted font-mono">https://discord.gg/</span>
                    <input
                      type="text"
                      value={vanityUrl}
                      onChange={(e) => setVanityUrl(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                      className="bg-transparent flex-1 text-xs text-white font-mono focus:outline-none pl-1"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://discord.gg/${vanityUrl}`);
                        setCopiedVanity(true);
                        setTimeout(() => setCopiedVanity(false), 2000);
                      }}
                      className="text-xs text-discord-blurple hover:underline font-semibold ml-2"
                    >
                      {copiedVanity ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                  <p className="text-[10px] text-discord-textMuted mt-1">
                    Dieser permanente Link ist für deinen Server dauerhaft aktiv.
                  </p>
                </div>

                {/* Server Tag */}
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    SERVER-TAG (ABZEICHEN)
                  </label>
                  <input
                    type="text"
                    maxLength={15}
                    value={serverTag}
                    onChange={(e) => setServerTag(e.target.value.toUpperCase())}
                    placeholder="Z. B. DEV-HUB"
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white uppercase font-mono tracking-wider border border-discord-divider/30 focus:outline-none"
                  />
                  <p className="text-[10px] text-discord-textMuted mt-1">
                    Dieses Tag wird in den Profilen deiner Mitglieder und Serverlisten angezeigt.
                  </p>
                </div>

                <button
                  onClick={handleSaveOverview}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition"
                >
                  Tag & URL speichern
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ROLLEN & BERECHTIGUNGEN */}
          {activeTab === 'roles' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Rollen & Berechtigungen</h2>
                  <p className="text-xs text-discord-textMuted">
                    Weise Mitgliedern Rollen zu und passe deren Berechtigungen und Farben an.
                  </p>
                </div>
                <button
                  onClick={handleAddNewRole}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Rolle erstellen</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 bg-discord-darkest p-4 rounded-xl border border-discord-divider/30">
                {/* Roles sidebar */}
                <div className="space-y-1 border-r border-discord-divider/30 pr-3">
                  <div className="text-[10px] font-bold text-discord-textMuted uppercase mb-2">
                    ROLLEN — {roles.length}
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveRoleId(r.id)}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-xs transition ${
                        activeRoleId === r.id
                          ? 'bg-discord-activeChannel text-white font-semibold'
                          : 'text-discord-textMuted hover:bg-discord-hoverChannel hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="truncate">{r.name}</span>
                      </div>
                      <span className="text-[10px] text-discord-textMuted">{r.membersCount}</span>
                    </button>
                  ))}
                </div>

                {/* Role details */}
                <div className="col-span-2 space-y-4 pl-2">
                  <div>
                    <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                      ROLLENNAME
                    </label>
                    <input
                      type="text"
                      value={currentRole.name}
                      onChange={(e) => updateRoleProperty('name', e.target.value)}
                      className="w-full bg-discord-chat rounded px-3 py-1.5 text-xs text-white border border-discord-divider/40 focus:border-discord-blurple focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1.5">
                      ROLLENFARBE
                    </label>
                    <div className="flex items-center gap-2">
                      {['#5865F2', '#23a55a', '#f0b232', '#eb459e', '#ed4245', '#9b59b6', '#3498db'].map((c) => (
                        <button
                          key={c}
                          onClick={() => updateRoleProperty('color', c)}
                          className={`w-7 h-7 rounded-full border-2 transition ${
                            currentRole.color === c ? 'border-white scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-discord-divider/30 space-y-3">
                    <div className="text-[10px] font-bold text-discord-textMuted uppercase">
                      GRUNDLEGENDE BERECHTIGUNGEN
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Administrator</div>
                        <div className="text-[10px] text-discord-textMuted">Verwaltet alle Kanäle und Servereinstellungen uneingeschränkt</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentRole.isAdmin}
                        onChange={(e) => updateRoleProperty('isAdmin', e.target.checked)}
                        className="w-4 h-4 accent-discord-blurple cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Kanäle verwalten</div>
                        <div className="text-[10px] text-discord-textMuted">Kann neue Kanäle erstellen, bearbeiten oder löschen</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentRole.canManageChannels}
                        onChange={(e) => updateRoleProperty('canManageChannels', e.target.checked)}
                        className="w-4 h-4 accent-discord-blurple cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-white">Mitglieder kicken</div>
                        <div className="text-[10px] text-discord-textMuted">Kann Mitglieder, die gegen Regeln verstoßen, vom Server entfernen</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentRole.canKick}
                        onChange={(e) => updateRoleProperty('canKick', e.target.checked)}
                        className="w-4 h-4 accent-discord-blurple cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EMOJIS */}
          {activeTab === 'emojis' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Eigene Server-Emojis</h2>
                <span className="text-xs text-discord-textMuted font-mono">{emojis.length} / 50 Slots</span>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Füge benutzerdefinierte Emojis hinzu, die Mitglieder im Text- und Sprachchat nutzen können.
              </p>

              <form onSubmit={handleAddEmoji} className="bg-discord-darkest p-4 rounded-xl border border-discord-divider/30 mb-6 flex gap-3">
                <input
                  type="text"
                  placeholder="Emoji (z. B. 🚀)"
                  value={newEmojiChar}
                  onChange={(e) => setNewEmojiChar(e.target.value)}
                  className="w-20 bg-discord-chat rounded px-3 py-2 text-sm text-center text-white border border-discord-divider/40 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Emoji-Name (z. B. rakete)"
                  value={newEmojiName}
                  onChange={(e) => setNewEmojiName(e.target.value)}
                  className="flex-1 bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newEmojiName || !newEmojiChar}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                >
                  Emoji hochladen
                </button>
              </form>

              {emojis.length === 0 ? (
                <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest rounded-xl border border-dashed border-discord-divider/30">
                  Noch keine benutzerdefinierten Emojis auf diesem Server vorhanden.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {emojis.map((em) => (
                    <div
                      key={em.id}
                      className="bg-discord-channels p-3 rounded-lg border border-discord-divider/30 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-2xl">{em.emoji}</span>
                        <span className="text-xs font-semibold text-white truncate">{em.name}</span>
                      </div>
                      <button
                        onClick={() => setEmojis((p) => p.filter((x) => x.id !== em.id))}
                        className="opacity-0 group-hover:opacity-100 text-discord-red hover:scale-110 transition p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: STICKER */}
          {activeTab === 'stickers' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Benutzerdefinierte Sticker</h2>
                <span className="text-xs text-discord-textMuted font-mono">{stickers.length} / 15 Slots</span>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Sticker im Großformat für Mitglieder in Server-Unterhaltungen.
              </p>

              <form onSubmit={handleAddSticker} className="bg-discord-darkest p-4 rounded-xl border border-discord-divider/30 mb-6 space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Icon (z. B. 🥳)"
                    value={newStickerEmoji}
                    onChange={(e) => setNewStickerEmoji(e.target.value)}
                    className="bg-discord-chat rounded px-3 py-2 text-center text-lg text-white border border-discord-divider/40 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Sticker-Name"
                    value={newStickerName}
                    onChange={(e) => setNewStickerName(e.target.value)}
                    className="col-span-2 bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Beschreibung (z. B. Party & Feier)"
                  value={newStickerDesc}
                  onChange={(e) => setNewStickerDesc(e.target.value)}
                  className="w-full bg-discord-chat rounded px-3 py-2 text-xs text-white border border-discord-divider/40 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!newStickerName.trim()}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
                >
                  Sticker hochladen
                </button>
              </form>

              {stickers.length === 0 ? (
                <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-darkest rounded-xl border border-dashed border-discord-divider/30">
                  Noch keine benutzerdefinierten Sticker auf diesem Server vorhanden.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stickers.map((st) => (
                    <div
                      key={st.id}
                      className="bg-discord-channels p-4 rounded-xl border border-discord-divider/30 flex flex-col items-center text-center relative group"
                    >
                      <button
                        onClick={() => setStickers((p) => p.filter((x) => x.id !== st.id))}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-discord-red p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-4xl mb-2">{st.image}</span>
                      <div className="font-bold text-white text-xs">{st.name}</div>
                      <div className="text-[10px] text-discord-textMuted">{st.description}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: AUDIT-LOG */}
          {activeTab === 'audit' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Audit-Log (Aktivitätsprotokoll)</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Protokoll der letzten administrativen Aktionen auf diesem Server.
              </p>

              <div className="space-y-2">
                {auditLogs.map((log, i) => (
                  <div
                    key={i}
                    className="bg-discord-darkest p-3 rounded-lg border border-discord-divider/30 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white">{log.user}</span>{' '}
                      <span className="text-discord-textMuted">{log.action}</span>
                    </div>
                    <span className="text-discord-textMuted text-[10px]">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: AUTOMOD */}
          {activeTab === 'automod' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-6 h-6 text-discord-blurple" />
                <h2 className="text-xl font-bold text-white">AutoMod (Automatische Moderation)</h2>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Blockiere schädliche Inhalte, Spam und Phishing-Links automatisch vor dem Senden.
              </p>

              <div className="space-y-4">
                {[
                  { key: 'blockProfanity', title: 'Beleidigende & unangemessene Sprache blockieren', desc: 'KI-Filter erkennt Beleidigungen und Hassrede automatisch.' },
                  { key: 'blockSpam', title: 'Spam & wiederholte Nachrichten blockieren', desc: 'Verwarnt Konten bei Text-Spam sofort und löscht Nachrichten.' },
                  { key: 'blockPhishingLinks', title: 'Verdächtige & Phishing-Links blockieren', desc: 'Erkennt unbekannte oder betrügerische Links und blockiert diese.' },
                  { key: 'blockMentionSpam', title: 'Massen-Erwähnungen (@mentions) verhindern', desc: 'Blockiert Nachrichten mit mehr als 5 Benutzer-Erwähnungen auf einmal.' },
                ].map((rule) => (
                  <div
                    key={rule.key}
                    className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
                  >
                    <div className="max-w-md">
                      <div className="text-xs font-bold text-white mb-0.5">{rule.title}</div>
                      <div className="text-[10px] text-discord-textMuted">{rule.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoModRules[rule.key]}
                      onChange={(e) =>
                        setAutoModRules((p) => ({ ...p, [rule.key]: e.target.checked }))
                      }
                      className="w-4 h-4 accent-discord-blurple cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: ONBOARDING & WILLKOMMENS-BILDSCHIRM */}
          {activeTab === 'onboarding' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Onboarding & Willkommens-Bildschirm</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Begrüße neue Mitglieder mit einem übersichtlichen Einstieg und empfohlenen Kanälen.
              </p>

              <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-discord-divider/30">
                  <div>
                    <div className="text-xs font-bold text-white">Willkommens-Bildschirm aktivieren</div>
                    <div className="text-[10px] text-discord-textMuted">Erleichtert neuen Mitgliedern die Orientierung</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={welcomeEnabled}
                    onChange={(e) => setWelcomeEnabled(e.target.checked)}
                    className="w-4 h-4 accent-discord-green cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    WILLKOMMENSNACHRICHT DES SERVERS
                  </label>
                  <textarea
                    rows={3}
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    className="w-full bg-discord-darkest rounded p-3 text-xs text-white border border-discord-divider/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-2">
                    EMPFOHLENE KANÄLE FÜR NEUE MITGLIEDER
                  </label>
                  <div className="space-y-2">
                    {['#regeln-und-info', '#ankündigungen', '#allgemein'].map((ch, i) => (
                      <div key={i} className="flex items-center gap-2 bg-discord-darkest p-2 rounded text-xs text-white">
                        <Check className="w-3.5 h-3.5 text-discord-green" />
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => alert('Onboarding- und Willkommenseinstellungen gespeichert!')}
                  className="bg-discord-green hover:bg-discord-green/90 text-white px-5 py-2 rounded text-xs font-semibold transition"
                >
                  Einstellungen speichern
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: BANNS */}
          {activeTab === 'bans' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Server-Banns</h2>
                <span className="text-xs text-discord-textMuted font-mono">{bansList.length} Gebannt</span>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Übersicht aller vom Server ausgeschlossenen Benutzer und Bann-Verwaltung.
              </p>

              {bansList.length === 0 ? (
                <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
                  Keine gesperrten Benutzer auf diesem Server.
                </div>
              ) : (
                <div className="space-y-3">
                  {bansList.map((ban) => (
                    <div
                      key={ban.id}
                      className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Ban className="w-4 h-4 text-discord-red" />
                          <span>{ban.name}</span>
                        </div>
                        <div className="text-[11px] text-discord-textMuted mt-0.5">
                          Grund: {ban.reason} ({ban.date})
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnban(ban.id)}
                        className="bg-discord-darkest hover:bg-discord-hoverChannel border border-discord-divider/40 text-xs text-white px-3 py-1.5 rounded transition"
                      >
                        Bann aufheben
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 10: SERVERVORLAGE */}
          {activeTab === 'template' && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Servervorlage</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Erstelle eine Vorlage deiner Kanal- und Rollenstruktur, um sie zu teilen.
              </p>

              <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    VORLAGEN-NAME
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    VORLAGEN-BESCHREIBUNG
                  </label>
                  <textarea
                    rows={2}
                    value={templateDesc}
                    onChange={(e) => setTemplateDesc(e.target.value)}
                    className="w-full bg-discord-darkest rounded p-3 text-xs text-white border border-discord-divider/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                    VORLAGEN-LINK
                  </label>
                  <div className="flex items-center bg-discord-darkest rounded p-1.5 border border-discord-divider/30">
                    <input
                      type="text"
                      readOnly
                      value={templateUrl}
                      className="bg-transparent flex-1 text-xs text-white font-mono px-2 focus:outline-none select-all"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(templateUrl);
                        setCopiedTemplate(true);
                        setTimeout(() => setCopiedTemplate(false), 2000);
                      }}
                      className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-4 py-1.5 rounded text-xs font-semibold transition"
                    >
                      {copiedTemplate ? 'Kopiert!' : 'Kopieren'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: ENTEGRASYONLAR & WEBHOOK */}
          {activeTab === 'integrations' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Integrationen & Webhooks</h2>
                <button
                  onClick={() => {
                    const name = prompt('Webhook-Name:');
                    if (name) {
                      setWebhooksList((p) => [
                        ...p,
                        { id: 'wh_' + Date.now(), name, channel: '#allgemein', url: `https://discord.com/api/webhooks/${Date.now()}` }
                      ]);
                    }
                  }}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Webhook erstellen</span>
                </button>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Verwende Webhooks, um automatische Benachrichtigungen von GitHub, Supabase oder Bots zu empfangen.
              </p>

              {webhooksList.length === 0 ? (
                <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
                  Keine aktiven Webhook-Integrationen vorhanden.
                </div>
              ) : (
                <div className="space-y-3">
                  {webhooksList.map((wh) => (
                    <div
                      key={wh.id}
                      className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <Webhook className="w-4 h-4 text-discord-green" />
                          <span>{wh.name}</span>
                          <span className="text-[10px] bg-discord-darkest px-2 py-0.5 rounded text-discord-textMuted">
                            {wh.channel}
                          </span>
                        </div>
                        <div className="text-[10px] text-discord-textMuted font-mono mt-1 truncate max-w-sm">
                          {wh.url}
                        </div>
                      </div>
                      <button
                        onClick={() => setWebhooksList((p) => p.filter((x) => x.id !== wh.id))}
                        className="text-discord-red hover:bg-discord-red/20 p-1.5 rounded transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 12: MITGLIEDERVERWALTUNG */}
          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Servermitglieder</h2>
                <span className="text-xs text-discord-textMuted font-mono">{membersList.length} Mitglieder</span>
              </div>
              <p className="text-xs text-discord-textMuted mb-4">
                Verwalte Mitglieder, weise Rollen zu oder entferne Störenfriede.
              </p>

              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Mitglied suchen..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white placeholder-discord-textMuted border border-discord-divider/30 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-discord-textMuted absolute right-3 top-2.5" />
              </div>

              <div className="space-y-2">
                {membersList
                  .filter((m) => m.name.toLowerCase().includes(memberSearch.toLowerCase()))
                  .map((m) => (
                    <div
                      key={m.id}
                      className="bg-discord-channels/60 p-3 rounded-xl border border-discord-divider/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-xs text-white flex items-center gap-2">
                            <span>{m.name}</span>
                            <span className="text-[10px] bg-discord-darkest px-2 py-0.5 rounded text-discord-blurple font-bold">
                              {m.role}
                            </span>
                          </div>
                          <div className="text-[10px] text-discord-textMuted">
                            @{m.username} • Beigetreten: {m.joined}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleKickMember(m.id, m.name)}
                          className="bg-discord-darkest hover:bg-discord-hoverChannel text-xs text-white px-2.5 py-1 rounded transition"
                          title="Vom Server kicken"
                        >
                          Kicken
                        </button>
                        <button
                          onClick={() => handleBanMember(m.id, m.name)}
                          className="bg-discord-red/20 hover:bg-discord-red text-discord-red hover:text-white text-xs px-2.5 py-1 rounded transition font-semibold"
                          title="Vom Server bannen"
                        >
                          Bannen
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 14: DAVETLER */}
          {activeTab === 'invites' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Aktive Einladungen</h2>
                <span className="text-xs text-discord-textMuted font-mono">{invitesList.length} Einladungen</span>
              </div>
              <p className="text-xs text-discord-textMuted mb-6">
                Alle aktiven Einladungslinks und Nutzungsstatistiken für deinen Server.
              </p>

              {invitesList.length === 0 ? (
                <div className="py-8 text-center text-xs text-discord-textMuted bg-discord-channels/40 rounded-xl border border-dashed border-discord-divider/30">
                  Keine aktiven Einladungen vorhanden.
                </div>
              ) : (
                <div className="space-y-3">
                  {invitesList.map((inv) => (
                    <div
                      key={inv.code}
                      className="bg-discord-channels/60 p-4 rounded-xl border border-discord-divider/30 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono text-xs font-bold text-discord-blurple flex items-center gap-1.5">
                          <Link className="w-3.5 h-3.5" />
                          <span>https://discord.gg/{inv.code}</span>
                        </div>
                        <div className="text-[10px] text-discord-textMuted mt-1">
                          Erstellt von: <strong className="text-white">{inv.creator}</strong> • {inv.uses} Nutzungen • {inv.expires}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRevokeInvite(inv.code)}
                        className="text-discord-red hover:bg-discord-red/20 px-3 py-1.5 rounded text-xs font-semibold transition"
                      >
                        Widerrufen
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 15: SERVER LÖSCHEN */}
          {activeTab === 'delete' && (
            <div>
              <h2 className="text-xl font-bold text-discord-red mb-2">Server löschen</h2>
              <p className="text-xs text-discord-textMuted mb-6">
                Diese Aktion kann nicht rückgängig gemacht werden. Der Server mit allen Kanälen, Rollen, Emojis und Nachrichten wird dauerhaft gelöscht.
              </p>

              <div className="bg-discord-red/10 border border-discord-red/40 p-4 rounded-xl mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-discord-red flex-shrink-0 mt-0.5" />
                <div className="text-xs text-discord-textNormal leading-relaxed">
                  Gib zur Bestätigung den vollständigen Servernamen (<strong>{server.name}</strong>) unten ein:
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                  SERVERNAMENI YAZIN
                </label>
                <input
                  type="text"
                  value={deleteInput}
                  onChange={(e) => setDeleteInput(e.target.value)}
                  placeholder={server.name}
                  className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:border-discord-red focus:outline-none"
                />
              </div>

              <button
                disabled={deleteInput.trim() !== server.name}
                onClick={() => {
                  onDeleteServer(server.id);
                  onClose();
                }}
                className="bg-discord-red hover:bg-discord-red/90 text-white font-semibold px-6 py-2.5 rounded text-xs transition shadow-lg disabled:opacity-40"
              >
                Ja, Server endgültig löschen
              </button>
            </div>
          )}
        </div>

        {/* Close Button top right */}
        <div className="absolute top-10 right-6 flex flex-col items-center">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border-2 border-amber-500/40 text-amber-300 hover:border-amber-400 hover:text-white hover:scale-105 flex items-center justify-center transition shadow-md shadow-amber-500/10"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] text-amber-200/60 font-bold mt-1">ESC</span>
        </div>
      </div>
    </div>
  );
}
