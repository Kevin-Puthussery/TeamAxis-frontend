import React, { useState } from "react";
import CreateTaskAdmin from "./CreateTaskAdmin";
import HorizontalProgressBar from "./HorizontalProgressBar";

function AdminScreen() {
    const [filter, setFilter] = useState("all"); // all | pending | completed

    const tasks = [
        { id: 1, title: "Task 1", status: "pending" },
        { id: 2, title: "Task 2", status: "completed" },
        { id: 3, title: "Task 3", status: "pending" },
        { id: 4, title: "Task 4", status: "completed" },
    ];

    const filteredTasks = tasks.filter(
        (task) => filter === "all" || task.status === filter
    );

    const [open, setOpen] = useState(false)



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10 space-y-10">
            {/* Project Info */}
            <div className="text-center space-y-3">
                <h2 className="text-3xl font-semibold text-gray-800">Project Name :</h2>
                <div className="w-full max-w-4xl h-48 bg-gray-300 flex items-center justify-center text-gray-700 text-2xl font-medium rounded-lg shadow-inner">
                    Project Level Dashboard
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

            {/* Task Sections */}
            <div className="w-full max-w-7xl space-y-12">
                {/* Department 1 */}
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Sales
                    </h3>

                    {/* 📦 Cards Row */}
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.title}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Attachments :</label>
                                        <div className="w-full flex items-center justify-center bg-white border border-gray-300 rounded py-4">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="PDF"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Task Progress</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (75%)</label>
                                            <HorizontalProgressBar progress={75} />
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
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === "completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department 2 */}
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Marketing
                    </h3>

                    {/* 📦 Cards Row */}
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id + "-m"}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.title}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Attachments :</label>
                                        <div className="w-full flex items-center justify-center bg-white border border-gray-300 rounded py-4">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="PDF"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Project Milestones</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (75%)</label>
                                            <HorizontalProgressBar progress={75} />
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
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === "completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Department 3 */}
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        IT
                    </h3>

                    {/* 📦 Cards Row */}
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id + "-m"}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.title}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Attachments :</label>
                                        <div className="w-full flex items-center justify-center bg-white border border-gray-300 rounded py-4">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="PDF"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Project Milestones</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (75%)</label>
                                            <HorizontalProgressBar progress={75} />
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
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === "completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Finance
                    </h3>

                    {/* 📦 Cards Row */}
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id + "-m"}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.title}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Project Milestones</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (75%)</label>
                                            <HorizontalProgressBar progress={75} />
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
                                    <div>
                                        <label className="block text-lg font-semibold">Attachments :</label>
                                        <div className="w-full flex items-center justify-center bg-white border border-gray-300 rounded py-4">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="PDF"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2 text-center">
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === "completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        HR
                    </h3>

                    {/* 📦 Cards Row */}
                    <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-400">
                        {filteredTasks.map((task) => (
                            <div
                                key={task.id + "-m"}
                                className="min-w-[320px] bg-gray-200 p-6 rounded-lg shadow-md flex-shrink-0"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-lg font-semibold">Title :</label>
                                        <input
                                            type="text"
                                            value={task.title}
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Description :</label>
                                        <textarea
                                            disabled
                                            className="w-full p-2 rounded bg-white border border-gray-300"
                                        ></textarea>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-lg font-semibold">Start Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-lg font-semibold">End Date :</label>
                                            <input
                                                type="date"
                                                disabled
                                                className="w-full p-2 rounded bg-white border border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-lg font-semibold">Attachments :</label>
                                        <div className="w-full flex items-center justify-center bg-white border border-gray-300 rounded py-4">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
                                                alt="PDF"
                                                className="w-16 h-16"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-8 space-y-8 max-w-xl mx-auto">
                                        <h1 className="text-2xl font-bold mb-4">Project Milestones</h1>

                                        {/* Example 1: 75% progress (like the image) */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Task Completion (75%)</label>
                                            <HorizontalProgressBar progress={75} />
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
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${task.status === "completed"
                                                ? "bg-green-500 text-white"
                                                : "bg-yellow-400 text-white"
                                                }`}
                                        >
                                            {task.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Buttons */}
            <div className="flex flex-col md:flex-row gap-8 justify-center mt-12">
                <button onClick={() => setOpen(!open)} className="px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-md transition-all">
                    Create Task +
                </button>
                <button className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold rounded-lg shadow-md transition-all">
                    Manage Users
                </button>
            </div>
            {open ? <CreateTaskAdmin /> : ""}
        </div>
    );
}

export default AdminScreen;
