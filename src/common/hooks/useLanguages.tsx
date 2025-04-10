import { useSelector } from 'react-redux'
import { GlobalState } from '../../app/store/store'
import { LanguageState } from '../types/LanguageState'

export const useLanguageSelected = (): LanguageState => {
  const text = useSelector<GlobalState, LanguageState>(
    (state) => state.language,
  )
  return text
}
