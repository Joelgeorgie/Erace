import React, { useState, useEffect } from "react";

import { RiSendPlaneFill } from "react-icons/ri";

const Messages = ({ room, name, socket }) => {
  const [newMessage, setNewMessage] = useState("");
  const [list, setList] = useState([]);

  const sendNewMessage = async () => {
    if (newMessage.length !== 0) {
      const userinput = {
        room: room,
        name: name,
        message: newMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("message:sent", userinput);
      setList((k) => [...k, userinput]);

      setNewMessage("");
    }
  };

  const handlekeypress = async (event) => {
    if (event.key === "Enter") {
      sendNewMessage();
    }
  };
  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setList((k) => [...k, data]);
    };

    socket.on("message:received", handleReceivedMessage);
    return () => {
      socket.off("message:received", handleReceivedMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (list.length > 6) setList(list.slice(-6));
  }, [list]);

  return (
    <div>
      <div className="h-screen w-full">
        <div className="w-[50%] h-[98%]  mx-auto flex flex-col justify-between ">
          <h1 className="h-[10%] text-white text-3xl p-3">Room #{room}</h1>
          <div className="h-[80%] w-[100%]  top-20 border border-l-8 rounded-lg border-r-8 border-b-0 border-t-0  border-[#393E46] flex flex-col ">
            {list.map((one, index) => {
              return (
                <div
                  className={`h-min w-full flex items-end my-1  ${
                    one.name === name ? "flex-row-reverse" : "flex-row "
                  }`}
                >
                  <div
                    className={`h-min w-[50%] border rounded-lg mb-3 mx-5 pl-2 text-white ${
                      one.name === name
                        ? " border-[#0ea4e9]"
                        : "border-[#1aff1a] "
                    }`}
                  >
                    <h1 key={index} className="">
                      {one.name === name ? "You" : one.name}
                    </h1>
                    <p className="text-gray-400">{one.message}</p>
                    <p className="w-full text-xs text-right p-1">{one.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-[7%]  border-2 border-[#393E46]  rounded-lg flex flex-row justify-between">
            <input
              type="text"
              name="message"
              placeholder="Send a message..."
              value={newMessage}
              className="w-[90%] h-full p-3 border-none text-gray-100"
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handlekeypress}
            ></input>

            <button
              className="width-[7%] h-full px-3 pointer  border-white"
              onClick={sendNewMessage}
            >
              <RiSendPlaneFill
                className={`hover:border rounded-lg h-[85%] w-[110%] ${
                  newMessage !== "" ? "bg-[#0ea4e9]" : ""
                }`}
                color="white"
                size={25}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
