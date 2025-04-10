export interface ErrorType extends Error {
  response?: {
    data?: {
      error?: string
    }
  }
}

export interface Image {
  url?: string
  _id?: string
}
