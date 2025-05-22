"use client";

import React, { useState } from 'react'
import axios from 'axios';
function CreateRoom() {
    const [roomName,setRoomName]=useState("");
    const[roomPassword,setRoomPassword]=useState("");
    const handleCreateRoom=async ()=>{
        try{
          const res=await axios.post("http://localhost:5000/api/room/createroom",{roomName,roomPassword});
          console.log(res.data);
          setRoomName("");
          setRoomPassword("");
        }catch(err){
          console.log(err);
        }
    }
  return (
    <div className='createRoom_section'>
        <input type='text' placeholder='Room Name' value={roomName} onChange={(e)=>setRoomName(e.target.value)}></input>
        <input type='text' placeholder='Room Password' value={roomPassword} onChange={(e)=>setRoomPassword(e.target.value)}></input>
        <button onClick={()=>handleCreateRoom()}>Create Room</button>
    </div>
  )
}

export default CreateRoom