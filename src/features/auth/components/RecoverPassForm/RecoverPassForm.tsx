import React, { useState } from 'react'
import { TextField, Button, Card } from '@mui/material'
import styles from './RecoverPassForm.module.css'
import { useField } from '../../../../common/hooks/useField'
import { ErrorType } from '../../../../common/types/types'
import { User } from '../../../users/types/User'
import { sendUserRecoverData } from '../../services/auth.service'
import DialogRecoverPass from '../DialogAlert/DialogRecoverPass'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { setLoader } from '../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../app/store/slices/setNotification'

export type ResponseRecoverMail =
  | {
      success?: boolean
    }
  | unknown

const RecoverPassForm: React.FC = () => {
  const [openDialogRecoverPass, setOpenDialogRecoverPass] =
    useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const username = useField()
  const email = useField()

  const handleOnSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    dispatch(setLoader(true))

    const userToRecover: Pick<User, 'username' | 'email'> = {
      username: username.value as string,
      email: email.value as string,
    }

    sendUserRecoverData(userToRecover)
      .then((response: ResponseRecoverMail) => {
        if ((response as { success: boolean }).success) {
          setOpenDialogRecoverPass(true)
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
      <DialogRecoverPass open={openDialogRecoverPass} />
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <legend>
          <h4>RECUPERAR CONTRASEÑA</h4>
        </legend>
        <p>
          Ingresa tu usuario y mail para recuperar tu contraseña.
          <br />
          Revisa tu mail y sigue las indicaciones para cambiar de contraseña.
        </p>
        <TextField
          id="outlined-basic"
          label="Usuario"
          variant="filled"
          {...username.inputProps}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="filled"
          {...email.inputProps}
        />
        <Button type="submit" variant="contained">
          Recuperar contraseña
        </Button>
      </form>
    </Card>
  )
}

export default RecoverPassForm
