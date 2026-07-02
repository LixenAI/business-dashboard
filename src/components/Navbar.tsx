import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/" },
  { icon: Tag, label: "Pricing Hub", path: "/pricing" },
  { icon: Hammer, label: "Build Tracker", path: "/build-tracker" },
  { icon: BarChart3, label: "Financials", path: "/financials" },
  { icon: GitBranch, label: "CRM Pipeline", path: "/crm" },
  { icon: Palette, label: "Brand & Voice", path: "/brand" },
  { icon: Globe, label: "Market Verticals", path: "/markets" },
  { icon: BookOpen, label: "Company Playbook", path: "/playbook" },
];

interface NavbarProps {
  forceExpanded?: boolean;
  onNavigate?: () => void;
}

export function Navbar({ forceExpanded = false, onNavigate }: NavbarProps) {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);
  const location = useLocation();

  useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`h-full bg-slate-2 border-r border-white/[0.06] flex flex-col transition-all duration-300 ${
        isExpanded ? "w-[260px]" : "w-[68px]"
      }`}
    >
      {/* Logo */}
      <div
        className={`flex items-center gap-3 px-4 h-16 border-b border-white/[0.06] flex-shrink-0 ${
          !isExpanded && "justify-center px-2"
        }`}
      >
        <img src="/logo-icon.svg" alt="LixenAI" className="w-8 h-8 flex-shrink-0" />
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-bold text-slate-12 whitespace-nowrap overflow-hidden"
            >
              LixenAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                active
                  ? "text-blue-11"
                  : "text-slate-11 hover:text-slate-12 hover:bg-white/[0.04]"
              }`}
              title={!isExpanded ? item.label : undefined}
            >
              {active && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-blue-9/10 rounded-xl border border-blue-9/20"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <Icon
                className={`w-[18px] h-[18px] flex-shrink-0 relative z-10 ${
                  active ? "text-blue-11" : ""
                }`}
              />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden relative z-10"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && isExpanded && (
                <motion.div
                  layoutId="activeNavDot"
                  className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-9"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Collapse Toggle */}
      {!forceExpanded && (
        <div className="p-2 border-t border-white/[0.06]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-slate-11 hover:text-slate-12 hover:bg-white/[0.04] transition-colors"
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
