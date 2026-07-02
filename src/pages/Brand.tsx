import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Type,
  BookOpen,
  MessageSquare,
  Heart,
  Shield,
  ChevronRight,
  Copy,
  Check,
  Layers,
  Sparkles,
  Mic,
} from 'lucide-react';

/* ─── Brand data ─── */
const colors = [
  { name: 'Navy Deep', hex: '#0C2D5A', usage: 'Primary brand dark backgrounds' },
  { name: 'Primary Blue', hex: '#1A6FD4', usage: 'Primary buttons, links, accents' },
  { name: 'Soft Neon', hex: '#5BB8FF', usage: 'Highlights, gradients, glow effects' },
  { name: 'Background', hex: '#060E1A', usage: 'App background' },
  { name: 'Surface', hex: '#0B1D35', usage: 'Card backgrounds, nav' },
  { name: 'Border', hex: '#1A3358', usage: 'Card borders, dividers' },
  { name: 'Text Primary', hex: '#F0F4FA', usage: 'Headings, primary text' },
  { name: 'Text Secondary', hex: '#7B93B5', usage: 'Body text, descriptions' },
  { name: 'Success', hex: '#4ADE80', usage: 'Positive indicators' },
  { name: 'Danger', hex: '#F87171', usage: 'Errors, warnings' },
];

const typography = {
  heading: { font: 'Geist', weights: '400, 500, 600, 700', usage: 'Headings, navigation, labels' },
  body: { font: 'Geist', weights: '400, 500', usage: 'Body text, descriptions' },
  mono: { font: 'JetBrains Mono', weights: '400, 500', usage: 'Code, data values, tags' },
};

const voiceGuidelines = [
  { title: 'Professional but Approachable', description: 'Confident expertise without being cold. Use "we" and "you" to create connection.', icon: MessageSquare },
  { title: 'AI-Forward', description: 'Lead with AI capabilities. Frame automation as a competitive advantage.', icon: Sparkles },
  { title: 'Results-Focused', description: 'Always tie features to outcomes. "Save 10+ hours/week" beats "automation included."', icon: Heart },
  { title: 'Local Business Empathy', description: 'Understand their struggles. Reference specific pain points (missed calls, no-shows).', icon: Shield },
  { title: 'Clear & Direct', description: 'No jargon without explanation. If you say "API" or "webhook", explain what it does.', icon: Type },
  { title: 'Action-Oriented', description: 'End sections with next steps. Every page should guide toward a decision.', icon: ChevronRight },
];

const messagingTemplates = [
  {
    category: 'Discovery',
    templates: [
      { label: 'Cold Outreach — LinkedIn', text: 'Hi [Name], I help [vertical] owners like you stop losing leads to missed calls and slow follow-up. Our AI system handles it 24/7. Worth a 10-min chat?' },
      { label: 'Cold Outreach — Email', text: 'Subject: 10 hours back every week\\nHi [Name],\\n\\nWhat if every missed call got an instant text back? Every lead got followed up within 2 minutes?\\n\\nThat is what we build for [vertical] businesses. No complex setup — we handle everything.\\n\\nWorth 10 minutes to see how it works for [Company]?' },
      { label: 'Warm Referral', text: 'Hi [Name], [Referrer] mentioned you are looking to streamline [Company] lead management. We help [vertical] businesses automate follow-up, booking, and reviews with AI. Happy to show you what we built for similar businesses.' },
    ],
  },
  {
    category: 'Demo Follow-Up',
    templates: [
      { label: 'Same Day', text: 'Hi [Name], thanks for your time today. Loved learning about [Company]. Attached the custom plan we discussed — [specific feature] alone should save you [estimated hours] per week. Ready when you are.' },
      { label: '3 Days No Response', text: 'Hi [Name], quick question — what is the one thing holding you back from moving forward? Happy to address it directly or loop in our team. No pressure, just want to make sure you have what you need.' },
      { label: '1 Week', text: 'Hi [Name], still thinking it over? Totally understand — it is a decision that affects your whole operation. I have attached a case study from a [similar vertical] business that saw [specific result] in their first 30 days. Happy to discuss anytime.' },
    ],
  },
  {
    category: 'Closing',
    templates: [
      { label: 'Proposal Sent', text: 'Hi [Name], your custom proposal is ready. Everything we discussed is included, and I have added [bonus/upgrade] as a welcome gift. Let me know if you have questions — I am here to make this easy.' },
      { label: 'Final Follow-Up', text: 'Hi [Name], I do not want to be the person who follows up forever. So this is my last nudge — your proposal expires [date], and I would hate for [Company] to miss out on getting [key benefit] set up before [relevant event/season]. If it is a no for now, just say so and I will check back in a few months. Either way, thanks for considering us.' },
    ],
  },
];

/* ─── Color swatch ─── */
function ColorSwatch({ color }: { color: typeof colors[0] }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleCopy} className="group relative overflow-hidden rounded-xl border border-border-custom bg-surface hover:border-border-light transition-all">
      <div className="h-20 w-full" style={{ backgroundColor: color.hex }} />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-text-primary">{color.name}</p>
          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
        <p className="text-xs font-mono text-soft-neon mt-0.5">{color.hex}</p>
        <p className="text-[10px] text-text-secondary mt-1">{color.usage}</p>
      </div>
    </button>
  );
}

/* ─── Template card ─── */
function TemplateCard({ template }: { template: { label: string; text: string } }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(template.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-4 bg-surface-elevated rounded-lg border border-border-custom">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-soft-neon">{template.label}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-text-secondary hover:text-text-primary transition-colors">
          {copied ? <><Check size={12} className="text-success" /> Copied</> : <><Copy size={12} /> Copy</>}
        </button>
      </div>
      <p className="text-sm text-[#B8C8E0] whitespace-pre-line leading-relaxed">{template.text}</p>
    </div>
  );
}

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Brand() {
  const [activeSection, setActiveSection] = useState('colors');

  const sections = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'voice', label: 'Voice & Tone', icon: Mic },
    { id: 'messaging', label: 'Messaging', icon: MessageSquare },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-[28px] font-bold text-text-primary tracking-[-0.02em]">Brand & Voice</h1>
        <p className="text-sm text-text-secondary mt-0.5">Brand guidelines, voice rules, and messaging templates</p>
      </motion.div>

      {/* Section Tabs */}
      <motion.div variants={item} className="flex gap-2 p-1 bg-surface rounded-xl w-fit border border-border-custom">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              activeSection === section.id ? 'text-white' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {activeSection === section.id && (
              <motion.div layoutId="brandTab" className="absolute inset-0 bg-primary-blue rounded-lg" transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }} />
            )}
            <section.icon size={16} className="relative z-10" />
            <span className="relative z-10">{section.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeSection === 'colors' && (
          <motion.div key="colors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {colors.map((color) => (
                <ColorSwatch key={color.hex} color={color} />
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'typography' && (
          <motion.div key="typography" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-4">
            {Object.entries(typography).map(([key, t]) => (
              <div key={key} className="bg-surface rounded-xl border border-border-custom p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Layers size={18} className="text-soft-neon" />
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary capitalize">{key} Font</h3>
                    <p className="text-xs text-text-secondary">{t.usage}</p>
                  </div>
                </div>
                <div className="p-4 bg-surface-elevated rounded-lg border border-border-custom">
                  <p className="text-2xl text-text-primary mb-1" style={{ fontFamily: key === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)' }}>
                    {t.font} — Aa Bb Cc 123
                  </p>
                  <p className="text-xs text-text-secondary">Weights: {t.weights}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSection === 'voice' && (
          <motion.div key="voice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-3">
            {voiceGuidelines.map((g) => (
              <div key={g.title} className="bg-surface rounded-xl border border-border-custom p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#0C2D5A] flex items-center justify-center shrink-0">
                  <g.icon size={18} className="text-soft-neon" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{g.title}</h3>
                  <p className="text-sm text-[#B8C8E0] mt-1">{g.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeSection === 'messaging' && (
          <motion.div key="messaging" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="space-y-6">
            {messagingTemplates.map((category) => (
              <div key={category.category}>
                <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
                  <BookOpen size={16} className="text-soft-neon" />
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.templates.map((t) => (
                    <TemplateCard key={t.label} template={t} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}