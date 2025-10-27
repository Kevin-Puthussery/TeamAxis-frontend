import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GrUpdate } from 'react-icons/gr';
const SERVER_API=process.env.VITE_API_URL


function UserEditComponent({onClose,id,fetch,toast}) {

    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    // const [Department,setDepartment]=useState("")
    const [Status,setStatus]=useState("Inactive")

    const UpdatedData={}
    if(name.trim()!== "") UpdatedData.fullName=name
    if(password.trim()!== "") UpdatedData.password=password
    if(Status) UpdatedData.status=Status

    const UpdateUser=async()=>{
           const Edit= await axios.put(`${SERVER_API}/api/user/update/${id}`,
            UpdatedData,
        {
            headers:{
              Authorization:localStorage.getItem("token")  
            }
           })

        onClose()
        fetch()
        if(Edit.data.msg){
            toast(true)
        }
        // else if(Edit.data.exist) {
            
        //     toast("UserExist")
        // }
        else{
            toast(false)

        }
        }
  return (
    <div className=''>
      


<div id="crud-modal" tabindex="-1" aria-hidden="true" class=" flex bg-white/20 backdrop-blur-sm  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full">
    <div class="relative p-4 w-full max-w-md max-h-full">
        
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    Update User
                </h3>
                <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            
            <form class="p-4 md:p-5" action={"POST"}>
                <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Name" required=""/>
                    </div>
                    <div class="col-span-2 sm:col-span-1">
                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="email" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="***********" required=""/>
                    </div>
                    {/* <div class="col-span-2 sm:col-span-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                        <select onChange={(e)=>setDepartment(e.target.value)} value={Department} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option selected="">Sales</option>
                            <option value="TV">IT</option>
                            <option value="PC">Finance</option>
                            <option value="GA">Testing</option>
                            <option value="GA">QA</option>

                        </select>
                    </div> */}
                    <div class="col-span-2 sm:col-span-1 pb-1">
                        <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select onChange={(e)=>setStatus(e.target.value)} value={Status} id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                            <option value="Inactive">Inactive</option>
                            <option value="Active" >Active</option>
                        </select>
                    </div>
                    {/* <div class="col-span-2">
                        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                    </div> */}
                </div>
                <button type="button" onClick={()=>UpdateUser()} class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {/* <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg> */}
                    Update User <span className='p-1'><GrUpdate /> </span>
                </button>
            </form>
        </div>
    </div>
</div> 

    </div>
  )
}

export default UserEditComponent
