import axios from 'axios'
import { getConfig } from './UserServices'
import { CompanyServiceType } from '../types'

const baseURL = 'http://localhost:3002/api/companies'

export const getCompanies = async () => {
  try {
    const response = await axios.get(`${baseURL}`)
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

export const getUserCompanies = async () => {
  try {
    const response = await axios.get(`${baseURL}/user`, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

export const sendNewCompanyService = async (newCompany: CompanyServiceType) => {
  try {
    const response = await axios.post(`${baseURL}`, newCompany, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
  }
}

export const postCompanyFile = async (files: FormData) => {
  try {
    const response = await axios.put(`${baseURL}/files`, files, getConfig())
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
    return error
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
  }
}

export const postCompany = async (companyEdited: CompanyServiceType) => {
  try {
    const response = await axios.post(
      `${baseURL}/edit/${companyEdited.id}`,
      companyEdited,
      getConfig(),
    )
    return response.data.data
  } catch (error: unknown) {
    console.error(error)
  }
}

export const destroyCompany = async (companyId: string) => {
  try {
    const response = await axios.delete(`${baseURL}/${companyId}`, getConfig())
    return response.data
  } catch (error: unknown) {
    console.error(error)
  }
}
