import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { CompanyServiceType } from '../types'
import { AppDispatch } from './store'
import {
  getCompanies,
  destroyCompany,
  destroyCompanyFile,
  postCompanyFile,
  putCompany,
  sendNewCompanyService,
} from '../services/CompanyServices'
import { setNotification } from './notificationReducer'

const initialState: CompanyServiceType[] = []

const companiesSlice: Slice<CompanyServiceType[]> = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (_state, action: PayloadAction<CompanyServiceType[]>) => {
      return action.payload
    },
    setNewCompany: (
      state: CompanyServiceType[],
      action: PayloadAction<CompanyServiceType>,
    ) => {
      return [...state, action.payload]
    },
    updateCompany: (
      state: CompanyServiceType[],
      action: PayloadAction<CompanyServiceType>,
    ) => {
      const companyUpdated = action.payload
      return state.map((company) =>
        company.id === companyUpdated.id ? companyUpdated : company,
      )
    },
    removeCompany: (
      state: CompanyServiceType[],
      action: PayloadAction<CompanyServiceType>,
    ) => {
      const { id } = action.payload
      return state.filter((company) => company.id !== id)
    },
  },
})

export const { setCompanies, setNewCompany, updateCompany, removeCompany } =
  companiesSlice.actions

export const fetchAllCompanies = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getCompanies()
      dispatch(setCompanies(response))
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const postCompany = (newCompany: CompanyServiceType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await sendNewCompanyService(newCompany)
      dispatch(setNewCompany(response))
      return response
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const editFile = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postCompanyFile(formData)
      dispatch(updateCompany(response))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const editCompany = (companyEdited: CompanyServiceType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putCompany(companyEdited)
      dispatch(updateCompany(response))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const deleteCompany = (companyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyCompany(companyId)
      if (response.success) {
        dispatch(removeCompany(companyId))
      }
      return response
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export const deleteFileCompany = (fileId: string, companyId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyCompanyFile(fileId, companyId)
      dispatch(updateCompany(response))
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            // @ts-expect-error error includes response and data but the unknow not contain the property
            text: `${error.response.data.error}`,
          }),
        )
      } else {
        dispatch(
          setNotification({
            style: 'error',
            text: `Error desconocido`,
          }),
        )
      }
    }
  }
}

export default companiesSlice.reducer
