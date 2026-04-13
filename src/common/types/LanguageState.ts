export interface SecuritySection {
  titulo: string
}
export interface PermissionAccordionItem {
  key: string
  titulo: string
}
export interface DocumentsLink {
  nombre: string
  link: string
}

export interface Associations {
  nombre: string
  email: string
  link: string
}

export interface Suppliers {
  titulo: string
  parrafo: string
  message: string
  button: string
}

export interface AboutEcuador {
  source: string
  title: string
  text: string
}

export interface LanguageState {
  logline: string
  principalDescription: string
  titulo: string
  idioma: string
  menu: {
    filmEc: string
    aboutEc: string
    incentives: string
    documents: string
    associations: string
    locations: string
    registerLocation: string
    cataloge: string
    directory: string
    AVServices: string
    registerCompany: string
    services: string
    registerService: string
    projects: string
    registerProject: string
  }
  incentivesSection: {
    titulo: string
    incentives: []
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
  aboutEcuador: AboutEcuador[]
  filmCommission: {
    titulo: string
    parrafo: string
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
  permissionsSection: {
    titulo: string
    permissions: PermissionAccordionItem[]
  }
  securitySection: SecuritySection
}

export interface Incentive {
  key: string
  titulo: string
}
