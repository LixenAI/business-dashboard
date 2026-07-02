import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Download, Menu } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/pricing': 'Pricing Hub',
  '/build-tracker': 'Build Tracker',
  '/financials': 'Financials',
  '/crm': 'CRM Pipeline',
  '/brand': 'Brand & Voice',
  '/markets': 'Market Verticals',
};

export default function Layout() {
  const location = useLocation();
  const [currentDate, setCurrentDate] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
  }, []);

  const pageTitle = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex min-h-[100dvh] bg-[#060E1A]">
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden md:block fixed left-0 top-0 h-screen z-50">
        <Navbar />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="fixed inset-y-0 left-0 z-50 md:hidden"
          >
            <Navbar forceExpanded onNavigate={() => setMobileMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-[260px]">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="sticky top-0 z-30 h-14 bg-[#060E1A]/80 backdrop-blur-md border-b border-border-custom flex items-center justify-between px-4 md:px-6"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-button text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-text-primary tracking-tight leading-tight">{pageTitle}</h1>
              <p className="text-[11px] text-text-secondary hidden sm:block leading-tight">{currentDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center bg-surface border border-border-custom rounded-button px-3 py-1.5 focus-within:border-primary-blue transition-colors">
              <Search size={16} className="text-text-tertiary mr-2" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none w-32 lg:w-40"
              />
            </div>

            {/* Notification */}
            <button className="relative p-2 rounded-button text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>

            {/* Export */}
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-surface-elevated border border-border-custom rounded-button text-sm text-text-secondary hover:text-text-primary hover:border-border-light transition-all">
              <Download size={14} />
              <span>Export Report</span>
            </button>
          </div>
        </motion.header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 pb-12">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}