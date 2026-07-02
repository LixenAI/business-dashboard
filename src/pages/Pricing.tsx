import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Zap,
  Plus,
  X,
  Info,
  ChevronDown,
  ChevronUp,
  Tag,
  Package,
  Sparkles,
} from 'lucide-react';

/* ─── Types ─── */
interface Plan {
  id: string;
  name: string;
  subtitle: string;
  monthly: number;
  yearly: number;
  description: string;
  color: string;
  accentColor: string;
  features: string[];
  highlighted?: boolean;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  monthly: number;
}

/* ─── Data ─── */
const clientPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Local Automation Starter',
    subtitle: 'Essential automation for local businesses',
    monthly: 249,
    yearly: 199,
    description: 'Perfect for small businesses just getting started with AI automation',
    color: '#0B1D35',
    accentColor: '#5BB8FF',
    features: [
      'CRM & pipeline management',
      'Lead follow-up automation',
      'Missed-call text back',
      '24/7 online booking widget',
      'Unified inbox (SMS/email/social)',
      'Business phone system',
      'Email & SMS marketing',
      'Review request automation',
      'Website & funnel builder',
      'Custom domain',
      'Payments & invoicing',
      'AI-assisted prospecting (B2B)',
    ],
  },
  {
    id: 'growth',
    name: 'AI Growth System',
    subtitle: 'Advanced AI-powered growth suite',
    monthly: 497,
    yearly: 397,
    description: 'Everything in Starter plus advanced AI features for serious growth',
    color: '#0C2D5A',
    accentColor: '#1A6FD4',
    highlighted: true,
    features: [
      'Everything in Starter',
      '24/7 Conversation AI (chat)',
      'Voice AI Receptionist',
      'Social media lead capture',
      'AI lead qualification',
      'No-show recovery sequence',
      'Database reactivation',
      '30-day lead nurture campaign',
      'Reputation growth system',
      'Ad manager',
      'Monthly performance review',
    ],
  },
];

const partnerPlans: Plan[] = [
  {
    id: 'starter-partner',
    name: 'Starter Partner',
    subtitle: 'Launch your AI agency',
    monthly: 417,
    yearly: 5000,
    description: '$5,000/year · $2,500 down + 6× $416.67/mo',
    color: '#0B1D35',
    accentColor: '#5BB8FF',
    features: [
      'Can sell Starter Plan + Add-Ons',
      'Platform setup (plan-configured)',
      'Business plan template',
      'Industry playbook',
      'Brand guide & pricing guide',
      'Niche selection support',
      'Sales asset library',
      'AI prospecting leads (Year 1)',
      'Marketing audit report',
      'Onboarding call',
      'Platform support resources',
      'LixenAI AI assistant access',
    ],
  },
  {
    id: 'growth-partner',
    name: 'Growth Partner',
    subtitle: 'Scale your AI agency',
    monthly: 500,
    yearly: 6000,
    description: '$6,000/year · $3,000 down + 6× $500/mo',
    color: '#0C2D5A',
    accentColor: '#1A6FD4',
    highlighted: true,
    features: [
      'Can sell Growth Plan + Add-Ons',
      'Everything in Starter Partner',
      'Priority support',
      'Advanced sales training',
      'White-glove onboarding',
      'Co-marketing opportunities',
      'Annual partner summit access',
      'Direct founder access',
    ],
  },
];

const addOns: AddOn[] = [
  { id: 'ask-ai', name: 'Ask AI', description: 'AI assistant for content & Q&A', monthly: 39 },
  { id: 'ai-studio', name: 'AI Studio', description: 'Prompt-based page builder', monthly: 39 },
  { id: 'content-ai', name: 'Content AI', description: 'Drafts posts, emails, blogs', monthly: 39 },
  { id: 'funnel-ai', name: 'Funnel & Website AI', description: 'Generates page structures', monthly: 39 },
  { id: 'reviews-ai', name: 'Reviews AI', description: 'Context-aware review responses', monthly: 39 },
];

const bundlePrice = 149;

/* ─── Feature item ─── */
function FeatureItem({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div className="flex items-start gap-2.5 py-1.5">
      <Check size={16} style={{ color: accentColor }} className="mt-0.5 shrink-0" />
      <span className="text-sm text-[#B8C8E0]">{text}</span>
    </div>
  );
}

/* ─── Plan card ─── */
function PlanCard({ plan, isAnnual, selectedAddOns }: { plan: Plan; isAnnual: boolean; selectedAddOns: string[] }) {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const displayFeatures = showAllFeatures ? plan.features : plan.features.slice(0, 6);

  const price = isAnnual ? plan.yearly : plan.monthly;
  const period = isAnnual ? '/year' : '/mo';

  return (
    <motion.div
      layout
      className={`relative rounded-xl border overflow-hidden ${
        plan.highlighted
          ? 'border-[#1A6FD4]/40 shadow-[0_4px_24px_rgba(26,111,212,0.12)]'
          : 'border-border-custom'
      }`}
      style={{ backgroundColor: plan.color }}
    >
      {plan.highlighted && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-[#1A6FD4] text-white text-xs font-medium rounded-bl-lg">
          Most Popular
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-[#F0F4FA]">{plan.name}</h3>
          <p className="text-xs text-[#7B93B5] mt-0.5">{plan.subtitle}</p>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#F0F4FA]" style={{ fontFamily: 'var(--font-mono)' }}>
              ${price.toLocaleString()}
            </span>
            <span className="text-sm text-[#7B93B5]">{period}</span>
          </div>
          <p className="text-xs text-[#7B93B5] mt-1">{plan.description}</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#1A3358] my-4" />

        {/* Features */}
        <div>
          {displayFeatures.map((f) => (
            <FeatureItem key={f} text={f} accentColor={plan.accentColor} />
          ))}
          {plan.features.length > 6 && (
            <button
              onClick={() => setShowAllFeatures(!showAllFeatures)}
              className="flex items-center gap-1 mt-2 text-xs text-[#5BB8FF] hover:text-[#1A6FD4] transition-colors"
            >
              {showAllFeatures ? (
                <>
                  Show less <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Show all {plan.features.length} features <ChevronDown size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main page ─── */
export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'client' | 'partner'>('client');

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedAddOnTotal = addOns
    .filter((a) => selectedAddOns.has(a.id))
    .reduce((sum, a) => sum + a.monthly, 0);

  const currentPlans = activeTab === 'client' ? clientPlans : partnerPlans;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Pricing Hub</h1>
          <p className="text-sm text-text-secondary mt-0.5">Client plans, partner programs, and add-ons</p>
        </div>

        {/* Annual/Monthly toggle */}
        <div className="flex items-center gap-2 bg-surface rounded-lg border border-border-custom p-1 w-fit">
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              isAnnual ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Annual
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              !isAnnual ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-2 p-1 bg-surface rounded-xl w-fit border border-border-custom">
        {[
          { key: 'client' as const, label: 'Client Plans', icon: Package },
          { key: 'partner' as const, label: 'Partner Plans', icon: Tag },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === tab.key ? 'text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {activeTab === tab.key && (
              <motion.div layoutId="pricingTab" className="absolute inset-0 bg-primary-blue rounded-lg" transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }} />
            )}
            <tab.icon size={16} className="relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Plan Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {currentPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isAnnual={isAnnual} selectedAddOns={Array.from(selectedAddOns)} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Add-Ons Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-soft-neon" />
          <h2 className="text-lg font-semibold text-text-primary">AI Add-Ons</h2>
          <span className="text-xs text-text-secondary">${bundlePrice}/mo for all 5 (save ${39 * 5 - bundlePrice}/mo)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.has(addon.id);
            return (
              <button
                key={addon.id}
                onClick={() => toggleAddOn(addon.id)}
                className={`relative p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#1A6FD4] bg-[#0C2D5A]/50'
                    : 'border-border-custom bg-surface hover:border-border-light'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1A6FD4] flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <h4 className="text-sm font-medium text-text-primary">{addon.name}</h4>
                <p className="text-xs text-text-secondary mt-1">{addon.description}</p>
                <p className="text-sm font-bold text-soft-neon mt-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  ${addon.monthly}/mo
                </p>
              </button>
            );
          })}
        </div>

        {selectedAddOns.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info size={16} className="text-soft-neon" />
                <span className="text-sm text-text-secondary">
                  {selectedAddOns.size} add-on{selectedAddOns.size > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-text-secondary">Total add-ons: </span>
                <span className="text-lg font-bold text-text-primary" style={{ fontFamily: 'var(--font-mono)' }}>
                  ${selectedAddOnTotal}/mo
                </span>
                {selectedAddOns.size >= 3 && selectedAddOnTotal > bundlePrice && (
                  <p className="text-xs text-success">
                    Bundle all 5 for ${bundlePrice}/mo and save ${selectedAddOnTotal - bundlePrice}!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}