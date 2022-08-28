import { useEffect, useState } from "react"
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Chat({ socket, username, roomId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    // CLAUSE GAURD
    if (currentMessage === "") return;

    const messageData = {
      room: roomId,
      author: username,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("")
  };

  useEffect(() => {
    console.log(1)
    socket.on("receive_message", (message) => {
        console.log(123, message);
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom scrollViewClassName="parent-message-container" className="message-container">
            {messageList.map((messageContent, i) => (
            <div
                key={i}
                className="message"
                id={username === messageContent.author ? "you" : "other"}
            >
                <div>
                {username !== messageContent.author && (
                    <div className="message-meta">
                        <p>{messageContent.author}</p>
                    </div>
                )}
                <div className="message-content">
                    <p>{messageContent.message}</p>
                </div>
                {username !== messageContent.author && (
                    <div className="message-meta">
                        <p id="time"><b>Sent</b> {messageContent.time}</p>
                    </div>
                )}

                </div>
            </div>
            ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  );
}
