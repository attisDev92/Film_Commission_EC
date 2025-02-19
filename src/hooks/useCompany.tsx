import { useState, useEffect } from 'react'
import { getCompany } from '../services/CompanyServices'
import { CompanyServiceType } from '../types'

interface UseCompanyReturn {
  company: CompanyServiceType | null
  loading: boolean
  error: string | null
}

export const useCompany = (id: string | null): UseCompanyReturn => {
  const [company, setCompany] = useState<CompanyServiceType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompany = async () => {
    if (!id) {
      setError('Error al obtener el ID de la empresa.')
      return
    }

    try {
      setLoading(true)
      const response = await getCompany(id as string)
      setCompany(response.data)
    } catch (error: unknown) {
      console.error(error)
      setError('Error al cargar los datos de la empresa.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompany()
  }, [id])

  return {
    company,
    loading,
    error,
  }
}
