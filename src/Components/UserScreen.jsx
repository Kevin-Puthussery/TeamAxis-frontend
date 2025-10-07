import React, { useState } from 'react'; // 1. Import useState
import HorizontalProgressBar from './HorizontalProgressBar';
import CreateTaskUser from "./CreateTaskUser"; // The modal component
import EditTaskUser from './EditTaskUser';
import Header from './Header';

function UserScreen() {
    // 2. State to manage modal visibility
    const [isModalOpenc, setIsModalcOpen] = useState(false);
    const [isModalOpene, setIsModaleOpen] = useState(false);

    // 3. Handlers to open and close the modal
    const openModalc = () => setIsModalcOpen(true);
    const closeModalc = () => setIsModalcOpen(false);

    const openModale = () => setIsModaleOpen(true);
    const closeModale = () => setIsModaleOpen(false);

    return (
        <>
        <Header/>
            <div className="min-h-screen bg-gray-50 p-8">
                {/* 🔝 Header */}
                <div className="flex flex-col md:flex-row items-center justify-center text-center text-2xl mb-10 space-y-4 md:space-y-0 md:space-x-12">
                    <div className="flex flex-col md:flex-row items-center text-lg font-semibold text-gray-800 space-y-2 md:space-y-0 md:space-x-12">
                        <p className='text-2xl'>
                            Project Name :{" "}
                            <span className="font-normal text-gray-600 ">Website Redesign</span>
                        </p>
                        <p className='text-2xl'>
                            Department :{" "}
                            <span className="font-normal text-gray-600">Development</span>
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Pending Tasks</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((task) => (
                            <div
                                key={task}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex flex-col justify-between"
                            >
                                {/* Task Card Content (Pending) */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Title :</label>
                                    <input
                                        type="text"
                                        placeholder="Enter task title"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        defaultValue={`Pending Task ${task}`}
                                    />
                                </div>
                                {/* ... other fields ... */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Description :</label>
                                    <textarea
                                        rows={2}
                                        placeholder="Enter description"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                                        defaultValue={`Initial description for pending task ${task}.`}
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Start Date :</label>
                                        <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">End Date :</label>
                                        <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm focus:outline-none focus:ring focus:ring-blue-300" />
                                    </div>

                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (0%)</label>
                                    <HorizontalProgressBar progress={0} fillColor="bg-green-500" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Attachments :</label>
                                    <div className="mt-2 w-full border-2 border-dashed border-gray-300 rounded-md p-4 text-center text-sm text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-500 transition">
                                        📤 Drag & Drop file here
                                        <div className="mt-2">
                                            <button className="px-4 py-1 bg-blue-100 text-blue-600 text-sm rounded">Browse</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Actions */}
                                <div className="flex justify-between items-center mt-4">
                                    <button onClick={openModale} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                                        Edit
                                    </button>
                                    <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm">
                                        Complete Task
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- */}

                {/* ✅ Completed Tasks - VIEW ONLY */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Completed Tasks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((task) => (
                            <div
                                key={task}
                                className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Task Card Content (Completed) */}
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Title :</label>
                                    <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
                                        Completed Task #1{task}
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">Description :</label>
                                    <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">
                                        This task was successfully completed and reviewed.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">Start Date :</label>
                                        <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">2025-09-01</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700">End Date :</label>
                                        <p className="mt-1 text-sm text-gray-800 bg-gray-100 px-3 py-2 rounded-md">2025-09-15</p>
                                    </div>
                                    <div className="col-span-2"> {/* Made progress bar span two columns for better layout */}
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (100%)</label>
                                        <HorizontalProgressBar progress={100} fillColor="bg-green-500" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700">Attachments :</label>
                                    <div className="mt-2 flex items-center space-x-3 bg-gray-100 p-3 rounded-md">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                            alt="PDF"
                                            className="w-10 h-10"
                                        />
                                        <span className="text-sm text-gray-800">Report_{task}.pdf</span>
                                    </div>
                                </div>
                                {/* ❌ No buttons here */}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* 5. Conditionally Render the Modal */}
            {isModalOpenc && (
                <CreateTaskUser
                    onClose={closeModalc}
                
                />
            )}
            {isModalOpene && (
                <EditTaskUser
                    onClose={closeModale}
                
                />
            )}
        </>
    )
}

export default UserScreen