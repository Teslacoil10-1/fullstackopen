import React from 'react'
import Content from './Content'
import Header from './Header'
import Total from './Total'
const Course = ({ course }) => {
  return (
    <div>
      {course.map(currentCourse => 
      <div>
        <Header key={currentCourse.id} course={currentCourse} />
        <Content key={currentCourse.id} course={currentCourse} />
        <Total key={currentCourse.id} course={currentCourse} />
      </div>
      )}
      
    </div>
  )
}

export default Course