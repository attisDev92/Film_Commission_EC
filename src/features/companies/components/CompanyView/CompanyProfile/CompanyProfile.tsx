import { useParams } from 'react-router-dom'
import { useLanguageSelected } from '../../../../../common/hooks/useLanguages'
import styles from './CompanyProfile.module.css'
import background from '../../../../../assets/images/stacked-steps-haikei.png'
import { Typography } from '@mui/material'
import DescriptionCompanCard from '../DescriptionCompany/DescriptionCompanyCard'
import InfoCompanyCard from '../InfoCompany/InfoCompanyCard'
import ClientsListCard from '../RowListCompany/ClientsListCard'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../../app/store/store'
import { setLoader } from '../../../../../app/store/slices/notiffication.slice'
import { setNotification } from '../../../../../app/store/slices/setNotification'
import VideoCompany from '../VideoCompany/VideoCompany'
import AccordionGallery from '../../../../../common/components/AccordionGallery/AccordionGallery'
import { useCompanies } from '../../../hooks/useCompanies'

const CompanyProfile = () => {
  const { id } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { company, loading, error } = useCompanies(id)
  const { idioma, companyProfile } = useLanguageSelected()

  if (loading) {
    dispatch(setLoader(true))
  }

  if (company) {
    dispatch(setLoader(false))
  }

  if (error) {
    dispatch(
      setNotification({
        style: 'error',
        text: error,
      }),
    )
  }

  const imagesForCarousel = (): string[] => {
    if (company?.photos) {
      return company.photos
        .map((photo) => photo.url)
        .filter((url): url is string => url !== undefined)
    }
    return []
  }

  return (
    <>
      {company && (
        <>
          <div className={styles.background__header}>
            <img src={background} />
          </div>
          <div className={styles.container}>
            <Typography variant="h2" color="secondary" fontWeight="700">
              {company.company.toUpperCase()}
            </Typography>
            <div className={styles.container__content}>
              <DescriptionCompanCard language={idioma} company={company} />
              <InfoCompanyCard company={company} text={companyProfile} />
            </div>
            <VideoCompany
              plataform={company.typeVideo}
              urlVideo={company.urlVideo}
            />
            <AccordionGallery images={imagesForCarousel()} />
            <ClientsListCard text={companyProfile} clients={company.clients} />
          </div>
        </>
      )}
    </>
  )
}

export default CompanyProfile
