import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Home/Index'
import NotFound from '../pages/NotFound/NotFound'
import Header from '../layouts/Header/Header'
import Footer from '../layouts/Footer/Footer'
import CompanyProfile from '../features/companies/components/CompanyView/CompanyProfile/CompanyProfile'
import CompaniesGallery from '../pages/CompaniesCataloge/CompaniesGallery'
import LocationPage from '../features/locations/components/LocationPage/LocationPage'
import LocationGallery from '../features/locations/components/LocationCatalogue/LocationGallery'

const PublicRoutes: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="/companies" element={<CompaniesGallery />} />
        <Route path="/locations/:id" element={<LocationPage />} />
        <Route path="/locations" element={<LocationGallery />} />
        <Route path="" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default PublicRoutes
