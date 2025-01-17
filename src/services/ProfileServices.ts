import axios from 'axios'
import { getConfig } from './UserServices'
import { User, UserProfile } from '../types'
const baseURL = 'http://localhost:3002/api/profile'

export const sendProfileData = async (
  token: string,
  profileData: UserProfile,
) => {
  try {
    const response = await axios.post(
      `${baseURL}`,
      profileData,
      getConfig(token),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

export const getProfile = async (token: User['userToken']) => {
  try {
    const response = await axios.get(`${baseURL}`, getConfig(token))
    return response.data
  } catch (error: unknown) {
    console.log(error)
    return error
  }
}
