import AdminScreen from "./Components/AdminScreen"
import CreateTaskAdmin from "./Components/CreateTaskAdmin"
import CreateTaskUser from "./Components/CreateTaskUser"
import EditTaskUser from "./Components/EditTaskUser"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import PrivateRoutes from "./Components/PrivateRoutes"
import ProtectedRoutes from "./Components/ProtectedRoutes"
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
        <Route index path="/"  element={<ProtectedRoutes><Login></Login></ProtectedRoutes>}/>
        <Route path="/user/home"  element={<PrivateRoutes role={"user"}><UserScreen/></PrivateRoutes>}/>
        <Route path="/user/create"  element={<PrivateRoutes role={"user"}><CreateTaskUser/></PrivateRoutes>}/>
        <Route path="/user/edit"  element={<PrivateRoutes role={"user"}><EditTaskUser/></PrivateRoutes>}/>
        <Route path="/admin/home"  element={<PrivateRoutes role={"admin"}><AdminScreen/></PrivateRoutes>}/>
        <Route path="/admin/create"  element={<PrivateRoutes role={"admin"}><CreateTaskAdmin/></PrivateRoutes>}/>
        <Route path="/admin/user"  element={<PrivateRoutes role={"admin"}><UserTable/></PrivateRoutes>}/>
        <Route path="/admin/edit"  element={<PrivateRoutes role={"admin"}><UserEditComponent/></PrivateRoutes>}/>
      </Routes>
    {/* </Router> */}
    </>
  )
}
export default App