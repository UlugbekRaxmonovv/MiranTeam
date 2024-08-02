import { Route, Routes } from "react-router-dom"
import Auth from "./pages/auth/Auth"
import Admin from "./pages/admin/Admin"
import Customer from "./pages/customer/Customer"
import Warehouse from "./pages/warehouse/Warehouse"
import { useState } from "react"
import Login from "./pages/login/Login"
import Registor from './pages/register/Register'
import SingleRout from "./pages/single-rout/SingleRout"
import Vendor from "./pages/Vendor/Vendor"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './pages/create/Create';
import EditAdmins from "./pages/editAdmins/editAdmins"
import Update from './pages/update/update'


const App = () => {
  const [menu, setMenu] = useState(true)
  document.body.style.overflow = menu ? 'hidden' : 'auto';
  const [render, setRender] = useState(true)

  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route path="admin" element={<Admin menu={menu} setMenu={setMenu} />}>
            <Route index path="customer" element={<Customer   menu={menu} setMenu={setMenu}/>}/>
            <Route path="warehouse" element={<Warehouse  menu={menu} setMenu={setMenu}/>}   render={render}/>
            <Route path="vendor" element={<Vendor  menu={menu} setMenu={setMenu}/>}  render={render}/>
            <Route path="registor" element={<Registor  menu={menu} setMenu={setMenu}/>}   render={render} setRender={setRender}/>
            <Route path="single-rout" element={<SingleRout  menu={menu} setMenu={setMenu}/>} />
            <Route path="create" element={<Create  menu={menu} setMenu={setMenu}/>} />
            <Route path="editAdmins/:id" element={<EditAdmins  menu={menu} setMenu={setMenu}/>} />
            <Route path="update/:id" element={<Update  menu={menu} setMenu={setMenu}/>}  setRender={setRender} />

         
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
