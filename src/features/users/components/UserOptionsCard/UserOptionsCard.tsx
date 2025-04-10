import { Card, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from './UserOptionsCard.module.css'
import audiovisualImg from '../../../../assets/images/photographer.svg'
import locationImg from '../../../../assets/images/register-location.svg'
import workProgessImg from '../../../../assets/images/planning-schedule.png'

const RegisterServiceLocationCard: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <img src={locationImg} />
          </div>
          <div className={styles.textContainer}>
            <Typography variant="h6">Registrar una nueva locación</Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/system/register_location')}
            >
              Registrar Locación
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <img src={audiovisualImg} />
          </div>
          <div className={styles.textContainer}>
            <Typography variant="h6">
              Registrar servicios audiovisuales
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/system/register_service')}
            >
              Registrar Servicio
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <img src={workProgessImg} />
          </div>
          <div className={styles.textContainer}>
            <Typography variant="h6">
              Registra Proyectos Work in Progress
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/system/register_project')}
            >
              Registrar Proyecto
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default RegisterServiceLocationCard
