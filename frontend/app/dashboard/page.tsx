"use client";
import { NavBar } from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { useZaps, Zap,} from '@/hooks/userZap';
import { useRouter } from 'next/navigation';
import React from 'react'
import { HOOKS_URL } from '../config';



export default function Dashboard() {
  const routet = useRouter()
  const { loading, zaps} = useZaps();
  return (
    <div>
        <NavBar />
        <div className='pt-8 flex justify-center'>
          <div className='max-w-screen-lg w-full'>
           <div className='flex justify-between pr-8'>
              <div className='font-bold text-2xl'>
                My Zaps
              </div>
            <Button className='bg-purple-800' onClick={() => {
               routet.push("/zap/create")
            }}>
              Create
            </Button>
             </div> 
           </div>
        </div>
        {loading ? "Loading": <ZapTable zaps={zaps}/>}
    </div>
  )
}

function ZapTable({ zaps }: {zaps: Zap[]}) { 
  const router = useRouter();

  return <div className="p-8 max-w-screen-lg w-full">
      <div className="flex justify-center space-x-16">
              <div className="flex-1">Name</div>
              <div className="flex-1">ID</div>
              <div className="flex-1">Created at</div>
              <div className="flex-1">Webhook URL</div>
              <div className="flex-1">Go</div>
      </div>
      {zaps.map(z => <div className="flex border-b border-t py-4 space-x-16">
          <div className="flex-1 flex"><img src={z.trigger?.type?.image} className="w-[30px] h-[30px]" /> 
          {z.actions.map((x, idx) => ( <img key={idx} src={x.type.image} className="w-[30px] h-[30px]" />)) }</div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 13, 2023</div>
          <div className="flex-1">{`${HOOKS_URL}/hooks/catch/1/${z.id}`}</div>
          <div className="flex-1"><Button onClick={() => {
                  router.push("/zap/" + z.id)
              }}>Go</Button></div>
      </div>)}
  </div>
}