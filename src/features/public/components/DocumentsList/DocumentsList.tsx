import React from 'react'
import {
  DocumentsLink,
  LanguageState,
} from '../../../../common/types/LanguageState'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import styles from './DocumentsList.module.css'

const DocumentList: React.FC<DocumentsLink> = ({ nombre, link }) => {
  const text: LanguageState = useLanguageSelected()

  return (
    <li className={styles.list__container}>
      <p>{nombre}</p> <br />
      <a href={link} target="_blank">
        <button className={styles.Btn}>
          <svg
            className={styles.svgIcon}
            viewBox="0 0 384 512"
            height="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
          <span className={styles.icon2}></span>
          <span className="tooltip">{styles.Download}</span>
        </button>
        {text.idioma === 'esp' ? 'Ver más' : 'Show more'}
      </a>
    </li>
  )
}

export default DocumentList
