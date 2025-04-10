import * as yup from 'yup'
import {
  validationName,
  validateIdentification,
  errorValidationMessage,
  validationBirthdate,
  validationCellPhone,
} from '../../../common/utils/validations/validations'

export const userProfileSchema = yup.object().shape({
  firstName: validationName,
  lastName: validationName,
  typeIdentification: yup.string().oneOf(['Cédula', 'RUC', 'Pasaporte']),
  identification: validateIdentification,
  nationality: yup
    .string()
    .min(5, `${5} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  residenceCity: validationName,
  birthdate: validationBirthdate,
  cellPhone: validationCellPhone,
  genre: yup.string().oneOf(['Masculino', 'Femenino', 'No especificado']),
})
