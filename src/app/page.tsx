import Link from "next/link";
import {
  BarChart3,
  FileSpreadsheet,
  Landmark,
  Users,
  Wrench,
  FileText,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileSpreadsheet,
    title: "CSV & Bank Import",
    description:
      "Upload spreadsheets or connect bank feeds. AI auto-categorizes every transaction to the right property.",
  },
  {
    icon: BarChart3,
    title: "Live Property P&L",
    description:
      "Per-property profit & loss, cash-on-cash return, and vacancy rate — recalculated automatically each month.",
  },
  {
    icon: Users,
    title: "Tenant Ledger",
    description:
      "Track rent due, paid, and overdue. One-click SMS and email reminder drafts for late tenants.",
  },
  {
    icon: Wrench,
    title: "Maintenance Log",
    description:
      "Link repair costs directly to expense records so maintenance flows into your property P&L instantly.",
  },
  {
    icon: FileText,
    title: "AI Monthly Reports",
    description:
      "Plain-English PDF owner reports summarizing portfolio health and flagging underperforming properties.",
  },
  {
    icon: Landmark,
    title: "Portfolio Overview",
    description:
      "See which properties generate cash flow vs. costing you money — all in one unified dashboard.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: 29,
    properties: "Up to 5 properties",
    features: ["CSV import", "Bank feed (1 account)", "Tenant ledger", "Monthly P&L", "Email reminders"],
    cta: "Start with Starter",
    popular: false,
  },
  {
    name: "Growth",
    price: 59,
    properties: "Up to 20 properties",
    features: [
      "Everything in Starter",
      "Unlimited bank feeds",
      "Maintenance log",
      "AI monthly reports",
      "SMS reminders",
    ],
    cta: "Start with Growth",
    popular: true,
  },
  {
    name: "Portfolio",
    price: 99,
    properties: "Unlimited properties",
    features: [
      "Everything in Growth",
      "Multi-user access",
      "Priority support",
      "Custom report branding",
      "API access",
    ],
    cta: "Start with Portfolio",
    popular: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
            <Sparkles className="h-4 w-4" />
            AI-powered landlord financial dashboard
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
            Stop juggling spreadsheets.
            <br />
            <span className="text-gradient">See live property P&L.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            RentLens turns scattered landlord spreadsheets and bank transactions into a unified
            dashboard with per-property P&L, tenant tracking, and AI-generated monthly reports.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-lg font-semibold text-white shadow-glow transition hover:bg-brand-600"
            >
              Explore Live Demo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-8 py-4 text-lg font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              How we found this idea
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Properties tracked", value: "2–20" },
              { label: "Setup time", value: "< 30 min" },
              { label: "Monthly reports", value: "Automated" },
              { label: "Validation score", value: "114/130" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl p-4">
                <p className="font-display text-2xl font-bold text-brand-400">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Everything landlords need in one place
            </h2>
            <p className="mt-4 text-slate-400">
              Built for independent landlords managing 2–20 rental properties.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-white/10 bg-surface-900 p-6 transition hover:border-brand-500/30 hover:shadow-glow"
              >
                <div className="mb-4 inline-flex rounded-lg bg-brand-500/10 p-3">
                  <feature.icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Simple, property-based pricing
            </h2>
            <p className="mt-4 text-slate-400">Flat monthly subscription. No per-transaction fees.</p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl border p-8 ${
                  tier.popular
                    ? "border-brand-500/50 bg-brand-500/5 shadow-glow"
                    : "border-white/10 bg-surface-800"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-white">{tier.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{tier.properties}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold text-white">${tier.price}</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <ul className="mt-8 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="h-4 w-4 shrink-0 text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`mt-8 block w-full rounded-lg py-3 text-center text-sm font-semibold transition ${
                    tier.popular
                      ? "bg-brand-500 text-white hover:bg-brand-600"
                      : "border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-surface-800/50 py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            See RentLens in action
          </h2>
          <p className="mt-4 text-slate-400">
            Explore the fully interactive demo with realistic portfolio data — import wizard, bank
            feeds, tenant ledger, maintenance log, and AI reports.
          </p>
          <Link
            href="/demo"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-8 py-4 text-lg font-semibold text-white shadow-glow transition hover:bg-brand-600"
          >
            Launch Interactive Demo
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
