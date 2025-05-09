import * as yup from 'yup'
import { categories } from '../utils/categories'
import { provinciaList } from '../../../common/utils/seeds/provinciaList'
import {
  validationName,
  errorValidationMessage,
  validationEmail,
  validationCellPhone,
  validationUrl,
  validationPhone,
} from '../../../common/utils/validations/validations'

export const locationSchema = yup.object().shape({
  name: validationName.required(errorValidationMessage.required),
  type: yup.string().oneOf(['Público', 'Privado']),
  category: yup.string().oneOf(categories),
  description: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  descriptionEn: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  province: yup.string().oneOf(provinciaList),
  city: yup
    .string()
    .min(3, `${3} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`),
  requestInformation: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  requestInformationEn: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  contactName: validationName,
  email: validationEmail,
  phone: validationCellPhone,
  phoneNumber: validationPhone,
  website: validationUrl,
})
