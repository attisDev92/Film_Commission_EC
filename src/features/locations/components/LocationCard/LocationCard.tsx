import styles from './LocationCard.module.css'
import { LocationTypes } from '../../types/LocationTypes'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Category = ({ category }: { category: string }) => {
  return (
    <div className={styles.category}>
      <Typography variant="body2">{category}</Typography>
    </div>
  )
}

const LocationCard = ({ location }: { location: LocationTypes }) => {
  const navigate = useNavigate()

  return (
    <div
      className={styles.locationCard}
      onClick={() => {
        navigate(`/locations/${location.id}`)
      }}
    >
      <div className={styles.imageContainer}>
        <img src={location.photos?.[0]?.url} alt={location.name} />
      </div>
      <div className={styles.categoryContainer}>
        <Category category={location.category} />
        {location.subCategory.map((category) => (
          <Category key={category} category={category} />
        ))}
      </div>
      <div className={styles.data}>
        <Typography variant="h6">{location.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {location.city}
        </Typography>
      </div>
    </div>
  )
}

export default LocationCard
