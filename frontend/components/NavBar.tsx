"use client";
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export const NavBar = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleSignout = () => {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/signin");
    };

    return (
        <nav className='border-b border-purple-500 flex justify-between p-2'>
            <div className='ml-10 text-2xl font-extrabold'>
                Zapier
            </div> 
            <div className='flex space-x-3 mr-10'>
                {!isLoggedIn ? (
                    <>
                        <div>
                            <Button className='hover:bg-zinc-800 hover:text-white' variant="ghost" onClick={() => {
                                router.push("/signup")
                            }}>Contact Sales</Button>
                        </div>
                        <div>
                            <Button className='rounded-xl hover:bg-zinc-800 hover:text-white' variant="ghost" onClick={() => {
                                router.push("/signin")
                            }}>Log in</Button>
                        </div>
                        <div>
                            <Button className='rounded-3xl w-28 h-10 bg-amber-600 hover:bg-amber-800 hover:shadow-md' onClick={() => {
                                router.push("/signup")
                            }}>Signup</Button>
                        </div>
                    </>
                ) : (
                    <div>
                        <Button className='rounded-full bg-orange-400 hover:bg-red-800 hover:text-white' variant="ghost" onClick={handleSignout}>
                            Logout
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
};
