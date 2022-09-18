import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className='p-4'>
      <div>
        <h1 className='text-2xl font-semibold'>AuthnAuth Demo</h1>
        <h2 className='text-xl'>With Node</h2>
        <p className='text-base text-gray-600 my-2'>
          Authentication and Authorization demo using React and Node
        </p>
      </div>
      <div>
        <Link
          className='text-gray-600 text-md font-medium underline'
          to='/signup'
        >
          Signup
        </Link>
        <Link
          className='ml-2 text-gray-600 text-md font-medium underline'
          to='/signin'
        >
          Signin
        </Link>
      </div>
    </div>
  )
}
