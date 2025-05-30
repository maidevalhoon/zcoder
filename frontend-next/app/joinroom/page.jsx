"use client";

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Alert } from '@mui/material';
const JoinRoom = () => {

  const [roomList, setRoomList] = useState(null);
  const [status,setAlertStatus]=useState(null);
  const [authUser, setAuthUser] = useState();

  useEffect(() => {

    const getAllrooms = async () => {
      try {
        const res = await axios.get('http://localhost:5050/api/room/getallrooms');
        setRoomList(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getAllrooms();
    const getAuthUser = async () => {
      const token = window.localStorage.getItem('token');
      const instance = axios.create({
          baseURL: 'http://localhost:5050/api',
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
      const res = await axios.post("http://localhost:5050/api/room/joinroom", { roomName:room.roomName, roomPassword:room.roomPassword,member:authUser._id });
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
    {status && <Alert className='fixed top-0' severity={status && status}>{status==='success'?"Room joined successfully! Redirecting...":"Error in joining the room!"}</Alert>}
      <div className='bg-black p-4 text-white w-full h-screen'>
        <p className='text-2xl'>Zcoder</p>
        <p className='mt-2'>Available Rooms:</p>
        <div className='w-full h-fit bg-slate-700 rounded-lg p-4'>
          {roomList && roomList.map((room, ind) => (
            <div key={ind} className='room_display' style={{ 'marginBottom': '1rem' }}>
              <h3>{room.roomName.toUpperCase()}</h3>
              <button className='bg-green-600 px-2 py-1 rounded-md w-fit h-fit' onClick={() => handleJoinRoom(room)}>Join Room</button>
            </div>
          ))}
        </div>
      </div>

    </React.Fragment>

  )
}

export default JoinRoom