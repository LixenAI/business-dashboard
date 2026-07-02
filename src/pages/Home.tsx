import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
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

/* ── Animation variants ── */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

/* ── Mock data ── */
const revenueData = [
  { month: 'Jan', revenue: 4200, target: 5000 },
  { month: 'Feb', revenue: 3800, target: 5000 },
  { month: 'Mar', revenue: 5500, target: 5000 },
  { month: 'Apr', revenue: 6200, target: 6000 },
  { month: 'May', revenue: 7100, target: 6000 },
  { month: 'Jun', revenue: 8900, target: 7000 },
];

const partnerGrowth = [
  { month: 'Jan', partners: 2 },
  { month: 'Feb', partners: 3 },
  { month: 'Mar', partners: 5 },
  { month: 'Apr', partners: 7 },
  { month: 'May', partners: 9 },
  { month: 'Jun', partners: 12 },
];

const planDistribution = [
  { name: 'Starter', value: 7, color: '#5BB8FF' },
  { name: 'Growth', value: 5, color: '#1A6FD4' },
];

const verticalData = [
  { name: 'Dental', leads: 24 },
  { name: 'HVAC', leads: 18 },
  { name: 'Plumbing', leads: 15 },
  { name: 'Real Estate', leads: 12 },
  { name: 'Insurance', leads: 10 },
  { name: 'Legal', leads: 8 },
];

/* ── Summary card component ── */
function SummaryCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
  color: string;
}) {
  return (
    <motion.div
      variants={item}
      className="bg-surface rounded-xl p-5 border border-border-custom hover:border-border-light transition-all hover:shadow-[0_4px_16px_rgba(12,45,90,0.12)]"
    >
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

/* ── Chart card wrapper ── */
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

export default function Home() {
  const [timeRange, setTimeRange] = useState('6M');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* ── Header ── */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Overview</h1>
          <p className="text-sm text-text-secondary mt-0.5">LixenAI partner program performance and metrics</p>
        </div>
        <div className="flex items-center gap-2 bg-surface rounded-lg border border-border-custom p-1 w-fit">
          {['1M', '3M', '6M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                timeRange === range ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Partners" value="12" change="+3 this month" changeType="up" icon={Users} color="#1A6FD4" />
        <SummaryCard title="Monthly Revenue" value="$8,900" change="+22% vs last month" changeType="up" icon={DollarSign} color="#4ADE80" />
        <SummaryCard title="Active Leads" value="23" change="+5 new this week" changeType="up" icon={Target} color="#5BB8FF" />
        <SummaryCard title="Avg. Partner Value" value="$741" change="-2% vs last month" changeType="down" icon={Activity} color="#FACC15" />
      </div>

      {/* ── Charts Row 1 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title="Revenue Trend" subtitle="Actual vs Target" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A6FD4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1A6FD4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
              <XAxis dataKey="month" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <YAxis tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              <Area type="monotone" dataKey="revenue" stroke="#1A6FD4" fill="url(#revGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="target" stroke="#5BB8FF" fill="transparent" strokeWidth={1.5} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Partner Growth" subtitle="Cumulative enrollments" icon={Users}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={partnerGrowth}>
              <defs>
                <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
              <XAxis dataKey="month" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <YAxis tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              <Area type="monotone" dataKey="partners" stroke="#4ADE80" fill="url(#pgGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Plan Distribution" subtitle="Starter vs Growth partners" icon={PieChartIcon}>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            {planDistribution.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs text-text-secondary">{p.name}: <span className="font-semibold text-text-primary">{p.value}</span></span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* ── Charts Row 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Leads by Vertical" subtitle="Top performing industries" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={verticalData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
              <XAxis type="number" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} width={80} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              <Bar dataKey="leads" fill="#1A6FD4" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Upcoming Milestones" subtitle="Key dates and deadlines" icon={Calendar}>
          <div className="space-y-3">
            {[
              { date: 'Jul 15', title: 'Partner Onboarding — Sarah M.', type: 'Onboarding', status: 'upcoming' },
              { date: 'Jul 18', title: 'Discovery Call — Premier Realty', type: 'Sales', status: 'upcoming' },
              { date: 'Jul 22', title: 'Balance Due — 3 partners', type: 'Billing', status: 'warning' },
              { date: 'Jul 30', title: 'Q2 Performance Review', type: 'Internal', status: 'upcoming' },
              { date: 'Aug 5', title: '90-Day Check-In — David C.', type: 'Partner', status: 'upcoming' },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated border border-border-custom">
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                  m.status === 'warning' ? 'bg-[#FACC15]/10 text-[#FACC15]' : 'bg-[#1A6FD4]/10 text-[#5BB8FF]'
                }`}>
                  <span className="text-[10px] font-medium uppercase">{m.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold">{m.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{m.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    m.type === 'Onboarding' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' :
                    m.type === 'Sales' ? 'bg-[#1A6FD4]/10 text-[#5BB8FF]' :
                    m.type === 'Billing' ? 'bg-[#FACC15]/10 text-[#FACC15]' :
                    'bg-[#0F2440] text-text-secondary'
                  }`}>{m.type}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}