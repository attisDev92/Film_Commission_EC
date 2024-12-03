import React, { useEffect, useState } from 'react'
import { LanguageState } from '../../types'
import Menu from './Menu'
import LanguageButton from './LanguageButton'
import logoFilmCommission from '../../assets/images/filmcomissionEC_blanco.svg'
import styles from './Header.module.css'
import { useLanguageSelected } from '../../hooks/useLanguages'

const Header: React.FC = () => {
  const [isOpaque, setIsOpaque] = useState<boolean>(false)
  const text: LanguageState = useLanguageSelected()

  const scrollTopDistance: number = 500

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop

    if (scrollTop > scrollTopDistance) {
      setIsOpaque(true)
    } else {
      setIsOpaque(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const styleMenuBar = isOpaque
    ? styles.header__menu_bar_opaque
    : styles.header__menu_bar

  const styleLogoBar = isOpaque
    ? styles.logo__white_bar_opaque
    : styles.logo__white_bar

  return (
    <header className={styles.header}>
      <LanguageButton />

      <div className={styleMenuBar}></div>

      <Menu />

      <div className={styleLogoBar}></div>

      <a href="/#">
        <img
          className={styles.header__img}
          src={logoFilmCommission}
          alt={text.logo.textoAlternativo}
        />
      </a>
    </header>
  )
}

export default Header
