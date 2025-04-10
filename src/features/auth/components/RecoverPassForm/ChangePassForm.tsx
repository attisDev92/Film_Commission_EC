import React, { useEffect } from 'react'
import { Button, Card, TextField, Typography } from '@mui/material'
import styles from './RecoverPassForm.module.css'
import { useField } from '../../../../common/hooks/useField'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { IsUserExitResponse } from '../AutenticateUser/UserAuth'
import { getUserForAuthMail } from '../../../users/services/user.service'
import { sendNewPassForChange } from '../../services/auth.service'
import { ErrorType } from '../../../../common/types/types'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { ResponseRecoverMail } from './RecoverPassForm'

export interface UserForChangePass {
  userToken: string
  passToChange: string
}

const ChangePass: React.FC = () => {
  const password = useField('password')
  const { token } = useParams<string>()
  const [userExist, setUserExist] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const navigate: NavigateFunction = useNavigate()

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

  const handleOnSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    dispatch(setLoader(true))

    const userToChange: UserForChangePass = {
      userToken: token as string,
      passToChange: password.value as string,
    }

    sendNewPassForChange(userToChange)
      .then((response: ResponseRecoverMail) => {
        if ((response as { success: boolean }).success) {
          dispatch(
            setNotification({
              style: 'success',
              text: 'Su contraseña fue cambiada con éxito, vuelva a ingresar a la página web',
            }),
          )
          setTimeout(() => {
            navigate('/system')
          }, 3000)
        }
      })
      .catch((error: ErrorType) => {
        dispatch(
          setNotification({
            style: 'error',
            text: `${error.response?.data?.error}`,
          }),
        )
      })
      .finally(() => {
        dispatch(setLoader(false))
      })
  }

  return (
    <Card className={styles.recoverForm__container} variant="outlined">
      {!userExist && (
        <Typography variant="h6" style={{ padding: 20 }}>
          Error en la validación de usuario.
        </Typography>
      )}

      {userExist && (
        <form className={styles.form} onSubmit={handleOnSubmit}>
          <legend></legend>
          <TextField
            id="outlined-basic"
            label="Nueva contraseña"
            variant="filled"
            {...password.inputProps}
          />
          <p>
            La contraaseña debe tener una mayúscula, un caracter especial, un
            número y mínimo 5 caracteres.
          </p>
          <Button type="submit" variant="contained">
            Cambiar contraseña
          </Button>
        </form>
      )}
    </Card>
  )
}

export default ChangePass
