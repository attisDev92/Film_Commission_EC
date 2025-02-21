import { Button, Typography } from '@mui/material'
import { CompanyServiceType } from '../../../types'
import styles from '../CompanyGallery.module.css'
import { useLanguageSelected } from '../../../hooks/useLanguages'
import { changeLanguageActionsCompanies } from '../../../Utils/changeLanguageActionsCompanies'
import { useNavigate } from 'react-router-dom'

const CompanyCard: React.FC<{ company: CompanyServiceType }> = ({
  company,
}) => {
  const { idioma } = useLanguageSelected()
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <img className={styles.logo} src={company.logo?.url} />
      <div className={styles.photo__container}>
        {company.photos && <img src={company.photos[0].url} />}
      </div>
      <div className={styles.content}>
        <Typography variant="h5">{company.company.toUpperCase()}</Typography>
        <Typography variant="h6">
          {changeLanguageActionsCompanies(idioma, company.firstActivity)}
        </Typography>
        <Typography variant="body1">{company.city}</Typography>
        <Button
          className="button"
          variant="contained"
          onClick={() => navigate(`/companies/${company.id}`)}
        >
          {idioma === 'esp' ? 'Ver más' : 'See more'}
        </Button>
      </div>
    </div>
  )
}

export default CompanyCard
