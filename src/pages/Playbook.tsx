import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  CreditCard,
  DollarSign,
  MessageSquare,
  GitBranch,
  Globe,
  ChevronRight,
  Target,
  Zap,
  Shield,
  Award,
  BarChart3,
} from "lucide-react";

// ─── Partner Program Tiers ───
const partnerTiers = [
  {
    name: "Starter",
    price: "$5,000",
    monthly: "$249/mo",
    features: [
      "AI scheduling and reminders",
      "Basic patient communication",
      "Email support",
      "Standard onboarding (2 weeks)",
      "1 location",
      "Up to 3 providers",
    ],
    color: "#5BB8FF",
  },
  {
    name: "Growth",
    price: "$6,000",
    monthly: "$497/mo",
    features: [
      "Everything in Starter",
      "Advanced automation workflows",
      "Multi-location support",
      "Priority support (24hr response)",
      "Custom integrations",
      "Up to 10 providers",
      "Dedicated account manager",
    ],
    color: "#1A6FD4",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    monthly: "Custom",
    features: [
      "Everything in Growth",
      "Unlimited locations & providers",
      "White-label options",
      "API access",
      "SLA guarantees",
      "Custom AI training",
      "Executive business reviews",
    ],
    color: "#2DD4A8",
  },
];

// ─── Service Plans ───
const servicePlans = [
  { service: "AI Scheduling", starter: true, growth: true, enterprise: true },
  { service: "Patient Reminders", starter: true, growth: true, enterprise: true },
  { service: "Recall Automation", starter: false, growth: true, enterprise: true },
  { service: "Insurance Verification", starter: false, growth: true, enterprise: true },
  { service: "Custom Workflows", starter: false, growth: true, enterprise: true },
  { service: "Multi-Location", starter: false, growth: true, enterprise: true },
  { service: "API Access", starter: false, growth: false, enterprise: true },
  { service: "White Label", starter: false, growth: false, enterprise: true },
  { service: "Custom AI Training", starter: false, growth: false, enterprise: true },
];

// ─── Financial Model ───
const financialData = [
  { metric: "Partner Acquisition Cost", value: "$850", note: "Marketing + sales time" },
  { metric: "Average Contract Value", value: "$5,200", note: "Annual, blended across tiers" },
  { metric: "Gross Margin", value: "72%", note: "After infrastructure costs" },
  { metric: "Monthly Churn Rate", value: "3.2%", note: "Target: <5%" },
  { metric: "LTV:CAC Ratio", value: "6.1x", note: "Target: >3x" },
  { metric: "Months to Payback", value: "4.2", note: "Target: <6 months" },
  { metric: "Net Revenue Retention", value: "108%", note: "Including expansions" },
  { metric: "Break-even Target", value: "Month 8", note: "From launch" },
];

// ─── Voice Rules ───
const voiceRules = [
  { category: "Clarity", rule: "Use simple language. Avoid jargon unless speaking to technical buyers.", icon: MessageSquare },
  { category: "Confidence", rule: "Lead with outcomes. Use data to support claims.", icon: Target },
  { category: "Empathy", rule: "Acknowledge pain points before presenting solutions.", icon: Users },
  { category: "Urgency", rule: "Create gentle FOMO without pressure tactics.", icon: Zap },
  { category: "Trust", rule: "Be transparent about limitations and implementation timelines.", icon: Shield },
  { category: "Value", rule: "Always tie features to measurable business outcomes.", icon: Award },
];

// ─── Lead Flows ───
const leadFlows = [
  {
    name: "Inbound Website Lead",
    steps: [
      "Form submitted on website",
      "Auto-enrichment (firmographic data)",
      "Qualification scoring (< 2 hrs)",
      "Sales rep assignment",
      "Personalized outreach (within 4 hrs)",
      "Discovery call booked",
    ],
  },
  {
    name: "Referral Lead",
    steps: [
      "Referral source logged",
      "Priority routing (referral = high intent)",
      "Thank you to referrer (auto)",
      "Outreach within 2 hours",
      "Discovery call + referral discount offered",
    ],
  },
  {
    name: "Outbound Cold Lead",
    steps: [
      "Prospect identified via ICP matching",
      "Multi-touch sequence (email + LinkedIn)",
      "Engagement tracking",
      "Demo offered after 2+ touches",
      "Nurture sequence for non-responders",
    ],
  },
  {
    name: "Event Lead",
    steps: [
      "Badge scan / business card capture",
      "Same-day follow-up email",
      "CRM entry with event tag",
      "Personalized video within 24 hrs",
      "Discovery call booked within 1 week",
    ],
  },
];

// ─── Verticals Summary ───
const verticalsSummary = [
  { name: "Dental", tam: "$2.4B", priority: "High", color: "#1A6FD4" },
  { name: "Medical", tam: "$4.1B", priority: "High", color: "#2DD4A8" },
  { name: "Med Spa", tam: "$890M", priority: "Medium", color: "#A78BFA" },
  { name: "Chiropractic", tam: "$1.2B", priority: "Medium", color: "#22C55E" },
  { name: "Optometry", tam: "$760M", priority: "Medium", color: "#5BB8FF" },
  { name: "Mental Health", tam: "$1.8B", priority: "High", color: "#14B8A6" },
];

export default function Playbook() {
  const [activeTab, setActiveTab] = useState<string>("overview");

  const tabs = [
    { key: "overview", label: "Overview", icon: BookOpen },
    { key: "partners", label: "Partner Program", icon: Users },
    { key: "services", label: "Service Plans", icon: CreditCard },
    { key: "financial", label: "Financial Model", icon: DollarSign },
    { key: "voice", label: "Voice & Rules", icon: MessageSquare },
    { key: "leads", label: "Lead Flows", icon: GitBranch },
    { key: "verticals", label: "Verticals", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-12 mb-2">Company Playbook</h1>
        <p className="text-slate-11">Reference guide for LixenAI operations, sales, and strategy</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-3 rounded-xl w-fit mb-8 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.key ? "text-slate-12" : "text-slate-11 hover:text-slate-12"
              }`}
            >
              {activeTab === tab.key && (
                <motion.div
                  layoutId="playbookTabIndicator"
                  className="absolute inset-0 bg-slate-5 rounded-lg"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Company Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-12 mb-4">Company Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-6">
                    <span className="text-sm text-slate-11">Company</span>
                    <span className="text-sm text-slate-12 font-medium">LixenAI</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-6">
                    <span className="text-sm text-slate-11">Founded</span>
                    <span className="text-sm text-slate-12 font-medium">2024</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-6">
                    <span className="text-sm text-slate-11">Founder</span>
                    <span className="text-sm text-slate-12 font-medium">Irene</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-6">
                    <span className="text-sm text-slate-11">Industry</span>
                    <span className="text-sm text-slate-12 font-medium">Healthcare AI / SaaS</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-6">
                    <span className="text-sm text-slate-11">Headquarters</span>
                    <span className="text-sm text-slate-12 font-medium">United States</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-slate-11">Mission</span>
                    <span className="text-sm text-slate-12 font-medium text-right max-w-[200px]">
                      Automate healthcare operations with AI to let providers focus on patients
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-12 mb-4">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-4 rounded-lg p-4">
                    <p className="text-xs text-slate-11 mb-1">Active Partners</p>
                    <p className="text-2xl font-bold text-slate-12">24</p>
                  </div>
                  <div className="bg-slate-4 rounded-lg p-4">
                    <p className="text-xs text-slate-11 mb-1">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-slate-12">$12.4K</p>
                  </div>
                  <div className="bg-slate-4 rounded-lg p-4">
                    <p className="text-xs text-slate-11 mb-1">Verticals Served</p>
                    <p className="text-2xl font-bold text-slate-12">12</p>
                  </div>
                  <div className="bg-slate-4 rounded-lg p-4">
                    <p className="text-xs text-slate-11 mb-1">Avg. LTV:CAC</p>
                    <p className="text-2xl font-bold text-slate-12">6.1x</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="bg-gradient-to-r from-blue-9/10 to-cyan-9/10 border border-blue-9/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-12 mb-3">Value Proposition</h3>
              <p className="text-sm text-slate-11 leading-relaxed">
                LixenAI helps healthcare practices automate their operations — from scheduling and patient communication 
                to insurance verification and recall management — using purpose-built AI that understands the unique 
                workflows of medical, dental, and wellness practices. Our platform integrates with existing practice 
                management systems and delivers measurable ROI within the first 30 days.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === "partners" && (
          <motion.div
            key="partners"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {partnerTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-slate-3 border rounded-xl p-6 ${
                    tier.popular ? "border-blue-9/40" : "border-slate-6"
                  }`}
                >
                  {tier.popular && (
                    <span className="inline-block bg-blue-9/10 text-blue-11 text-xs font-medium px-2 py-1 rounded-full mb-3">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tier.color }} />
                    <h3 className="text-lg font-bold text-slate-12">{tier.name}</h3>
                  </div>
                  <div className="mb-1">
                    <span className="text-2xl font-bold text-slate-12">{tier.price}</span>
                    <span className="text-sm text-slate-11 ml-2">setup</span>
                  </div>
                  <p className="text-sm text-blue-11 font-medium mb-4">{tier.monthly}</p>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-11">
                        <ChevronRight className="w-4 h-4 text-slate-10 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-slate-3 border border-slate-6 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-6">
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Service</th>
                    <th className="text-center text-slate-11 font-medium px-6 py-4">Starter</th>
                    <th className="text-center text-slate-11 font-medium px-6 py-4">Growth</th>
                    <th className="text-center text-slate-11 font-medium px-6 py-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {servicePlans.map((plan) => (
                    <tr key={plan.service} className="border-b border-slate-6 last:border-0">
                      <td className="px-6 py-3 text-slate-12">{plan.service}</td>
                      <td className="px-6 py-3 text-center">
                        {plan.starter ? (
                          <div className="w-5 h-5 rounded-full bg-green-9/20 text-green-10 flex items-center justify-center mx-auto text-xs">
                            ✓
                          </div>
                        ) : (
                          <span className="text-slate-8">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {plan.growth ? (
                          <div className="w-5 h-5 rounded-full bg-green-9/20 text-green-10 flex items-center justify-center mx-auto text-xs">
                            ✓
                          </div>
                        ) : (
                          <span className="text-slate-8">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center">
                        {plan.enterprise ? (
                          <div className="w-5 h-5 rounded-full bg-green-9/20 text-green-10 flex items-center justify-center mx-auto text-xs">
                            ✓
                          </div>
                        ) : (
                          <span className="text-slate-8">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "financial" && (
          <motion.div
            key="financial"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {financialData.map((item) => (
                <div key={item.metric} className="bg-slate-3 border border-slate-6 rounded-xl p-5">
                  <p className="text-xs text-slate-11 mb-1">{item.metric}</p>
                  <p className="text-2xl font-bold text-slate-12">{item.value}</p>
                  <p className="text-xs text-slate-10 mt-1">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "voice" && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {voiceRules.map((rule) => {
                const Icon = rule.icon;
                return (
                  <div key={rule.category} className="bg-slate-3 border border-slate-6 rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-blue-11" />
                      <h3 className="text-sm font-semibold text-slate-12">{rule.category}</h3>
                    </div>
                    <p className="text-sm text-slate-11">{rule.rule}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === "leads" && (
          <motion.div
            key="leads"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {leadFlows.map((flow) => (
                <div key={flow.name} className="bg-slate-3 border border-slate-6 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-12 mb-4">{flow.name}</h3>
                  <div className="space-y-0">
                    {flow.steps.map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 rounded-full bg-blue-9/10 text-blue-11 flex items-center justify-center text-xs font-medium">
                            {i + 1}
                          </div>
                          {i < flow.steps.length - 1 && (
                            <div className="w-0.5 h-6 bg-slate-6" />
                          )}
                        </div>
                        <p className="text-sm text-slate-11 pt-0.5">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "verticals" && (
          <motion.div
            key="verticals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {verticalsSummary.map((v) => (
                <div key={v.name} className="bg-slate-3 border border-slate-6 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: v.color }} />
                    <h3 className="text-sm font-semibold text-slate-12">{v.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-11">Total Addressable Market</p>
                      <p className="text-lg font-bold text-slate-12">{v.tam}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        v.priority === "High"
                          ? "bg-green-9/10 text-green-10"
                          : "bg-yellow-9/10 text-yellow-10"
                      }`}
                    >
                      {v.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
