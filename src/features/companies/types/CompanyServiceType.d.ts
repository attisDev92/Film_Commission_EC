import { CompanyServices } from './common/utils/seeds/companyServiceList'
import { ProvinciasEcuador } from './common/utils/seeds/provinciaList'
import { Image } from './common/types/types'

export interface CompanyServiceType {
  id?: string
  company: string
  firstActivity: CompanyServices
  secondActivity?: CompanyServices
  province: ProvinciasEcuador
  city: string
  direction: string
  description: string
  descriptionENG: string
  clients: string[]
  email: string
  phone: string
  website: string
  urlVideo: string
  typeVideo: 'YouTube' | 'Vimeo'
  photos?: Image[]
  logo?: Image
  public?: boolean
  activeWhatsapp?: boolean
  userId?: string
}
