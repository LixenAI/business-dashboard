import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Users,
  DollarSign,
  FileText,
  Mic,
  GitBranch,
  Building2,
  ChevronRight,
  Target,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
} from 'lucide-react';

/* ─── Tab definitions ─── */
const tabs = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'partner-program', label: 'Partner Program', icon: Users },
  { id: 'service-plans', label: 'Service Plans', icon: DollarSign },
  { id: 'financial-model', label: 'Financial Model', icon: BarChart3 },
  { id: 'voice-rules', label: 'Voice & Rules', icon: Mic },
  { id: 'lead-flows', label: 'Lead Flows', icon: GitBranch },
  { id: 'verticals', label: 'Verticals', icon: Building2 },
];

/* ─── Overview content ─── */
function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Company Overview</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          LixenAI is an AI automation agency that helps local businesses acquire customers, streamline operations, and build systems for sustainable growth. We partner with entrepreneurs who want to build their own AI automation agencies under our proven framework.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <div className="p-4 bg-surface-elevated rounded-lg border border-border-custom">
            <p className="text-xs text-text-secondary uppercase tracking-wider">Mission</p>
            <p className="text-sm text-text-primary mt-1">Empower local businesses with AI-driven automation that delivers measurable growth</p>
          </div>
          <div className="p-4 bg-surface-elevated rounded-lg border border-border-custom">
            <p className="text-xs text-text-secondary uppercase tracking-wider">Vision</p>
            <p className="text-sm text-text-primary mt-1">Become the leading AI automation partner for local businesses across every major vertical</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Founded', value: '2024', sub: 'AI-native from day one' },
          { label: 'Founder', value: 'Irene', sub: 'Agency operations & partnerships' },
          { label: 'Co-Founder', value: 'Rob', sub: 'Technology & product' },
        ].map((item) => (
          <div key={item.label} className="bg-surface rounded-xl border border-border-custom p-5">
            <p className="text-xs text-text-secondary uppercase tracking-wider">{item.label}</p>
            <p className="text-xl font-bold text-text-primary mt-1">{item.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'AI-First', desc: 'We lead with AI in every solution we build' },
            { title: 'Results-Driven', desc: 'Every feature must tie to measurable outcomes' },
            { title: 'Partner Success', desc: 'Our partners win first, we win second' },
            { title: 'Continuous Innovation', desc: 'Always iterating, always improving' },
          ].map((v) => (
            <div key={v.title} className="flex items-start gap-3 p-4 bg-surface-elevated rounded-lg border border-border-custom">
              <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-text-primary">{v.title}</p>
                <p className="text-xs text-text-secondary mt-0.5">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Partner Program ─── */
function PartnerProgramTab() {
  const [expandedTier, setExpandedTier] = useState<string | null>('starter');

  const tiers = [
    {
      id: 'starter',
      name: 'Starter Partner',
      price: '$5,000/year',
      payment: '$2,500 down + 6× $416.67/mo',
      color: '#5BB8FF',
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
      id: 'growth',
      name: 'Growth Partner',
      price: '$6,000/year',
      payment: '$3,000 down + 6× $500/mo',
      color: '#1A6FD4',
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

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Partner Program Overview</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          Our partner program enables entrepreneurs to launch their own AI automation agency using LixenAI proven systems, templates, and support. Partners get everything they need to acquire clients, deliver results, and build a recurring revenue business.
        </p>
      </div>

      <div className="space-y-4">
        {tiers.map((tier) => (
          <div key={tier.id} className="bg-surface rounded-xl border border-border-custom overflow-hidden">
            <button
              onClick={() => setExpandedTier(expandedTier === tier.id ? null : tier.id)}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-surface-elevated/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tier.color}15` }}>
                  <Users size={22} style={{ color: tier.color }} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-text-primary">{tier.name}</h4>
                  <p className="text-sm font-mono" style={{ color: tier.color }}>{tier.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-secondary hidden sm:block">{tier.payment}</span>
                <ChevronRight size={18} className={`text-text-tertiary transition-transform ${expandedTier === tier.id ? 'rotate-90' : ''}`} />
              </div>
            </button>

            <AnimatePresence>
              {expandedTier === tier.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-2 border-t border-border-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tier.features.map((f) => (
                        <div key={f} className="flex items-start gap-2 py-1.5">
                          <CheckCircle2 size={16} style={{ color: tier.color }} className="shrink-0 mt-0.5" />
                          <span className="text-sm text-[#B8C8E0]">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30 p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Target size={16} className="text-soft-neon" />
          Partner Success Metrics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Target Clients (Year 1)', value: '10-15', desc: 'Active paying clients' },
            { label: 'Avg Monthly Revenue', value: '$4,970–$7,455', desc: 'At 10-15 clients on Starter' },
            { label: 'Breakeven Timeline', value: '2-4 months', desc: 'With consistent prospecting' },
          ].map((m) => (
            <div key={m.label} className="p-3 bg-surface-elevated rounded-lg border border-border-custom">
              <p className="text-xs text-text-secondary">{m.label}</p>
              <p className="text-lg font-bold text-text-primary font-mono mt-1">{m.value}</p>
              <p className="text-xs text-text-secondary">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Service Plans ─── */
function ServicePlansTab() {
  const plans = [
    {
      name: 'Local Automation Starter',
      monthly: 249,
      yearly: 199,
      color: '#5BB8FF',
      description: 'Essential automation for local businesses',
      features: ['CRM & pipeline', 'Lead follow-up automation', 'Missed-call text back', 'Online booking widget', 'Unified inbox', 'Business phone system', 'Email & SMS marketing', 'Review automation', 'Website & funnel builder', 'Payments & invoicing'],
    },
    {
      name: 'AI Growth System',
      monthly: 497,
      yearly: 397,
      color: '#1A6FD4',
      description: 'Advanced AI-powered growth suite',
      highlighted: true,
      features: ['Everything in Starter', '24/7 Conversation AI', 'Voice AI Receptionist', 'Social lead capture', 'AI lead qualification', 'No-show recovery', 'Database reactivation', '30-day nurture campaign', 'Reputation growth system', 'Ad manager'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Client Service Plans</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          Two core plans designed to meet local businesses where they are. Starter covers the essentials. Growth unlocks the full AI-powered growth system. Partners can sell either plan plus add-ons.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border overflow-hidden ${plan.highlighted ? 'border-[#1A6FD4]/40' : 'border-border-custom'}`}
            style={{ backgroundColor: plan.highlighted ? '#0C2D5A' : '#0B1D35' }}
          >
            {plan.highlighted && (
              <div className="px-5 py-1.5 bg-[#1A6FD4] text-white text-xs font-medium">Most Popular</div>
            )}
            <div className="p-5">
              <h4 className="text-base font-semibold text-text-primary">{plan.name}</h4>
              <p className="text-xs text-text-secondary mt-0.5">{plan.description}</p>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-bold text-text-primary font-mono">${plan.monthly}</span>
                <span className="text-sm text-text-secondary">/mo</span>
                <span className="text-xs text-text-tertiary">or ${plan.yearly}/mo annual</span>
              </div>
              <div className="h-px bg-border-custom my-4" />
              <div className="space-y-2">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2">
                    <CheckCircle2 size={14} style={{ color: plan.color }} className="shrink-0 mt-0.5" />
                    <span className="text-sm text-[#B8C8E0]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Zap size={16} className="text-soft-neon" />
          AI Add-Ons
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { name: 'Ask AI', price: 39 },
            { name: 'AI Studio', price: 39 },
            { name: 'Content AI', price: 39 },
            { name: 'Funnel AI', price: 39 },
            { name: 'Reviews AI', price: 39 },
          ].map((addon) => (
            <div key={addon.name} className="p-3 bg-surface-elevated rounded-lg border border-border-custom text-center">
              <p className="text-sm font-medium text-text-primary">{addon.name}</p>
              <p className="text-xs font-mono text-soft-neon mt-1">${addon.price}/mo</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-success mt-3">Bundle all 5 for $149/mo (save $46/mo)</p>
      </div>
    </div>
  );
}

/* ─── Financial Model ─── */
function FinancialModelTab() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Financial Model</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          Unit economics and projections for the partner program and client services. Understanding these numbers is critical for partner success and agency growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Starter Partner Revenue', value: '$5,000', sub: 'Annual partner fee', color: '#5BB8FF' },
          { label: 'Growth Partner Revenue', value: '$6,000', sub: 'Annual partner fee', color: '#1A6FD4' },
          { label: 'Starter Client Revenue', value: '$249/mo', sub: '$2,988 ARR per client', color: '#4ADE80' },
          { label: 'Growth Client Revenue', value: '$497/mo', sub: '$5,964 ARR per client', color: '#FACC15' },
        ].map((m) => (
          <div key={m.label} className="bg-surface rounded-xl border border-border-custom p-5">
            <p className="text-xs text-text-secondary uppercase tracking-wider">{m.label}</p>
            <p className="text-xl font-bold mt-1 font-mono" style={{ color: m.color }}>{m.value}</p>
            <p className="text-xs text-text-secondary mt-0.5">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Partner Unit Economics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-elevated/50">
                <th className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">Metric</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">Starter Partner</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase px-4 py-3">Growth Partner</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Annual Fee', '$5,000', '$6,000'],
                ['Down Payment', '$2,500', '$3,000'],
                ['Monthly (6 mo)', '$416.67', '$500'],
                ['Can Sell Plans', 'Starter + Add-Ons', 'Growth + Add-Ons'],
                ['Target Clients Y1', '10-15', '10-15'],
                ['Est. Monthly Revenue @ 10 clients', '$2,490–$4,970', '$3,970–$7,455'],
                ['Platform Cost (est.)', '~$750/mo', '~$750/mo'],
                ['Gross Margin (est.)', '70-85%', '75-90%'],
              ].map((row, i) => (
                <tr key={i} className="border-t border-border-custom">
                  <td className="px-4 py-3 text-sm text-text-primary font-medium">{row[0]}</td>
                  <td className="px-4 py-3 text-sm font-mono text-[#B8C8E0]">{row[1]}</td>
                  <td className="px-4 py-3 text-sm font-mono text-[#B8C8E0]">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30 p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
          <BarChart3 size={16} className="text-soft-neon" />
          Growth Projections
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { q: 'Q3 2026', partners: 18, revenue: '$12,500/mo' },
            { q: 'Q4 2026', partners: 25, revenue: '$18,000/mo' },
            { q: 'Q1 2027', partners: 35, revenue: '$25,000/mo' },
            { q: 'Q2 2027', partners: 50, revenue: '$36,000/mo' },
          ].map((p) => (
            <div key={p.q} className="p-3 bg-surface-elevated rounded-lg border border-border-custom">
              <p className="text-xs text-text-secondary font-medium">{p.q}</p>
              <p className="text-lg font-bold text-text-primary font-mono mt-1">{p.partners}</p>
              <p className="text-[10px] text-success">{p.revenue} est.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Voice & Rules ─── */
function VoiceRulesTab() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Brand Voice & Communication Rules</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          How we speak, what we stand for, and the rules that guide every interaction. Every partner and team member should internalize these principles.
        </p>
      </div>

      <div className="space-y-3">
        {[
          { title: 'Professional but Approachable', desc: 'Confident expertise without being cold. Use "we" and "you" to create connection. We are the experts, but we are also humans.', icon: Mic },
          { title: 'AI-Forward', desc: 'Lead with AI capabilities. Frame automation as a competitive advantage, not a replacement for human touch.', icon: Zap },
          { title: 'Results-Focused', desc: 'Always tie features to outcomes. "Save 10+ hours/week" beats "automation included." Numbers beat adjectives.', icon: Target },
          { title: 'Local Business Empathy', desc: 'Understand their struggles. Reference specific pain points: missed calls, no-shows, manual follow-up, review drought.', icon: Shield },
          { title: 'Clear & Direct', desc: 'No jargon without explanation. If you say "API" or "webhook", explain what it does in plain English.', icon: FileText },
          { title: 'Action-Oriented', desc: 'End every section with next steps. Every page, email, and conversation should guide toward a clear decision.', icon: ArrowRight },
        ].map((rule) => (
          <div key={rule.title} className="bg-surface rounded-xl border border-border-custom p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#0C2D5A] flex items-center justify-center shrink-0">
              <rule.icon size={18} className="text-soft-neon" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary">{rule.title}</h4>
              <p className="text-sm text-[#B8C8E0] mt-1">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Words We Use / Words We Avoid</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-success font-medium uppercase tracking-wider mb-2">Use</p>
            <div className="space-y-1.5">
              {['AI-powered', 'Automation', 'Growth system', 'Smart follow-up', 'Revenue engine', '24/7 assistant'].map((w) => (
                <div key={w} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-success shrink-0" />
                  <span className="text-sm text-[#B8C8E0]">{w}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-[#F87171] font-medium uppercase tracking-wider mb-2">Avoid</p>
            <div className="space-y-1.5">
              {['Chatbot (sounds cheap)', 'CRM (without context)', 'Software (too generic)', 'Cheap / Affordable', 'Easy / Simple (undervalues)', 'Guaranteed (legal risk)'].map((w) => (
                <div key={w} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#F87171]/10 text-[#F87171] text-xs flex items-center justify-center shrink-0">×</span>
                  <span className="text-sm text-[#B8C8E0]">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Lead Flows ─── */
function LeadFlowsTab() {
  const flows = [
    {
      name: 'Inbound Website Lead',
      steps: ['Visitor lands on lixen.ai', 'Fills out contact form or starts chat', 'AI responds within 2 minutes', 'Lead enters CRM with source tag', 'Automated nurture sequence begins', 'Sales rep follows up within 4 hours'],
      icon: Globe,
    },
    {
      name: 'LinkedIn Outreach',
      steps: ['Prospect identified via AI prospecting', 'Personalized connection request sent', 'Follow-up message with value prop', 'Discovery call scheduled', 'Demo prepared with vertical-specific content', 'Proposal sent within 24 hours of demo'],
      icon: Users,
    },
    {
      name: 'Referral Lead',
      steps: ['Existing partner or client refers', 'Referral tagged with source + referrer', 'Priority follow-up (within 2 hours)', 'Discovery call', 'Custom proposal with referral discount', 'Close + commission to referrer'],
      icon: Target,
    },
    {
      name: 'Partner Application',
      steps: ['Prospect visits partner landing page', 'Watches demo video or attends live demo', 'Fills out partner application', 'Application reviewed (24-48 hours)', 'Interview scheduled', 'Onboarding begins upon acceptance'],
      icon: GitBranch,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Lead Flows</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          Standardized lead capture and nurture flows for each channel. Every lead should enter the system with proper tagging and follow the defined path.
        </p>
      </div>

      <div className="space-y-4">
        {flows.map((flow) => (
          <div key={flow.name} className="bg-surface rounded-xl border border-border-custom p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0C2D5A] flex items-center justify-center">
                <flow.icon size={18} className="text-soft-neon" />
              </div>
              <h4 className="text-base font-semibold text-text-primary">{flow.name}</h4>
            </div>
            <div className="space-y-0">
              {flow.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-primary-blue/20 text-soft-neon text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    {i < flow.steps.length - 1 && <div className="w-px h-6 bg-border-custom my-0.5" />}
                  </div>
                  <p className="text-sm text-[#B8C8E0] pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Verticals ─── */
function VerticalsTab() {
  const verticals = [
    { name: 'Dental Practices', pain: 'Missed patient calls, no-shows, review drought', solution: 'AI receptionist + review automation', color: '#1A6FD4' },
    { name: 'HVAC Services', pain: 'After-hours emergencies, seasonal spikes', solution: '24/7 emergency routing + seasonal campaigns', color: '#FACC15' },
    { name: 'Medical Spas', pain: 'Consultation no-shows, inactive clients', solution: 'AI booking + reactivation sequences', color: '#5BB8FF' },
    { name: 'Auto Repair', pain: 'Customers forget maintenance, poor reviews', solution: 'Maintenance reminders + review generation', color: '#F87171' },
    { name: 'Law Firms', pain: 'Unqualified leads, manual intake', solution: 'Lead qualification chatbot + intake automation', color: '#A78BFA' },
    { name: 'Real Estate', pain: 'Slow lead response, no nurture system', solution: 'Instant response + property matching AI', color: '#4ADE80' },
    { name: 'Insurance', pain: 'Renewal lapses, missed cross-sells', solution: 'Renewal reminders + cross-sell triggers', color: '#FB923C' },
    { name: 'Home Services', pain: 'Missed emergency calls, scheduling chaos', solution: '24/7 answering + smart scheduling', color: '#22D3EE' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border-custom p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Target Verticals</h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          Eight proven verticals with clear pain points and AI solutions. Partners should pick 1-2 verticals to specialize in rather than trying to serve everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {verticals.map((v) => (
          <div key={v.name} className="bg-surface rounded-xl border border-border-custom p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: v.color }} />
              <h4 className="text-sm font-semibold text-text-primary">{v.name}</h4>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-[#F87171] uppercase tracking-wider">Pain Point</p>
                <p className="text-xs text-[#B8C8E0]">{v.pain}</p>
              </div>
              <div>
                <p className="text-[10px] text-success uppercase tracking-wider">AI Solution</p>
                <p className="text-xs text-[#B8C8E0]">{v.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30 p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
          <Target size={16} className="text-soft-neon" />
          Vertical Selection Strategy
        </h3>
        <p className="text-sm text-[#B8C8E0] leading-relaxed">
          New partners should start with 1-2 verticals max. Pick verticals where you have existing connections or domain knowledge. Dental and HVAC are recommended for first-time partners due to high demand and clear ROI. As you gain confidence, expand into adjacent verticals.
        </p>
      </div>
    </div>
  );
}

/* ─── Main Playbook Component ─── */
export default function Playbook() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabContent: Record<string, React.ReactNode> = {
    overview: <OverviewTab />,
    'partner-program': <PartnerProgramTab />,
    'service-plans': <ServicePlansTab />,
    'financial-model': <FinancialModelTab />,
    'voice-rules': <VoiceRulesTab />,
    'lead-flows': <LeadFlowsTab />,
    verticals: <VerticalsTab />,
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Company Playbook</h1>
        <p className="text-sm text-text-secondary mt-0.5">The complete guide to building and scaling LixenAI</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-surface rounded-xl border border-border-custom">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === tab.id ? 'text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div layoutId="playbookTab" className="absolute inset-0 bg-primary-blue rounded-lg" transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }} />
            )}
            <tab.icon size={16} className="relative z-10" />
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}