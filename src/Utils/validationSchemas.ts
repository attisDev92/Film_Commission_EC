import * as yup from 'yup'
import dayjs from 'dayjs'
import { accessibilityList } from '../data/accessibilityList'
import {
  categories,
  subCategoryNatural,
  subCategoryRural,
  subCategoryUrban,
} from '../data/categories'
import { provinciaList } from '../data/provinciaList'
import { weatherList } from '../data/weatherList'

const errorValidationMessage = {
  min: 'caracteres mínimo',
  max: 'caracteres máximo',
  required: 'Este campo es obligatorio',
  length: 'caracteres requeridos',
  specialCharacters: 'No usar espacios o caracteres especiales',
}

const validationName = yup
  .string()
  .min(3, `${3} ${errorValidationMessage.min}`)
  .max(40, `${3} ${errorValidationMessage.max}`)
  .required(errorValidationMessage.required)

const cedulaSchema = yup
  .string()
  .length(10, `${10}`)
  .matches(/^\d+$/, 'La cédula solo puede contener números positivos')

const rucSchema = yup
  .string()
  .length(13, `Debe tener exactamente 13 caracteres`)
  .matches(/^\d+$/, 'El RUC solo puede contener números positivos')

const pasaportSchema = yup
  .string()
  .min(6, `${6} ${errorValidationMessage.min}`)
  .max(20, `${20} ${errorValidationMessage.max}`)
  .matches(/^[\w\d]+$/, 'El pasaporte puede contener letras y números')

const getIdentificationSchema = (typeIdentification: string) => {
  switch (typeIdentification) {
    case 'Cédula':
      return cedulaSchema
    case 'RUC':
      return rucSchema
    default:
      return pasaportSchema
  }
}

const validateIdentification = yup
  .string()
  .required(errorValidationMessage.required)
  .test({
    name: 'customValidation',
    message: 'Identificación invalida',
    test: (value, context) => {
      const { parent } = context
      return getIdentificationSchema(parent.typeIdentification).isValidSync(
        value,
      )
    },
  })

const validationCellPhone = yup
  .string()
  .length(10, `${10} ${errorValidationMessage.length}`)
  .matches(/^0\d{9}$/, errorValidationMessage.specialCharacters)
  .required(errorValidationMessage.required)

const validationBirthdate = yup
  .date()
  .required('La fecha de nacimiento es obligatoria')
  .test('age', 'Debes tener al menos 18 años', (value) => {
    if (!value) return false
    const today = dayjs()
    const eighteenYearsAgo = today.subtract(18, 'years')
    return dayjs(value).isBefore(eighteenYearsAgo, 'day')
  })

const validationEmail = yup
  .string()
  .min(6, `${6} ${errorValidationMessage.min}`)
  .max(100, `${100} ${errorValidationMessage.max}`)
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'El pasaporte puede contener letras y números',
  )

export const userProfileSchema = yup.object().shape({
  firstName: validationName,
  lastName: validationName,
  typeIdentification: yup.string().oneOf(['Cédula', 'RUC', 'Pasaporte']),
  identification: validateIdentification,
  nationality: yup
    .string()
    .min(5, `${5} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`),
  residenceCity: validationName,
  birthdate: validationBirthdate,
  cellPhone: validationCellPhone,
  genre: yup.string().oneOf(['Masculino', 'Femenino', 'No especificado']),
})

export const locationSchema = yup.object().shape({
  name: validationName,
  type: yup.string().oneOf(['Público', 'Privado']),
  category: yup.string().oneOf(categories),
  subCategory: yup
    .string()
    .oneOf([...subCategoryRural, ...subCategoryNatural, ...subCategoryUrban]),
  description: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${300} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  province: yup.string().oneOf(provinciaList),
  city: yup
    .string()
    .min(10, `${10} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`),
  requestInformation: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${300} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  weather: yup.string().oneOf(weatherList),
  accessibilities: yup.string().oneOf(accessibilityList),
  contactName: validationName,
  email: validationEmail,
  phone: validationCellPhone,
})
