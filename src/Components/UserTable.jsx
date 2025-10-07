import React, { useState } from 'react'
import UserEditComponent from './UserEditComponent'
import CreateUser from './CreateUser' // Assuming you'll have a CreateUser component
import { FaEdit } from 'react-icons/fa'
import { FaUserPlus } from 'react-icons/fa' // Importing a relevant icon for 'Create User'
import Header from './Header'

function UserTable() {
    // State for the Edit modal (currently used for Edit links)
    const [openEditModal, setOpenEditModal] = useState(false) 
    
    // State for the Create User modal (new state)
    const [openCreateModal, setOpenCreateModal] = useState(false)

    // Helper functions for modal visibility
    const openEdit = () => setOpenEditModal(true);
    const closeEdit = () => setOpenEditModal(false);
    
    const openCreate = () => setOpenCreateModal(true);
    const closeCreate = () => setOpenCreateModal(false);

    // I've replaced your original 'open' state with 'openEditModal' for clarity.
    // The previous 'open' variable is now obsolete/replaced.

    return (
        <>
            <div className='w-full h-full bg-gray-900'>
                <Header/>

                {/* Container for table, search/filter bar, and the new Create User button */}
                <div className='flex justify-center p-4'>
                    <div className='w-3/4 max-w-7xl'> {/* Adjusted width for better control */}
                        
                        {/* ---------------------------------------------------- */}
                        {/* New Section: Search Bar and Create User Button */}
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                            
                            {/* Search/Filter Bar (Placeholder) */}
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                            </div>
                            
                            {/* THE NEW "CREATE USER" BUTTON (Top Right) */}
                            <button
                                onClick={CreateUser} // Open the Create modal on click
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                <FaUserPlus className="w-4 h-4 me-2" />
                                Create User
                            </button>
                        </div>
                        {/* ---------------------------------------------------- */}

                        <div className={`relative overflow-x-auto shadow-md rounded-lg`}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4"></th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Username</th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Email Id</th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Password</th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Department</th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Status</th>
                                        <th scope="col" className="px-6 py-3 text-xl font-bold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple MacBook Pro 17"</th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">Laptop</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            {/* Updated onClick to use the new openEdit function */}
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove </a>
                                        </td>
                                    </tr>
                                    {/* ... rest of your existing <tr> rows, updated below for brevity ... */}
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Microsoft Surface Pro</th>
                                        <td className="px-6 py-4">White</td>
                                        <td className="px-6 py-4">Laptop PC</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Magic Mouse 2</th>
                                        <td className="px-6 py-4">Black</td>
                                        <td className="px-6 py-4">Accessories</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple iMac</th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">PC</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple AirPods</th>
                                        <td className="px-6 py-4">White</td>
                                        <td className="px-6 py-4">Accessories</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">iPad Pro</th>
                                        <td className="px-6 py-4">Gold</td>
                                        <td className="px-6 py-4">Tablet</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Magic Keyboard</th>
                                        <td className="px-6 py-4">Black</td>
                                        <td className="px-6 py-4">Accessories</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple TV 4K</th>
                                        <td className="px-6 py-4">Black</td>
                                        <td className="px-6 py-4">TV</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">AirTag</th>
                                        <td className="px-6 py-4">Silver</td>
                                        <td className="px-6 py-4">Accessories</td>
                                        <td className="px-6 py-4">Yes</td>
                                        <td className="px-6 py-4">No</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={ (e) => { e.preventDefault(); openEdit() } } className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"><FaEdit className="me-1" />Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Conditional Rendering of Modals */}
                {/* The Edit Modal, now controlled by openEditModal */}
                {openEditModal && <UserEditComponent onClose={closeEdit}/> } 
                
                {/* The Create Modal (Uncomment and import the component when ready) */}
                {/* {openCreateModal && <CreateUser onClose={closeCreate}/> } */}
            </div>
        </>
    )
}

export default UserTable