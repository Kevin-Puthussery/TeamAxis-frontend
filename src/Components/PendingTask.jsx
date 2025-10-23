import React, { useEffect, useState } from 'react'
import HorizontalProgressBar from './HorizontalProgressBar'
import axios from 'axios'
import { FaFilePdf } from 'react-icons/fa'

function PendingTask({task,openModale,fetchTask}) {

    const MarkasComplete=async(id)=>{
    const result=confirm("Are you sure you want to Complete?")    
    if (result){
        await axios.put(`http://localhost:3000/api/task/update/${id}`,{
    completed:true
  },{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  })
  fetchTask()
    }
}

const handleDownload = async (taskId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/task/download/${taskId}`,
      {
        responseType: "blob",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    // Extract filename if provided by backend
    const contentDisposition = response.headers["content-disposition"];
    const fileName =
      contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
      "downloaded-file.pdf";

    // Create Blob and download
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error("Download error:", error);
    alert("No Attachment found.");
  }
};

  return (
    <>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Tasks</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {task.map((task,key) => 
                           !task.completed && 
                            <div
                                key={key}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between"
                            >
                                {/* Task Card Content (Pending) */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Title :</label>
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Enter task title"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        defaultValue={`${task.name}`}
                                    />
                                </div>
                                {/* ... other fields ... */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Description :</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Enter description"
                                        disabled
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        defaultValue={`${task.description}.`}
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Start Date :</label>
                                        <input type="date" value={task.startDate} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">End Date :</label>
                                        <input type="date" value={task.endDate} disabled className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300" />
                                    </div>

                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion ({task.progess}%)</label>
                                    <HorizontalProgressBar progress={task.progess} fillColor="bg-green-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Attachments :</label>
                                    <div className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-center text-sm text-gray-400  hover:border-blue-400 hover:text-blue-500 transition">
                                        <div className='flex gap-10 justify-center'><img
                                            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                            alt="PDF"
                                            className="w-10 h-10"
                                        />
                                            <button onClick={()=>handleDownload(task._id)} className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded cursor-pointer">Download</button>

                                        </div>
                                        
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={()=>openModale(task._id)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                                        Edit
                                    </button>
                                    <button onClick={()=>MarkasComplete(task._id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
                                        Complete Task
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
    </>
  )
}

export default PendingTask