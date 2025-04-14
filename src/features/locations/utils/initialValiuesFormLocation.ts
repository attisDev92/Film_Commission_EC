import { LocationTypes } from '../types/LocationTypes'

export const initialValues: LocationTypes = {
  name: '',
  type: 'Privado',
  // @ts-expect-error initialValues is not used in the form
  category: '',
  subCategory: [],
  description: '',
  descriptionEn: '',
  requestInformation: '',
  requestInformationEn: '',
  weather: [],
  accessibilities: [],
  services: [],
  nearbyServices: [],
  contactName: '',
  email: '',
  phone: '',
  activeWhatsapp: false,
}
