"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from 'next/link'
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
// import { cookies } from "next/headers";
const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter();
    const [alertOpt, setAlertOpt] = useState("");
    const [errMsg, setErrmsg] = useState("");
    // const [usermail,setusermail]=useState("");
    // const[UserPassword,setUserPassword]=useState("");
    const handlelogin = async () => {
        try {
            const res = await axios.post("https://zcoder-zac7.onrender.com/login", form);
            if (res.data.success === true) {
                // Store the token in a secure manner
                window.sessionStorage.setItem("token", res.data.token);
                router.push("/");
            } else {
                setAlertOpt('error');
                setErrmsg(res.data.message);
            }
        } catch (err) {
            setAlertOpt('error');
            setErrmsg("something went wrong")
            console.log(err);
        }
    };
    useEffect(() => {
        if (form.email.length > 0 && form.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [form]);


    return (
        <>
            {alertOpt && <Alert severity={alertOpt && alertOpt}>{alertOpt === 'success' ? "Login successfull!" : `${errMsg}`}</Alert>}
            <div className="flex justify-center items-center min-h-screen gradient font-regular">
                <form className="relative bg-white shadow-md border-2 border-black px-10 pt-6 pb-8 mb-4 rounded">
                    <h1 className="text-2xl text-center font-bold text-black mb-4">
                        Log In
                    </h1>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-base font-medium mb-2"
                            htmlFor="email"
                        >
                            Email <p className="text-red-600 inline">*</p>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            placeholder="Enter your email"
                            autoComplete="email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                        <p className="text-red-600 "></p>
                    </div>
                    <div className="mb-10">
                        <label
                            className="block text-gray-700 text-base font-medium mb-2"
                            htmlFor="password"
                        >
                            Password <p className="text-red-600 inline">*</p>
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                        <button
                            className="button relative bg-white hover:bg-orange-500 hover:text-white text-black font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => handlelogin()}
                            disabled={buttonDisabled}
                        >
                            LOG IN
                        </button>
                        <div className="w-full">
                            <p className="text-sm text-gray-500 text-center">
                                Do not have an account?
                            </p>
                            <Link href="/user/signup">
                                <button
                                    className="button relative bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    SIGN UP
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>

    );
};

export default Login;
