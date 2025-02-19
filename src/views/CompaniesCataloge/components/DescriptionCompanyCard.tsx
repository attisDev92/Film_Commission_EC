import { Card, Typography, Button } from '@mui/material'
import { Image } from '../../../types'
import styles from '../CompanyProfile.module.css'

interface DescriptionCompanCardProps {
  logo?: Image
  language: string
  descriptionENG: string
  description: string
  activeWhatsapp: boolean
}

const DescriptionCompanCard: React.FC<DescriptionCompanCardProps> = ({
  logo,
  language,
  description,
  descriptionENG,
  activeWhatsapp,
}) => {
  return (
    <Card className={styles.card__description}>
      <div style={{ width: 200, height: 200, backgroundColor: '#fff' }}>
        <img src={logo?.url} />
      </div>
      <Typography>
        {language === 'eng' ? descriptionENG : description}
      </Typography>
      {activeWhatsapp && (
        <Button variant="contained" color="success">
          Contactar por WhatsApp
        </Button>
      )}
      <Button variant="contained" color="info">
        Contactar por email
      </Button>
    </Card>
  )
}

export default DescriptionCompanCard
