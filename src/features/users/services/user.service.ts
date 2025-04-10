import axios from 'axios'
import { User } from '../types/User'
import { newUser } from '../../auth/types/UserCredentials'
import { IsUserExitResponse } from '../../auth/components/AutenticateUser/UserAuth'

import { BASE_URI } from '../../../app/config/envConfig'

const baseURL = `${BASE_URI}/users`

export const createNewUser = async (
  newUser: newUser,
): Promise<User | unknown> => {
  try {
    const response = await axios.post(`${baseURL}/create`, newUser)

    return response.data.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error Axios:', error)
      throw error
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
    throw error
  }
}

export const authEmailUser = async (token: string) => {
  try {
    const response = await axios.post(`${baseURL}/auth`, { token })
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
