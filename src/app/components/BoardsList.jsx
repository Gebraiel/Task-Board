import React from 'react'
import { getBoards, getFullUser } from "@/src/app/services/server/users";
import Board from '@/src/app/components/Board';
import AddBoardButton from '@/src/app/components/AddBoardButton';
export default async function BoardsList() {
   const fullUser = await getFullUser();
    console.log(fullUser)
    const {boards,error} = await getBoards(fullUser.id);
    if(error){
      toast.error(error.message)
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    
    {
      boards.map((board)=>
        <Board board={board} key={board.id}/>
      )
    }


    <AddBoardButton/>

  </div>
  )
}
