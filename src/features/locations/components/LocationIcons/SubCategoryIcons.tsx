import { Stack, Typography, Divider } from '@mui/material'
import { UrbanArea, RuralArea, NaturalArea } from '../../utils/categories'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import ApartmentIcon from '@mui/icons-material/Apartment'
import MuseumIcon from '@mui/icons-material/Museum'
import HomeIcon from '@mui/icons-material/Home'
import ParkIcon from '@mui/icons-material/Park'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import StoreIcon from '@mui/icons-material/Store'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import styles from './SubCategoryIcons.module.css'
import { Spa } from '@mui/icons-material'

type SubCategoryType = UrbanArea | RuralArea | NaturalArea

interface SubCategoryIconsProps {
  subCategories: SubCategoryType[]
}

const SubCategoryIcons: React.FC<SubCategoryIconsProps> = ({
  subCategories,
}) => {
  const language = useLanguageSelected()

  const getSubCategoryIcon = (type: SubCategoryType) => {
    switch (type) {
      case 'Moderno':
        return <ApartmentIcon className={styles.icon} />
      case 'Histórico':
        return <MuseumIcon className={styles.icon} />
      case 'Residencial':
        return <HomeIcon className={styles.icon} />
      case 'Parques y Plazas':
        return <ParkIcon className={styles.icon} />
      case 'Deportivos':
        return <SportsSoccerIcon className={styles.icon} />
      case 'Cultural':
        return <TheaterComedyIcon className={styles.icon} />
      case 'Negocios y Comercios':
        return <StoreIcon className={styles.icon} />
      case 'Pueblos':
        return <LocationOnIcon className={styles.icon} />
      case 'Carreteras':
        return <DirectionsCarIcon className={styles.icon} />
      case 'Reservas Ecológicas':
        return <Spa className={styles.icon} />
      case 'Playas':
        return <BeachAccessIcon className={styles.icon} />
      default:
        return <ApartmentIcon className={styles.icon} />
    }
  }

  const getSubCategoryText = (type: SubCategoryType) => {
    if (language.idioma === 'eng') {
      switch (type) {
        case 'Moderno':
          return 'Modern'
        case 'Histórico':
          return 'Historic'
        case 'Residencial':
          return 'Residential'
        case 'Parques y Plazas':
          return 'Parks and Squares'
        case 'Deportivos':
          return 'Sports'
        case 'Cultural':
          return 'Cultural'
        case 'Negocios y Comercios':
          return 'Business and Commerce'
        case 'Pueblos':
          return 'Towns'
        case 'Carreteras':
          return 'Roads'
        case 'Reservas Ecológicas':
          return 'Ecological Reserves'
        case 'Playas':
          return 'Beaches'
        default:
          return type
      }
    }
    return type
  }

  return (
    <div className={styles.container}>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {subCategories.map((subCategory, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
            className={styles.iconContainer}
          >
            {getSubCategoryIcon(subCategory)}
            <Typography variant="body1">
              {getSubCategoryText(subCategory)}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </div>
  )
}

export default SubCategoryIcons
