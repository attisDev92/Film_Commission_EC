import { Typography } from '@mui/material'
import { useCompanies } from '../../features/companies/hooks/useCompanies'
import { AppDispatch } from '../../app/store/store'
import { setLoader } from '../../app/store/slices/notiffication.slice'
import styles from './CompanyGallery.module.css'
import { useLanguageSelected } from '../../common/hooks/useLanguages'
import backgroundImage from '../../assets/images/background_companies.png'
import CompanyCard from '../../features/companies/components/CompanyView/CompanyCard/CompanyCard'
import { CompanyServiceType } from '../../features/companies/types/CompanyServiceType'
import { useDispatch } from 'react-redux'
import { Fade } from 'react-awesome-reveal'
const CompaniesGallery = () => {
  const { companies: allCompanies, loading } = useCompanies()
  const { suppliersSection: text } = useLanguageSelected()
  const dispatch = useDispatch<AppDispatch>()

  if (loading) {
    dispatch(setLoader(true))
  }

  const filterPublicCompanies = (
    companies: CompanyServiceType[],
  ): CompanyServiceType[] => {
    const companiesFiltered = companies.filter((company) => company.public)

    for (let i = companiesFiltered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[companiesFiltered[i], companiesFiltered[j]] = [
        companiesFiltered[j],
        companiesFiltered[i],
      ]
    }
    return companiesFiltered
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
        <Fade cascade>
          <div className={styles.cards__container}>
            {companies.map((company, i) => (
              <CompanyCard key={i} company={company} />
            ))}
          </div>
        </Fade>
      </div>
    </>
  )
}

export default CompaniesGallery
