"use client"
import React, { useState } from 'react'

export default function InputContainer({label,inputType,id,error="",register,disabled=false}) {
    const [showPassword,setShowPassword] = useState()
    const inputClasses ="w-full p-2 placeholder:text-sm border border-[#00000033] text-button  rounded-md outine-none focus:outline-[#3662E3] disabled:bg-[#ccc] ";
    const labelClasses = "text-[#97A3B6] text-input-label relative";
    const errorClasses = "border-red-500";
    return (
    <>
        <label htmlFor={id}  className={labelClasses}>{label}</label>
        {
            inputType =='textarea'?
            <textarea
                disabled={disabled}
                id={id}
                {...register()}
                className={`${inputClasses} resize-none h-28`}
            />
            :

            <div className='relative'>
                <input disabled={disabled} className={`${inputClasses} ${error?errorClasses:""} `} {...register()} type={`${showPassword?'text':inputType}`} id={id} />
                {
                    inputType =='password' &&
                    <button type="button" onClick={()=>setShowPassword(!showPassword)} className='button absolute top-1/2 right-2 -translate-y-1/2 '>
                        {
                            showPassword ? 
                            <img alt="Show Password Button" src='/eye-solid.svg' width="20" height="20"/>
                            :
                            <img alt="Hide Password Button" src='/eye-slash-solid.svg' width="20" height="20"/>
                        }
                        
                    </button>
                }
            </div>
        }
        {
            error && <p className='text-red-500 italic text-xs'>{error}</p>
        }
    </>
    )
}
