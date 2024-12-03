import React, { useState, useEffect } from 'react'
import { LanguageState } from '../../types'
import logoFilmCommision from '../../assets/images/filmcomissionEC_blanco.svg'
import logoIFCI from '../../assets/images/IFCI_logo_blanco.svg'
import logoMCYP from '../../assets/images/MCYP_logo_blanco.svg'
import styles from './Footer.module.css'
import { useLanguageSelected } from '../../hooks/useLanguages'

const Footer: React.FC = () => {
  const text: LanguageState = useLanguageSelected()
  const [isOpaque, setIsOpaque] = useState<boolean>(false)
  const limitRelativeScrollPosition: number = 0.7

  const handleScroll = (): void => {
    const scrollY: number = window.scrollY || document.documentElement.scrollTop
    const contentHeight: number = document.body.offsetHeight
    const relativeScrollPosition: number = scrollY / contentHeight

    if (relativeScrollPosition >= limitRelativeScrollPosition) {
      setIsOpaque(true)
    } else {
      setIsOpaque(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const styleLogoBar = isOpaque
    ? styles.logo__white_bar_opaque
    : styles.logo__white_bar

  return (
    <footer id="footer">
      <div className={styles.container__footer}>
        <ul className={styles.sections__list}>
          <p>{text.idioma === 'esp' ? 'Secciones' : 'Sections'}</p>

          <li>
            <a href="/#locations">{text.menu.locacion}</a>
          </li>

          <li>
            <a href="/#documents">{text.menu.documentos}</a>
          </li>

          <li>
            <a href="/#suppliers">{text.menu.proveedores}</a>
          </li>
          <li>
            <a href="/locations">{text.LocationGuide.title}</a>
          </li>
        </ul>

        <div className={styles.contact__info}>
          <p>{text.contactoInfo.telf}: +593 2-393-1250</p>
          <p>
            {text.contactoInfo.direccion}: Av. Atahualpa OE1-109 y Av. 10 de
            agosto
          </p>
          <p>Quito - Ecuador</p>
        </div>
      </div>

      <div className={styles.logo__container}>
        <div className={styleLogoBar}></div>
        <a href="#">
          <img
            className={styles.logo__img}
            src={logoFilmCommision}
            alt={text.logo.textoAlternativo}
          />
        </a>
      </div>

      <div className={styles.logos__org}>
        <img src={logoIFCI} />
        <img src={logoMCYP} />
      </div>
    </footer>
  )
}

export default Footer
