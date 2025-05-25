"use client";

import { useState } from "react";
// import { Link } from "next/link";
const SignUp = () => {
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        address: '40 Mahaveer Nagar, Udaipur, Rajasthan, India',
        dateOfBirth: '',
    });

    // const redirect = useNavigate();

    const handleSubmit = async () => {
        const response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        console.log(data);
        if (data.status === 'SUCCESS!') {
            alert('User Registered Successfully');
            // redirect('/signin');
        } else {
            alert(`User Registration Failed due to ${data.message}`);
            // redirect('/signup');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen gradient font-regular">
            <form className="relative bg-white shadow-md border-2 border-black px-10 pt-6 pb-8 m-8 ">
                <h1 className="text-2xl text-center font-bold text-black mb-4">Sign Up</h1>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="username">
                            FirstName *
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstname"
                            type="text"
                            placeholder="Enter your FirstName"
                            onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="password">
                            LastName *
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastname"
                            type="text"
                            placeholder="Enter your password"
                            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="username">
                            Email *
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Enter your email"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>
                    <div>
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
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-base font-medium mb-2" htmlFor="password">
                        Date Of Birth *
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        id="DOB"
                        type="date"
                        placeholder="Enter your DOB"
                        onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                    />
                </div>
                <div className="flex flex-col items-center justify-between gap-4">
                    <button
                        className="button relative bg-white hover:bg-orange-500 hover:text-white text-black font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        SIGN UP
                    </button>
                    <div className="w-full">
                        <p className="text-sm text-gray-500 text-center">Already have an account?</p>
                        {/* <Link to="/signin"> */}
                            <button
                                className="button relative bg-orange-500 text-white font-bold w-full py-2 px-4 rounded-2xl border-black border-2 focus:outline-none focus:shadow-outline"
                                type="button">
                                LOG IN
                            </button>
                        {/* </Link> */}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;