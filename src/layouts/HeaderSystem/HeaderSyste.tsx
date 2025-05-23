import React from 'react'
import { useGetUser } from '../../features/users/hooks/useUser'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutButton from '../../features/auth/components/LogoutButton/LogoutButton'
import RegisterButton from '../../common/components/Buttons/RegisterButton'
import logo from '../../assets/images/filmcomissionEC_blanco.svg'
import styles from './HeaderSystem.module.css'
import { useNavigate } from 'react-router-dom'

const HeaderSystem: React.FC = () => {
  const user = useGetUser()
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!user ? null : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <div className={styles.logo__container} onClick={() => navigate('/')}>
            <img src={logo} alt="Ecuador Film Commission" />
          </div>

          <Typography
            className={styles.username}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {user?.role === 'admin' && `Admin: ${user.username}`}
            {user?.role === 'creator' && user.username}
          </Typography>

          {!user?.role && <RegisterButton />}
          {user?.role && <LogoutButton />}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default HeaderSystem
