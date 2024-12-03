import React from 'react'
import { useLanguageSelected } from '../../hooks/useLanguages'
import { LanguageState } from '../../types'
import styles from './MoreInfo.module.css'

const MoreInfo: React.FC = () => {
  const text: LanguageState = useLanguageSelected()

  const handleOnClick = (): void => {
    const destinatario: string = 'audiovisuales.ifci@creatividad.gob.ec'
    const link: string = `mailto:${destinatario}`
    window.location.href = link
  }

  return (
    <div className={styles.moreInfo__container}>
      <p>{text.contactoInfo.buttonName}</p>
      <button onClick={handleOnClick}>{text.contactoInfo.buttonName}</button>
    </div>
  )
}

export default MoreInfo
