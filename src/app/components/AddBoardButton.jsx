"use client"
import React, { useState } from 'react'
import AddBoardForm from './AddBoardForm';
import FormContainer from './FormContainer';
import UserContextProvider from '../context/UserContext';

export default function AddBoardButton() {
    const [active,setActive] = useState(false);
    return (
        <>
            <button onClick={()=>setActive(true)} className="bg-task-toadd p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer flex flex-col justify-center items-start">
                <h2 className="font-bold text-lg">Create new board</h2>
                <p className="text-xs text-gray-500 mt-2">Add a new task board to your list</p>
            </button>
            {
                active && 
                <FormContainer >
                    <UserContextProvider>
                        <AddBoardForm closeForm={()=>setActive(false)}/>
                    </UserContextProvider>
                </FormContainer>
            }
        </>
  )
}
