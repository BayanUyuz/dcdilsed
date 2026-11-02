import React from 'react';

export default function AccountTab({ currentUser, usernameInput, setUsernameInput }) {
  return (
    <div>
      <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-6">
        Mein Konto
      </h2>
      <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div>
            <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
              BENUTZERNAME
            </div>
            <div className="text-xs font-bold text-amber-100">@{usernameInput}</div>
          </div>
          <button
            onClick={() => {
              const u = prompt('Neuer Benutzername:', usernameInput);
              if (u) setUsernameInput(u);
            }}
            className="bg-[#121217] hover:bg-amber-400/10 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 transition cursor-pointer"
          >
            Bearbeiten
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
              E-MAIL
            </div>
            <div className="text-xs font-bold text-amber-100">{currentUser?.email || 'ornek@dilsed.web'}</div>
          </div>
          <button
            onClick={() => alert('Bestätigungslink wurde an deine E-Mail gesendet.')}
            className="bg-[#121217] hover:bg-amber-400/10 text-xs text-amber-300 font-bold px-3 py-1.5 rounded-lg border border-amber-500/30 transition cursor-pointer"
          >
            Bearbeiten
          </button>
        </div>
      </div>
    </div>
  );
}
