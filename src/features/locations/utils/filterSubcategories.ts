import { Areas } from './categories'
import {
  subCategoryNatural,
  subCategoryRural,
  subCategoryUrban,
} from './categories'

export default function filterSubcategories(category: Areas | '') {
  if (category === 'Urbano') {
    return subCategoryUrban
  } else if (category === 'Natural') {
    return subCategoryNatural
  } else if (category === 'Rural') {
    return subCategoryRural
  } else {
    return ['Antes seleccione una categoría']
  }
}
