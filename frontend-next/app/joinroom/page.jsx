"use client";
 
import React, { useState, useEffect } from 'react'
import Navbar from '../components/ui/Navbar';
import axios from 'axios';
import { Alert } from '@mui/material';
const JoinRoom = () => {

  const [roomList, setRoomList] = useState(null);
  const [status,setAlertStatus]=useState(null);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {

    const getAllrooms = async () => {
      try {
        const res = await axios.get('https://zback-49lo.onrender.com/api/room/getallrooms');
        setRoomList(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getAllrooms();
    const getAuthUser = async () => {
      const token = window.sessionStorage.getItem('token');
      const instance = axios.create({
          baseURL: 'https://zback-49lo.onrender.com/api',
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `${token}`,
          }
      })
      try {
          const res = await instance.get('/getAuth');
          //console.log(res);
          setAuthUser(res.data);
      } catch (err) {
          console.log(err);
      }
  }
  getAuthUser();

  }, [])

  const handleJoinRoom = async (room) => {
    console.log(room);
    try {
      const res = await axios.post("https://zback-49lo.onrender.com/api/room/joinroom", { roomName:room.roomName, roomPassword:room.roomPassword,member:authUser._id });
      console.log(res.data);
      setAlertStatus('success');
      window.location.href = `/room?id=${res.data._id}`
    } catch (err) {
      setAlertStatus('error');
      console.log(err);
    }
  }
  return (
    <React.Fragment>
      <div className='bg-black h-screen'>
    {status && <Alert className='fixed top-0' severity={status && status}>{status==='success'?"Room joined successfully! Redirecting...":"Error in joining the room!"}</Alert>}
    <Navbar/>
      <div className='dark:bg-black bg-gray-50 p-4 text-black dark:text-white w-full'>
        <p className='text-3xl font-semibold '>Join Room</p>
        <p className='mt-2 font-medium mb-2'>Available Rooms:</p>
        <div className='w-full h-fit dark:bg-gray-800 bg-gray-200 border-stone-900 border dark:border-gray-300  rounded-lg p-4'>
          {roomList && roomList.map((room, ind) => (
            <div key={ind} className='room_display' style={{ 'marginBottom': '1rem' }}>
              <h3 className='font-medium'>{room.roomName.toUpperCase()} :</h3>
              <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 w-fit h-fit"onClick={() => handleJoinRoom(room)}>Join Room</button>
            </div>
          ))}
        </div>
      </div>
  </div>
    </React.Fragment>

  )
}

export default JoinRoom
