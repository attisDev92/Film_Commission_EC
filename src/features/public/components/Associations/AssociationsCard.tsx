import React, { useState } from 'react'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import {
  LanguageState,
  Associations,
} from '../../../../common/types/LanguageState'
import styles from './AssociationsCard.module.css'
import rightArrow from '../../../../assets/images/Icon-right-arrow.png'

const AssociationsCard: React.FC<Associations> = ({
  nombre,
  email,
  contacto,
  telefono,
  link,
}) => {
  const text: LanguageState = useLanguageSelected()
  const [visible, setVisible] = useState<boolean>(false)
  const hideWhenVisible: React.CSSProperties = {
    display: visible ? 'none' : '',
  }
  const showWhenVisible: React.CSSProperties = {
    display: visible ? '' : 'none',
  }

  const cardVisibility = (): void => {
    setVisible(!visible)
  }

  const handleClockContact = (): void => {
    const destinatario = email
    const link = `mailto:${destinatario}`
    window.location.href = link
  }

  return (
    <>
      <div className={styles.associations__containers} style={showWhenVisible}>
        <div className={styles.container__info}>
          <button className={styles.close} onClick={cardVisibility}>
            {text.idioma === 'esp' ? 'cerrar' : 'close'}
          </button>

          <h3>{nombre}</h3>

          <ul>
            <li>
              {text.associationsSeccion.contacttext}: {contacto}
            </li>
            <li>
              {text.associationsSeccion.phonetext}: {telefono}
            </li>
            <li>
              {text.associationsSeccion.webtext}:
              <a target="blank" href={`http://${link}`}>
                {link}
              </a>
            </li>
            <li>
              {text.associationsSeccion.mailtext}: {email}
            </li>
          </ul>

          <button className={styles.contact} onClick={handleClockContact}>
            {text.idioma == 'esp' ? 'Contactar' : 'Contact'}
          </button>
        </div>
      </div>

      <div className={styles.associations__card} style={hideWhenVisible}>
        <p className={styles.card__text}>{nombre}</p>

        <a onClick={cardVisibility} className={styles.card__link}>
          <img src={rightArrow} />
          {text.idioma === 'esp' ? 'Más información' : 'More information'}
        </a>
      </div>
    </>
  )
}

export default AssociationsCard
