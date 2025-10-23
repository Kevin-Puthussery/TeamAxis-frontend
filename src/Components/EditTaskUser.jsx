import React, { useState } from 'react'
import HorizontalProgressBar from './HorizontalProgressBar';
import { FaCloudUploadAlt, FaFileExcel, FaFilePdf, FaFileWord, FaTimes } from 'react-icons/fa';
import axios from 'axios';

function EditTaskUser({onClose,id}) {
    // Note: handleClose is defined but the modal closing logic is incomplete (it just logs to console).
    // In a real app, this should involve setting state to hide the modal.
    const handleClose = () => {
        console.log("Modal Close action triggered.");
    }

    const [attachedFiles, setAttachedFiles] = useState([]);
    const [name,setName]=useState()
    const [desc,setDesc]=useState()
    const [startDate,setSdate]=useState()
    const [endDate,setEdate]=useState()
    const [progress,setProgress]=useState(0)
    const [loading,setLoading]=useState(false)
    
    

const EditUser=async()=>{
  await axios.put(`http://localhost:3000/api/task/update/${id}`,{
    name:name,
    description:desc,
    progress:progress,
    startDate:startDate,
    endDate:endDate
  },{
    headers:{
      Authorization:localStorage.getItem("token")
    }
  }) 
  
}

const UploadFile=async()=>{
  const formData=new FormData()
    formData.append("file",attachedFiles[0])
  await axios.post(`http://localhost:3000/api/task/upload/${id}`,
    formData
  ,{
    headers:{
      "Content-Type": "multipart/form-data",
      Authorization:localStorage.getItem("token")
    }
  })
}

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    if (files.length !== validFiles.length) {
      alert("Only PDF, Word, and Excel files are allowed.");
    }

    const newFiles = [...attachedFiles, ...validFiles].slice(0, 1);

    if (newFiles.length > 1) {
      alert("You can only upload a files.");
    }

    setAttachedFiles(newFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = attachedFiles.filter((_, i) => i !== index);
    setAttachedFiles(updatedFiles);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    await EditUser()
    if(attachedFiles.length>0){
    UploadFile()
  }
    onClose()
    setLoading(false)
    // TODO: Add upload logic with FormData + Axios if needed
  };

  const getFileIcon = (file) => {
    if (file.type.includes("pdf"))
      return <FaFilePdf className="text-red-600 text-3xl" />;
    if (file.type.includes("word"))
      return <FaFileWord className="text-blue-600 text-3xl" />;
    if (file.type.includes("excel"))
      return <FaFileExcel className="text-green-600 text-3xl" />;
    return <FaCloudUploadAlt className="text-gray-500 text-3xl" />;
  };


    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-start pt-20 bg-gray-900 bg-opacity-50"
            onClick={onClose}
        >
            <div
                // Increased max-w-md to max-w-lg to give the form more breathing room, matching the look in the image.
                className="relative p-4 w-full max-w-lg max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal content area */}
                <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-800 border border-gray-700"> {/* Changed dark bg for better contrast */}

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Task
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={onClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 md:p-5">
                        {/* Main Grid: All items span 2 columns to take full width and stack properly */}
                        <div className="grid gap-4 mb-4 grid-cols-2">

                            {/* Title Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={(e)=>setName(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name"
                                    required=""
                                />
                            </div>

                            {/* Description Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Description :
                                </label>
                                <textarea
                                    onChange={(e)=>setDesc(e.target.value)}
                                    rows={3} // Increased rows for a better appearance
                                    placeholder="Enter description"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none"
                                ></textarea>
                            </div>

                            {/* Start Date Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Start Date :
                                </label>
                                <input
                                    type="date"
                                    onChange={(e)=>setSdate(e.target.value)}
                                    // Removed 'mt-1' from input class, as it's better handled by the label's margin-bottom
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            {/* End Date Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    End Date :
                                </label>
                                <input
                                    type="date"
                                    onChange={(e)=>setEdate(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            {/* Task Completion (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Task Completion ({progress}%)</label>
                                {/* <HorizontalProgressBar progress={10} fillColor="bg-green-500" /> */}
                                <input className='w-full' value={progress} onChange={(e)=>setProgress(e.target.value)} type="range" />
                            </div>
                <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Attach Files (Optional)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  You can upload a <strong>files</strong> (PDF, Word, Excel)
                </p>

                <label
                  htmlFor="file-upload"
                  className={`flex flex-col items-center justify-center w-full border-2 border-dashed 
                  ${attachedFiles.length >= 3 ? "border-gray-400 opacity-60 cursor-not-allowed" : "border-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"} 
                  rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 
                  transition-all duration-200 p-6`}
                >
                  <FaCloudUploadAlt className="text-4xl text-blue-500 mb-2 animate-pulse" />
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {attachedFiles.length > 1
                      ? "Maximum files uploaded"
                      : "Click or drag to upload files"}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    Supports PDF, DOC, DOCX, XLS, XLSX
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleFileChange}
                    disabled={attachedFiles.length > 1}
                    className="hidden"
                  />
                </label>

                {/* Show uploaded files */}
                {attachedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border border-gray-300 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                      >
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-white">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-500 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={loading} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {loading?"Uploading":"Update" } <span className='p-1'>+</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTaskUser