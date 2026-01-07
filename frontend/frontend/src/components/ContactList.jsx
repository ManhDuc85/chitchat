import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-[#5E8E62] border-4 border-black p-4 cursor-pointer hover:bg-[#6FA073] transition-all shadow-mc hover:translate-y-[-2px] active:translate-y-1 mb-3"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-black shadow-mc overflow-hidden bg-[#2F5F2F]">
                <img 
                  src={contact.profilePic || "/avatar.png"} 
                  alt={contact.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {onlineUsers.includes(contact._id) ? (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#4CAF50] border-2 border-black animate-mcPulse" />
              ) : (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#666] border-2 border-black" />
              )}
            </div>
            <h4 className="text-white font-bold text-2xl" style={{textShadow: '2px 2px 0 rgba(0,0,0,1)'}}>
              {contact.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default ContactList;