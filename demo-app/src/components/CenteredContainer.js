import React from "react"

export default function CenteredContainer({ children }) {
  return (
    <div className='flex justify-center items-center h-screen'>{children}</div>
  )
}
