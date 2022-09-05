import { useState } from 'react';
// COMPONENTS
import Chat from './components/Chat';
// STYLES
import './app.css';

function App({ socket }) {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    // GUARD CLAUSE
    if (username === '' && roomId === '') return;

    socket.emit('join_room', roomId);
    setShowChat(true);
  };

  return (
    <div className='container mx-auto flex flex-col items-center gap-y-4'>
      <h2 className='py-4'>Chatty App</h2>
      {!showChat ? (
        <div className='w-fulll max-w-xs'>
          <form action='' className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h3 className='py-4'>Join a Chat</h3>
            <div className='mb-4'>
              <label class='block text-gray-700 text-sm font-bold mb-2' for='username'>
                Username
              </label>
              <input
                class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='username'
                type='text'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label class='block text-gray-700 text-sm font-bold mb-2' for='password'>
                Room ID
              </label>
              <input
                class='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                id='roomID'
                placeholder='Room ID'
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <div class='flex items-center justify-between'>
              <button
                class='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type='button'
                onClick={() => joinRoom()}
              >
                Join a Chat
              </button>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
            &copy;2020 JT Fake Corp. All rights reserved.
          </p>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomId={roomId} />
      )}
    </div>
  );
}

export default App;
