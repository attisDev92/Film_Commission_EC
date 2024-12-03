import React, { useEffect, useState } from 'react'
import { useGetUser } from '../../../hooks/useUser'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button, Card } from '@mui/material'
import { useField } from '../../../hooks/useField'
import styles from './Register.module.css'
import TextInputField from '../../../components/TextFieldInput/TextFieldInput'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../Redux/store'
import { setLoader, setNotification } from '../../../Redux/notificationReducer'
import { newUser } from '../../../types'
import { createNewUser } from '../../../services/UserServices'
import DialogAuthMail from '../../../components/DialogAlert/DialogAuthMail'

const UserRegister: React.FC = () => {
  const user = useGetUser()
  const dispatch = useDispatch<AppDispatch>()
  const navigate: NavigateFunction = useNavigate()
  const [openAuthMail, setOpenAuthMail] = useState<boolean>(false)
  const username = useField()
  const password = useField('password')
  const email = useField()

  useEffect(() => {
    if (user && user.role === 'creator') {
      navigate('/system')
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(setLoader(true))

    const newUser: newUser = {
      username: username.value as string,
      password: password.value as string,
      email: email.value as string,
    }

    try {
      const response = await createNewUser(newUser)

      if (response instanceof Error) {
        return dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `Error: ${response?.response.data?.error}`,
          }),
        )
      }
      username.reset()
      password.reset()
      email.reset()
      setOpenAuthMail(true)
    } finally {
      dispatch(setLoader(false))
    }
  }

  return (
    <div className={styles.register__page}>
      <DialogAuthMail open={openAuthMail} />
      <Card className={styles.register__card}>
        <form onSubmit={handleSubmit}>
          <legend>Registro de nuevo usuario</legend>
          <TextInputField
            name="username"
            label="Nombre de usuario"
            inputProps={username.inputProps}
            minLength={3}
            regexToValidate={/^[a-zA-Z0-9]+$/}
            required={true}
            errorMessage="No valido, solo debe contener letras y números"
          />

          <TextInputField
            name="mail"
            label="E-mail"
            inputProps={email.inputProps}
            minLength={3}
            regexToValidate={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
            required={true}
            errorMessage="Ingrese un correo electrónico válido"
          />

          <p style={{ fontSize: 15 }}>
            La contraaseña debe tener una mayúscula, un caracter especial, un
            número y mínimo 5 caracteres.
          </p>

          <TextInputField
            name="password"
            label="Password"
            inputProps={password.inputProps}
            minLength={5}
            regexToValidate={
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
            }
            required={true}
            errorMessage="La contraseña debe contener una mayúscula, un número y un símbolo"
          />

          <p style={{ color: `var(--color-primary-200)` }}>
            Recuerda guardar tu usuario y contraseña para ingresar a la
            plataforma nuevamente.
          </p>
          <Button variant="contained" type="submit">
            Registrar
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default UserRegister
