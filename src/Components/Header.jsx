import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileImageDrawer from './ProfileImageDrawer'
import axios from 'axios'
// import { FaRegUser } from "react-icons/fa";



function Header() {
  const [clickStatus, setClickStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const navigate=useNavigate()

  const handleProfileClick = () => {
    setDrawerOpen(true)
    setDropDownStatus(false)
  }

    const [currentUser,setCU]=useState([])
    useEffect(()=>{
      userDetails()
    },[])

    const token=localStorage.getItem("token")

    const userDetails=async()=>{
        const UserList=await axios.get('http://localhost:3000/api/user/view',{
            headers:{
                Authorization:token
            }
        })
        const uid=localStorage.getItem("uid")
    const filteredUser=UserList.data.UserwtDept.filter((item)=>item._id===uid)
    setCU(filteredUser)
    }

  const closeDrawer = () => setDrawerOpen(false)
  const [profile,setprofile]=useState("https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg")
  useEffect(()=>{
      if(currentUser[0]?.profilePic){
    setprofile(currentUser[0]?.profilePic)
  }
  })
  

  return (
    <>
      <div
        className="p-3 flex justify-between items-center"
        style={{ backgroundImage: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)' }}
      >
        <div className="flex items-center">
          <img src='/logo2.png' alt="logo" style={{ width: "340px", height: "110px" }} />
        </div>

        {/* Desktop user icon with dropdown */}
        <div className='items-center hidden md:flex'>
          <div className="relative inline-block">
            <button
              onClick={() => setDropDownStatus(!dropDownStatus)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white/10 p-1 text-sm font-semibold text-white hover:bg-white/20"
            >
              <img
                src={profile}
                alt="User"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </button>

            {dropDownStatus && (
              <div
                className="absolute right-0 z-50 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 shadow-lg"
              >
                <div className="py-1">
                  {localStorage.getItem("role")!=="admin" &&
                  <button
                    onClick={handleProfileClick}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                  >
                    Profile
                  </button>}
                  <button
                    type="submit"
                    onClick={()=> {
                      localStorage.removeItem("token")
                      localStorage.removeItem("role")
                      localStorage.removeItem("uid")

                      navigate('/')
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navbar */}
      <nav className='bg-gray-900 p-3'>
        <div className="md:hidden flex justify-between items-center">
          <span onClick={() => setClickStatus(!clickStatus)}></span>

          <div className="relative inline-block">
            <button
              onClick={() => setDropDownStatus(!dropDownStatus)}
              className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white/10 p-1 text-sm font-semibold text-white hover:bg-white/20"
            >
              <img
                src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
                alt="User"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </button>

            {dropDownStatus && (
              <div
                className="absolute right-0 z-50 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 shadow-lg"
              >
                <div className="py-1">
                  {localStorage.getItem("role")!=="admin" && <button
                    onClick={handleProfileClick}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                  >
                    Profile
                  </button>}
                  <button
                    type="button"
                    onClick={()=>{ 
                      localStorage.removeItem("token")
                      localStorage.removeItem("role")
                      localStorage.removeItem("uid")

                      navigate('/')

                    }}

                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {drawerOpen && <ProfileImageDrawer onClose={closeDrawer} />}

    </>
  )
}

export default Header