"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteTask, editTask } from "../actions";
import Loader from "./Loader";
import { toast } from "react-toastify";
import DeleteMessage from "./DeleteMessage";
import InputContainer from "./InputContainer";
export default function EditForm({task,closeForm}) {
    const {boardId}=useParams();

    const [isDeleting,setIsDelting] = useState(false);
    const {register,formState:{errors,isSubmitting},handleSubmit}=useForm({
        defaultValues:{...task}
    });

    const [deleteStatus,setDeleteStatus]=useState(false);
    console.log("Edit Form re-rendered");    
    const onSubmit= async (data)=>{
        console.log(data);
        let status = data.status
        if(!data.status){
            status = "TODO";
        }
        const fullData = {...data,"board_id":boardId,"status":status};
        const error = await editTask(fullData);
        if(!error){
            toast.success("Task Edited Successfuly");
            closeForm();

        }else{
            console.error("Error: ",error);
            toast.error(error)
        }
    }
    async function deleteTaskFn(){
        setIsDelting(true)
        setDeleteStatus(false);
        const error = await deleteTask(task.id,boardId);
        if(!error){
            toast.success("Task Deleted Successfuly");
        }else{
            console.error("Error: ",error);
            toast.error(error)
        }
        setIsDelting(false);
    }
  
    const inputClasses ="w-full p-2 placeholder:text-sm border border-[#00000033] text-button  rounded-md outine-none focus:outline-[#3662E3] ";
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <InputContainer label="Task Name" inputType="text" id="name" register={()=>register('name',{required:"This field is required"})} error={errors.name?.message} disabled={isSubmitting}/>
            </div>
            <div>
                <InputContainer label="Description" inputType="textarea" id="description" register={()=>register('description')} disabled={isSubmitting}/>
            </div>

            <div>
                <label className="text-[#97A3B6] text-input-label">Status</label>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                    {/* In Progress */}
                    <label className="flex items-center gap-2 justify-between  cursor-pointer relative ">
                    <input
                        type="radio"
                        {...register('status')}
                        value="INPROGRESS"
                        className="hidden peer"
                        id="in-progress"
                    />
                    <div className="flex items-center gap-2 w-full border-2 border-[#00000033] group peer-checked:border-[#3662E3] rounded-xl p-2">
                        <span className="size-10 rounded-md bg-inprogress flex justify-center items-center">
                        <img src="/Time_atack_duotone.svg" alt="in progress icon" />
                        </span>
                        <span className="flex-grow">In Progress</span>
                        <div className="bg-[#3662E3] rounded-full size-5 hidden group-peer-checked:block">
                        <img className="" src="/Done_round.svg" alt="Done Icon" />
                        </div>
                    </div>
                    </label>

                    {/* Completed */}
                    <label className="flex items-center gap-2 justify-between  cursor-pointer relative">
                    <input
                        type="radio"
                        value="COMPLETED"
                        {...register('status')}       
                        className="hidden peer"
                        id="completed"
                        // checked={status=="COMPLETED"}
                    />
                    <div className="flex items-center gap-2 w-full border-2 border-[#00000033] group peer-checked:border-[#3662E3] rounded-xl p-2">
                        <span className="size-10 rounded-md bg-completed flex justify-center items-center">
                        <img src="/Done_round_duotone.svg" alt="completed icon" />
                        </span>
                        <span className="flex-grow">Completed</span>
                        <div className="bg-[#3662E3] rounded-full size-5 hidden group-peer-checked:block">
                        <img className="" src="/Done_round.svg" alt="Done Icon" />
                        </div>
                    </div>
                    </label>

                    {/* Cancelled */}
                    <label className="flex items-center gap-2 justify-between cursor-pointer relative">
                    <input
                        type="radio"
                        name="status"
                        value="CANCELLED"

                        {...register('status')}
                        className="hidden peer"
                        id="cancelled"
                        // checked={status=="CANCELLED"}
                    />
                    <div className="flex items-center gap-2 w-full border-2 border-[#00000033] group peer-checked:border-[#3662E3] rounded-xl p-2">
                        <span className="size-10 rounded-md bg-cancelled flex justify-center items-center">
                        <img src="/close_ring_duotone.svg" alt="cancelled icon" />
                        </span>
                        <span className="flex-grow">Won't Do</span>
                        <div className="bg-[#3662E3] rounded-full size-5 hidden group-peer-checked:block">
                        <img className="" src="/Done_round.svg" alt="Done Icon" />
                        </div>
                    </div>
                    </label>
                </div>
            </div>

            <div className="mt-20 flex gap-3 justify-end"> 
                <button type="button" disabled={isDeleting} onClick={()=>setDeleteStatus(true)} className="bg-[#97A3B6] disabled:bg-[#ccc] flex items-center gap-2  px-5 py-3 rounded-3xl text-white">
                    {
                        isDeleting
                        ?
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
                        isSubmitting ?
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
                Do you want to delete this task
            </DeleteMessage>
        }

        </>
    );
}
