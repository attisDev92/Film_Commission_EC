import React from 'react'
import { TextField, Button, Card, CardContent } from '@mui/material'
import styles from './LoginForm.module.css'
import { useField } from '../../../../common/hooks/useField'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../slices/userLogin'
import { UserCredentials } from '../../types/UserCredentials'
import { AppDispatch } from '../../../../app/store/store'
import { setNotification } from '../../../../app/store/slices/setNotification'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import RecoverPass from '../RecoverPassButton/RecoverPass'

interface LoginFormProps {
  legend: 'administrador' | 'usuario'
}

const LoginForm: React.FC<LoginFormProps> = ({ legend }) => {
  const username = useField()
  const password = useField('password')
  const dispatch = useDispatch<AppDispatch>()
  const navigate: NavigateFunction = useNavigate()

  const credentials: UserCredentials = {
    username: username.value as string,
    password: password.value as string,
  }

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(setLoader(true))
    try {
      const response = await dispatch(userLogin(credentials))
      if (response && response.role === 'admin') {
        navigate('/admin')
      } else if (response?.role === 'creator') {
        navigate('/system')
      }
    } catch (error: unknown) {
      console.error(error)
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }

  return (
    <Card className={styles.LoginCard} variant="outlined">
      <CardContent className={styles.CardContent}>
        <form className={styles.LoginForm} onSubmit={handleOnSubmit}>
          <legend>
            <h4>
              Inicio de sesión
              <br />
              {legend}
            </h4>
          </legend>
          <TextField
            id="outlined-basic"
            label="Usuario"
            variant="filled"
            {...username.inputProps}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="filled"
            {...password.inputProps}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          <RecoverPass />
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm
