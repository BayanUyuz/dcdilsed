import React, { useState } from 'react';
import { Eye, RotateCcw } from 'lucide-react';
import AccessibilityPreview from '../accessibility/AccessibilityPreview';
import TextReadabilitySection from '../accessibility/TextReadabilitySection';
import VisualDensitySection from '../accessibility/VisualDensitySection';
import RoleStylesSection from '../accessibility/RoleStylesSection';
import ColorContrastSection from '../accessibility/ColorContrastSection';
import MotionSection from '../accessibility/MotionSection';
import TtsScreenreaderSection from '../accessibility/TtsScreenreaderSection';

export default function AccessibilityTab({
  currentUser,
  fontSize,
  setFontSize,
  messageDisplay,
  setMessageDisplay,
  messageSpacing,
  setMessageSpacing,
  roleColorStyle,
  setRoleColorStyle,
  showProfileBadges,
  setShowProfileBadges,
  highContrast,
  setHighContrast,
  saturation,
  setSaturation,
  underlineLinks,
  setUnderlineLinks,
  desaturateRoleColors,
  setDesaturateRoleColors,
  reducedMotionMode,
  setReducedMotionMode,
  autoplayGifs,
  setAutoplayGifs,
  animateEmojis,
  setAnimateEmojis,
  screenReaderSupport,
  setScreenReaderSupport,
  enableTts,
  setEnableTts,
  ttsSpeed,
  setTtsSpeed,
  audioCues,
  setAudioCues,
  isSpeakingTts,
  handleTestTts,
  handleResetAccessibility
}) {
  const [accessSubTab, setAccessSubTab] = useState('all');

  const SUB_TABS = [
    { id: 'all', label: 'Alle' },
    { id: 'text', label: 'Text & Lesbarkeit' },
    { id: 'density', label: 'Visuelle Dichte' },
    { id: 'roles', label: 'Anzeigenamen-Stile' },
    { id: 'color', label: 'Farbe & Kontrast' },
    { id: 'motion', label: 'Reduzierte Bewegung' },
    { id: 'tts', label: 'Sprachausgabe & Screenreader' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 mb-1 flex items-center gap-2">
          <Eye className="w-6 h-6 text-amber-400" />
          <span>Barrierefreiheit</span>
        </h2>
        <p className="text-xs text-amber-300/70">
          Passe DilSed an deine individuellen Seh-, Farb-, Bewegungs- und Screenreader-Bedürfnisse an.
        </p>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-amber-500/20">
        {SUB_TABS.map((st) => (
          <button
            key={st.id}
            type="button"
            onClick={() => setAccessSubTab(st.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              accessSubTab === st.id
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-black shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                : 'bg-[#0e0e13] text-amber-200/70 border border-amber-500/20 hover:bg-amber-400/10 hover:text-amber-200'
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Live Preview */}
      <AccessibilityPreview
        currentUser={currentUser}
        fontSize={fontSize}
        messageDisplay={messageDisplay}
        messageSpacing={messageSpacing}
        roleColorStyle={roleColorStyle}
        showProfileBadges={showProfileBadges}
        highContrast={highContrast}
        saturation={saturation}
        underlineLinks={underlineLinks}
        desaturateRoleColors={desaturateRoleColors}
      />

      {(accessSubTab === 'all' || accessSubTab === 'text') && (
        <TextReadabilitySection
          fontSize={fontSize}
          setFontSize={setFontSize}
          messageSpacing={messageSpacing}
          setMessageSpacing={setMessageSpacing}
        />
      )}

      {(accessSubTab === 'all' || accessSubTab === 'density') && (
        <VisualDensitySection
          messageDisplay={messageDisplay}
          setMessageDisplay={setMessageDisplay}
        />
      )}

      {(accessSubTab === 'all' || accessSubTab === 'roles') && (
        <RoleStylesSection
          roleColorStyle={roleColorStyle}
          setRoleColorStyle={setRoleColorStyle}
          showProfileBadges={showProfileBadges}
          setShowProfileBadges={setShowProfileBadges}
        />
      )}

      {(accessSubTab === 'all' || accessSubTab === 'color') && (
        <ColorContrastSection
          highContrast={highContrast}
          setHighContrast={setHighContrast}
          saturation={saturation}
          setSaturation={setSaturation}
          underlineLinks={underlineLinks}
          setUnderlineLinks={setUnderlineLinks}
          desaturateRoleColors={desaturateRoleColors}
          setDesaturateRoleColors={setDesaturateRoleColors}
        />
      )}

      {(accessSubTab === 'all' || accessSubTab === 'motion') && (
        <MotionSection
          reducedMotionMode={reducedMotionMode}
          setReducedMotionMode={setReducedMotionMode}
          autoplayGifs={autoplayGifs}
          setAutoplayGifs={setAutoplayGifs}
          animateEmojis={animateEmojis}
          setAnimateEmojis={setAnimateEmojis}
        />
      )}

      {(accessSubTab === 'all' || accessSubTab === 'tts') && (
        <TtsScreenreaderSection
          screenReaderSupport={screenReaderSupport}
          setScreenReaderSupport={setScreenReaderSupport}
          enableTts={enableTts}
          setEnableTts={setEnableTts}
          ttsSpeed={ttsSpeed}
          setTtsSpeed={setTtsSpeed}
          audioCues={audioCues}
          setAudioCues={setAudioCues}
          isSpeakingTts={isSpeakingTts}
          handleTestTts={handleTestTts}
        />
      )}

      {/* Reset */}
      <div className="flex justify-end pt-3">
        <button
          type="button"
          onClick={handleResetAccessibility}
          className="px-3.5 py-2 rounded-xl bg-[#0c0c10] hover:bg-amber-400/10 border border-amber-500/30 text-xs font-bold text-amber-400 hover:text-amber-200 transition flex items-center gap-2 cursor-pointer shadow-md"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Alle Barrierefreiheits-Einstellungen zurücksetzen</span>
        </button>
      </div>
    </div>
  );
}
