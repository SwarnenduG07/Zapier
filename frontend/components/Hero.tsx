"use client"
import React from 'react'
import { Button } from './ui/button'
import { Feature } from './Features'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router  = useRouter();
  return (
    <div className=''>
        <div className='flex justify-center'>
            <div className='text-5xl font-bold text-center pt-8 max-w-lg text-neutral-50'>
                <h1 className='text-5xl font-bold text-center pt-8 max-w-lg text-neutral-50'>
                    The No-Code automation platform 
                </h1>
                Automate as fast as you can type
            </div>
        </div>        
        <div className='flex justify-center'>
            <div className='text-xl font-normal text-center pt-8 max-w-2xl text-neutral-200'>
            AI gives you automation superpowers, and  ChainX puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
            </div>
        </div>     
        <div className='flex justify-center pt-4 space-x-4'>
            <Button className='rounded-full w-52 py-6 bg-orange-600 text-lg' onClick={() => {
                router.push("/signup")
            }}>
                Start free with email
            </Button>
            <Button className='rounded-full w-52 py-6 text-lg' variant="outline" onClick={() => {
                router.push("/signup")
            }}>
                Contact Sales
            </Button>
        </div>   
        <div className="flex justify-center pt-4">
            <Feature title={"Free Forever"} subtitle={"for core features"} />
            <Feature title={"More apps"} subtitle={"than any other platforms"} />
            <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
        </div>
    </div>
  )
}

export default Hero