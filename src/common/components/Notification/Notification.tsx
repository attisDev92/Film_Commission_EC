import React from 'react'
import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../../app/store/store'
import { NotificationState } from '../../../app/store/slices/notiffication.slice'

const Notification: React.FC = () => {
  const notificationInfo = useSelector<GlobalState, NotificationState>(
    (state) => state.notification,
  )

  if (!notificationInfo.style) {
    return null
  }

  return (
    <Alert
      variant="filled"
      severity={notificationInfo.style}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      {notificationInfo.text}
    </Alert>
  )
}

export default Notification
