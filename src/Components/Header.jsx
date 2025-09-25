import React, { useState } from 'react'
// import { FaInstagram } from "react-icons/fa";
// import { CiFacebook } from "react-icons/ci";
// import { FaXTwitter } from "react-icons/fa6";
// import { FaRegUser } from "react-icons/fa";
// import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
function Header() {
  const [clickStatus, setClickStatus] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)

  return (

    <>
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://img.freepik.com/free-vector/open-book-book-day-icon_24640-133872.jpg?semt=ais_hybrid&w=740" alt="" style={{ width: "60px", height: "60px" }} />
          <h1 className='flex md:hidden font-bold'>BOOK STORE</h1>

        </div>
        <div className='ms-35'>
          <h1 className='text-3xl hidden md:flex font-bold'>BOOK STORE</h1>
        </div>
        <div className=' items-center hidden md:flex'>
          {/* <FaInstagram className='text-2xl me-3' />
          <CiFacebook className='text-2xl me-3' />
          <FaXTwitter className='text-2xl me-3' /> */}
          <div className="ms-3">
            <Link to={"/login"}><button type="button" className='flex px-4 py-3 border border-black rounded items-center'>Login</button></Link> 

            {/* <button>
              <img src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" style={{ width: "50px", height: "50px" }} />
            </button> */}
          </div>

          {/* <div className="relative inline-block">
            <button onClick={() => setDropDownStatus(!dropDownStatus)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
              <img src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" style={{ width: "50px", height: "50px" }} />


            </button>

            {/* {dropDownStatus && <div anchor="bottom end" popover className="absolute right-0 z-50 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
              <div className="py-1">

                <Link to={"/profile"}><a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Profile</a></Link>

                <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Logout</button>
              </div>
            </div>} */}
        </div>


      </div>



      <nav className='bg-gray-900 p-3'>
        <div className="md:hidden flex justify-between items-center">
          <span onClick={() => setClickStatus(!clickStatus)}></span>
          {/* <Link to={"/login"}><button className=' cursor-pointer flex px-4 py-3 border text-white border-white rounded items-center'><FaRegUser className='me-3' />Login</button></Link> */}
          <div className="relative inline-block">
            <button onClick={() => setDropDownStatus(!dropDownStatus)} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
              <img src="https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg" alt="" style={{ width: "50px", height: "50px" }} />


            </button>

            {dropDownStatus && <div anchor="bottom end" popover className="absolute right-0 z-50 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition transition-discrete [--anchor-gap:--spacing(2)] data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
              <div className="py-1">

                <Link to={"/profile"}><a href="#" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Profile</a></Link>

                <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-hidden">Logout</button>
              </div>
            </div>}
          </div>
        </div>
        <ul className={clickStatus ? 'md:flex text-white' : 'md:flex hidden justify-center text-white gap-10'}>
          <Link to={"/"}> <li>Home</li></Link>
          <Link to={""}> <li>Books</li></Link>
          <Link to={""}><li>Careers</li></Link>
          <Link to={""}><li>Contact</li></Link>
        </ul>
      </nav>
    </>
  )
}

export default Header