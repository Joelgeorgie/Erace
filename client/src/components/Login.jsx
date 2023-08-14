import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const handleLogin = () => {
    
    if (name.trim() === "" || room.trim() === "") {
      return;
    }
    onLogin({ name, room });
  };

  return (
    <div className="flex flex-col text-[#FFF6E0]  h-screen  items-center justify-center ] ">
      <div className="bg-[#393E46] rounded-lg p-8 flex flex-col  shadow-md mx-auto w-[20%] ">
        <h2 className="text-gray-400 text-lg mb-1 font-medium title-font text-center bg-[#393E46]">
          Erace
        </h2>

        <div className="relative mb-4 bg-[#393E46]">
          <label
            htmlFor="name"
            className="leading-7 text-sm text-gray-400 bg-[#393E46]"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4 bg-[#393E46]">
          <label
            htmlFor="room"
            className="leading-7 text-sm text-gray-400 bg-[#393E46]"
          >
            Room
          </label>
          <input
            type="text"
            id="room"
            name="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          className="text-white bg-[#176B87] border-0 py-2 px-6 focus:outline-none hover:bg-[#0c6496] rounded text-lg"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
