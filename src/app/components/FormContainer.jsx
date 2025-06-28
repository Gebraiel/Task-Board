import React from 'react'

export default function FormContainer({closeForm,children}) {
  return (
    <div className='fixed flex justify-center items-center right-0 top-0 w-screen h-screen bg-black/20 p-5'>
        <div className='bg-white p-5 lg:w-1/2 w-full max-w-[600px] rounded-lg'>
            <div className='flex justify-between items-center'>
                <h3 className='text-task-title'>Details</h3>
                <button onClick={closeForm} className='size-10 bg-transparent border border-[#00000033] rounded-md flex justify-center items-center'>
                    <img src="/close_ring_duotone-1.svg" />
                </button>
                
            </div>
            {children}
        </div>
    </div>
  )
}
