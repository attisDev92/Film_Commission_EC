import { GlobalState } from '../../../app/store/store'
import { User } from '../../users/types/User'
import { CompanyServiceType } from '../types/CompanyServiceType'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

interface UseCompaniesReturn {
  companies: CompanyServiceType[]
  company: CompanyServiceType | null
  loading: boolean
  error: string | null
}

// Función auxiliar para filtrar empresas por userId
const filterCompaniesByUserId = (
  companies: CompanyServiceType[],
  userId: string,
): CompanyServiceType[] => {
  return companies.filter((company) => company.userId === userId)
}

// Función auxiliar para encontrar una empresa por companyId
const findCompanyById = (
  companies: CompanyServiceType[],
  companyId: string,
): CompanyServiceType | null => {
  return companies.find((company) => company.id === companyId) || null
}

export const useUserCompanies = (companyId?: string): UseCompaniesReturn => {
  const allCompanies = useSelector<GlobalState, CompanyServiceType[]>(
    (state) => state.companies,
  )
  const user = useSelector<GlobalState, User>((state) => state.user)

  const [companies, setCompanies] = useState<CompanyServiceType[]>([])
  const [company, setCompany] = useState<CompanyServiceType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserCompanies = () => {
      setLoading(true)
      setError(null)

      if (!allCompanies || allCompanies.length === 0) {
        setError('No se encontraron empresas.')
        setLoading(false)
        return
      }

      if (!user || !user.id) {
        setError('El userId no está definido.')
        setLoading(false)
        return
      }

      const userCompanies = filterCompaniesByUserId(allCompanies, user.id)

      if (userCompanies.length === 0) {
        setError('El usuario no cuenta con empresas registradas.')
      }

      setCompanies(userCompanies)
      setLoading(false)
    }

    loadUserCompanies()
  }, [allCompanies, user])

  useEffect(() => {
    if (companyId && companies.length > 0) {
      const companySelected = findCompanyById(companies, companyId)
      setCompany(companySelected)
    }
  }, [companyId, companies])

  return {
    companies,
    company,
    loading,
    error,
  }
}

export const useCompanies = (companyId?: string): UseCompaniesReturn => {
  const allCompanies = useSelector<GlobalState, CompanyServiceType[]>(
    (state) => state.companies,
  )

  const [company, setCompany] = useState<CompanyServiceType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanies = () => {
      setLoading(true)
      setError(null)

      if (!allCompanies || allCompanies.length === 0) {
        setError('No se encontraron empresas.')
        setLoading(false)
        return
      }

      setLoading(false)
    }

    fetchCompanies()
  }, [allCompanies])

  useEffect(() => {
    if (companyId && allCompanies.length > 0) {
      const companySelected = findCompanyById(allCompanies, companyId)
      setCompany(companySelected)
    }
  }, [companyId, allCompanies])

  return {
    companies: allCompanies,
    company,
    loading,
    error,
  }
}
