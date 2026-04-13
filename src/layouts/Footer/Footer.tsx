import React, { useState, useEffect } from 'react'
import { LanguageState } from '../../common/types/LanguageState'
import logoFilmCommision from '../../assets/images/filmcomissionEC_blanco.svg'
import logoICCA from '../../assets/images/logo icca.png'
import styles from './Footer.module.css'
import { useLanguageSelected } from '../../common/hooks/useLanguages'

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
    <footer id="footer" className={styles.footer}>
      <div className={styles.container__footer}>
        <ul className={styles.sections__list}>
          <p>{text.idioma === 'esp' ? 'Secciones' : 'Sections'}</p>
          <li>
            <a href="/#locations">{text.menu.locations}</a>
          </li>
          <li>
            <a href="/#suppliers">{text.menu.directory}</a>
          </li>
          <li>
            <a href="/companies">{text.menu.AVServices}</a>
          </li>
          <li>
            <a href="/#documents">{text.menu.documents}</a>
          </li>
          <li>
            <a href="/#associations">{text.menu.associations}</a>
          </li>
          <li>
            <a href="/system">LogIn</a>
          </li>
          <li>
            <a href="/system/register">Regsiter</a>
          </li>
        </ul>

        <div>
          <ul>
            <p>Ecuador Film Commission (gestionada por el ICCA)</p>
            <li>
              {' '}
              Sitio web:{' '}
              <a href="https://ecuadorfilmcommission.com/">
                https://ecuadorfilmcommission.com/
              </a>
            </li>
            <li>
              Correo electrónico:{' '}
              <a href="mailto:info@ecuadorfilmcommission.com">
                info@ecuadorfilmcommission.com
              </a>
            </li>
          </ul>
          <hr />
          <ul>
            <p>Instituto de Fomento a la Creatividad y la Innovación - ICCA</p>
            <li>Dirección: Av. Colón E5-34 y Juan León Mera</li>
            <li>Código Postal: 170524</li>
            <li>Quito - Ecuador</li>
            <li>
              Sitio web:{' '}
              <a href="https://www.cineyaudiovisual.gob.ec/">
                https://www.cineyaudiovisual.gob.ec/
              </a>
            </li>
            <li>
              Correo electrónico:{' '}
              <a href="mailto:servicios@cineyaudiovisual.gob.ec">
                servicios@cineyaudiovisual.gob.ec
              </a>
            </li>
          </ul>
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
        <img src={logoICCA} className={styles['icca-logo']} alt="ICCA logo" />
      </div>
    </footer>
  )
}

export default Footer
