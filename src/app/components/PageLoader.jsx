import React from 'react'
import Loader from './Loader'

export default function PageLoader() {
  return (
    <div className='fixed inset-0 size-screen flex justify-center text-4xl bg-black/30 items-center gap-1'>
        <Loader fill="white"/>
    </div>
  )
}
