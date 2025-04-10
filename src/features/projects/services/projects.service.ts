import axios from 'axios'
import { getConfig } from '../../auth/services/auth.service'
import { AudiovisualProject } from '../types/AudiovisualProject'
import { BASE_URI } from '../../../app/config/envConfig'

const baseURL = `${BASE_URI}/projects`

export const getProject = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getProjects = async () => {
  try {
    const response = await axios.get(`${baseURL}`)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postProject = async (
  newAudiovisualProject: AudiovisualProject,
) => {
  try {
    const response = await axios.post(
      `${baseURL}`,
      newAudiovisualProject,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const putProject = async (projectEdited: AudiovisualProject) => {
  try {
    const response = await axios.put(
      `${baseURL}/edit`,
      projectEdited,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postProjectFiles = async (files: FormData) => {
  try {
    const response = await axios.put(`${baseURL}/files`, files, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const deleteProjectFiles = async (fileId: string, projectId: string) => {
  try {
    const response = await axios.put(
      `${baseURL}/files/delete`,
      { fileId, projectId },
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyProject = async (projectId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${projectId}`, getConfig())
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
