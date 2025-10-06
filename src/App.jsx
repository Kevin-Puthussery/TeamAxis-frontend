import AdminScreen from "./Components/AdminScreen"
import CreateTaskAdmin from "./Components/CreateTaskAdmin"
import CreateTaskUser from "./Components/CreateTaskUser"
import EditTaskUser from "./Components/EditTaskUser"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import UserEditComponent from "./Components/UserEditComponent"
import UserScreen from "./Components/UserScreen"
import UserTable from "./Components/UserTable"
import Login from "./Pages/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    {/* <Router> */}
      <Routes>
        <Route index path="/"  element={<Login></Login>}/>
        <Route path="/user/home"  element={<UserScreen/>}/>
        <Route path="/user/create"  element={<CreateTaskUser/>}/>
        <Route path="/user/edit"  element={<EditTaskUser/>}/>
        <Route path="/admin/home"  element={<AdminScreen/>}/>
        <Route path="/admin/create"  element={<CreateTaskAdmin/>}/>
        <Route path="/admin/user"  element={<UserTable/>}/>
        <Route path="/admin/edit"  element={<UserEditComponent/>}/>
      </Routes>
    {/* </Router> */}
    </>
  )
}
export default App