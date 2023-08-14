import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Login from "./components/Login";
import Messages from "./components/Messages";
const server_port = 3001;
const socket = io(`http://localhost:${server_port}`);

function App() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (loginDetails) => {
    setRoom(loginDetails.room);
    setName(loginDetails.name);

    console.log("Login details:", loginDetails);
    console.log("Name: " + loginDetails.name + " Room: " + loginDetails.room);
    socket.emit("joined:room", { room: loginDetails.room });
  };

  return (
    <div className="App">
      {!room ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Messages room={room} name={name} socket={socket} />
      )}
    </div>
  );
}

export default App;
