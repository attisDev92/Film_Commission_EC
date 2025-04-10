import { Button, Divider, Typography } from '@mui/material'
import { CompanyServiceType } from '../../../types/CompanyServiceType'
import styles from './CompanyCard.module.css'
import { useLanguageSelected } from '../../../../../common/hooks/useLanguages'
import { changeLanguageActionsCompanies } from '../../../utils/changeLanguageActionsCompanies'
import { useNavigate } from 'react-router-dom'
import { validateImage } from '../../../../../common/utils/validations/validateImage'

const CompanyCard: React.FC<{ company: CompanyServiceType }> = ({
  company,
}) => {
  const { idioma } = useLanguageSelected()
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <div className={styles.logo}>
        <img src={validateImage(company.logo)} alt="Company Logo" />
      </div>
      <div className={styles.photo__container}>
        <img
          src={validateImage(
            company.photos && company.photos.length > 0
              ? company.photos[0]
              : null,
          )}
          alt="Company Photo"
        />
      </div>
      <div className={styles.tag}>
        <Typography variant="body2">
          {changeLanguageActionsCompanies(idioma, company.firstActivity)}
        </Typography>
      </div>
      <div className={styles.content}>
        <Typography variant="h5">{company.company.toUpperCase()}</Typography>
        <Typography variant="body1">{company.city}</Typography>
        <Divider />
        <Button
          className="button"
          variant="text"
          onClick={() => navigate(`/companies/${company.id}`)}
        >
          {idioma === 'esp' ? 'Ver más' : 'See more'}
        </Button>
      </div>
    </div>
  )
}

export default CompanyCard
