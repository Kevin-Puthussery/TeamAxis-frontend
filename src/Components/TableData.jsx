import React from 'react'
import { FaEdit, FaUserPlus } from 'react-icons/fa'


function TableData({openEdit,data}) {
    
  return (
    <>
    <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4"></td>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.fullName}</th>
                                        <td className="px-6 py-4">{data.username}</td>
                                        <td className="px-6 py-4">{data.department}</td>
                                        <td className="px-6 py-4">{data.status}</td>
                                        <td className="flex items-center px-5 py-4 gap-6">
                                            <a href="#" onClick={(e) => { e.preventDefault(); openEdit(data._id); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center">
                                                <FaEdit className="me-1" /> Edit
                                            </a>
                                            {/* <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a> */}
                                        </td>
                                    </tr>
                                    
                                </tbody>
    </>
  )
}

export default TableData