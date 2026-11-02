import React from 'react';
import {
  Palette,
  User,
  Shield,
  MessageSquare,
  Bell,
  Mic,
  Sun,
  Eye,
  Keyboard,
  Monitor,
  Globe,
  LogOut
} from 'lucide-react';

export default function UserSettingsSidebar({ activeTab, setActiveTab, onClose, onLogout }) {
  const navItems = [
    { section: 'BENUTZEREINSTELLUNGEN' },
    { id: 'profile', label: 'Profile (Profil bearbeiten)', icon: Palette },
    { id: 'account', label: 'Mein Konto', icon: User },
    { id: 'privacy', label: 'Datenschutz & Privatsphäre', icon: Shield },
    { id: 'messages', label: 'Nachrichtenberechtigungen', icon: MessageSquare },
    { section: 'APP-EINSTELLUNGEN' },
    { id: 'notifications', label: 'Benachrichtigungen', icon: Bell },
    { id: 'voice', label: 'Sprache & Video', icon: Mic },
    { id: 'appearance', label: 'Erscheinungsbild', icon: Sun },
    { id: 'accessibility', label: 'Barrierefreiheit', icon: Eye },
    { id: 'keybinds', label: 'Tastenbelegungen', icon: Keyboard },
    { id: 'system', label: 'Windows & System', icon: Monitor },
    { id: 'language', label: 'Sprache & Zeit', icon: Globe },
  ];

  return (
    <div className="w-64 bg-[#050507] flex flex-col items-end py-10 pr-6 flex-shrink-0 border-r border-amber-500/15 overflow-y-auto custom-scrollbar select-none">
      <div className="w-52 space-y-1 text-xs font-medium">
        {navItems.map((item, idx) => {
          if (item.section) {
            return (
              <div
                key={`sec-${idx}`}
                className={`text-[10px] font-extrabold text-amber-400 tracking-wider uppercase px-2 mb-1 ${
                  idx > 0 ? 'pt-3' : ''
                }`}
              >
                {item.section}
              </div>
            );
          }

          const IconComponent = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-300 font-bold border-l-2 border-amber-400 shadow-sm'
                  : 'text-amber-200/75 hover:bg-amber-400/10 hover:text-amber-100'
              }`}
            >
              <IconComponent className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="h-[1px] bg-amber-500/20 my-2" />

        {/* LOG OUT BUTTON */}
        <button
          onClick={() => {
            if (confirm('Möchtest du dich wirklich von DilSed abmelden?')) {
              onLogout();
              onClose();
            }
          }}
          className="w-full text-left px-2.5 py-1.5 rounded text-red-400 hover:bg-red-500/15 transition flex items-center gap-2 font-bold cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  );
}
