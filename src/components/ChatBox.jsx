import React, { useContext, useEffect, useRef, useState } from "react";
import { codeContext } from "../context/CodeContextProvider";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { theme, userName, handleLocalMessageToServer, setUserMessages, userMessages } = useContext(codeContext)
  const chatContainerRef = useRef(null);
  const [newtext, setNewText] = useState("");

  // Scroll to Bottom when new message is added
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [userMessages]);

  // Handle sending message
  const handleSendMessageBtn = () => {
    if (newtext.trim() === "") {
      toast.warning("Invaild input")
      return
    }
    handleLocalMessageToServer(userName, newtext)
    setUserMessages((prevMsg) => [...prevMsg, { local: 1, msg: newtext }]);
    setNewText("");
  };

  // Handle Enter key for sending message
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessageBtn();
    }
  };

  return (
    <div className={`w-full text-white py-2 flex flex-col justify-end relative border-2 border-gray-400 rounded ${theme === "light" ? "bg-[#f1faee]" : "bg-[#1b212f]"}`}>
      {/* Messages Container */}
      <div
        className="w-full h-[500px] px-5 flex flex-col overflow-y-auto cursor-pointer scrollbar-hide gap-2"
        ref={chatContainerRef}
      >
        {userMessages.length === 0 ? (
          <p className={`text-center mt-4 ${theme === "light" ? "text-black" : "text-white"}`}>No messages yet.</p>
        ) : (
          userMessages.map((item, index) => (
            <div key={index} className={`w-full flex ${item.local === 1 ? "justify-end" : "justify-start"} my-1`} >
              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] break-words font-normal ${item.local === 1
                  ? "bg-[#004b23] text-white self-end"
                  : "bg-[#2f3e46] text-white self-start"
                  }`}
              >
                <span className="font-semibold italic text-[#9dd1f1]">{item.local === 1 ? "" : item.sender + " ~ "}</span>
                {item.msg}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input Box */}
      <div className="w-full flex items-center bg-[#292f3f] p-2 border-t border-gray-600">
        <textarea
          className="flex-grow bg-[#1b212f] text-white p-2 rounded-lg resize-none outline-none border border-gray-500 focus:border-blue-400"
          placeholder="Type a message..."
          value={newtext}
          onChange={(e) => setNewText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition duration-200"
          onClick={handleSendMessageBtn}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
