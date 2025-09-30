import "./App.css"
import { Route, Routes, Navigate } from "react-router-dom"
import Register from "./pages/register"
import RegisterStudent from "./pages/registerStudent"
import Login from "./pages/login"
import MainLayout from "./components/layouts/MainLayout"
import Profile from "./pages/profile"
import PrivateRoute from "./utils/PrivateRoute"
import Homes from "./pages/homes"
import DashboardPage from "./pages/dashboard"
import NotFoundComponent from "./components/ui/NotFound"
import SingleProduct from "./pages/single-product/SingleProduct"
import Users from "./pages/users"
import Orders from "./pages/orders"
import Discounts from "./pages/discounts"
import Files from "./pages/files"

function App() {
  return (
    <Routes>     
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />     
      <Route path="*" element={<NotFoundComponent pageTitle={"Page"} />} />
      <Route element={<PrivateRoute />}>
      <Route path="/register" element={<Register />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Homes />} />
          <Route path="/file" element={<Files />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/product/id/:id" element={<SingleProduct />} />
          <Route path="/discounts" element={<Discounts />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
