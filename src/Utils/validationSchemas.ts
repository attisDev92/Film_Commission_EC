import * as yup from 'yup'
import dayjs from 'dayjs'
import { categories } from '../data/categories'
import { provinciaList } from '../data/provinciaList'
import { companyServices } from '../data/companyServiceList'
import { countriesList } from '../data/countryList'

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
  .required(errorValidationMessage.required)

const validationUrl = yup
  .string()
  .min(6, `${6} ${errorValidationMessage.min}`)
  .max(100, `${100} ${errorValidationMessage.max}`)
  .matches(
    /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
    'El link debe tener un formato válido (ej: https://www.ejemplo.com)',
  )

const validationUrlVideo = yup
  .string()
  .min(6, `${6} ${errorValidationMessage.min}`)
  .max(100, `${100} ${errorValidationMessage.max}`)
  .matches(
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}|(https?:\/\/)?(www\.)?vimeo\.com\/\d{7,9}/,
    'El link debe ser un video válido de YouTube o Vimeo (ej: https://www.youtube.com/watch?v=ID o https://vimeo.com/ID)',
  )

const yearValidation = yup
  .string()
  .matches(/^\d+$/, 'El año debe contener solo números')
  .required(errorValidationMessage.required)
  .test('year validation', 'El año debe ser a partir de 2020', (value) => {
    if (!value) return false
    const year = parseInt(value, 10)
    return year > 2019
  })

const runtimeValidation = yup
  .string()
  .matches(/^\d+$/, 'La duración debe contener solo números')
  .required(errorValidationMessage.required)
  .test('runtime validation', 'La duración debe ser mayor a 60', (value) => {
    if (!value) return false
    const runtime = parseInt(value, 10)
    return runtime > 59
  })

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

export const locationSchema = yup.object().shape({
  name: validationName,
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
})

export const companySchema = yup.object().shape({
  company: validationName,
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
  email: validationEmail,
  phone: validationCellPhone,
  website: validationUrl,
  urlVideo: validationUrlVideo,
  typeVideo: yup.string().oneOf(['YouTube', 'Vimeo']),
})

export const audiovisualProjectSchema = yup.object().shape({
  name: validationName,
  director: validationName,
  producer: validationName,
  productionCompany: validationName,
  sinopsis: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${300} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  sinopsisEng: yup
    .string()
    .min(100, `${100} ${errorValidationMessage.min}`)
    .max(300, `${300} ${errorValidationMessage.max}`)
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
    .max(150, `${150} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  needsENG: yup
    .string()
    .min(50, `${50} ${errorValidationMessage.min}`)
    .max(150, `${150} ${errorValidationMessage.max}`)
    .required(errorValidationMessage.required),
  email: validationEmail,
  phone: validationCellPhone,
  website: validationUrl,
  recognitions: yup.array(),
  trailer: validationUrlVideo,
})
