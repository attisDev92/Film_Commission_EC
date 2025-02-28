import axios from 'axios'
import { getConfig } from './UserServices'
import { UserProfile } from '../types'
import { BASE_URI } from '../config/envConfig'
const baseURL = `${BASE_URI}/profile`

export const sendProfileData = async (profileData: UserProfile) => {
  try {
    const response = await axios.post(`${baseURL}`, profileData, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getProfile = async () => {
  try {
    const response = await axios.get(`${baseURL}`, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
