import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Building2,
  Stethoscope,
  Wrench,
  Car,
  Scale,
  Home,
  Shield,
  TrendingUp,
  ChevronRight,
  Target,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

/* ─── Vertical data ─── */
interface Vertical {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  painPoints: string[];
  aiUseCases: string[];
  avgDealValue: number;
  competition: 'Low' | 'Medium' | 'High';
  timeToClose: string;
  recommendedPlan: string;
  prospectingQuery: string;
  roiPitch: string;
}

const verticals: Vertical[] = [
  {
    id: 'dental',
    name: 'Dental Practices',
    icon: Stethoscope,
    color: '#1A6FD4',
    description: 'High patient volume, scheduling-heavy, review-sensitive. Perfect for AI receptionist + review automation.',
    painPoints: ['Missed new patient calls', 'No-show rate 15-25%', 'Review generation difficult', 'Front desk overwhelmed'],
    aiUseCases: ['24/7 AI phone answering', 'Automated appointment reminders', 'Review request after every visit', 'New patient intake automation'],
    avgDealValue: 497,
    competition: 'Medium',
    timeToClose: '2-4 weeks',
    recommendedPlan: 'Growth Plan',
    prospectingQuery: 'dental practices [city] hiring receptionist OR front desk',
    roiPitch: 'Save 10+ hours/week on scheduling. Reduce no-shows by 40%. Generate 20+ new reviews/month.',
  },
  {
    id: 'hvac',
    name: 'HVAC Services',
    icon: Wrench,
    color: '#FACC15',
    description: 'Emergency-service driven, seasonal spikes, dispatch coordination. AI handles after-hours emergency calls.',
    painPoints: ['After-hours emergency calls missed', 'Seasonal lead overflow', 'Dispatch coordination delays', 'Customer follow-up gaps'],
    aiUseCases: ['Emergency call routing 24/7', 'Seasonal campaign automation', 'Service reminder sequences', 'Quote follow-up automation'],
    avgDealValue: 497,
    competition: 'Low',
    timeToClose: '1-2 weeks',
    recommendedPlan: 'Growth Plan',
    prospectingQuery: 'HVAC companies [city] emergency service OR 24/7',
    roiPitch: 'Never miss an emergency call again. Capture after-hours revenue. Automate seasonal tune-up reminders.',
  },
  {
    id: 'medspa',
    name: 'Medical Spas',
    icon: Stethoscope,
    color: '#5BB8FF',
    description: 'Aesthetic-focused, consultation-heavy, high client LTV. AI booking + nurture drives repeat visits.',
    painPoints: ['Consultation no-shows', 'Difficult to rebook inactive clients', 'High competition for new patients', 'Manual follow-up for treatments'],
    aiUseCases: ['Consultation booking AI', 'Treatment series reminders', 'Inactive client reactivation', 'Before/after review collection'],
    avgDealValue: 497,
    competition: 'High',
    timeToClose: '3-6 weeks',
    recommendedPlan: 'Growth Plan',
    prospectingQuery: 'med spa [city] botox OR fillers OR aesthetic',
    roiPitch: 'Fill every consultation slot. Reactivate dormant clients automatically. Build a 5-star reputation.',
  },
  {
    id: 'autorepair',
    name: 'Auto Repair',
    icon: Car,
    color: '#F87171',
    description: 'Trust-based, repeat-service industry. AI keeps customers coming back with maintenance reminders.',
    painPoints: ['Customers forget maintenance', 'Price shoppers call around', 'No-shows for appointments', 'Poor online reputation'],
    aiUseCases: ['Maintenance reminder automation', 'Service due predictions', 'Review generation', 'Price shopper nurture'],
    avgDealValue: 397,
    competition: 'Medium',
    timeToClose: '2-3 weeks',
    recommendedPlan: 'Starter Plan',
    prospectingQuery: 'auto repair shop [city] OR mechanic [city] reviews',
    roiPitch: 'Keep customers coming back with automated maintenance reminders. Generate reviews from every satisfied customer.',
  },
  {
    id: 'legal',
    name: 'Law Firms',
    icon: Scale,
    color: '#A78BFA',
    description: 'Consultation-driven, high value per client. AI qualifies leads and books consults automatically.',
    painPoints: ['Wasting time on unqualified leads', 'Intake process manual', 'No follow-up on website inquiries', 'Difficult to track lead sources'],
    aiUseCases: ['Lead qualification chatbot', 'Intake form automation', 'Consultation booking', 'Case type routing'],
    avgDealValue: 497,
    competition: 'High',
    timeToClose: '4-8 weeks',
    recommendedPlan: 'Growth Plan',
    prospectingQuery: 'law firm [city] personal injury OR family law OR estate planning',
    roiPitch: 'Qualify every lead before you talk to them. Book consultations while you are in court. Track every lead source.',
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: Home,
    color: '#4ADE80',
    description: 'Lead volume is everything. AI captures, nurtures, and qualifies every inquiry instantly.',
    painPoints: ['Lead response time too slow', 'Too many leads to follow up', 'No systematic nurture', 'Open house lead capture manual'],
    aiUseCases: ['Instant lead response (< 2 min)', 'Property matching chatbot', 'Open house sign-in automation', 'Buyer/seller nurture campaigns'],
    avgDealValue: 497,
    competition: 'High',
    timeToClose: '2-4 weeks',
    recommendedPlan: 'Growth Plan',
    prospectingQuery: 'real estate agent [city] OR realtor [city] team',
    roiPitch: 'Respond to every lead in under 2 minutes. Nurture every inquiry until they are ready. Never lose a listing lead again.',
  },
  {
    id: 'insurance',
    name: 'Insurance Agencies',
    icon: Shield,
    color: '#FB923C',
    description: 'Policy renewal-driven, referral-heavy. AI ensures no policy lapses and drives referrals.',
    painPoints: ['Policy renewal lapses', 'Referral follow-up inconsistent', 'Quote requests slip through cracks', 'Cross-sell opportunities missed'],
    aiUseCases: ['Renewal reminder automation', 'Referral request sequences', 'Quote follow-up bot', 'Cross-sell campaign triggers'],
    avgDealValue: 397,
    competition: 'Medium',
    timeToClose: '2-3 weeks',
    recommendedPlan: 'Starter Plan',
    prospectingQuery: 'insurance agency [city] independent OR allstate OR state farm',
    roiPitch: 'Never let a policy lapse. Automate referral asks at the perfect moment. Follow up on every quote request.',
  },
  {
    id: 'homeServices',
    name: 'Home Services',
    icon: Building2,
    color: '#22D3EE',
    description: 'Plumbing, electrical, landscaping, cleaning. High call volume, urgent response needed.',
    painPoints: ['Missed emergency calls', 'Scheduling chaos', 'Customer communication gaps', 'Seasonal demand swings'],
    aiUseCases: ['24/7 call answering', 'Smart scheduling', 'Service reminder sequences', 'Seasonal campaign automation'],
    avgDealValue: 397,
    competition: 'Low',
    timeToClose: '1-2 weeks',
    recommendedPlan: 'Starter Plan',
    prospectingQuery: 'plumber [city] OR electrician [city] OR landscaping [city]',
    roiPitch: 'Answer every emergency call. Schedule jobs automatically. Keep customers informed from booking to completion.',
  },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Markets() {
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(null);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Market Verticals</h1>
        <p className="text-sm text-text-secondary mt-0.5">Target industries, pain points, and AI use cases</p>
      </motion.div>

      {/* Vertical Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {verticals.map((v) => {
          const Icon = v.icon;
          return (
            <motion.button
              key={v.id}
              variants={item}
              onClick={() => setSelectedVertical(v)}
              className="bg-surface rounded-xl border border-border-custom p-5 text-left hover:border-border-light transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${v.color}15` }}>
                  <Icon size={20} style={{ color: v.color }} />
                </div>
                <ChevronRight size={16} className="text-text-tertiary group-hover:text-text-primary transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary">{v.name}</h3>
              <p className="text-xs text-text-secondary mt-1 line-clamp-2">{v.description}</p>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border-custom">
                <span className="text-xs font-mono text-soft-neon">${v.avgDealValue}/mo</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${v.competition === 'Low' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : v.competition === 'Medium' ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#F87171]/10 text-[#F87171]'}`}>
                  {v.competition} competition
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedVertical && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex justify-end"
            onClick={() => setSelectedVertical(null)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-surface border-l border-border-custom h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-border-custom">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setSelectedVertical(null)} className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
                    <ChevronRight size={16} className="rotate-180" /> Back
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedVertical.color}15` }}>
                    <selectedVertical.icon size={24} style={{ color: selectedVertical.color }} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-text-primary">{selectedVertical.name}</h2>
                    <p className="text-sm text-text-secondary">{selectedVertical.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom text-center">
                    <DollarSign size={16} className="text-soft-neon mx-auto mb-1" />
                    <p className="text-lg font-bold font-mono text-text-primary">${selectedVertical.avgDealValue}</p>
                    <p className="text-[10px] text-text-secondary">per month</p>
                  </div>
                  <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom text-center">
                    <Target size={16} className="text-primary-blue mx-auto mb-1" />
                    <p className="text-lg font-bold text-text-primary">{selectedVertical.competition}</p>
                    <p className="text-[10px] text-text-secondary">competition</p>
                  </div>
                  <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom text-center">
                    <TrendingUp size={16} className="text-success mx-auto mb-1" />
                    <p className="text-lg font-bold text-text-primary">{selectedVertical.timeToClose}</p>
                    <p className="text-[10px] text-text-secondary">avg close time</p>
                  </div>
                </div>

                {/* Pain Points */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <AlertCircle size={16} className="text-[#F87171]" />
                    Key Pain Points
                  </h3>
                  <div className="space-y-2">
                    {selectedVertical.painPoints.map((p, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-surface-elevated rounded-lg border border-border-custom">
                        <span className="w-5 h-5 rounded-full bg-[#F87171]/10 text-[#F87171] text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-[#B8C8E0]">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Use Cases */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-success" />
                    AI Use Cases
                  </h3>
                  <div className="space-y-2">
                    {selectedVertical.aiUseCases.map((u, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 bg-surface-elevated rounded-lg border border-border-custom">
                        <span className="w-5 h-5 rounded-full bg-[#4ADE80]/10 text-[#4ADE80] text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <span className="text-sm text-[#B8C8E0]">{u}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROI Pitch */}
                <div className="p-4 bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30">
                  <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <TrendingUp size={16} className="text-soft-neon" />
                    ROI Pitch
                  </h3>
                  <p className="text-sm text-[#B8C8E0] leading-relaxed">{selectedVertical.roiPitch}</p>
                </div>

                {/* Prospecting Query */}
                <div>
                  <h3 className="text-sm font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <Users size={16} className="text-soft-neon" />
                    Prospecting Query
                  </h3>
                  <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom">
                    <p className="text-sm font-mono text-soft-neon">{selectedVertical.prospectingQuery}</p>
                  </div>
                </div>

                {/* Recommended Plan */}
                <div className="p-4 bg-surface-elevated rounded-xl border border-border-custom">
                  <h3 className="text-sm font-semibold text-text-primary mb-1">Recommended Plan</h3>
                  <p className="text-sm text-soft-neon font-medium">{selectedVertical.recommendedPlan}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}