import React, { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import './PowerPointSlider.css'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PowerPointSliderProps {
  url: string
  style?: React.CSSProperties
  className?: string
}

const PowerPointSlider: React.FC<PowerPointSliderProps> = ({
  url,
  style,
  className,
}) => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [width, setWidth] = useState<number>(600)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages))

  return (
    <div
      className={`ppt-slider-container ${className || ''}`}
      style={style}
      ref={containerRef}
    >
      <div className="ppt-slider-viewer">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error('Error cargando PDF:', error)
          }}
          loading="Cargando presentación..."
          error={<div style={{ color: 'red' }}>No se pudo cargar el PDF.</div>}
        >
          <Page
            pageNumber={pageNumber}
            width={width}
            loading="Cargando página..."
            error={
              <div style={{ color: 'red' }}>No se pudo cargar la página.</div>
            }
          />
        </Document>
      </div>
      <div className="ppt-slider-controls">
        <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
          &lt;
        </button>
        <span>
          {pageNumber} / {numPages}
        </span>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          &gt;
        </button>
      </div>
    </div>
  )
}

export default PowerPointSlider
