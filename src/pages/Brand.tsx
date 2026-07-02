import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";

// ─── Brand Colors ───
const brandColors = [
  { name: "Navy Deep", hex: "#0C2D5A", usage: "Primary backgrounds, navbars" },
  { name: "Primary Blue", hex: "#1A6FD4", usage: "Primary buttons, links, CTAs" },
  { name: "Soft Neon", hex: "#5BB8FF", usage: "Accents, highlights, hovers" },
  { name: "Dark Surface", hex: "#0B1D35", usage: "Cards, panels, surfaces" },
  { name: "Light Text", hex: "#F0F4FA", usage: "Primary text on dark" },
  { name: "Muted Text", hex: "#7B8DA8", usage: "Secondary text, labels" },
  { name: "Border", hex: "#1A3358", usage: "Dividers, card borders" },
  { name: "Success", hex: "#2DD4A8", usage: "Success states, completed" },
  { name: "Warning", hex: "#F59E0B", usage: "Warning states, pending" },
  { name: "Error", hex: "#EF4444", usage: "Error states, critical" },
];

// ─── Typography Specimens ───
const typography = [
  { name: "Display", size: "48px / 3rem", weight: "700", lineHeight: "1.1" },
  { name: "H1", size: "36px / 2.25rem", weight: "700", lineHeight: "1.2" },
  { name: "H2", size: "28px / 1.75rem", weight: "600", lineHeight: "1.25" },
  { name: "H3", size: "22px / 1.375rem", weight: "600", lineHeight: "1.3" },
  { name: "Body Large", size: "18px / 1.125rem", weight: "400", lineHeight: "1.6" },
  { name: "Body", size: "15px / 0.9375rem", weight: "400", lineHeight: "1.6" },
  { name: "Caption", size: "13px / 0.8125rem", weight: "500", lineHeight: "1.5" },
  { name: "Label", size: "12px / 0.75rem", weight: "600", lineHeight: "1.4" },
];

// ─── Voice Rules ───
const voiceDo = [
  "Use clear, direct language that respects the reader's time",
  "Lead with outcomes and benefits, not features",
  "Use 'you' and 'your' when addressing customers",
  "Use active voice — 'we build' not 'is built by us'",
  "Be confident but not arrogant",
  "Use data and specifics to build credibility",
];

const voiceDont = [
  "Don't use jargon or buzzwords without explanation",
  "Don't be overly casual or use slang",
  "Don't make promises we can't keep",
  "Don't use passive voice or hedge unnecessarily",
  "Don't use all caps for emphasis",
  "Don't use more than 2 emojis in any communication",
];

// ─── Channel Voice ───
const channelVoice = [
  { channel: "Website", tone: "Professional, confident, outcome-focused", example: "Grow your practice with AI-powered automation." },
  { channel: "Email", tone: "Warm, personal, value-first", example: "Hi [Name], here's how practices like yours are saving 10+ hours per week." },
  { channel: "Social Media", tone: "Engaging, concise, visual", example: "10 hours saved. 0 coding required. See how AI transforms your workflow." },
  { channel: "Sales Calls", tone: "Consultative, curious, confident", example: "What would change for your team if follow-ups happened automatically?" },
  { channel: "Support", tone: "Empathetic, clear, solution-oriented", example: "I understand how important this is. Let me resolve this for you right away." },
  { channel: "Internal", tone: "Direct, transparent, collaborative", example: "Here's what we shipped this week and what's next." },
];

// ─── Toast Hook ───
function useToast() {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const showToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2000);
  };
  return { toasts, showToast };
}

export default function Brand() {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "voice" | "identity">("colors");
  const { toasts, showToast } = useToast();

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    showToast(`Copied ${hex}`);
  };

  const tabs = [
    { key: "colors" as const, label: "Colors" },
    { key: "typography" as const, label: "Typography" },
    { key: "voice" as const, label: "Voice & Tone" },
    { key: "identity" as const, label: "Visual Identity" },
  ];

  return (
    <div className="min-h-screen bg-slate-1 p-6 lg:p-8">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="bg-slate-3 border border-slate-6 text-slate-12 px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-sm"
            >
              <Check className="w-4 h-4 text-green-10" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-12 mb-2">Brand & Voice</h1>
        <p className="text-slate-11">Visual identity, typography, and communication guidelines</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-3 rounded-xl w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`relative px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab.key ? "text-slate-12" : "text-slate-11 hover:text-slate-12"
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="brandTabIndicator"
                className="absolute inset-0 bg-slate-5 rounded-lg"
                transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "colors" && (
          <motion.div
            key="colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {brandColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => copyHex(color.hex)}
                  className="group relative bg-slate-3 border border-slate-6 rounded-xl overflow-hidden hover:border-slate-8 transition-colors text-left"
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-12">{color.name}</span>
                      <Copy className="w-3.5 h-3.5 text-slate-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xs text-slate-11 font-mono mt-0.5 block">{color.hex}</span>
                    <span className="text-xs text-slate-10 mt-1 block">{color.usage}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "typography" && (
          <motion.div
            key="typography"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-3 border border-slate-6 rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-6">
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Token</th>
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Size</th>
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Weight</th>
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Line Height</th>
                    <th className="text-left text-slate-11 font-medium px-6 py-4">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {typography.map((t) => (
                    <tr key={t.name} className="border-b border-slate-6 last:border-0">
                      <td className="px-6 py-4 text-slate-12 font-medium">{t.name}</td>
                      <td className="px-6 py-4 text-slate-11 font-mono text-xs">{t.size}</td>
                      <td className="px-6 py-4 text-slate-11">{t.weight}</td>
                      <td className="px-6 py-4 text-slate-11">{t.lineHeight}</td>
                      <td
                        className="px-6 py-4 text-slate-12"
                        style={{
                          fontSize: t.size.split(" / ")[0],
                          fontWeight: t.weight,
                          lineHeight: t.lineHeight,
                        }}
                      >
                        Aa
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {activeTab === "voice" && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Do / Don't */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-3 border border-green-9/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-green-10" />
                  <h3 className="text-lg font-semibold text-slate-12">Voice Do's</h3>
                </div>
                <ul className="space-y-3">
                  {voiceDo.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-slate-11">
                      <Check className="w-4 h-4 text-green-10 flex-shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-3 border border-red-9/20 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-red-10" />
                  <h3 className="text-lg font-semibold text-slate-12">Voice Don'ts</h3>
                </div>
                <ul className="space-y-3">
                  {voiceDont.map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-slate-11">
                      <XCircle className="w-4 h-4 text-red-10 flex-shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Channel Voice */}
            <div className="bg-slate-3 border border-slate-6 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-6">
                <h3 className="text-lg font-semibold text-slate-12">Voice by Channel</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-6">
                      <th className="text-left text-slate-11 font-medium px-6 py-3 w-32">Channel</th>
                      <th className="text-left text-slate-11 font-medium px-6 py-3">Tone</th>
                      <th className="text-left text-slate-11 font-medium px-6 py-3">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelVoice.map((c) => (
                      <tr key={c.channel} className="border-b border-slate-6 last:border-0">
                        <td className="px-6 py-4 text-slate-12 font-medium">{c.channel}</td>
                        <td className="px-6 py-4 text-slate-11">{c.tone}</td>
                        <td className="px-6 py-4 text-slate-11 italic">"{c.example}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "identity" && (
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-slate-12 mb-4">Logo Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="bg-slate-1 border border-slate-6 rounded-lg p-8 flex items-center justify-center mb-3">
                      <img src="/logo-white.svg" alt="LixenAI Logo" className="h-12" />
                    </div>
                    <p className="text-xs text-slate-11">Primary logo — use on dark backgrounds</p>
                  </div>
                  <div className="text-sm text-slate-11 space-y-2">
                    <p>Always maintain clear space around the logo (minimum 16px)</p>
                    <p>Never distort, rotate, or recolor the logo</p>
                    <p>Minimum display size: 24px height</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-3 border border-slate-6 rounded-xl p-6 space-y-4">
                <h3 className="text-lg font-semibold text-slate-12">Visual Principles</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-9 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-slate-11"><span className="text-slate-12 font-medium">Clarity over decoration.</span> Every visual element should serve a purpose.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-9 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-slate-11"><span className="text-slate-12 font-medium">Consistency builds trust.</span> Use the same colors, spacing, and typography everywhere.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-9 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-slate-11"><span className="text-slate-12 font-medium">Dark-first design.</span> Our products live in dark environments. Design for dark mode first.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-9 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-slate-11"><span className="text-slate-12 font-medium">Data is visual.</span> Charts, progress, and metrics should be glanceable and beautiful.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-3 border border-slate-6 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-12 mb-4">Spacing Scale</h3>
              <div className="flex flex-wrap gap-3">
                {[4, 8, 12, 16, 20, 24, 32, 40, 48, 64].map((px) => (
                  <div key={px} className="flex flex-col items-center gap-2">
                    <div
                      className="bg-blue-9/20 border border-blue-9/30 rounded"
                      style={{ width: px, height: px }}
                    />
                    <span className="text-xs text-slate-11 font-mono">{px}px</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
