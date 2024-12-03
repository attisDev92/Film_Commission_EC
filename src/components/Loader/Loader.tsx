import React, { useEffect, useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { GlobalState } from '../../Redux/store'
import { NotificationState } from '../../Redux/notificationReducer'

const Loader: React.FC = () => {
  const loaderState = useSelector<GlobalState, NotificationState>(
    (state) => state.notification,
  )
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (loaderState.loader) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [loaderState])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default Loader
