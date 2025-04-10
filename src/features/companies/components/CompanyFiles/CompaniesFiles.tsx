import { useNavigate, useParams } from 'react-router-dom'
import styles from '../CompanyForm/RegisterServices.module.css'
import { Card, Divider, Typography, Button } from '@mui/material'
import { useUserCompanies } from '../../hooks/useCompanies'
import InputLogo from './InputLogo'
import InputPhotos from './InputPhotos'

const CompaniesFiles: React.FC = () => {
  const navigate = useNavigate()
  const companyId = useParams().id || ''
  const { company } = useUserCompanies(companyId)

  return (
    <Card className={styles.card}>
      <Typography variant="h4">Edición de imágenes</Typography>
      <Divider />
      <InputLogo companyId={companyId} logo={company?.logo || {}} />
      <Divider />
      <InputPhotos companyId={companyId} photos={company?.photos || []} />
      <Divider />
      <Typography>
        Si ha completado la edición de las imagenes, o ya no desea realizar
        algúun cambio puede regresar al perfil
      </Typography>
      <Button variant="contained" onClick={() => navigate('/system')}>
        Regresar al perfil
      </Button>
    </Card>
  )
}

export default CompaniesFiles
