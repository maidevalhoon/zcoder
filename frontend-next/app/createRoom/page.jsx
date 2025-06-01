"use client";
import Navbar from '../components/ui/Navbar';
import React, { useState } from 'react'
import axios from 'axios';
import Alert from '@mui/material/Alert';
function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [alertStatus, setAlertStatus] = useState(null);
  const handleCreateRoom = async () => {
    try {
      const res = await axios.post("https://zcoder-zac7.onrender.com/api/room/createroom", { roomName, roomPassword });
      console.log(res.data);
      setAlertStatus("success");
      setRoomName("");
      setRoomPassword("");
      window.location.href = '/joinroom';
    } catch (err) {
      setAlertStatus("error");
      console.log(err);
    }
  }
  return (
    <>
      {alertStatus && <Alert severity={alertStatus && alertStatus}>{alertStatus === 'success' ? "Room has created successfully!" : "Error in creating the room!"}</Alert>}
      <Navbar />
      <div className='dark:bg-black p-4 dark:text-white w-full h-screen bg-gray-100'>
        <h2 className="text-4xl font-semibold dark:text-white">Create Room</h2>
        <div className='flex flex-col w-1/2 h-1/2 mx-auto justify-center'>
          <div className="mb-3">
            <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Name</label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room Password</label>
            <input type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Room Password' value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)} />
          </div>
          {/* <input className='text-black p-2 mb-2 outline-none border-none rounded-md' type='text' placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}></input> */}
          {/* <input className='text-black p-2 mb-2 outline-none border-none rounded-md' type='text' placeholder='Room Password' value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></input> */}
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 w-fit h-fit mt-1" onClick={() => handleCreateRoom()}>Create Room</button>
        </div>
      </div>
    </>

  )
}

export default CreateRoom