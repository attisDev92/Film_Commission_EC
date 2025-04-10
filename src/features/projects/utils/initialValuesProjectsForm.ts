import { AudiovisualProject } from '../types/AudiovisualProject'

export const initialValues: AudiovisualProject = {
  name: '',
  director: '',
  producer: '',
  productionCompany: '',
  sinopsis: '',
  sinopsisEng: '',
  country: 'Ecuador',
  coproducers: [],
  year: '',
  runTime: '',
  genre: 'Ficción',
  subGenres: [],
  // @ts-expect-error this initial value must be a void string
  currentSituation: '',
  needs: '',
  needsENG: '',
  email: '',
  phone: '',
  website: '',
  recognitions: [],
  trailer: '',
  public: true,
  activeWhatsapp: false,
}
