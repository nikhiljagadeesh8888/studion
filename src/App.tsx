import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Insta from "./components/Insta";
import Work from "./components/Work";
import Investment from "./components/Investment";

// Initialize react-query client
const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

// Investment page wrapper
const InvestmentPage = () => (
  <>
    <Header />
    <Investment />
    <Insta />
    <Footer />
  </>
);

// Work page wrapper
const WorkPage = () => (
  <>
    <Header />
    <Work />
    <Insta />
    <Footer />
  </>
);

// ProjectDetail page wrapper
const ProjectDetailPage = () => (
  <>
    <Header />
    <ProjectDetail />
    <Insta />
    <Footer />
  </>
);

// Contact page wrapper
const ContactPage = () => (
  <>
    <Header />
    <Contact />
    <Insta />
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/project/:slug" element={<ProjectDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
