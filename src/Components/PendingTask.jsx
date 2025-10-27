import React, { useEffect, useState } from 'react'
import HorizontalProgressBar from './HorizontalProgressBar'
import axios from 'axios'
import { FaFilePdf } from 'react-icons/fa'
const SERVER_API=process.env.VITE_API_URL


function PendingTask({task,openModale,fetchTask,att}) {

    const MarkasComplete=async(id)=>{
    const result=confirm("Are you sure you want to Complete?")    
    if (result){
        await axios.put(`${SERVER_API}/api/task/update/${id}`,{
    UserComplete:true
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
      `${SERVER_API}/api/task/download/${taskId}`,
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
                        {task.map((task,key) => {
                        const hasAttachment = att.some((attc) => attc.taskId === task._id);
                        return(
                           !task.completed && (
                            <div
                                key={key}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between"
                            >
                              <div className='flex gap-3'>
                                {/* Task Card Content (Pending) */}
                                {task.createdBy && <div className="flex justify-start py-2">
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold ${task.createdBy=="Admin"?"bg-violet-500":"bg-green-500"}  text-white`}
                                      >
                                        {task.createdBy}
                                      </span>
                                  </div>}
                                  {task.UserComplete && <div className="flex justify-between py-2">
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold bg-red-500 text-white`}
                                      >
                                        {task.UserComplete&&!task.completed && "Pending"}
                                      </span>
                                  </div>}
                                  </div>
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
                                        {hasAttachment ? (
                      <div className="flex gap-10 justify-center">
                        <button
                          onClick={() => handleDownload(task._id)}
                          className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded cursor-pointer"
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No attachment found</p>
                    )}
                                        
                                    </div>
                                </div>
                                {task.AdminComments&&<div>
                  <label className="block text-lg font-semibold">Admin Comments :</label>
                  <textarea
                    disabled
                    value={task.AdminComments}
                    className="w-full p-2 rounded bg-white border border-gray-300"
                  ></textarea>
                </div>}
                                {/* Actions */}
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={()=>openModale(task)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                                        Edit
                                    </button>
                                    {!task.UserComplete&&<button onClick={()=>MarkasComplete(task._id)} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
                                        Complete Task
                                    </button>}
                                </div>
                            </div>
                        )
        )
})}
                    </div>
    </>
  )
}

export default PendingTask