import React from 'react'
import { GrUpdate } from 'react-icons/gr';

function CreateUser({onClose}) {
  return (
    <div className=''>
      
      {/* 1. Outer Backdrop: This element listens for clicks to close the modal */}
      <div 
        id="crud-modal" 
        tabIndex="-1" 
        onClick={onClose} // This handles closing when clicking the backdrop
        className=" flex bg-white/20 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full"
      >
        <div 
          className="relative p-4 w-full max-w-md max-h-full"
          // 2. Inner Container: ADD THIS onClick handler to stop propagation
          onClick={(e) => e.stopPropagation()} 
        >
          
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            
            {/* ... rest of your modal content ... */}

          </div>
        </div>
      </div> 

    </div>
  )
}

export default CreateUser