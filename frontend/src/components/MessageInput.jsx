import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore"; // Import thêm để xác định tên người reply
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";

function MessageInput({ onTyping }) {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Lấy thêm replyTo và clearReplyTo từ store
  const { sendMessage, isSoundEnabled, replyTo, clearReplyTo, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onTyping) onTyping(false);
    
    // Lưu ý: clearReplyTo đã được xử lý bên trong hàm sendMessage của Store để tối ưu UX
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-6 py-4 border-t-4 border-black bg-[#2F5F2F] shadow-mc w-full relative">
      
      {/* --- NEW: REPLY PREVIEW AREA (Minecraft Sign Style) --- */}
      {replyTo && (
        <div className="mb-3 bg-[#A88764] border-4 border-black p-3 flex items-center justify-between shadow-mc animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col border-l-4 border-[#5E4433] pl-3 overflow-hidden">
            <span className="text-[#31251B] text-lg font-bold uppercase tracking-tight" style={{textShadow: 'none'}}>
              Replying to {replyTo.senderId === authUser._id ? "Yourself" : (selectedUser?.fullName || "Friend")}
            </span>
            <p className="text-[#4A3B2C] text-xl truncate italic leading-tight">
              {replyTo.text || (replyTo.image ? "Attached Image" : "...")}
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

      {imagePreview && (
        <div className="w-full mb-3 flex items-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover border-4 border-black shadow-mc"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="w-full flex gap-3">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          className="flex-1 bg-[#4A7C4E] border-4 border-black px-4 py-2 text-white text-2xl placeholder-[#a0c7a3] focus:outline-none shadow-mc-inner"
          placeholder="Type a message..."
          style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-14 h-14 border-4 border-black flex items-center justify-center
            transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            ${imagePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
          `}
        >
          <Image className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
        
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!text.trim() && !imagePreview}
          className={`
            px-6 h-14 border-4 border-black flex items-center gap-2 font-bold text-2xl
            transition-all shadow-mc
            ${text.trim() || imagePreview 
              ? 'bg-[#5E8E62] hover:bg-[#6FA073] cursor-pointer active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]' 
              : 'bg-[#4A4A4A] cursor-not-allowed opacity-50'
            }
          `}
        >
          <span className="text-white" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>SEND</span>
          <Send className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;