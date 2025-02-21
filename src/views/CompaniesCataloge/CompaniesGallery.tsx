import { Typography } from '@mui/material'
import styles from './CompanyGallery.module.css'
import { useCompanies } from '../../hooks/useCompanies'
import { AppDispatch } from '../../Redux/store'
import { setLoader, setNotification } from '../../Redux/notificationReducer'
import { useLanguageSelected } from '../../hooks/useLanguages'
import backgroundImage from '../../assets/images/background_companies.png'
import CompanyCard from './components/CompanyCard'
import { CompanyServiceType } from '../../types'
import { useDispatch } from 'react-redux'

const CompaniesGallery = () => {
  const { companies: allCompanies, loading, error } = useCompanies()
  const { suppliersSection: text } = useLanguageSelected()
  const dispatch = useDispatch<AppDispatch>()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (error) {
    dispatch(
      setNotification({
        style: 'error',
        text: error,
      }),
    )
  }

  const filterPublicCompanies = (
    companies: CompanyServiceType[],
  ): CompanyServiceType[] => {
    return companies.filter((company) => company.public)
  }

  let companies: CompanyServiceType[] = []

  if (allCompanies && allCompanies.length > 0) {
    dispatch(setLoader(false))
    companies = filterPublicCompanies(allCompanies)
  }

  return (
    <>
      <div className={styles.gallery__container}>
        <Typography variant="h2">{text.titulo.toUpperCase()}</Typography>
        <div className={styles.background}>
          <img src={backgroundImage} />
        </div>
        <div className={styles.cards__container}>
          {companies.map((company, i) => (
            <CompanyCard key={i} company={company} />
          ))}
        </div>
      </div>
    </>
  )
}

export default CompaniesGallery
