import React, { useState, useMemo,useEffect } from 'react'
import axios from 'axios';
import { io } from 'socket.io-client';
const JoinRoom = () => {

  const socket = useMemo(() => {
    return io("http://localhost:5000", {
      withCredentials: true,
    });
  }, [])

  useEffect(()=>{
    socket.on('welcomePrompt',(msg)=> console.log(msg));
  },[socket])


  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const handleJoinRoom = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/room/joinroom", { roomName, roomPassword });
      console.log(res.data);
      setRoomName("");
      setRoomPassword("");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='joinRoom_section'>
      <input type='text' placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}></input>
      <input type='text' placeholder='Room id' value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></input>
      <button onClick={() => handleJoinRoom()}>Join Room</button>
    </div>
  )
}

export default JoinRoom