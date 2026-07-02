import { useState } from "react";
import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Heart,
  Eye,
  Bone,
  Baby,
  Sparkles,
  Brain,
  Activity,
  Leaf,
  Pill,
  ClipboardList,
  ChevronRight,
  X,
  TrendingUp,
  Users,
  Target,
} from "lucide-react";

// ─── Types ───
interface Vertical {
  id: string;
  name: string;
  icon: FC<{ className?: string }>;
  color: string;
  painPoints: string[];
  talkingPoints: string[];
  qualifyingQuestions: string[];
  recommendedPlan: string;
  estimatedDealSize: string;
  timeToClose: string;
  hook: string;
}

// ─── Verticals Data ───
const verticals: Vertical[] = [
  {
    id: "dental",
    name: "Dental Practices",
    icon: Stethoscope,
    color: "#1A6FD4",
    painPoints: ["No-shows costing $500+/month", "Manual appointment scheduling", "Follow-up calls taking 2+ hrs/day", "Patient recall falling through cracks"],
    talkingPoints: ["AI-powered scheduling reduces no-shows by 40%", "Automated recall sequences recover 25% of dormant patients", "Insurance verification automation saves 30 min/patient"],
    qualifyingQuestions: ["How many locations do you operate?", "What's your current no-show rate?", "How do you handle patient recalls today?", "What PMS are you using?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "2-3 weeks",
    hook: "What if you could recover 25% of your dormant patients automatically?",
  },
  {
    id: "medical",
    name: "Medical Practices",
    icon: Heart,
    color: "#2DD4A8",
    painPoints: ["Overwhelmed front desk staff", "Missed appointment reminders", "Manual intake and paperwork", "Slow patient flow and long wait times"],
    talkingPoints: ["Smart scheduling optimizes provider utilization by 30%", "Digital intake reduces check-in time by 60%", "Automated prep instructions improve compliance"],
    qualifyingQuestions: ["How many providers in your practice?", "What's your average wait time?", "How do patients currently check in?", "What are your biggest front-desk pain points?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "3-4 weeks",
    hook: "How much revenue are you losing to scheduling gaps?",
  },
  {
    id: "optometry",
    name: "Optometry",
    icon: Eye,
    color: "#5BB8FF",
    painPoints: ["Frame inventory management", "Annual exam recall challenges", "Insurance pre-authorization delays", "Contact lens reorder friction"],
    talkingPoints: ["Automated annual recall drives 30% more exams", "Contact lens subscription boosts recurring revenue", "Insurance verification before visit reduces denials"],
    qualifyingQuestions: ["Do you sell frames and contacts in-house?", "How do you handle annual recalls?", "What percentage of patients need insurance verification?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "1-2 weeks",
    hook: "What if your patients never missed their annual exam?",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: Bone,
    color: "#F59E0B",
    painPoints: ["Complex surgery scheduling", "Pre-op compliance tracking", "Post-op follow-up gaps", "Referral coordination"],
    talkingPoints: ["Surgery scheduling with built-in pre-op checklists", "Automated post-op care sequences improve outcomes", "Referral loop tracking shows ROI to referrers"],
    qualifyingQuestions: ["What types of procedures do you schedule most?", "How do you track pre-op compliance?", "What's your current referral process?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "3-4 weeks",
    hook: "How many hours does your team spend on surgery coordination?",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: Baby,
    color: "#EC4899",
    painPoints: ["Vaccination schedule tracking", "Parent communication overload", "Well-child visit adherence", "After-hours call volume"],
    talkingPoints: ["Automated vaccination reminders ensure compliance", "Parent portal reduces phone calls by 40%", "Well-child visit sequences maintain continuity of care"],
    qualifyingQuestions: ["What percentage of patients are under 18?", "How do you handle vaccination reminders?", "What's your after-hours call volume?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "2-3 weeks",
    hook: "What if parents could get answers without calling?",
  },
  {
    id: "medspa",
    name: "Med Spas",
    icon: Sparkles,
    color: "#A78BFA",
    painPoints: ["Membership retention", "Appointment gaps and downtime", "Retail product sales", "Client rebooking friction"],
    talkingPoints: ["Membership auto-renewal and retention campaigns", "Smart booking fills gaps with high-value services", "Retail recommendation engine boosts product sales 20%"],
    qualifyingQuestions: ["Do you offer membership programs?", "What services have the most downtime?", "How do you drive retail sales?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "1-2 weeks",
    hook: "How much revenue are empty appointment slots costing you?",
  },
  {
    id: "mentalhealth",
    name: "Mental Health",
    icon: Brain,
    color: "#14B8A6",
    painPoints: ["High no-show rates for therapy", "Crisis escalation protocols", "Group session management", "Insurance authorization delays"],
    talkingPoints: ["Gentle reminder sequences reduce no-shows by 35%", "Crisis protocol automation ensures compliance", "Group session booking with waitlist management"],
    qualifyingQuestions: ["What types of sessions do you offer?", "What's your no-show rate?", "How do you handle crisis situations after hours?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "2-3 weeks",
    hook: "What if every no-show was automatically backfilled?",
  },
  {
    id: "urgentcare",
    name: "Urgent Care",
    icon: Activity,
    color: "#EF4444",
    painPoints: ["Unpredictable walk-in volume", "Long wait times during peaks", "Discharge follow-up gaps", "Online check-in coordination"],
    talkingPoints: ["Real-time queue management with ETA updates", "Online check-in with symptom triage", "Automated discharge follow-up reduces readmissions"],
    qualifyingQuestions: ["What's your average daily patient volume?", "How do you communicate wait times?", "Do you offer online check-in?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "3-4 weeks",
    hook: "How long are patients willing to wait before they leave?",
  },
  {
    id: "chiropractic",
    name: "Chiropractic",
    icon: Leaf,
    color: "#22C55E",
    painPoints: ["Care plan adherence", "Reactivation of inactive patients", "New patient acquisition", "Treatment note documentation"],
    talkingPoints: ["Care plan tracking with adherence reminders", "Win-back campaigns reactivate 20% of lapsed patients", "New patient nurture sequences improve retention"],
    qualifyingQuestions: ["What does a typical care plan look like?", "How do you track patient adherence?", "What's your new patient conversion rate?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "1-2 weeks",
    hook: "How many patients start care plans but don't complete them?",
  },
  {
    id: "pharmacy",
    name: "Pharmacy",
    icon: Pill,
    color: "#F97316",
    painPoints: ["Prescription refill management", "Medication adherence tracking", "Clinical service scheduling", "Insurance coordination"],
    talkingPoints: ["Automated refill reminders improve adherence", "Clinical service booking for vaccines and consultations", "Insurance copay estimates before pickup"],
    qualifyingQuestions: ["What clinical services do you offer?", "How do you handle refill reminders?", "What's your biggest operational challenge?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "2-3 weeks",
    hook: "What if patients never missed a refill?",
  },
  {
    id: "pt",
    name: "Physical Therapy",
    icon: Activity,
    color: "#3B82F6",
    painPoints: ["Plan of care compliance", "Home exercise adherence", "Cancellation and no-shows", "Outcome tracking and reporting"],
    talkingPoints: ["Plan of care tracking with milestone alerts", "Home exercise video delivery with compliance tracking", "Outcome dashboards for referral source reporting"],
    qualifyingQuestions: ["How do you track plan of care compliance?", "What percentage of patients complete their full plan?", "How do you report outcomes to referrers?"],
    recommendedPlan: "Growth ($497/mo)",
    estimatedDealSize: "$5,964/year",
    timeToClose: "2-3 weeks",
    hook: "How many patients drop off before completing their plan of care?",
  },
  {
    id: "vet",
    name: "Veterinary",
    icon: ClipboardList,
    color: "#8B5CF6",
    painPoints: ["Appointment scheduling complexity", "Vaccination and wellness reminders", "Emergency triage communication", "Client education delivery"],
    talkingPoints: ["Species-specific wellness reminder sequences", "Emergency triage protocols with automated guidance", "Client education content delivery improves compliance"],
    qualifyingQuestions: ["What types of animals do you primarily see?", "How do you handle wellness reminders?", "What's your emergency communication process?"],
    recommendedPlan: "Starter ($249/mo)",
    estimatedDealSize: "$2,988/year",
    timeToClose: "1-2 weeks",
    hook: "What if pet owners never missed a vaccination?",
  },
];

export default function Markets() {
  const [selectedVertical, setSelectedVertical] = useState<Vertical | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVerticals = verticals.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.painPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-12 mb-2">Market Verticals</h1>
        <p className="text-slate-11">Vertical-specific sales guidance and qualification frameworks</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-10" />
        <input
          type="text"
          placeholder="Search verticals or pain points..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md bg-slate-3 border border-slate-6 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-12 placeholder:text-slate-10 focus:outline-none focus:border-blue-9 transition-colors"
        />
      </div>

      {/* Verticals Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVerticals.map((vertical, i) => {
          const Icon = vertical.icon;
          return (
            <motion.button
              key={vertical.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              onClick={() => setSelectedVertical(vertical)}
              className="bg-slate-3 border border-slate-6 rounded-xl p-5 text-left hover:border-slate-8 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${vertical.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: vertical.color }} />
                </div>
                <h3 className="text-sm font-semibold text-slate-12">{vertical.name}</h3>
              </div>
              <div className="space-y-1.5 mb-3">
                {vertical.painPoints.slice(0, 2).map((point) => (
                  <p key={point} className="text-xs text-slate-11 truncate">{point}</p>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-10">{vertical.recommendedPlan}</span>
                <ChevronRight className="w-4 h-4 text-slate-10 group-hover:text-slate-12 transition-colors" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedVertical && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSelectedVertical(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-slate-2 border-l border-slate-6 z-50 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 bg-slate-2/95 backdrop-blur-sm border-b border-slate-6 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedVertical.color}15` }}
                  >
                    <selectedVertical.icon className="w-5 h-5" style={{ color: selectedVertical.color }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-12">{selectedVertical.name}</h2>
                    <p className="text-xs text-slate-11">{selectedVertical.recommendedPlan}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVertical(null)}
                  className="p-2 rounded-lg hover:bg-slate-4 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-11" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Hook */}
                <div className="bg-blue-9/10 border border-blue-9/20 rounded-xl p-4">
                  <p className="text-sm font-medium text-blue-11">Opening Hook</p>
                  <p className="text-sm text-slate-12 mt-1 italic">"{selectedVertical.hook}"</p>
                </div>

                {/* Deal Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-3 border border-slate-6 rounded-lg p-3 text-center">
                    <TrendingUp className="w-4 h-4 text-slate-11 mx-auto mb-1" />
                    <p className="text-xs text-slate-11">Deal Size</p>
                    <p className="text-sm font-semibold text-slate-12">{selectedVertical.estimatedDealSize}</p>
                  </div>
                  <div className="bg-slate-3 border border-slate-6 rounded-lg p-3 text-center">
                    <Target className="w-4 h-4 text-slate-11 mx-auto mb-1" />
                    <p className="text-xs text-slate-11">Close Time</p>
                    <p className="text-sm font-semibold text-slate-12">{selectedVertical.timeToClose}</p>
                  </div>
                  <div className="bg-slate-3 border border-slate-6 rounded-lg p-3 text-center">
                    <Users className="w-4 h-4 text-slate-11 mx-auto mb-1" />
                    <p className="text-xs text-slate-11">Plan</p>
                    <p className="text-sm font-semibold text-slate-12">{selectedVertical.recommendedPlan.split(" (")[0]}</p>
                  </div>
                </div>

                {/* Pain Points */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-12 mb-3">Pain Points</h3>
                  <div className="space-y-2">
                    {selectedVertical.painPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 bg-slate-3 rounded-lg p-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-9 mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-slate-11">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Talking Points */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-12 mb-3">Sales Talking Points</h3>
                  <div className="space-y-2">
                    {selectedVertical.talkingPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 bg-slate-3 border border-green-9/20 rounded-lg p-3">
                        <TrendingUp className="w-4 h-4 text-green-10 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-11">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Qualifying Questions */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-12 mb-3">Qualifying Questions</h3>
                  <div className="space-y-2">
                    {selectedVertical.qualifyingQuestions.map((q, i) => (
                      <div key={q} className="flex items-start gap-3 bg-slate-3 rounded-lg p-3">
                        <span className="text-xs font-bold text-blue-11 bg-blue-9/10 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-11">{q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
