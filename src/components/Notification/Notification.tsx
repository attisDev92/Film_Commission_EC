import React from 'react'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/store'
import { NotificationState } from '../../Redux/notificationReducer'

const Notification: React.FC = () => {
  const notificationInfo = useSelector<GlobalState, NotificationState>(
    (state) => state.notification,
  )

  if (!notificationInfo.style) {
    return null
  }

  return (
    <Alert variant="filled" severity={notificationInfo.style}>
      {notificationInfo.text}
    </Alert>
  )
}

export default Notification
