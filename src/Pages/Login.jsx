import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
    const [username,setUname]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()

    const verifyUser=async()=>{
        try{
        const resp=await axios.post('http://localhost:3000/api/user/signin',{
            username:username,
            password:password
        })
            if(resp.data.admin){
            localStorage.setItem("token",resp.data.token)
            localStorage.setItem("role","admin")
            navigate("/admin/home")
            }
            else if(resp.data.user){
            localStorage.setItem("token",resp.data.token)
            localStorage.setItem("uid",resp.data.userId)
            localStorage.setItem("role","user")

            navigate("/user/home")

            }
    }
catch(e){
    console.log(e)
}
    }
    return (
        <>
            <section
                // Ensuring correct positioning for the absolute overlay
                className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/6774432/pexels-photo-6774432.jpeg')" }}
            >
                {/* Background Dimming Fix (using reliable rgba) */}
                <div class="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div> 

                {/* Content Wrapper: Added z-20. **Removed py-8** to minimize unnecessary vertical padding. 
                   Using only 'px-6' for horizontal padding. */}
                <div class="relative z-20 flex flex-col items-center justify-center px-6 w-full max-w-md">

                    {/* 1. LOGO FIX: **CRITICAL: Changed to 'block'** to reset default display and
                       ensure NO default margins or line-height push. */}
                    

                    {/* 2. CARD FIX: **CRITICAL: Added 'mt-4'** (margin-top: 1rem) to create the small, controlled gap. */}
                    <div class="w-full bg-white rounded-2xl shadow-2xl overflow-hidden mt-2">
                        <a href="#" class="block text-3xl font-bold drop-shadow-lg text-white">
                        <img class="w-120 h-65" src="logo.png" alt="logo" />
                    </a>
                        <div class="p-4 space-y-4">
                            {/* <h1 class="text-2xl font-extrabold text-gray-800 text-center">Sign in to continue to your dashboard</h1> */}
                            <p class="text-sm text-gray-500 text-center">Sign in to continue to your dashboard</p>

                            <form class="space-y-5" >
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-700">Email</label>
                                    <input type="text" onChange={(e)=>setUname(e.target.value)} value={username} name="email" id="email" placeholder="name@company.com" required
                                        class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200" />
                                </div>

                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-700">Password</label>
                                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} name="password" id="password" placeholder="••••••••" required
                                        class="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-200" />
                                </div>

                                <div class="flex items-center justify-between">
                                    <label class="flex items-center space-x-2 text-sm text-gray-500">
                                        <input type="checkbox" class="w-4 h-4 rounded border-gray-300 focus:ring-purple-400" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" class="text-sm text-purple-500 hover:underline">Forgot password?</a>
                                </div>

                                <button type="button" onClick={()=>verifyUser()}
                                    class="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md transition duration-200">Sign In</button>

                                {/* <p class="text-center text-sm text-gray-500">
                                    Don’t have an account yet?
                                    <a href="#" class="text-purple-500 font-medium hover:underline">Sign up</a>
                                </p> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}

export default Login
