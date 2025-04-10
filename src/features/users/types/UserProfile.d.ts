import { Dayjs } from 'dayjs'

export type UserProfile = {
  firstName: string
  lastName: string
  identificationType: 'Cédula' | 'RUC' | 'Pasaporte'
  identification: string
  nationality: string
  residenceCity: string
  birthdate: Dayjs
  cellPhone: string
  genre: 'Masculino' | 'Femenino' | 'No especificado'
}
