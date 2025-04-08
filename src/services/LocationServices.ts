import axios from 'axios'
import { LocationTypes } from '../types'
import { getConfig } from './UserServices'
import { BASE_URI } from '../config/envConfig'

const baseURL = `${BASE_URI}/locations`

export const getLocations = async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getLocation = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postLocation = async (newLocation: LocationTypes) => {
  try {
    const response = await axios.post(`${baseURL}`, newLocation, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const putLocation = async (locationEdited: LocationTypes) => {
  try {
    const response = await axios.put(
      `${baseURL}/${locationEdited.id}`,
      locationEdited,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyLocation = async (locationId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${locationId}`, getConfig())
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postLocationFile = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${baseURL}/upload`,
      formData,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyLocationFile = async (
  locationId: string,
  fileId: string,
) => {
  try {
    const response = await axios.delete(
      `${baseURL}/${locationId}/files/${fileId}`,
      getConfig(),
    )
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
