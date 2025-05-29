'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [authUser,setAuthUser]=useState(null);
  useEffect(()=>{
    const token=window.sessionStorage.getItem('token');
    if(token==null) window.location.href='/user/login';
    const getAuthUser=async()=>{
      const instance=axios.create({
        baseURL:'http://localhost:5050/api',
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization':`${token}`,
        }
      })
      try{
        const res=await instance.get('/getAuth');
        console.log(res);
      }catch(err){
        console.log(err);
      }
    }
   getAuthUser();
  },[])
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
