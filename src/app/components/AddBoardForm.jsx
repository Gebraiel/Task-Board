import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBoard } from "../actions";
import { useUser } from "../context/UserContext";
import Loader from "./Loader";
import { toast } from "react-toastify";
export default function AddBoardForm({closeForm}) {
    const {user} = useUser();
    console.log(user);

    const {register,formState:{errors,isSubmitting},handleSubmit,reset}=useForm();
    const inputClasses ="w-full  p-2 placeholder:text-sm border border-[#00000033] disabled:bg-[#ccc] text-button  rounded-md outine-none focus:outline-[#3662E3] ";
    const onSubmit= async (data)=>{
        console.log(data);
        
        const {id} = user;
        console.log(id);
        const fullData = {...data,"user_id":id};
        try{
            await addBoard(fullData);
            reset();
            toast.success("Board Added Successfuly")
            closeForm();
        }catch(e){
            toast.error(e.message)
        }

    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="name" className="text-[#97A3B6] text-input-label">
                    Board Name
                </label>
                <input
                    disabled={isSubmitting}
                    placeholder="Enter Task Title"
                    type="text"
                    {...register('name',{required:true})}
                    className={inputClasses}
                />
                {
                    errors.title &&
                    <p className="text-red-500 italic text-sm">                    
                        This field is required
                    </p> 
                }
            </div>
            <div>
                <label
                    htmlFor="description"
                    className="text-[#97A3B6] text-input-label"
                >
                    Description
                </label>
                <textarea
                    disabled={isSubmitting}
                    placeholder="Enter Task Description"
                    {...register('description')}

                    className={`${inputClasses} resize-none h-28`}
                />
            </div>

            <button disabled={isSubmitting} className="bg-[#3662E3] disabled:bg-[#ccc] flex items-center gap-2 ml-auto mt-20 px-5 py-3 rounded-3xl text-white">
                {
                    isSubmitting?
                    <Loader/>
                    :
                    <>
                        <span>Add</span> 
                        <span><img src="/Done_round.svg" alt="Add Icon" /></span>
                    </>
                }
            </button>
        </form>
    );
}
