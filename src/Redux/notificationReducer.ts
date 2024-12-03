import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from './store'

export interface NotificationState {
  loader?: boolean
  text?: string
  style?: null | 'error' | 'success' | 'warning' | 'info'
}

const initialState: NotificationState = {
  loader: false,
  text: '',
  style: null,
}

const notificaonSlice: Slice<NotificationState> = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    activeNotification: (
      state: NotificationState,
      actions: PayloadAction<NotificationState>,
    ) => {
      state.style = actions.payload.style
      state.text = actions.payload.text
    },
    desactiveNotification: (state: NotificationState) => {
      state.style = null
      state.text = ''
    },
    setLoader: (state: NotificationState, actions: PayloadAction<boolean>) => {
      state.loader = actions.payload
    },
  },
})

export const { activeNotification, desactiveNotification, setLoader } =
  notificaonSlice.actions

export const setNotification = ({
  style,
  text,
}: Pick<NotificationState, 'style' | 'text'>) => {
  return (dispatch: AppDispatch) => {
    dispatch(activeNotification({ style, text }))
    setTimeout(() => {
      // @ts-expect-error the dispatch not need arguments, but typescript request arguments
      dispatch(desactiveNotification<void>())
    }, 3000)
  }
}

export default notificaonSlice.reducer
