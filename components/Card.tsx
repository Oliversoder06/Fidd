import Link from 'next/link'
import React from 'react'


const Card = ({ fullName, email, id }: { fullName: string, email: string, id: number }) => {
  return (
    <div className='w-[400px] h-auto border-[3px] border-black border-solid flex flex-col items-center py-5'>
      <h1 className='text-black font-bold text-[40px]'>{fullName}</h1>
      <h1 className='text-black text-[27.4532px]'>{email}</h1>
      <Link href={`/${id}`} className="text-xl font-bold text-white w-[200px] h-[40px] rounded-full bg-[#4D4D4D] mt-5 flex items-center justify-center">
        View person
      </Link>
    </div>
  )
}

export default Card