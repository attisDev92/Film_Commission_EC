import React from 'react'
import AssociationsCard from './Associations/AssociationsCard'
import VideoBanner from '../../components/VideoBanner/VideoBanner'
import Section from '../../components/Section/Section'
import Locations from './Loacation/Location'
import DocumentList from './DocumentsList/DocumentsList'
import { useLanguageSelected } from '../../hooks/useLanguages'
import { LanguageState } from '../../types'
import styles from './Index.module.css'
import Suppliers from './Suppliers/Suppliers'

const Index: React.FC = () => {
  const text: LanguageState = useLanguageSelected()

  return (
    <>
      <VideoBanner />

      <Section id="locations" title={text.locacionSeccion.titulo}>
        <Locations />
      </Section>

      <Section id="suppliers" title={text.suppliersSection.titulo}>
        <Suppliers />
      </Section>

      <Section id="documents" title={text.documentosSeccion.titulo}>
        <div className={styles.container__documents}>
          <p>{text.documentosSeccion.parrafo}</p>
          <ul className="list__links">
            {text.documentosSeccion.lista.map((documento) => (
              <DocumentList
                nombre={documento.nombre}
                link={documento.link}
                key={documento.nombre}
              />
            ))}
          </ul>
        </div>
      </Section>

      <Section id="associations" title={text.associationsSeccion.titulo}>
        <div className={styles.container__associations}>
          {text.associationsSeccion.associations.map((association) => (
            <AssociationsCard {...association} key={association.nombre} />
          ))}
        </div>
      </Section>
    </>
  )
}

export default Index
