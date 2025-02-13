import axios from 'axios'
import { getConfig } from './UserServices'
import { LocationTypes } from '../types'

const baseURL = `${import.meta.env.VITE_API_FILMCOMMISSION_URI}/locations`

export const postLocationInfo = async (locationInfo: LocationTypes) => {
  try {
    const response = await axios.post(`${baseURL}`, locationInfo, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
  }
}
