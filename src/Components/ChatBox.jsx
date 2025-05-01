import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const ChatBox = ({ dealId, chatData }) => {
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = useState(chatData);
  const [newMessage, setNewMessage] = useState("");

  const sender = user?._id;
  const senderType = user?.role;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${BASE_URL}/updateChat`,
        {
          id: dealId,
          text: newMessage,
          sender,
          senderType,
        },
        { withCredentials: true }
      );

      setMessages(response.data.updatedChat);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="border border-gray-700 rounded-xl shadow-lg p-6 mt-10 bg-gray-800 text-white w-full">
      <h3 className="text-2xl font-bold text-green-400 mb-4">Chat</h3>

      <div className="h-[70vh] overflow-y-auto border border-gray-700 p-4 rounded-lg bg-gray-900 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => {
            const isSender = msg.sender === sender;
            const alignClass = isSender ? "justify-end" : "justify-start";
            const bubbleBg = isSender ? "bg-green-700" : "bg-gray-700";
            const labelColor = "text-gray-300";

            return (
              <div key={idx} className={`flex w-full ${alignClass}`}>
                <div className="max-w-[48%] flex flex-col space-y-1">
                  <div className={`px-4 py-2 rounded-lg ${bubbleBg}`}>
                    <p className="text-white text-sm">{msg.text}</p>
                  </div>
                  <span className={`text-xs ${labelColor} mt-1`}>
                    {msg.senderType} • {formatTime(msg.timestamp)}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-3 mt-4">
        <input
          type="text"
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
