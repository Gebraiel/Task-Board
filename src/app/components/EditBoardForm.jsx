"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteBoard, editBoard } from "../actions";
import { toast } from "react-toastify";
import Loader from "./Loader";
import DeleteMessage from "./DeleteMessage";
import { useRouter } from "next/navigation";
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
        try{
            await editBoard(fullData);
            toast.success('Board Edited Successfuly');
            closeForm()
        }catch(e){
            toast.error(e.message);
        }
    }
    async function deleteTaskFn(){
        setIsDelting(true)
        try{
            await deleteBoard(board.id);
            toast.success('Board Deleted Successfuly')
            router.push("/")
        }catch(e){
            toast.error(e.message)
        }
        setDeleteStatus(false);
        setIsDelting(false);
    }
    const inputClasses ="w-full p-2 placeholder:text-sm border border-[#00000033] text-button  rounded-md outine-none focus:outline-[#3662E3] ";
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="title" className="text-[#97A3B6] text-input-label">
                    Board Name
                </label>
                <input
                    placeholder="Enter Task Title"
                    {...register('name',{required:"This field is required"})}
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
                    placeholder="Enter Task Description"
                    {...register('description')}
                    className={`${inputClasses} resize-none h-28`}
                />
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
