import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex gap-2 p-4">
      <button
        onClick={() => setActiveTab("chats")}
        className={`
          flex-1 border-4 border-black py-3 text-center cursor-pointer
          transition-all text-2xl font-bold
          ${activeTab === "chats" 
            ? 'bg-[#5E8E62] text-white shadow-mc translate-y-0' 
            : 'bg-[#3A3A3A] text-[#888] shadow-mc hover:bg-[#4A4A4A] active:translate-y-1'
          }
        `}
        style={{
          textShadow: activeTab === "chats" ? '2px 2px 0 rgba(0,0,0,1)' : 'none'
        }}
      >
        CHATS
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`
          flex-1 border-4 border-black py-3 text-center cursor-pointer
          transition-all text-2xl font-bold
          ${activeTab === "contacts" 
            ? 'bg-[#5E8E62] text-white shadow-mc translate-y-0' 
            : 'bg-[#3A3A3A] text-[#888] shadow-mc hover:bg-[#4A4A4A] active:translate-y-1'
          }
        `}
        style={{
          textShadow: activeTab === "contacts" ? '2px 2px 0 rgba(0,0,0,1)' : 'none'
        }}
      >
        CONTACTS
      </button>
    </div>
  );
}

export default ActiveTabSwitch;