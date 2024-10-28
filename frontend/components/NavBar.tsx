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
        <nav className='border border-purple-500 rounded-2xl flex justify-between mx-48 mt-4 p-1'>
            <div className='ml-10 text-xl font-bold font-mono flex items-center'>
                ChainX
            </div>
            
            <div className='flex space-x-3 mr-10'>
                {!isLoggedIn ? (
                    <>
                     <div className='flex items-center space-x-4'>
                        
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
                            <Button className='rounded-xl w-20 h-8 bg-amber-600 hover:bg-amber-800 hover:shadow-md' onClick={() => {
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
