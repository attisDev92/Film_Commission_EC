import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { AudiovisualProject } from '../types'
import { AppDispatch } from './store'
import {
  deleteProjectFiles,
  destroyProject,
  getProjects,
  postProject,
  postProjectFiles,
  putProject,
} from '../services/ProjectsServices'
import { setNotification } from './notificationReducer'

const initialState: AudiovisualProject[] = []

const audiovisualProjectsSlice: Slice<AudiovisualProject[]> = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (_state, action: PayloadAction<AudiovisualProject[]>) => {
      return action.payload
    },
    setNewProject: (
      state: AudiovisualProject[],
      action: PayloadAction<AudiovisualProject>,
    ) => {
      return [...state, action.payload]
    },
    updateProject: (
      state: AudiovisualProject[],
      action: PayloadAction<AudiovisualProject>,
    ) => {
      const projectUpdated = action.payload
      return state.map((project) =>
        project.id === projectUpdated.id ? projectUpdated : project,
      )
    },
    removeProject: (
      state: AudiovisualProject[],
      action: PayloadAction<AudiovisualProject>,
    ) => {
      const { id } = action.payload
      return state.filter((project) => project.id !== id)
    },
  },
})

export const { setProjects, setNewProject, updateProject, removeProject } =
  audiovisualProjectsSlice.actions

export const fetchAllProjects = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await getProjects()
      dispatch(setProjects(response))
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

export const createProject = (newProject: AudiovisualProject) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await postProject(newProject)
      dispatch(setNewProject(response))
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
      const response = await postProjectFiles(formData)
      dispatch(updateProject(response))
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

export const editProject = (projectEdited: AudiovisualProject) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await putProject(projectEdited)
      dispatch(updateProject(response))
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

export const deleteProject = (projectId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await destroyProject(projectId)
      if (response.success) {
        dispatch(removeProject(projectId))
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

export const deleteFileProject = (fileId: string, projectId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await deleteProjectFiles(fileId, projectId)
      dispatch(updateProject(response))
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

export default audiovisualProjectsSlice.reducer
