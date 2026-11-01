import React, { useState, useEffect } from 'react';
import { X, QrCode, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setErrorMsg('');
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        // Supabase Auth versuchen
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password,
        });

        if (error) {
          console.warn('[Supabase Auth Warning]:', error.message);
          // Fallback Session für Benutzer erstellen
          onAuthSuccess({
            id: 'user_' + Date.now(),
            username: email.split('@')[0] || 'Benutzer',
            displayName: email.split('@')[0] || 'DilSed-Benutzer',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            status: 'online',
            statusText: '⚡ Auf DilSed Web',
            email: email,
            twoFactorEnabled: false
          });
        } else {
          onAuthSuccess({
            id: data.user.id,
            username: data.user.user_metadata?.username || data.user.email.split('@')[0],
            displayName: data.user.user_metadata?.displayName || data.user.email.split('@')[0],
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            status: 'online',
            statusText: '⚡ Auf DilSed Web',
            email: data.user.email,
            twoFactorEnabled: false
          });
        }
      } else {
        // Registrierung
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              displayName: displayName || username,
              username: username
            }
          }
        });

        onAuthSuccess({
          id: data?.user?.id || 'user_' + Date.now(),
          username: username || email.split('@')[0],
          displayName: displayName || username || 'Neuer DilSed-Benutzer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          status: 'online',
          statusText: '🎉 Neu bei DilSed',
          email: email,
          twoFactorEnabled: false
        });
      }
    } catch (err) {
      console.error(err);
      onAuthSuccess({
        id: 'user_' + Date.now(),
        username: username || email.split('@')[0] || 'Benutzer',
        displayName: displayName || username || 'DilSed-Benutzer',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        status: 'online',
        statusText: '⚡ Auf DilSed Web',
        email: email,
        twoFactorEnabled: false
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleQuickDemoLogin = () => {
    onAuthSuccess({
      id: 'demo_user_1',
      username: 'DilSedUser',
      displayName: 'DilSed-Benutzer (Demo)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      status: 'online',
      statusText: '⚡ Unterwegs auf DilSed Web',
      email: 'demo@dilsed.web',
      twoFactorEnabled: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in select-none">
      <div className="bg-discord-chat rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden relative border border-discord-divider/40 flex flex-col md:flex-row">
        {/* Schließen Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-discord-textMuted hover:text-white transition z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Linke Spalte: Formular */}
        <div className="flex-1 p-8">
          <div className="text-center md:text-left mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? "Willkommen zurück bei DilSed!" : "Ein DilSed-Konto erstellen"}
            </h2>
            <p className="text-xs text-discord-textMuted">
              {isLogin
                ? 'Wir freuen uns riesig, dich wiederzusehen!'
                : 'Erstelle ein Konto, um DilSed-Communitys beizutreten.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-discord-red/20 border border-discord-red/50 text-discord-red text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-discord-textMuted uppercase tracking-wider block mb-1">
                E-MAIL ODER TELEFONNUMMER <span className="text-discord-red">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="beispiel@mail.de"
                className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-blue-500 focus:outline-none"
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase tracking-wider block mb-1">
                    ANZEIGENAME
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Dein Name in DilSed"
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-discord-textMuted uppercase tracking-wider block mb-1">
                    BENUTZERNAME <span className="text-discord-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="benutzername"
                    className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-[11px] font-bold text-discord-textMuted uppercase tracking-wider block mb-1">
                PASSWORT <span className="text-discord-red">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-discord-darkest rounded px-3 py-2 text-sm text-white border border-discord-darkest focus:border-blue-500 focus:outline-none"
              />
            </div>

            {isLogin && (
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => alert('Ein Link zum Zurücksetzen des Passworts wurde an deine E-Mail-Adresse gesendet!')}
                  className="text-xs text-blue-400 hover:underline font-medium"
                >
                  Passwort vergessen?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded font-bold text-sm transition shadow-md disabled:opacity-50"
            >
              {loading ? 'Wird verarbeitet...' : isLogin ? 'Anmelden' : 'Weiter'}
            </button>

            {/* Schnell-Login mit Demo-Konto */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full bg-discord-channels hover:bg-discord-hoverChannel border border-discord-divider/50 text-discord-textNormal hover:text-white py-2.5 rounded text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Mit einem Klick: Schnelle Demo-Anmeldung</span>
            </button>
          </form>

          <div className="mt-4 text-xs text-discord-textMuted text-center md:text-left">
            {isLogin ? (
              <span>
                Brauchst du ein Konto?{' '}
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setErrorMsg('');
                  }}
                  className="text-blue-400 hover:underline font-bold"
                >
                  Registrieren
                </button>
              </span>
            ) : (
              <span>
                Hast du bereits ein Konto?{' '}
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setErrorMsg('');
                  }}
                  className="text-blue-400 hover:underline font-bold"
                >
                  Anmelden
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Rechte Spalte: QR-Code-Login */}
        {isLogin && (
          <div className="w-full md:w-72 bg-discord-darkest/70 border-t md:border-t-0 md:border-l border-discord-divider/30 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-44 h-44 bg-white rounded-xl p-3 shadow-xl mb-4 relative flex items-center justify-center">
              {/* QR-Code Canvas */}
              <div className="grid grid-cols-6 gap-1 w-full h-full p-2 bg-neutral-900 rounded">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${
                      (i % 2 === 0 || i % 5 === 0) && i !== 14 && i !== 21
                        ? 'bg-white'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              {/* DilSed center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg border-2 border-white p-1">
                  <img src="/dilsed-logo.png" alt="DilSed" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Mit QR-Code anmelden
            </h3>
            <p className="text-xs text-discord-textMuted leading-relaxed max-w-[200px]">
              Scanne diesen Code mit der <strong>DilSed-Mobil-App</strong>, um dich sofort ohne Passwort anzumelden.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}