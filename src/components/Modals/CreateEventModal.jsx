import React, { useState } from 'react';
import { X, Calendar, Radio, MapPin, Clock, FileText, Check } from 'lucide-react';

export default function CreateEventModal({ isOpen, onClose, server, onCreateEvent }) {
  const [eventType, setEventType] = useState('voice'); // 'voice' | 'text' | 'external'
  const [eventTopic, setEventTopic] = useState('');
  const [selectedChannel, setSelectedChannel] = useState(
    server?.categories?.find((c) => c.channels.some((ch) => ch.type === 'voice'))?.channels[0]?.name || 'Allgemeiner Sprachraum'
  );
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState('20:00');
  const [description, setDescription] = useState('');

  if (!isOpen || !server) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventTopic.trim()) return;

    if (onCreateEvent) {
      onCreateEvent({
        id: 'event_' + Date.now(),
        topic: eventTopic.trim(),
        type: eventType,
        channel: selectedChannel,
        startDate,
        startTime,
        description,
      });
    }

    alert(`🎉 Das Event "${eventTopic}" wurde erfolgreich für den ${startDate} um ${startTime} Uhr geplant!`);
    onClose();
    setEventTopic('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-discord-divider/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-discord-blurple" />
            <h2 className="text-xl font-bold text-white">Event erstellen</h2>
          </div>
          <p className="text-xs text-discord-textMuted mb-6">
            Plane ein Sprachtreffen, Turnier oder ein Q&A für deine Community.
          </p>

          {/* Event Location Selection */}
          <div className="space-y-2 mb-5">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block">
              WO FINDET DEIN EVENT STATT?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setEventType('voice')}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center gap-3 ${
                  eventType === 'voice'
                    ? 'bg-discord-darkest border-discord-blurple'
                    : 'bg-discord-channels/60 border-discord-divider/40 hover:bg-discord-channels'
                }`}
              >
                <Radio className="w-5 h-5 text-discord-green" />
                <div>
                  <div className="text-xs font-bold text-white">Sprachkanal</div>
                  <div className="text-[10px] text-discord-textMuted">In einem Sprachkanal auf dem Server</div>
                </div>
              </div>

              <div
                onClick={() => setEventType('external')}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center gap-3 ${
                  eventType === 'external'
                    ? 'bg-discord-darkest border-discord-blurple'
                    : 'bg-discord-channels/60 border-discord-divider/40 hover:bg-discord-channels'
                }`}
              >
                <MapPin className="w-5 h-5 text-[#f38688]" />
                <div>
                  <div className="text-xs font-bold text-white">Woanders</div>
                  <div className="text-[10px] text-discord-textMuted">Externer Stream oder Link</div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Topic */}
          <div className="mb-4">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              EVENT-THEMA <span className="text-discord-red">*</span>
            </label>
            <input
              type="text"
              required
              value={eventTopic}
              onChange={(e) => setEventTopic(e.target.value)}
              placeholder="z. B. Wöchentliches Community-Meeting oder Spieleabend"
              className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
            />
          </div>

          {/* Date & Time Picker */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                STARTDATUM
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
                STARTZEIT
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
              BESCHREIBUNG (OPTIONAL)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Gib deinen Mitgliedern weitere Infos zu deinem Event..."
              className="w-full bg-discord-darkest rounded p-3 text-xs text-white border border-discord-darkest focus:border-discord-blurple focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-discord-divider/30">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-white hover:underline"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!eventTopic.trim()}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-5 py-2 rounded text-xs font-semibold transition disabled:opacity-50"
            >
              Event planen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
