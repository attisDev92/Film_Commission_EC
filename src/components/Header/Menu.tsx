import React from 'react'
import styles from './Header.module.css'
import { LanguageState } from '../../types'
import { useLanguageSelected } from '../../hooks/useLanguages'

const Menu: React.FC = () => {
  const { menu }: LanguageState = useLanguageSelected()

  return (
    <nav className={styles.menu}>
      <div>
        <a href="/#locations">{menu.locacion}</a>
        <a href="/#documents">{menu.documentos}</a>
        <a href="/#suppliers">{menu.proveedores}</a>
        <a href="#footer">{menu.contacto}</a>
      </div>
    </nav>
  )
}

export default Menu
