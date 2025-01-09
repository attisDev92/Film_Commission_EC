export interface User {
  username: string | null
  role: 'admin' | 'creator' | null
  userToken: string | null
  email?: string
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
