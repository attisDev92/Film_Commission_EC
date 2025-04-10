import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { AudiovisualProject } from '../types/AudiovisualProject'

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

export default audiovisualProjectsSlice.reducer
