import axios from 'axios'
import { getConfig } from './UserServices'
import { UserProfile } from '../types'
const baseURL = `${import.meta.env.VITE_API_FILMCOMMISSION_URI}/profile`

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
