import React, { ReactNode } from 'react'

const linkbutton = ({children, onClick}: {children: ReactNode, onClick: () => void}) => {
  return (
    <div className='p-2' onClick={onClick}>
       {children}
    </div>
  )
}

export default linkbutton
