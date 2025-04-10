import { Image } from '../../../common/types/types'
import { AccessibilityTypes } from './common/utils/seeds/accessibilityList'
import {
  Areas,
  UrbanArea,
  RuralArea,
  NaturalArea,
} from './common/utils/seeds/categories'
import { WeatherTypes } from './common/utils/seeds/weatherList'

export interface LocationTypes {
  id?: string
  name: string
  type: 'Público' | 'Privado'
  description: string
  descriptionEn: string
  category: Areas
  subCategory: (UrbanArea | RuralArea | NaturalArea)[]
  province?: string
  city?: string
  requestInformation?: string
  requestInformationEn?: string
  weather: WeatherTypes[]
  accessibilities: AccessibilityTypes[]
  coordinates?: string[]
  contactName?: string
  email: string
  phone: string
  address?: string
  photos?: Image[]
  public?: boolean
  activeWhatsapp?: boolean
  userId?: string
}
