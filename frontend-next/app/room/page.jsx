"use client";

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';

const Room = () => {
    const location = useRouter();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [room, setRoom] = useState(null);
    const [postmsg, setPostMsg] = useState("");

    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/room/getroombyid?q=${id}`);
                setRoom(res.data);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        getRoom();
    }, [id]);

    const socket = useMemo(() => {
        return io("http://localhost:5000", {
            withCredentials: true,
        });
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.emit('joinRoom', id);
        socket.on('welcomeMsg', (msg) => {
            console.log(msg);
        });
        socket.on('getmessage', (msg) => console.log(msg));

        return () => {
            socket.off('welcomeMsg');
            socket.off('getmessage');
        };
    }, [socket, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
            socket.emit('newmessage', { postmsg, id });
            setPostMsg("");
    };

    return (
        <div className='room_discussion_section'>
            <h3>{room && room.roomName}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='type message'
                    value={postmsg}
                    onChange={(e) => setPostMsg(e.target.value)}
                />
                <input type='submit' value='Post' />
            </form>
        </div>
    );
};

export default Room;
