import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../views/AdminView/AdminLogin'
import HeaderSystem from '../components/HeaderSystem/HeaderSyste'
import IndexAdmin from '../views/AdminView/Index'
import ProtectRoutes from './ProtectRoutes'
import NotFound from '../views/NotFound/NotFound'
import { useGetUser } from '../hooks/useUser'

const AdminRoutes: React.FC = () => {
  const user = useGetUser()

  return (
    <>
      <HeaderSystem />
      <Routes>
        <Route
          path="/"
          element={
            user?.userToken && user.role === 'admin' ? (
              <IndexAdmin />
            ) : (
              <AdminLogin />
            )
          }
        />
        <Route element={<ProtectRoutes url="/admin/login" role="admin" />}>
          <Route />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AdminRoutes
