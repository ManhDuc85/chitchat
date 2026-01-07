import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  replyTo: null, 

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser, replyTo: null }),

  setReplyTo: (message) => set({ replyTo: message }),
  clearReplyTo: () => set({ replyTo: null }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages, replyTo } = get();
    const { authUser } = useAuthStore.getState();

    if (!selectedUser) return;

    const tempId = `temp-${Date.now()}`;

    // Tạo nội dung tin nhắn reply để hiển thị tạm thời trên UI (Optimistic UI)
    const replyContext = replyTo ? {
      _id: replyTo._id,
      text: replyTo.text,
      image: replyTo.image,
      video: replyTo.video,
      file: replyTo.file,
      senderName: replyTo.senderId === authUser._id ? "You" : selectedUser.fullName
    } : null;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      video: messageData.video, 
      file: messageData.file, 
      fileName: messageData.fileName, // Added optimistic fileName
      replyTo: replyContext, 
      createdAt: new Date().toISOString(),
      isOptimistic: true, 
    };
    // const optimisticMessage = {
    //   _id: tempId,
    //   senderId: authUser._id,
    //   receiverId: selectedUser._id,
    //   text: messageData.text,
    //   image: messageData.image,
    //   video: messageData.video, 
    //   file: messageData.file, 
    //   replyTo: replyContext, 
    //   createdAt: new Date().toISOString(),
    //   isOptimistic: true, 
    // };

    set({ 
      messages: [...messages, optimisticMessage],
      replyTo: null 
    });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
        ...messageData,
        replyToId: replyTo ? replyTo._id : null
      });

      const finalMessageFromServer = res.data;
      
      if (!finalMessageFromServer.replyTo && replyContext) {
        finalMessageFromServer.replyTo = replyContext;
      }

      const currentMessages = get().messages;
      set({ 
        messages: currentMessages.map(m => m._id === tempId ? finalMessageFromServer : m) 
      });

    } catch (error) {
      const currentMessages = get().messages;
      set({ messages: currentMessages.filter(m => m._id !== tempId) });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        notificationSound.currentTime = 0; // reset to start
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) socket.off("newMessage");
  },
}));