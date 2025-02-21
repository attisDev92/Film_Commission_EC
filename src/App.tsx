import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './routes/PublicRoutes'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import './App.css'
import Notification from './components/Notification/Notification'
import Loader from './components/Loader/Loader'
import { useEffect, JSX } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './Redux/store'
import { verifyLoggedToken } from './Redux/userReducer'
import { User } from './types'
import { useGetUser } from './hooks/useUser'
import { fetchAllCompanies } from './Redux/companiesReducer'

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
  }, [dispatch])

  return (
    <div style={{ height: '100%' }}>
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
