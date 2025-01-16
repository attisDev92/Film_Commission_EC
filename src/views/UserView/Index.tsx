import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../hooks/useUser'
import { User } from '../../types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { setNotification } from '../../Redux/notificationReducer'
import { Card, Button, Typography } from '@mui/material'
import styles from './Index.module.css'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const IndexUser: React.FC = () => {
  const user: User | null = useGetUser()
  const dispatch = useDispatch<AppDispatch>()
  const [isUserProfile, setIsUserProfile] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate()
  console.log(user)
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
    <>
      {isUserProfile ? (
        <>
          <p>Perfil</p>
          <p>Locaciones</p>
        </>
      ) : (
        <>
          <Card className={styles.card}>
            <Typography variant="subtitle1">
              Completa la información del perfil y después podrás registrar
              locaciones.
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
    </>
  )
}

export default IndexUser
