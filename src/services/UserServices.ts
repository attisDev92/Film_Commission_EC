import axios from 'axios'
import { UserCredentials, User, newUser } from '../types'
import { IsUserExitResponse } from '../views/UserView/Register/UserAuth'

export interface UserData extends User {
  validation: boolean
}

interface LoginResponse {
  success: boolean
  data: UserData
}

const baseURL = 'http://localhost:3002/api/users'

const getConfig = (token: User['userToken']) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const loginUser = async (
  credentials: UserCredentials,
): Promise<User> => {
  const response = await axios.post<LoginResponse>(
    `${baseURL}/login`,
    credentials,
  )
  return response.data.data
}

export const authenticateToken = async (token: User['userToken']) => {
  try {
    const response = await axios.get(`${baseURL}/login`, getConfig(token))
    return response.data.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const createNewUser = async (
  newUser: newUser,
): Promise<User | unknown> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseURL}/create`,
      newUser,
    )

    return response.data.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error Axios:', error)
      return error
    } else {
      console.error('Error desconocido:', error)
      return 'Error desconocido'
    }
  }
}

export const getUserForAuthMail = async (
  code: string,
): Promise<IsUserExitResponse | void> => {
  try {
    const response = await axios.get(`${baseURL}/auth/${code}`)
    return response.data
  } catch (error: unknown) {
    console.log(error)
  }
}

export const authEmailUser = async (
  token: string,
): Promise<UserData | void> => {
  try {
    const response = await axios.post(`${baseURL}/auth`, { token })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
