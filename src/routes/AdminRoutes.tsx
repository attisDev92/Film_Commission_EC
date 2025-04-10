import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../features/admin/components/Login/AdminLogin'
import HeaderSystem from '../layouts/HeaderSystem/HeaderSyste'
import IndexAdmin from '../pages/Admin/Index'
import ProtectRoutes from './ProtectRoutes'
import NotFound from '../pages/NotFound/NotFound'
import { useGetUser } from '../features/users/hooks/useUser'

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
