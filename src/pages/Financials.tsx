import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  BarChart3,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

/* ── Animation ── */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

/* ── Data ── */
const revenueTrend = [
  { month: 'Jan', revenue: 4200, costs: 1500 },
  { month: 'Feb', revenue: 3800, costs: 1500 },
  { month: 'Mar', revenue: 5500, costs: 1500 },
  { month: 'Apr', revenue: 6200, costs: 1500 },
  { month: 'May', revenue: 7100, costs: 1500 },
  { month: 'Jun', revenue: 8900, costs: 1500 },
];

const costBreakdown = [
  { category: 'Platform Sub', amount: 497, color: '#1A6FD4' },
  { category: 'AI Suite', amount: 99, color: '#5BB8FF' },
  { category: 'Prospecting', amount: 29, color: '#4ADE80' },
  { category: 'SuiteDash', amount: 20, color: '#FACC15' },
  { category: 'Domain/Host', amount: 10, color: '#F87171' },
  { category: 'Other Tools', amount: 95, color: '#7B93B5' },
];

const partnerRevenue = [
  { name: 'Starter Partners', value: 7, avgRevenue: 417, color: '#5BB8FF' },
  { name: 'Growth Partners', value: 5, avgRevenue: 500, color: '#1A6FD4' },
];

const projections = [
  { quarter: 'Q3 2026', partners: 18, revenue: 12500 },
  { quarter: 'Q4 2026', partners: 25, revenue: 18000 },
  { quarter: 'Q1 2027', partners: 35, revenue: 25000 },
  { quarter: 'Q2 2027', partners: 50, revenue: 36000 },
];

/* ── Summary card ── */
function SummaryCard({ title, value, change, changeType, icon: Icon, color }: {
  title: string; value: string; change: string; changeType: 'up' | 'down' | 'neutral';
  icon: React.ElementType; color: string;
}) {
  return (
    <motion.div variants={item} className="bg-surface rounded-xl p-5 border border-border-custom hover:border-border-light transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{title}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div className="text-2xl font-bold text-text-primary font-mono mb-1">{value}</div>
      <div className={`flex items-center gap-1 text-xs ${changeType === 'up' ? 'text-success' : changeType === 'down' ? 'text-danger' : 'text-text-tertiary'}`}>
        {changeType === 'up' ? <ArrowUpRight size={12} /> : changeType === 'down' ? <ArrowDownRight size={12} /> : null}
        <span>{change}</span>
      </div>
    </motion.div>
  );
}

/* ── Chart card ── */
function ChartCard({ title, subtitle, icon: Icon, children }: { title: string; subtitle?: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-soft-neon" />
        <div>
          <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
          {subtitle && <p className="text-xs text-text-secondary">{subtitle}</p>}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Financials() {
  const totalRevenue = revenueTrend.reduce((s, d) => s + d.revenue, 0);
  const totalCosts = revenueTrend.reduce((s, d) => s + d.costs, 0);
  const netIncome = totalRevenue - totalCosts;
  const margin = ((netIncome / totalRevenue) * 100).toFixed(1);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Financials</h1>
        <p className="text-sm text-text-secondary mt-0.5">Revenue, costs, and financial projections</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Revenue (6mo)" value={`$${totalRevenue.toLocaleString()}`} change="+18% vs prior period" changeType="up" icon={DollarSign} color="#4ADE80" />
        <SummaryCard title="Total Costs (6mo)" value={`$${totalCosts.toLocaleString()}`} change="Flat vs prior period" changeType="neutral" icon={CreditCard} color="#F87171" />
        <SummaryCard title="Net Income" value={`$${netIncome.toLocaleString()}`} change={`${margin}% margin`} changeType="up" icon={TrendingUp} color="#1A6FD4" />
        <SummaryCard title="Avg Partner Value" value="$741/mo" change="Per active partner" changeType="neutral" icon={Users} color="#5BB8FF" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Revenue vs Costs" subtitle="Monthly comparison" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueTrend}>
              <defs>
                <linearGradient id="revGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A6FD4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A6FD4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F87171" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
              <XAxis dataKey="month" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <YAxis tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              <Area type="monotone" dataKey="revenue" stroke="#1A6FD4" fill="url(#revGrad2)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="costs" stroke="#F87171" fill="url(#costGrad)" strokeWidth={2} name="Costs" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Cost Breakdown" subtitle="Monthly operating costs" icon={PieChartIcon}>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={costBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="amount">
                  {costBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} formatter={(v: number) => `$${v}/mo`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {costBreakdown.map((c) => (
              <div key={c.category} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-xs text-text-secondary truncate">{c.category}: <span className="font-medium text-text-primary">${c.amount}</span></span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Partner Revenue Mix" subtitle="Revenue by partner type" icon={Users}>
          <div className="space-y-4">
            {partnerRevenue.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg border border-border-custom">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${p.color}15` }}>
                    <Users size={18} style={{ color: p.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{p.name}</p>
                    <p className="text-xs text-text-secondary">{p.value} partners</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-mono" style={{ color: p.color }}>${p.avgRevenue}/mo</p>
                  <p className="text-xs text-text-secondary">avg per partner</p>
                </div>
              </div>
            ))}
            <div className="p-3 bg-[#0C2D5A]/30 rounded-lg border border-[#1A6FD4]/30">
              <p className="text-xs text-text-secondary">Combined monthly partner revenue</p>
              <p className="text-lg font-bold text-text-primary font-mono mt-1">
                ${partnerRevenue.reduce((s, p) => s + p.value * p.avgRevenue, 0).toLocaleString()}/mo
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Projections */}
      <ChartCard title="Growth Projections" subtitle="Partner count and revenue forecast" icon={Target}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {projections.map((p) => (
            <div key={p.quarter} className="p-4 bg-surface-elevated rounded-lg border border-border-custom">
              <p className="text-xs text-text-secondary font-medium">{p.quarter}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-text-primary font-mono">{p.partners}</span>
                <span className="text-xs text-text-secondary">partners</span>
              </div>
              <p className="text-xs text-success mt-1 font-mono">${p.revenue.toLocaleString()}/mo est.</p>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={projections}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
            <XAxis dataKey="quarter" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
            <YAxis tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} tickFormatter={(v) => `$${v/1000}k`} />
            <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
            <Bar dataKey="revenue" fill="#1A6FD4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Unit Economics */}
      <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-soft-neon" />
          Unit Economics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-elevated rounded-lg">
            <p className="text-xs text-text-secondary">Starter Partner (2 clients)</p>
            <p className="text-xl font-bold text-success font-mono mt-1">~$1,179/mo</p>
            <p className="text-xs text-text-secondary mt-1">74% margin · Revenue ~$1,596</p>
          </div>
          <div className="p-4 bg-surface-elevated rounded-lg">
            <p className="text-xs text-text-secondary">Growth Partner (2 clients)</p>
            <p className="text-xl font-bold text-success font-mono mt-1">~$1,894/mo</p>
            <p className="text-xs text-text-secondary mt-1">79% margin · Revenue ~$2,394</p>
          </div>
          <div className="p-4 bg-surface-elevated rounded-lg">
            <p className="text-xs text-text-secondary">Breakeven</p>
            <p className="text-xl font-bold text-soft-neon font-mono mt-1">4 partners</p>
            <p className="text-xs text-text-secondary mt-1">Fully covers Year 1 operating costs</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}