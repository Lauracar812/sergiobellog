
import React from 'react';
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
import BlogPost from '@/pages/BlogPost';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

function Home() {
  return (
    <>
      <Helmet>
        <title>Sergio Bellog - Consultoría y Desarrollo Web</title>
        <meta name="description" content="Soluciones profesionales de consultoría y desarrollo web para impulsar tu negocio." />
      </Helmet>
      <div className='min-h-screen flex flex-col' style={{ backgroundColor: '#EAEAEA' }}>
        <Header />
        <main className="flex-grow">
          <div style={{ backgroundColor: 'white' }}>
            <HeroSection />
          </div>
          <div style={{ height: '50px', backgroundColor: 'white' }}></div>
          <section id="about">
            <AboutSection />
          </section>
          <section id="books">
            <BooksSection />
          </section>
          <section id="gallery">
            <GallerySection />
          </section>
          <section id="events">
            <EventsSection />
          </section>
          <section id="services">
            <ServicesSection />
          </section>
          <section id="blog">
            <BlogSection />
          </section>
        </main>
        <Toaster />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing principal */}
        <Route path="/" element={<Home />} />

        {/* Blog routes */}
        <Route path="/blog/:id" element={<BlogPost />} />
        
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
    </Router>
  );
}

export default App;
