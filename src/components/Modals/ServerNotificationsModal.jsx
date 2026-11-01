import React, { useState } from 'react';
import { X, Bell, BellOff, Volume2, Check } from 'lucide-react';

export default function ServerNotificationsModal({ isOpen, onClose, server }) {
  const [notificationLevel, setNotificationLevel] = useState('mentions'); // 'all' | 'mentions' | 'nothing'
  const [isMuted, setIsMuted] = useState(false);
  const [muteDuration, setMuteDuration] = useState('until_turn_on');
  const [suppressEveryone, setSuppressEveryone] = useState(false);
  const [mobilePush, setMobilePush] = useState(true);

  if (!isOpen || !server) return null;

  const handleSave = () => {
    alert(`Benachrichtigungseinstellungen für ${server.name} gespeichert!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-6 h-6 text-discord-blurple" />
            <h2 className="text-lg font-bold text-white">
              Benachrichtigungseinstellungen für {server.name}
            </h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-5">
            Lege fest, wie oft du Benachrichtigungen von diesem Server erhalten möchtest.
          </p>

          {/* Mute Server Toggle */}
          <div className="bg-discord-darkest/70 p-3.5 rounded-lg border border-discord-divider/30 mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                {isMuted ? <BellOff className="w-4 h-4 text-discord-red" /> : <Bell className="w-4 h-4 text-discord-green" />}
                <span>{server.name} stummschalten</span>
              </div>
              <div className="text-[11px] text-discord-textMuted">
                {isMuted ? 'Server ist aktuell stummgeschaltet' : 'Akustische Benachrichtigungen vollständig ausschalten'}
              </div>
            </div>
            <input
              type="checkbox"
              checked={isMuted}
              onChange={(e) => setIsMuted(e.target.checked)}
              className="w-4 h-4 accent-discord-blurple cursor-pointer"
            />
          </div>

          {/* Notification Levels */}
          <div className="space-y-2 mb-5">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block">
              SERVER-BENACHRICHTIGUNGSEINSTELLUNGEN
            </label>

            {[
              { id: 'all', title: 'Alle Nachrichten', desc: 'Benachrichtigung für jede Nachricht erhalten' },
              { id: 'mentions', title: 'Nur @Erwähnungen', desc: 'Nur bei @deinName, @everyone oder deinen Rollen' },
              { id: 'nothing', title: 'Nichts', desc: 'Keine Benachrichtigungen senden' },
            ].map((opt) => (
              <div
                key={opt.id}
                onClick={() => setNotificationLevel(opt.id)}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  notificationLevel === opt.id
                    ? 'bg-discord-darkest border-discord-blurple'
                    : 'bg-discord-channels/40 border-discord-divider/30 hover:bg-discord-channels'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white">{opt.title}</div>
                  <div className="text-[10px] text-discord-textMuted">{opt.desc}</div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    notificationLevel === opt.id
                      ? 'border-discord-blurple bg-discord-blurple'
                      : 'border-discord-divider'
                  }`}
                >
                  {notificationLevel === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            ))}
          </div>

          {/* Suppress @everyone */}
          <div className="space-y-3 pt-3 border-t border-discord-divider/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">@everyone und @here unterdrücken</div>
                <div className="text-[10px] text-discord-textMuted">Massenbenachrichtigungen stummschalten</div>
              </div>
              <input
                type="checkbox"
                checked={suppressEveryone}
                onChange={(e) => setSuppressEveryone(e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Mobile Push-Benachrichtigungen</div>
                <div className="text-[10px] text-discord-textMuted">Benachrichtigungen an dein Smartphone senden</div>
              </div>
              <input
                type="checkbox"
                checked={mobilePush}
                onChange={(e) => setMobilePush(e.target.checked)}
                className="w-4 h-4 accent-discord-blurple cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-5">
            <button
              onClick={handleSave}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition shadow"
            >
              Fertig
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
