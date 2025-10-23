import Card from "./Card";

function DepartmentWiseComponent({filteredTask,handleEdit,handleDelete}) {
  return (
            <div className="w-full max-w-7xl space-y-12">
                {/* Department 1 */}
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Sales
                    </h3>

                    {/* 📦 Cards Row */}
                    <Card filteredTask={filteredTask} handleEdit={handleEdit} handleDelete={handleDelete} id={"68e75cbff12d684451c9def5"}/>
                </div>
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Finance
                    </h3>

                    {/* 📦 Cards Row */}
                    <Card filteredTask={filteredTask} handleEdit={handleEdit} handleDelete={handleDelete} id={"68e75cf5f12d684451c9def6"}/>
                </div>
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        IT
                    </h3>

                    {/* 📦 Cards Row */}
                    <Card filteredTask={filteredTask} handleEdit={handleEdit} handleDelete={handleDelete} id={"68e75d0ef12d684451c9def7"}/>
                </div>
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        Testing
                    </h3>

                    {/* 📦 Cards Row */}
                    <Card filteredTask={filteredTask} handleEdit={handleEdit} handleDelete={handleDelete} id={"68e75d4cf12d684451c9def9"}/>
                </div>
                <div className="bg-cyan-200 rounded-xl p-8 shadow-lg space-y-6">
                    <h3 className="text-3xl font-semibold text-center text-gray-800">
                        QA
                    </h3>

                    {/* 📦 Cards Row */}
                    <Card filteredTask={filteredTask} handleEdit={handleEdit} handleDelete={handleDelete} id={"68e75d66f12d684451c9defa"}/>
                </div>
            </div>
  )
}

export default DepartmentWiseComponent