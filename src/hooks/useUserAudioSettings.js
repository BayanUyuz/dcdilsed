import { useState, useRef, useEffect } from 'react';
import { playMuteSound } from '../soundEffects';

export function useUserAudioSettings({ isMuted = false, setIsMuted = () => {}, isDeafened = false, setIsDeafened = () => {} }) {
  const [voiceSubTab, setVoiceSubTab] = useState('all');
  const [inputDevice, setInputDevice] = useState('default_mic');
  const [outputDevice, setOutputDevice] = useState('default_spk');
  const [micVolume, setMicVolume] = useState(85);
  const [outputVolume, setOutputVolume] = useState(100);
  const [micTestActive, setMicTestActive] = useState(false);
  const [liveMicLevel, setLiveMicLevel] = useState(0);
  const [inputMode, setInputMode] = useState('activity');
  const [autoSensitivity, setAutoSensitivity] = useState(true);
  const [sensitivity, setSensitivity] = useState(-55);
  const [pttKey, setPttKey] = useState('Caps Lock');
  const [isRecordingPttKey, setIsRecordingPttKey] = useState(false);
  const [pttDelay, setPttDelay] = useState(20);
  const [pushToMuteKey, setPushToMuteKey] = useState('Yok');
  const [isRecordingPtmKey, setIsRecordingPtmKey] = useState(false);

  const [cameraDevice, setCameraDevice] = useState('default_cam');
  const [cameraTestActive, setCameraTestActive] = useState(false);
  const [virtualBg, setVirtualBg] = useState('none');
  const [customBgUrl, setCustomBgUrl] = useState('');
  const bgFileInputRef = useRef(null);
  const videoPreviewRef = useRef(null);
  const previewStreamRef = useRef(null);
  const [hardwareCameraAcceleration, setHardwareCameraAcceleration] = useState(true);

  const [streamResolution, setStreamResolution] = useState('1080p');
  const [streamFps, setStreamFps] = useState('60');
  const [includeStreamAudio, setIncludeStreamAudio] = useState(true);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [openH264, setOpenH264] = useState(true);
  const [av1Codec, setAv1Codec] = useState(true);

  const [krispMode, setKrispMode] = useState('krisp');
  const [echoCancellation, setEchoCancellation] = useState(true);
  const [autoGainControl, setAutoGainControl] = useState(true);
  const [advancedVoiceProcessing, setAdvancedVoiceProcessing] = useState(true);
  const [audioSubsystem, setAudioSubsystem] = useState('standard');
  const [attenuationPercent, setAttenuationPercent] = useState(0);
  const [attenuateOthers, setAttenuateOthers] = useState(true);
  const [attenuateSelf, setAttenuateSelf] = useState(false);
  const [qosPriority, setQosPriority] = useState(false);
  const [diagnosticAudio, setDiagnosticAudio] = useState(false);
  const [soundboardVolume, setSoundboardVolume] = useState(80);

  // Mic test level interval
  useEffect(() => {
    let interval = null;
    if (micTestActive) {
      interval = setInterval(() => {
        setLiveMicLevel(Math.floor(20 + Math.random() * 70));
      }, 100);
    } else {
      setLiveMicLevel(0);
    }
    return () => clearInterval(interval);
  }, [micTestActive]);

  // Key recording listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isRecordingPttKey) {
        e.preventDefault();
        e.stopPropagation();
        setPttKey(e.key === ' ' ? 'Space' : e.key.toUpperCase());
        setIsRecordingPttKey(false);
      }
      if (isRecordingPtmKey) {
        e.preventDefault();
        e.stopPropagation();
        setPushToMuteKey(e.key === ' ' ? 'Space' : e.key.toUpperCase());
        setIsRecordingPtmKey(false);
      }
    };
    if (isRecordingPttKey || isRecordingPtmKey) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecordingPttKey, isRecordingPtmKey]);

  useEffect(() => {
    return () => {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    playMuteSound(next);
  };

  const handleToggleDeafen = () => {
    const next = !isDeafened;
    setIsDeafened(next);
    if (next) setIsMuted(true);
    playMuteSound(next);
  };

  const handleToggleCameraTest = async () => {
    if (cameraTestActive) {
      if (previewStreamRef.current) {
        previewStreamRef.current.getTracks().forEach((track) => track.stop());
        previewStreamRef.current = null;
      }
      setCameraTestActive(false);
    } else {
      setCameraTestActive(true);
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
          });
          previewStreamRef.current = stream;
          if (videoPreviewRef.current) {
            videoPreviewRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera access fallback:', err.message);
      }
    }
  };

  const handleCustomBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomBgUrl(url);
      setVirtualBg('custom');
    }
  };

  const handleResetVoiceSettings = () => {
    if (confirm('Möchtest du wirklich alle Sprach- und Videoeinstellungen auf die Standardwerte zurücksetzen?')) {
      setInputDevice('default_mic');
      setOutputDevice('default_spk');
      setMicVolume(85);
      setOutputVolume(100);
      setMicTestActive(false);
      setInputMode('activity');
      setAutoSensitivity(true);
      setSensitivity(-55);
      setPttKey('Caps Lock');
      setPttDelay(20);
      setPushToMuteKey('Yok');
      setCameraDevice('default_cam');
      setVirtualBg('none');
      setCustomBgUrl('');
      setHardwareCameraAcceleration(true);
      setStreamResolution('1080p');
      setStreamFps('60');
      setIncludeStreamAudio(true);
      setHardwareAcceleration(true);
      setOpenH264(true);
      setAv1Codec(true);
      setKrispMode('krisp');
      setEchoCancellation(true);
      setAutoGainControl(true);
      setAdvancedVoiceProcessing(true);
      setAudioSubsystem('standard');
      setAttenuationPercent(0);
      setAttenuateOthers(true);
      setAttenuateSelf(false);
      setQosPriority(false);
      setDiagnosticAudio(false);
      setSoundboardVolume(80);
      alert('Sprach- und Videoeinstellungen wurden erfolgreich zurückgesetzt.');
    }
  };

  return {
    voiceSubTab, setVoiceSubTab, inputDevice, setInputDevice, outputDevice, setOutputDevice,
    micVolume, setMicVolume, outputVolume, setOutputVolume, micTestActive, setMicTestActive,
    liveMicLevel, inputMode, setInputMode, autoSensitivity, setAutoSensitivity, sensitivity,
    setSensitivity, pttKey, setPttKey, isRecordingPttKey, setIsRecordingPttKey, pttDelay,
    setPttDelay, pushToMuteKey, setPushToMuteKey, isRecordingPtmKey, setIsRecordingPtmKey,
    cameraDevice, setCameraDevice, cameraTestActive, setCameraTestActive, virtualBg, setVirtualBg,
    customBgUrl, setCustomBgUrl, bgFileInputRef, videoPreviewRef, previewStreamRef,
    hardwareCameraAcceleration, setHardwareCameraAcceleration, streamResolution, setStreamResolution,
    streamFps, setStreamFps, includeStreamAudio, setIncludeStreamAudio, hardwareAcceleration,
    setHardwareAcceleration, openH264, setOpenH264, av1Codec, setAv1Codec, krispMode, setKrispMode,
    echoCancellation, setEchoCancellation, autoGainControl, setAutoGainControl, advancedVoiceProcessing,
    setAdvancedVoiceProcessing, audioSubsystem, setAudioSubsystem, attenuationPercent,
    setAttenuationPercent, attenuateOthers, setAttenuateOthers, attenuateSelf, setAttenuateSelf,
    qosPriority, setQosPriority, diagnosticAudio, setDiagnosticAudio, soundboardVolume,
    setSoundboardVolume, handleToggleMute, handleToggleDeafen, handleToggleCameraTest,
    handleCustomBgUpload, handleResetVoiceSettings
  };
}
