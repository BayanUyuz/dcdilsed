import React from 'react';
import ProfileDetailsSection from '../profile/ProfileDetailsSection';
import ProfileDesignSection from '../profile/ProfileDesignSection';
import ProfileAboutStatusSection from '../profile/ProfileAboutStatusSection';
import ProfileCardPreview from '../profile/ProfileCardPreview';

export default function ProfileTab({
  profileSubTab,
  setProfileSubTab,
  servers,
  selectedServerForProfile,
  setSelectedServerForProfile,
  displayName,
  setDisplayName,
  serverNickname,
  setServerNickname,
  pronouns,
  setPronouns,
  avatar,
  setAvatar,
  avatarDecoration,
  setAvatarDecoration,
  bannerColor1,
  setBannerColor1,
  bannerColor2,
  setBannerColor2,
  bannerImage,
  setBannerImage,
  bio,
  setBio,
  statusPresence,
  setStatusPresence,
  statusText,
  setStatusText,
  statusEmoji,
  setStatusEmoji,
  showStatusEmojiPicker,
  setShowStatusEmojiPicker,
  usernameInput,
  hasUnsavedChanges,
  setHasUnsavedChanges,
  avatarFileRef,
  bannerFileRef,
  handleAvatarFile,
  handleBannerFile,
  handleSaveProfileChanges,
  handleResetProfile,
}) {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
          Profile
        </h2>
        <p className="text-xs text-amber-300/70 font-medium">
          Passe dein Aussehen, deine Biografie und deinen Status auf DilSed oder für bestimmte Server an.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-4 border-b border-amber-500/20 pb-3 mb-6">
        <button
          onClick={() => setProfileSubTab('user')}
          className={`pb-1 text-sm font-bold transition border-b-2 cursor-pointer ${
            profileSubTab === 'user'
              ? 'border-amber-400 text-amber-200'
              : 'border-transparent text-amber-300/60 hover:text-amber-200'
          }`}
        >
          Benutzerprofil (Global)
        </button>
        <button
          onClick={() => setProfileSubTab('server')}
          className={`pb-1 text-sm font-bold transition border-b-2 cursor-pointer ${
            profileSubTab === 'server'
              ? 'border-amber-400 text-amber-200'
              : 'border-transparent text-amber-300/60 hover:text-amber-200'
          }`}
        >
          Server-Profile (Serverspezifisch)
        </button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={avatarFileRef}
        type="file"
        accept="image/*"
        onChange={handleAvatarFile}
        className="hidden"
      />
      <input
        ref={bannerFileRef}
        type="file"
        accept="image/*"
        onChange={handleBannerFile}
        className="hidden"
      />

      {/* Two Column Layout: Editor (Left) & Real-time Profile Card Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-5">
          {profileSubTab === 'server' && (
            <div className="bg-[#0c0c10] p-4 rounded-xl border border-amber-500/20 mb-2">
              <label className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-1.5">
                WÄHLE EINEN SERVER
              </label>
              <select
                value={selectedServerForProfile}
                onChange={(e) => setSelectedServerForProfile(e.target.value)}
                className="w-full bg-[#070709] rounded-lg px-3 py-2 text-xs text-amber-100 border border-amber-500/30 focus:border-amber-400 focus:outline-none cursor-pointer"
              >
                {servers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <ProfileDetailsSection
            profileSubTab={profileSubTab}
            displayName={displayName}
            setDisplayName={setDisplayName}
            serverNickname={serverNickname}
            setServerNickname={setServerNickname}
            pronouns={pronouns}
            setPronouns={setPronouns}
            avatar={avatar}
            setAvatar={setAvatar}
            avatarDecoration={avatarDecoration}
            setAvatarDecoration={setAvatarDecoration}
            setHasUnsavedChanges={setHasUnsavedChanges}
            avatarFileRef={avatarFileRef}
          />

          <ProfileDesignSection
            bannerColor1={bannerColor1}
            setBannerColor1={setBannerColor1}
            bannerColor2={bannerColor2}
            setBannerColor2={setBannerColor2}
            bannerImage={bannerImage}
            setBannerImage={setBannerImage}
            bannerFileRef={bannerFileRef}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />

          <ProfileAboutStatusSection
            bio={bio}
            setBio={setBio}
            statusText={statusText}
            setStatusText={setStatusText}
            statusEmoji={statusEmoji}
            setStatusEmoji={setStatusEmoji}
            statusPresence={statusPresence}
            setStatusPresence={setStatusPresence}
            showStatusEmojiPicker={showStatusEmojiPicker}
            setShowStatusEmojiPicker={setShowStatusEmojiPicker}
            setHasUnsavedChanges={setHasUnsavedChanges}
          />
        </div>

        <ProfileCardPreview
          bannerImage={bannerImage}
          bannerColor1={bannerColor1}
          bannerColor2={bannerColor2}
          avatar={avatar}
          avatarDecoration={avatarDecoration}
          statusPresence={statusPresence}
          displayName={displayName}
          usernameInput={usernameInput}
          pronouns={pronouns}
          statusEmoji={statusEmoji}
          statusText={statusText}
          bio={bio}
        />
      </div>

      {/* Floating Unsaved Changes Bar */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0c0c10] border-2 border-amber-500/50 shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between gap-6 z-50 animate-in slide-in-from-bottom-5">
          <span className="text-xs text-amber-200 font-bold">
            Vorsicht — du hast ungespeicherte Änderungen!
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetProfile}
              className="text-xs text-amber-300/70 hover:text-amber-200 font-medium cursor-pointer"
            >
              Zurücksetzen
            </button>
            <button
              onClick={handleSaveProfileChanges}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 text-neutral-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition cursor-pointer"
            >
              Änderungen speichern
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
