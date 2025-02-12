import axios from 'axios'
import { getConfig } from './UserServices'
import { LocationTypes } from '../types'

const baseURL = 'http://localhost:3002/api/locations'

export const postLocationInfo = async (locationInfo: LocationTypes) => {
  try {
    const response = await axios.post(`${baseURL}`, locationInfo, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
  }
}
