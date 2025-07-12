import React from 'react'

export default function Loading() {
  console.log("Loading Login Page");
  return (
    <div className='fixed inset-0 size-screen flex justify-center text-4xl text-black items-center gap-1'>
      <p>Loading</p>
    </div>
  )
}
