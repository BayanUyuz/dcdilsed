import React from 'react';

export default function NotificationsTab({ desktopNotifications, setDesktopNotifications }) {
  return (
    <div>
      <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">
        Benachrichtigungseinstellungen
      </h2>
      <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-100">
            Desktop-Benachrichtigungen aktivieren
          </span>
          <input
            type="checkbox"
            checked={desktopNotifications}
            onChange={(e) => setDesktopNotifications(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
