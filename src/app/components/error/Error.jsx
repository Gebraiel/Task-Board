import Link from 'next/link'
import React from 'react'

export default function NotAuthorized({children}) {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-title'>{children}</h1>
        <Link href="/" className="bg-[#3662E3] disabled:bg-[#ccc] flex items-center gap-2  px-5 py-3 rounded-3xl text-white">Home</Link>
    </div>
  )
}
