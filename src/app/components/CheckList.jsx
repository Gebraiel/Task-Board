import React from 'react'
import CheckPoint from './CheckPoint'

export default function CheckList({password,confirmPassword}) {
    console.log(password,confirmPassword)
  const checkList = [
    {
        text:"Password must contain at least 8 characters",
        condition:password.length >= 8   
    },
    {
        text:"Password must contain uppercase and lowercase letters",
        condition:(/^(?=.*[a-z])(?=.*[A-Z]).+$/).test(password)
    },
    {
        text:"Password must contain at least special character",
        condition:(/^(?=.*[!@#$%^&*(),.?":{}|<>_\-\\/\[\];'`~+=]).+$/).test(password)
    },
    {
        text:"Password must match the confirm password",
        condition:password == confirmPassword && password.length>0
    },
  ]
  return (
    <div className='flex flex-col gap-1'>
        {checkList.map((checkpoint,index)=>{
            return <CheckPoint isValid={checkpoint.condition} key={index} >{checkpoint.text}</CheckPoint>
        })}
    </div>
  )
}
