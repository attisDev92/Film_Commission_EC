import { Image } from '../../../common/types/types'
import {
  AccessibilityTypes,
  servicesLocation,
  nearbyServices,
} from '../utils/accessibilityList'
import { Areas, UrbanArea, RuralArea, NaturalArea } from '../utils/categories'
import { WeatherTypes } from '../utils/weatherList'

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
  services: servicesLocation[]
  nearbyServices: nearbyServices[]
  coordinates?: [number, number]
  contactName?: string
  email?: string
  phone?: string
  phoneNumber?: string
  website?: string
  address?: string
  photos?: Image[]
  public?: boolean
  activeWhatsapp?: boolean
  userId?: string
}
