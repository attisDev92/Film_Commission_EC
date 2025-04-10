import { CompanyServiceType } from '../types/CompanyServiceType'

export const initialValues: CompanyServiceType = {
  company: '',
  firstActivity: '',
  secondActivity: '',
  province: '',
  city: '',
  direction: '',
  description: '',
  descriptionENG: '',
  clients: [],
  email: '',
  phone: '',
  website: '',
  urlVideo: '',
  // @ts-expect-error initial value is void
  typeVideo: '',
  activeWhatsapp: false,
}
