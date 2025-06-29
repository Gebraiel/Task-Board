import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addBoard } from "@/src/app/actions";
import Loader from "@/src/app/components/Loader";
import { toast } from "react-toastify";
import { getFullUser } from "@/src/app/services/client/users";
import InputContainer from "../InputContainer";
export default function AddBoardForm({closeForm}) {
    const user = getFullUser();

    const {register,formState:{errors,isSubmitting},handleSubmit,reset}=useForm();
    const onSubmit= async (data)=>{
        console.log(data);
        const {id} = user;
        console.log(id);
        const fullData = {...data,"user_id":id};
        const error = await addBoard(fullData);
        if(!error){
            reset();
            toast.success("Board Added Successfuly")
            closeForm();
        }
        else{
            toast.error(error)
        }

    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <InputContainer label="Board Name" inputType="text" id="name" register={()=>register("name",{required:"This field is required"})} error={errors.name?.message} disabled={isSubmitting}/>
                
            </div>
            <div>
                <InputContainer label="Description" inputType="textarea" id="description" register={()=>register("description")} disabled={isSubmitting}/>
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
