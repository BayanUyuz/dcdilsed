import React from 'react';

export default function AuthQrSection() {
  return (
    <div className="w-full md:w-72 bg-[#070709] border-t md:border-t-0 md:border-l border-amber-500/20 p-8 flex flex-col items-center justify-center text-center">
      <div className="w-44 h-44 bg-neutral-950 rounded-2xl p-3 shadow-2xl mb-4 relative flex items-center justify-center border border-amber-500/30 shadow-[0_0_25px_rgba(212,175,55,0.15)]">
        <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-black rounded-xl">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-sm ${
                (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                  ? 'bg-amber-300'
                  : 'bg-transparent'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center shadow-lg border border-amber-400 p-1">
            <img src="/dilsed-logo.png" alt="DilSed" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <h3 className="text-base font-bold text-white mb-1">
        Mit QR-Code anmelden
      </h3>
      <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">
        Scanne diesen Code mit der <strong>DilSed-Mobil-App</strong>, um dich sofort ohne Passwort anzumelden.
      </p>
    </div>
  );
}
