import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { addTask } from "../../actions";
import Loader from "../Loader";
import { toast } from "react-toastify";
import InputContainer from "../InputContainer";
export default function AddForm({closeForm}) {
  const { boardId } = useParams();
  
  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  console.log("Add Form Re-rendered");
  const inputClasses =
    "w-full p-2 placeholder:text-sm border border-[#00000033] disabled:bg-[#ccc] text-button  rounded-md outine-none focus:outline-[#3662E3] ";
  const onSubmit = async (data) => {
    console.log(data);
    let status = data.status;
    if (!data.status) {
      status = "TODO";
    }
    const fullData = { ...data, board_id: boardId, status: status };
    const error=await addTask(fullData);
    if(!error)
    {
      toast.success("Task Added Successfuly")
      closeForm();
    }
    else{
        console.error("Error: ",e);
        toast.error(e.message)
    }
  };

  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputContainer label="Task Name" id="name" inputType="text" register={()=>register("name", { required: "This field is required" })} error={errors.name?.message} disabled={isSubmitting}/>
          
        </div>
        <div>
          <InputContainer label="Description" id="description" inputType="textarea" register={()=>register("description")} disabled={isSubmitting}/>
        </div>

        <div>
          <label className="text-[#97A3B6] text-input-label">Status</label>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {/* In Progress */}
            <label className="flex items-center gap-2 justify-between  cursor-pointer relative ">
              <input
                type="radio"
                name="status"
                {...register("status")}
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
                {...register("status")}
                value="COMPLETED"
                className="hidden peer"
                id="completed"
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
                {...register("status")}
                value="CANCELLED"
                className="hidden peer"
                id="cancelled"
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
        <button disabled={isSubmitting} className={`${isSubmitting ? "bg-[#ccc]" : "bg-[#3662E3]"} flex items-center gap-2 ml-auto mt-20 px-5 py-3 rounded-3xl text-white`}>
          {
            isSubmitting ? 
              <Loader/>
            :
            <>
              <span>Add</span>
              <span>
                <img src="/Done_round.svg" alt="Add Icon" />
              </span>
            </>
          }
        </button>
      </form>
      
    </>
  );
}
