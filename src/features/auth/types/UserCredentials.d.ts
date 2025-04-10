export interface UserData extends User {
  validation: boolean
}

interface LoginResponse {
  success: boolean
  data: UserData
}

export interface UserCredentials {
  username: string
  password: string
}

export interface newUser extends UserCredentials {
  email: string
}
