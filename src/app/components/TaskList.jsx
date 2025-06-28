import React from 'react'
import Task from './Task'
import AddTaskButton from './AddTaskButton'
import { getBoardTasks, getUserTasks } from '@/src/app/services/server/users';
import { createClient } from '@/utils/supabase/server'

export default async function TaskList({boardId}) {
  const supabase= await createClient();
  const { data:{user}, error } = await supabase.auth.getUser();

  const tasks = await getBoardTasks(boardId);
  console.log(tasks);
  return (
    <div className='space-y-5'>
      {
        tasks.length>0?
        tasks.map((task)=> <Task task={task} key={task.id}/>)
        :
        <p className='text-center text-description text-red-600'>No Tasks Created Yet</p>
      }
      <AddTaskButton/>
    </div>
  )
}
