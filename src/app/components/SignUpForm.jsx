"use client";
import React, { useState } from 'react'
import { signUp } from '../actions'
import InputContainer from './InputContainer'
import { useForm } from 'react-hook-form';
import Loader from './Loader';
import CheckList from './CheckList';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
    const router = useRouter();

    const {
        register,
        watch,
        formState: { errors,isSubmitting },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues:{
            email:"",
            name:"",
            password:"",
            passwordConfirm:""
        }
    });
    const passwordValue = watch("password");
    const passwordConfirmValue = watch("passwordConfirm");
    const onSubmit = async (data)=>{
        console.log(data);
        
        const {error}=await signUp(data)
            
        if(error){
            toast.error(error.message)
        }else{
            toast.success("User registered successfully",{autoClose: 1000,
            onClose: () => router.push("/auth/login"),});
        }

    }
    return (
    
    <>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} >
            <InputContainer label="Name*" inputType="text" id="name"  register={()=>register("name", { required: "This field is required" })} error={errors.name?.message} disabled={isSubmitting}/>
            <InputContainer label="Email*" inputType="text" id="email" register={()=>register("email", {validate:(email)=>{
                const isValid = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
                return  isValid || "Email isn't valid";      
            } ,required: "This field is required" })} error={errors.email?.message} disabled={isSubmitting}/>
            <InputContainer label="Password*" inputType="password" id="password"register={()=>register("password", { required: "This field is required",validate:(password)=>{
                const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>_\-\\/\[\];'`~+=]).{8,}$/.test(password)
                return isValid 
            }})} error={errors.password?.message} disabled={isSubmitting}/>
            <InputContainer label="Confirm Password*" inputType="password" id="password-confirm" register={()=>register("passwordConfirm", { required: "This field is required" ,validate:(passwordConfirm,{password})=>{
                return password == passwordConfirm 
            }})} error={errors.passwordConfirm?.message} disabled={isSubmitting}/>
            <CheckList password={passwordValue} confirmPassword={passwordConfirmValue}/>
            <button disabled={isSubmitting} className="bg-[#3662E3] disabled:bg-[#ccc] mx-auto flex items-center gap-2  px-5 py-3 rounded-3xl text-white">
                {
                    isSubmitting ?
                    <Loader/>
                    : 
                    <span>Submit</span>
                } 
            </button>
            
        </form>  
        <div className='text-center text-[#3662E3] underline'>
                <Link href="/auth/login" >You have already an account?Login</Link>
        </div>
    </>    
)
    
}
