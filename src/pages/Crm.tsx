import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  Plus,
  Search,
  Filter,
  ArrowRight,
  User,
  Building2,
  Stethoscope,
} from "lucide-react";

// ─── Types ───
interface Lead {
  id: string;
  name: string;
  company: string;
  vertical: string;
  plan: string;
  value: number;
  lastContact: string;
  nextAction: string;
  source: string;
  notes: string;
}

interface PipelineStage {
  id: string;
  name: string;
  leads: Lead[];
  color: string;
}

// ─── Mock Data ───
const partnerPipeline: PipelineStage[] = [
  {
    id: "new",
    name: "New Lead",
    color: "#5BB8FF",
    leads: [
      { id: "p1", name: "Dr. Sarah Chen", company: "Bright Dental Group", vertical: "Dental", plan: "Growth", value: 597, lastContact: "2 hrs ago", nextAction: "Discovery call - Jul 3", source: "Website", notes: "Interested in AI scheduling for 3 locations" },
      { id: "p2", name: "Mark Johnson", company: "Premier Med Spa", vertical: "Med Spa", plan: "Starter", value: 249, lastContact: "5 hrs ago", nextAction: "Send pricing deck", source: "Referral", notes: "Referred by existing partner Dr. Williams" },
    ],
  },
  {
    id: "contact",
    name: "Contacted",
    color: "#1A6FD4",
    leads: [
      { id: "p3", name: "Dr. Emily Park", company: "Park Orthodontics", vertical: "Dental", plan: "Growth", value: 597, lastContact: "1 day ago", nextAction: "Follow up email - Jul 2", source: "LinkedIn", notes: "Had initial call, wants to see demo" },
    ],
  },
  {
    id: "qualified",
    name: "Qualified",
    color: "#2DD4A8",
    leads: [
      { id: "p4", name: "James Rodriguez", company: "Valley Medical Center", vertical: "Medical", plan: "Starter", value: 249, lastContact: "3 days ago", nextAction: "Contract review", source: "Cold Outreach", notes: "Budget approved, evaluating 2 vendors" },
    ],
  },
  {
    id: "proposal",
    name: "Proposal Sent",
    color: "#F59E0B",
    leads: [
      { id: "p5", name: "Dr. Lisa Wang", company: "Wang Family Practice", vertical: "Medical", plan: "Growth", value: 597, lastContact: "1 week ago", nextAction: "Contract negotiation", source: "Website", notes: "Proposal sent with custom onboarding timeline" },
    ],
  },
  {
    id: "negotiation",
    name: "Negotiation",
    color: "#F97316",
    leads: [],
  },
  {
    id: "closed",
    name: "Closed Won",
    color: "#22C55E",
    leads: [
      { id: "p6", name: "Dr. Michael Torres", company: "Sunrise Dental", vertical: "Dental", plan: "Starter", value: 249, lastContact: "2 weeks ago", nextAction: "Onboarding kickoff", source: "Referral", notes: "Signed! 12-month commitment" },
    ],
  },
];

const businessPipeline: PipelineStage[] = [
  { id: "prospect", name: "Prospect", color: "#5BB8FF", leads: [
    { id: "b1", name: "HealthTech Solutions", company: "HealthTech Solutions Inc.", vertical: "Technology", plan: "Enterprise", value: 5000, lastContact: "1 day ago", nextAction: "Intro call scheduled", source: "LinkedIn", notes: "Looking for white-label AI platform" },
  ]},
  { id: "discovery", name: "Discovery", color: "#1A6FD4", leads: [
    { id: "b2", name: "MedSupply Co", company: "MedSupply Corporation", vertical: "Supplies", plan: "Enterprise", value: 3500, lastContact: "3 days ago", nextAction: "Technical requirements doc", source: "Website", notes: "Needs API integration with existing ERP" },
  ]},
  { id: "evaluation", name: "Evaluation", color: "#2DD4A8", leads: []},
  { id: "commitment", name: "Commitment", color: "#F59E0B", leads: [
    { id: "b3", name: "CarePlus Network", company: "CarePlus Network", vertical: "Healthcare", plan: "Enterprise", value: 8000, lastContact: "1 week ago", nextAction: "Final contract review", source: "Referral", notes: "90% probability, legal reviewing terms" },
  ]},
  { id: "closed", name: "Closed", color: "#22C55E", leads: [
    { id: "b4", name: "Wellness Partners", company: "Wellness Partners LLC", vertical: "Wellness", plan: "Enterprise", value: 4200, lastContact: "2 weeks ago", nextAction: "Implementation kickoff", source: "Cold Outreach", notes: "Closed 24-month enterprise deal" },
  ]},
];

const supportStages = [
  { id: "new", name: "New Ticket", count: 3 },
  { id: "open", name: "Open", count: 5 },
  { id: "pending", name: "Pending", count: 2 },
  { id: "resolved", name: "Resolved", count: 12 },
  { id: "escalated", name: "Escalated", count: 1 },
  { id: "closed", name: "Closed", count: 28 },
];

const contactFields = [
  { label: "Full Name", type: "text", required: true },
  { label: "Practice/Company", type: "text", required: true },
  { label: "Email", type: "email", required: true },
  { label: "Phone", type: "tel", required: false },
  { label: "Vertical", type: "select", options: ["Dental", "Medical", "Med Spa", "Chiropractic", "Other"], required: true },
  { label: "Practice Size", type: "select", options: ["Solo", "2-5 providers", "6-15 providers", "15+ providers"], required: true },
  { label: "Current Software", type: "text", required: false },
  { label: "Biggest Pain Point", type: "textarea", required: true },
];

const leadSources = [
  { source: "Website", partner: 12, business: 5 },
  { source: "Referral", partner: 8, business: 3 },
  { source: "LinkedIn", partner: 6, business: 4 },
  { source: "Cold Outreach", partner: 3, business: 8 },
  { source: "Events", partner: 2, business: 2 },
  { source: "Other", partner: 2, business: 1 },
];

export default function Crm() {
  const [activePipeline, setActivePipeline] = useState<"partner" | "business">("partner");
  const [expandedLead, setExpandedLead] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);

  const pipeline = activePipeline === "partner" ? partnerPipeline : businessPipeline;
  const totalLeads = pipeline.reduce((sum, stage) => sum + stage.leads.length, 0);
  const totalValue = pipeline.reduce((sum, stage) => sum + stage.leads.reduce((s, l) => s + l.value, 0), 0);

  const filteredPipeline = pipeline.map((stage) => ({
    ...stage,
    leads: stage.leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-12 mb-1">CRM Pipeline</h1>
          <p className="text-slate-11">Track and manage partner and business leads</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-3 border border-slate-6 rounded-xl px-4 py-2 text-sm">
            <span className="text-slate-11">Total Pipeline: </span>
            <span className="text-slate-12 font-semibold">${totalValue.toLocaleString()}</span>
          </div>
          <button
            onClick={() => setShowNewLeadForm(!showNewLeadForm)}
            className="flex items-center gap-2 bg-blue-9 hover:bg-blue-10 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-10" />
        <input
          type="text"
          placeholder="Search leads by name or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-3 border border-slate-6 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-12 placeholder:text-slate-10 focus:outline-none focus:border-blue-9 transition-colors"
        />
      </div>

      {/* Pipeline Tabs */}
      <div className="flex gap-1 p-1 bg-slate-3 rounded-xl w-fit mb-6">
        {(["partner", "business"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActivePipeline(type)}
            className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors capitalize ${
              activePipeline === type ? "text-slate-12" : "text-slate-11 hover:text-slate-12"
            }`}
          >
            {activePipeline === type && (
              <motion.div
                layoutId="crmTabIndicator"
                className="absolute inset-0 bg-slate-5 rounded-lg"
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">{type} Leads</span>
          </button>
        ))}
      </div>

      {/* Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {filteredPipeline.map((stage) => (
            <div key={stage.id} className="w-80 flex-shrink-0">
              {/* Stage Header */}
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <h3 className="text-sm font-semibold text-slate-12">{stage.name}</h3>
                <span className="text-xs text-slate-10 bg-slate-4 px-2 py-0.5 rounded-full">
                  {stage.leads.length}
                </span>
              </div>

              {/* Leads */}
              <div className="space-y-3">
                <AnimatePresence>
                  {stage.leads.map((lead) => (
                    <motion.div
                      key={lead.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-slate-3 border border-slate-6 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedLead(expandedLead === lead.id ? null : lead.id)
                        }
                        className="w-full p-4 text-left"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-12">{lead.name}</h4>
                            <p className="text-xs text-slate-11 mt-0.5">{lead.company}</p>
                          </div>
                          <span className="text-xs font-semibold text-blue-11">
                            ${lead.value}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-10">
                          <span className="bg-slate-4 px-2 py-0.5 rounded-full">{lead.vertical}</span>
                          <span>{lead.lastContact}</span>
                        </div>
                        {expandedLead === lead.id ? (
                          <ChevronUp className="w-4 h-4 text-slate-10 mt-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-10 mt-2" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedLead === lead.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 border-t border-slate-6 pt-3 space-y-2">
                              <div className="flex items-center gap-2 text-xs text-slate-11">
                                <ArrowRight className="w-3 h-3 text-slate-10" />
                                <span className="font-medium">Next Action:</span> {lead.nextAction}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-slate-11">
                                <User className="w-3 h-3 text-slate-10" />
                                <span className="font-medium">Source:</span> {lead.source}
                              </div>
                              <div className="flex items-start gap-2 text-xs text-slate-11">
                                <MessageSquare className="w-3 h-3 text-slate-10 mt-0.5" />
                                <span className="font-medium">Notes:</span> {lead.notes}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {stage.leads.length === 0 && (
                  <div className="bg-slate-3/50 border border-dashed border-slate-6 rounded-xl p-6 text-center">
                    <p className="text-xs text-slate-10">No leads in this stage</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        {/* Contact Fields Reference */}
        <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-12 mb-4">Lead Capture Fields</h3>
          <div className="space-y-3">
            {contactFields.map((field) => (
              <div key={field.label} className="flex items-center justify-between py-2 border-b border-slate-6 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-12">{field.label}</span>
                  {field.required && (
                    <span className="text-[10px] bg-blue-9/20 text-blue-11 px-1.5 py-0.5 rounded-full">Required</span>
                  )}
                </div>
                <span className="text-xs text-slate-10 font-mono capitalize">{field.type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Sources */}
        <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-12 mb-4">Lead Sources</h3>
          <div className="space-y-3">
            {leadSources.map((ls) => (
              <div key={ls.source}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-12">{ls.source}</span>
                  <div className="flex gap-3 text-xs">
                    <span className="text-blue-11">{ls.partner} partner</span>
                    <span className="text-green-11">{ls.business} business</span>
                  </div>
                </div>
                <div className="flex gap-1 h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ls.partner / 20) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-blue-9 rounded-full"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ls.business / 20) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-green-9 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
