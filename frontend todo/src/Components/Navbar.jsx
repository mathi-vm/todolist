import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
   <>
    <div className=' shadow-lg mb-5 p-3 container-fluid '>

      <div className='d-flex gap-4 justify-content-between'>
        
      <span className='text-warning fw-light mt-1 fs-5'>ToDay</span>
      <div className=' d-flex gap-3'>
        <Link to='/landing' className="fs-6  btn btn-outline-light fw-medium"style={{textDecoration:"none"}}>Home</Link>
        
      </div>
      </div>
    </div>
  
    </>

  )
}

export default navbar
