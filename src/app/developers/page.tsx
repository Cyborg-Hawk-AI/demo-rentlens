import type { Metadata } from "next";
import Link from "next/link";
import {
  FileSpreadsheet,
  BarChart3,
  Users,
  Wrench,
  FileText,
  ArrowRight,
  Code2,
  Database,
  Cloud,
  Bot,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Developer Docs — RentLens",
  description: "Feature documentation for the RentLens interactive demo.",
};

const features = [
  {
    icon: FileSpreadsheet,
    name: "CSV Import Wizard & Bank Feed",
    location: "/demo → Import & Bank tab",
    interactions: [
      "3-step wizard: choose CSV or bank, map columns / connect Plaid, review & import",
      "Upload file button shows toast confirmation",
      "Column mapping dropdowns update in real time",
      "Bank connect checkbox + Connect Accounts button",
      "Import/Sync button completes wizard with success toast",
      "Recent imports list with status badges",
    ],
    mocked: [
      "File upload is simulated (Q2_expenses.xlsx hardcoded)",
      "Plaid OAuth flow replaced with checkbox UI",
      "No actual file parsing or bank API calls",
      "AI categorization preview uses static transaction data",
    ],
    production: [
      "Papa Parse / SheetJS for CSV/XLSX parsing",
      "Plaid Link for bank OAuth + webhook-driven sync",
      "Supabase transactions table with property_id FK",
      "Fine-tuned LLaMA classifier for auto-categorization",
      "BullMQ job queue for batch import processing",
    ],
  },
  {
    icon: BarChart3,
    name: "Per-Property P&L & KPIs",
    location: "/demo → Overview tab",
    interactions: [
      "Portfolio KPI cards (net income, vacancy, CoC, overdue rent)",
      "P&L trend area chart (6 months)",
      "Property filter dropdown changes chart scope",
      "Per-property cards with status badges (performing/watch/underperforming)",
      "View P&L Detail button on each property card",
    ],
    mocked: [
      "All KPI values are hardcoded in mock-data.ts",
      "Charts use static monthlyPnL array",
      "Property filter doesn't change chart data (visual only in demo)",
      "P&L detail opens toast instead of sub-page",
    ],
    production: [
      "Monthly cron aggregates transactions per property",
      "CoC = (annual net income / cash invested) × 100",
      "Vacancy = vacant units / total units from lease table",
      "Recharts fed by Supabase materialized view refreshed nightly",
      "Status thresholds configurable per landlord",
    ],
  },
  {
    icon: FileSpreadsheet,
    name: "Transaction Categorization",
    location: "/demo → Transactions tab",
    interactions: [
      "Search box filters by description",
      "Property and status filter dropdowns",
      "Auto-Categorize button triggers AI toast",
      "Each row has Categorize/Edit action opening modal",
      "Modal: property + category dropdowns, Save button",
    ],
    mocked: [
      "Filters work client-side on static array",
      "Save doesn't persist — modal closes with toast",
      "Auto-categorize is a toast, not real AI",
    ],
    production: [
      "Full-text search via Postgres tsvector",
      "AI classifier with landlord-specific rules engine",
      "Manual override writes to transactions + audit log",
      "Categorized transactions trigger P&L recalculation",
    ],
  },
  {
    icon: Users,
    name: "Tenant Ledger & Reminders",
    location: "/demo → Tenant Ledger tab",
    interactions: [
      "Status filter pills: all, paid, due, overdue, partial",
      "Email/SMS icons on overdue/partial tenants",
      "Reminder modal with email/SMS toggle and AI-drafted content",
      "Save Draft and Send Now buttons",
      "Eye icon opens tenant ledger toast",
    ],
    mocked: [
      "9 tenants with realistic names, amounts, statuses",
      "Reminder drafts are template strings, not LLM-generated",
      "Send Now shows toast — no Twilio/SendGrid",
      "Vacant units shown as tenant rows",
    ],
    production: [
      "Lease terms table with rent amount, due day, contact info",
      "Daily cron checks payment status vs. bank deposits",
      "LLM generates personalized reminder with landlord tone",
      "Twilio SMS + SendGrid email with opt-out compliance",
      "Payment matching via amount + tenant name fuzzy match",
    ],
  },
  {
    icon: Wrench,
    name: "Maintenance Log",
    location: "/demo → Maintenance tab",
    interactions: [
      "Status filter: all, completed, in_progress, scheduled",
      "Click any item to open detail modal",
      "Mark Complete & Link Expense button",
      "Add Item button opens creation form",
      "Expense link badges show P&L connection",
    ],
    mocked: [
      "6 maintenance items with vendor, cost, notes",
      "Expense IDs reference transaction mock IDs",
      "Add form doesn't persist new items",
      "Complete action shows toast only",
    ],
    production: [
      "maintenance table with expense_id FK to transactions",
      "On complete: create expense transaction if not linked",
      "Cost auto-flows to property P&L Maintenance category",
      "Vendor directory with contact info and history",
      "Photo attachments via S3",
    ],
  },
  {
    icon: FileText,
    name: "AI Monthly Owner Reports",
    location: "/demo → AI Reports tab",
    interactions: [
      "Month selector dropdown",
      "Generate Report button with 2s loading state",
      "View Last Report opens preview modal",
      "Property comparison bar chart",
      "Report history with view/download actions",
      "Preview modal: summary, highlights, underperformers, PDF/email buttons",
    ],
    mocked: [
      "Report narrative is hardcoded in reportPreview object",
      "PDF download is a toast — no actual file generated",
      "Generate simulates 2s delay then opens preview",
      "Bar chart uses static property netIncome values",
    ],
    production: [
      "Self-hosted LLaMA ingests KPIs + transactions + tenant status",
      "Puppeteer renders HTML template to PDF",
      "Agent runs 1st of month: pull data → generate → email",
      "Reports stored in S3 with signed download URLs",
      "Underperformer detection via configurable CoC/vacancy thresholds",
    ],
  },
];

const architecture = [
  { icon: Cloud, label: "Frontend", value: "Next.js 14 App Router on Vercel" },
  { icon: Database, label: "Database", value: "Supabase (Postgres + RLS)" },
  { icon: Bot, label: "AI Layer", value: "Self-hosted LLaMA for categorization + reports" },
  { icon: Code2, label: "Integrations", value: "Plaid (bank), Twilio (SMS), SendGrid (email)" },
];

export default function DevelopersPage() {
  return (
    <div className="bg-surface-900">
      <div className="border-b border-white/10 bg-surface-800/50">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-white">Developer Documentation</h1>
          <p className="mt-4 text-slate-400">
            Every feature in the interactive demo, what&apos;s mocked, and how it would work in production.
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Open Interactive Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Architecture */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white">Intended Architecture</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {architecture.map((item) => (
              <div key={item.label} className="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-800 p-4">
                <item.icon className="mt-0.5 h-5 w-5 text-brand-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-sm text-slate-400">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEV NOTE callout */}
        <div className="mb-12 rounded-xl border border-brand-500/30 bg-brand-500/5 p-4">
          <p className="text-sm text-brand-300">
            <strong>DEV NOTE tooltips</strong> — In the demo, look for the{" "}
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-xs text-brand-400">
              i
            </span>{" "}
            icon beside major controls. Click to see production implementation notes inline.
          </p>
        </div>

        {/* Feature docs */}
        <div className="space-y-12">
          {features.map((feature, i) => (
            <section key={feature.name} className="rounded-2xl border border-white/10 bg-surface-800 p-8">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-brand-500/10 p-2">
                  <feature.icon className="h-6 w-6 text-brand-400" />
                </div>
                <div>
                  <span className="text-xs font-medium text-brand-400">Feature {i + 1}</span>
                  <h3 className="text-xl font-semibold text-white">{feature.name}</h3>
                </div>
              </div>

              <div className="mt-2">
                <Link href="/demo" className="text-sm text-brand-400 hover:underline">
                  {feature.location} →
                </Link>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Try it (interactions)
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {feature.interactions.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-500/80">
                    Mocked in demo
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {feature.mocked.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-400/80">
                    Production plan
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {feature.production.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Data flow */}
        <section className="mt-16 rounded-2xl border border-white/10 bg-surface-800 p-8">
          <h2 className="font-display text-2xl font-bold text-white">Monthly Automation Flow</h2>
          <p className="mt-2 text-sm text-slate-400">
            The agentic automation plan for production (runs 1st of each month):
          </p>
          <ol className="mt-6 space-y-4">
            {[
              "Pull new bank transactions via Plaid webhook + nightly sync",
              "AI categorizes transactions and assigns to properties",
              "Compute per-property P&L, CoC, and vacancy rate",
              "Check tenant payment status, draft overdue reminders",
              "Link completed maintenance costs to expense records",
              "Generate plain-English PDF owner report via LLaMA",
              "Email report to landlord — zero manual steps",
            ].map((step, i) => (
              <li key={step} className="flex gap-4 text-sm text-slate-300">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-400">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
