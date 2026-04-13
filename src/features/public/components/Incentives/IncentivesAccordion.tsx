import { useState } from 'react'
import './IncentivesAccordion.css'
import ImageSlider from '../../../../common/components/ImageSlider'
import { useLanguageSelected } from '../../../../common/hooks/useLanguages'
import {
  LanguageState,
  Incentive,
} from '../../../../common/types/LanguageState'

const incentivesImages: Record<string, string[]> = {
  cia: [
    '/images/information/Certificado de inversión audiovisual/page1.png',
    '/images/information/Certificado de inversión audiovisual/page2.png',
    '/images/information/Certificado de inversión audiovisual/page3.png',
    '/images/information/Certificado de inversión audiovisual/page4.png',
    '/images/information/Certificado de inversión audiovisual/page5.png',
    '/images/information/Certificado de inversión audiovisual/page6.png',
    '/images/information/Certificado de inversión audiovisual/page7.png',
    '/images/information/Certificado de inversión audiovisual/page8.png',
    '/images/information/Certificado de inversión audiovisual/page9.png',
    '/images/information/Certificado de inversión audiovisual/page10.png',
    '/images/information/Certificado de inversión audiovisual/page11.png',
    '/images/information/Certificado de inversión audiovisual/page12.png',
  ],
  deducibilidad150: [
    '/images/information/deducibilidad 150/page1.png',
    '/images/information/deducibilidad 150/page2.png',
  ],
  devolucion50: [
    '/images/information/Devolucion 50/page1.png',
    '/images/information/Devolucion 50/page2.png',
  ],
  iva0: [
    '/images/information/IVA 0/page1.png',
    '/images/information/IVA 0/page2.png',
  ],
}

const IncentivesAccordion = () => {
  const text: LanguageState = useLanguageSelected()
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div>
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
