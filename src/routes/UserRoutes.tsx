import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useGetUser } from '../features/users/hooks/useUser'
import UserLogin from '../features/auth/components/LoginCard/UserLogin'
import HeaderSystem from '../layouts/HeaderSystem/HeaderSyste'
import IndexUser from '../pages/UserProfile/UserProfile'
import NotFound from '../pages/NotFound/NotFound'
import ProtectRoutes from './ProtectRoutes'
import { User } from '../features/users/types/User'
import UserRegister from '../features/users/components/NewUserForm/UserRegister'
import UserAuth from '../features/auth/components/AutenticateUser/UserAuth'
import RecoverPassForm from '../features/auth/components/RecoverPassForm/RecoverPassForm'
import ChangePass from '../features/auth/components/RecoverPassForm/ChangePassForm'
import RegisterProfile from '../features/users/components/RegisterProfile/RegisterProfile'
import RegisterLocation from '../features/locations/components/LocationForm/RegisterLocation'
import LocationFiles from '../features/locations/components/LocationFiles/LocationFiles'
import RegisterService from '../features/companies/components/CompanyForm/RegisterService'
import CompaniesFiles from '../features/companies/components/CompanyFiles/CompaniesFiles'
import EditCompany from '../features/companies/components/EditCompany/EditCompany'
import Footer from '../layouts/Footer/Footer'
import RegisterProject from '../features/projects/components/ProjectsForm/RegisterProject'
import ProjectFiles from '../features/projects/components/ProjectFiles/ProjectFiles'
import EditProject from '../features/projects/components/EditProjects/EditProject'
import EditLocation from '../features/locations/components/LocationEdit/EditLocation'

const UserRoutes: React.FC = () => {
  const user: User | null = useGetUser()
  const backgroundImage: string = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='32' height='32' patternTransform='scale(2) rotate(40)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(240,6.7%,17.6%,1)'/><path d='M32-10L42 0 32 10 22 0zM0-10L10 0 0 10-10 0zm0 32l10 10L0 42l-10-10zm32 0l10 10-10 10-10-10zM16-10L26 0 16 10 6 0zm0 32l10 10-10 10L6 32zM32 6l10 10-10 10-10-10zM0 6l10 10L0 26l-10-10zm16 0l10 10-10 10L6 16z' stroke-linecap='square' stroke-width='0.5' stroke='%238059d468' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,-8)' fill='url(%23a)'/></svg>")`

  return (
    <div
      style={{
        backgroundImage: backgroundImage,
        width: '100%',
        minHeight: '100vh',
        paddingBottom: '3rem',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <HeaderSystem />
      <Routes>
        <Route
          path=""
          element={
            user?.userToken && user?.role === 'creator' ? (
              <IndexUser />
            ) : (
              <UserLogin />
            )
          }
        />
        <Route path="register" element={<UserRegister />} />
        <Route path="auth/:token" element={<UserAuth />} />
        <Route path="recover" element={<RecoverPassForm />} />
        <Route path="recover_pass/:token" element={<ChangePass />} />
        <Route element={<ProtectRoutes url="/system/login" role="creator" />}>
          <Route />
        </Route>
        {user && (
          <>
            {!user?.profile && (
              <Route path="register_profile" element={<RegisterProfile />} />
            )}
            <Route path="locations/files/:id" element={<LocationFiles />} />
            <Route path="services/files/:id" element={<CompaniesFiles />} />
            <Route path="projects/files/:id" element={<ProjectFiles />} />
            <Route path="services/edit/:id" element={<EditCompany />} />
            <Route path="projects/edit/:id" element={<EditProject />} />
            <Route path="locations/edit/:id" element={<EditLocation />} />
            <Route path="register_location" element={<RegisterLocation />} />
            <Route path="register_service" element={<RegisterService />} />
            <Route path="register_project" element={<RegisterProject />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default UserRoutes
