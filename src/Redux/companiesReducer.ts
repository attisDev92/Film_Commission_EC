import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { CompanyServiceType } from '../types'
import { AppDispatch } from './store'
import {
  destroyCompanyFile,
  getUserCompanies,
  postCompanyFile,
  sendNewCompanyService,
} from '../services/CompanyServices'
import { setNotification } from './notificationReducer'

const initialState: CompanyServiceType[] = []

const companiesSlice: Slice<CompanyServiceType[]> = createSlice({
  name: 'userCompanies',
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
      const indexToReplace = state.findIndex(
        (company) => company.id === companyUpdated.id,
      )
      if (indexToReplace !== -1) {
        state[indexToReplace] = companyUpdated
      }
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

export const fetchUserCompanies = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getUserCompanies()
      dispatch(setCompanies(response))
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
