import React from 'react';
import { PlusCircle, Smile, Send } from 'lucide-react';
import { POPULAR_EMOJIS } from './ChatMessageItem';

export default function ChatInputBar({
  channel,
  inputText,
  setInputText,
  inputRef,
  handleKeyDown,
  handleSubmit,
  onSendMessage,
  showEmojiPicker,
  setShowEmojiPicker,
}) {
  return (
    <div className="px-4 pb-6 pt-1 select-none">
      <div className="relative bg-[#0c0c10] rounded-xl flex items-center px-4 py-2.5 border border-amber-500/30 focus-within:border-amber-400 focus-within:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition">
        {/* File upload */}
        <button
          onClick={() => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                onSendMessage(
                  `📎 Datei geteilt: **${file.name}** (${(file.size / 1024).toFixed(1)} KB)`
                );
              }
            };
            fileInput.click();
          }}
          className="text-amber-400 hover:text-amber-300 p-1 mr-2 rounded-full hover:bg-amber-400/15 transition cursor-pointer"
          title="Datei hochladen"
        >
          <PlusCircle className="w-5 h-5" />
        </button>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Nachricht an #${channel?.name || 'kanal'}`}
          className="bg-transparent flex-1 text-sm text-amber-100 placeholder:text-amber-200/40 focus:outline-none min-w-0 font-medium"
        />

        {/* Right Input Buttons (GIF, Emoji, Send) */}
        <div className="flex items-center gap-2 text-amber-400 pl-2">
          <button
            onClick={() => {
              onSendMessage('https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif');
            }}
            className="hover:text-neutral-950 hover:bg-amber-400 transition font-black text-xs text-amber-300 bg-amber-400/15 border border-amber-500/30 px-2 py-0.5 rounded shadow-sm cursor-pointer"
            title="GIF senden"
          >
            GIF
          </button>

          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-amber-400 hover:text-amber-300 transition p-1 hover:scale-110 cursor-pointer"
              title="Emoji-Auswahl"
            >
              <Smile className="w-5 h-5" />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 bg-[#0c0c10] border border-amber-500/30 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)] z-30 w-56 animate-in fade-in zoom-in-95">
                <div className="text-[10px] font-bold text-amber-300/80 uppercase tracking-wider mb-2">
                  Schnelle Emojis
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {POPULAR_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setInputText((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="text-xl p-1 hover:bg-white/10 rounded-lg hover:scale-125 transition cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {inputText.trim() && (
            <button
              onClick={handleSubmit}
              className="p-1.5 text-neutral-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 rounded-lg transition shadow-md shadow-amber-500/25 font-bold cursor-pointer"
              title="Senden"
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
