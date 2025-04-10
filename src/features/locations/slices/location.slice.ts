import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { LocationTypes } from '../types/LocationTypes'

const initialState: LocationTypes[] = []

const locationsSlice: Slice<LocationTypes[]> = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLocations: (_state, action: PayloadAction<LocationTypes[]>) => {
      return action.payload
    },
    setNewLocation: (
      state: LocationTypes[],
      action: PayloadAction<LocationTypes>,
    ) => {
      return [...state, action.payload]
    },
    updateLocation: (
      state: LocationTypes[],
      action: PayloadAction<LocationTypes>,
    ) => {
      const locationUpdated = action.payload
      return state.map((location) =>
        location.id === locationUpdated.id ? locationUpdated : location,
      )
    },
    removeLocation: (
      state: LocationTypes[],
      action: PayloadAction<LocationTypes>,
    ) => {
      const { id } = action.payload
      return state.filter((location) => location.id !== id)
    },
  },
})

export const { setLocations, setNewLocation, updateLocation, removeLocation } =
  locationsSlice.actions

export default locationsSlice.reducer
