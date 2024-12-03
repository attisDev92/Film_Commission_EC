import React from 'react'

import VideoBanner from '../../components/VideoBanner/VideoBanner'
import Section from '../../components/Section/Section'
import Locations from './Loacation/Location'
import DocumentList from './DocumentsList/DocumentsList'
import { useLanguageSelected } from '../../hooks/useLanguages'
import { LanguageState } from '../../types'
import styles from './Index.module.css'
import SuppliersCard from './SuppliersCard/SuppliersCard'

const Index: React.FC = () => {
  const text: LanguageState = useLanguageSelected()

  return (
    <>
      <VideoBanner />

      <Section id="locations" title={text.locacionSeccion.titulo}>
        <Locations />
      </Section>

      <Section id="documents" title={text.documentosSeccion.titulo}>
        <ul className="list__links">
          {text.documentosSeccion.lista.map((documento) => (
            <DocumentList
              nombre={documento.nombre}
              link={documento.link}
              key={documento.nombre}
            />
          ))}
        </ul>
      </Section>

      <Section id="suppliers" title={text.proveedoresSeccion.titulo}>
        <div className={styles.container__suppliers}>
          {text.proveedoresSeccion.proveedores.map((supplier) => (
            <SuppliersCard {...supplier} key={supplier.nombre} />
          ))}
        </div>
      </Section>
    </>
  )
}

export default Index
