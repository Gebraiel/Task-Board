import React from 'react'
import TaskList from './TaskList'

export default function TaskSection({boardId}) {
  return (
    <TaskList boardId={boardId}/>
  )
}
