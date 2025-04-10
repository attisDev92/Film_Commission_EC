import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import englishFile from '../../../common/i18n/eng.json'
import spanishFile from '../../../common/i18n/esp.json'

type LanguageOptions = 'eng' | 'esp'

const initialState = englishFile

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (_state, actions: PayloadAction<LanguageOptions>) => {
      if (actions.payload === 'eng') {
        return englishFile
      } else {
        return spanishFile
      }
    },
  },
})

export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer
