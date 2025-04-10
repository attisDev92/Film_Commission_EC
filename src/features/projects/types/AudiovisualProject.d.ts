import { SubGenre } from './common/utils/seeds/genresList'
import { Image } from './common/types/types'

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
