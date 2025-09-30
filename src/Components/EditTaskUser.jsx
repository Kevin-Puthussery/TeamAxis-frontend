import React from 'react'
import HorizontalProgressBar from './HorizontalProgressBar';

function EditTaskUser() {
    // Note: handleClose is defined but the modal closing logic is incomplete (it just logs to console).
    // In a real app, this should involve setting state to hide the modal.
    const handleClose = () => {
        console.log("Modal Close action triggered.");
    }

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 z-50 w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-start pt-20 bg-gray-900 bg-opacity-50"
            onClick={handleClose}
        >
            <div
                // Increased max-w-md to max-w-lg to give the form more breathing room, matching the look in the image.
                className="relative p-4 w-full max-w-lg max-h-full"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal content area */}
                <div className="relative bg-white rounded-lg shadow-2xl dark:bg-gray-800 border border-gray-700"> {/* Changed dark bg for better contrast */}

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit Task
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={handleClose}
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5">
                        {/* Main Grid: All items span 2 columns to take full width and stack properly */}
                        <div className="grid gap-4 mb-4 grid-cols-2">

                            {/* Title Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name"
                                    required=""
                                />
                            </div>

                            {/* Description Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    Description :
                                </label>
                                <textarea
                                    rows={3} // Increased rows for a better appearance
                                    placeholder="Enter description"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white resize-none"
                                ></textarea>
                            </div>

                            {/* Start Date Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    Start Date :
                                </label>
                                <input
                                    type="date"
                                    // Removed 'mt-1' from input class, as it's better handled by the label's margin-bottom
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            {/* End Date Field (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                                    End Date :
                                </label>
                                <input
                                    type="date"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>

                            {/* Task Completion (Spans 2 columns) */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">Task Completion (10%)</label>
                                <HorizontalProgressBar progress={10} fillColor="bg-green-500" />
                            </div>
                            <div></div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Update Task <span className='p-1'>+</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTaskUser