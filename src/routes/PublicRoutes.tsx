import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../pages/Home/Index'
import NotFound from '../pages/NotFound/NotFound'
import Header from '../layouts/Header/Header'
import Footer from '../layouts/Footer/Footer'
import CompanyProfile from '../features/companies/components/CompanyView/CompanyProfile/CompanyProfile'
import CompaniesGallery from '../pages/CompaniesCataloge/CompaniesGallery'

const PublicRoutes: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="/companies" element={<CompaniesGallery />} />
        <Route path="" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default PublicRoutes
