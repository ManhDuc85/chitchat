import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
    // --- NEW: POPULATE ĐỂ HIỆN THỊ TRÍCH DẪN KHI RELOAD TRANG ---
    .populate({
      path: "replyTo", // Lấy dữ liệu tin nhắn gốc
      select: "text image video file fileName senderId", // Updated to include fileName
      // select: "text image video file senderId",
      populate: { path: "senderId", select: "fullName" } // Lấy tên người đã gửi tin nhắn gốc đó
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, video, file, fileName, replyToId } = req.body;
    // const { text, image, video, file, replyToId } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!text && !image && !video && !file) {
      return res.status(400).json({ message: "Text, image, video or file is required." });
    }
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    let videoUrl;
    if (video) {
      const uploadResponse = await cloudinary.uploader.upload(video, {
        resource_type: "video",
      });
      videoUrl = uploadResponse.secure_url;
    }

    let fileUrl;
    if (file) {
      // Use raw for generic files
      const uploadResponse = await cloudinary.uploader.upload(file, {
        resource_type: "raw", 
      });
      fileUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
      video: videoUrl,
      file: fileUrl,
      fileName: fileName || null, // Save the original filename if provided
      replyTo: replyToId || null, 
    });
    // const newMessage = new Message({
    //   senderId,
    //   receiverId,
    //   text,
    //   image: imageUrl,
    //   video: videoUrl,
    //   file: fileUrl,
    //   replyTo: replyToId || null, 
    // });

    await newMessage.save();

    // --- NEW: POPULATE TRƯỚC KHI TRẢ VỀ VÀ BẮN SOCKET ---
    const populatedMessage = await Message.findById(newMessage._id).populate({
      path: "replyTo",
      select: "text image video file fileName senderId",
      // select: "text image video file senderId",
      populate: { path: "senderId", select: "fullName" }
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in getChatPartners: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};