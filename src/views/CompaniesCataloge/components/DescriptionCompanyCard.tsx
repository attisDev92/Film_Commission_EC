import { Card, Typography, Button } from '@mui/material'
import { CompanyServiceType } from '../../../types'
import styles from '../CompanyProfile.module.css'
import { validateImage } from '../../../Utils/validateImage'

interface DescriptionCompanCardProps {
  language: string
  company: CompanyServiceType
}

const DescriptionCompanCard: React.FC<DescriptionCompanCardProps> = ({
  language,
  company,
}) => {
  const handleClicWhatsapp = () => {
    const whatsappMessage: string =
      language === 'eng'
        ? "Hello, I am interested in your company's services"
        : 'Hola, estoy interesado en los servicios de su empresa'

    const formattedPhoneNumber = company.phone.replace(/[^\d]/g, '')
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+593${formattedPhoneNumber}&text=${encodeURIComponent(whatsappMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleClicEmail = () => {
    const emailSubject: string =
      language === 'eng'
        ? `${company.company} company information`
        : `Información sobre la empresa ${company.company}`
    const emailBody: string =
      language === 'eng'
        ? "Hello, I am interested in more information about your company's services. I found your contact through the website of the Ecuadorian Film Commission"
        : 'Hola, me interesa más información sobre los servicios de su empresa. Encontré su contacto mediante la página web de la Comisión Fílmica del Ecuador'
    const mailtoUrl = `mailto:${company.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoUrl
  }

  return (
    <Card className={styles.card__description}>
      <div className={styles.logo__container}>
        <img src={validateImage(company.logo)} />
      </div>
      <Typography>
        {language === 'eng' ? company.descriptionENG : company.description}
      </Typography>
      {company.activeWhatsapp && (
        <Button
          variant="contained"
          color="success"
          onClick={handleClicWhatsapp}
        >
          {language === 'eng'
            ? 'contact by WhatsApp'
            : 'Contactar por WhatsApp'}
        </Button>
      )}
      <Button variant="contained" color="info" onClick={handleClicEmail}>
        {language === 'eng' ? 'contact by email' : 'Contactar por email'}
      </Button>
    </Card>
  )
}

export default DescriptionCompanCard
