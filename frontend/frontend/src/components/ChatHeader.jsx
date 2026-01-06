import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    /* ĐÃ SỬA: Thêm w-full để dãn đều ra hai bên */
    <div className="w-full bg-gradient-to-r from-[#8B6F47] to-[#6B5433] border-b-4 border-black px-6 py-3 flex justify-between items-center shadow-mc shrink-0">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-black shadow-mc overflow-hidden">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4CAF50] border-2 border-black animate-mcPulse" />
          )}
        </div>

        <div>
          <h3 className="text-white font-bold text-2xl" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
            {selectedUser.fullName}
          </h3>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 border border-black ${isOnline ? 'bg-[#4CAF50]' : 'bg-[#666]'}`} />
            <p className="text-white text-lg font-bold" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
              {isOnline ? "ONLINE" : "OFFLINE"}
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setSelectedUser(null)}
        className="w-10 h-10 bg-[#D32F2F] border-4 border-black hover:bg-[#E53935] transition-colors shadow-mc active:translate-y-1 flex items-center justify-center"
      >
        <span className="text-white text-3xl font-bold leading-none" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>×</span>
      </button>
    </div>
  );
}

export default ChatHeader;