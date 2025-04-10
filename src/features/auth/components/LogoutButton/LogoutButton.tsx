import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app/store/store'
import { setLogout } from '../../../users/slices/user.slice'
import { unsetProfile } from '../../../users/slices/profile.slice'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate: NavigateFunction = useNavigate()

  const handleClick = (): void => {
    // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
    dispatch(setLogout())
    // @ts-expect-error dispatch expect payload action but setLogout dont need arguments
    dispatch(unsetProfile())
    navigate('/system')
  }

  return (
    <Button variant="contained" onClick={handleClick}>
      LogOut
    </Button>
  )
}

export default LogoutButton
