import * as yup from 'yup'
import { countriesList } from '../../../common/utils/seeds/countryList'
import {
  validationName,
  errorValidationMessage,
  yearValidation,
  runtimeValidation,
  validationEmail,
  validationCellPhone,
  validationUrl,
  validationUrlVideo,
} from '../../../common/utils/validations/validations'

export const audiovisualProjectSchema = yup.object().shape({
  name: validationName.required(errorValidationMessage.required),
  director: validationName.required(errorValidationMessage.required),
  producer: validationName.required(errorValidationMessage.required),
  productionCompany: validationName.required(errorValidationMessage.required),
  sinopsis: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  sinopsisEng: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${1000} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  country: yup.string().oneOf(countriesList),
  coproducers: yup.array(),
  year: yearValidation,
  runTime: runtimeValidation,
  genre: yup.string().oneOf(['Ficción', 'Documental']),
  subGenres: yup.array(),
  currentSituation: yup
    .string()
    .oneOf(['Producción', 'Post-Producción', 'Distribución']),
  needs: yup
    .string()
    .min(50, `${50} ${errorValidationMessage.min}`)
    .max(150, `${300} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  needsENG: yup
    .string()
    .min(50, `${50} ${errorValidationMessage.min}`)
    .max(150, `${300} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  email: validationEmail.required(errorValidationMessage.required),
  phone: validationCellPhone.required(errorValidationMessage.required),
  website: validationUrl.required(errorValidationMessage.required),
  recognitions: yup.array(),
  trailer: validationUrlVideo,
})
