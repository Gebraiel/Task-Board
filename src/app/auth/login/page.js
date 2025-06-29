import React from 'react'
import Image from 'next/image'
import LoginForm from '@/src/app/components/LoginForm'

export const metadata = {
  title: "Login - TaskStack",
};

export default function Login() {
  return (
    <div className='py-5'>
        <div className=''>
            <h1 className="text-title ">

              Login into your task board
            </h1>
        </div>
        <LoginForm/>
    </div>
  )
}
