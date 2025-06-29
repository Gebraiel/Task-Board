import { getBoard, getFullUser } from "@/src/app/services/server/users";
import EditButton from "@/src/app/components/task/EditButton";
import { Suspense } from "react";
import Error from "@/src/app/components/error/Error";
import Loading from "@/src/app/loader";
import TaskList from "@/src/app/components/task/TaskList";
export async function generateMetadata({params}) {
  const { boardId } = await params;
 
  const board = await getBoard(boardId);
  return {
    title: `${board.name} - TaskStack`,
    description:board.description
  }
}
export default async function Board({params}) {
  const user = await getFullUser();
  const {boardId} = await params;
  const board = await getBoard(boardId);
  if(!board){
    return <Error>This board is not found</Error>

  }
  console.log(board)
  const {name,description,user_id,id} = board;
  if(user_id != user.id){
    return <Error>You are not authorized to access this board</Error>
  }
  console.log(boardId);

  return (
    <>
      <div className="lg:w-1/2 w-full px-5 py-5 space-y-10">
        <div className="flex items-center gap-2 justify-between flex-wrap">
          <div>
            <h1 className="flex gap-2 items-center">
              
              <p className="text-title">{name}</p>
              
            </h1>
            <h2>{description}</h2>
          </div>
          <EditButton board={board}/>
        </div>
        <Suspense fallback={<Loading/>}>
          <TaskList boardId={boardId}/>
        </Suspense>
      </div>
      
    </>
  );
}
