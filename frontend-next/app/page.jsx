"use client"
import Card from './components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import auth from './auth/auth';
import Navbar from './components/ui/Navbar';
import Link from 'next/link';
const Home = () => {
    const [problems, setProblems] = useState([]);
    const [authUser,setAuthUser]=useState(null);
    useEffect(() => {
        const fetch = async () => {
            const token = window.sessionStorage.getItem("token");
            console.log(token);
            await axios.get("http://localhost:5050/api/home", {
                headers: {
                    'Authorization': `${token}`,
                },
            })
                .then((response) => {
                    setProblems(response.data.problems);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetch();
        
    }, []);
    console.log(problems);

    return (
        <React.Fragment>
            <Navbar/>
            <div className='bg-black'>
                <h1 className='text-2xl font-bold mb-2 capitalize text-white'>All questions</h1>
                {problems.map((problem) => (
                    <Card problem={problem} key={problem.id} />
                ))}
            </div>
            <Link href='/joinroom'>Joinroom</Link>
        </React.Fragment>

    )
}
export default auth(Home);