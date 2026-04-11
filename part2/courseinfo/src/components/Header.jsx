import React from 'react'
import Part from './Part'
const Header = ({ course }) => {
  return (
    <div>
        <h1>{course.name}</h1>
    </div>
  )
}

export default Header