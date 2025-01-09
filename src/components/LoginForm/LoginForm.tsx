import React from 'react'
import { TextField, Button, Card, CardContent } from '@mui/material'
import styles from './LoginForm.module.css'
import { useField } from '../../hooks/useField'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../Redux/userReducer'
import { UserCredentials } from '../../types'
import { AppDispatch } from '../../Redux/store'
import { setLoader } from '../../Redux/notificationReducer'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import RecoverPass from './RecoverPass'

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

  const handleOnSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(setLoader(true))
    dispatch(userLogin(credentials)).then((response) => {
      dispatch(setLoader(false))
      if (response?.role === 'admin') {
        navigate('/admin')
      } else if (response?.role === 'creator') {
        navigate('/system')
      }
    })
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
