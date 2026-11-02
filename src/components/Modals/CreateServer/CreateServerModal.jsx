import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playJoinVoiceSound } from '../../../soundEffects';
import { generateTemplateCategories } from './serverTemplates';
import TemplatesStep from './TemplatesStep';
import AudienceStep from './AudienceStep';
import CustomizeStep from './CustomizeStep';
import JoinStep from './JoinStep';

export default function CreateServerModal({
  isOpen,
  onClose,
  onCreateServer,
  onJoinInvite,
  currentUser
}) {
  const [step, setStep] = useState('templates'); // 'templates' | 'audience' | 'customize' | 'join'
  const [selectedTemplate, setSelectedTemplate] = useState('Meine');
  const [audienceType, setAudienceType] = useState('friends'); // 'friends' | 'community'
  const [serverName, setServerName] = useState('');
  const [serverIcon, setServerIcon] = useState('');
  const [inviteInput, setInviteInput] = useState('');
  const [inviteError, setInviteError] = useState('');
  const fileInputRef = useRef(null);

  // Set default server name based on current user
  useEffect(() => {
    if (currentUser?.displayName) {
      setServerName(`${currentUser.displayName}s Server`);
    } else {
      setServerName('Neuer DilSed-Server');
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setServerIcon(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectTemplate = (templateName) => {
    setSelectedTemplate(templateName);
    if (templateName === 'Meine') {
      setServerName(`${currentUser?.displayName || 'Benutzer'}s Server`);
    } else {
      setServerName(`${templateName}-Server`);
    }
    setStep('audience');
  };

  const handleSelectAudience = (type) => {
    setAudienceType(type);
    setStep('customize');
  };

  const handleFinalCreate = (e) => {
    e.preventDefault();
    if (!serverName.trim()) return;

    const initials = serverName
      .trim()
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 3)
      .toUpperCase();

    const newServer = {
      id: 'server_' + Date.now(),
      name: serverName.trim(),
      acronym: initials || 'DS',
      icon: serverIcon || null,
      banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
      unread: 0,
      audience: audienceType,
      template: selectedTemplate,
      categories: generateTemplateCategories(selectedTemplate),
    };

    onCreateServer(newServer);
    playJoinVoiceSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    onClose();
    setStep('templates');
    setServerIcon('');
  };

  const handleJoinByInvite = (e) => {
    e.preventDefault();
    setInviteError('');

    const trimmed = inviteInput.trim();
    if (!trimmed) {
      setInviteError('Bitte gib einen gültigen Einladungslink oder Code ein.');
      return;
    }

    if (onJoinInvite) {
      onJoinInvite(trimmed);
      playJoinVoiceSound();
      confetti({ particleCount: 60 });
      onClose();
      setStep('templates');
      setInviteInput('');
    } else {
      alert(`Mit der Einladung "${trimmed}" bist du dem Server erfolgreich beigetreten!`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-[#0a0a0d] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.18)] w-full max-w-md overflow-hidden relative border border-amber-500/30 flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-amber-200/60 hover:text-amber-400 transition z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'templates' && (
          <TemplatesStep
            handleSelectTemplate={handleSelectTemplate}
            setStep={setStep}
          />
        )}

        {step === 'audience' && (
          <AudienceStep
            handleSelectAudience={handleSelectAudience}
            setStep={setStep}
          />
        )}

        {step === 'customize' && (
          <CustomizeStep
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            serverIcon={serverIcon}
            setServerIcon={setServerIcon}
            serverName={serverName}
            setServerName={setServerName}
            handleFinalCreate={handleFinalCreate}
            setStep={setStep}
          />
        )}

        {step === 'join' && (
          <JoinStep
            inviteInput={inviteInput}
            setInviteInput={setInviteInput}
            inviteError={inviteError}
            handleJoinByInvite={handleJoinByInvite}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
}
