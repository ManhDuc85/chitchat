import { useRef, useState } from "react"; // This file was changed
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Image, Send, X, Paperclip, FileText } from "lucide-react"; // Added Paperclip & FileText

function MessageInput({ onTyping }) {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // New State for File

  const imageInputRef = useRef(null); // Renamed for clarity
  const fileInputRef = useRef(null);  // New Ref for files
  const typingTimeoutRef = useRef(null);

  const { sendMessage, isSoundEnabled, replyTo, clearReplyTo, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !filePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        file: filePreview ? filePreview.data : null, // Send the Base64 string
      });

      // Clear form on success
      setText("");
      setImagePreview(null);
      setFilePreview(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (onTyping) onTyping(false);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
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

  // New: Handle generic files (PDF, Zip, etc)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: Limit file size to avoid crashing browser (e.g., 10MB)
    if (file.size > 10 * 1024 * 1024) {
        toast.error("File is too large (Max 10MB)");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setFilePreview({
            name: file.name,
            data: reader.result // This is the Base64 string
        });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const removeFile = () => {
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-6 py-4 border-t-4 border-black bg-[#2F5F2F] shadow-mc w-full relative">
      
      {/* REPLY PREVIEW AREA */}
      {replyTo && (
        <div className="mb-3 bg-[#A88764] border-4 border-black p-3 flex items-center justify-between shadow-mc animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex flex-col border-l-4 border-[#5E4433] pl-3 overflow-hidden">
            <span className="text-[#31251B] text-lg font-bold uppercase tracking-tight" style={{textShadow: 'none'}}>
              Replying to {replyTo.senderId === authUser._id ? "Yourself" : (selectedUser?.fullName || "Friend")}
            </span>
            <p className="text-[#4A3B2C] text-xl truncate italic leading-tight">
              {replyTo.text || (replyTo.image ? "Attached Image" : "Attached File")}
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

      {/* IMAGE PREVIEW */}
      {imagePreview && (
        <div className="w-full mb-3 flex items-center relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover border-4 border-black shadow-mc"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 left-16 w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
        </div>
      )}

      {/* NEW: FILE PREVIEW */}
      {filePreview && (
        <div className="w-full mb-3 flex items-center relative">
            <div className="h-14 px-4 bg-[#E0E0E0] border-4 border-black shadow-mc flex items-center gap-2">
                <FileText className="text-black w-6 h-6" />
                <span className="text-black font-bold text-sm truncate max-w-[200px]">
                    {filePreview.name}
                </span>
            </div>
            <button
              onClick={removeFile}
              className="absolute -top-2 left-[-10px] w-6 h-6 bg-[#D32F2F] border-2 border-black flex items-center justify-center text-white hover:bg-[#E53935] shadow-mc"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
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

        {/* HIDDEN INPUTS */}
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <input
          type="file"
          accept="*" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* IMAGE BUTTON */}
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className={`
            w-14 h-14 border-4 border-black flex items-center justify-center
            transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            ${imagePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
          `}
        >
          <Image className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>

        {/* NEW: FILE BUTTON */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-14 h-14 border-4 border-black flex items-center justify-center
            transition-all shadow-mc active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]
            ${filePreview ? "bg-[#C6A664]" : "bg-[#7F7F7F] hover:bg-[#8B8B8B]"}
          `}
        >
          <Paperclip className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
        
        {/* SEND BUTTON */}
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!text.trim() && !imagePreview && !filePreview}
          className={`
            px-6 h-14 border-4 border-black flex items-center gap-2 font-bold text-2xl
            transition-all shadow-mc
            ${text.trim() || imagePreview || filePreview
              ? 'bg-[#5E8E62] hover:bg-[#6FA073] cursor-pointer active:translate-y-1 active:shadow-[2px_2px_0_rgba(0,0,0,0.5)]' 
              : 'bg-[#4A4A4A] cursor-not-allowed opacity-50'
            }
          `}
        >
          <span className="text-white hidden sm:block" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>SEND</span>
          <Send className="w-6 h-6 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;