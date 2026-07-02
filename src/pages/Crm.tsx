import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  PhoneCall,
  Mail,
  Calendar,
  Tag,
  ChevronRight,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Clock,
  ArrowRight,
  Target,
  TrendingUp,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

/* ── Types ── */
interface Lead {
  id: string;
  name: string;
  company: string;
  vertical: string;
  stage: string;
  source: string;
  lastContact: string;
  nextAction: string;
  value: number;
  tags: string[];
  email: string;
  phone: string;
  score: number;
  activities: { date: string; type: string; note: string }[];
}

/* ── Pipeline stages ── */
const stages = [
  { id: 'inquiry', name: 'New Inquiry', color: '#5BB8FF', icon: Target },
  { id: 'discovery', name: 'Discovery Call', color: '#FACC15', icon: PhoneCall },
  { id: 'demo', name: 'Demo', color: '#1A6FD4', icon: Calendar },
  { id: 'proposal', name: 'Proposal', color: '#A78BFA', icon: Mail },
  { id: 'negotiation', name: 'Negotiation', color: '#FB923C', icon: TrendingUp },
  { id: 'closed-won', name: 'Closed Won', color: '#4ADE80', icon: ChevronRight },
  { id: 'closed-lost', name: 'Closed Lost', color: '#F87171', icon: ChevronRight },
];

/* ── Mock leads ── */
const mockLeads: Lead[] = [
  { id: '1', name: 'Sarah Mitchell', company: 'Bright Smile Dental', vertical: 'Dental', stage: 'discovery', source: 'LinkedIn', lastContact: '2 hours ago', nextAction: 'Schedule discovery call', value: 497, tags: ['high-intent', 'follow-up'], email: 'sarah@brightsmile.com', phone: '(555) 123-4567', score: 85, activities: [{ date: 'Jul 2', type: 'email', note: 'Sent intro email' }, { date: 'Jul 2', type: 'call', note: 'Left voicemail' }] },
  { id: '2', name: 'Mike Rodriguez', company: 'Cool Air HVAC', vertical: 'HVAC', stage: 'inquiry', source: 'Referral', lastContact: '5 hours ago', nextAction: 'Send intro email', value: 497, tags: ['new', 'warm'], email: 'mike@coolairhvac.com', phone: '(555) 234-5678', score: 72, activities: [{ date: 'Jul 2', type: 'form', note: 'Filled out contact form' }] },
  { id: '3', name: 'Jennifer Park', company: 'Elite Med Spa', vertical: 'Med Spa', stage: 'demo', source: 'Website', lastContact: '1 day ago', nextAction: 'Prepare custom demo', value: 497, tags: ['demo-scheduled', 'high-value'], email: 'jen@elitemedspa.com', phone: '(555) 345-6789', score: 91, activities: [{ date: 'Jul 1', type: 'call', note: 'Discovery call completed' }, { date: 'Jul 1', type: 'email', note: 'Demo scheduled for Jul 5' }] },
  { id: '4', name: 'David Chen', company: 'Sunrise Realty', vertical: 'Real Estate', stage: 'proposal', source: 'Cold Outreach', lastContact: '3 days ago', nextAction: 'Send proposal follow-up', value: 497, tags: ['proposal-sent', 'decision-maker'], email: 'david@sunriserealty.com', phone: '(555) 456-7890', score: 78, activities: [{ date: 'Jun 30', type: 'email', note: 'Proposal sent' }, { date: 'Jun 29', type: 'call', note: 'Demo walkthrough' }] },
  { id: '5', name: 'Amanda Foster', company: 'Pure Plumbing', vertical: 'Plumbing', stage: 'closed-won', source: 'Facebook', lastContact: '1 week ago', nextAction: 'Onboarding kickoff', value: 497, tags: ['closed', 'starter-plan'], email: 'amanda@pureplumbing.com', phone: '(555) 567-8901', score: 95, activities: [{ date: 'Jun 25', type: 'email', note: 'Contract signed' }, { date: 'Jun 24', type: 'call', note: 'Final negotiation' }] },
  { id: '6', name: 'Robert Hayes', company: 'Guardian Insurance', vertical: 'Insurance', stage: 'negotiation', source: 'LinkedIn', lastContact: '4 hours ago', nextAction: 'Address pricing concerns', value: 497, tags: ['negotiating', 'multi-location'], email: 'rob@guardianins.com', phone: '(555) 678-9012', score: 68, activities: [{ date: 'Jul 2', type: 'call', note: 'Pricing discussion' }, { date: 'Jun 28', type: 'email', note: 'Proposal received' }] },
  { id: '7', name: 'Lisa Thompson', company: 'Thompson Law Group', vertical: 'Legal', stage: 'inquiry', source: 'Google Ads', lastContact: '6 hours ago', nextAction: 'Qualify needs', value: 497, tags: ['new', 'law-firm'], email: 'lisa@thompsonlaw.com', phone: '(555) 789-0123', score: 55, activities: [{ date: 'Jul 2', type: 'form', note: 'Downloaded pricing guide' }] },
  { id: '8', name: 'Carlos Mendez', company: 'Fresh Cut Landscaping', vertical: 'Landscaping', stage: 'closed-lost', source: 'Referral', lastContact: '2 weeks ago', nextAction: 'Re-engage in 30 days', value: 497, tags: ['lost', 'budget'], email: 'carlos@freshcut.com', phone: '(555) 890-1234', score: 40, activities: [{ date: 'Jun 18', type: 'email', note: 'Budget too low — re-engage later' }] },
];

const stageData = stages.filter(s => s.id !== 'closed-lost').map(s => ({
  name: s.name,
  count: mockLeads.filter(l => l.stage === s.id).length,
  color: s.color,
}));

const sourceData = [
  { name: 'LinkedIn', value: 2, color: '#1A6FD4' },
  { name: 'Referral', value: 2, color: '#4ADE80' },
  { name: 'Website', value: 1, color: '#5BB8FF' },
  { name: 'Cold Outreach', value: 1, color: '#FACC15' },
  { name: 'Facebook', value: 1, color: '#A78BFA' },
  { name: 'Google Ads', value: 1, color: '#FB923C' },
];

/* ── Animations ── */
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Crm() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  const filteredLeads = mockLeads.filter(l => {
    const matchesSearch = !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalPipeline = mockLeads.filter(l => l.stage !== 'closed-won' && l.stage !== 'closed-lost').reduce((s, l) => s + l.value, 0);
  const wonValue = mockLeads.filter(l => l.stage === 'closed-won').reduce((s, l) => s + l.value, 0);
  const activeDeals = mockLeads.filter(l => l.stage !== 'closed-won' && l.stage !== 'closed-lost').length;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">CRM Pipeline</h1>
          <p className="text-sm text-text-secondary mt-0.5">Track leads, manage deals, close more partners</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-blue text-white rounded-lg text-sm font-medium hover:bg-[#1558a8] transition-colors w-fit">
          <Plus size={16} />
          Add Lead
        </button>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div variants={item} className="bg-surface rounded-xl p-5 border border-border-custom">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary uppercase">Pipeline Value</span>
            <Target size={18} className="text-soft-neon" />
          </div>
          <p className="text-2xl font-bold text-text-primary font-mono">${totalPipeline.toLocaleString()}</p>
          <p className="text-xs text-text-secondary mt-1">{activeDeals} active deals</p>
        </motion.div>
        <motion.div variants={item} className="bg-surface rounded-xl p-5 border border-border-custom">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary uppercase">Closed Won</span>
            <TrendingUp size={18} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-success font-mono">${wonValue.toLocaleString()}</p>
          <p className="text-xs text-text-secondary mt-1">This quarter</p>
        </motion.div>
        <motion.div variants={item} className="bg-surface rounded-xl p-5 border border-border-custom">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary uppercase">Win Rate</span>
            <Users size={18} className="text-primary-blue" />
          </div>
          <p className="text-2xl font-bold text-text-primary font-mono">
            {mockLeads.filter(l => l.stage === 'closed-won').length > 0
              ? Math.round((mockLeads.filter(l => l.stage === 'closed-won').length / (mockLeads.filter(l => l.stage === 'closed-won' || l.stage === 'closed-lost').length || 1)) * 100)
              : 0}%
          </p>
          <p className="text-xs text-text-secondary mt-1">Won / (Won + Lost)</p>
        </motion.div>
      </div>

      {/* Pipeline Visual */}
      <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom p-5 overflow-x-auto">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Pipeline Overview</h3>
        <div className="flex gap-3 min-w-[700px]">
          {stages.filter(s => s.id !== 'closed-lost').map((stage) => {
            const stageLeads = mockLeads.filter(l => l.stage === stage.id);
            const stageValue = stageLeads.reduce((s, l) => s + l.value, 0);
            return (
              <div key={stage.id} className="flex-1 min-w-[140px]">
                <div className="flex items-center gap-2 mb-3">
                  <stage.icon size={14} style={{ color: stage.color }} />
                  <span className="text-xs font-medium text-text-primary">{stage.name}</span>
                  <span className="text-xs text-text-secondary ml-auto">{stageLeads.length}</span>
                </div>
                <div className="space-y-2">
                  {stageLeads.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="w-full p-3 rounded-lg bg-surface-elevated border border-border-custom hover:border-border-light transition-all text-left"
                    >
                      <p className="text-xs font-medium text-text-primary truncate">{lead.name}</p>
                      <p className="text-[10px] text-text-secondary truncate">{lead.company}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        <span className="text-[10px] font-mono text-soft-neon">${lead.value}/mo</span>
                        <span className="text-[10px] text-text-tertiary ml-auto">Score: {lead.score}</span>
                      </div>
                    </button>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="h-16 rounded-lg border border-dashed border-border-custom flex items-center justify-center">
                      <span className="text-[10px] text-text-tertiary">No leads</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 pt-2 border-t border-border-custom">
                  <span className="text-[10px] text-text-secondary font-mono">${stageValue.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Leads Table */}
      <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom overflow-hidden">
        <div className="p-4 border-b border-border-custom flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-text-tertiary" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none flex-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-text-tertiary" />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-surface-elevated border border-border-custom rounded-lg text-xs text-text-primary px-3 py-1.5 outline-none"
            >
              <option value="all">All Stages</option>
              {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-elevated/50">
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Lead</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Stage</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Vertical</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Source</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Value</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Score</th>
                <th className="text-left text-xs font-medium text-text-secondary uppercase tracking-wider px-4 py-3">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => {
                const stage = stages.find(s => s.id === lead.stage);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="border-t border-border-custom hover:bg-surface-elevated/30 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{lead.name}</p>
                        <p className="text-xs text-text-secondary">{lead.company}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${stage?.color}15`, color: stage?.color }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stage?.color }} />
                        {stage?.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{lead.vertical}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{lead.source}</td>
                    <td className="px-4 py-3 text-sm font-mono text-text-primary">${lead.value}/mo</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${lead.score}%`, backgroundColor: lead.score >= 80 ? '#4ADE80' : lead.score >= 60 ? '#FACC15' : '#F87171' }} />
                        </div>
                        <span className="text-xs font-mono text-text-secondary">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-secondary flex items-center gap-1">
                      <Clock size={12} />
                      {lead.lastContact}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="text-center py-8 text-text-tertiary text-sm">No leads match your filters</div>
          )}
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Deals by Stage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3358" />
              <XAxis dataKey="name" tick={{ fill: '#7B93B5', fontSize: 10 }} axisLine={{ stroke: '#1A3358' }} />
              <YAxis tick={{ fill: '#7B93B5', fontSize: 12 }} axisLine={{ stroke: '#1A3358' }} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {stageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="bg-surface rounded-xl border border-border-custom p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Lead Sources</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B1D35', border: '1px solid #1A3358', borderRadius: '8px', color: '#F0F4FA' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {sourceData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-text-secondary">{s.name}: <span className="font-medium text-text-primary">{s.value}</span></span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lead Detail Drawer */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex justify-end"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-surface border-l border-border-custom h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-border-custom">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Lead Details</h2>
                  <button onClick={() => setSelectedLead(null)} className="p-2 rounded-lg hover:bg-surface-elevated transition-colors text-text-secondary">
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-blue/20 flex items-center justify-center text-lg font-bold text-soft-neon">
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{selectedLead.name}</h3>
                    <p className="text-sm text-text-secondary">{selectedLead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${stages.find(s => s.id === selectedLead.stage)?.color}15`, color: stages.find(s => s.id === selectedLead.stage)?.color }}>
                    {stages.find(s => s.id === selectedLead.stage)?.name}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-surface-elevated text-text-secondary">{selectedLead.vertical}</span>
                  <span className="px-2.5 py-1 rounded-full text-xs bg-surface-elevated text-text-secondary">Score: {selectedLead.score}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Contact Info</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-soft-neon" />
                      <span className="text-text-primary">{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <PhoneCall size={14} className="text-soft-neon" />
                      <span className="text-text-primary">{selectedLead.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Deal Info</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom">
                      <p className="text-xs text-text-secondary">Monthly Value</p>
                      <p className="text-lg font-bold font-mono text-text-primary">${selectedLead.value}/mo</p>
                    </div>
                    <div className="p-3 bg-surface-elevated rounded-lg border border-border-custom">
                      <p className="text-xs text-text-secondary">Annual Value</p>
                      <p className="text-lg font-bold font-mono text-text-primary">${(selectedLead.value * 12).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-[#0C2D5A] text-soft-neon border border-[#1A3358]">{tag}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-3">Activity</h4>
                  <div className="space-y-3">
                    {selectedLead.activities.map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-custom flex items-center justify-center shrink-0">
                          {a.type === 'email' ? <Mail size={14} className="text-soft-neon" /> : a.type === 'call' ? <PhoneCall size={14} className="text-success" /> : <Target size={14} className="text-primary-blue" />}
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">{a.date}</p>
                          <p className="text-sm text-text-primary">{a.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border-custom">
                  <p className="text-xs text-text-secondary mb-2">Next Action</p>
                  <p className="text-sm font-medium text-text-primary">{selectedLead.nextAction}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}