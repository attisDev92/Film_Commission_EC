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

const DialogAuthMail: React.FC<DialogProps> = ({ open }) => {
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
            Gracias por registrarte como usuario del la Comisión Fílmica de
            Ecuador. <br />
            Para completar tu registro es necesario que ingreses a tu mail y des
            click en el link de autenticación. <br />
            No olvides revisar la bandeja de SPAM de tu correo electrónico.
            <br />
            Cuando hayas completado este proceso, ingresa a tu perfil y completa
            la información.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus onClick={handleAcceptDialog}>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogAuthMail
