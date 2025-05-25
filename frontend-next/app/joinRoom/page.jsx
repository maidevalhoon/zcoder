"use client";

import React, { useState, useEffect } from 'react'
import axios from 'axios';

const JoinRoom = () => {

  const [roomList, setRoomList] = useState(null);

  useEffect(() => {

    const getAllrooms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/room/getallrooms');
        setRoomList(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getAllrooms();

  }, [])

  

  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const handleJoinRoom = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/room/joinroom", { roomName, roomPassword });
      console.log(res.data);
      setRoomName("");
      setRoomPassword("");
      window.location.href=`/room?id=${res.data._id}`
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <React.Fragment>
      <div className='joinRoom_section'>
        <input type='text' placeholder='Room Name' value={roomName} onChange={(e) => setRoomName(e.target.value)}></input>
        <input type='text' placeholder='Room id' value={roomPassword} onChange={(e) => setRoomPassword(e.target.value)}></input>
        <button onClick={() => handleJoinRoom()}>Join Room</button>
      </div>

      <div className='room_display_section'>
        {roomList && roomList.map((room, ind) => (
          <div key={ind} className='room_display' style={{'marginBottom':'1rem'}}>
            <h3>{room.roomName}</h3>
            <p>{room.roomPassword}</p>
          </div>
        ))}
      </div>
    </React.Fragment>

  )
}

export default JoinRoom