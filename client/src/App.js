import { useState } from "react";
// COMPONENTS
import Chat from "./components/Chat";
// STYLES
import "./app.css";

function App({ socket }) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    // GUARD CLAUSE
    if (username === "" && roomId === "") return;

    socket.emit("join_room", roomId);
    setShowChat(true);
  };

  return (
    <div className="container mx-auto flex place-content-center">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={() => joinRoom()}>Join a Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
