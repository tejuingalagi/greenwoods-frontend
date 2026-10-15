import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import EnquiryModal from './components/EnquiryModal'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import Specifications from './pages/Specifications'
import Price from './pages/Price'
import LocationPage from './pages/LocationPage'
import GalleryPage from './pages/GalleryPage'
import ProtectedRoute from './auth/ProtectedRoute'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminEnquiries from './pages/admin/AdminEnquiries'

// Your existing public website, unchanged
function PublicSite() {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setEnquiryOpen(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const openEnquiry = () => setEnquiryOpen(true)
  const closeEnquiry = () => setEnquiryOpen(false)

  return (
    <>
      <ScrollToHash />
      <Navbar onEnquire={openEnquiry} />
      <main>
        <Routes>
          <Route path="/" element={<Home onEnquire={openEnquiry} />} />
          <Route path="/specifications" element={<Specifications onEnquire={openEnquiry} />} />
          <Route path="/price" element={<Price onEnquire={openEnquiry} />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons onEnquire={openEnquiry} />
      <EnquiryModal open={enquiryOpen} onClose={closeEnquiry} />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminEnquiries />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>

      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}

export default App