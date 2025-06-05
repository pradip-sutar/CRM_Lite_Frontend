import React from 'react'
import { useParams } from 'react-router-dom'
const Callback = () => {
  const { id } = useParams()
  console.log("hello",id)
  return (
    <div>This is for testing purpose</div>
  )
}

export default Callback