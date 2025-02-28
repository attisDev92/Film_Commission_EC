import { GlobalState } from '../Redux/store'
import { AudiovisualProject, User } from '../types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

interface UseProjectsReturn {
  audiovisualProjects: AudiovisualProject[]
  project: AudiovisualProject | null
  loading: boolean
  error: string | null
}

// Función auxiliar para filtrar empresas por userId
const filterProjectByUserId = (
  audiovisualProjects: AudiovisualProject[],
  userId: string,
): AudiovisualProject[] => {
  return audiovisualProjects.filter((project) => project.userId === userId)
}

// Función auxiliar para encontrar una empresa por projectId
const findProjectById = (
  audiovisualProjects: AudiovisualProject[],
  projectId: string,
): AudiovisualProject | null => {
  return audiovisualProjects.find((project) => project.id === projectId) || null
}

export const useUserProjects = (projectId?: string): UseProjectsReturn => {
  const allProjects = useSelector<GlobalState, AudiovisualProject[]>(
    (state) => state.audiovisualProjects,
  )
  const user = useSelector<GlobalState, User>((state) => state.user)

  const [projects, setProjects] = useState<AudiovisualProject[]>([])
  const [project, setProject] = useState<AudiovisualProject | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUserProjects = () => {
      setLoading(true)
      setError(null)

      if (!allProjects || allProjects.length === 0) {
        setError('No se encontraron proyectos.')
        setLoading(false)
        return
      }

      if (!user || !user.id) {
        setError('El userId no está definido.')
        setLoading(false)
        return
      }

      const userProjects = filterProjectByUserId(allProjects, user.id)

      if (userProjects.length === 0) {
        setError('El usuario no cuenta con proyectos registrados.')
      }

      setProjects(userProjects)
      setLoading(false)
    }

    loadUserProjects()
  }, [allProjects, user])

  useEffect(() => {
    if (projectId && projects.length > 0) {
      const projectSelected = findProjectById(projects, projectId)
      setProject(projectSelected)
    }
  }, [projectId, projects])

  return {
    audiovisualProjects: projects,
    project,
    loading,
    error,
  }
}

export const useProjects = (projectId?: string): UseProjectsReturn => {
  const allProjects = useSelector<GlobalState, AudiovisualProject[]>(
    (state) => state.audiovisualProjects,
  )

  const [project, setProjects] = useState<AudiovisualProject | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = () => {
      setLoading(true)
      setError(null)

      if (!allProjects || allProjects.length === 0) {
        setError('No se encontraron empresas.')
        setLoading(false)
        return
      }

      setLoading(false)
    }

    fetchProjects()
  }, [allProjects])

  useEffect(() => {
    if (projectId && allProjects.length > 0) {
      const projectSelected = findProjectById(allProjects, projectId)
      setProjects(projectSelected)
    }
  }, [projectId, allProjects])

  return {
    audiovisualProjects: allProjects,
    project,
    loading,
    error,
  }
}
