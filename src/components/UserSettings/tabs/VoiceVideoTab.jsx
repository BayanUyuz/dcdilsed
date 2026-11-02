import React from 'react';
import VoiceAudioSection from '../voice/VoiceAudioSection';
import VoiceMuteDeafenSection from '../voice/VoiceMuteDeafenSection';
import VoiceCameraSection from '../voice/VoiceCameraSection';
import VoiceStreamSection from '../voice/VoiceStreamSection';
import VoiceAdvancedSection from '../voice/VoiceAdvancedSection';
import VoiceSoundEffectsSection from '../voice/VoiceSoundEffectsSection';

export default function VoiceVideoTab({
  voiceSubTab,
  setVoiceSubTab,
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
  setPttDelay,
  isMuted,
  handleToggleMute,
  pushToMuteKey,
  isRecordingPtmKey,
  setIsRecordingPtmKey,
  isDeafened,
  handleToggleDeafen,
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
  setHardwareCameraAcceleration,
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
  setAv1Codec,
  krispMode,
  setKrispMode,
  echoCancellation,
  setEchoCancellation,
  autoGainControl,
  setAutoGainControl,
  advancedVoiceProcessing,
  setAdvancedVoiceProcessing,
  attenuationPercent,
  setAttenuationPercent,
  attenuateOthers,
  setAttenuateOthers,
  attenuateSelf,
  setAttenuateSelf,
  audioSubsystem,
  setAudioSubsystem,
  qosPriority,
  setQosPriority,
  diagnosticAudio,
  setDiagnosticAudio,
  handleResetVoiceSettings,
  soundboardVolume,
  setSoundboardVolume
}) {
  const SUB_TABS = [
    { id: 'all', label: 'Alle' },
    { id: 'audio', label: 'Spracheinstellungen' },
    { id: 'mute_deafen', label: 'Stummschalten & Taubschalten' },
    { id: 'video', label: 'Kameraeinstellungen' },
    { id: 'stream', label: 'Streameinstellungen' },
    { id: 'advanced', label: 'Erweiterte Einstellungen' },
    { id: 'sounds', label: 'Töne & Audio-Events' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1">
          Sprach- & Videoeinstellungen
        </h2>
        <p className="text-xs text-amber-300/70">
          Konfiguriere dein Mikrofon, Lautsprecher, Webcam und Bildschirmübertragung.
        </p>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-amber-500/20">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setVoiceSubTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              voiceSubTab === tab.id
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {(voiceSubTab === 'all' || voiceSubTab === 'audio') && (
        <VoiceAudioSection
          inputDevice={inputDevice}
          setInputDevice={setInputDevice}
          outputDevice={outputDevice}
          setOutputDevice={setOutputDevice}
          micVolume={micVolume}
          setMicVolume={setMicVolume}
          outputVolume={outputVolume}
          setOutputVolume={setOutputVolume}
          micTestActive={micTestActive}
          setMicTestActive={setMicTestActive}
          liveMicLevel={liveMicLevel}
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
      )}

      {(voiceSubTab === 'all' || voiceSubTab === 'mute_deafen' || voiceSubTab === 'audio') && (
        <VoiceMuteDeafenSection
          isMuted={isMuted}
          handleToggleMute={handleToggleMute}
          pushToMuteKey={pushToMuteKey}
          isRecordingPtmKey={isRecordingPtmKey}
          setIsRecordingPtmKey={setIsRecordingPtmKey}
          isDeafened={isDeafened}
          handleToggleDeafen={handleToggleDeafen}
        />
      )}

      {(voiceSubTab === 'all' || voiceSubTab === 'video') && (
        <VoiceCameraSection
          cameraDevice={cameraDevice}
          setCameraDevice={setCameraDevice}
          cameraTestActive={cameraTestActive}
          handleToggleCameraTest={handleToggleCameraTest}
          videoPreviewRef={videoPreviewRef}
          virtualBg={virtualBg}
          setVirtualBg={setVirtualBg}
          bgFileInputRef={bgFileInputRef}
          handleCustomBgUpload={handleCustomBgUpload}
          customBgUrl={customBgUrl}
          setCustomBgUrl={setCustomBgUrl}
          hardwareCameraAcceleration={hardwareCameraAcceleration}
          setHardwareCameraAcceleration={setHardwareCameraAcceleration}
        />
      )}

      {(voiceSubTab === 'all' || voiceSubTab === 'stream') && (
        <VoiceStreamSection
          streamResolution={streamResolution}
          setStreamResolution={setStreamResolution}
          streamFps={streamFps}
          setStreamFps={setStreamFps}
          includeStreamAudio={includeStreamAudio}
          setIncludeStreamAudio={setIncludeStreamAudio}
          hardwareAcceleration={hardwareAcceleration}
          setHardwareAcceleration={setHardwareAcceleration}
          openH264={openH264}
          setOpenH264={setOpenH264}
          av1Codec={av1Codec}
          setAv1Codec={setAv1Codec}
        />
      )}

      {(voiceSubTab === 'all' || voiceSubTab === 'advanced') && (
        <VoiceAdvancedSection
          krispMode={krispMode}
          setKrispMode={setKrispMode}
          echoCancellation={echoCancellation}
          setEchoCancellation={setEchoCancellation}
          autoGainControl={autoGainControl}
          setAutoGainControl={setAutoGainControl}
          advancedVoiceProcessing={advancedVoiceProcessing}
          setAdvancedVoiceProcessing={setAdvancedVoiceProcessing}
          attenuationPercent={attenuationPercent}
          setAttenuationPercent={setAttenuationPercent}
          attenuateOthers={attenuateOthers}
          setAttenuateOthers={setAttenuateOthers}
          attenuateSelf={attenuateSelf}
          setAttenuateSelf={setAttenuateSelf}
          audioSubsystem={audioSubsystem}
          setAudioSubsystem={setAudioSubsystem}
          qosPriority={qosPriority}
          setQosPriority={setQosPriority}
          diagnosticAudio={diagnosticAudio}
          setDiagnosticAudio={setDiagnosticAudio}
          handleResetVoiceSettings={handleResetVoiceSettings}
        />
      )}

      {(voiceSubTab === 'all' || voiceSubTab === 'sounds') && (
        <VoiceSoundEffectsSection
          soundboardVolume={soundboardVolume}
          setSoundboardVolume={setSoundboardVolume}
        />
      )}
    </div>
  );
}
