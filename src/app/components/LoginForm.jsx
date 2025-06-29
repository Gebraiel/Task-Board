"use client";
import React, { useState } from 'react'
import { login } from '../actions'
import InputContainer from './InputContainer'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter()
    const {
            register,
            formState: { errors,isSubmitting },
            handleSubmit,
        } = useForm({
            defaultValues:{
                email:"",
                password:"",
            }
        });
    const onSubmit =async (data)=>{
        const {email,password} = data;
            const error =  await login({email,password});
        if(!error)
        {
            toast.success("You've logged in Successfuly.Welcome!")
            router.push("/")
        }
        toast.error(error)
        
    }
    return (
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} >
            <InputContainer label="Email" inputType="text" id="email" error={errors.email?.message} register={()=>register("email",{required:"This field is required"})} disabled={isSubmitting}/>
            <InputContainer label="Password" inputType="password" id="password" error={errors.password?.message} register={()=>register("password",{required:"This field is required"})} disabled={isSubmitting} />
            
            <div className='flex justify-between items-center gap-5 '>
                <button disabled={isSubmitting} className="bg-[#3662E3] disabled:bg-[#ccc] flex items-center gap-2  px-5 py-3 rounded-3xl text-white">
                    {
                        isSubmitting?
                        <Loader/>
                        :
                        <span>Submit</span>
                    } 
                </button>

                <Link href="/auth/signup" className='underline text-[#3662E3]'>Create Account</Link>
            </div>
        </form>
    )
}
