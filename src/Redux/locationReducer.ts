import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'
import { LocationTypes } from '../types'
import { AppDispatch } from './store'
import { setLoader, setNotification } from './notificationReducer'
import {
  postLocation,
  putLocation,
  destroyLocation,
  postLocationFile,
  destroyLocationFile,
} from '../services/LocationServices'

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

export const postNewLocation = (newLocation: LocationTypes) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoader(true))
    try {
      const response = await postLocation(newLocation)
      if (response) {
        dispatch(setNewLocation(response))
        dispatch(
          setNotification({
            style: 'success',
            text: 'Locación creada exitosamente',
          }),
        )
        return response
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Error al crear la locación',
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }
}

export const editLocation = (locationEdited: LocationTypes) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoader(true))
    try {
      const response = await putLocation(locationEdited)
      dispatch(updateLocation(response))
      dispatch(
        setNotification({
          style: 'success',
          text: 'Locación actualizada exitosamente',
        }),
      )
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Error al actualizar la locación',
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }
}

export const deleteLocation = (locationId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoader(true))
    try {
      const response = await destroyLocation(locationId)
      if (response.success) {
        dispatch(removeLocation({ id: locationId } as LocationTypes))
        dispatch(
          setNotification({
            style: 'success',
            text: 'Locación eliminada exitosamente',
          }),
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Error al eliminar la locación',
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }
}

export const editFile = (formData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoader(true))
    try {
      const response = await postLocationFile(formData)
      dispatch(updateLocation(response))
      dispatch(
        setNotification({
          style: 'success',
          text: 'Archivo subido exitosamente',
        }),
      )
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Error al subir el archivo',
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }
}

export const deleteFile = (locationId: string, fileId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoader(true))
    try {
      const response = await destroyLocationFile(locationId, fileId)
      if (response.success) {
        const updatedLocation = response.data
        dispatch(updateLocation(updatedLocation))
        dispatch(
          setNotification({
            style: 'success',
            text: 'Archivo eliminado exitosamente',
          }),
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          setNotification({
            style: 'error',
            text: 'Error al eliminar el archivo',
          }),
        )
      }
    } finally {
      dispatch(setLoader(false))
    }
  }
}

export default locationsSlice.reducer
