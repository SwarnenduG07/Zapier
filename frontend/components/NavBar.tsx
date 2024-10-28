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
        <nav className='fixed top-0 left-0 right-0 border border-neutral-800 rounded-2xl flex justify-between lg:mx-48 md:mx-24 mx-16 mt-4 p-1 backdrop-blur-sm bg-neutral-800/80'>
            <div className='ml-10 text-lg font-bold font-mono flex items-center text-neutral-100'>
                ChainX
            </div>
            
            <div className='flex space-x-3 mr-10'>
                {!isLoggedIn ? (
                    <>
                     <div className='flex items-center space-x-4 text-neutral-100'>
                        
                        <div>
                            <span className=' hover:text-purple-500'>Feature</span>
                        </div>
                        <div>
                            <span className=' hover:text-purple-500'>Pricing</span>
                        </div>
                        <div>
                            <span className=' hover:text-purple-500'>Contact</span>
                        </div>
                        
                        <div>
                            <Button className='w-20 h-8 rounded-xl hover:bg-zinc-800 hover:text-white' onClick={() => {
                                router.push("/signin")
                            }}>Log in</Button>
                        </div>
                        <div>
                            <Button className='rounded-xl w-20 h-8 bg-purple-600 hover:bg-purple-700 hover:shadow-md' onClick={() => {
                                router.push("/signup")
                            }}>Signup</Button>
                        </div>
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
