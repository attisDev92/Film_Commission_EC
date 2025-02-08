import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import RegisterButton from '../../../components/Buttons/RegisterButton'
import styles from './RegisterCard.module.css'
import registerImage from '../../../assets/images/web-developer.svg'

const RegisterCard: React.FC = () => {
  return (
    <Box>
      <Card className={styles.register__card}>
        <img src={registerImage} alt="regístrate" />
        <Typography variant="body1">
          ¿Tienes un servicio audiovisual o un lugar que puede funcionar como
          locación?
        </Typography>
        <Typography variant="body1">
          Enséñaselo al mundo!
          <br />
          Registra tus locaciones y empresas de servicios audiovisuales en
          nuestro catálogo.
        </Typography>
        <RegisterButton />
      </Card>
    </Box>
  )
}

export default RegisterCard
