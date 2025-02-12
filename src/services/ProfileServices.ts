import axios from 'axios'
import { getConfig } from './UserServices'
import { UserProfile } from '../types'
const baseURL = 'http://localhost:3002/api/profile'

export const sendProfileData = async (profileData: UserProfile) => {
  try {
    const response = await axios.post(`${baseURL}`, profileData, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

export const getProfile = async () => {
  try {
    const response = await axios.get(`${baseURL}`, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.log(error)
    return error
  }
}
