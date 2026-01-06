import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* Title Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-[#8B6F47] to-[#6B5433] border-b-4 border-black flex items-center justify-between px-4 z-50">
          <span className="text-2xl font-bold text-white" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
            MINECRAFT CHAT
          </span>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-[#5E8E62] border-2 border-black flex items-center justify-center cursor-pointer hover:brightness-110">
              <span className="text-white text-lg leading-none">−</span>
            </div>
            <div className="w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center cursor-pointer hover:brightness-110">
              <span className="text-white text-lg leading-none">×</span>
            </div>
          </div>
        </div>

        {/* Main Content - ĐÃ SỬA: Thêm w-full để dãn hết chiều ngang */}
        <div className="flex w-full pt-10 h-full">
          {/* LEFT SIDE */}
          <div className="w-80 bg-gradient-to-b from-[#2F5F2F] via-[#3A6A3F] to-[#4A7C4E] border-r-4 border-black flex flex-col shrink-0">
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE - ĐÃ SỬA: Đảm bảo flex-1 và w-full để chiếm trọn phần còn lại */}
          <div className="flex-1 w-full flex flex-col bg-gradient-to-b from-[#3A6A3F] to-[#8B7355] overflow-hidden">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;