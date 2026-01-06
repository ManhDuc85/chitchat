import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatHistoryPlaceholder({ name }) {
  const { sendMessage } = useChatStore();

  const handleQuickMessage = (text) => {
    sendMessage({ text, image: null });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8 w-full">
      <div className="w-20 h-20 bg-[#5E8E62] border-4 border-black flex items-center justify-center mb-6 shadow-mc">
        <MessageCircle className="w-12 h-12 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-4" style={{textShadow: '3px 3px 0 rgba(0,0,0,1)'}}>
        Start conversation with {name}
      </h3>
      
      <div className="flex flex-col space-y-3 w-full max-w-4xl mb-6">
        <p className="text-white text-xl" style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}>
          This is the beginning of your conversation. Send a message to start chatting!
        </p>
        <div className="h-1 w-32 bg-[#8B7355] border-2 border-black mx-auto shadow-mc" />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <button 
          onClick={() => handleQuickMessage("👋 Say Hello")}
          className="px-6 py-3 text-xl font-bold text-white bg-[#5E8E62] border-4 border-black hover:bg-[#6FA073] transition-all shadow-mc active:translate-y-1"
          style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
          👋 Say Hello
        </button>
        <button 
          onClick={() => handleQuickMessage("🤝 How are you?")}
          className="px-6 py-3 text-xl font-bold text-white bg-[#5E8E62] border-4 border-black hover:bg-[#6FA073] transition-all shadow-mc active:translate-y-1"
          style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
          🤝 How are you?
        </button>
        <button 
          onClick={() => handleQuickMessage("📅 Meet up soon?")}
          className="px-6 py-3 text-xl font-bold text-white bg-[#5E8E62] border-4 border-black hover:bg-[#6FA073] transition-all shadow-mc active:translate-y-1"
          style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
          📅 Meet up soon?
        </button>
      </div>
    </div>
  );
}

export default NoChatHistoryPlaceholder;