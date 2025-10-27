import React, { useEffect, useState } from 'react'
import UserEditComponent from './UserEditComponent'
import CreateUser from './CreateUser'
import { FaEdit, FaUserPlus } from 'react-icons/fa'
import Header from './Header'
import TableData from './TableData'
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
const SERVER_API=process.env.VITE_API_URL


function UserTable() {

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [uid,setUid]=useState("")
    const notify = (value) =>{
        if (value)
        {toast.success('Sucess', {
position: "top-right",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,})
        }
//         else if(value=="UserExist"){
//             toast.warn('Active User Already Exist!', {
// position: "top-right",
// autoClose: 2500,
// hideProgressBar: false,
// closeOnClick: false,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "colored",
// transition: Bounce,
// })

//         }
else{
    toast.error('Failed!', {
position: "top-right",
autoClose: 2500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",
transition: Bounce,
});

}};

    const openEdit = (id) => {
        setOpenEditModal(true)
        setUid(id)
    }
    const closeEdit = () => setOpenEditModal(false)

    const openCreate = () => setOpenCreateModal(true)
    const closeCreate = () => setOpenCreateModal(false)

    const [user,setUser]=useState([])
    const [filter,setFilter]=useState("")
    const FetchUser=async()=>{
                const AllUser=await axios.get(`${SERVER_API}/api/user/view?filter=`+filter.toLowerCase(),{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                })
                setUser(AllUser.data.UserwtDept?AllUser.data.UserwtDept:{})
            }
    useEffect(()=>{
            setTimeout(FetchUser(),1000)
        },[filter])

    return (
        <>
            <div className='w-full h-full bg-gray-900'>
                <Header />

                <div className='flex justify-center p-4'>
                    <div className='w-3/4 max-w-7xl min-h-lvh'>

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
                                    type="text"onChange={(e)=>setFilter(e.target.value)}
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
                                        <th className="px-6 py-3 text-xl font-bold">Department</th>
                                        <th className="px-6 py-3 text-xl font-bold">Status</th>
                                        <th className="px-6 py-3 text-xl font-bold">Action</th>
                                    </tr>
                                </thead>
                                {user.map((item)=><TableData data={item} openEdit={openEdit}/>)}
                            </table>
                        </div>
                    </div>
                    <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
                </div>

                {/* ✅ Modals */}
                {openEditModal && <UserEditComponent toast={notify} fetch={FetchUser} onClose={closeEdit} id={uid}/>}
                {openCreateModal && <CreateUser toast={notify} fetch={FetchUser} onClose={closeCreate} />}
                
            </div>
            
        </>
    )
}

export default UserTable
