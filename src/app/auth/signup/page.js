import React from 'react'
import Image from 'next/image'
import SignUpForm from '@/src/app/components/SignUpForm'

export default function SignUp() {
  return (
    <div className='px-5 py-5'>
        <div className=''>
            <h1 className="text-title ">

              Create Your Account
            </h1>
        </div>
        <SignUpForm/>
    </div>
  )
}
