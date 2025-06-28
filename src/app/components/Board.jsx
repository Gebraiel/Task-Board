import Link from 'next/link';
import React from 'react'

export default function Board({board}) {
  const {name,description,id} = board;
  return (
    <Link href={`/board/${id}`} className="bg-[#FDEBCC] p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer">
        <h2 className="font-bold text-lg">{name}</h2>
        <p className="text-sm mt-1">{description}</p>
    </Link>
  )
}
