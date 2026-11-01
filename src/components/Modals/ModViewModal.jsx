import React, { useState } from 'react';
import {
  X,
  Shield,
  Clock,
  AlertTriangle,
  Ban,
  UserCheck,
  CheckCircle2,
  FileText,
  MessageSquare,
  Calendar,
  UserX,
  Plus,
  Trash2,
  Check,
  Search,
  History,
  MicOff,
  Headphones
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('roles'); // 'roles' | 'notes' | 'audit' | 'messages'
  const [newNoteText, setNewNoteText] = useState('');
  const [showTimeoutDropdown, setShowTimeoutDropdown] = useState(false);

  if (!isOpen || !member) return null;

  const AVAILABLE_ROLES = [
    { id: 'r_admin', name: 'Administrator', color: '#5865F2', desc: 'Besitzt alle Berechtigungen.' },
    { id: 'r_mod', name: 'Moderator', color: '#23a55a', desc: 'Kann Mitglieder stummschalten, kicken und bannen.' },
    { id: 'r_dev', name: 'Entwickler', color: '#f0b232', desc: 'Verwaltet Bots und API-Integrationen.' },
    { id: 'r_vip', name: 'VIP-Unterstützer', color: '#eb459e', desc: 'Exklusive Sprachräume und Farb-Vorteile.' },
    { id: 'r_member', name: 'Mitglied', color: '#949ba4', desc: 'Standard-Zugriff auf Chat und Sprachräume.' },
  ];

  const TIMEOUT_DURATIONS = [
    { label: '60 Sekunden', duration: '60s' },
    { label: '5 Minuten', duration: '5m' },
    { label: '10 Minuten', duration: '10m' },
    { label: '1 Stunde', duration: '1h' },
    { label: '1 Tag', duration: '1d' },
    { label: '1 Woche', duration: '1w' },
  ];

  const handleCreateNote = (e) => {
    e?.preventDefault();
    if (!newNoteText.trim()) return;
    onAddNote(member.id, newNoteText.trim());
    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-darkest w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-discord-divider/50 flex flex-col max-h-[88vh]">
        {/* Top Profile Header with Banner */}
        <div
          className="h-24 w-full relative flex-shrink-0"
          style={{
            backgroundColor: member.roleColor || '#5865F2',
            backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.4))'
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 flex items-center justify-center text-white transition z-10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Member Profile Info Bar */}
        <div className="px-6 pb-4 pt-0 bg-discord-darker relative flex-shrink-0 border-b border-discord-divider/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-10 gap-3">
            <div className="flex items-end gap-3.5">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.displayName}
                  className="w-20 h-20 rounded-full border-4 border-discord-darker object-cover shadow-lg"
                />
                <span
                  className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-discord-darker ${
                    member.status === 'online'
                      ? 'bg-discord-green'
                      : member.status === 'idle'
                      ? 'bg-discord-yellow'
                      : member.status === 'dnd'
                      ? 'bg-discord-red'
                      : 'bg-[#747f8d]'
                  }`}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white leading-tight">
                    {member.displayName}
                  </h2>
                  {isVerified && (
                    <span
                      title="Verifiziertes Mitglied"
                      className="flex items-center gap-1 bg-discord-green/20 text-discord-green text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-green/40"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Verifiziert
                    </span>
                  )}
                  {isServerMuted && (
                    <span
                      title="Serverweit stummgeschaltet"
                      className="flex items-center gap-1 bg-discord-red/20 text-discord-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-red/40"
                    >
                      <MicOff className="w-3 h-3" />
                      Serverweit stummgeschaltet
                    </span>
                  )}
                  {isServerDeafened && (
                    <span
                      title="Serverweit taubgeschaltet"
                      className="flex items-center gap-1 bg-discord-red/20 text-discord-red text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-red/40"
                    >
                      <Headphones className="w-3 h-3" />
                      Serverweit taubgeschaltet
                    </span>
                  )}
                  {timeoutExpiry && (
                    <span
                      title="Timeout aktiv"
                      className="flex items-center gap-1 bg-discord-yellow/20 text-discord-yellow text-[10px] font-bold px-2 py-0.5 rounded-full border border-discord-yellow/40"
                    >
                      <Clock className="w-3 h-3" />
                      Timeout ({timeoutExpiry})
                    </span>
                  )}
                </div>
                <div className="text-xs text-discord-textMuted flex items-center gap-2 mt-0.5">
                  <span>@{member.username}</span>
                  <span>•</span>
                  <span>ID: {member.id}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onVerifyMember(member)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                  isVerified
                    ? 'bg-discord-green/20 border-discord-green text-discord-green hover:bg-discord-green/30'
                    : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isVerified ? 'Verifizierung entfernen' : 'Mitglied verifizieren'}</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowTimeoutDropdown(!showTimeoutDropdown)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 bg-discord-channels border border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel transition"
                >
                  <Clock className="w-3.5 h-3.5 text-discord-yellow" />
                  <span>Timeout</span>
                </button>

                {showTimeoutDropdown && (
                  <div className="absolute right-0 top-full mt-1 w-44 bg-discord-darkest border border-discord-divider rounded-xl p-1 shadow-2xl z-20 space-y-0.5">
                    <div className="text-[9px] font-bold text-discord-textMuted uppercase px-2 py-1">
                      DAUER WÄHLEN
                    </div>
                    {TIMEOUT_DURATIONS.map((td) => (
                      <button
                        key={td.duration}
                        onClick={() => {
                          onTimeoutUser(member, td.duration);
                          setShowTimeoutDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded text-xs text-white hover:bg-discord-hoverChannel transition"
                      >
                        {td.label}
                      </button>
                    ))}
                    {timeoutExpiry && (
                      <button
                        onClick={() => {
                          onTimeoutUser(member, null);
                          setShowTimeoutDropdown(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded text-xs text-discord-green hover:bg-discord-hoverChannel transition font-bold"
                      >
                        Timeout aufheben
                      </button>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => onToggleServerMute && onToggleServerMute(member)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                  isServerMuted
                    ? 'bg-discord-red/20 border-discord-red text-discord-red hover:bg-discord-red/30'
                    : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
                }`}
                title={isServerMuted ? 'Stummschaltung aufheben' : 'Serverweit stummschalten'}
              >
                <MicOff className="w-3.5 h-3.5" />
                <span>{isServerMuted ? 'Stummgeschaltet' : 'Stummschalten'}</span>
              </button>

              <button
                onClick={() => onToggleServerDeafen && onToggleServerDeafen(member)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                  isServerDeafened
                    ? 'bg-discord-red/20 border-discord-red text-discord-red hover:bg-discord-red/30'
                    : 'bg-discord-channels border-discord-divider text-discord-textNormal hover:bg-discord-hoverChannel'
                }`}
                title={isServerDeafened ? 'Taubschaltung aufheben' : 'Serverweit taubschalten'}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isServerDeafened ? 'Taubgeschaltet' : 'Taubschalten'}</span>
              </button>

              <button
                onClick={() => onKickUser(member)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-discord-red/10 border border-discord-red/30 text-discord-red hover:bg-discord-red hover:text-white transition"
                title="Kicken"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onBanUser(member)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-discord-red/10 border border-discord-red/30 text-discord-red hover:bg-discord-red hover:text-white transition"
                title="Bannen"
              >
                <Ban className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Stats: Join Date & Account Age */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-discord-divider/20 text-xs text-discord-textMuted">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-discord-blurple flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-discord-textMuted">KONTO ERSTELLT</span>
                <span className="text-white font-medium">12. Jan. 2021 (vor 3 Jahren)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-discord-green flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-discord-textMuted">SERVER BEIGETRETEN</span>
                <span className="text-white font-medium">04. Jun. 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <UserCheck className="w-3.5 h-3.5 text-discord-yellow flex-shrink-0" />
              <div>
                <span className="block text-[10px] uppercase font-bold text-discord-textMuted">EINGELADEN VON</span>
                <span className="text-white font-medium">discord.gg/community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center px-6 border-b border-discord-divider/40 bg-discord-chat flex-shrink-0">
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-3 px-3 border-b-2 text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'roles'
                ? 'border-discord-blurple text-white'
                : 'border-transparent text-discord-textMuted hover:text-discord-textNormal'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Rollen</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`py-3 px-3 border-b-2 text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'notes'
                ? 'border-discord-blurple text-white'
                : 'border-transparent text-discord-textMuted hover:text-discord-textNormal'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Moderatorennotizen ({notes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 border-b-2 text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-discord-blurple text-white'
                : 'border-transparent text-discord-textMuted hover:text-discord-textNormal'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Audit-Log & Verwarnungen</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-3 px-3 border-b-2 text-xs font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'messages'
                ? 'border-discord-blurple text-white'
                : 'border-transparent text-discord-textMuted hover:text-discord-textNormal'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Letzte Nachrichten</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-discord-chat custom-scrollbar">
          {/* TAB 1: ROLLEN */}
          {activeTab === 'roles' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-2">
                  SERVER-ROLLEN
                </h3>
                <p className="text-xs text-discord-textNormal mb-4">
                  Weise diesem Mitglied Rollen zu oder entferne sie mit einem Klick.
                </p>
              </div>

              <div className="space-y-2">
                {AVAILABLE_ROLES.map((role) => {
                  const hasRole = member.role === role.name;
                  return (
                    <div
                      key={role.id}
                      onClick={() => onToggleRole(member, role)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                        hasRole
                          ? 'bg-discord-blurple/10 border-discord-blurple'
                          : 'bg-discord-channels/40 border-discord-divider/30 hover:bg-discord-channels/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: role.color }}
                        />
                        <div>
                          <div className="font-semibold text-white text-xs">
                            {role.name}
                          </div>
                          <div className="text-[11px] text-discord-textMuted">
                            {role.desc}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                          hasRole
                            ? 'bg-discord-blurple border-discord-blurple text-white'
                            : 'border-discord-divider/80 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MODERATORENNOTIZEN */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
                  MODERATORENNOTIZEN
                </h3>
                <p className="text-xs text-discord-textNormal">
                  Diese Notizen sind nur für Administratoren und Moderatoren des Servers sichtbar.
                </p>
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleCreateNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Notiz über den Benutzer hinzufügen..."
                  className="flex-1 bg-discord-darkest border border-discord-divider/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-discord-textMuted focus:outline-none focus:border-discord-blurple"
                />
                <button
                  type="submit"
                  disabled={!newNoteText.trim()}
                  className="bg-discord-blurple hover:bg-discord-blurpleHover disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Hinzufügen</span>
                </button>
              </form>

              {/* Notes List */}
              <div className="space-y-2 mt-4">
                {notes.length === 0 ? (
                  <div className="text-center py-8 text-discord-textMuted text-xs bg-discord-channels/20 rounded-xl border border-dashed border-discord-divider/40">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    Noch keine Moderationsnotizen für dieses Mitglied vorhanden.
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-discord-channels/40 border border-discord-divider/40 p-3 rounded-xl flex items-start justify-between gap-3 group"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="text-white font-medium">{note.content}</div>
                        <div className="text-[10px] text-discord-textMuted flex items-center gap-1.5">
                          <span>Von: {note.author || 'Administrator'}</span>
                          <span>•</span>
                          <span>{note.timestamp || 'Neu'}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onDeleteNote(member.id, note.id)}
                        className="text-discord-textMuted hover:text-discord-red transition p-1 opacity-0 group-hover:opacity-100"
                        title="Notiz löschen"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: AUDIT & WARNUNGEN */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
                  SICHERHEITS- & AUDIT-LOGS
                </h3>
                <p className="text-xs text-discord-textNormal">
                  Verstöße, Verwarnungen und Moderationsprotokolle dieses Benutzers.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-discord-green/20 text-discord-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">Keine Auffälligkeiten</div>
                    <div className="text-discord-textMuted text-[11px]">
                      Dieser Benutzer hat bisher gegen keine AutoMod- oder Moderationsregeln verstoßen.
                    </div>
                    <div className="text-[10px] text-discord-textMuted mt-1">Heute 12:45</div>
                  </div>
                </div>

                <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-discord-blurple/20 text-discord-blurple flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">Server-Regeln akzeptiert</div>
                    <div className="text-discord-textMuted text-[11px]">
                      Das Mitglied hat die Willkommensprüfung und den 2FA-Sicherheitscheck erfolgreich bestanden.
                    </div>
                    <div className="text-[10px] text-discord-textMuted mt-1">04. Jun. 2023, 15:30</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LETZTE NACHRICHTEN */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-discord-textMuted mb-1">
                  LETZTE NACHRICHTEN DES BENUTZERS
                </h3>
                <p className="text-xs text-discord-textNormal">
                  Übersicht der zuletzt in Kanälen gesendeten Nachrichten.
                </p>
              </div>

              <div className="space-y-2">
                {userMessages.length === 0 ? (
                  <div className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 text-xs text-white">
                    <div className="text-[11px] text-discord-textMuted mb-1">#allgemeiner-chat • Gestern 19:42</div>
                    <div>Hallo zusammen! Das Projekt macht tolle Fortschritte, lasst uns heute Abend im Sprachkanal treffen.</div>
                  </div>
                ) : (
                  userMessages.map((msg, i) => (
                    <div
                      key={i}
                      className="p-3 bg-discord-channels/40 rounded-xl border border-discord-divider/40 text-xs text-white"
                    >
                      <div className="text-[11px] text-discord-textMuted mb-1">{msg.channel || '#allgemein'} • {msg.timestamp}</div>
                      <div>{msg.content}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-discord-darkest border-t border-discord-divider/40 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-discord-textMuted">
            Moderationswerkzeuge &bull; DilSed-Sicherheitssystem
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-discord-channels hover:bg-discord-hoverChannel text-white transition"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
}
