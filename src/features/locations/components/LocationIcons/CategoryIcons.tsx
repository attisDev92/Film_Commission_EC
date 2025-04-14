import { Stack, Typography, Divider } from '@mui/material'
import {
  Areas,
  UrbanArea,
  RuralArea,
  NaturalArea,
} from '../../utils/categories'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import LandscapeIcon from '@mui/icons-material/Landscape'
import ParkIcon from '@mui/icons-material/Park'
import styles from './CategoryIcons.module.css'
import SubCategoryIcons from './SubCategoryIcons'

interface CategoryIconsProps {
  category: Areas
  subCategory: (UrbanArea | RuralArea | NaturalArea)[]
}

const CategoryIcons: React.FC<CategoryIconsProps> = ({
  category,
  subCategory,
}) => {
  const language = useLanguageSelected()

  const getCategoryIcon = (type: Areas) => {
    switch (type) {
      case 'Urbano':
        return <LocationCityIcon className={styles.icon} />
      case 'Rural':
        return <LandscapeIcon className={styles.icon} />
      case 'Natural':
        return <ParkIcon className={styles.icon} />
      default:
        return <LocationCityIcon className={styles.icon} />
    }
  }

  const getCategoryText = (type: Areas) => {
    if (language.idioma === 'eng') {
      switch (type) {
        case 'Urbano':
          return 'Urban'
        case 'Rural':
          return 'Rural'
        case 'Natural':
          return 'Natural'
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
        spacing={1}
        alignItems="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography variant="h6" className={styles.title}>
          {language.idioma === 'eng' ? 'Categories' : 'Categorías'}
        </Typography>
        <span>
          {getCategoryIcon(category)}
          <Typography variant="body1">{getCategoryText(category)}</Typography>
        </span>
        {subCategory && <SubCategoryIcons subCategories={subCategory} />}
      </Stack>
    </div>
  )
}

export default CategoryIcons
