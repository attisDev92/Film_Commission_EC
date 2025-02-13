import { AppDispatch, GlobalState } from '../Redux/store'
import { CompanyServiceType } from '../types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserCompanies } from '../Redux/companiesReducer'

interface UseUserCompaniesReturn {
  companies: CompanyServiceType[]
  company: CompanyServiceType | null
  loading: boolean
  error: string | null
  reload: () => Promise<void>
}

export const useUserCompanies = (
  companyId?: string,
): UseUserCompaniesReturn => {
  const dispatch = useDispatch<AppDispatch>()
  const [company, setCompany] = useState<CompanyServiceType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const companies = useSelector<GlobalState, CompanyServiceType[]>(
    (state) => state.companies,
  )

  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      await dispatch(fetchUserCompanies())
    } catch (error) {
      setError('Error al cargar las empresas')
      console.error('Error al cargar las empresas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCompanies()
  }, [dispatch])

  useEffect(() => {
    if (companyId) {
      const companySelected = companies.find(
        (company) => company.id === companyId,
      )
      setCompany(companySelected || null)
    }
  }, [companyId, companies])

  const reload = async () => {
    await loadCompanies()
  }

  return { companies, company, loading, error, reload }
}
