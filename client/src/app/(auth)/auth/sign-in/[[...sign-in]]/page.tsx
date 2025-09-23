import { SignIn } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen  p-4 bg-current'>
        <SignIn/>
    </div>
  )
}

export default page
