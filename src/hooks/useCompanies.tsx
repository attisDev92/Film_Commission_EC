import { AppDispatch, GlobalState } from '../Redux/store'
import { CompanyServiceType } from '../types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchUserCompanies } from '../Redux/companiesReducer'

interface UseUserCompaniesReturn {
  companies: CompanyServiceType[]
  company: CompanyServiceType | null
}

export const useUserCompanies = (
  companyId?: string,
): UseUserCompaniesReturn => {
  const dispatch = useDispatch<AppDispatch>()
  const [company, setCompany] = useState<CompanyServiceType | null>(null)

  useEffect(() => {
    dispatch(fetchUserCompanies())
  }, [dispatch])

  const companies = useSelector<GlobalState, CompanyServiceType[]>(
    (state) => state.companies,
  )

  useEffect(() => {
    if (companyId) {
      const companySelected = companies.find(
        (company) => company.id === companyId,
      )
      setCompany(companySelected || null)
    }
  }, [companyId, companies])

  return { companies, company }
}
