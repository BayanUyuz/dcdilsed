import React from 'react';

export default function ServerTemplateTab({
  templateName,
  setTemplateName,
  templateDesc,
  setTemplateDesc,
  templateUrl,
  copiedTemplate,
  setCopiedTemplate
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Servervorlage</h2>
      <p className="text-xs text-discord-textMuted mb-6">
        Erstelle eine Vorlage deiner Kanal- und Rollenstruktur, um sie zu teilen.
      </p>

      <div className="bg-discord-channels/60 rounded-xl p-5 border border-discord-divider/30 space-y-4">
        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            VORLAGEN-NAME
          </label>
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full bg-discord-darkest rounded px-3 py-2 text-xs text-white border border-discord-divider/30 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            VORLAGEN-BESCHREIBUNG
          </label>
          <textarea
            rows={2}
            value={templateDesc}
            onChange={(e) => setTemplateDesc(e.target.value)}
            className="w-full bg-discord-darkest rounded p-3 text-xs text-white border border-discord-divider/30 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-discord-textMuted uppercase block mb-1">
            VORLAGEN-LINK
          </label>
          <div className="flex items-center bg-discord-darkest rounded p-1.5 border border-discord-divider/30">
            <input
              type="text"
              readOnly
              value={templateUrl}
              className="bg-transparent flex-1 text-xs text-white font-mono px-2 focus:outline-none select-all"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(templateUrl);
                setCopiedTemplate(true);
                setTimeout(() => setCopiedTemplate(false), 2000);
              }}
              className="bg-discord-blurple hover:bg-discord-blurpleHover text-white px-4 py-1.5 rounded text-xs font-semibold transition cursor-pointer"
            >
              {copiedTemplate ? 'Kopiert!' : 'Kopieren'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
