import { LocationTypes } from '../types'

export const initialValues: LocationTypes = {
  name: '',
  //@ts-expect-error initial value it's must be a void string
  type: '',
  //@ts-expect-error initial value it's must be a void string
  category: '',
  subCategory: [],
  description: '',
  descriptionEn: '',
  requestInformation: '',
  requestInformationEn: '',
  //@ts-expect-error initial value it's must be a void string
  weather: [],
  accessibilities: [],
  contactName: '',
  email: '',
  phone: '',
  activeWhatsapp: false,
  cordinates: [],
}
