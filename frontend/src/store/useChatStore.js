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

  // --- NEW: REPLY STATE ---
  replyTo: null, 

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  // Cập nhật: Khi đổi người chat, tự động xóa trạng thái reply đang chờ
  setSelectedUser: (selectedUser) => set({ selectedUser, replyTo: null }),

  // --- NEW: REPLY ACTIONS ---
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
      senderName: replyTo.senderId === authUser._id ? "You" : selectedUser.fullName
    } : null;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      replyTo: replyContext, // Lưu ngữ cảnh reply vào tin nhắn tạm
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };

    // immidetaly update the ui by adding the message
    // Đồng thời xóa thanh preview reply để chuẩn bị cho tin nhắn tiếp theo
    set({ 
      messages: [...messages, optimisticMessage],
      replyTo: null 
    });

    try {
      // Gửi yêu cầu lên server với ID của tin nhắn được trả lời
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
        ...messageData,
        replyToId: replyTo ? replyTo._id : null
      });

      // LẤY DỮ LIỆU THẬT TỪ SERVER
      const finalMessageFromServer = res.data;
      
      /**
       * FIX LỖI MẤT BOX REPLY SAU 0.5s:
       * Nếu server trả về tin nhắn mới mà chưa kịp "populate" (đổ dữ liệu chi tiết) cho trường replyTo,
       * chúng ta chủ động lấy replyContext đã tạo ở bước Optimistic để "vá" vào.
       */
      if (!finalMessageFromServer.replyTo && replyContext) {
        finalMessageFromServer.replyTo = replyContext;
      }

      // Thay thế tin nhắn tạm bằng tin nhắn thật đã được vá dữ liệu
      const currentMessages = get().messages;
      set({ 
        messages: currentMessages.map(m => m._id === tempId ? finalMessageFromServer : m) 
      });

    } catch (error) {
      // remove optimistic message on failure
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