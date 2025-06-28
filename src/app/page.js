import { redirect } from 'next/navigation'
import { getBoards, getFullUser } from "@/src/app/services/server/users";
import Board from './components/Board';
import AddBoardButton from './components/AddBoardButton';

export default async function Home() {
  const fullUser = await getFullUser();
  console.log("fullUser",fullUser);
  if (!fullUser) {
    redirect('/auth/login')
  }
  
  console.log(fullUser)
  const boards = await getBoards(fullUser.id);
  console.log(boards);
  console.log("Full User : ",fullUser)
  return (
   <div className="p-6">
    <h1 className="flex gap-2 items-center text-title mb-5">

      <p>Your Boards</p>
      
    </h1>
  
  

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
    
    {
      boards.map((board)=>
        <Board board={board} key={board.id}/>
      )
    }


    <AddBoardButton/>

  </div>
</div>

  );
}
