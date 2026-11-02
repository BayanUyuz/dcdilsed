import React from 'react';

export default function PrivacyTab({ dataUsageAnalytics, setDataUsageAnalytics }) {
  return (
    <div>
      <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-2">
        Datenschutz & Privatsphäre
      </h2>
      <p className="text-xs text-amber-300/70 mb-6">
        Verwalte, wie deine Daten erfasst werden, und behalte die volle Kontrolle über deine Privatsphäre.
      </p>
      <div className="bg-[#0c0c10] rounded-xl p-5 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-100">
            Daten zur Verbesserung von DilSed verwenden
          </span>
          <input
            type="checkbox"
            checked={dataUsageAnalytics}
            onChange={(e) => setDataUsageAnalytics(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
