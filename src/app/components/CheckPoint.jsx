import React from 'react'

export default function CheckPoint({isValid,children}) {
    console.log("Check Point Re-render")
    return (
    
    <div className='flex gap-2 text-sm' >
        {isValid ? <img  src="/circle-check-solid.svg"  width="20"/>: <img src="/circle-xmark-solid.svg" width="20"/>}
        <p className={`${isValid ? "text-green-500" : "text-red-500"}`}>
            {children}
        </p>
    </div>
  )
}
