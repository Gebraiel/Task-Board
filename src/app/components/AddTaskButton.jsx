"use client";
import React, { useState } from 'react'
import FormContainer from './FormContainer';
import AddFormMemo from './AddForm';

export default function AddTaskButton() {
    const [formActive,setFormActive] = useState(false);
    console.log("Add Task Button Re-rendered");
    return (
        <>
            <button onClick={()=>setFormActive(true)} className={`flex justify-between items-center p-5 w-full bg-task-toadd rounded-xl `}>
                <div className='text-left w-full'>
                    <b className='text-task-button'>Add New Task</b>
                </div>
            </button>
            {
                formActive && 
                <FormContainer closeForm={()=>setFormActive(false)}>
                    <AddFormMemo closeForm={()=>setFormActive(false)}/>
                </FormContainer>
            }
        </>
    )
}

