import React from 'react'
import Loader from './components/Loader'

export default function Loading() {
  console.log("Loading....")
  return (
    <div className='w-full flex justify-center items-center gap-1'>
      <p>Loading</p>
      <Loader fill='black'/>
    </div>
  )
}
