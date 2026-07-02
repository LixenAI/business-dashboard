import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Tag,
  Hammer,
  BarChart3,
  GitBranch,
  Palette,
  Globe,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Tag, label: 'Pricing Hub', path: '/pricing' },
  { icon: Hammer, label: 'Build Tracker', path: '/build-tracker' },
  { icon: BarChart3, label: 'Financials', path: '/financials' },
  { icon: GitBranch, label: 'CRM Pipeline', path: '/crm' },
  { icon: Palette, label: 'Brand & Voice', path: '/brand' },
  { icon: Globe, label: 'Market Verticals', path: '/markets' },
  { icon: BookOpen, label: 'Company Playbook', path: '/playbook' },
];

interface NavbarProps {
  forceExpanded?: boolean;
  onNavigate?: () => void;
}

export default function Navbar({ forceExpanded = false, onNavigate }: NavbarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (forceExpanded) {
      setCollapsed(false);
      return;
    }
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [forceExpanded]);

  const sidebarWidth = collapsed && !forceExpanded ? 'w-[72px]' : 'w-[260px]';

  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={`h-screen bg-navy-deep border-r border-border-custom z-50 flex flex-col transition-all duration-300 ${sidebarWidth}`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 min-h-[72px]">
        <Link to="/" className="flex items-center gap-0 overflow-hidden" onClick={onNavigate}>
          {collapsed && !forceExpanded ? (
            <img src="/logo-icon.svg" alt="LixenAI" className="w-8 h-8" />
          ) : (
            <img src="/logo-white.svg" alt="LixenAI" className="h-8" />
          )}
        </Link>
        {!forceExpanded && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-button bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-button transition-all duration-200 group ${
                isActive
                  ? 'text-white'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
              }`}
              title={collapsed && !forceExpanded ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId={forceExpanded ? "nav-active-pill-mobile" : "nav-active-pill"}
                  className="absolute inset-0 bg-primary-blue rounded-button"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  style={{ zIndex: 0 }}
                />
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-soft-neon rounded-r-full z-10" />
              )}
              <Icon size={20} className="relative z-10 shrink-0" />
              <AnimatePresence mode="wait">
                {(!collapsed || forceExpanded) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border-custom">
        <div className={`flex items-center ${collapsed && !forceExpanded ? 'justify-center' : 'justify-between'} text-text-tertiary`}>
          {(!collapsed || forceExpanded) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs font-medium tracking-wide"
            >
              LixenAI
            </motion.span>
          )}
          <span className="text-[10px] font-mono bg-surface px-2 py-0.5 rounded-full">
            v1.0
          </span>
        </div>
      </div>
    </motion.aside>
  );
}