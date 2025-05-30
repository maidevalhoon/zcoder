"use client"
import Card from './components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import auth from './auth/auth';
const Home = () => {
    const [problems, setProblems] = useState([]);
    useEffect(async () => {
        const token = window.localStorage.getItem("token");
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
    }, []);
    console.log(problems);

    return (
        <div>
            <h1 className='text-2xl font-bold m-2 capitalize'>All questions</h1>
            {problems.map((problem) => (
                <Card problem={problem} key={problem.id} />
            ))}
        </div>
    )
}
export default auth(Home);