import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import FloatingParticles from "./FloatingParticles";
import TypingIndicator from "./TypingIndicator";
import { ChevronDown, Reply } from "lucide-react"; // Import thêm Reply icon

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    setReplyTo, // Thêm hàm để kích hoạt trạng thái trả lời
  } = useChatStore();
  const { authUser } = useAuthStore();
  
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 1. Lấy tin nhắn và đăng ký socket khi đổi người chat
  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  // 2. Tự động cuộn xuống khi có tin nhắn mới hoặc đối phương đang gõ
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // 3. Theo dõi sự kiện cuộn để hiển thị nút "Cuộn xuống đáy"
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Nếu người dùng cuộn lên cách đáy hơn 150px thì hiện nút
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTyping = (typing) => {
    setIsTyping(typing);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative w-full">
      {/* HEADER CỐ ĐỊNH */}
      <ChatHeader />
      
      {/* VÙNG CHỨA NỀN VÀ TIN NHẮN */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355]">
        
        {/* HIỆU ỨNG HẠT (STATIC BACKGROUND) 
            Được đặt ở đây để luôn cố định tại khung nhìn, không bị trôi khi cuộn tin nhắn */}
        <FloatingParticles />

        {/* VÙNG CUỘN TIN NHẮN (SCROLLABLE AREA) */}
        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto py-6 scroll-smooth relative z-10 bg-transparent"
        >
          {messages.length > 0 && !isMessagesLoading ? (
            <div className="w-full space-y-6 relative px-6 pb-12">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`flex w-full group ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
                >
                  {/* Container bao bọc để hiển thị nút Reply khi hover */}
                  <div className={`flex items-center gap-2 ${msg.senderId === authUser._id ? "flex-row" : "flex-row-reverse"}`}>
                    
                    {/* NÚT REPLY KIỂU MINECRAFT - Hiện khi hover */}
                    <button
                      onClick={() => setReplyTo(msg)}
                      className="opacity-0 group-hover:opacity-100 transition-all bg-[#C6C6C6] border-2 border-black p-1 shadow-mc active:translate-y-1 hover:bg-[#DEDEDE]"
                      title="Reply"
                    >
                      <Reply size={16} className="text-black" />
                    </button>

                    {/* Cửa sổ tin nhắn kiểu Minecraft */}
                    <div className={`
                      relative border-4 border-black shadow-mc-lg w-auto max-w-[85%] min-w-[120px]
                      ${msg.senderId === authUser._id ? "bg-[#5E8E62]" : "bg-[#8B7355]"}
                    `}>
                      {/* Thanh tiêu đề tin nhắn */}
                      <div className={`
                        flex items-center justify-between px-3 py-1 border-b-4 border-black
                        ${msg.senderId === authUser._id ? "bg-[#2F5F2F]" : "bg-[#5C4033]"}
                      `}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-black bg-white" />
                          <span className="text-xl text-white font-bold" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
                            {msg.senderId === authUser._id ? "You" : selectedUser.fullName}
                          </span>
                        </div>
                        <span className="text-lg text-gray-300 font-mono ml-4">
                          {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Nội dung tin nhắn */}
                      <div className="p-4 bg-opacity-90">
                        
                        {/* HIỂN THỊ NỘI DUNG TRÍCH DẪN (REPLY CONTEXT) - Theme Green */}
                        {msg.replyTo && (
                          <div className="mb-3 bg-black/20 border-l-4 border-[#31251B] p-2 text-lg overflow-hidden">
                            <p className="font-bold text-[#FFD700] mb-0.5" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                              @{msg.replyTo.senderId?.fullName || msg.replyTo.senderName || "User"}
                            </p>
                            <p className="text-white/70 line-clamp-2 italic leading-tight">
                              {msg.replyTo.text || (msg.replyTo.image ? "Sent an image" : "...") }
                            </p>
                          </div>
                        )}

                        {msg.image && (
                          <img 
                            src={msg.image} 
                            alt="Shared" 
                            className="border-4 border-black mb-2 max-h-64 object-contain shadow-mc" 
                          />
                        )}
                        {msg.text && (
                          <p className="text-2xl leading-tight text-white break-words whitespace-pre-wrap"
                            style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
                            {msg.text}
                          </p>
                        )}
                      </div>
                      
                      <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-20" />
                      <div className="absolute bottom-1 left-1 w-1 h-1 bg-black opacity-20" />
                    </div>
                  </div>
                </div>
              ))}
              
              <div ref={messageEndRef} className="h-2" />
            </div>
          ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser.fullName} />
          )}
        </div>

        {/* TYPING INDICATOR (ABSOLUTE OVERLAY) */}
        <div className="absolute bottom-2 left-6 z-20 pointer-events-none">
           <TypingIndicator isTyping={isTyping} />
        </div>

        {/* NÚT CUỘN NHANH (ABSOLUTE OVERLAY) */}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-12 right-8 w-12 h-12 bg-[#5E8E62] border-4 border-black flex items-center justify-center shadow-mc-lg hover:bg-[#6FA073] transition-all active:translate-y-1 z-50"
          >
            <ChevronDown className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
          </button>
        )}
      </div>

      <MessageInput onTyping={handleTyping} />
    </div>
  );
}

export default ChatContainer;