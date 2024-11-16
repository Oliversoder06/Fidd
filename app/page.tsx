import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <div className='h-screen'>
      <div className='flex h-full items-center justify-center'>
        <Link href="/create">
          <p className='text-4xl font-semibold'>CREATE USER</p>
        </Link>
      </div>
    </div>
  )
}

export default Hero