import { AppDispatch, GlobalState } from '../Redux/store'
import { CompanyServiceType } from '../types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUserCompanies } from '../Redux/companiesReducer'
import { getCompanies } from '../services/CompanyServices'

interface UseCompaniesReturn {
  companies: CompanyServiceType[]
  company: CompanyServiceType | null
  loading: boolean
  error: string | null
  reload?: () => Promise<void>
}

export const useUserCompanies = (companyId?: string): UseCompaniesReturn => {
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

export const useCompanies = (): Omit<
  UseCompaniesReturn,
  'reaload' | 'company'
> => {
  const [companies, setCompanies] = useState<CompanyServiceType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getCompanies()
      if (response) {
        setCompanies(response)
      }
    } catch (error: unknown) {
      console.error(error)
      setError('Error al cargar la información')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return {
    companies,
    loading,
    error,
  }
}
