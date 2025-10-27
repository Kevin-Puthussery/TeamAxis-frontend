import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
const SERVER_API=process.env.VITE_API_URL


function ProfileImageDrawer({ onClose }) {
    
    
    
    const [selectedFile,setSelectedFile]=useState(null)
    const [previewImage, setPreviewImage] = useState(null);

    // Open dialog on mount
    useEffect(() => {
        const dialog = document.getElementById("drawer");
        if (dialog && !dialog.open) dialog.showModal();
        return () => {
            if (dialog && dialog.open) dialog.close();
        };
    }, []);

    // Handle profile picture change
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);

            // In real app: upload to server here
            // Example: uploadProfilePic(file)
        }
    };

    // const [user,setUser]=useState([])


    const [currentUser,setCU]=useState([])

    useEffect(()=>{
        userDetails()
    },[])

    const token=localStorage.getItem("token")

    const userDetails=async()=>{
        const UserList=await axios.get(`${SERVER_API}/api/user/view`,{
            headers:{
                Authorization:token
            }
        })
        const uid=localStorage.getItem("uid")
    const filteredUser=UserList.data.UserwtDept.filter((item)=>item._id===uid)
    setCU(filteredUser)
    }
    const handleUpoad=async()=>{
        if(!selectedFile){
            alert("Please select an image first")
            return
        }
        try{
            const formData=new FormData()
            formData.append("profilePic",selectedFile)
            const response=await axios.post(`${SERVER_API}/api/user/profile/${currentUser[0]?._id}`,formData,{
                headers:{
                    Authorization:localStorage.getItem("token"),
                    "Content-Type":"multipart/form-data"
                }
            })
            setPreviewImage(null)
            setSelectedFile(null)
            await userDetails()
            onClose()
        }
        catch(e){
            alert("Error while uploading.")
            onClose()
        }
    }
    return (
        <dialog
            id="drawer"
            className="fixed inset-0 size-auto max-h-none max-w-none overflow-hidden bg-transparent backdrop:bg-gray-900/50"
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out"></div>

            <div tabIndex="0" className="absolute inset-0 pl-10 focus:outline-none sm:pl-16">
                <div className="relative ml-auto block size-full max-w-md transform transition duration-500 ease-in-out">
                    {/* Close button */}
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="size-6"
                                aria-hidden="true"
                            >
                                <path
                                    d="M6 18 18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Drawer Content */}
                    <div className="relative flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl rounded-l-xl">
                        <div className="px-6 flex flex-col items-center text-center">
                            <div className="relative">
                                {/* Profile picture */}
                                <img
                                    src={previewImage===null?currentUser[0]?.profilePic:previewImage}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md"
                                />

                                {/* Edit icon */}
                                <label
                                    htmlFor="profilePicInput"
                                    className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-md transition"
                                >
                                    <FaEdit size={16} />
                                    <input
                                        id="profilePicInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            {/* User info */}
                            <div className="mt-6 space-y-3">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {currentUser[0]?.fullName}
                                </h2>
                                {/* <p className="text-gray-600">
                                    {currentUser[0].username}

                                </p> */}
                            </div>

                            <hr className="my-6 w-3/4 border-gray-300" />

                            {/* Example buttons or details */}
                            <div className="w-full space-y-4 text-left">
                                <div className="flex justify-between text-gray-700">
                                    <span className="font-semibold">Username:</span>
                                    <span>{currentUser[0]?.fullName}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span className="font-semibold">Email:</span>
                                    <span>{currentUser[0]?.username}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Close Button */}
                        <div className="mt-8 px-6">
                            <button
                                onClick={handleUpoad}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-white font-semibold 
                                            bg-gradient-to-r from-green-400 to-emerald-600 
                                                hover:from-emerald-500 hover:to-green-700 
                                                hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                <span>Update Profile Pic</span>
                                <GrUpdate className="text-lg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

export default ProfileImageDrawer;
