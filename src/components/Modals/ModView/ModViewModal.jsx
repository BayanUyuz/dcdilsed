import React, { useState } from 'react';
import { Shield, FileText, History, MessageSquare } from 'lucide-react';
import ModViewHeader from './ModViewHeader';
import ModRolesTab from './ModRolesTab';
import ModNotesTab from './ModNotesTab';
import ModAuditTab from './ModAuditTab';
import ModMessagesTab from './ModMessagesTab';

export default function ModViewModal({
  isOpen,
  onClose,
  member,
  server,
  notes = [],
  onAddNote,
  onDeleteNote,
  onToggleRole,
  onVerifyMember,
  isVerified,
  onTimeoutUser,
  timeoutExpiry,
  onKickUser,
  onBanUser,
  userMessages = [],
  onToggleServerMute,
  isServerMuted,
  onToggleServerDeafen,
  isServerDeafened,
}) {
  const [activeTab, setActiveTab] = useState('roles');
  const [newNoteText, setNewNoteText] = useState('');
  const [showTimeoutDropdown, setShowTimeoutDropdown] = useState(false);

  if (!isOpen || !member) return null;

  const handleCreateNote = (e) => {
    e?.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(member.id, newNoteText.trim());
    setNewNoteText('');
  };

  const tabs = [
    { id: 'roles', label: 'Rollen', icon: Shield },
    { id: 'notes', label: `Notizen (${notes.length})`, icon: FileText },
    { id: 'audit', label: 'Audit-Protokoll', icon: History },
    { id: 'messages', label: 'Nachrichten', icon: MessageSquare },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 flex flex-col max-h-[88vh]">
        <ModViewHeader
          member={member}
          onClose={onClose}
          isVerified={isVerified}
          onVerifyMember={onVerifyMember}
          isServerMuted={isServerMuted}
          onToggleServerMute={onToggleServerMute}
          isServerDeafened={isServerDeafened}
          onToggleServerDeafen={onToggleServerDeafen}
          timeoutExpiry={timeoutExpiry}
          onTimeoutUser={onTimeoutUser}
          showTimeoutDropdown={showTimeoutDropdown}
          setShowTimeoutDropdown={setShowTimeoutDropdown}
          onKickUser={onKickUser}
          onBanUser={onBanUser}
        />

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 border-b border-discord-divider/30 bg-discord-darkest flex-shrink-0">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 py-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  active
                    ? 'border-discord-blurple text-white'
                    : 'border-transparent text-discord-textMuted hover:text-discord-textNormal'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          {activeTab === 'roles' && (
            <ModRolesTab member={member} onToggleRole={onToggleRole} />
          )}
          {activeTab === 'notes' && (
            <ModNotesTab
              notes={notes}
              newNoteText={newNoteText}
              setNewNoteText={setNewNoteText}
              handleCreateNote={handleCreateNote}
              onDeleteNote={onDeleteNote}
              memberId={member.id}
            />
          )}
          {activeTab === 'audit' && <ModAuditTab member={member} />}
          {activeTab === 'messages' && (
            <ModMessagesTab member={member} userMessages={userMessages} />
          )}
        </div>
      </div>
    </div>
  );
}
