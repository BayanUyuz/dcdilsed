import React from 'react';

export default function VoiceStreamSection({
  streamResolution,
  setStreamResolution,
  streamFps,
  setStreamFps,
  includeStreamAudio,
  setIncludeStreamAudio,
  hardwareAcceleration,
  setHardwareAcceleration,
  openH264,
  setOpenH264,
  av1Codec,
  setAv1Codec
}) {
  return (
    <div className="space-y-6 pt-4 border-t border-amber-500/20">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
        STREAM- & BILDSCHIRMÜBERTRAGUNGSEINSTELLUNGEN
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div>
          <label className="text-[10px] font-extrabold text-amber-400 uppercase block mb-1.5">
            STREAM-AUFLÖSUNG
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['720p', '1080p', '1440p', 'source'].map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => setStreamResolution(res)}
                className={`py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  streamResolution === res
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-[#070709] text-amber-200/60 border-amber-500/20 hover:text-amber-200 hover:border-amber-500/40'
                }`}
              >
                {res === 'source' ? 'Quelle (Original)' : res}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-extrabold text-amber-400 uppercase block mb-1.5">
            BILDRATE (FPS)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['15', '30', '60'].map((fps) => (
              <button
                key={fps}
                type="button"
                onClick={() => setStreamFps(fps)}
                className={`py-2 rounded-lg text-xs font-bold transition border cursor-pointer ${
                  streamFps === fps
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-[#070709] text-amber-200/60 border-amber-500/20 hover:text-amber-200 hover:border-amber-500/40'
                }`}
              >
                {fps} FPS
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-amber-500/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-100">Systemsounds in Stream übertragen</div>
              <div className="text-[11px] text-amber-300/70">Teile Spiel- und Videosounds in bester Qualität mit deinen Zuschauern.</div>
            </div>
            <input
              type="checkbox"
              checked={includeStreamAudio}
              onChange={(e) => setIncludeStreamAudio(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-100">Hardwarebeschleunigung für Bildschirm-Encoding (GPU)</div>
              <div className="text-[11px] text-amber-300/70">Verwendet NVIDIA NVENC oder AMD VCE Hardware-Encoder deiner Grafikkarte.</div>
            </div>
            <input
              type="checkbox"
              checked={hardwareAcceleration}
              onChange={(e) => setHardwareAcceleration(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">OpenH264 Video-Codec verwenden</div>
              <div className="text-[11px] text-discord-textMuted">Unterstützung für den OpenH264-Codec von Cisco Systems Inc.</div>
            </div>
            <input
              type="checkbox"
              checked={openH264}
              onChange={(e) => setOpenH264(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-100">Modernster AV1 Video-Encoder</div>
              <div className="text-[11px] text-amber-300/70">Liefert gestochen scharfe Videoübertragungen bei geringerer Bandbreite.</div>
            </div>
            <input
              type="checkbox"
              checked={av1Codec}
              onChange={(e) => setAv1Codec(e.target.checked)}
              className="w-4 h-4 accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
