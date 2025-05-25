"use client";

import React, { useState } from 'react'
import axios from 'axios';

import Alert from '@mui/material/Alert';
function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);
  const handleCreateRoom = async () => {
    try {
      const res = await axios.post("http://localhost:5050/api/room/createroom", { roomName, roomPassword });
      console.log(res.data);
      setAlertStatus("success");
      setRoomName("");
      setRoomPassword("");
      window.location.href='/joinroom';
    } catch (err) {
      setAlertStatus("error");
      console.log(err);
    }
  }
  return (
    <>
    {alertStatus && <Alert severity={alertStatus && alertStatus}>{alertStatus==='success'?"Room has created successfully!":"Error in creating the room!"}</Alert>}
      <div className='bg-black p-4 text-white w-full h-screen'>
        <p className='text-2xl'>Zcoder</p>
        <div className='flex flex-col w-1/2 h-1/2 mx-auto justify-center'>
          <input className='text-black p-2 mb-2 outline-none border-none rounded-md' type='text' placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}></input>
          <input className='text-black p-2 mb-2 outline-none border-none rounded-md' type='text' placeholder='Room Password' value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></input>
          <button className='bg-green-600 px-2 py-1 rounded-md w-fit h-fit' onClick={() => handleCreateRoom()}>Create Room</button>
        </div>
      </div>
    </>


  )
}

export default CreateRoom