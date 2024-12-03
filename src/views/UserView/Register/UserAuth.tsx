import React, { useEffect, useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { Card, Button, Typography } from '@mui/material'
import {
  authEmailUser,
  getUserForAuthMail,
} from '../../../services/UserServices'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setLoader } from '../../../Redux/notificationReducer'
import styles from './Register.module.css'

export type IsUserExitResponse = {
  success: boolean
} | void

const UserAuth: React.FC = () => {
  const { token } = useParams<string>()
  const [userExist, setUserExist] = useState<boolean>(false)
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      if (token) {
        const isUserExist: IsUserExitResponse = await getUserForAuthMail(token)
        if (isUserExist) {
          setUserExist(isUserExist.success ? true : false)
        }
      }
    }

    fetchUserData()
  }, [token])

  const handleOnClick = () => {
    dispatch(setLoader(true))
    if (token) {
      authEmailUser(token)
        .then((response) => {
          dispatch(setLoader(false))
          if (response) {
            if (response.validation) {
              navigate('/system')
            }
          }
        })
        .catch((error) => {
          console.log(error)
          dispatch(setLoader(false))
        })
    }
  }

  return (
    <div className={styles.register__page}>
      <Card className={styles.auth__card}>
        {!userExist && (
          <>
            <Typography variant="h6">
              El usuario que intenta autenticar no existe.
            </Typography>
          </>
        )}

        {userExist && (
          <>
            <Typography variant="h3">Bienvenido</Typography>
            <Typography variant="h6">
              Da click para autenticar el usuario, después ingresa con tu usario
              y contraseña. Completa tu registro una vez hayas iniciado sesión.
            </Typography>
            <Button variant="contained" onClick={handleOnClick}>
              Autenticar usuario
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}

export default UserAuth
