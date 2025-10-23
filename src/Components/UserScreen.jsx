import React, { useEffect, useState } from 'react'; // 1. Import useState
import HorizontalProgressBar from './HorizontalProgressBar';
import CreateTaskUser from "./CreateTaskUser"; // The modal component
import EditTaskUser from './EditTaskUser';
import Header from './Header';
import { FaFilePdf } from 'react-icons/fa';
import axios from 'axios'
import PendingTask from './PendingTask';
import CompletedTask from './CompletedTask';
import { jsPDF } from 'jspdf';


function UserScreen() {
    // 2. State to manage modal visibility
    const [isModalOpenc, setIsModalcOpen] = useState(false);
    const [isModalOpene, setIsModaleOpen] = useState(false);
    const [id,setId]=useState()
    // 3. Handlers to open and close the modal
    const openModalc = () => setIsModalcOpen(true);
    const closeModalc = () => setIsModalcOpen(false);

    const openModale = (id) =>{ 
        setIsModaleOpen(true);
        setId(id)
    }
    const closeModale = () => setIsModaleOpen(false);

    const downloadTaskPDF = (task) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Task Details", 105, 15, null, null, "center");

        doc.setFontSize(12);
        doc.text(`Title: ${task.name}`, 20, 30);
        doc.text(`Description: ${task.description}`, 20, 40);
        doc.text(`Start Date: ${task.startDate}`, 20, 50);
        doc.text(`End Date: ${task.endDate}`, 20, 60);
        doc.text(`Completion: ${task.progess}%`, 20, 70);
        // doc.text(`Attachment: ${task.attachment}`, 20, 80);

        doc.save(`${task.name}.pdf`);
    };
    const [dep,setDep]=useState([])
    
    const fetchdep=async()=>{
        const token=localStorage.getItem("token")
    const uid=localStorage.getItem("uid")
        const dep=await axios.get("http://localhost:3000/api/user/view",{
            headers:{
                Authorization:token
            }
        })
        const CurrentUser=dep.data.UserwtDept
        setDep(CurrentUser.filter((item)=>item._id===uid))    
    }
    

    const [task,setTask]=useState([])

    const fetchTask=async()=>{
        const depId = dep[0]?.depId
        if(!depId) return
        const Tasklist=await axios.get(`http://localhost:3000/api/task/view?filter=${depId}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        setTask(Tasklist.data.task)
    }
    useEffect(()=>{
        fetchdep()
    },[])
    useEffect(() => {
  if (dep.length > 0) {
    fetchTask();
  }
}, [dep]);

    return (
        <>
        <Header/>
            <div className="min-h-screen bg-gray-50 p-8">
                {/* 🔝 Header */}
                <div className="flex flex-col md:flex-row items-center justify-center text-center text-2xl mb-10 space-y-4 md:space-y-0 md:space-x-12">
                    <div className="flex flex-col md:flex-row items-center text-lg font-semibold text-gray-800 space-y-2 md:space-y-0 md:space-x-12">
                        <p className='text-2xl'>
                            Project Name :
                            <span className="font-normal text-gray-600 ">Website Redesign</span>
                        </p>
                        <p className='text-2xl'>
                            Department :
                            <span className="font-normal text-gray-600">{dep[0]?.department}</span>
                        </p>
                    </div>

                    {/* 4. Corrected onClick handler */}
                    <button
                        onClick={openModalc}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-200"
                    >
                        Add Task +
                    </button>
                </div>

                {/* 🕐 Pending Tasks */}
                <section className="mb-12">
                    <PendingTask task={task} openModale={openModale} fetchTask={fetchTask}/>
                </section>

                {/* --- */}

                {/* ✅ Completed Tasks - VIEW ONLY */}
                <section>
                   <CompletedTask task={task} downloadTaskPDF={downloadTaskPDF}/>
                </section>
            </div>

            {/* 5. Conditionally Render the Modal */}
            {isModalOpenc && (
                <CreateTaskUser
                fetchTask={fetchTask}
                dep={dep[0]?.department}
                    onClose={closeModalc}
                
                />
            )}
            {isModalOpene && (
                <EditTaskUser id={id}
                    onClose={closeModale}
                
                />
            )}
        </>
    )
}

export default UserScreen