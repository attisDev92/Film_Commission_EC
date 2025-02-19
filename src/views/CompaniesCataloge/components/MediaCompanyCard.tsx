import { Card, List, ListItem, Typography } from '@mui/material'
import CustomCarousel from '../../../components/Carousel/Carousel'
import { CompanyServiceType, LanguageState } from '../../../types'
import { CarouselItemProps } from '../../../components/Carousel/Carousel'
import styles from '../CompanyProfile.module.css'

const MediaCompanyCard: React.FC<{
  company: CompanyServiceType
  text: LanguageState['companyProfile']
}> = ({ company, text }) => {
  const photosForCarusel = () => {
    if (!company.photos) {
      return []
    }
    const photosArray: CarouselItemProps[] = []
    company.photos.forEach((element) => {
      const objectPhoto: CarouselItemProps = {
        src: element.url || '',
        alt: 'Company photo',
      }
      photosArray.push(objectPhoto)
    })
    return photosArray
  }

  return (
    <div className={styles.card__media}>
      {photosForCarusel().length > 0 && (
        <div className={styles.carousel__container}>
          <CustomCarousel items={photosForCarusel()} />
        </div>
      )}
      {company.clients && (
        <Card className={styles.clients}>
          <Typography variant="h6">{text.clients}: </Typography>
          <List>
            {company.clients.map((client, id) => (
              <ListItem key={id}>
                {<Typography variant="body1">{client}</Typography>}
              </ListItem>
            ))}
          </List>
        </Card>
      )}
    </div>
  )
}

export default MediaCompanyCard
