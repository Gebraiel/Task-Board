"use client"
import React, { useState } from 'react'
import FormContainer from '../FormContainer';
import EditBoardForm from '../board/EditBoardForm';

export default function EditButton({board}) {
    const[active,setActive]=useState();
    return (
        <>
            <button onClick={()=>setActive(true)} className="flex items-center bg-amber-500 px-5 py-3 rounded-xl" >
                Edit
                <img
                src="/Edit_duotone.svg"
                width="30"
                height="30"
                alt="pencil icon"
                />
            </button>
            {
                active &&
                <FormContainer closeForm={()=>setActive(false)}>
                        <EditBoardForm board={board} closeForm={()=>setActive(false)}/>
                </FormContainer>
            }
        </>
    )
}
