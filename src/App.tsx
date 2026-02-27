import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/features/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { StoryPage } from './pages/StoryPage';
import { ClubPage } from './pages/ClubPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><StoryPage /></PageWrapper>} />
        <Route path="/club" element={<PageWrapper><ClubPage /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetailPage /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><HomePage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative bg-offwhite">
        <Header />
        <AnimatedRoutes />
        <Footer />
        <CartDrawer />
      </div>
    </Router>
  );
}
