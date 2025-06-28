import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { signOut } from '../actions'
import Menu from './Menu'

export default function Header() {
  return (
    <header className='contianer px-5 py-5 flex gap-5 justify-between items-center'>
        <div className='flex items-center gap-3'>
            <Image src="/Logo.svg" width="50" height="50" alt="Task Logo" />
            <b className='text-xl'>TaskStack </b>
        </div>
        <Menu/>
    </header>
  )
}
