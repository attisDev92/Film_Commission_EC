import axios from 'axios'
import { ResponseRecoverMail } from '../components/RecoverPassForm/RecoverPassForm'
import { UserForChangePass } from '../components/RecoverPassForm/ChangePassForm'
import { User } from '../../users/types/User'
import { UserCredentials } from '../types/UserCredentials'
import { BASE_URI } from '../../../app/config/envConfig'

const baseURL = `${BASE_URI}/users`

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

export const loginUser = async (credentials: UserCredentials) => {
  try {
    const response = await axios.post(`${baseURL}/login`, credentials)
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
