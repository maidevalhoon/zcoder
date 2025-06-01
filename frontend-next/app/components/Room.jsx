"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import Navbar from '../components/ui/Navbar';
import { useSearchParams } from 'next/navigation'
const Roomcomponent = () => {
    // const location = useRouter();
    const [authUser, setAuthUser] = useState();
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const [room, setRoom] = useState(null);
    const [postmsg, setPostMsg] = useState("");
    const [msgList, setmsgList] = useState([null]);
    const [loading, setLoading] = useState(true);
    const chatRef = useRef(null);
    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await axios.get(`https://zcoder-zac7.onrender.com/api/room/getroombyid?q=${id}`);
                console.log(res.data);
                setmsgList(res.data.message);
                setRoom(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching room data:", error);
            }
        };
        getRoom();
        const getAuthUser = async () => {
            const token = window.sessionStorage.getItem('token');
            // console.log(token);
            const instance = axios.create({
                baseURL: 'https://zcoder-zac7.onrender.com/api',
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
    }, [id]);

    const socket = useMemo(() => {
        return io("https://zcoder-zac7.onrender.com", {
            withCredentials: true,
        });
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.emit('joinRoom', id);
        socket.on('welcomeMsg', (msg) => {
            console.log(msg);
        });
        socket.on('getmessage', (msg) => { setmsgList((prev) => [...prev, msg]); });

        return () => {
            //socket.off('welcomeMsg');
            //socket.off('getmessage');
            socket.disconnect();
        };
    }, [socket, id]);

    useEffect(() => {
        chatRef.current?.scrollIntoView();
    }, [msgList])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://zcoder-zac7.onrender.com/api/msg/postmessage', { content: postmsg, roomId: id, sender: authUser._id });
            setmsgList((prev) => [...prev, res.data]);
            // console.log(res.data);
            socket.emit('newmessage', { msg: res.data, id });
            setPostMsg("");
        } catch (err) {
            console.log(err)
        }
        setPostMsg("");
    };

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }


    return (
        <>
       
        <Navbar />
        <div className='w-full h-fit bg-black text-white p-2'>
            <div className='w-full h-screen flex box-border'>
                <div className='w-3/4 h-3/4 mt-8'>
                    <h2 className='text-xl'>{room && room.roomName}</h2>
                    <div className='w-full h-full overflow-y-auto p-4 border-white  border-2 rounded-xl mb-[1rem]'>
                        {!loading && msgList !== null ? msgList.map((msg, id) => (
                            <>
                                <div key={id} className={`bg-cyan-800 px-2 py-1 h-fit ${authUser && authUser.name === msg.sender.name ? 'ml-auto rounded-s-xl rounded-b-xl' : 'rounded-e-xl rounded-es-xl'} leading-1.5  mb-4 w-[calc(50%-2rem)] hover:bg-cyan-500`}>
                                    <p className={`text-sm font-semibold text-gray-900 dark:text-white capitalize `}>{msg && msg.sender.name}</p>
                                    <p style={{ 'wordWrap': 'break-word' }} className='w-full text-sm font-normal py-2.5 text-gray-900 dark:text-white'>{msg && msg.content}</p>
                                </div>
                            </>
                        )) : ''}
                        {/*{msgList && msgList.map((msg, id) => (
                            console.log(msg)
                        ))
                            }*/}
                        <div ref={chatRef}></div>
                    </div>
                    <form onSubmit={handleSubmit} className='flex items-center'>
                        <input
                            type='text'
                            placeholder='type message'
                            value={postmsg}
                            className='text-black px-2 w-1/2 py-1  outline-none border-4 rounded-md focus:border-green-600  mr-[1rem]'
                            onChange={(e) => setPostMsg(e.target.value)}
                        />
                        <input className='bg-green-600 cursor-pointer hover:bg-green-800 px-4 py-1 rounded-md w-fit h-fit' type='submit' value='Post' />
                    </form>
                </div>
                <div className='w-1/4 h-3/4 mt-12 mx-[1rem] border-white border-2 rounded-lg overflow-y-auto p-2'>
                    <p>Room Members</p>
                    {room && room.members.map((user, id) => (
                        <p key={id}>{user.name}</p>
                    ))}
                </div>
            </div>

        </div>
       
            

        </>

    );
};

export default Roomcomponent;
