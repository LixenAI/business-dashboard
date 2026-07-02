import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Info,
  Calculator,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ─── Service Plan Tiers ───
const servicePlans = [
  {
    name: "Starter",
    price: "$249",
    period: "/month",
    setup: "$5,000 setup",
    description: "Perfect for solo practices getting started with AI automation",
    features: [
      "AI-powered scheduling",
      "Automated patient reminders",
      "Basic reporting dashboard",
      "Email support",
      "1 practice location",
      "Up to 3 providers",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$497",
    period: "/month",
    setup: "$6,000 setup",
    description: "For growing practices ready to scale with advanced automation",
    features: [
      "Everything in Starter",
      "Advanced workflow automation",
      "Insurance verification",
      "Recall & reactivation campaigns",
      "Multi-location support",
      "Up to 10 providers",
      "Priority support (24hr)",
      "Custom integrations",
    ],
    cta: "Most Popular",
    highlighted: true,
  },
];

// ─── Add-ons ───
const addons = [
  { name: "Additional Location", price: "$149/mo", description: "Per extra location beyond plan limit" },
  { name: "Additional Provider", price: "$49/mo", description: "Per extra provider beyond plan limit" },
  { name: "White-Label Portal", price: "$299/mo", description: "Custom branded patient portal" },
  { name: "Advanced Analytics", price: "$199/mo", description: "Predictive insights & custom reports" },
  { name: "API Access", price: "$149/mo", description: "Full REST API with webhook support" },
];

// ─── Partner Tiers ───
const partnerTiers = [
  {
    tier: "Starter Partner",
    monthly: "$249/mo",
    setup: "$5,000",
    commission: "15%",
    requirements: "1-5 active practices",
    benefits: ["Standard commission", "Marketing collateral", "Email support"],
  },
  {
    tier: "Growth Partner",
    monthly: "$497/mo",
    setup: "$6,000",
    commission: "20%",
    requirements: "6-15 active practices",
    benefits: ["Higher commission", "Co-marketing opportunities", "Priority support", "Quarterly business reviews"],
  },
  {
    tier: "Enterprise Partner",
    monthly: "Custom",
    setup: "Custom",
    commission: "25%",
    requirements: "16+ active practices",
    benefits: ["Highest commission", "Exclusive territory rights", "Dedicated partner manager", "Annual partner summit"],
  },
];

// ─── Payment Schedule ───
const paymentSchedule = [
  { event: "Contract Signed", timing: "Day 0", amount: "Setup Fee", description: "50% of setup fee due on signing" },
  { event: "Build Complete", timing: "Day 14-21", amount: "Setup Fee", description: "Remaining 50% of setup fee" },
  { event: "Go-Live", timing: "Day 21-30", amount: "Monthly", description: "First monthly fee prorated" },
  { event: "Ongoing", timing: "Monthly", amount: "Monthly", description: "Recurring monthly fee" },
];

export default function Pricing() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [partnerTier, setPartnerTier] = useState<"starter" | "growth">("starter");
  const [clientCount, setClientCount] = useState(1);
  const [retailPrice, setRetailPrice] = useState(497);
  const [includeSetup, setIncludeSetup] = useState(true);

  const partnerCost = partnerTier === "starter" ? 249 : 497;
  const setupFee = partnerTier === "starter" ? 5000 : 6000;
  const totalMonthlyCost = partnerCost * clientCount;
  const totalSetupFee = includeSetup ? setupFee * clientCount : 0;
  const totalRetailMonthly = retailPrice * clientCount;
  const monthlyProfit = totalRetailMonthly - totalMonthlyCost;
  const profitMargin = ((monthlyProfit / totalRetailMonthly) * 100).toFixed(1);
  const annualProfit = monthlyProfit * 12;
  const roi = ((annualProfit / totalSetupFee) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-12 mb-2">Pricing Hub</h1>
        <p className="text-slate-11">Service plans, partner tiers, and retail pricing calculator</p>
      </div>

      {/* Service Plans */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {servicePlans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-6 ${
              plan.highlighted
                ? "bg-blue-9/10 border-2 border-blue-9/30"
                : "bg-slate-3 border border-slate-6"
            }`}
          >
            {plan.highlighted && (
              <span className="inline-block bg-blue-9 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold text-slate-12 mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold text-slate-12">{plan.price}</span>
              <span className="text-sm text-slate-11">{plan.period}</span>
            </div>
            <p className="text-sm text-blue-11 font-medium mb-1">{plan.setup}</p>
            <p className="text-sm text-slate-11 mb-4">{plan.description}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-11">
                  <Check className="w-4 h-4 text-green-10 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors ${
                plan.highlighted
                  ? "bg-blue-9 hover:bg-blue-10 text-white"
                  : "bg-slate-4 hover:bg-slate-5 text-slate-12"
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div className="bg-slate-3 border border-slate-6 rounded-xl p-6 mb-10">
        <h2 className="text-lg font-semibold text-slate-12 mb-4">Add-ons</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addons.map((addon) => (
            <div key={addon.name} className="bg-slate-4 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-slate-12">{addon.name}</h3>
                <span className="text-sm font-semibold text-blue-11">{addon.price}</span>
              </div>
              <p className="text-xs text-slate-11">{addon.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Retail Pricing Calculator */}
      <div className="bg-slate-3 border border-slate-6 rounded-xl p-6 mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-5 h-5 text-blue-11" />
          <h2 className="text-lg font-semibold text-slate-12">Retail Pricing Calculator</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            {/* Partner Tier */}
            <div>
              <label className="text-sm text-slate-11 mb-2 block">Partner Tier</label>
              <div className="flex gap-2">
                {(["starter", "growth"] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setPartnerTier(tier)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                      partnerTier === tier
                        ? "bg-blue-9 text-white"
                        : "bg-slate-4 text-slate-11 hover:text-slate-12"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Client Count */}
            <div>
              <label className="text-sm text-slate-11 mb-2 block">
                Number of Clients: <span className="text-slate-12 font-semibold">{clientCount}</span>
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full accent-blue-9"
              />
              <div className="flex justify-between text-xs text-slate-10 mt-1">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            {/* Retail Price */}
            <div>
              <label className="text-sm text-slate-11 mb-2 block">
                Your Retail Price: <span className="text-slate-12 font-semibold">${retailPrice}/mo</span>
              </label>
              <input
                type="range"
                min={300}
                max={1500}
                step={50}
                value={retailPrice}
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                className="w-full accent-blue-9"
              />
              <div className="flex justify-between text-xs text-slate-10 mt-1">
                <span>$300</span>
                <span>$1,500</span>
              </div>
            </div>

            {/* Include Setup */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSetup}
                onChange={(e) => setIncludeSetup(e.target.checked)}
                className="w-4 h-4 accent-blue-9"
              />
              <span className="text-sm text-slate-11">Include setup fee in calculations</span>
            </label>
          </div>

          {/* Results */}
          <div className="bg-slate-4 rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-slate-12 mb-3">Profit Analysis</h3>

            <div className="flex justify-between py-2 border-b border-slate-6">
              <span className="text-sm text-slate-11">Your cost per client</span>
              <span className="text-sm text-slate-12 font-medium">${partnerCost}/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-6">
              <span className="text-sm text-slate-11">Your retail price</span>
              <span className="text-sm text-slate-12 font-medium">${retailPrice}/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-6">
              <span className="text-sm text-slate-11">Monthly profit per client</span>
              <span className="text-sm text-green-10 font-semibold">${retailPrice - partnerCost}/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-6">
              <span className="text-sm text-slate-11">Total monthly profit ({clientCount} clients)</span>
              <span className="text-sm text-green-10 font-semibold">${monthlyProfit.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-6">
              <span className="text-sm text-slate-11">Profit margin</span>
              <span className="text-sm text-blue-11 font-semibold">{profitMargin}%</span>
            </div>
            {includeSetup && (
              <div className="flex justify-between py-2 border-b border-slate-6">
                <span className="text-sm text-slate-11">Total setup fee</span>
                <span className="text-sm text-yellow-10 font-medium">${totalSetupFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-sm text-slate-11">Annual profit</span>
              <span className="text-lg text-green-10 font-bold">${annualProfit.toLocaleString()}</span>
            </div>
            {includeSetup && totalSetupFee > 0 && (
              <div className="bg-green-9/10 border border-green-9/20 rounded-lg p-3 mt-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-10" />
                  <span className="text-sm text-green-10 font-medium">
                    {roi}% annual ROI on setup investment
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Partner Tier Comparison */}
      <div className="bg-slate-3 border border-slate-6 rounded-xl overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-slate-6">
          <h2 className="text-lg font-semibold text-slate-12">Partner Tier Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-6">
                <th className="text-left text-slate-11 font-medium px-6 py-3">Tier</th>
                <th className="text-left text-slate-11 font-medium px-6 py-3">Monthly</th>
                <th className="text-left text-slate-11 font-medium px-6 py-3">Setup</th>
                <th className="text-left text-slate-11 font-medium px-6 py-3">Commission</th>
                <th className="text-left text-slate-11 font-medium px-6 py-3">Requirements</th>
              </tr>
            </thead>
            <tbody>
              {partnerTiers.map((tier) => (
                <tr key={tier.tier} className="border-b border-slate-6 last:border-0">
                  <td className="px-6 py-4 text-slate-12 font-medium">{tier.tier}</td>
                  <td className="px-6 py-4 text-slate-11">{tier.monthly}</td>
                  <td className="px-6 py-4 text-slate-11">{tier.setup}</td>
                  <td className="px-6 py-4 text-green-10 font-medium">{tier.commission}</td>
                  <td className="px-6 py-4 text-slate-11">{tier.requirements}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Schedule */}
      <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-12 mb-4">Payment Schedule</h2>
        <div className="space-y-4">
          {paymentSchedule.map((payment, i) => (
            <div key={payment.event} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-9/10 text-blue-11 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </div>
                {i < paymentSchedule.length - 1 && (
                  <div className="w-0.5 h-8 bg-slate-6" />
                )}
              </div>
              <div className="pt-1">
                <p className="text-sm font-medium text-slate-12">{payment.event}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-10">{payment.timing}</span>
                  <span className="text-xs text-blue-11">{payment.amount}</span>
                </div>
                <p className="text-xs text-slate-11 mt-0.5">{payment.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
