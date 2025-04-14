import { Stack, Typography, Divider } from '@mui/material'
import { WeatherTypes } from '../../utils/weatherList'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import CloudIcon from '@mui/icons-material/Cloud'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import LandscapeIcon from '@mui/icons-material/Landscape'
import styles from './WeatherIcons.module.css'

interface WeatherIconsProps {
  weather: WeatherTypes[]
}

const WeatherIcons: React.FC<WeatherIconsProps> = ({ weather }) => {
  const language = useLanguageSelected()

  const getWeatherIcon = (type: WeatherTypes) => {
    switch (type) {
      case 'Cálido':
        return <WbSunnyIcon className={styles.icon} />
      case 'Húmedo':
        return <WaterDropIcon className={styles.icon} />
      case 'Seco':
        return <LandscapeIcon className={styles.icon} />
      case 'Semiseco':
        return <LandscapeIcon className={styles.icon} />
      case 'Frío':
        return <AcUnitIcon className={styles.icon} />
      case 'Templado':
        return <CloudIcon className={styles.icon} />
      case 'Tropical':
        return <BeachAccessIcon className={styles.icon} />
      case 'Polar':
        return <AcUnitIcon className={styles.icon} />
      default:
        return <CloudIcon className={styles.icon} />
    }
  }

  const getWeatherText = (type: WeatherTypes) => {
    if (language.idioma === 'eng') {
      switch (type) {
        case 'Cálido':
          return 'Warm'
        case 'Húmedo':
          return 'Humid'
        case 'Seco':
          return 'Dry'
        case 'Semiseco':
          return 'Semi-dry'
        case 'Frío':
          return 'Cold'
        case 'Templado':
          return 'Temperate'
        case 'Tropical':
          return 'Tropical'
        case 'Polar':
          return 'Polar'
        default:
          return type
      }
    }
    return type
  }

  return (
    <div className={styles.container}>
      <Typography variant="h6">
        {language.idioma === 'eng' ? 'Weather' : 'Clima'}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {weather.map((type, index) => (
          <Stack
            key={index}
            direction="row"
            spacing={1}
            alignItems="center"
            className={styles.iconContainer}
          >
            {getWeatherIcon(type)}
            <Typography variant="body1">{getWeatherText(type)}</Typography>
          </Stack>
        ))}
      </Stack>
    </div>
  )
}

export default WeatherIcons
