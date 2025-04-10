import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom'
import { useGetUser } from '../features/users/hooks/useUser'
import React, { useEffect } from 'react'

interface ProtectRoutesProps {
  url: string
  role: 'admin' | 'creator'
}

const ProtectRoutes: React.FC<ProtectRoutesProps> = ({ url, role }) => {
  const navigate: NavigateFunction = useNavigate()
  const user = useGetUser()

  useEffect(() => {
    if (!user || user.role !== role) {
      navigate(url)
    }
  }, [user, navigate, url, role])

  if (!user || user.role !== role) {
    return null
  }

  return <Outlet />
}

export default ProtectRoutes
