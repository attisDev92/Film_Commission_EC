import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './routes/PublicRoutes'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import './styles/App.css'
import Notification from './common/components/Notification/Notification'
import Loader from './common/components/Loader/Loader'
import { useEffect, JSX } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './app/store/store'
import { verifyLoggedToken } from './features/auth/slices/verifyLoggedToken'
import { User } from './features/users/types/User'
import { useGetUser } from './features/users/hooks/useUser'
import { fetchAllCompanies } from './features/companies/slices/fetchAllCompanies'
import { fetchAllProjects } from './features/projects/slices/fetchAllProjects'
import { fetchAllLocations } from './features/locations/slices/fetchAllLocations'
import ScrollToTop from './common/components/ScrollToTop'

const App = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useGetUser()

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('FilmCommisionUser')

    if (loggedUserToken) {
      const user: User = JSON.parse(loggedUserToken)
      dispatch(verifyLoggedToken(user))
    }

    dispatch(fetchAllCompanies())
    dispatch(fetchAllProjects())
    dispatch(fetchAllLocations())
  }, [dispatch])

  return (
    <div style={{ height: '100%' }}>
      <ScrollToTop />
      <Notification />
      <Loader />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        {user?.role === 'creator' ? null : (
          <>
            <Route path="/admin/*" element={<AdminRoutes />} />
          </>
        )}
        {user?.role === 'admin' ? null : (
          <Route path="/system/*" element={<UserRoutes />} />
        )}
      </Routes>
    </div>
  )
}

export default App
