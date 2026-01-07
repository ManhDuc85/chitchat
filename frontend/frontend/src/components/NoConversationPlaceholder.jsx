import { MessageCircle } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 py-8 w-full bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355]">
      <div className="w-24 h-24 bg-[#5E8E62] border-4 border-black flex items-center justify-center mb-6 shadow-mc-lg">
        <MessageCircle className="w-16 h-16 text-white" style={{filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,1))'}} />
      </div>
      
      <h3 className="text-4xl font-bold text-white mb-4" style={{textShadow: '3px 3px 0 rgba(0,0,0,1)'}}>
        Select a conversation
      </h3>
      
      <p className="text-white text-2xl max-w-3xl" style={{textShadow: '2px 2px 0 rgba(0,0,0,0.8)'}}>
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
      
      {/* Decorative blocks */}
      <div className="mt-8 flex gap-2">
        <div className="w-8 h-8 bg-[#8B7355] border-4 border-black shadow-mc" />
        <div className="w-8 h-8 bg-[#5E8E62] border-4 border-black shadow-mc" />
        <div className="w-8 h-8 bg-[#C6A664] border-4 border-black shadow-mc" />
      </div>
    </div>
  );
}

export default NoConversationPlaceholder;