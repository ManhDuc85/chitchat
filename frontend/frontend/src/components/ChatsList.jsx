import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-[#5E8E62] border-4 border-black p-4 cursor-pointer hover:bg-[#6FA073] transition-all shadow-mc hover:translate-y-[-2px] active:translate-y-1 mb-3"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-black shadow-mc overflow-hidden bg-[#2F5F2F]">
                <img 
                  src={chat.profilePic || "/avatar.png"} 
                  alt={chat.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {onlineUsers.includes(chat._id) && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4CAF50] border-2 border-black animate-mcPulse" />
              )}
            </div>
            <h4 className="text-white font-bold text-2xl truncate" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;