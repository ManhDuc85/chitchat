import { useEffect, useRef, useState } from "react"; // Changed code
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import FloatingParticles from "./FloatingParticles";
import TypingIndicator from "./TypingIndicator";
import { ChevronDown, Reply, FileText } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    setReplyTo, 
  } = useChatStore();
  const { authUser } = useAuthStore();
  
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // --- HELPER 1: Check if file is a video ---
  const isVideoFile = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i) || url.startsWith("data:video/");
  };

  // --- HELPER 2: Force Download for Cloudinary URLs ---
  const getDownloadUrl = (url) => {
    if (!url) return "#";
    // If it is a Cloudinary URL, inject the 'fl_attachment' flag to force download
    if (typeof url === 'string' && url.includes("cloudinary.com") && url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }
    return url;
  };

  // 1. Fetch messages
  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  // 2. Auto scroll
  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // 3. Scroll button logic
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
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
      <ChatHeader />
      
      <div className="flex-1 relative overflow-hidden flex flex-col bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355]">
        
        <FloatingParticles />

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
                  <div className={`flex items-center gap-2 ${msg.senderId === authUser._id ? "flex-row" : "flex-row-reverse"}`}>
                    
                    {/* REPLY BUTTON */}
                    <button
                      onClick={() => setReplyTo(msg)}
                      className="opacity-0 group-hover:opacity-100 transition-all bg-[#C6C6C6] border-2 border-black p-1 shadow-mc active:translate-y-1 hover:bg-[#DEDEDE]"
                      title="Reply"
                    >
                      <Reply size={16} className="text-black" />
                    </button>

                    {/* MESSAGE BUBBLE */}
                    <div className={`
                      relative border-4 border-black shadow-mc-lg w-auto max-w-[85%] min-w-[120px]
                      ${msg.senderId === authUser._id ? "bg-[#5E8E62]" : "bg-[#8B7355]"}
                    `}>
                      {/* TITLE BAR */}
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

                      {/* MESSAGE CONTENT */}
                      <div className="p-4 bg-opacity-90">
                        
                        {/* REPLY CONTEXT */}
                        {msg.replyTo && (
                          <div className="mb-3 bg-black/20 border-l-4 border-[#31251B] p-2 text-lg overflow-hidden">
                            <p className="font-bold text-[#FFD700] mb-0.5" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                              @{msg.replyTo.senderId?.fullName || msg.replyTo.senderName || "User"}
                            </p>
                            <p className="text-white/70 line-clamp-2 italic leading-tight">
                              {msg.replyTo.text || (msg.replyTo.image ? "Sent an image" : (msg.replyTo.file ? "Sent a file" : "...")) }
                            </p>
                          </div>
                        )}

                        {/* --- 1. IMAGE DISPLAY --- */}
                        {msg.image && (
                          <img 
                            src={msg.image} 
                            alt="Shared" 
                            className="border-4 border-black mb-2 max-h-64 object-contain shadow-mc bg-black/20" 
                          />
                        )}

                        {/* --- 2. FILE / VIDEO DISPLAY --- */}
                        {msg.file && (
                          <div className="mb-2">
                             {isVideoFile(msg.file) ? (
                                // VIDEO PLAYER
                                <div className="border-4 border-black bg-black shadow-mc overflow-hidden">
                                  <video 
                                    src={msg.file} 
                                    controls 
                                    className="max-h-64 max-w-full w-full object-contain"
                                  />
                                </div>
                             ) : (
                                // FILE DOWNLOAD CARD (FIXED)
                                <a 
                                  href={getDownloadUrl(msg.file)} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  download // Hint to browser
                                  className="flex items-center gap-3 bg-[#E3DAC9] p-2 border-4 border-black shadow-mc hover:bg-[#F0E6D2] transition-colors group/file text-black"
                                >
                                  <div className="w-10 h-10 bg-[#8B7355] border-2 border-black flex items-center justify-center shrink-0">
                                    <FileText className="text-white w-6 h-6" />
                                  </div>
                                  <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-sm uppercase tracking-wide truncate">
                                      Attached File
                                    </span>
                                    <span className="text-xs font-mono text-[#5C4033] underline">
                                      Click to Download
                                    </span>
                                  </div>
                                </a>
                             )}
                          </div>
                        )}

                        {/* --- 3. TEXT DISPLAY --- */}
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

        <div className="absolute bottom-2 left-6 z-20 pointer-events-none">
           <TypingIndicator isTyping={isTyping} />
        </div>

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