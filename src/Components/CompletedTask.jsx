import React, { use, useEffect, useState } from 'react'
import { FaFilePdf } from 'react-icons/fa'
import HorizontalProgressBar from './HorizontalProgressBar'
import axios from 'axios'

function CompletedTask({task,downloadTaskPDF}) {
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
     <h2 className="text-2xl font-bold text-gray-800 mb-6">Completed Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {task.map((task,key) => ( 
                            task.completed && 
                            
                            <div
                                key={key}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Task Card Content (Completed) */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Title :</label>
                                    <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
                                        {task.name}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Description :</label>
                                    <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
                                        {task.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Start Date :</label>
                                        <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">{task.startDate}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">End Date :</label>
                                        <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">{task.endDate}</p>
                                    </div>
                                    <div className="col-span-2"> {/* Made progress bar span two columns for better layout */}
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion ({task.progess}%)</label>
                                        <HorizontalProgressBar progress={task.progess} fillColor="bg-green-500" />
                                    </div>
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
                                {/* ❌ No buttons here */}
                                <button
                                    onClick={() => downloadTaskPDF(task)}
                                    className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 bg-white text-black py-2 rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-green-500 hover:text-white hover:border-green-500"
                                >
                                    <FaFilePdf className="text-black hover:text-white transition-colors duration-200" />
                                    Download Task Report
                                </button>
                            </div>
                        ))}
                    </div>
    </>
  )
}

export default CompletedTask