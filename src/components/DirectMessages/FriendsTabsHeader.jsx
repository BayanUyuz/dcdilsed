import React from 'react';
import { Users } from 'lucide-react';

export default function FriendsTabsHeader({ activeTab, setActiveTab }) {
  return (
    <header className="h-12 px-4 border-b border-amber-500/15 bg-[#060608] flex items-center justify-between shadow-sm select-none">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-amber-400 pr-3 border-r border-amber-500/20">
          <Users className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-amber-200 text-sm">Freunde</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <button
            onClick={() => setActiveTab('online')}
            className={`px-3 py-1 rounded-lg transition font-semibold ${
              activeTab === 'online'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            Online
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg transition font-semibold ${
              activeTab === 'all'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1 rounded-lg transition font-semibold ${
              activeTab === 'pending'
                ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-amber-200/70 hover:bg-amber-400/10 hover:text-amber-100'
            }`}
          >
            Ausstehend
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-3.5 py-1 rounded-lg transition font-bold ${
              activeTab === 'add'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 shadow-md ring-2 ring-amber-300'
                : 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:brightness-110 shadow-md'
            }`}
          >
            Freund hinzufügen
          </button>
        </div>
      </div>
    </header>
  );
}
