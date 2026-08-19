import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/pages/LandingPage';
import BuilderPage from '@/pages/BuilderPage';
import DashboardPage from '@/pages/DashboardPage';
import TemplatesPage from '@/pages/TemplatesPage';
import BlogPage from '@/pages/BlogPage';
import BlogArticlePage from '@/pages/BlogArticlePage';
import CareerResourcesPage from '@/pages/CareerResourcesPage';
import InterviewTipsPage from '@/pages/InterviewTipsPage';
import ContactPage from '@/pages/ContactPage';
import SupportPage from '@/pages/SupportPage';
import TermsPage from '@/pages/TermsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CareerAssistant from '@/components/CareerAssistant';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/builder/:id" element={<BuilderPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/career-resources" element={<CareerResourcesPage />} />
            <Route path="/interview-tips" element={<InterviewTipsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <CareerAssistant />
      </div>
    </BrowserRouter>
  );
}
