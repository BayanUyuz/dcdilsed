import React from 'react';
import { Mic, Volume2 } from 'lucide-react';
import VoiceInputModeSection from './VoiceInputModeSection';

export default function VoiceAudioSection({
  inputDevice,
  setInputDevice,
  outputDevice,
  setOutputDevice,
  micVolume,
  setMicVolume,
  outputVolume,
  setOutputVolume,
  micTestActive,
  setMicTestActive,
  liveMicLevel,
  inputMode,
  setInputMode,
  autoSensitivity,
  setAutoSensitivity,
  sensitivity,
  setSensitivity,
  pttKey,
  isRecordingPttKey,
  setIsRecordingPttKey,
  pttDelay,
  setPttDelay
}) {
  return (
    <div className="space-y-6">
      <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">
        SPRACHEINSTELLUNGEN (EINGABE & AUSGABE)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input Device */}
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
          <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-emerald-400" />
              <span>EINGABEGERÄT (MIKROFON)</span>
            </span>
          </label>
          <select
            value={inputDevice}
            onChange={(e) => setInputDevice(e.target.value)}
            className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
          >
            <option value="default_mic">Standard - Mikrofon (Realtek(R) Audio)</option>
            <option value="mic_intel">Mikrofonarray (Intel® Smart Sound Technologie)</option>
            <option value="mic_hyperx">Headset-Mikrofon (HyperX Cloud II Wireless)</option>
            <option value="mic_vbaudio">Virtuelles Audiokabel (VB-Audio Virtual Cable)</option>
            <option value="mic_usb">Externes Studio-Mikrofon (Rode NT-USB / Blue Yeti)</option>
          </select>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase">EINGANGSLAUTSTÄRKE</span>
              <span className="text-amber-200 font-bold">%{micVolume}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={micVolume}
              onChange={(e) => setMicVolume(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Device */}
        <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
          <label className="text-[11px] font-extrabold text-amber-400 uppercase flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              <span>AUSGABEGERÄT (LAUTSPRECHER / KOPFHÖRER)</span>
            </span>
          </label>
          <select
            value={outputDevice}
            onChange={(e) => setOutputDevice(e.target.value)}
            className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer font-medium"
          >
            <option value="default_spk">Standard - Lautsprecher (Realtek(R) Audio)</option>
            <option value="spk_hyperx">Kopfhörer (HyperX Cloud II Wireless Headset)</option>
            <option value="spk_optical">Realtek Digital Output (Optischer Ausgang)</option>
            <option value="spk_hdmi">Monitor-Lautsprecher (NVIDIA High Definition Audio)</option>
          </select>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase">AUSGANGSLAUTSTÄRKE</span>
              <span className="text-amber-200 font-bold">%{outputVolume}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={outputVolume}
              onChange={(e) => setOutputVolume(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Mic Test Box */}
      <div className="bg-[#0c0c10] rounded-xl p-4 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-amber-200 mb-0.5">MIKROFONTEST ("LASS DICH HÖREN")</div>
            <p className="text-[11px] text-amber-300/70">
              Hört sich etwas seltsam an? Teste dein Mikrofon und höre dir deine eigene Stimme an.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMicTestActive(!micTestActive)}
            className={`px-4 py-2 rounded-lg text-xs font-black transition shadow-md cursor-pointer ${
              micTestActive
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 shadow-amber-500/20'
            }`}
          >
            {micTestActive ? 'Test beenden' : 'Mikrofon testen'}
          </button>
        </div>

        {/* Segmented LED Audio Level Meter */}
        <div className="h-4 bg-[#070709] rounded-md overflow-hidden flex items-center px-1 gap-1 border border-amber-500/30">
          {Array.from({ length: 24 }).map((_, i) => {
            const stepValue = (i + 1) * 4.16;
            const isLit = micTestActive && liveMicLevel >= stepValue;
            const isHigh = i > 18;
            const isMed = i > 12 && i <= 18;
            return (
              <div
                key={i}
                className={`flex-1 h-2 rounded-sm transition-all duration-75 ${
                  isLit
                    ? isHigh
                      ? 'bg-red-500 shadow-sm shadow-red-500'
                      : isMed
                      ? 'bg-amber-400 shadow-sm shadow-amber-400'
                      : 'bg-emerald-400 shadow-sm shadow-emerald-400'
                    : 'bg-white/5'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Eingabemodus */}
      <VoiceInputModeSection
        inputMode={inputMode}
        setInputMode={setInputMode}
        autoSensitivity={autoSensitivity}
        setAutoSensitivity={setAutoSensitivity}
        sensitivity={sensitivity}
        setSensitivity={setSensitivity}
        pttKey={pttKey}
        isRecordingPttKey={isRecordingPttKey}
        setIsRecordingPttKey={setIsRecordingPttKey}
        pttDelay={pttDelay}
        setPttDelay={setPttDelay}
      />
    </div>
  );
}
