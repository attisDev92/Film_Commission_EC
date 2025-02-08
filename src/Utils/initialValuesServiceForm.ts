import { CompanyServiceType } from '../types'

export const initialValues: CompanyServiceType = {
  company: '',
  //@ts-expect-error initial value must be a void
  firstActivity: '',
  //@ts-expect-error initial value must be a void
  secondActivity: '',
  //@ts-expect-error initial value must be a void
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
  //@ts-expect-error initial value must be a void
  typeVideo: '',
}
