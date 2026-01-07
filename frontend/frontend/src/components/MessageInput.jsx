import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";

function MessageInput({ onTyping }) {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

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
    <div className="px-6 py-4 border-t-4 border-black bg-[#2F5F2F] shadow-mc w-full">
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