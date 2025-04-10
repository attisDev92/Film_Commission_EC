import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../features/users/hooks/useUser'
import { User } from '../../features/users/types/User'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store/store'
import { setNotification } from '../../app/store/slices/setNotification'
import { Card, Button, Typography } from '@mui/material'
import styles from './UserProfile.module.css'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Profile from '../../features/users/components/Profile/Profile'
import UserLocations from '../../features/locations/components/LocationsTable/UserLoations'
import RegisterServiceLocationCard from '../../features/users/components/UserOptionsCard/UserOptionsCard'
import UserCompanies from '../../features/companies/components/CompaniesTable/UserCompanies'
import UserProjects from '../../features/projects/components/ProjectsTable/UserProjects'

const IndexUser: React.FC = () => {
  const user: User | null = useGetUser()
  const dispatch = useDispatch<AppDispatch>()
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (user?.profile && user?.profile?.length > 0) {
      setIsUserProfile(true)
    } else {
      dispatch(
        setNotification({
          style: 'warning',
          text: 'Debe completar la información de perfil',
        }),
      )
      setIsUserProfile(false)
    }
  }, [user, dispatch])

  return (
    <div style={{ height: '100%', marginBlockEnd: 20 }}>
      {isUserProfile ? (
        <>
          <Profile />
          <RegisterServiceLocationCard />
          <UserLocations />
          <UserCompanies />
          <UserProjects />
        </>
      ) : (
        <>
          <Card className={styles.card}>
            <Typography variant="subtitle1">
              Completa la información de tu perfil y después podrás registrarte
              en el catálogo de servicios y locaciones de la Comisión Fílmica
              del Ecuador.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/system/register_profile')}
            >
              Completar Perfil
            </Button>
          </Card>
        </>
      )}
    </div>
  )
}

export default IndexUser
