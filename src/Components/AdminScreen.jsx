import React, { useEffect, useState } from "react";
import CreateTaskAdmin from "./CreateTaskAdmin";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import DepartmentWiseComponent from "./DepartmentWiseComponent";
import axios from "axios";
import { BarChart } from '@mui/x-charts/BarChart';
import EditTaskAdmin from "./EditTaskAdmin";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
const SERVER_API=process.env.VITE_API_URL



function AdminScreen() {
    const [filter, setFilter] = useState("all"); // all | pending | completed
    const [openEdit, setOpenEdit] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const navigate=useNavigate()

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
    
    const [tasks,setTask]=useState([])

    const filteredTasks = tasks.filter(
        (task) => filter === "all" ?task : filter==="completed"?task.completed:!task.completed
    );
    // const departement=["Sales","Finance","IT","Testing","QA"]

    // const DepFilter=tasks.filter((task)=> 

    // )

    const [open, setOpen] = useState(false)

    const fetchTask=async()=>{
        const AllTask=await axios.get(`${SERVER_API}/api/task/view`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        setTask(AllTask.data.task)

    }
    useEffect(()=>{
        fetchTask()
    },[filter])

    
    const barColors = ['#eb4034','#4CAF50', '#FFC107', '#2196F3','#9234eb'];



    const [dep,setDep]=useState('68e75cbff12d684451c9def5')


    const ChartData=tasks.filter((task)=>task.depId===dep)
    const Progress=ChartData.map((task)=>task.progess)
    const barData = Progress.map((item,i)=>`Task ${i+1}`)
    const doDelete=async(id)=>{
        await axios.delete(`${SERVER_API}/api/task/delete/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })

    }

    const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
        const deleteOne=doDelete(id)
        setTask((prev) => prev.filter((task) => task._id !== id));
        if(deleteOne){
            notify(true)
        }
        else{
            notify(false)
        }
    }

  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCurrentTask(null);
  };

  //pie chart
const filteredForPie=tasks.filter((item)=> item.depId===dep)
const pending=filteredForPie.filter((item)=> !item.completed).length
const completed=filteredForPie.filter((item)=> item.completed).length
 const total=pending+completed
 const pendingConverted=(pending/total)*100
 const completedConverted=(completed/total)*100


  const data = [
  { label: 'Pending', value: pendingConverted, color: '#0088FE' },
  { label: 'Completed', value: completedConverted, color: '#00C49F' },
];

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};
const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

    return (
        <>
        <Header/>
        
       
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10 space-y-10">
            {/* Project Info */}
            <div className="text-center space-y-3">
                <h2 className="text-3xl font-semibold text-gray-800">Project Name : Project 1</h2>
                <div className="w-4xl max-w-full  bg-gray-100 flex  text-gray-700 text-2xl font-medium rounded-lg shadow-inner p-5 hover:bg-gray-200 cursor-pointer">
                        <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: barData,
                            scaleType: 'band', 
                            colorMap: {
                                type: 'ordinal',
                                values: barData,
                                colors: barColors,
                            },
                            },
                        ]}
                        series={[
                            {
                            data: Progress,
                            },
                        ]}
                        height={300}
                        />
                        <PieChart
                            series={[
                                {
                                outerRadius: 100,
                                data,
                                arcLabel: getArcLabel,
                                },
                            ]}
                            sx={{
                                [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'white',
                                fontSize: 18,
                                },
                            }}
                            {...sizing}
                            />

                        <select onChange={(e)=>setDep(e.target.value)} className="bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg w-23 h-9 focus:ring-primary-500 focus:border-primary-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 outline-0  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="68e75cbff12d684451c9def5">Sales</option>
                                    <option value="68e75cf5f12d684451c9def6">Finance</option>
                                    <option value="68e75d0ef12d684451c9def7">IT</option>
                                    <option value="68e75d4cf12d684451c9def9">Testing</option>
                                    <option value="68e75d66f12d684451c9defa">QA</option>
                                </select>
                </div>
                <p className="text-xl font-medium text-gray-700">
                    Departmentwise task progress
                </p>
            </div>

            {/* 🔎 Filter Buttons */}
            <div className="flex justify-center gap-4">
                {["all", "pending", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-lg text-lg font-medium transition-all ${filter === f
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <DepartmentWiseComponent filteredTask={filteredTasks} handleEdit={handleEdit} handleDelete={handleDelete} />

            {/* Bottom Buttons */}
            <div className="flex flex-col md:flex-row gap-8 justify-center mt-12">
                <button onClick={() => setOpen(!open)} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-md transition-all">
                    Create Task +
                </button>
                <button onClick={()=>navigate("/admin/user")} className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold rounded-lg shadow-md transition-all">
                    Manage Users
                </button>
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
            {open ? <CreateTaskAdmin Toast={notify} fetch={fetchTask} onClose={()=> setOpen(false)} /> : ""}
                {openEdit && currentTask && (
          <EditTaskAdmin task={currentTask} onClose={handleCloseEdit} notify={notify} fetch={fetchTask} />
        )}
        </div>
         </>
    );
}

export default AdminScreen;
