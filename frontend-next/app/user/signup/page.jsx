"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./signup.css";
import { Alert } from "@mui/material";

const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        techstack: [],
        favlang: "",
    });
    const [tags, setTags] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [alertOpt, setAlertOpt] = useState("");
    const [errMsg,setErrmsg]=useState("");
    function handleKeyDown(e) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    // useEffect for password check
    useEffect(() => {
        if (form.password === form.confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [form.password, form.confirmPassword]);

    useEffect(() => {
        if (
            form.name.length > 0 &&
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.confirmPassword.length > 0 &&
            form.email.toLowerCase().endsWith('@gmail.com')
        ) {
            setButtonDisabled(false);
        }
    }, [form.name, form.email, form.password, form.confirmPassword]);

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.key === "Backspace" && e.target.value === "") {
                removeTag(tags.length - 1);
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [tags]);

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index));
    }

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            form.techstack = tags;
            console.log(form);
            if (form.password !== form.confirmPassword) {
                setPasswordMatch(false);
                return;
            }
            const res = await axios.post("https://zcoder-zac7.onrender.com/signup", form);
            if (res.data.success === true) {
                setAlertOpt('success');
                router.push("/user/login");
            } else {
                setAlertOpt('error');
                setErrmsg(res.data.message);
                console.log(res);
            }
        } catch (err) {
            setAlertOpt('error');
            console.log(err);
            setErrmsg('Something went wrong, Try again!');
            console.log("something is wrong");
            console.log(err);
        }
    };

    return (
        <>
        {alertOpt && <Alert severity={alertOpt && alertOpt}>{alertOpt==='success'?"User has created successfully!":`${errMsg}`}</Alert>}
            <div className="flex justify-center items-center min-h-screen gradient font-regular">
                <form className="relative bg-white shadow-md border-2 border-black px-10 pt-6 pb-8 m-8">
                    <h1 className="text-2xl text-center font-bold text-black mb-4">
                        Sign Up
                    </h1>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div>
                            <label
                                className="block text-gray-700 text-base font-medium mb-2"
                                htmlFor="name"
                            >
                                Name <p className="text-red-600 inline">*</p>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>
                        <div>
                            <label
                                className="block text-gray-700 text-base font-medium mb-2"
                                htmlFor="email"
                            >
                                Email <p className="text-red-600 inline">* (ends with @gmail.com)</p>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                        <div>
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
                                placeholder="Enter your password"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label
                                className="block text-gray-700 text-base font-medium mb-2"
                                htmlFor="confirmPassword"
                            >
                                Confirm password <p className="text-red-600 inline">*</p>
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm your password"
                                onChange={(e) =>
                                    setForm({ ...form, confirmPassword: e.target.value })
                                }
                            />
                            {!passwordMatch && (
                                <div className="text-red-600 text-xs absolute">
                                    Passwords do not match
                                </div>
                            )}
                        </div>
                    </div>
                    <label className="block text-gray-700 text-base font-medium mb-2">
                        Tech Stack
                    </label>
                    <div className="tags-input-container mb-5">
                        {tags.map((tag, index) => (
                            <div
                                className="tag-item bg-blue-600 rounded-md inline-block px-3 py-2"
                                key={index}
                            >
                                <span className="text text-white">{tag}</span>
                            </div>
                        ))}
                        <input
                            onKeyDown={handleKeyDown}
                            type="text"
                            className="tags-input"
                            placeholder="Type something"
                            onChange={(e) => setForm({ ...form, techstack: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                        <button
                            className={`button relative bg-white  text-black font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline ${buttonDisabled ? "cursor-not-allowed" : "hover:bg-orange-500 hover:text-white"
                                }`}
                            type="button"
                            onClick={handleSubmit}
                            disabled={buttonDisabled}
                        >
                            SIGN UP
                        </button>
                        <div className="w-full">
                            <p className="text-sm text-gray-500 text-center">
                                Already have an account?
                            </p>
                            <button
                                className="button relative bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={() => router.push("/user/login")}
                            >
                                LOG IN
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>

    );
};

export default SignUp;
