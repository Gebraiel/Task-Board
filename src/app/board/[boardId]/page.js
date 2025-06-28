import Image from "next/image";
import TaskList from "@/src/app/components/TaskList";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getBoard } from "../../services/server/users";
import EditButton from "../../components/EditButton";
import { Suspense } from "react";
import Loader from "../../components/Loader";
import TaskSection from "../../components/TaskSection";

export default async function Board({params}) {

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }
  const {boardId} = await params;
  const board = await getBoard(boardId);
  const {name,description,id} = board;
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
        <Suspense fallback={<Loader/>}>
          <TaskSection boardId={boardId}/>
        </Suspense>
      </div>
      
    </>
  );
}
