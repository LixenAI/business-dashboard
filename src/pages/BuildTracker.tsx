import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, Clock, AlertTriangle, Wrench, Filter, Search, ListChecks } from 'lucide-react';

interface Task {
  id: number; name: string; where: string; detail: string;
  category: string; phase: number; priority: 'Critical' | 'High' | 'Medium'; status: 'Completed' | 'In Progress' | 'Pending';
}

const phaseInfo = [
  { num: 1, name: "Agency Foundation & Profile", priority: "Critical" as const, count: 29 },
  { num: 2, name: "SaaS Mode & Billing Configuration", priority: "Critical" as const, count: 28 },
  { num: 3, name: "Sub-Account Architecture & Snapshots", priority: "Critical" as const, count: 58 },
  { num: 4, name: "Domains, Email & Authentication", priority: "High" as const, count: 14 },
  { num: 5, name: "Phone System & Messaging Compliance", priority: "High" as const, count: 14 },
  { num: 6, name: "Partner Pipeline & CRM", priority: "High" as const, count: 58 },
  { num: 7, name: "Automations & Workflows", priority: "High" as const, count: 21 },
  { num: 8, name: "Snapshot Library", priority: "High" as const, count: 8 },
  { num: 9, name: "Reporting & Dashboard", priority: "Medium" as const, count: 14 },
  { num: 10, name: "Integrations & Marketplace", priority: "Medium" as const, count: 12 },
];

const priorityColor: Record<string, string> = {
  Critical: "bg-[#F87171]/15 text-[#F87171] border-[#F87171]/30",
  High: "bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/30",
  Medium: "bg-[#5BB8FF]/15 text-[#5BB8FF] border-[#5BB8FF]/30",
};

const statusColor: Record<string, string> = {
  Completed: "bg-[#4ADE80]/15 text-[#4ADE80] border-[#4ADE80]/30",
  "In Progress": "bg-[#FACC15]/15 text-[#FACC15] border-[#FACC15]/30",
  Pending: "bg-[#4A6080]/15 text-[#4A6080] border-[#4A6080]/30",
};

const allTasks: Task[] = [
  { id: 1, name: 'Set agency name', where: 'Settings → Agency Profile', detail: 'Enter: LixenAI', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 2, name: 'Upload agency logo', where: 'Settings → Agency Profile', detail: 'PNG, transparent background, min 400×400px', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 3, name: 'Set agency primary color', where: 'Settings → Agency Profile', detail: '#1A6FD4 (Core Blue)', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 4, name: 'Set agency secondary color', where: 'Settings → Agency Profile', detail: '#0C2D5A (Deep Navy)', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 5, name: 'Set agency website URL', where: 'Settings → Agency Profile', detail: 'https://lixen.ai', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 6, name: 'Set agency address', where: 'Settings → Agency Profile', detail: 'Norwalk, CA (or legal business address)', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 7, name: 'Set agency phone number', where: 'Settings → Agency Profile', detail: 'Primary LixenAI contact number', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 8, name: 'Set support email', where: 'Settings → Agency Profile', detail: 'Support contact email for partner issues', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 9, name: "Set 'From' name for emails", where: 'Settings → Agency Profile', detail: 'LixenAI', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 10, name: 'Upload agency favicon', where: 'Settings → Agency Profile', detail: '32×32px PNG — LixenAI mark', category: 'Agency Identity & Branding', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 11, name: 'Confirm Founder 1 as Agency Admin', where: 'Settings → Team', detail: 'Role: Admin — full access', category: 'Admin Users & Permissions', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 12, name: 'Confirm Rob as Agency Admin', where: 'Settings → Team', detail: 'Role: Admin — full access', category: 'Admin Users & Permissions', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 13, name: 'Set user permissions scope', where: 'Settings → Team', detail: 'Admins only have agency-level access', category: 'Admin Users & Permissions', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 14, name: 'Disable sub-account creation by partners', where: 'Settings → Team', detail: 'Partners cannot create accounts independently', category: 'Admin Users & Permissions', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 15, name: 'Review billing access permissions', where: 'Settings → Team', detail: 'Partners should NOT see agency billing', category: 'Admin Users & Permissions', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 16, name: 'Set white-label agency domain', where: 'Settings → White Label', detail: 'app.lixen.ai — partners log in here', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 17, name: 'Add DNS CNAME record for app subdomain', where: 'Domain registrar', detail: 'Point app.lixen.ai → platform CNAME', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 18, name: 'Confirm SSL certificate active', where: 'Settings → White Label', detail: 'Auto-provisioned after DNS propagates (24–48 hrs)', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 19, name: 'Set white-label app name', where: 'Settings → White Label', detail: 'LixenAI', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 20, name: 'Set white-label logo (app header)', where: 'Settings → White Label', detail: 'Partners see this when logged in', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 21, name: 'Set white-label favicon', where: 'Settings → White Label', detail: 'LixenAI favicon', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 22, name: 'Set white-label support email', where: 'Settings → White Label', detail: 'Your support address', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 23, name: 'Set white-label support phone', where: 'Settings → White Label', detail: 'Your support number', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 24, name: 'Set white-label chat widget', where: 'Settings → White Label', detail: 'Optional — configure if showing support chat', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 25, name: "Disable 'Powered by' branding", where: 'Settings → White Label', detail: 'Confirm plan supports full white-label', category: 'White-Label / Agency Domain', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 26, name: 'Set agency notification email', where: 'Settings → Notifications', detail: 'Where alerts about new sub-accounts, billing, etc. go', category: 'Notification Settings', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 27, name: 'Enable new sub-account creation alerts', where: 'Settings → Notifications', detail: 'Founders notified when a new partner account is created', category: 'Notification Settings', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 28, name: 'Enable billing alerts', where: 'Settings → Notifications', detail: 'Failed payments, subscription changes', category: 'Notification Settings', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 29, name: 'Set timezone', where: 'Settings → Agency Profile', detail: 'America/Los_Angeles', category: 'Notification Settings', phase: 1, priority: "Critical" as const, status: "Pending" as const },
  { id: 30, name: 'Connect Stripe account to Agency HQ', where: 'Settings → Payments → Stripe', detail: "Use LixenAI's business Stripe account", category: 'Stripe Integration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 31, name: 'Confirm Stripe is in LIVE mode', where: 'Stripe dashboard', detail: 'Switch from test keys to live keys before first enrollment', category: 'Stripe Integration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 32, name: 'Set Stripe payout schedule', where: 'Stripe dashboard', detail: "Match to LixenAI's cash flow preference", category: 'Stripe Integration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 33, name: 'Enable Stripe receipt emails', where: 'Stripe dashboard → Settings', detail: 'Partners receive receipts automatically', category: 'Stripe Integration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 34, name: 'Set Stripe statement descriptor', where: 'Stripe dashboard', detail: 'Set to: LIXENAI so partners recognize the charge', category: 'Stripe Integration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 35, name: 'Enable SaaS Mode', where: 'Settings → SaaS Configurator', detail: 'Activates plan-based sub-account billing', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 36, name: 'Create Starter Partner plan', where: 'SaaS Configurator → Add Plan', detail: 'Name: Starter Partner', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 37, name: 'Set Starter plan price', where: 'SaaS Configurator → Starter', detail: '$5,000/year OR $2,500 down payment structure', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 38, name: 'Set Starter plan billing interval', where: 'SaaS Configurator → Starter', detail: 'Annual', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 39, name: 'Set Starter plan description', where: 'SaaS Configurator → Starter', detail: 'LixenAI Starter Partner — Annual program, 12-month access', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 40, name: 'Configure Starter plan feature limits', where: 'SaaS Configurator → Starter', detail: 'Sub-accounts: 1 per partner; contacts, workflows per entitlement', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 41, name: 'Create Growth Partner plan', where: 'SaaS Configurator → Add Plan', detail: 'Name: Growth Partner', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 42, name: 'Set Growth plan price', where: 'SaaS Configurator → Growth', detail: '$6,000/year', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 43, name: 'Set Growth plan billing interval', where: 'SaaS Configurator → Growth', detail: 'Annual', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 44, name: 'Set Growth plan description', where: 'SaaS Configurator → Growth', detail: 'LixenAI Growth Partner — Annual program, 12-month access', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 45, name: 'Configure Growth plan feature limits', where: 'SaaS Configurator → Growth', detail: 'Sub-accounts: 1 per partner; expanded AI features enabled', category: 'SaaS Plan Configuration', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 46, name: 'Create Starter down payment link', where: 'Stripe → Payment Links', detail: '$2,500 — one-time payment link', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 47, name: 'Create Growth down payment link', where: 'Stripe → Payment Links', detail: '$3,000 — one-time payment link', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 48, name: 'Create Starter installment subscription', where: 'Stripe → Products', detail: '$416.67/mo × 6 months', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 49, name: 'Create Growth installment subscription', where: 'Stripe → Products', detail: '$500/mo × 6 months', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 50, name: 'Create Starter renewal subscription', where: 'Stripe → Products', detail: '$416.67/mo recurring — no end date', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 51, name: 'Create Growth renewal subscription', where: 'Stripe → Products', detail: '$500/mo recurring — no end date', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 52, name: 'Configure payment link branding', where: 'Stripe → Payment Links', detail: 'LixenAI logo, colors, custom URL', category: 'Payment Links & Checkout', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 53, name: 'Create invoice template — Starter Partner', where: 'Payments → Invoice Templates', detail: 'Include: LixenAI logo, program name, payment terms, non-refundable notice', category: 'Invoice & Receipt Templates', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 54, name: 'Create invoice template — Growth Partner', where: 'Payments → Invoice Templates', detail: 'Same structure as Starter', category: 'Invoice & Receipt Templates', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 55, name: 'Create invoice template — Website Integration', where: 'Payments → Invoice Templates', detail: '$500 one-time', category: 'Invoice & Receipt Templates', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 56, name: 'Create invoice template — Balance Due', where: 'Payments → Invoice Templates', detail: 'Reference original enrollment date and amount', category: 'Invoice & Receipt Templates', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 57, name: 'Add legal disclaimer to all invoices', where: 'Invoice template footer', detail: 'Setup fees and down payments are non-refundable. This is an annual commitment.', category: 'Invoice & Receipt Templates', phase: 2, priority: "Critical" as const, status: "Pending" as const },
  { id: 58, name: 'Set default timezone for new sub-accounts', where: 'Sub-account template', detail: 'America/Los_Angeles', category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 59, name: 'Set default currency', where: 'Sub-account template', detail: 'USD', category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 60, name: 'Set default business category', where: 'Sub-account template', detail: 'Marketing / Business Services', category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 61, name: 'Disable sub-account billing access', where: 'Sub-account permissions', detail: "Partners cannot see LixenAI's agency-level billing", category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 62, name: 'Set sub-account user role defaults', where: 'Sub-account permissions', detail: 'Partner = Account Admin of their own account only', category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 63, name: 'Confirm sub-accounts cannot create children', where: 'Sub-account permissions', detail: 'Partners cannot provision their own client accounts', category: 'Sub-Account Structure', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 64, name: 'Create pipeline — Starter Client Pipeline', where: 'CRM → Pipelines', detail: 'Stages: New Lead → Contacted → Appointment Scheduled → Completed → Won → Lost/Nurture', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 65, name: 'Create custom contact fields', where: 'CRM → Custom Fields', detail: 'Lead Source, Consent Status, Consent Channels, Industry, Service Requested, Niche', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 66, name: 'Create tags library', where: 'CRM → Tags', detail: 'new-lead, opted-in, sms-consent, email-consent, appointment-set, no-show, review-requested, reactivation', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 67, name: 'Add placeholder phone number', where: 'Phone → Numbers', detail: 'Starter partners get a new number assigned at setup', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 68, name: 'Missed-call text back workflow', where: 'Automation → Workflows', detail: "Trigger: missed call → immediate SMS → 'Hi [name], sorry we missed you! Reply here or book: [link]'", category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 69, name: 'New lead follow-up sequence', where: 'Automation → Workflows', detail: 'Day 0 SMS + email → Day 1 SMS → Day 3 email → Day 7 SMS', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 70, name: 'Appointment reminder sequence', where: 'Automation → Workflows', detail: '24hr before + 1hr before SMS/email', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 71, name: 'Post-appointment review request', where: 'Automation → Workflows', detail: 'Appointment completed → wait 1 hour → send review request SMS', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 72, name: 'Contact consent tagging workflow', where: 'Automation → Workflows', detail: 'Consent field updated → apply correct channel tags', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 73, name: 'Create default booking calendar', where: 'Calendar → Calendars', detail: "'[Business Name] Booking' — placeholder to be renamed at setup", category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 74, name: 'Set default availability', where: 'Calendar → Settings', detail: 'Mon–Fri 9am–6pm', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 75, name: 'Set appointment confirmation message', where: 'Calendar → Settings', detail: 'SMS + email confirmation with booking details', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 76, name: 'Configure unified inbox', where: 'Inbox → Settings', detail: 'SMS, email active by default — Facebook/Instagram connected at setup', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 77, name: 'Create email templates', where: 'Marketing → Email Templates', detail: 'New lead follow-up, appointment confirmation, review request', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 78, name: 'Create SMS templates', where: 'Marketing → SMS Templates', detail: 'Missed-call text back, follow-up Day 1, review request', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 79, name: 'Build basic landing page template', where: 'Sites → Websites', detail: 'Placeholder hero, services section, contact form, booking button', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 80, name: 'Create lead capture form', where: 'Sites → Forms', detail: 'Name, phone, email, service needed, consent checkbox', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 81, name: 'Add consent language to form', where: 'Sites → Forms', detail: "'By submitting, you consent to receive texts and emails from [Business Name]. Reply STOP to opt out.'", category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 82, name: 'Connect Stripe placeholder', where: 'Payments → Stripe', detail: 'Partner connects their own Stripe at setup', category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 83, name: 'Save Starter snapshot', where: 'Snapshots → Save', detail: "Name: 'LixenAI — Starter Partner Snapshot', Tag: starter, v1.0", category: 'Starter Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 84, name: 'Apply all Starter items first', where: 'Snapshots', detail: 'Starter snapshot is the base', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 85, name: 'Create Conversation AI agent', where: 'AI → Conversation AI', detail: "Name: 'AI Assistant' — placeholder; partner renames at setup", category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 86, name: 'Set AI opening message', where: 'AI → Conversation AI', detail: "'Hi! Welcome to [Business Name]. How can I help you today?'", category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 87, name: 'Configure AI booking integration', where: 'AI → Conversation AI', detail: 'AI can offer and confirm bookings from the calendar', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 88, name: 'Set AI handoff rule', where: 'AI → Conversation AI', detail: 'If AI cannot resolve → notify account owner immediately', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 89, name: 'Set AI widget to inactive', where: 'AI → Conversation AI', detail: 'Partner activates after FAQ training at setup', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 90, name: 'Create Voice AI agent', where: 'AI → Voice AI', detail: "Placeholder greeting: 'Thank you for calling [Business Name]…'", category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 91, name: 'Configure Voice AI call routing', where: 'AI → Voice AI', detail: 'AI answers → attempts to book or take message → escalates if needed', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 92, name: 'Set Voice AI to inactive', where: 'AI → Voice AI', detail: 'Partner activates after training at setup', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 93, name: 'No-show recovery sequence', where: 'Automation → Workflows', detail: 'No-show → immediate SMS → Day 1 SMS → Day 3 email', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 94, name: 'Database reactivation campaign', where: 'Automation → Workflows', detail: 'Manual launch → multi-step SMS + email → 30-day cadence', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 95, name: '30-day lead nurture sequence', where: 'Automation → Workflows', detail: 'New lead, no booking in 48 hours → 30-day SMS + email drip', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 96, name: 'Reputation growth workflow', where: 'Automation → Workflows', detail: 'Appointment completed → review request → track click → tag review-sent', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 97, name: 'Pre-built reactivation email campaign', where: 'Marketing → Campaigns', detail: 'Draft — requires customization before sending', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 98, name: 'Pre-built 30-day nurture email campaign', where: 'Marketing → Campaigns', detail: 'Draft — requires customization before sending', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 99, name: 'Add no-show recovery stage to pipeline', where: 'CRM → Pipelines', detail: "Extra stage: 'No-Show — Recovery Active'", category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 100, name: 'Enable monthly performance snapshot', where: 'Reporting → Settings', detail: 'Configured for monthly auto-report to partner', category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 101, name: 'Save Growth snapshot', where: 'Snapshots → Save', detail: "Name: 'LixenAI — Growth Partner Snapshot', Tag: growth, v1.0", category: 'Growth Snapshot Build', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 102, name: 'Confirm snapshot is exportable', where: 'Sub-Accounts → Test', detail: 'Deploy to a blank sub-account to test', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 103, name: 'Confirm medspa.lixen.ai is live', where: 'Browser', detail: 'Connected and live (already done)', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Completed" as const },
  { id: 104, name: 'Confirm chat widget is active', where: 'medspa.lixen.ai', detail: 'Widget ID: 699ffca9104ec456482232bb (already done)', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Completed" as const },
  { id: 105, name: 'Populate demo CRM — 20+ sample contacts', where: 'Demo sub-account', detail: 'Mix of new leads, active clients, past clients', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 106, name: 'Build demo pipeline — 6 stages with contacts', where: 'Demo sub-account', detail: 'Visual pipeline for backend reveal during demos', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 107, name: 'Add 3–5 sample conversations to inbox', where: 'Demo sub-account', detail: 'SMS, AI chat, and email threads', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 108, name: 'Confirm Conversation AI trained on spa FAQs', where: 'AI → Test', detail: 'Test 10 common questions', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 109, name: 'Confirm Voice AI is live and answers calls', where: 'Phone → Test', detail: 'Call the demo number and test live', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 110, name: 'Confirm missed-call text back fires within 10s', where: 'Phone → Test', detail: 'Call and hang up — text must arrive', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 111, name: 'Confirm booking calendar is live with services', where: 'Calendar → Test', detail: 'Book a test appointment end-to-end', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 112, name: 'Confirm review request automation fires after appt', where: 'Automation → Test', detail: 'Complete appointment → check SMS sent', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 113, name: 'Confirm Google Ads conversion tracking active', where: 'Google Ads', detail: 'AW-17973733809 (already done)', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Completed" as const },
  { id: 114, name: 'Confirm Apollo.io visitor ID active', where: 'Apollo.io dashboard', detail: 'App ID: 69e30ef3a89312001d2ccf3b (already done)', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Completed" as const },
  { id: 115, name: 'Run full backend test guide (10 tests)', where: 'All systems', detail: 'Reference: Master Playbook Section 8', category: 'Demo Snapshot Finalize', phase: 3, priority: "Critical" as const, status: "Pending" as const },
  { id: 116, name: 'Connect lixen.ai as primary agency domain', where: 'Settings → Domains', detail: 'Confirm ownership via DNS TXT record', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 117, name: 'Set up LC Email for agency-level sending', where: 'Settings → Email Services', detail: 'Used for partner onboarding emails, notifications', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 118, name: 'Add sending domain to LC Email', where: 'Email Services → Sending Domains', detail: 'e.g. mail.lixen.ai', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 119, name: 'Add SPF record to DNS', where: 'Domain registrar', detail: 'TXT record provided by platform', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 120, name: 'Add DKIM record to DNS', where: 'Domain registrar', detail: 'CNAME records provided by platform', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 121, name: 'Add DMARC record to DNS', where: 'Domain registrar', detail: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@lixen.ai', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 122, name: 'Verify all three records SPF/DKIM/DMARC', where: 'Email Services → Verify', detail: 'All must show green before sending', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 123, name: 'Send test email from agency account', where: 'Email Services → Test', detail: 'Confirm delivery, check spam score', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 124, name: "Set default 'From' name", where: 'Email Services', detail: 'LixenAI', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 125, name: "Set default 'From' email", where: 'Email Services', detail: 'hello@lixen.ai or partners@lixen.ai', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 126, name: 'Set unsubscribe footer on all agency emails', where: 'Email Settings', detail: 'Required for CAN-SPAM compliance', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 127, name: "Add partner's sending domain to their sub-account", where: 'During partner onboarding', detail: 'Each partner uses their own domain', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 128, name: 'Walk partner through SPF/DKIM/DMARC', where: 'Onboarding call', detail: 'Required before any email automation goes live', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 129, name: 'Verify authentication before go-live', where: 'Go-live checklist', detail: 'No email automations activate until verified', category: 'Email Authentication', phase: 4, priority: "High" as const, status: "Pending" as const },
  { id: 140, name: 'Purchase agency main phone number', where: 'Settings → Phone Numbers', detail: 'LixenAI primary contact number for partner calls', category: 'Agency Phone Numbers', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 141, name: 'Purchase agency operations number', where: 'Settings → Phone Numbers', detail: 'Separate line for internal use', category: 'Agency Phone Numbers', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 142, name: 'Configure call routing on agency number', where: 'Phone → Call Flow', detail: "Route to founders' direct lines", category: 'Agency Phone Numbers', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 143, name: 'Set business hours for agency phone', where: 'Phone → Availability', detail: 'Mon–Fri, 9am–6pm PT', category: 'Agency Phone Numbers', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 144, name: 'Set after-hours voicemail', where: 'Phone → Voicemail', detail: "Professional greeting: 'Thank you for calling LixenAI…'", category: 'Agency Phone Numbers', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 145, name: 'Register LixenAI brand with TCR', where: 'Settings → Phone → A2P', detail: 'Required for any SMS sent from LixenAI numbers', category: 'A2P 10DLC Registration', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 146, name: 'Create A2P campaign — Partner Outreach', where: 'A2P Registration → Campaigns', detail: 'Use case: Marketing — partner recruitment SMS', category: 'A2P 10DLC Registration', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 147, name: 'Create A2P campaign — Partner Notifications', where: 'A2P Registration → Campaigns', detail: 'Use case: Transactional — onboarding, reminders', category: 'A2P 10DLC Registration', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 148, name: 'Confirm brand EIN/business details match', where: 'A2P Registration', detail: 'Must match exactly', category: 'A2P 10DLC Registration', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 149, name: 'Document A2P process for partner onboarding', where: 'Client Onboarding SOP', detail: 'Partners need their own A2P registration for client SMS', category: 'A2P 10DLC Registration', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 150, name: 'Set STOP opt-out language in all SMS', where: 'SMS Templates', detail: "Every SMS must end with 'Reply STOP to opt out'", category: 'Messaging Compliance', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 151, name: 'Confirm unsubscribe logic active in SMS workflows', where: 'Automation → Workflows', detail: 'Platform handles STOP responses automatically — verify enabled', category: 'Messaging Compliance', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 152, name: 'Add consent checkbox to all lead capture forms', where: 'Sites → Forms', detail: "'You consent to receive texts and emails from LixenAI about the Agency Partner Program.'", category: 'Messaging Compliance', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 153, name: 'Document opt-in source for every contact', where: 'CRM → Custom Fields', detail: "Required for TCPA compliance — field: 'Consent Source'", category: 'Messaging Compliance', phase: 5, priority: "High" as const, status: "Pending" as const },
  { id: 154, name: 'Build stage: New Inquiry', where: 'CRM → Pipelines', detail: 'First contact made — Notify founders via SMS/email', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 155, name: 'Build stage: Discovery Call Booked', where: 'CRM → Pipelines', detail: 'Call scheduled — Send confirmation email + calendar invite', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 156, name: 'Build stage: Discovery Call Completed', where: 'CRM → Pipelines', detail: 'Call held — Send recap email; start Day 3 follow-up sequence', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 157, name: 'Build stage: Demo Completed', where: 'CRM → Pipelines', detail: 'Demo shown — Ask for application; start objection follow-up', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 158, name: 'Build stage: Application Sent', where: 'CRM → Pipelines', detail: 'Link sent — Start 24-hour follow-up if not submitted', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 159, name: 'Build stage: Application Submitted', where: 'CRM → Pipelines', detail: 'Candidate submitted form — Notify founders; start review', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 160, name: 'Build stage: Interview Completed', where: 'CRM → Pipelines', detail: 'Evidence interview + role-play done — Score and send decision within 24 hours', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 161, name: 'Build stage: Agreement Pending', where: 'CRM → Pipelines', detail: 'Agreement sent, not signed — 48-hour follow-up sequence', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 162, name: 'Build stage: Payment Pending', where: 'CRM → Pipelines', detail: 'Agreement signed, not paid — Send payment link; 24-hour follow-up', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 163, name: 'Build stage: Active Partner', where: 'CRM → Pipelines', detail: 'Paid and onboarding started — Trigger onboarding sequence', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 164, name: 'Build stage: Disqualified/Nurture', where: 'CRM → Pipelines', detail: 'No-fit or paused — Move to 30-day nurture sequence', category: 'Partner Acquisition Pipeline', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 165, name: 'Create field: Lead Type', where: 'CRM → Custom Fields', detail: 'Dropdown: Partner Prospect / Enrolled Partner / Referral', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 166, name: 'Create field: Partner Level Interest', where: 'CRM → Custom Fields', detail: 'Dropdown: Starter / Growth / Undecided', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 167, name: 'Create field: Partner Level Enrolled', where: 'CRM → Custom Fields', detail: 'Dropdown: Starter Partner / Growth Partner / N/A', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 168, name: 'Create field: Target Market / City', where: 'CRM → Custom Fields', detail: 'Free text', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 169, name: 'Create field: Target Vertical (Primary)', where: 'CRM → Custom Fields', detail: 'Dropdown: All 12 verticals', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 170, name: 'Create field: Target Vertical (Secondary)', where: 'CRM → Custom Fields', detail: 'Dropdown: All 12 verticals', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 171, name: 'Create field: Sales Experience', where: 'CRM → Custom Fields', detail: 'Dropdown: Proven B2B / Some Sales / None', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 172, name: 'Create field: Existing Network', where: 'CRM → Custom Fields', detail: 'Dropdown: Strong / Some / None', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 173, name: 'Create field: Scorecard Total', where: 'CRM → Custom Fields', detail: 'Number: 0–100', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 174, name: 'Create field: Capital Readiness', where: 'CRM → Custom Fields', detail: 'Dropdown: Ready / Needs Time / Cannot Afford', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 175, name: 'Create field: Timeline', where: 'CRM → Custom Fields', detail: 'Dropdown: Now / 30 Days / 1–3 Months / 6+ Months', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 176, name: 'Create field: Contact Consent', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 177, name: 'Create field: Consent Channels', where: 'CRM → Custom Fields', detail: 'Checkbox: Email / Phone / SMS', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 178, name: 'Create field: Enrollment Date', where: 'CRM → Custom Fields', detail: 'Date field', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 179, name: 'Create field: Down Payment Date', where: 'CRM → Custom Fields', detail: 'Date field', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 180, name: 'Create field: Balance Due Date', where: 'CRM → Custom Fields', detail: 'Auto-calculated: Enrollment Date + 6 months', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 181, name: 'Create field: Balance Paid', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No / Overdue', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 182, name: 'Create field: Website Integration', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No / Pending', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 183, name: 'Create field: Mock-Testing Gate Passed', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No / Not Yet', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 184, name: 'Create field: Partner Activation Date', where: 'CRM → Custom Fields', detail: 'Date: When mock-testing gate passed', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 185, name: 'Create field: 30-Day Check-In', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 186, name: 'Create field: 90-Day Check-In', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 187, name: 'Create field: Clients Signed (count)', where: 'CRM → Custom Fields', detail: 'Number — Updated manually or via automation', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 188, name: 'Create field: Partner Status', where: 'CRM → Custom Fields', detail: 'Dropdown: Active / Inactive / Cancelled / Suspended', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 189, name: 'Create field: Source Channel', where: 'CRM → Custom Fields', detail: 'Dropdown: LinkedIn / Facebook / Warm Referral / In-Person / Ad / Cold Email / Other', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 190, name: 'Create field: Referral Source (name)', where: 'CRM → Custom Fields', detail: 'Free text — Who referred them', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 191, name: 'Create field: Sub-Account ID', where: 'CRM → Custom Fields', detail: 'Text — Platform sub-account ID once created', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 192, name: 'Create field: Escalation Required', where: 'CRM → Custom Fields', detail: 'Dropdown: Yes / No', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 193, name: 'Create field: Notes', where: 'CRM → Custom Fields', detail: 'Long Text — Internal notes', category: 'Partner Contact Fields', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 194, name: 'Create tag: prospect', where: 'CRM → Tags', detail: 'Applied when: Any new inquiry', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 195, name: 'Create tag: high-fit', where: 'CRM → Tags', detail: 'Applied when: Scorecard 75+', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 196, name: 'Create tag: medium-fit', where: 'CRM → Tags', detail: 'Applied when: Scorecard 55–74', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 197, name: 'Create tag: low-fit', where: 'CRM → Tags', detail: 'Applied when: Scorecard below 55', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 198, name: 'Create tag: application-sent', where: 'CRM → Tags', detail: 'Applied when: Application link delivered', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 199, name: 'Create tag: application-submitted', where: 'CRM → Tags', detail: 'Applied when: Form submitted', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 200, name: 'Create tag: enrolled-starter', where: 'CRM → Tags', detail: 'Applied when: Paid — Starter Partner', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 201, name: 'Create tag: enrolled-growth', where: 'CRM → Tags', detail: 'Applied when: Paid — Growth Partner', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 202, name: 'Create tag: balance-due', where: 'CRM → Tags', detail: 'Applied when: 30 days before 6-month balance', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 203, name: 'Create tag: balance-paid', where: 'CRM → Tags', detail: 'Applied when: Balance payment received', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 204, name: 'Create tag: balance-overdue', where: 'CRM → Tags', detail: 'Applied when: Past 6-month mark, unpaid', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 205, name: 'Create tag: mock-test-passed', where: 'CRM → Tags', detail: 'Applied when: Gate cleared', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 206, name: 'Create tag: active-partner', where: 'CRM → Tags', detail: 'Applied when: Fully activated', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 207, name: 'Create tag: first-client-closed', where: 'CRM → Tags', detail: 'Applied when: Partner closed first client', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 208, name: 'Create tag: referral-requested', where: 'CRM → Tags', detail: 'Applied when: Referral ask sent', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 209, name: 'Create tag: at-risk', where: 'CRM → Tags', detail: 'Applied when: Zero demos in 30 days — needs coaching', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 210, name: 'Create tag: cancelled', where: 'CRM → Tags', detail: 'Applied when: Left the program', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 211, name: 'Create tag: website-integration', where: 'CRM → Tags', detail: 'Applied when: Purchased $500 add-on', category: 'Partner Tags', phase: 6, priority: "High" as const, status: "Pending" as const },
  { id: 212, name: 'New Application Received workflow', where: 'Automation → Workflows', detail: 'Trigger: Form submitted → Tag application-submitted → Move stage → Notify founders SMS → Confirmation email', category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 213, name: 'Discovery Call Booked workflow', where: 'Automation → Workflows', detail: 'Trigger: Calendar appointment → Move stage → Confirmation email → tag discovery-call-booked', category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 214, name: 'Discovery Call Completed workflow', where: 'Automation → Workflows', detail: 'Stage moved → Send recap email (30 min after) → Start Day 3 follow-up sequence', category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 215, name: 'Day 3 Follow-Up workflow', where: 'Automation → Workflows', detail: "3 days after discovery call → SMS: 'Hey [Name] — any questions? lixen.ai/apply'", category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 216, name: 'Day 7 Follow-Up workflow', where: 'Automation → Workflows', detail: "7 days after call → Email: 'What's the one thing holding you back?'", category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 217, name: 'Day 14 Follow-Up workflow', where: 'Automation → Workflows', detail: "14 days after call → Email: value content — 'What's working for partners'", category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 218, name: 'Day 21 Follow-Up workflow', where: 'Automation → Workflows', detail: "21 days after call → Email: 'Should I keep following up?' + founder task", category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 219, name: 'Application Not Submitted — 24hr workflow', where: 'Automation → Workflows', detail: '24hrs after link sent → SMS reminder + lixen.ai/apply link', category: 'Partner Acquisition Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 220, name: 'Payment Confirmed — Starter workflow', where: 'Automation → Workflows', detail: 'Stripe payment → Tag enrolled-starter → Move to Active → Confirmation → Assets → Onboarding task', category: 'Partner Enrollment Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 221, name: 'Payment Confirmed — Growth workflow', where: 'Automation → Workflows', detail: 'Same as Starter but tag enrolled-growth', category: 'Partner Enrollment Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 222, name: 'Asset Package Delivery workflow', where: 'Automation → Workflows', detail: 'Enrollment confirmed → Email with links to all 8 documents + tool access', category: 'Partner Enrollment Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 223, name: 'Onboarding Call Reminder workflow', where: 'Automation → Workflows', detail: '24hrs before call → SMS with prep details', category: 'Partner Enrollment Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 224, name: 'Create Sub-Account Task workflow', where: 'Automation → Workflows', detail: '24hrs after enrollment → Internal task: Build partner sub-account within 48hrs', category: 'Partner Enrollment Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 225, name: '30-Day Partner Check-In workflow', where: 'Automation → Workflows', detail: "30 days after activation → Email: 'How's it going?' + booking link", category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 226, name: '90-Day Partner Review workflow', where: 'Automation → Workflows', detail: '90 days after activation → Performance review + referral ask', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 227, name: 'Balance Due — 30-Day Warning workflow', where: 'Automation → Workflows', detail: '30 days before due → Email + SMS + Tag balance-due', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 228, name: 'Balance Due — 7-Day Warning workflow', where: 'Automation → Workflows', detail: '7 days before due → SMS reminder + payment link', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 229, name: 'Balance Due — Day Of workflow', where: 'Automation → Workflows', detail: 'On due date if unpaid → Email + SMS + Tag balance-overdue + Notify founder', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 230, name: 'At-Risk Partner Alert workflow', where: 'Automation → Workflows', detail: '30 days, zero demos → URGENT task + Tag at-risk', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 231, name: 'First Client Closed workflow', where: 'Automation → Workflows', detail: 'Manually triggered → Congratulations SMS + email + Tag first-client-closed', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 232, name: 'Referral Ask workflow', where: 'Automation → Workflows', detail: '30 days after first client → Referral ask SMS to partner', category: 'Partner Retention Workflows', phase: 7, priority: "High" as const, status: "Pending" as const },
  { id: 233, name: 'Name snapshots clearly', where: 'Snapshots', detail: "Format: 'LixenAI — [Type] — v[#] — [Month Year]'", category: 'Snapshot Organization', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 234, name: 'Tag each snapshot', where: 'Snapshots', detail: 'Tags: starter, growth, demo, v1.0', category: 'Snapshot Organization', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 235, name: 'Write description for each snapshot', where: 'Snapshots', detail: "What it contains, who it's for", category: 'Snapshot Organization', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 236, name: 'Test Starter snapshot deployment', where: 'Sub-Accounts → Test', detail: 'Create blank sub-account → apply → verify all items deployed correctly', category: 'Snapshot Testing', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 237, name: 'Test Growth snapshot deployment', where: 'Sub-Accounts → Test', detail: 'Same test — verify AI features deployed correctly', category: 'Snapshot Testing', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 238, name: 'Test Demo snapshot deployment', where: 'Sub-Accounts → Test', detail: 'Verify medspa demo deploys correctly to a fresh account', category: 'Snapshot Testing', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 239, name: 'Document manual customization items', where: 'Documentation', detail: "List items that can't be pre-built (phone number, domain, logo, calendar, Stripe)", category: 'Snapshot Documentation', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 240, name: 'Create snapshot deployment checklist', where: 'Documentation', detail: 'Step-by-step: deploy snapshot → apply branding → connect phone → connect domain → connect calendar → test automations', category: 'Snapshot Documentation', phase: 8, priority: "High" as const, status: "Pending" as const },
  { id: 241, name: 'Partner enrollment report', where: 'Agency → Reporting', detail: 'New enrollments per month, by plan level, by source channel', category: 'Agency Reporting', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 242, name: 'Revenue report', where: 'Agency → Payments', detail: 'Monthly revenue from partner fees; balance collection status', category: 'Agency Reporting', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 243, name: 'Sub-account activity report', where: 'Agency → Reporting', detail: 'Which partner accounts are active vs. dormant', category: 'Agency Reporting', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 244, name: 'Partner pipeline report', where: 'Ops Account → CRM → Reports', detail: 'Stage distribution, conversion rates, average close time', category: 'Pipeline Reporting', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 245, name: 'Balance due report', where: 'Ops Account → CRM → Smart List', detail: 'All contacts where Balance Paid = No + Balance Due Date approaching', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 246, name: 'At-risk partner report', where: 'Ops Account → CRM → Smart List', detail: 'All active-partner contacts with zero demos after 30 days', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 247, name: 'Smart List: Active Partners', where: 'Ops CRM', detail: 'Filter: Partner Status = Active', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 248, name: 'Smart List: Balance Due This Month', where: 'Ops CRM', detail: 'Balance Due Date = this month AND Balance Paid = No', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 249, name: 'Smart List: Balance Overdue', where: 'Ops CRM', detail: 'Balance Due Date < today AND Balance Paid = No', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 250, name: 'Smart List: High-Fit Prospects', where: 'Ops CRM', detail: 'Scorecard ≥ 75 AND Stage not Enrolled/Disqualified', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 251, name: 'Smart List: Stalled Applications', where: 'Ops CRM', detail: 'Application Submitted = Yes AND Stage = Application Submitted AND last activity > 48 hours', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 252, name: 'Smart List: At-Risk Partners', where: 'Ops CRM', detail: 'Tag = at-risk', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 253, name: 'Smart List: First Client Not Yet Closed', where: 'Ops CRM', detail: 'Tag = active-partner AND Tag ≠ first-client-closed AND Activation Date > 90 days ago', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 254, name: 'Smart List: Website Integration Upsell', where: 'Ops CRM', detail: 'Tag = enrolled-starter OR enrolled-growth AND Tag ≠ website-integration', category: 'Smart Lists', phase: 9, priority: "Medium" as const, status: "Pending" as const },
  { id: 255, name: 'Stripe integration verification', where: 'Settings → Payments', detail: 'Partner billing — done in Phase 2, verify still active', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 256, name: 'Google OAuth integration', where: 'Settings → Integrations', detail: 'Calendar sync, Gmail sending, Google Ads tracking', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 257, name: 'Google Analytics setup', where: 'Settings → Integrations', detail: 'Traffic tracking on lixen.ai and medspa.lixen.ai', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 258, name: 'Google Ads conversion tracking', where: 'Google Ads', detail: 'Verify AW-17973733809 conversion actions connected', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 259, name: 'Facebook/Meta integration', where: 'Settings → Integrations', detail: 'Social lead capture and partner ad campaigns', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 260, name: 'LinkedIn integration', where: 'Settings → Integrations', detail: 'Recruitment ad campaign tracking', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 261, name: 'Apollo.io visitor identification', where: 'Apollo.io dashboard', detail: 'Visitor identification on medspa.lixen.ai — already active', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Completed" as const },
  { id: 262, name: 'Leadsy.ai lead tracking', where: 'Leadsy.ai dashboard', detail: 'Lead tracking — confirm script is active', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 263, name: 'Zapier integration (optional)', where: 'Settings → Integrations', detail: 'External tool connections for workflow gaps', category: 'Core Integrations', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 264, name: 'Review installed marketplace apps', where: 'Settings → Marketplace', detail: 'Confirm only needed apps are active — remove unused', category: 'Marketplace Apps', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 265, name: 'Confirm AI tools enabled at agency level', where: 'Settings → AI Tools', detail: 'Ask AI, Content AI, etc. enabled for partner accounts', category: 'Marketplace Apps', phase: 10, priority: "Medium" as const, status: "Pending" as const },
  { id: 266, name: 'Document management / e-signature', where: 'Settings → Marketplace', detail: 'For agreement signing if not using external tool', category: 'Marketplace Apps', phase: 10, priority: "Medium" as const, status: "Pending" as const },
];

export default function BuildTracker() {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const stats = useMemo(() => {
    const phaseTasks = allTasks.filter(t => t.phase === activePhase);
    return {
      total: phaseTasks.length,
      completed: phaseTasks.filter(t => t.status === 'Completed').length,
      inProgress: phaseTasks.filter(t => t.status === 'In Progress').length,
      pending: phaseTasks.filter(t => t.status === 'Pending').length,
      critical: phaseTasks.filter(t => t.priority === 'Critical').length,
    };
  }, [activePhase]);

  const overallStats = useMemo(() => ({
    total: allTasks.length,
    completed: allTasks.filter(t => t.status === 'Completed').length,
    pending: allTasks.filter(t => t.status === 'Pending').length,
    critical: allTasks.filter(t => t.priority === 'Critical').length,
  }), []);

  const filteredTasks = useMemo(() => {
    let tasks = allTasks.filter(t => t.phase === activePhase);
    if (statusFilter !== 'All') tasks = tasks.filter(t => t.status === statusFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      tasks = tasks.filter(t => t.name.toLowerCase().includes(q) || t.where.toLowerCase().includes(q) || t.detail.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    return tasks;
  }, [activePhase, statusFilter, searchQuery]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    for (const t of filteredTasks) {
      if (!groups[t.category]) groups[t.category] = [];
      groups[t.category].push(t);
    }
    return groups;
  }, [filteredTasks]);

  const completionPercent = Math.round((overallStats.completed / overallStats.total) * 100);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#F0F4FA]">Agency HQ Build List</h1>
          <p className="text-sm text-[#7B93B5] mt-1">Complete build tasks across 10 phases — {overallStats.total} total items</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#0C2D5A] flex items-center justify-center border border-[#1A3358]">
            <span className="text-sm font-bold text-[#5BB8FF]">{completionPercent}%</span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Tasks', value: overallStats.total, icon: ListChecks, color: '#5BB8FF' },
          { label: 'Completed', value: overallStats.completed, icon: CheckCircle2, color: '#4ADE80' },
          { label: 'Pending', value: overallStats.pending, icon: Clock, color: '#7B93B5' },
          { label: 'Critical', value: overallStats.critical, icon: AlertTriangle, color: '#F87171' },
          { label: 'In Progress', value: allTasks.filter(t => t.status === 'In Progress').length, icon: Wrench, color: '#FACC15' },
          { label: 'Completion', value: `${completionPercent}%`, icon: Filter, color: '#1A6FD4' },
        ].map(s => (
          <div key={s.label} className="bg-[#0B1D35] rounded-xl p-4 border border-[#1A3358]">
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: s.color }} />
              <span className="text-xs text-[#7B93B5]">{s.label}</span>
            </div>
            <div className="text-xl font-bold text-[#F0F4FA]" style={{ fontFamily: 'var(--font-mono)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Phase Navigation */}
      <div className="flex flex-wrap gap-2">
        {phaseInfo.map(p => (
          <button
            key={p.num}
            onClick={() => setActivePhase(p.num)}
            className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
              activePhase === p.num
                ? 'bg-[#1A6FD4] text-white border-[#1A6FD4]'
                : 'bg-[#0B1D35] text-[#7B93B5] border-[#1A3358] hover:text-[#F0F4FA] hover:border-[#243D66]'
            }`}
          >
            <span className="mr-1.5 opacity-70">P{p.num}</span>
            <span>{p.name}</span>
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded ${
              p.priority === 'Critical' ? 'bg-[#F87171]/20 text-[#F87171]' :
              p.priority === 'High' ? 'bg-[#FACC15]/20 text-[#FACC15]' : 'bg-[#5BB8FF]/20 text-[#5BB8FF]'
            }`}>{p.priority}</span>
          </button>
        ))}
      </div>

      {/* Phase Stats + Filters */}
      <div className="bg-[#0B1D35] rounded-xl border border-[#1A3358] p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[#F0F4FA]">Phase {activePhase}: {phaseInfo[activePhase-1].name}</h3>
            <p className="text-xs text-[#7B93B5] mt-0.5">{stats.total} tasks · {stats.completed} completed · {stats.pending} pending · {stats.critical} critical</p>
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Completed', 'In Progress', 'Pending'].map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  statusFilter === f ? 'bg-[#1A6FD4] text-white border-[#1A6FD4]' : 'bg-[#0F2440] text-[#7B93B5] border-[#1A3358] hover:border-[#243D66]'
                }`}>{f}</button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A6080]" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search tasks by name, location, or detail..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0F2440] border border-[#1A3358] text-sm text-[#F0F4FA] placeholder-[#4A6080] focus:outline-none focus:border-[#1A6FD4] transition-colors" />
        </div>

        {/* Task Table */}
        <div className="space-y-4">
          {Object.entries(groupedByCategory).map(([category, tasks]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#5BB8FF] uppercase tracking-wider mb-2 px-1">{category}</h4>
              <div className="space-y-1">
                {tasks.map(task => (
                  <div key={task.id} className="rounded-lg border border-[#1A3358] overflow-hidden">
                    <button onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-[#0F2440] hover:bg-[#0a1f3a] transition-colors text-left">
                      <span className="text-xs font-mono text-[#4A6080] w-8 flex-shrink-0">#{task.id}</span>
                      <span className="flex-1 text-sm text-[#F0F4FA] font-medium truncate">{task.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${priorityColor[task.priority]}`}>{task.priority}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${statusColor[task.status]}`}>{task.status}</span>
                      {expandedTask === task.id ? <ChevronUp className="w-4 h-4 text-[#4A6080]" /> : <ChevronDown className="w-4 h-4 text-[#4A6080]" />}
                    </button>
                    <AnimatePresence>
                      {expandedTask === task.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                          <div className="px-4 py-3 bg-[#060E1A] border-t border-[#1A3358] space-y-2">
                            <div>
                              <span className="text-xs font-semibold text-[#7B93B5] uppercase">Where</span>
                              <p className="text-sm text-[#F0F4FA] mt-0.5">{task.where}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-[#7B93B5] uppercase">Detail</span>
                              <p className="text-sm text-[#B8C8E0] mt-0.5">{task.detail}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {filteredTasks.length === 0 && (
            <div className="text-center py-8 text-[#4A6080]">No tasks match your filters.</div>
          )}
        </div>
      </div>

      {/* Go/No-Go Checklist */}
      <div className="bg-[#0C2D5A]/30 rounded-xl border border-[#1A6FD4]/30 p-5">
        <h3 className="text-base font-semibold text-[#F0F4FA] mb-1 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#FACC15]" /> Minimum Viable Build — Go/No-Go Gates
        </h3>
        <p className="text-xs text-[#7B93B5] mb-4">All gates must be complete before first partner enrollment.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { phase: 1, label: "Phase 1: Foundation & Profile", desc: "Agency branding, white-label, permissions" },
            { phase: 2, label: "Phase 2: SaaS Mode & Billing", desc: "Stripe live, payment links tested" },
            { phase: 3, label: "Phase 3: Snapshots Deployable", desc: "Starter or Growth snapshot ready + Demo" },
            { phase: 4, label: "Phase 4: Email Auth Verified", desc: "SPF, DKIM, DMARC all green" },
            { phase: 6, label: "Phase 6: Pipeline Built", desc: "All stages + fields + tags configured" },
            { phase: 7, label: "Phase 7: Core Workflows Live", desc: "Enrollment, assets, onboarding, balance due" },
          ].map(gate => (
            <div key={gate.phase} className="bg-[#0B1D35] rounded-lg p-3 border border-[#1A3358]">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-[#FACC15] flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#FACC15]" />
                </div>
                <span className="text-sm font-medium text-[#F0F4FA]">{gate.label}</span>
              </div>
              <p className="text-xs text-[#7B93B5] mt-1 ml-7">{gate.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}