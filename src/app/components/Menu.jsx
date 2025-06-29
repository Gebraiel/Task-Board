"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'
import { signOut } from '../actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Menu() {
  const path=usePathname();
  const router = useRouter()
  console.log(path);
  async function logout(){
    try{
        await signOut();
        toast.success("GoodBye...");
        router.push('/auth/login')
    }catch(e){
        toast.error(e.message)
    }
  }
  if(!path.includes('auth'))
    return (
        <ul className='flex gap-2 sm:gap-5'>
            <li><Link href='/'>My Boards</Link></li>
            <li><button onClick={logout}>Logout</button></li>
        </ul>
    )
    return null;
}
