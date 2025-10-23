import HorizontalProgressBar from "./HorizontalProgressBar";
import { FaTrash, FaEdit, FaFilePdf } from "react-icons/fa";
import { jsPDF } from 'jspdf';
import axios from "axios";




function Card({filteredTask,handleEdit,handleDelete,id}) {

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
    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTask.map((task) => (
                            task.depId===id &&
                            <div
                                key={task._id}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0 group hover:shadow-lg transition-all"
                            >
                                {/* Delete Button */}
                     <div className="flex justify-end gap-5">
                            {/* Edit Button for pending tasks */}
                    {!task.completed && (
                      <button
                        onClick={() => handleEdit(task)}
                        title="Edit Task"
                        className=" bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      >
                        <FaEdit size={14} />
                      </button>
                    )} 

                        <button
                      onClick={() => handleDelete(task._id)}
                      title="Delete Task"
                      className=" bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
                    >
                      <FaTrash size={14} />
                    </button>

                    
                        </div>           
                    
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.name}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            value={task.description}
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                value={task.startDate}
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                value={task.endDate}
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
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
                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Task Progress</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion ({task.progess}%)</label>
                                            <HorizontalProgressBar progress={task.progess} />
                                        </div>

                                        {/* Example 2: Different progress and style */}
                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Server Load (90%)</label>
                                            <HorizontalProgressBar
                                                progress={90}
                                                fillColor="bg-red-500"
                                                trackColor="bg-red-100"
                                                barHeight="10px"
                                            />
                                        </div> */}

                                        {/* Example 3: Low progress */}
                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Design Draft (15%)</label>
                                            <HorizontalProgressBar progress={15} fillColor="bg-green-500" />
                                        </div> */}
                                    </div>

                                    <div className="pt-2 text-center">
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.completed
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.completed?"COMPLETED":"PENDING"}
                                        </span>
                                    </div>
                                   {task.completed && <button
                                    onClick={() => downloadTaskPDF(task)}
                                    className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 bg-white text-black py-2 rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-green-500 hover:text-white hover:border-green-500"
                                >
                                    <FaFilePdf className="text-black hover:text-white transition-colors duration-200" />
                                    Download Task Report
                                </button>
}                                </div>
                            </div>
                        ))}
                    </div>
  )
}

export default Card