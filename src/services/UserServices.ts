import axios from 'axios'
import { UserCredentials, User, newUser } from '../types'
import { IsUserExitResponse } from '../views/UserView/Register/UserAuth'
import { ResponseRecoverMail } from '../components/RecoverPassForm/RecoverPassForm'
import { UserForChangePass } from '../components/RecoverPassForm/ChangePassForm'

const baseURL = `${import.meta.env.VITE_API_FILMCOMMISSION_URI}/users`

export interface UserData extends User {
  validation: boolean
}

interface LoginResponse {
  success: boolean
  data: UserData
}

let token: User['userToken']

export const setUserToken = (userToken: User['userToken']) => {
  return (token = userToken)
}

export const getConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const loginUser = async (
  credentials: UserCredentials,
): Promise<User | unknown> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseURL}/login`,
      credentials,
    )
    setUserToken(response.data.data.userToken)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const authenticateToken = async () => {
  try {
    const response = await axios.get(`${baseURL}/login`, getConfig())
    return response.data.data
  } catch (error) {
    console.log(error)
    throw error
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

export const authEmailUser = async (
  token: string,
): Promise<UserData | void> => {
  try {
    const response = await axios.post(`${baseURL}/auth`, { token })
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const sendUserRecoverData = async (
  userData: Pick<User, 'username' | 'email'>,
): Promise<ResponseRecoverMail | unknown> => {
  try {
    const response = await axios.post(`${baseURL}/recover_pass`, userData)
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const sendNewPassForChange = async (
  userToChange: UserForChangePass,
): Promise<ResponseRecoverMail | unknown> => {
  try {
    const response = await axios.post(`${baseURL}/change_newpass`, userToChange)
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
