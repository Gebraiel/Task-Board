import React from 'react'

export default function DeleteMessage({cancel,deleteFn,children}) {
  return (
    <div className="fixed inset-0 h-screen w-screen bg-black/30 flex justify-center items-center">
        <div className='bg-white p-5 rounded-xl'>
            <p>{children}</p>
            <div className='flex justify-center gap-5 mt-5'>
                <button onClick={cancel} className='bg-blue-400  px-5 py-3 rounded-3xl text-white'>Cancel</button>
                <button onClick={deleteFn} className='bg-red-400  px-5 py-3 rounded-3xl text-white'>Confirm</button>
            </div>
        </div>
    </div>
  )
}
