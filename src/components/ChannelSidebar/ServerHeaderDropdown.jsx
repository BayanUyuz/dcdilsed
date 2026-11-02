import React, { useState } from 'react';
import {
  ChevronDown,
  UserPlus,
  Settings,
  Calendar,
  Bot,
  Bell,
  Shield,
  Plus,
  FolderPlus,
  User,
  CheckSquare,
  Square,
  Copy,
  Check
} from 'lucide-react';

export default function ServerHeaderDropdown({
  server,
  onOpenInvite,
  onOpenServerSettings,
  onOpenCreateEvent,
  onOpenAppDirectory,
  onOpenNotifications,
  onOpenPrivacy,
  onOpenCreateChannel,
  onOpenCreateCategory,
  onOpenEditServerProfile,
  hideMutedChannels,
  setHideMutedChannels
}) {
  const [showServerDropdown, setShowServerDropdown] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  const handleCopyServerId = () => {
    navigator.clipboard.writeText(server.id);
    setShowServerDropdown(false);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 2500);
  };

  return (
    <div className="relative">
      {/* Toast Notification for ID copy */}
      {copyToast && (
        <div className="absolute top-14 left-2 right-2 bg-[#070709] text-amber-300 text-xs font-bold p-2.5 rounded-xl shadow-2xl border border-amber-400/40 flex items-center gap-2 z-50 animate-in fade-in">
          <Check className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>Server-ID kopiert: {server.id}</span>
        </div>
      )}

      {/* Server Header button */}
      <button
        onClick={() => setShowServerDropdown(!showServerDropdown)}
        className="w-full h-12 px-4 flex items-center justify-between font-bold text-amber-200 shadow-sm bg-[#060608] hover:bg-[#121217] transition border-b border-amber-500/15 group cursor-pointer"
      >
        <span className="truncate group-hover:text-amber-100 transition-colors font-extrabold">{server.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-amber-400/80 group-hover:text-amber-300 transition-transform duration-200 ${
            showServerDropdown ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
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
  );
}
