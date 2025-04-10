import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeLanguage } from '../../../app/store/slices/language.slice'
import { LanguageState } from '../../types/LanguageState'
import styles from './LanguageButton.module.css'

import espFlagImage from '../../../assets/images/esp_bandera.png'
import engFlagImage from '../../../assets/images/uk_bandera.png'
import { useLanguageSelected } from '../../hooks/useLanguages'

type Language = 'esp' | 'eng'

const LanguageButton: React.FC = () => {
  const dispatch = useDispatch()
  const text: LanguageState = useLanguageSelected()

  const [styleEsp, setStyleEsp] = useState<string>(styles.language__link)
  const [styleEng, setStyleEng] = useState<string>(styles.language__link)

  useEffect(() => {
    if (text.idioma === 'esp') {
      setStyleEsp(styles.language__link__hover)
      setStyleEng(styles.language__link)
    } else if (text.idioma === 'eng') {
      setStyleEng(styles.language__link__hover)
      setStyleEsp(styles.language__link)
    }
  }, [text])

  const handleChangeLanguage = (
    languageToChange: Language,
  ): React.MouseEventHandler<HTMLDivElement> => {
    return () => dispatch(changeLanguage(languageToChange))
  }

  return (
    <div className={styles.language__buttons}>
      <div onClick={handleChangeLanguage('eng')} className={styleEng}>
        <img
          src={engFlagImage}
          alt="English"
          className={styles.language__img}
        />
        ENG
      </div>
      <div onClick={handleChangeLanguage('esp')} className={styleEsp}>
        <img
          src={espFlagImage}
          alt="Español"
          className={styles.language__img}
        />
        ESP
      </div>
    </div>
  )
}

export default LanguageButton
