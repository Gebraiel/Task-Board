import React from 'react'
import Notification from './Notification'

export default function ErrorMessage({children}) {
  return (
    <Notification background='bg-task-cancelled'>{children}</Notification>
  )
}
