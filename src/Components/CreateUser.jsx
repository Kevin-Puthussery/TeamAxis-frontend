import axios from 'axios';
import React, { useState } from 'react'

function CreateUser({ onClose,fetch,toast }) {

    const [fullName,setName]=useState("")
    const [password,setPassword]=useState("")
    const [username,setUname]=useState("")
    const [department,setDept]=useState("Sales")

    const CreateUser=async()=>{
        try{
        const UserCreated=await axios.post('http://localhost:3000/api/user/register',{
            username,
            password,
            department,
            fullName
        },{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })

        onClose()
        fetch()
        toast(true)
    }
        catch{
            onClose()
            fetch()
            toast(false)
        }

    }
    const handleClose = () => {
        console.log("Modal Close action triggered.");
        onClose();
    }

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-start pt-20 bg-gray-900 bg-opacity-50"
            onClick={handleClose}
        >
            <div
                className="relative p-4 w-full max-w-md max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal content area */}
                <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-700">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create User
                        </h3>

                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={handleClose}
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <span className='text-red-500'>*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e)=>setName(e.target.value)}
                                    value={fullName}
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter user name"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <span className='text-red-500'>*</span></label>
                                <input
                                    type="password"
                                    name="name"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password}
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Id <span className='text-red-500'>*</span></label>
                                <input
                                    type="email"
                                    onChange={(e)=>setUname(e.target.value)}
                                    value={username}
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="zyz@gmail.com" required=""
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department <span className='text-red-500'>*</span></label>
                                <select
                                    id="category"
                                    onChange={(e)=>setDept(e.target.value)}
                                    value={department}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option value="Sales">Sales</option>
                                    <option value="IT">IT</option>
                                    <option value="Testing">Testing</option>
                                    <option value="QA">QA</option>
                                </select>
                            </div>

                            
                        </div>

                        <button
                            type="button"
                            onClick={()=>CreateUser()}
                            className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Create User <span className='p-1'>+</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser
