import { Dayjs } from 'dayjs'
import { ProvinciasEcuador } from './data/provinciaList'
import { WeatherTypes } from './data/weatherList'
import { AccessibilityTypes } from './data/accessibilityList'
import { Areas, NaturalArea, RuralArea, UrbanArea } from './data/categories'
import { CompanyServices } from './data/companyServiceList'
import { SubGenre } from './data/genresList'

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

export interface Associations {
  nombre: string
  email: string
  contacto: string
  telefono: string
  link: string
}

export interface Suppliers {
  titulo: string
  parrafo: string
  message: string
  button: string
}

export interface LanguageState {
  titulo: string
  idioma: string
  menu: {
    filmEc: string
    incentives: string
    documents: string
    associations: string
    locations: string
    registerLocation: string
    cataloge: string
    directory: string
    AVServices: string
    registerCompany: string
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
  suppliersSection: Suppliers
  documentosSeccion: {
    titulo: string
    parrafo: string
    lista: DocumentsLink[]
  }
  associationsSeccion: {
    titulo: string
    mailtext: string
    contacttext: string
    phonetext: string
    webtext: string
    associations: Associations[]
  }
  contactoInfo: {
    contacto: string
    direccion: string
    telf: string
    buttonName: string
  }
  companyProfile: {
    principalActivity: string
    secondActivity: string
    city: string
    province: string
    direction: string
    description: string
    email: string
    phone: string
    clients: string
    website: string
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

export interface Image {
  url?: string
  _id?: string
}

export interface LocationTypes {
  id?: string
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
  direction?: string
  cordinates: string[]
  photos?: Image[]
  public?: boolean
  activeWhatsapp?: boolean
  userId?: string
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
  userId?: string
}

export interface AudiovisualProject {
  id?: string
  name: string
  director: string
  producer: string
  productionCompany: string
  sinopsis: string
  sinopsisEng: string
  country: string
  coproducers: string[]
  year: string
  runTime: string
  genre: 'Ficción' | 'Documental'
  subGenres: SubGenre[]
  currentSituation: 'Producción' | 'Post-Producción' | 'Distribución'
  needs: string
  needsENG: string
  email: string
  phone: string
  website?: string
  recognitions?: string[]
  directorPhoto?: Image
  producerPhoto?: Image
  afiche?: Image
  stills?: Image[]
  dossier?: Image
  trailer?: string
  userId?: string
  public?: boolean
  activeWhatsapp?: boolean
}
