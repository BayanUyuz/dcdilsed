import React from 'react';
import { Upload, Trash2 } from 'lucide-react';

export default function ProfileDesignSection({
  bannerColor1,
  setBannerColor1,
  bannerColor2,
  setBannerColor2,
  bannerImage,
  setBannerImage,
  bannerFileRef,
  setHasUnsavedChanges,
}) {
  return (
    <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-4">
      <div>
        <div className="text-xs font-bold text-amber-200 mb-1">Profil-Design & Banner</div>
        <div className="text-[10px] text-amber-300/60 font-medium mb-3">
          Lege die Hintergrund-Farbverläufe oder ein Banner-Bild für dein Profil fest.
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
              PRIMÄRFARBE
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bannerColor1}
                onChange={(e) => {
                  setBannerColor1(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="font-mono text-xs text-amber-200 uppercase font-bold">
                {bannerColor1}
              </span>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1">
              SEKUNDÄRFARBE (VERLAUF)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bannerColor2}
                onChange={(e) => {
                  setBannerColor2(e.target.value);
                  setHasUnsavedChanges(true);
                }}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <span className="font-mono text-xs text-amber-200 uppercase font-bold">
                {bannerColor2}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => bannerFileRef.current?.click()}
            className="bg-[#121217] hover:bg-[#181820] text-amber-300 text-xs px-3.5 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Banner-Bild hochladen</span>
          </button>
          {bannerImage && (
            <button
              type="button"
              onClick={() => {
                setBannerImage('');
                setHasUnsavedChanges(true);
              }}
              className="text-red-400 text-xs hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Banner entfernen</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
