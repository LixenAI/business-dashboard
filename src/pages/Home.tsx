import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  Hammer,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CircleDot,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ─── KPI Data ───
const kpiData = [
  {
    label: "Monthly Recurring Revenue",
    value: "$12,450",
    change: "+12.5%",
    up: true,
    icon: DollarSign,
    color: "#1A6FD4",
  },
  {
    label: "Active Partners",
    value: "24",
    change: "+4",
    up: true,
    icon: Users,
    color: "#2DD4A8",
  },
  {
    label: "Build Progress",
    value: "68%",
    change: "+8%",
    up: true,
    icon: Hammer,
    color: "#5BB8FF",
  },
  {
    label: "Avg. Operating Cost",
    value: "$3,200",
    change: "-5.2%",
    up: true,
    icon: TrendingUp,
    color: "#F59E0B",
  },
];

// ─── Revenue Chart Data ───
const revenueData = [
  { month: "Jan", revenue: 8400 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10100 },
  { month: "Apr", revenue: 9800 },
  { month: "May", revenue: 11200 },
  { month: "Jun", revenue: 12450 },
];

// ─── Partner Distribution ───
const partnerDist = [
  { name: "Dental", value: 10, color: "#1A6FD4" },
  { name: "Medical", value: 7, color: "#2DD4A8" },
  { name: "Med Spa", value: 4, color: "#5BB8FF" },
  { name: "Other", value: 3, color: "#F59E0B" },
];

// ─── Phase Progress ───
const phases = [
  { name: "Phase 1", label: "Foundation", progress: 100 },
  { name: "Phase 2", label: "Core Build", progress: 100 },
  { name: "Phase 3", label: "Integration", progress: 85 },
  { name: "Phase 4", label: "Testing", progress: 60 },
  { name: "Phase 5", label: "Launch Prep", progress: 40 },
  { name: "Phase 6", label: "Post-Launch", progress: 20 },
];

// ─── Recent Activity ───
const activities = [
  { action: "New partner onboarded", detail: "Bright Dental Group signed up for Growth plan", time: "2 hours ago", type: "success" },
  { action: "Build milestone reached", detail: "Phase 3 integration 85% complete", time: "5 hours ago", type: "info" },
  { action: "Pricing update", detail: "Retail pricing calculator updated with new tiers", time: "1 day ago", type: "warning" },
  { action: "Lead qualified", detail: "Park Orthodontics moved to Qualified stage", time: "1 day ago", type: "info" },
  { action: "Contract signed", detail: "Sunrise Dental - 12 month commitment", time: "2 days ago", type: "success" },
];

export default function Home() {
  const [hoveredKpi, setHoveredKpi] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-12 mb-2">Dashboard Overview</h1>
        <p className="text-slate-11">Real-time snapshot of your agency operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              onMouseEnter={() => setHoveredKpi(i)}
              onMouseLeave={() => setHoveredKpi(null)}
              className={`bg-slate-3 border rounded-xl p-5 transition-colors duration-200 ${
                hoveredKpi === i ? "border-blue-9/30" : "border-slate-6"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-xs font-medium ${
                    kpi.up ? "text-green-10" : "text-red-10"
                  }`}
                >
                  {kpi.up ? (
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  )}
                  {kpi.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-12 mb-0.5">{kpi.value}</div>
              <div className="text-xs text-slate-11">{kpi.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-slate-3 border border-slate-6 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-12">Revenue Trend</h2>
              <p className="text-xs text-slate-11 mt-0.5">Monthly recurring revenue over time</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-9" />
              <span className="text-slate-11">MRR</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A6FD4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1A6FD4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#7B8DA8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#7B8DA8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1D35",
                  border: "1px solid #1A3358",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "MRR"]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#1A6FD4"
                strokeWidth={2}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Partner Distribution */}
        <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-12 mb-1">Partners by Vertical</h2>
          <p className="text-xs text-slate-11 mb-6">Distribution across verticals</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={partnerDist}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {partnerDist.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1D35",
                  border: "1px solid #1A3358",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {partnerDist.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-slate-11">{d.name}</span>
                <span className="text-xs text-slate-12 font-medium ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-slate-3 border border-slate-6 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-slate-12 mb-4">Build Phase Progress</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="text-center"
            >
              <div className="relative w-16 h-16 mx-auto mb-2">
                <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="#1A3358" strokeWidth="4" />
                  <motion.circle
                    cx="32" cy="32" r="28" fill="none" stroke="#1A6FD4"
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - phase.progress / 100) }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-12">
                  {phase.progress}%
                </span>
              </div>
              <p className="text-xs font-medium text-slate-12">{phase.name}</p>
              <p className="text-[10px] text-slate-10">{phase.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Stats */}
        <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-12 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-4 rounded-lg p-4">
              <p className="text-xs text-slate-11 mb-1">Avg. Partner LTV</p>
              <p className="text-xl font-bold text-slate-12">$7,164</p>
              <p className="text-xs text-green-10 mt-1">Based on 12-month avg</p>
            </div>
            <div className="bg-slate-4 rounded-lg p-4">
              <p className="text-xs text-slate-11 mb-1">Churn Rate</p>
              <p className="text-xl font-bold text-slate-12">3.2%</p>
              <p className="text-xs text-green-10 mt-1">Below 5% target</p>
            </div>
            <div className="bg-slate-4 rounded-lg p-4">
              <p className="text-xs text-slate-11 mb-1">Tasks Completed</p>
              <p className="text-xl font-bold text-slate-12">1,247</p>
              <p className="text-xs text-slate-10 mt-1">This month</p>
            </div>
            <div className="bg-slate-4 rounded-lg p-4">
              <p className="text-xs text-slate-11 mb-1">Support Tickets</p>
              <p className="text-xl font-bold text-slate-12">8</p>
              <p className="text-xs text-slate-10 mt-1">3 new this week</p>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-12 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    activity.type === "success"
                      ? "bg-green-9"
                      : activity.type === "warning"
                      ? "bg-yellow-9"
                      : "bg-blue-9"
                  }`}
                />
                <div className="min-w-0">
                  <p className="text-sm text-slate-12 font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-11 truncate">{activity.detail}</p>
                  <p className="text-[10px] text-slate-10 mt-0.5">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
