import React from 'react'

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  },0)
  return (
    <>
        <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

export default Total