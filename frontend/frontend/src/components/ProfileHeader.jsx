import { useState, useRef } from "react";
import { LogOut, VolumeX, Volume2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-6 border-b-4 border-black bg-gradient-to-r from-[#4A7C4E] to-[#3A6A3F]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative">
            <button
              className="w-16 h-16 border-4 border-black shadow-mc overflow-hidden relative group cursor-pointer bg-[#2F5F2F]"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm font-bold" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                  CHANGE
                </span>
              </div>
            </button>
            
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#4CAF50] border-2 border-black animate-mcPulse" />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-white font-bold text-2xl max-w-[180px] truncate" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
              {authUser.fullName}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-[#4CAF50] border border-black" />
              <p className="text-white text-lg font-bold" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                ONLINE
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2 items-center">
          {/* SOUND TOGGLE BTN */}
          <button
            className="w-12 h-12 bg-[#8B7355] border-4 border-black hover:bg-[#9B8365] transition-colors shadow-mc active:translate-y-1 flex items-center justify-center"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
            ) : (
              <VolumeX className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
            )}
          </button>

          {/* LOGOUT BTN */}
          <button
            className="w-12 h-12 bg-[#D32F2F] border-4 border-black hover:bg-[#E53935] transition-colors shadow-mc active:translate-y-1 flex items-center justify-center"
            onClick={logout}
          >
            <LogOut className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;