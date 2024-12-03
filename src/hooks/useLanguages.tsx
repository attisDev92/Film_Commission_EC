import { useSelector } from 'react-redux'
import { GlobalState } from '../Redux/store'
import { LanguageState } from '../types'

export const useLanguageSelected = (): LanguageState => {
  const text = useSelector<GlobalState, LanguageState>(
    (state) => state.language,
  )
  return text
}
