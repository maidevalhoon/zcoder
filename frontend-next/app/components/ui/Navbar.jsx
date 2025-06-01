'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [authUser, setAuthUser] = useState();
    const userMenuRef = useRef(null);
    const userButtonRef = useRef(null);
    const pathname = usePathname();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const handleSignout = () => {
        window.sessionStorage.removeItem('token');
        window.location.href = '/';
    };

    useEffect(() => {
        const getAuthUser = async () => {
            const token = window.sessionStorage.getItem('token');
            const instance = axios.create({
                baseURL: 'https://zcoder-zac7.onrender.com/api',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            try {
                const res = await instance.get('/getAuth');
                setAuthUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getAuthUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target) &&
                userButtonRef.current &&
                !userButtonRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isActive = (path) => (path === pathname ? 'text-blue-500 dark:text-blue-500' : 'text-gray-700 dark:text-gray-200');

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Zcoder</span>
                    </div>
                </Link>
                <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                    <button
                        type="button"
                        ref={userButtonRef}
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={userMenuOpen}
                        onClick={toggleUserMenu}
                    >
                        <span className="sr-only">Open user menu</span>
                        <Image className="w-8 h-8 rounded-full" src="/userlogo.jpg" alt="user photo" width={32} height={32} />
                    </button>
                    {userMenuOpen && (
                        <div ref={userMenuRef} className="z-50 absolute top-5 right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{authUser && authUser.name}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{authUser && authUser.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link href="#">
                                        <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleSignout}>Sign out</div>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <button
                        data-collapse-toggle="navbar-user"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-user"
                        aria-expanded={menuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className={`items-center justify-between ${menuOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link href="/">
                                <div className={`block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 ${isActive('/')}`} aria-current="page">Home</div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/createRoom">
                                <div className={`block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 ${isActive('/createRoom')}`}>CreateRoom</div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/joinroom">
                                <div className={`block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 ${isActive('/joinroom')}`}>JoinRoom</div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/ask_form">
                                <div className={`block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 ${isActive('/ask_form')}`}>AskQuestion</div>
                            </Link>
                        </li>
                        <li>
                            <Link href="/codeEditor">
                                <div className={`block py-2 px-3 rounded md:bg-transparent md:p-0 md:dark:hover:text-blue-500 ${isActive('/codeEditor')}`}>Code Editor</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
