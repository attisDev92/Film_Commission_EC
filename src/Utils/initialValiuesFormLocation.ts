import { LocationTypes } from '../types'

export const initialValues: LocationTypes = {
  name: '',
  //@ts-expect-error initial value it's must be a void string
  type: '',
  //@ts-expect-error initial value it's must be a void string
  category: '',
  subCategory: [],
  description: '',
  requestInformation: '',
  //@ts-expect-error initial value it's must be a void string
  weather: [],
  accessibilities: [],
  contactName: '',
  email: '',
  phone: '',
}
