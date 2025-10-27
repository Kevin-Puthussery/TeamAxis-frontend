import axios from 'axios';
import React, { useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { MdDone } from 'react-icons/md';
import { IoMdSync } from 'react-icons/io';
const SERVER_API=process.env.VITE_API_URL


function EditTaskAdmin({ onClose, task, notify,fetch }) {
  const [comment,setComment]=useState()
  const EditFunction=async(id)=>{
    const editedData=await axios.put(`${SERVER_API}/api/task/update/${id}`,{
      completed:true,
      AdminComments:comment,
      UserComplete:false
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    if (editedData.data.msg){
        notify(true)
    }
    else{
        notify(false)
    }
    fetch()
    onClose()
  }
  const ReassignFunction=async(id)=>{
    const editedData=await axios.put(`${SERVER_API}/api/task/update/${id}`,{
      UserComplete:false,
      AdminComments:comment
    },{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    if (editedData.data.msg){
        notify(true)
    }
    else{
        notify(false)
    }
    fetch()
    onClose()
  }
  return (
    <div>
      <div
        id="crud-modal"
        tabIndex="-1"
        onClick={onClose}
        aria-hidden="true"
        className="flex bg-white/20 backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full"
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
        >
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Update Task
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Form */}
            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                {/* Task Title */}
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={task?.name || ""}
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>

                {/* Current Status */}
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Current Status
                  </label>
                  <span className="block w-full p-2 bg-gray-100 rounded text-gray-800 dark:bg-gray-600 dark:text-white">
                    {task?.completed?"COMPLETED":"PENDING"}
                  </span>
                </div>
                {task.UserComplete &&<div className="col-span-2 sm:col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white">
                                    Add Comments :
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Enter description"
                                    onChange={(e)=>setComment(e.target.value)} value={comment}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm text-gray-800 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
                                ></textarea>
                            </div>}
              </div>
                <div className='flex justify-between'>
                  <button
                type="button"
                onClick={()=>EditFunction(task._id)}
                className="text-white inline-flex items-center bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Complete Task <span className="p-1"><MdDone /></span>
              </button>
              {task.UserComplete &&<button
                type="button"
                onClick={()=>ReassignFunction(task._id)}
                className="text-white inline-flex items-center bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
              >
                Re-Assign <span className="p-1"><IoMdSync /></span>
              </button>}
                </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskAdmin;
