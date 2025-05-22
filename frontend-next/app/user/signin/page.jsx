"use client";

import { useState } from "react";
// import { Link } from 'next/link'

const SignIn = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:3000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        console.log(data);
        if (data.status === 'SUCCESS!') {
            alert(data.message);
            // dispatch(logIn(data))
            // redirect('/');
        } else {
            alert('User Login Failed');
            // redirect('/signin');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen gradient font-regular">
            <form className="relative bg-white shadow-md border-2 border-black px-10 pt-6 pb-8 mb-4 ">
                <h1 className="text-2xl text-center font-bold text-black mb-4">Log In</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="username">
                        Username *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className="mb-10">
                    <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="password">
                        Password *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                    <button
                        className="button relative bg-white hover:bg-orange-500 hover:text-white text-black font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        LOG IN
                    </button>
                    <div className="w-full">
                        <p className="text-sm text-gray-500 text-center">Don't have an account?</p>
                        {/* <Link href="/signup"> */}
                            <button
                                className="button relative bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                                type="button">
                                SIGN UP
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
        </div>);
}

export default SignIn;