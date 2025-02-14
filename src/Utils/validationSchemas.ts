import * as yup from 'yup'
import dayjs from 'dayjs'
import { categories } from '../data/categories'
import { provinciaList } from '../data/provinciaList'
import { companyServices } from '../data/companyServiceList'

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

const validationUrl = yup
  .string()
  .min(6, `${6} ${errorValidationMessage.min}`)
  .max(100, `${100} ${errorValidationMessage.max}`)
  .matches(
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
    'El link debe tener un formato válido (ej: https://www.ejemplo.com)',
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
  description: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(500, `${500} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  province: yup.string().oneOf(provinciaList),
  city: yup
    .string()
    .min(3, `${3} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`),
  requestInformation: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(500, `${500} ${errorValidationMessage.max}`),
  contactName: validationName,
  email: validationEmail,
  phone: validationCellPhone,
})

export const companySchema = yup.object().shape({
  company: validationName,
  firstActivity: yup.string().oneOf(companyServices),
  secondActivity: yup.string().oneOf(companyServices),
  province: yup.string().oneOf(provinciaList),
  city: yup
    .string()
    .min(3, `${3} ${errorValidationMessage.min}`)
    .max(100, `${100} ${errorValidationMessage.max}`),
  description: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`),
  descriptionENG: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(1000, `${1000} ${errorValidationMessage.max}`),
  clients: yup.array(),
  email: validationEmail,
  phone: validationCellPhone,
  website: validationUrl,
  urlVideo: validationUrl,
  typeVideo: yup.string().oneOf(['YouTube', 'Vimeo']),
})
