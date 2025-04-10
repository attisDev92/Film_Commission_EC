import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { CompanyServiceType } from '../types/CompanyServiceType'

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

export default companiesSlice.reducer
