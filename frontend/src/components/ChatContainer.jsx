import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import FloatingParticles from "./FloatingParticles";
import TypingIndicator from "./TypingIndicator";
import { ChevronDown, Reply, Download, FileText } from "lucide-react"; 

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

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

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

  // Helper to force download for any file type
  const downloadMedia = async (url, originalFileName) => {
    try {
      // Use original filename from DB if available, else try to guess from URL
      let filename = originalFileName;
      
      if (!filename) {
         const urlParts = url.split('/');
         const lastPart = urlParts[urlParts.length - 1];
         if (lastPart.includes('.')) {
            filename = lastPart; 
         } else {
            filename = 'download.bin';
         }
      }

      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename; // Use the correct name (e.g., "hw.pdf")
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed, opening in new tab", err);
      window.open(url, '_blank');
    }
  };
  // const downloadMedia = async (url, defaultName = 'download') => {
  //   try {
  //     // Attempt to extract extension from URL (e.g., .../upload/v123/file.pdf)
  //     let filename = defaultName;
  //     const urlParts = url.split('/');
  //     const lastPart = urlParts[urlParts.length - 1];
  //     if (lastPart.includes('.')) {
  //        filename = lastPart; // Use the actual name from Cloudinary if possible
  //     }

  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const blobUrl = window.URL.createObjectURL(blob);
      
  //     const link = document.createElement('a');
  //     link.href = blobUrl;
  //     link.download = filename;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(blobUrl);
  //   } catch (err) {
  //     console.error("Download failed, opening in new tab", err);
  //     window.open(url, '_blank');
  //   }
  // };

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
                    
                    <button
                      onClick={() => setReplyTo(msg)}
                      className="opacity-0 group-hover:opacity-100 transition-all bg-[#C6C6C6] border-2 border-black p-1 shadow-mc active:translate-y-1 hover:bg-[#DEDEDE]"
                      title="Reply"
                    >
                      <Reply size={16} className="text-black" />
                    </button>

                    <div className={`
                      relative border-4 border-black shadow-mc-lg w-auto max-w-[85%] min-w-[120px]
                      ${msg.senderId === authUser._id ? "bg-[#5E8E62]" : "bg-[#8B7355]"}
                    `}>
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

                      <div className="p-4 bg-opacity-90">
                        
                        {msg.replyTo && (
                          <div className="mb-3 bg-black/20 border-l-4 border-[#31251B] p-2 text-lg overflow-hidden">
                            <p className="font-bold text-[#FFD700] mb-0.5" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
                              @{msg.replyTo.senderId?.fullName || msg.replyTo.senderName || "User"}
                            </p>
                            <p className="whitespace-pre-wrap text-white/70 line-clamp-2 italic leading-tight">
                              {msg.replyTo.text || (msg.replyTo.image ? "Sent an image" : msg.replyTo.video ? "Sent a video" : msg.replyTo.file ? "Sent a file" : "...") }
                            </p>
                          </div>
                        )}

                        {/* --- IMAGE DISPLAY --- */}
                        {msg.image && (
                          <div className="relative group/media mb-2">
                            <img 
                              src={msg.image} 
                              alt="Shared" 
                              className="border-4 border-black max-h-64 object-contain shadow-mc" 
                            />
                            <button 
                              onClick={() => downloadMedia(msg.image, msg.fileName || 'image.jpg')} 
                              // onClick={() => downloadMedia(msg.image, 'image.jpg')}
                              className="absolute top-2 right-2 p-2 bg-white/80 border-2 border-black hover:bg-white shadow-mc transition-opacity opacity-0 group-hover/media:opacity-100"
                              title="Download Image"
                            >
                              <Download size={20} className="text-black" />
                            </button>
                          </div>
                        )}

                        {/* --- VIDEO DISPLAY --- */}
                        {msg.video && (
                          <div className="relative group/media mb-2 w-full max-w-sm">
                            <video 
                              src={msg.video} 
                              controls 
                              className="border-4 border-black w-full shadow-mc bg-black"
                            />
                             <button 
                              onClick={() => downloadMedia(msg.video, msg.fileName || 'video.mp4')}
                              // onClick={() => downloadMedia(msg.video, 'video.mp4')}
                              className="absolute top-2 right-2 p-2 bg-white/80 border-2 border-black hover:bg-white shadow-mc z-20 transition-opacity opacity-0 group-hover/media:opacity-100"
                              title="Download Video"
                            >
                              <Download size={20} className="text-black" />
                            </button>
                          </div>
                        )}

                        {/* --- FILE DISPLAY --- */}
                        {msg.file && (
                          <div className="mb-2 flex items-center gap-3 bg-black/30 p-3 border-2 border-black/50 rounded shadow-mc max-w-xs sm:max-w-sm">
                            <div className="p-3 bg-white border-2 border-black shrink-0">
                              <FileText size={32} className="text-black" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                              <span className="text-white font-bold truncate text-lg">
                                {/* Prefer saved fileName, fallback to URL logic */}
                                {msg.fileName || msg.file.split('/').pop().split(/[?#]/)[0] || "Attachment"}
                                {/* {msg.file.split('/').pop().split(/[?#]/)[0] || "Attachment"} */}
                              </span>
                              <span className="text-gray-300 text-sm">Click arrow to download</span>
                            </div>
                            <button 
                              onClick={() => downloadMedia(msg.file, msg.fileName || 'file.bin')}
                              // onClick={() => downloadMedia(msg.file, 'file.bin')}
                              className="p-3 bg-[#C6C6C6] hover:bg-white border-4 border-black shadow-mc active:translate-y-1 transition-colors shrink-0"
                              title="Download File"
                            >
                              <Download size={24} className="text-black" />
                            </button>
                          </div>
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
// import { useEffect, useRef, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { useChatStore } from "../store/useChatStore";
// import ChatHeader from "./ChatHeader";
// import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
// import MessageInput from "./MessageInput";
// import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
// import FloatingParticles from "./FloatingParticles";
// import TypingIndicator from "./TypingIndicator";
// import { ChevronDown, Reply, Download, FileText, PlayCircle } from "lucide-react"; 
// // import { ChevronDown, Reply } from "lucide-react";

// function ChatContainer() {
//   const {
//     selectedUser,
//     getMessagesByUserId,
//     messages,
//     isMessagesLoading,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//     setReplyTo, 
//   } = useChatStore();
//   const { authUser } = useAuthStore();
  
//   const messageEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);
//   const [isTyping, setIsTyping] = useState(false);
//   const [showScrollButton, setShowScrollButton] = useState(false);

//   // 1. Lấy tin nhắn và đăng ký socket khi đổi người chat
//   useEffect(() => {
//     getMessagesByUserId(selectedUser._id);
//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser._id, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

//   // 2. Tự động cuộn xuống khi có tin nhắn mới hoặc đối phương đang gõ
//   useEffect(() => {
//     if (messageEndRef.current && messages.length > 0) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, isTyping]);

//   // 3. Theo dõi sự kiện cuộn để hiển thị nút "Cuộn xuống đáy"
//   useEffect(() => {
//     const container = messagesContainerRef.current;
//     if (!container) return;

//     const handleScroll = () => {
//       const { scrollTop, scrollHeight, clientHeight } = container;
//       // Nếu người dùng cuộn lên cách đáy hơn 150px thì hiện nút
//       setShowScrollButton(scrollHeight - scrollTop - clientHeight > 150);
//     };

//     container.addEventListener('scroll', handleScroll);
//     return () => container.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToBottom = () => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const handleTyping = (typing) => {
//     setIsTyping(typing);
//   };

//   // Helper to force download
//   const downloadMedia = async (url, filename = 'download') => {
//     try {
//       const response = await fetch(url);
//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//     } catch (err) {
//       console.error("Download failed, opening in new tab", err);
//       window.open(url, '_blank');
//     }
//   };

//   return (
//     <div className="flex-1 flex flex-col min-h-0 relative w-full">
//       {/* HEADER CỐ ĐỊNH */}
//       <ChatHeader />
      
//       {/* VÙNG CHỨA NỀN VÀ TIN NHẮN */}
//       <div className="flex-1 relative overflow-hidden flex flex-col bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355]">
        
//         {/* HIỆU ỨNG HẠT (STATIC BACKGROUND) */}
//         <FloatingParticles />

//         {/* VÙNG CUỘN TIN NHẮN (SCROLLABLE AREA) */}
//         <div 
//           ref={messagesContainerRef}
//           className="flex-1 overflow-y-auto py-6 scroll-smooth relative z-10 bg-transparent"
//         >
//           {messages.length > 0 && !isMessagesLoading ? (
//             <div className="w-full space-y-6 relative px-6 pb-12">
//               {messages.map((msg) => (
//                 <div
//                   key={msg._id}
//                   className={`flex w-full group ${msg.senderId === authUser._id ? "justify-end" : "justify-start"}`}
//                 >
//                   {/* Container bao bọc để hiển thị nút Reply khi hover */}
//                   <div className={`flex items-center gap-2 ${msg.senderId === authUser._id ? "flex-row" : "flex-row-reverse"}`}>
                    
//                     {/* NÚT REPLY KIỂU MINECRAFT - Hiện khi hover */}
//                     <button
//                       onClick={() => setReplyTo(msg)}
//                       className="opacity-0 group-hover:opacity-100 transition-all bg-[#C6C6C6] border-2 border-black p-1 shadow-mc active:translate-y-1 hover:bg-[#DEDEDE]"
//                       title="Reply"
//                     >
//                       <Reply size={16} className="text-black" />
//                     </button>

//                     {/* Cửa sổ tin nhắn kiểu Minecraft */}
//                     <div className={`
//                       relative border-4 border-black shadow-mc-lg w-auto max-w-[85%] min-w-[120px]
//                       ${msg.senderId === authUser._id ? "bg-[#5E8E62]" : "bg-[#8B7355]"}
//                     `}>
//                       {/* Thanh tiêu đề tin nhắn */}
//                       <div className={`
//                         flex items-center justify-between px-3 py-1 border-b-4 border-black
//                         ${msg.senderId === authUser._id ? "bg-[#2F5F2F]" : "bg-[#5C4033]"}
//                       `}>
//                         <div className="flex items-center gap-2">
//                           <div className="w-4 h-4 border-2 border-black bg-white" />
//                           <span className="text-xl text-white font-bold" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
//                             {msg.senderId === authUser._id ? "You" : selectedUser.fullName}
//                           </span>
//                         </div>
//                         <span className="text-lg text-gray-300 font-mono ml-4">
//                           {new Date(msg.createdAt).toLocaleTimeString(undefined, {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </span>
//                       </div>

//                       {/* Nội dung tin nhắn */}
//                       <div className="p-4 bg-opacity-90">
                        
//                         {/* HIỂN THỊ NỘI DUNG TRÍCH DẪN (REPLY CONTEXT) - Theme Green */}
//                         {msg.replyTo && (
//                           <div className="mb-3 bg-black/20 border-l-4 border-[#31251B] p-2 text-lg overflow-hidden">
//                             <p className="font-bold text-[#FFD700] mb-0.5" style={{textShadow: '1px 1px 0 rgba(0,0,0,1)'}}>
//                               @{msg.replyTo.senderId?.fullName || msg.replyTo.senderName || "User"}
//                             </p>
//                             <p className="text-white/70 line-clamp-2 italic leading-tight">
//                               {msg.replyTo.text || (msg.replyTo.image ? "Sent an image" : msg.replyTo.video ? "Sent a video" : msg.replyTo.file ? "Sent a file" : "...") }
//                             </p>
//                           </div>
//                         )}

//                         {/* --- IMAGE DISPLAY --- */}
//                         {msg.image && (
//                           <div className="relative group/media mb-2">
//                             <img 
//                               src={msg.image} 
//                               alt="Shared" 
//                               className="border-4 border-black max-h-64 object-contain shadow-mc" 
//                             />
//                             <button 
//                               onClick={() => downloadMedia(msg.image, 'image.jpg')}
//                               className="absolute top-2 right-2 p-2 bg-white/80 border-2 border-black hover:bg-white shadow-mc transition-opacity opacity-0 group-hover/media:opacity-100"
//                               title="Download Image"
//                             >
//                               <Download size={20} className="text-black" />
//                             </button>
//                           </div>
//                         )}

//                         {/* --- VIDEO DISPLAY --- */}
//                         {msg.video && (
//                           <div className="relative group/media mb-2 w-full max-w-sm">
//                             <video 
//                               src={msg.video} 
//                               controls 
//                               className="border-4 border-black w-full shadow-mc bg-black"
//                             />
//                              <button 
//                               onClick={() => downloadMedia(msg.video, 'video.mp4')}
//                               className="absolute top-2 right-2 p-2 bg-white/80 border-2 border-black hover:bg-white shadow-mc z-20 transition-opacity opacity-0 group-hover/media:opacity-100"
//                               title="Download Video"
//                             >
//                               <Download size={20} className="text-black" />
//                             </button>
//                           </div>
//                         )}

//                         {/* --- FILE DISPLAY --- */}
//                         {msg.file && (
//                           <div className="mb-2 flex items-center gap-3 bg-black/30 p-3 border-2 border-black/50 rounded shadow-mc">
//                             <div className="p-3 bg-white border-2 border-black">
//                               <FileText size={32} className="text-black" />
//                             </div>
//                             <div className="flex flex-col flex-1 min-w-0">
//                               <span className="text-white font-bold truncate text-lg">Attachment</span>
//                               <span className="text-gray-300 text-sm">Click to download</span>
//                             </div>
//                             <button 
//                               onClick={() => downloadMedia(msg.file, 'file_attachment')}
//                               className="p-3 bg-[#C6C6C6] hover:bg-white border-4 border-black shadow-mc active:translate-y-1 transition-colors"
//                               title="Download File"
//                             >
//                               <Download size={24} className="text-black" />
//                             </button>
//                           </div>
//                         )}


//                         {msg.text && (
//                           <p className="text-2xl leading-tight text-white break-words whitespace-pre-wrap"
//                             style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
//                             {msg.text}
//                           </p>
//                         )}
//                       </div>
                      
//                       <div className="absolute top-1 right-1 w-1 h-1 bg-white opacity-20" />
//                       <div className="absolute bottom-1 left-1 w-1 h-1 bg-black opacity-20" />
//                     </div>
//                   </div>
//                 </div>
//               ))}
              
//               <div ref={messageEndRef} className="h-2" />
//             </div>
//           ) : isMessagesLoading ? (
//             <MessagesLoadingSkeleton />
//           ) : (
//             <NoChatHistoryPlaceholder name={selectedUser.fullName} />
//           )}
//         </div>

//         {/* TYPING INDICATOR (ABSOLUTE OVERLAY) */}
//         <div className="absolute bottom-2 left-6 z-20 pointer-events-none">
//            <TypingIndicator isTyping={isTyping} />
//         </div>

//         {/* NÚT CUỘN NHANH (ABSOLUTE OVERLAY) */}
//         {showScrollButton && (
//           <button
//             onClick={scrollToBottom}
//             className="absolute bottom-12 right-8 w-12 h-12 bg-[#5E8E62] border-4 border-black flex items-center justify-center shadow-mc-lg hover:bg-[#6FA073] transition-all active:translate-y-1 z-50"
//           >
//             <ChevronDown className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//           </button>
//         )}
//       </div>

//       <MessageInput onTyping={handleTyping} />
//     </div>
//   );
// }

// export default ChatContainer;