import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../Redux/store'
import { setLogout } from '../../Redux/userReducer'
import { unsetProfile } from '../../Redux/profileReducer'

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const handleClick = (): void => {
    // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
    dispatch(setLogout())
    // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
    dispatch(unsetProfile())
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      LogOut
    </Button>
  )
}

export default LogoutButton
