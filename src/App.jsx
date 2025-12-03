
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import BooksSection from '@/components/BooksSection';
import GallerySection from '@/components/GallerySection';
import EventsSection from '@/components/EventsSection';
import ServicesSection from '@/components/ServicesSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import ContactModal from '@/components/ContactModal';
import { ContactModalProvider } from '@/context/ContactModalContext';

function Home({ isContactOpen, setIsContactOpen }) {
  return (
    <>
      <Helmet>
        <title>Sergio Bellog - Autor, Coach de Vida y Consultor</title>
        <meta name="description" content="Autor bestseller del New York Times. Consultoría, coaching de vida, conferencias motivacionales y desarrollo personal. Especialista en resiliencia, empoderamiento e inclusión." />
        <meta name="keywords" content="Sergio Bellog, autor, coach de vida, consultor, empoderamiento, resiliencia, desarrollo personal" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sergio Bellog - Autor, Coach de Vida y Consultor" />
        <meta property="og:description" content="Autor bestseller del New York Times. Consultoría, coaching de vida, conferencias motivacionales y desarrollo personal." />
        <meta property="og:url" content="https://sergiobellog.com" />
        <meta property="og:image" content="https://horizons-cdn.hostinger.com/117acb36-31dc-4706-a945-f23250275492/abded8c8564e182b7e4a4cba61d52acb.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sergio Bellog - Autor, Coach de Vida y Consultor" />
        <meta name="twitter:description" content="Autor bestseller del New York Times. Consultoría y desarrollo personal." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://sergiobellog.com" />
      </Helmet>
      <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#EAEAEA' }}>
        <Header />
        <main className="flex-grow">
          <div style={{ backgroundColor: 'white' }}>
            <HeroSection />
          </div>
          <div style={{ height: '50px', backgroundColor: 'white' }}></div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="books">
            <BooksSection />
          </div>
          <div id="gallery">
            <GallerySection />
          </div>
          <div id="events">
            <EventsSection />
          </div>
          <div id="services">
            <ServicesSection />
          </div>
          <div id="blog">
            <BlogSection />
          </div>
          <div id="newsletter">
            <NewsletterSection />
          </div>
        </main>
        <Footer />
        <ScrollToTop />
        <Toaster />
      </div>
    </>
  );
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <ContactModalProvider isOpen={isContactOpen} setIsOpen={setIsContactOpen}>
      <Router>
        <Routes>
          {/* Landing principal */}
          <Route path="/" element={<Home isContactOpen={isContactOpen} setIsContactOpen={setIsContactOpen} />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Contact Modal */}
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </Router>
    </ContactModalProvider>
  );
}

export default App;
