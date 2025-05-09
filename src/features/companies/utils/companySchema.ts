import * as yup from 'yup'
import { companyServices } from './companyServiceList'
import { provinciaList } from '../../../common/utils/seeds/provinciaList'
import {
  validationName,
  errorValidationMessage,
  validationEmail,
  validationCellPhone,
  validationUrl,
  validationUrlVideo,
} from '../../../common/utils/validations/validations'

export const companySchema = yup.object().shape({
  company: validationName.required(errorValidationMessage.required),
  firstActivity: yup.string().oneOf(companyServices),
  secondActivity: yup.string().oneOf(companyServices),
  province: yup.string().oneOf(provinciaList),
  city: yup
    .string()
    .min(3, `${3} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  description: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  descriptionENG: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  clients: yup.array(),
  email: validationEmail.required(errorValidationMessage.required),
  phone: validationCellPhone.required(errorValidationMessage.required),
  website: validationUrl,
  urlVideo: validationUrlVideo,
  typeVideo: yup.string().oneOf(['YouTube', 'Vimeo']),
})
