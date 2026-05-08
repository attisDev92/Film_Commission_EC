import { useState } from 'react'
import './IncentivesAccordion.css'
import ImageSlider from '../../../../common/components/ImageSlider'

type IncentiveImage = string | { src: string; link?: string }
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import {
  LanguageState,
  Incentive,
} from '../../../../common/types/LanguageState'

const IncentivesAccordion = () => {
  const text: LanguageState = useLanguageSelected()
  const [open, setOpen] = useState<string | null>(null)

  const incentivesImages: Record<string, IncentiveImage[]> =
    text.idioma === 'esp'
      ? {
          cia: [
            '/images/information/es/Certificado de inversion audiovisual/page1.png',
            '/images/information/es/Certificado de inversion audiovisual/page2.png',
            '/images/information/es/Certificado de inversion audiovisual/page3.png',
            '/images/information/es/Certificado de inversion audiovisual/page4.png',
            '/images/information/es/Certificado de inversion audiovisual/page5.png',
            '/images/information/es/Certificado de inversion audiovisual/page6.png',
            '/images/information/es/Certificado de inversion audiovisual/page7.png',
            '/images/information/es/Certificado de inversion audiovisual/page8.png',
          ],
          deducibilidad150: [
            '/images/information/es/deducibilidad 150/page1.png',
            {
              src: '/images/information/es/deducibilidad 150/page2.png',
              link: 'https://150.culturaypatrimonio.gob.ec/',
            },
          ],
          devolucion50: [
            '/images/information/es/Devolucion 50/page1.png',
            {
              src: '/images/information/es/Devolucion 50/page2.png',
              link: 'https://www.sri.gob.ec/devolucion-del-iva-pagado-por-sociedades-en-actividades-de-producciones-audiovisuales',
            },
          ],
          iva0: [
            '/images/information/es/IVA 0/page1.png',
            {
              src: '/images/information/es/IVA 0/page2.png',
              link: 'https://www.sri.gob.ec/servicios-artisticos-y-culturales',
            },
          ],
        }
      : {
          cia: [
            '/images/information/en/Certificado de inversion audiovisual/page1.png',
            '/images/information/en/Certificado de inversion audiovisual/page2.png',
            '/images/information/en/Certificado de inversion audiovisual/page3.png',
            '/images/information/en/Certificado de inversion audiovisual/page4.png',
            '/images/information/en/Certificado de inversion audiovisual/page5.png',
            '/images/information/en/Certificado de inversion audiovisual/page6.png',
            '/images/information/en/Certificado de inversion audiovisual/page7.png',
            '/images/information/en/Certificado de inversion audiovisual/page8.png',
          ],
          deducibilidad150: [
            '/images/information/en/deducibilidad 150/page1.png',
            {
              src: '/images/information/en/deducibilidad 150/page2.png',
              link: 'https://150.culturaypatrimonio.gob.ec/',
            },
          ],
          devolucion50: [
            '/images/information/en/Devolucion 50/page1.png',
            {
              src: '/images/information/en/Devolucion 50/page2.png',
              link: 'https://www.sri.gob.ec/devolucion-del-iva-pagado-por-sociedades-en-actividades-de-producciones-audiovisuales',
            },
          ],
          iva0: [
            '/images/information/en/IVA 0/page1.png',
            {
              src: '/images/information/en/IVA 0/page2.png',
              link: 'https://www.sri.gob.ec/servicios-artisticos-y-culturales',
            },
          ],
        }

  return (
    <div className="accordion-responsive">
      {text.incentivesSection.incentives.map((incentive: Incentive) => (
        <div key={incentive.key} className="accordion-incentive-item">
          <button
            className={`accordion-incentive-btn${open === incentive.key ? ' open' : ''}`}
            onClick={() =>
              setOpen(open === incentive.key ? null : incentive.key)
            }
            type="button"
          >
            <span className="accordion-incentive-title">
              {incentive.titulo}
            </span>
            <span className="accordion-incentive-arrow">
              {open === incentive.key ? '▲' : '▼'}
            </span>
          </button>
          {open === incentive.key && (
            <div className="accordion-incentive-panel">
              <ImageSlider images={incentivesImages[incentive.key]} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default IncentivesAccordion
