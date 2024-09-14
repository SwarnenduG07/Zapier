import React from 'react'
import { Button } from './ui/button'

export const NavBar = () => {
  return (
    <nav className='border-b border-purple-500 flex justify-between p-2'>
        <div className='ml-10  text-2xl font-extrabold'>
            Zapier
        </div> 
        <div className='flex space-x-3 mr-10'>
            <div>
                <Button className='hover:bg-zinc-800 hover:text-white' variant="ghost">
                    Contact Sales
                </Button>
            </div>
            <div>
                <Button className='rounded-xl hover:bg-zinc-800 hover:text-white' variant="ghost">
                    Log in
                </Button>
            </div>
            <div>
              <Button className='rounded-3xl w-20 h-10 bg-amber-700 hover:bg-amber-800 hover:shadow-md'>
                    Signin
                </Button>
            </div>
        </div>
    </nav>
  )
}
