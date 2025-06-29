"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteBoard, editBoard } from "../actions";
import { toast } from "react-toastify";
import Loader from "./Loader";
import DeleteMessage from "./DeleteMessage";
import { useRouter } from "next/navigation";
import InputContainer from "./InputContainer";
export default function EditBoardForm({board,closeForm}) {
    const router = useRouter();
    const [isDeleting,setIsDelting] = useState(false);
    const {register,formState:{errors,isSubmitting},handleSubmit}=useForm({
        defaultValues:{...board}
    });
    const [deleteStatus,setDeleteStatus]=useState(false);
    const onSubmit= async (data)=>{
        console.log(data);
        const fullData = {...data,"id":board.id};
        const error = await editBoard(fullData);
        if(!error){
            toast.success('Board Edited Successfuly');
            closeForm()
        }else{
            toast.error(error);
        }
    }
    async function deleteTaskFn(){
        setIsDelting(true)
        
        const error = await deleteBoard(board.id);
        if(!error)
        {
            toast.success('Board Deleted Successfuly')
            router.push("/")
        }
        else{
            toast.error(error)
        }
        setDeleteStatus(false);
        setIsDelting(false);
    }
    const inputClasses ="w-full p-2 placeholder:text-sm border border-[#00000033] text-button  rounded-md outine-none focus:outline-[#3662E3] ";
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <InputContainer label="Board name" inputType="text" id="name" error={errors.name?.message} register={()=>register('name',{required:"This field is required"})} disabled={isSubmitting}/>
            </div>
            <div>
                <InputContainer label="description" inputType="textarea" id="description" error={errors.description?.message} register={()=>register('description')} disabled={isSubmitting}/>
            </div>


            <div className="mt-20 flex gap-3 justify-end"> 
                <button type="button" disabled={isDeleting} onClick={()=>setDeleteStatus(true)} className="bg-[#97A3B6] bg-[#ccc] flex items-center gap-2  px-5 py-3 rounded-3xl text-white">
                    {
                        isDeleting?
                        <Loader/>
                        :
                        <>
                            <span>Delete</span> 
                            <span><img src="/Trash.svg" alt="Trash Icon" /></span>
                        </>
                    }
                </button>
                <button type="submit" disabled={isSubmitting} className="bg-[#3662E3] disabled:bg-[#ccc] flex items-center gap-2  px-5 py-3 rounded-3xl text-white">
                    {
                        isSubmitting?
                        <Loader/>
                        :
                        <>
                            <span>Save</span> 
                            <span><img src="/Done_round.svg" alt="Add Icon" /></span>
                        </>
                    }
                </button>
                
            </div>
        </form>
        {
            deleteStatus &&
            <DeleteMessage deleteFn={deleteTaskFn} cancel={()=>setDeleteStatus(false)}>
                Do you want to delete this board
            </DeleteMessage>
        }
        </>
    );
}
