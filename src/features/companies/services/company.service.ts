import axios from 'axios'
import { getConfig } from '../../auth/services/auth.service'
import { CompanyServiceType } from '../types/CompanyServiceType'
import { BASE_URI } from '../../../app/config/envConfig'

const baseURL = `${BASE_URI}/companies`

export const getCompany = async (id: string) => {
  try {
    const response = await axios.get(`${baseURL}/${id}`)
    return response.data
  } catch (error: unknown) {
    console.log(error)
    throw error
  }
}

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${baseURL}`)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const getUserCompanies = async () => {
  try {
    const response = await axios.get(`${baseURL}/user`, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postCompany = async (newCompany: CompanyServiceType) => {
  try {
    const response = await axios.post(`${baseURL}`, newCompany, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const postCompanyFile = async (files: FormData) => {
  try {
    const response = await axios.put(`${baseURL}/files`, files, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyCompanyFile = async (fileId: string, companyId: string) => {
  try {
    const response = await axios.put(
      `${baseURL}/files/delete`,
      { fileId, companyId },
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const putCompany = async (companyEdited: CompanyServiceType) => {
  try {
    const response = await axios.put(
      `${baseURL}/edit`,
      companyEdited,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}

export const destroyCompany = async (companyId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${companyId}`, getConfig())
    return response.data
  } catch (error: unknown) {
    console.error(error)
    throw error
  }
}
