import React from 'react';
import { Camera, Video, CheckCircle } from 'lucide-react';

export default function VoiceCameraSection({
  cameraDevice,
  setCameraDevice,
  cameraTestActive,
  handleToggleCameraTest,
  videoPreviewRef,
  virtualBg,
  setVirtualBg,
  bgFileInputRef,
  handleCustomBgUpload,
  customBgUrl,
  setCustomBgUrl,
  hardwareCameraAcceleration,
  setHardwareCameraAcceleration
}) {
  return (
    <div className="space-y-6 pt-4 border-t border-amber-500/20">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
        KAMERAEINSTELLUNGEN & VIDEOVORSCHAU
      </div>

      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5 text-amber-400" />
          <span>KAMERAGERÄT</span>
        </label>
        <select
          value={cameraDevice}
          onChange={(e) => setCameraDevice(e.target.value)}
          className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
        >
          <option value="default_cam">Standard - Integrierte HD-Webcam (1bcf:28c1)</option>
          <option value="cam_obs">OBS Virtual Camera (Virtuelle Kamera)</option>
          <option value="cam_logitech">Logitech C920 HD Pro Webcam</option>
          <option value="cam_droid">DroidCam / Iriun Webcam</option>
        </select>
      </div>

      {/* Video Preview Box */}
      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-100">VIDEOVORSCHAU</div>
            <div className="text-[11px] text-amber-300/70">Teste live, wie dein Videobild für andere aussieht.</div>
          </div>
          <button
            type="button"
            onClick={handleToggleCameraTest}
            className={`px-4 py-2 rounded-lg text-xs font-black transition shadow-md cursor-pointer ${
              cameraTestActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
            }`}
          >
            {cameraTestActive ? 'Vorschau beenden' : 'Video testen'}
          </button>
        </div>

        <div className="relative w-full aspect-video max-h-72 bg-neutral-950 rounded-2xl overflow-hidden border border-amber-500/30 flex items-center justify-center shadow-inner">
          {cameraTestActive ? (
            <>
              <video
                ref={videoPreviewRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-amber-200 flex items-center gap-1.5 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>CANLI • 1080p 30FPS</span>
              </div>

              {virtualBg !== 'none' && (
                <div className="absolute bottom-3 right-3 bg-[#0c0c10]/90 border border-amber-500/30 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-bold text-amber-200">
                  Hintergrundfilter: {virtualBg}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 text-amber-300/60">
              <Video className="w-12 h-12 mb-2 text-amber-400/40" />
              <div className="text-xs font-bold text-amber-200">Kameratest nicht gestartet</div>
              <div className="text-[11px] max-w-xs mt-1">
                Klicke auf „Video testen“, um die Vorschau zu starten.
              </div>
            </div>
          )}
        </div>

        {/* Virtual Background */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider">
              VIRTUELLER KAMERAHINTERGRUND
            </span>
            <button
              type="button"
              onClick={() => bgFileInputRef.current?.click()}
              className="text-[11px] text-amber-400 hover:underline font-bold cursor-pointer"
            >
              + Eigenen Hintergrund hinzufügen
            </button>
            <input
              type="file"
              ref={bgFileInputRef}
              onChange={handleCustomBgUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {[
              { id: 'none', label: 'Keine', color: 'bg-neutral-800' },
              { id: 'blur', label: 'Verschwommen', color: 'bg-neutral-600 backdrop-blur' },
              { id: 'bg_blue', label: 'DilSed Altın', color: 'bg-gradient-to-tr from-amber-600 to-amber-400' },
              { id: 'bg_cyber', label: 'Obsidian Glow', color: 'bg-gradient-to-tr from-neutral-900 to-amber-900' },
              { id: 'bg_space', label: 'Weltraum', color: 'bg-gradient-to-tr from-neutral-950 to-neutral-900' },
              { id: 'bg_library', label: 'Bibliothek', color: 'bg-amber-950' },
            ].map((bg) => (
              <div
                key={bg.id}
                onClick={() => setVirtualBg(bg.id)}
                className={`p-2 rounded-xl border text-center cursor-pointer transition flex flex-col items-center gap-1.5 ${
                  virtualBg === bg.id
                    ? 'border-amber-400 bg-amber-500/15 shadow-md shadow-amber-500/20 ring-1 ring-amber-400'
                    : 'border-amber-500/20 bg-[#070709] hover:bg-[#121218]'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg ${bg.color} border border-amber-500/30`} />
                <span className="text-[10px] font-bold text-amber-200 truncate max-w-full">
                  {bg.label}
                </span>
              </div>
            ))}
          </div>

          {customBgUrl && (
            <div className="mt-2 p-2 bg-[#070709] rounded-xl border border-amber-500/30 flex items-center justify-between text-xs">
              <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                Eigener Hintergrund geladen
              </span>
              <button
                type="button"
                onClick={() => {
                  setCustomBgUrl('');
                  setVirtualBg('none');
                }}
                className="text-[11px] text-red-400 hover:underline cursor-pointer"
              >
                Entfernen
              </button>
            </div>
          )}
        </div>

        {/* Hardware Acceleration */}
        <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-100">Hardwarebeschleunigung für Videoverarbeitung</div>
            <div className="text-[11px] text-amber-300/70">Verarbeitet das Kamerabild auf der GPU, um die CPU-Last zu minimieren.</div>
          </div>
          <input
            type="checkbox"
            checked={hardwareCameraAcceleration}
            onChange={(e) => setHardwareCameraAcceleration(e.target.checked)}
            className="w-4 h-4 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
