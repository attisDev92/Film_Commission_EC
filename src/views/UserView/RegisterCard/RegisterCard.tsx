import { Box, Card } from '@mui/material'
import React from 'react'
import RegisterButton from '../../../components/Buttons/RegisterButton'
import styles from './RegisterCard.module.css'
import registerImage from '../../../assets/images/web-developer.svg'

const RegisterCard: React.FC = () => {
  return (
    <Box>
      <Card className={styles.register__card}>
        <img src={registerImage} alt="regístrate" />
        <p>
          ¿Tienes un lugar que puede funcionar como una locación?
          <br />
          Enséñasela al mundo.
          <br />
          Registra tus locaciones en nuestro catálogo.
        </p>
        <RegisterButton />
      </Card>
    </Box>
  )
}

export default RegisterCard
