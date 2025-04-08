import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/useUser'
import { User } from '../../types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { setNotification } from '../../Redux/notificationReducer'
import { Card, Button, Typography } from '@mui/material'
import styles from './Index.module.css'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import Profile from './Profile/Profile'
import UserLocations from './components/UserLocations'
import RegisterServiceLocationCard from './RegisterCard/RegisterServicesLocationCard'
import UserCompanies from './components/UserCompanies'
import UserProjects from './components/userProjects'

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
