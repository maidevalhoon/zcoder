"use client"
import Card from './components/ui/card';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import auth from './auth/auth';
import Navbar from './components/ui/Navbar';
import Link from 'next/link';
const Home = () => {
    const [problems, setProblems] = useState([]);
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const fetch = async () => {
            const token = window.sessionStorage.getItem("token");
            console.log(token);
            await axios.get("https://zcoder-zac7.onrender.com/api/home", {
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
            <Navbar />
            <div className='dark:bg-black bg-gray-50 w-full p-4'>

                    <h1 className='text-3xl font-bold mb-2 capitalize text-black pb-2 dark:text-white' >All questions</h1>
                    {problems.map((problem) => (
                        <Card problem={problem} key={problem.id} />
                    ))}
            </div>
            {/* <Link href='/joinroom'>Joinroom</Link> */}
        </React.Fragment>

    )
}
export default auth(Home);