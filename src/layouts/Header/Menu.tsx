import React from 'react'
import styles from './Header.module.css'
import { LanguageState } from '../../common/types/LanguageState'
import { useLanguageSelected } from '../../common/hooks/useLanguages'

const Menu: React.FC = () => {
  const { menu }: LanguageState = useLanguageSelected()

  return (
    <nav className={styles.menu}>
      <ul className={styles.nav__menu}>
        <li>
          <div className={styles.dropdown__container}>
            <a href="#" className={styles.nav__link}>
              {menu.filmEc}
            </a>
            <div className={styles.dropdown__menu}>
              <a href="/#aboutEC">
                <span>{menu.aboutEc}</span>
              </a>
              <a href="/#incentives">
                <span>{menu.incentives}</span>
              </a>
              <a href="/#documents">
                <span>{menu.documents}</span>
              </a>
              <a href="/#associations">
                <span>{menu.associations}</span>
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.dropdown__container}>
            <a href="/#locations" className={styles.nav__link}>
              {menu.locations}
            </a>
            <div className={styles.dropdown__menu}>
              <a href="/#locations">
                <span>{menu.cataloge}</span>
              </a>
              <a href="/system">
                <span>{menu.registerLocation}</span>
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.dropdown__container}>
            <a href="/#services" className={styles.nav__link}>
              {menu.AVServices}
            </a>
            <div className={styles.dropdown__menu}>
              <a href="/companies">
                <span>{menu.AVServices}</span>
              </a>
              <a href="/system">
                <span>{menu.registerCompany}</span>
              </a>
            </div>
          </div>
        </li>
        <li>
          <div className={styles.dropdown__container}>
            <a href="/#projects" className={styles.nav__link}>
              {menu.projects}
            </a>
            <div className={styles.dropdown__menu}>
              <a href="https://cinemaec.com/projects">
                <span>{menu.directory}</span>
              </a>
              <a href="/system">
                <span>{menu.registerProject}</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
