"use client";
import React, { useState } from 'react'
import FormContainer from './FormContainer';
import EditForm from './EditForm';

export default function Task({task}) {
    const {name,description,status}= task;
    let statusIcon;
    let taskBg;
    const [editFormActive,setEditFormActive]=useState(false);
    switch(status){
        case "INPROGRESS":
            statusIcon = <div className='size-10 flex justify-center items-center rounded-md bg-inprogress'><img src="/Time_atack_duotone.svg" alt="in progress icon"/></div>
            taskBg="bg-task-inprogress";
            break;
        case "COMPLETED" :     
            statusIcon = <div className='size-10 flex justify-center items-center rounded-md bg-completed'><img src="/Done_round_duotone.svg" alt="completed icon"/></div>
            taskBg="bg-task-completed";
            break;
        case "CANCELLED":
            statusIcon = <div className='size-10 flex justify-center items-center rounded-md bg-cancelled'><img src="/close_ring_duotone.svg" alt="cancelled icon"/></div>
            taskBg="bg-task-cancelled";
            break;
        default:
            taskBg="bg-task-todo"
    } 
  return (
    <>
        <button onClick={()=>setEditFormActive(true)} className={`flex justify-between items-center p-5 w-full ${taskBg} rounded-xl `}>
            <div className='text-left w-full'>
                <b className='text-task-title'>{name}</b>
                <p className='w-3/4 text-description'>{description}</p>
            </div>
            {statusIcon}
        </button>
        {
            editFormActive &&
            <FormContainer closeForm={()=>setEditFormActive(false)}>
                <EditForm task={task} closeForm={()=>setEditFormActive(false)}/>
            </FormContainer>
        }
    </>
  )
}
