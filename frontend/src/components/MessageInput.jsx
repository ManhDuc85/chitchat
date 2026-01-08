import { useRef, useState, useEffect } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Send, X, Paperclip, FileText, Image as ImageIcon, Film } from "lucide-react"; 

function MessageInput({ onTyping }) {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  
  // Unified state for any attachment type
  const [attachment, setAttachment] = useState(null); // { type: 'image'|'video'|'file', data: base64, name: string }

  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { sendMessage, isSoundEnabled, replyTo, clearReplyTo, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

    // inside your component...
  const textareaRef = useRef(null);

  // 1. The Magic Function
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to shrink if text was deleted
      textarea.style.height = "auto";
      // Set height to the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

// 2. Adjust height whenever the text changes
useEffect(() => {
  adjustHeight();
}, [text]); // Runs every time 'text' state updates

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !attachment) return;

    if (isSoundEnabled) playRandomKeyStrokeSound();

    // Determine which field to send based on the detected type
    sendMessage({
      text: text.trim(),
      image: attachment?.type === "image" ? attachment.data : null,
      video: attachment?.type === "video" ? attachment.data : null,
      file: attachment?.type === "file" ? attachment.data : null,
      fileName: attachment ? attachment.name : null, // Send the filename!
    });
    // sendMessage({
    //   text: text.trim(),
    //   image: attachment?.type === "image" ? attachment.data : null,
    //   video: attachment?.type === "video" ? attachment.data : null,
    //   file: attachment?.type === "file" ? attachment.data : null,
    // });

    setText("");
    setAttachment(null);

    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onTyping) onTyping(false);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (isSoundEnabled) playRandomKeyStrokeSound();
    
    if (onTyping) {
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
    }
  };

  // Single handler for ALL file types
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size checks
    if (file.type.startsWith("video/") && file.size > 50 * 1024 * 1024) {
       toast.error("Video size too large (Max 50MB)");
       return;
    }
    if (!file.type.startsWith("video/") && file.size > 20 * 1024 * 1024) {
       toast.error("File size too large (Max 20MB)");
       return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      let fileType = "file";
      if (file.type.startsWith("image/")) fileType = "image";
      else if (file.type.startsWith("video/")) fileType = "video";

      setAttachment({
        type: fileType,
        data: reader.result,
        name: file.name
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-6 py-4 border-t-4 border-black bg-[#2F5F2F] shadow-mc w-full relative">
      
      {/* REPLY PREVIEW */}
      {replyTo && (
        <div className="mb-3 bg-[#A88764] border-4 border-black p-3 flex items-center justify-between shadow-mc animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col border-l-4 border-[#5E4433] pl-3 overflow-hidden">
            <span className="text-[#31251B] text-lg font-bold uppercase tracking-tight" style={{textShadow: 'none'}}>
              Replying to {replyTo.senderId === authUser._id ? "Yourself" : (selectedUser?.fullName || "Friend")}
            </span>
            <p className="text-[#4A3B2C] text-xl truncate italic leading-tight">
               {replyTo.text || (replyTo.image ? "Attached Image" : replyTo.video ? "Attached Video" : replyTo.file ? "Attached File" : "...")}
            </p>
          </div>
          <button
            onClick={clearReplyTo}
            className="w-8 h-8 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc active:translate-y-1"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ATTACHMENT PREVIEW AREA */}
      {attachment && (
        <div className="w-full mb-3 flex items-center">
          <div className="relative bg-black/20 p-2 border-2 border-black/50 rounded flex items-center gap-2">
            
            {/* Image Preview */}
            {attachment.type === "image" && (
              <img
                src={attachment.data}
                alt="Preview"
                className="w-20 h-20 object-cover border-4 border-black shadow-mc"
              />
            )}
            
            {/* Video Preview */}
            {attachment.type === "video" && (
               <video 
                 src={attachment.data} 
                 className="w-20 h-20 object-cover border-4 border-black shadow-mc bg-black" 
                 muted
               />
            )}

            {/* File Preview */}
            {attachment.type === "file" && (
               <div className="w-20 h-20 bg-[#F5F5F5] border-4 border-black shadow-mc flex flex-col items-center justify-center p-1">
                  <FileText className="text-black w-8 h-8"/>
                  <span className="text-[8px] text-black text-center truncate w-full font-bold">{attachment.name.split('.').pop().toUpperCase()}</span>
               </div>
            )}
            
            <div className="flex flex-col justify-center h-20">
               <span className="text-white font-bold text-sm shadow-black drop-shadow-md truncate max-w-[150px]">
                 {attachment.name}
               </span>
               <span className="text-gray-300 text-xs uppercase">
                 {attachment.type}
               </span>
            </div>

            <button
              onClick={removeAttachment}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc z-10"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex gap-2">
      <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          className="flex-1 min-w-0 min-h-14 bg-[#4A7C4E] border-4 border-black px-4 py-2 text-white resize-none overflow-hidden
          text-2xl placeholder-[#a0c7a3] focus:outline-none shadow-mc-inner"
          placeholder="Type a message..."
          style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}
        />

        {/* SINGLE HIDDEN INPUT FOR ALL FILES */}
        <input 
          type="file" 
          accept="*" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
        />
        
        {/* UNIVERSAL ATTACHMENT BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-14 h-14 border-4 border-black flex items-center justify-center
            transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            ${attachment ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
          `}
          title="Attach file, image, or video"
        >
          <Paperclip className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
        
        {/* SEND BUTTON */}
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!text.trim() && !attachment}
          className={`
            px-6 h-14 border-4 border-black flex items-center gap-2 font-bold text-2xl
            transition-all shadow-mc
            ${(text.trim() || attachment)
              ? 'bg-[#5E8E62] hover:bg-[#6FA073] cursor-pointer active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]' 
              : 'bg-[#4A4A4A] cursor-not-allowed opacity-50'
            }
          `}
        >
          <span className="text-white hidden sm:inline" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>SEND</span>
          <Send className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
// import { useRef, useState } from "react";
// import useKeyboardSound from "../hooks/useKeyboardSound";
// import { useChatStore } from "../store/useChatStore";
// import { useAuthStore } from "../store/useAuthStore";
// import toast from "react-hot-toast";
// import { Image, Send, X, Film, Paperclip, FileText } from "lucide-react"; 
// // import { Image, Send, X } from "lucide-react";

// function MessageInput({ onTyping }) {
//   const { playRandomKeyStrokeSound } = useKeyboardSound();
//   const [text, setText] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [filePreview, setFilePreview] = useState(null); 
//   // const [imagePreview, setImagePreview] = useState(null);

//   const fileInputRef = useRef(null);
//   const videoInputRef = useRef(null);
//   const docInputRef = useRef(null);
//   const typingTimeoutRef = useRef(null);
//   // const fileInputRef = useRef(null);
//   // const typingTimeoutRef = useRef(null);

//   const { sendMessage, isSoundEnabled, replyTo, clearReplyTo, selectedUser } = useChatStore();
//   const { authUser } = useAuthStore();

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!text.trim() && !imagePreview && !videoPreview && !filePreview) return;
//     // if (!text.trim() && !imagePreview) return;

//     if (isSoundEnabled) playRandomKeyStrokeSound();

//     sendMessage({
//       text: text.trim(),
//       image: imagePreview,
//       video: videoPreview,
//       file: filePreview ? filePreview.data : null, // Send base64 data
//       fileName: filePreview ? filePreview.name : null, // Optional: useful if backend stores name
//     });
//     // sendMessage({
//     //   text: text.trim(),
//     //   image: imagePreview,
//     // });

//     setText("");
//     setImagePreview(null);
//     setVideoPreview(null);
//     setFilePreview(null);
//     // setImagePreview(null);

//     if (fileInputRef.current) fileInputRef.current.value = "";
//     if (videoInputRef.current) videoInputRef.current.value = "";
//     if (docInputRef.current) docInputRef.current.value = "";
//     // if (fileInputRef.current) fileInputRef.current.value = "";

//     if (onTyping) onTyping(false);
//   };

//   const handleInputChange = (e) => {
//     setText(e.target.value);
//     if (isSoundEnabled) playRandomKeyStrokeSound();
    
//     if (onTyping) {
//       onTyping(true);
//       if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
//       typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//       setVideoPreview(null); // Allow only one attachment type at a time for simplicity
//       setFilePreview(null);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("video/")) {
//       toast.error("Please select a video file");
//       return;
//     }

//     // Limit video size (e.g., 50MB check before reading)
//     if (file.size > 50 * 1024 * 1024) {
//       toast.error("Video size too large (Max 50MB)");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setVideoPreview(reader.result);
//       setImagePreview(null);
//       setFilePreview(null);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Limit file size
//     if (file.size > 20 * 1024 * 1024) {
//       toast.error("File size too large (Max 20MB)");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setFilePreview({
//         name: file.name,
//         data: reader.result,
//         type: file.type
//       });
//       setImagePreview(null);
//       setVideoPreview(null);
//     };
//     reader.readAsDataURL(file);
//   };

//   const removeAttachment = () => {
//     setImagePreview(null);
//     setVideoPreview(null);
//     setFilePreview(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//     if (videoInputRef.current) videoInputRef.current.value = "";
//     if (docInputRef.current) docInputRef.current.value = "";
//   };
//   // const removeImage = () => {
//   //   setImagePreview(null);
//   //   if (fileInputRef.current) fileInputRef.current.value = "";
//   // };

//   return (
//     <div className="px-6 py-4 border-t-4 border-black bg-[#2F5F2F] shadow-mc w-full relative">
      
//       {replyTo && (
//         <div className="mb-3 bg-[#A88764] border-4 border-black p-3 flex items-center justify-between shadow-mc animate-in slide-in-from-bottom-2 duration-200">
//           <div className="flex flex-col border-l-4 border-[#5E4433] pl-3 overflow-hidden">
//             <span className="text-[#31251B] text-lg font-bold uppercase tracking-tight" style={{textShadow: 'none'}}>
//               Replying to {replyTo.senderId === authUser._id ? "Yourself" : (selectedUser?.fullName || "Friend")}
//             </span>
//             <p className="text-[#4A3B2C] text-xl truncate italic leading-tight">
//                {replyTo.text || (replyTo.image ? "Attached Image" : replyTo.video ? "Attached Video" : replyTo.file ? "Attached File" : "...")}
//             </p>
//             {/* <p className="text-[#4A3B2C] text-xl truncate italic leading-tight">
//               {replyTo.text || (replyTo.image ? "Attached Image" : "...")}
//             </p> */}
//           </div>
//           <button
//             onClick={clearReplyTo}
//             className="w-8 h-8 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc active:translate-y-1"
//             type="button"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       )}

//       {/* PREVIEWS AREA */}
//       {(imagePreview || videoPreview || filePreview) && (
//         <div className="w-full mb-3 flex items-center">
//           <div className="relative bg-black/20 p-2 border-2 border-black/50 rounded">
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="w-20 h-20 object-cover border-4 border-black shadow-mc"
//               />
//             )}
//             {videoPreview && (
//                <video 
//                  src={videoPreview} 
//                  className="w-20 h-20 object-cover border-4 border-black shadow-mc" 
//                  muted
//                />
//             )}
//             {filePreview && (
//                <div className="w-20 h-20 bg-[#F5F5F5] border-4 border-black shadow-mc flex flex-col items-center justify-center p-1">
//                   <FileText className="text-black w-8 h-8"/>
//                   <span className="text-[8px] text-black text-center truncate w-full">{filePreview.name}</span>
//                </div>
//             )}

//             <button
//               onClick={removeAttachment}
//               className="absolute -top-2 -right-2 w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc z-10"
//               type="button"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}
//       {/* {imagePreview && (
//         <div className="w-full mb-3 flex items-center">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-20 h-20 object-cover border-4 border-black shadow-mc"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute -top-2 -right-2 w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc"
//               type="button"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )} */}

//       <div className="w-full flex gap-2">
//       {/* <div className="w-full flex gap-3"> */}
//         <input
//           type="text"
//           value={text}
//           onChange={handleInputChange}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' && !e.shiftKey) {
//               e.preventDefault();
//               handleSendMessage(e);
//             }
//           }}
//           className="flex-1 bg-[#4A7C4E] border-4 border-black px-4 py-2 text-white text-2xl placeholder-[#a0c7a3] focus:outline-none shadow-mc-inner"
//           placeholder="Type a message..."
//           style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}
//         />

//         {/* HIDDEN INPUTS */}
//         <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
//         <input type="file" accept="video/*" ref={videoInputRef} onChange={handleVideoChange} className="hidden" />
//         <input type="file" accept="*" ref={docInputRef} onChange={handleFileChange} className="hidden" />
        
//         {/* <input
//           type="file"
//           accept="image/*"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//           className="hidden"
//         /> */}

//         {/* IMAGE BTN */}
//         <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className={`
//             w-12 h-14 border-4 border-black flex items-center justify-center
//             transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
//             ${imagePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
//           `}
//         >
//           <Image className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//         </button>

//         {/* VIDEO BTN */}
//         <button
//           type="button"
//           onClick={() => videoInputRef.current?.click()}
//           className={`
//             w-12 h-14 border-4 border-black flex items-center justify-center
//             transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
//             ${videoPreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
//           `}
//         >
//           <Film className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//         </button>

//         {/* FILE BTN */}
//         <button
//           type="button"
//           onClick={() => docInputRef.current?.click()}
//           className={`
//             w-12 h-14 border-4 border-black flex items-center justify-center
//             transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
//             ${filePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
//           `}
//         >
//           <Paperclip className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//         </button>
        
//         {/* <button
//           type="button"
//           onClick={() => fileInputRef.current?.click()}
//           className={`
//             w-14 h-14 border-4 border-black flex items-center justify-center
//             transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
//             ${imagePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
//           `}
//         >
//           <Image className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//         </button> */}
        
//         <button
//           type="button"
//           onClick={handleSendMessage}
//           disabled={!text.trim() && !imagePreview && !videoPreview && !filePreview}
//           // disabled={!text.trim() && !imagePreview}
//           className={`
//             px-6 h-14 border-4 border-black flex items-center gap-2 font-bold text-2xl
//             transition-all shadow-mc
//             ${(text.trim() || imagePreview || videoPreview || filePreview)
//               ? 'bg-[#5E8E62] hover:bg-[#6FA073] cursor-pointer active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]' 
//               : 'bg-[#4A4A4A] cursor-not-allowed opacity-50'
//             }
//           `}
//         >
//           <span className="text-white hidden sm:inline" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>SEND</span>
//           <Send className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default MessageInput;