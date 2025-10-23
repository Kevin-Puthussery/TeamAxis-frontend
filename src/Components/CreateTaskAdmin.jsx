import React from 'react'
import { useState } from 'react';
import axios from 'axios';


function CreateTaskAdmin({onClose,Toast,fetch}) {
    
    
    const handleClose = () => {
        console.log("Modal Close action triggered.");
    }
    const[title,setTitle]=useState()
    const[Desc,setDesc]=useState()
    const[dep,setDep]=useState("Sales")
    const[sdate,setSdate]=useState()
    const[edate,setEdate]=useState()

    const Tasks={
        name:title,
        description:Desc,
        department:dep,
        startDate:sdate,
        endDate:edate
    }

    const CreateTask=async()=>{
        const response=await axios.post("http://localhost:3000/api/task/create",Tasks,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        onClose()
        fetch()
        if (response.data.msg){
            Toast(true)
        }
        else{
            Toast(false)
        }
    }

    return (
        
        <div 
            id="crud-modal" 
            tabIndex="-1" 
            aria-hidden="true" 
            className="fixed top-0 left-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-start pt-20 bg-gray-900 bg-opacity-50"
            onClick={onClose} 
        >
            
            <div 
                className="relative p-4 w-full max-w-md max-h-full"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Modal content area */}
                <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create Task
                        </h3>
                        
                        <button 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium ">Title</label>
                                <input type="text" name="name" onChange={(e)=>setTitle(e.target.value)} value={title} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" required="" />
                            </div>
                            <div className="col-span-2 sm:col-span-2">
                                <label className="block text-sm font-semibold ">
                                    Description :
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Enter description"
                                    onChange={(e)=>setDesc(e.target.value)} value={Desc}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                ></textarea>
                            </div>
                            <br />
                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium">Department</label>
                                <select id="category" onChange={(e)=>setDep(e.target.value)} value={dep} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue="">Sales</option>
                                    <option value="IT">IT</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Testing">Testing</option>
                                    <option value="QA">QA</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold">
                                        Start Date :
                                    </label>
                                    <input
                                        type="date"
                                        onChange={(e)=>setSdate(e.target.value)} value={sdate}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">
                                        End Date :
                                    </label>
                                    <input
                                        onChange={(e)=>setEdate(e.target.value)} value={edate}
                                        type="date"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                           
                        </div>
                        <button type="button" onClick={CreateTask} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Create Task <span className='p-1'>+</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTaskAdmin