import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import useIsMobile from "../hooks/useIsMobile.js";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const isMobile = useIsMobile();

  return (
    <div className="relative w-full max-w-6xl h-[95dvh] lg:h-[800px]">
      <BorderAnimatedContainer>
        {/* Main Content - ĐÃ SỬA: Thêm w-full để dãn hết chiều ngang */}
        <div className="flex w-full pt-0 h-full">
          {/* LEFT SIDE */}
          {isMobile && selectedUser ? null : (
              <div className="w-full md:w-80 bg-gradient-to-b from-[#2F5F2F] via-[#3A6A3F] to-[#4A7C4E] border-r-4 border-black flex flex-col shrink-0">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>
          )}

          {/* RIGHT SIDE - ĐÃ SỬA: Đảm bảo flex-1 và w-full để chiếm trọn phần còn lại */}
          <div className="flex-1 w-full flex flex-col bg-gradient-to-b from-[#3A6A3F] to-[#8B7355] overflow-hidden">
            {selectedUser ? <ChatContainer /> : (isMobile ? null : <NoConversationPlaceholder />)}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;