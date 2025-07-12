import BoardsList from './components/board/BoardsList';
import { Suspense } from 'react';
import Loading from './loading';
export const metadata = {
  title: "Taskstack",
  description:"A task management web app where users can create boards and manage tasks with secure login."
};
export default function Home() {
  
  return (
   <div className="p-6 max-w-[1000px] w-full">
    <h1 className="flex gap-2 items-center text-title mb-5">

      <p>Your Boards</p>
      
    </h1>
    <Suspense fallback={<Loading/>}>
      <BoardsList />
    </Suspense>
</div>

  );
}
