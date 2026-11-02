import React from 'react';
import {
  Sliders,
  Tag,
  Shield,
  Smile,
  Sparkles,
  FileText,
  Bot,
  CheckCircle,
  Ban,
  Copy,
  Webhook,
  Users,
  Link,
  Trash2
} from 'lucide-react';

export default function ServerSettingsSidebar({
  server,
  activeTab,
  setActiveTab,
  membersCount = 1,
  invitesCount = 0,
  onClose
}) {
  return (
    <div className="w-64 bg-[#060608] flex flex-col items-end py-10 pr-6 flex-shrink-0 border-r border-amber-500/15 overflow-y-auto custom-scrollbar select-none">
      <div className="w-52 space-y-1 text-xs font-medium">
        {/* Bereich: SERVER-EINSTELLUNGEN */}
        <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 mb-1 truncate">
          {server?.name?.toUpperCase() || 'SERVER'}
        </div>
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'overview' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span>Übersicht & Design</span>
        </button>
        <button
          onClick={() => setActiveTab('tag')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'tag' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Server-Tag & URL</span>
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'roles' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>Rollen & Berechtigungen</span>
        </button>
        <button
          onClick={() => setActiveTab('emojis')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'emojis' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Smile className="w-3.5 h-3.5 text-amber-400" />
          <span>Emojis</span>
        </button>
        <button
          onClick={() => setActiveTab('stickers')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'stickers' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Sticker</span>
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'audit' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Audit-Log</span>
        </button>

        {/* Section: MODERATION */}
        <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 pt-3 mb-1">
          SICHERHEIT & MODERATION
        </div>
        <button
          onClick={() => setActiveTab('automod')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'automod' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-amber-400" />
          <span>AutoMod (Automatisch)</span>
        </button>
        <button
          onClick={() => setActiveTab('onboarding')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'onboarding' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Onboarding & Willkommen</span>
        </button>
        <button
          onClick={() => setActiveTab('bans')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'bans' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Ban className="w-3.5 h-3.5 text-discord-red" />
          <span>Banns</span>
        </button>

        {/* Section: COMMUNITY & INTEGRATION */}
        <div className="text-[10px] font-bold text-amber-300/70 tracking-wider uppercase px-2 pt-3 mb-1">
          COMMUNITY & INTEGRATION
        </div>
        <button
          onClick={() => setActiveTab('template')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'template' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Copy className="w-3.5 h-3.5 text-amber-400" />
          <span>Servervorlage</span>
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
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
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'members' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>Mitglieder ({membersCount})</span>
        </button>
        <button
          onClick={() => setActiveTab('invites')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'invites' ? 'bg-amber-400/15 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Link className="w-3.5 h-3.5 text-amber-400" />
          <span>Einladungen ({invitesCount})</span>
        </button>

        <div className="h-[1px] bg-amber-500/20 my-2" />

        {/* Bereich: GEFAHRENZONE */}
        <button
          onClick={() => setActiveTab('delete')}
          className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 text-discord-red hover:bg-discord-red/20 cursor-pointer ${
            activeTab === 'delete' ? 'bg-discord-red/30 font-semibold' : ''
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Server löschen</span>
        </button>

        <button
          onClick={onClose}
          className="w-full text-left px-2.5 py-1.5 rounded-lg text-amber-200/60 hover:bg-white/5 hover:text-white transition cursor-pointer"
        >
          Schließen
        </button>
      </div>
    </div>
  );
}
