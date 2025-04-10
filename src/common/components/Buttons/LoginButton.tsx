import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const LogIn: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const handleOnClick: React.MouseEventHandler<
    HTMLButtonElement
  > = (): void => {
    navigate('/system/login')
  }

  return (
    <Button variant="contained" onClick={handleOnClick}>
      LogIn
    </Button>
  )
}

export default LogIn
