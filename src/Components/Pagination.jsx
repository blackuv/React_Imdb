import React from 'react'

export const Pagination = ({handleNext, handlePrev, pageNo}) => {
  return (
    <div>
    <div className='bg-gray-300 p-4 flex justify-center gap-2 w-full mt-6'>
      <div onClick={handlePrev} className='px-6 hover:cursor-pointer' >
        <i className='fa-solid fa-arrow-left'></i>
      </div>
      <div className='hover:cursor-pointer'>{pageNo}</div>
      <div onClick={handleNext} className='px-6 hover:cursor-pointer'>
        <i className='fa-solid fa-arrow-right'></i>
      </div>
    </div>
    </div>
  )
}

export default Pagination
