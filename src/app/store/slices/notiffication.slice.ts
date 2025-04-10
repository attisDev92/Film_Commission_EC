import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit'

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

export default notificaonSlice.reducer
