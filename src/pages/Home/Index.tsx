import AssociationsCard from '../../features/public/components/Associations/AssociationsCard'
import VideoBanner from '../../features/public/components/VideoBanner/VideoBanner'
import Section from '../../common/components/Section/Section'
import Locations from '../../features/public/components/Loacation/Location'
// import DocumentList from '../../features/public/components/DocumentsList/DocumentsList'
import { useLanguageSelected } from '../../common/hooks/useLanguages'
import { LanguageState } from '../../common/types/LanguageState'
import styles from './Index.module.css'
import Suppliers from '../../features/public/components/Suppliers/Suppliers'
// import { Fade } from 'react-awesome-reveal'
import About from '../../features/public/components/About/About'
import PermissionsAccordion from '../../features/public/components/Permissions/PermissionsAccordion'
import IncentivesAccordion from '../../features/public/components/Incentives/IncentivesAccordion'
import SecuritySlider from '../../features/public/components/Security/SecuritySlider'

const Index: React.FC = () => {
  const text: LanguageState = useLanguageSelected()

  return (
    <>
      <VideoBanner />

      <Section id="aboutEC" title="¿Por qué Ecuador?">
        <About />
      </Section>

      <Section id="film-commission" title={text.filmCommission.titulo}>
        <>
          <p>{text.filmCommission.parrafo}</p>
          <img
            src="src/assets/images/information/infografía2.png"
            alt="Infografía"
          />
        </>
      </Section>

      <Section id="incentives" title={text.incentivesSection.titulo}>
        <IncentivesAccordion />
      </Section>

      <Section id="permissions" title={text.permissionsSection.titulo}>
        <PermissionsAccordion />
      </Section>

      <Section id="locations" title={text.locacionSeccion.titulo}>
        <Locations />
      </Section>

      <Section id="suppliers" title={text.suppliersSection.titulo}>
        <Suppliers />
      </Section>

      {/* <Section id="documents" title={text.documentosSeccion.titulo}>
        <div className={styles.container__documents}>
          <p>{text.documentosSeccion.parrafo}</p>
          <ul className={styles.list__links}>
            <Fade cascade>
              {text.documentosSeccion.lista.map((documento) => (
                <DocumentList
                  nombre={documento.nombre}
                  link={documento.link}
                  key={documento.nombre}
                />
              ))}
            </Fade>
          </ul>
        </div>
      </Section> */}

      <Section id="associations" title={text.associationsSeccion.titulo}>
        <div className={styles.container__associations}>
          {text.associationsSeccion.associations.map((association) => (
            <AssociationsCard {...association} key={association.nombre} />
          ))}
        </div>
      </Section>

      <Section id="security" title={text.securitySection.titulo}>
        <SecuritySlider />
      </Section>
    </>
  )
}

export default Index
