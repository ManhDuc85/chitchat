import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
      <div className="w-16 h-16 bg-[#5E8E62] border-4 border-black flex items-center justify-center shadow-mc">
        <MessageCircle className="w-10 h-10 text-white" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
      </div>
      
      <div>
        <h4 className="text-white font-bold text-2xl mb-2" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
          No conversations yet
        </h4>
        <p className="text-white text-xl px-6" style={{textShadow: '1px 1px 0 rgba(0,0,0,0.8)'}}>
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>
      
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-6 py-3 text-xl font-bold text-white bg-[#5E8E62] border-4 border-black hover:bg-[#6FA073] transition-all shadow-mc active:translate-y-1"
        style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}
      >
        Find contacts
      </button>
    </div>
  );
}

export default NoChatsFound;