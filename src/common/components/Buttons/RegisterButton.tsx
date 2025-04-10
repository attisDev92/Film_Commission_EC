import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const RegisterButton: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const handleOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    navigate('/system/register')
  }

  return (
    <Button variant="contained" onClick={handleOnClick}>
      Regístrate
    </Button>
  )
}

export default RegisterButton
