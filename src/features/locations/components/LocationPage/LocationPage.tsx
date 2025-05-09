import styles from './LocationPage.module.css'
import BackgroundAnimateLines from '../../../../common/components/BackgroundLinesAnimate/BackgroundAnimateLines'
import { useParams } from 'react-router-dom'
import { useLocations } from '../../hooks/useLocations'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import { Button } from '@mui/material'
import PhotoGallery from '../PhotoGallery/PhotoGallery'
import LocationMap from '../LocationMap/LocationMap'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import WeatherIcons from '../LocationIcons/WeatherIcons'
import AccessibilityIcons from '../LocationIcons/AccessibilityIcons'
import CategoryIcons from '../LocationIcons/CategoryIcons'

const LocationPage = () => {
  const { id } = useParams()
  const { location, loading, error } = useLocations(id)
  const language = useLanguageSelected()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const validPhotos = location?.photos
    ?.map((photo) => photo.url)
    .filter((url): url is string => url !== undefined)

  return (
    <div className={styles.locationPage}>
      <div className={styles.header}>
        <div className={styles.header__image}>
          <img src={location?.photos?.[0]?.url} alt={location?.name} />
        </div>
        <Typography variant="h1">{location?.name}</Typography>
      </div>

      <div className={styles.content}>
        <div className={styles.content__card}>
          {location?.category && (
            <CategoryIcons
              category={location.category}
              subCategory={location.subCategory}
            />
          )}
          {location?.weather && <WeatherIcons weather={location.weather} />}
          {location?.accessibilities && (
            <AccessibilityIcons
              accessibilities={location.accessibilities}
              services={location.services}
              nearbyServices={location.nearbyServices}
            />
          )}
        </div>
        <div className={styles.content__card}>
          {language.idioma === 'es' ? (
            <Typography variant="body1">{location?.description}</Typography>
          ) : (
            <Typography variant="body1">{location?.descriptionEn}</Typography>
          )}
        </div>
        <div className={styles.content__card}>
          <Stack
            direction="row"
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="body1">{location?.province}</Typography>
            <Typography variant="body1">{location?.city}</Typography>
            <Typography variant="body1">{location?.address}</Typography>
          </Stack>
          {location?.coordinates && (
            <LocationMap coordinates={location.coordinates} />
          )}
        </div>
        {validPhotos && validPhotos.length > 0 && (
          <PhotoGallery photos={validPhotos} />
        )}
        <div className={styles.backgroundLines}>
          <BackgroundAnimateLines />
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="body1">
              {language.idioma === 'es' ? 'Contacto' : 'Contact'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.content__card}>
            {location?.contactName && (
              <Typography variant="body1">{location?.contactName}</Typography>
            )}
            {location?.activeWhatsapp && (
              <Button
                variant="contained"
                color="success"
                href={`https://wa.me/${location?.phone}`}
              >
                {language.idioma === 'es' ? 'Contacto' : 'Contact'}
              </Button>
            )}
            {location?.email && (
              <Button
                variant="contained"
                color="info"
                href={`mailto:${location?.email}`}
              >
                Email
              </Button>
            )}
            {location?.phoneNumber && (
              <Typography variant="body1">
                {language.idioma === 'es' ? 'Teléfono' : 'Phone number'}:{' '}
                {location?.phoneNumber}
              </Typography>
            )}
            {location?.website && (
              <Typography variant="body1">
                {language.idioma === 'es' ? 'Página web' : 'website'}:{' '}
                {location?.website}
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="body1">
              {language.idioma === 'es' ? 'Condiciones de uso' : 'Terms of use'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.content__card}>
            <Typography variant="body1">
              {language.idioma === 'es'
                ? location?.requestInformation
                : location?.requestInformationEn}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default LocationPage
