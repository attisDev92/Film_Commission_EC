import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit'
import englishFile from '../i18n/eng.json'
import spanishFile from '../i18n/esp.json'
import { LanguageState } from '../types'

type LanguageOptions = 'eng' | 'esp'
const initialState: LanguageState = englishFile

const languageSlice: Slice<LanguageState> = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (_state, actions: PayloadAction<LanguageOptions>) => {
      if (actions.payload === 'eng') {
        return englishFile
      } else if (actions.payload == 'esp') {
        return spanishFile
      }
    },
  },
})

export const { changeLanguage } = languageSlice.actions

export default languageSlice.reducer
