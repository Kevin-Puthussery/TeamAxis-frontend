import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaFilePdf, FaTrash } from "react-icons/fa";
import HorizontalProgressBar from "./HorizontalProgressBar";
const SERVER_API=process.env.VITE_API_URL


function Card({ filteredTask, handleEdit, handleDelete, id }) {
  const [att, setAtt] = useState([]);

  useEffect(() => {
    getAttachment();
  }, []);

  const getAttachment = async () => {
    const Attachment = await axios.get(`${SERVER_API}/api/task/file/view`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setAtt(Attachment.data.AttachmentView);
  };

  const handleDownload = async (taskId) => {
    try {
      const response = await axios.get(
        `${SERVER_API}/api/task/download/${taskId}`,
        {
          responseType: "blob",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const fileName =
        contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
        "downloaded-file.pdf";

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Download error:", error);
      alert("No Attachment found.");
    }
  };

  return (
    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
      {filteredTask.map((task) => {
        const hasAttachment = att.some((attc) => attc.taskId === task._id);

        return (
          task.depId === id && (
            <div
              key={task._id}
              className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0 group hover:shadow-lg transition-all"
            >
              {/* --- Delete & Edit Buttons --- */}
              <div className='flex w-full justify-between'>
                                {/* Task Card Content (Pending) */}
                                <div className="flex  gap-2">
                                {task.createdBy && <div className="flex justify-start py-2">
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold ${task.createdBy=="Admin"?"bg-violet-500":"bg-green-500"}  text-white`}
                                      >
                                        {task.createdBy}
                                      </span>
                                  </div>}
                                  {task.UserComplete && <div className="flex justify-between py-2">
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm font-semibold bg-red-500 text-white`}
                                      >
                                        {task.UserComplete&&!task.completed && "Pending"}
                                      </span>
                                  </div>}
                                  </div>
                                  <div className="flex gap-2">
                {!task.completed && (
                  <button
                    onClick={() => handleEdit(task)}
                    title="Edit Task"
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3.5  rounded-full shadow-md transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  >
                    <FaEdit size={14} />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(task._id)}
                  title="Delete Task"
                  className="bg-red-500 hover:bg-red-600 text-white p-3.5 rounded-full shadow-md transition-all duration-200 flex items-center justify-center"
                >
                  <FaTrash size={14} />
                </button>
              </div>
                                  </div>
              

              {/* --- Task Info --- */}
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

                {/* --- Attachment Section --- */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700">Attachments :</label>
                  <div className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-center text-sm text-gray-400 hover:border-blue-400 hover:text-blue-500 transition">
                    {hasAttachment ? (
                      <div className="flex gap-10 justify-center">
                        <button
                          onClick={() => handleDownload(task._id)}
                          className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded cursor-pointer"
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No attachment found</p>
                    )}
                  </div>
                </div>

                {/* --- Progress Bar --- */}
                <div className="p-8 space-y-8 max-w-xl mx-auto">
                  <h1 className="text-2xl font-bold mb-4">Task Progress</h1>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Completion ({task.progess}%)
                  </label>
                  <HorizontalProgressBar progress={task.progess} />
                </div>
                <div>
                  <label className="block text-lg font-semibold">Admin Comments :</label>
                  <textarea
                    disabled
                    value={task.AdminComments}
                    className="w-full p-2 rounded bg-white border border-gray-300"
                  ></textarea>
                </div>

                {/* --- Status --- */}
                <div className="pt-2 text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 text-white"
                    }`}
                  >
                    {task.completed ? "COMPLETED" : "PENDING"}
                  </span>
                </div>

                {/* --- PDF Download Button --- */}
                {task.completed && (
                  <button
                    onClick={() => downloadTaskPDF(task)}
                    className="w-full flex items-center justify-center gap-2 border-2 border-blue-500 bg-white text-black py-2 rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-green-500 hover:text-white hover:border-green-500"
                  >
                    <FaFilePdf className="text-black hover:text-white transition-colors duration-200" />
                    Download Task Report
                  </button>
                )}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Card;
