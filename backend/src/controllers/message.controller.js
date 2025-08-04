import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(`Error in GetUserForSidebar Conteoller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in getMessages Conteoller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      
      // ✅ Pastikan ada prefix data:image jika belum
      if (!image.startsWith("data:")) {
        base64Data = `data:image/jpeg;base64,${image}`;
      }

      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "We-Chat",
        resource_type: "auto",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // todo : realtime socketIo
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log(`Error in sendMessage Conteoller ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
