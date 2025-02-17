import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from '../views/Index/Index'
import NotFound from '../views/NotFound/NotFound'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CompanyProfile from '../views/CompaniesCataloge/CompanyProfile'

const PublicRoutes: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/companies/:id" element={<CompanyProfile />} />
        <Route path="" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default PublicRoutes
