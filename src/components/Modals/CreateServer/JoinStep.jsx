import React from 'react';

export default function JoinStep({
  inviteInput,
  setInviteInput,
  inviteError,
  handleJoinByInvite,
  setStep
}) {
  return (
    <form onSubmit={handleJoinByInvite} className="flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-black text-center text-white mb-2 tracking-tight bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
          Einem Server beitreten
        </h2>
        <p className="text-xs text-center text-amber-200/60 leading-relaxed max-w-xs mx-auto mb-6">
          Gib unten einen Einladungslink oder Code ein, um einem vorhandenen Server beizutreten.
        </p>

        {inviteError && (
          <div className="mb-4 p-2.5 rounded bg-discord-red/20 border border-discord-red/50 text-discord-red text-xs">
            {inviteError}
          </div>
        )}

        <div className="mb-4">
          <label className="text-[11px] font-bold text-amber-300/80 uppercase block mb-1 tracking-wider">
            EINLADUNGSLINK <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            required
            value={inviteInput}
            onChange={(e) => setInviteInput(e.target.value)}
            placeholder="https://discord.gg/hTKz9a oder hTKz9a"
            className="w-full bg-[#121216] rounded-xl px-3.5 py-2.5 text-sm text-white border border-amber-500/25 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50"
          />
        </div>

        {/* Sample Invites Helper Box */}
        <div className="bg-[#101014] rounded-xl p-3 border border-amber-500/20 text-xs space-y-1">
          <div className="text-[10px] font-bold text-amber-300/80 uppercase mb-1">
            EINLADUNGEN SEHEN ETWA SO AUS:
          </div>
          <div className="text-neutral-300 font-mono text-[11px]">hTKz9a</div>
          <div className="text-neutral-300 font-mono text-[11px]">https://discord.gg/hTKz9a</div>
          <div className="text-neutral-300 font-mono text-[11px]">https://discord.gg/entwickler-community</div>
        </div>
      </div>

      <div className="bg-[#070709] px-6 py-4 flex items-center justify-between border-t border-amber-500/15">
        <button
          type="button"
          onClick={() => setStep('templates')}
          className="text-xs font-semibold text-amber-200/70 hover:text-white hover:underline cursor-pointer"
        >
          Zurück
        </button>
        <button
          type="submit"
          disabled={!inviteInput.trim()}
          className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 text-neutral-950 px-6 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-amber-500/20 disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          Server beitreten
        </button>
      </div>
    </form>
  );
}
