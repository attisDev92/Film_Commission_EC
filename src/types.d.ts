import { Dayjs } from 'dayjs'
import { ProvinciasEcuador } from './data/provinciaList'
import { WeatherTypes } from './data/weatherList'
import { AccessibilityTypes } from './data/accessibilityList'
import { Areas, NaturalArea, RuralArea, UrbanArea } from './data/categories'
import { CompanyServices } from './data/companyServiceList'

export interface User {
  id?: string
  username: string | null
  role: 'admin' | 'creator' | null
  userToken: string | null
  email?: string
  profile?: string
}

export interface UserCredentials {
  username: string
  password: string
}

export interface newUser extends UserCredentials {
  email: string
}

export interface DocumentsLink {
  nombre: string
  link: string
}

export interface Suppliers {
  nombre: string
  email: string
  contacto: string
  telefono: string
  link: string
}

export interface LanguageState {
  titulo: string
  idioma: string
  menu: {
    locacion: string
    documentos: string
    proveedores: string
    contacto: string
  }
  logo: {
    textoAlternativo: string
  }
  videoBanner: {
    urlVideo: string
  }
  locacionSeccion: {
    titulo: string
    parrafo: string
    button: string
  }
  documentosSeccion: {
    titulo: string
    lista: DocumentsLink[]
  }
  proveedoresSeccion: {
    titulo: string
    mailtext: string
    contacttext: string
    phonetext: string
    webtext: string
    proveedores: Suppliers[]
  }
  contactoInfo: {
    contacto: string
    direccion: string
    telf: string
    buttonName: string
  }
  LocationGuide: {
    title: string
    categories: string
    filters: string
  }
}

export interface ErrorType extends Error {
  response?: {
    data?: {
      error?: string
    }
  }
}

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

export interface LocationTypes {
  name: string
  type: 'Público' | 'Privado'
  category: Areas
  subCategory: (UrbanArea | RuralArea | NaturalArea)[]
  description: string
  province: ProvinciasEcuador
  city: string
  requestInformation: string
  weather: WeatherTypes
  accessibilities: AccessibilityTypes[]
  contactName: string
  email: string
  phone: string
}

export interface Image {
  url?: string
  _id?: string
}

export interface CompanyServiceType {
  id?: string
  company: string
  firstActivity: CompanyServices
  secondActivity?: CompanyServices
  province: ProvinciasEcuador
  city: string
  direction: string
  description: string
  descriptionENG: string
  clients: string[]
  email: string
  phone: string
  website: string
  urlVideo: string
  typeVideo: 'YouTube' | 'Vimeo'
  photos?: Image[]
  logo?: Image
  public?: boolean
  activeWhatsapp?: boolean
}
