import React, { useState } from 'react'
import UserEditComponent from './UserEditComponent'
import CreateUser from './CreateUser'
import { FaEdit, FaUserPlus } from 'react-icons/fa'
import Header from './Header'

function UserTable() {

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)

    const openEdit = () => setOpenEditModal(true)
    const closeEdit = () => setOpenEditModal(false)

    const openCreate = () => setOpenCreateModal(true)
    const closeCreate = () => setOpenCreateModal(false)

    return (
        <>
            <div className='w-full h-full bg-gray-900'>
                <Header />

                <div className='flex justify-center p-4'>
                    <div className='w-3/4 max-w-7xl'>

                        {/* Search bar and Create User button */}
                        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search-users"
                                    className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search for users"
                                />
                            </div>

                            {/* ✅ Fixed onClick handler */}
                            <button
                                onClick={openCreate}
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                <FaUserPlus className="w-4 h-4 me-2" />
                                Create User
                            </button>
                        </div>

                        {/* Table */}
                        <div className="relative overflow-x-auto shadow-md rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th className="p-4"></th>
                                        <th className="px-6 py-3 text-xl font-bold">Username</th>
                                        <th className="px-6 py-3 text-xl font-bold">Email Id</th>
                                        <th className="px-6 py-3 text-xl font-bold">Password</th>
                                        <th className="px-6 py-3 text-xl font-bold">Department</th>
                                        <th className="px-6 py-3 text-xl font-bold">Status</th>
                                        <th className="px-6 py-3 text-xl font-bold">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</th>
                                        <td className="px-6 py-4">john@example.com</td>
                                        <td className="px-6 py-4">••••••</td>
                                        <td className="px-6 py-4">IT</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</th>
                                        <td className="px-6 py-4">john@example.com</td>
                                        <td className="px-6 py-4">••••••</td>
                                        <td className="px-6 py-4">IT</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</th>
                                        <td className="px-6 py-4">john@example.com</td>
                                        <td className="px-6 py-4">••••••</td>
                                        <td className="px-6 py-4">IT</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</th>
                                        <td className="px-6 py-4">john@example.com</td>
                                        <td className="px-6 py-4">••••••</td>
                                        <td className="px-6 py-4">IT</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">John Doe</th>
                                        <td className="px-6 py-4">john@example.com</td>
                                        <td className="px-6 py-4">••••••</td>
                                        <td className="px-6 py-4">IT</td>
                                        <td className="px-6 py-4">Active</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ✅ Modals */}
                {openEditModal && <UserEditComponent onClose={closeEdit} />}
                {openCreateModal && <CreateUser onClose={closeCreate} />}
            </div>
        </>
    )
}

export default UserTable
