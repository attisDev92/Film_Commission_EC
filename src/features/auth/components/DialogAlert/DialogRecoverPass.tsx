import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { NavigateFunction, useNavigate } from 'react-router-dom'

interface DialogProps {
  open: boolean
}

const DialogRecoverPass: React.FC<DialogProps> = ({ open }) => {
  const navigate: NavigateFunction = useNavigate()

  const handleAcceptDialog = (): void => {
    navigate('/system')
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Autenticación de Email'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se ha enviado un correo electrónico al email registrado. Debes
            ingresar a tu email y seguir los pasos correspondientes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAcceptDialog}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogRecoverPass
