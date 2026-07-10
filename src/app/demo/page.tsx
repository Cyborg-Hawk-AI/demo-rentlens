"use client";

import { useState, useMemo } from "react";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Landmark,
  Users,
  Wrench,
  FileText,
  Bell,
  ChevronRight,
  Upload,
  Link2,
  Filter,
  Download,
  Mail,
  MessageSquare,
  Eye,
  X,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  Plus,
} from "lucide-react";
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
} from "recharts";
import { DevNote } from "@/components/DevNote";
import { ToastContainer, useToast } from "@/components/Toast";
import {
  properties,
  transactions,
  tenants,
  maintenanceItems,
  activityFeed,
  monthlyPnL,
  portfolioKPIs,
  reportPreview,
  type Property,
  type Transaction,
  type Tenant,
} from "@/lib/mock-data";

type Tab = "overview" | "import" | "transactions" | "tenants" | "maintenance" | "reports";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "import", label: "Import & Bank", icon: FileSpreadsheet },
  { id: "transactions", label: "Transactions", icon: Landmark },
  { id: "tenants", label: "Tenant Ledger", icon: Users },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "reports", label: "AI Reports", icon: FileText },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [showActivity, setShowActivity] = useState(true);
  const { toasts, addToast, dismissToast } = useToast();

  return (
    <div className="bg-surface-900">
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Demo header */}
      <div className="border-b border-white/10 bg-surface-800/50">
        <div className="mx-auto max-w-[1400px] px-6 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-white">Portfolio Dashboard</h1>
              <p className="text-sm text-slate-400">
                Marcus Rivera · 5 properties · July 2026
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addToast("Bank feed synced — 4 new transactions imported", "success");
                }}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-brand-500/30 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
                Sync Bank
                <DevNote title="Bank Feed Sync">
                  Production: Plaid Link connects landlord bank accounts. Nightly cron pulls new
                  transactions, deduplicates, and queues AI categorization per property.
                </DevNote>
              </button>
              <button
                onClick={() => setShowActivity(!showActivity)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                  showActivity
                    ? "bg-brand-500/20 text-brand-400"
                    : "border border-white/10 text-slate-300 hover:text-white"
                }`}
              >
                <Bell className="h-4 w-4" />
                Activity
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-brand-500/20 text-brand-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-6 px-6 py-6">
        <div className="min-w-0 flex-1">
          {activeTab === "overview" && (
            <OverviewTab
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              addToast={addToast}
            />
          )}
          {activeTab === "import" && <ImportTab addToast={addToast} />}
          {activeTab === "transactions" && (
            <TransactionsTab
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              addToast={addToast}
            />
          )}
          {activeTab === "tenants" && <TenantsTab addToast={addToast} />}
          {activeTab === "maintenance" && <MaintenanceTab addToast={addToast} />}
          {activeTab === "reports" && <ReportsTab addToast={addToast} />}
        </div>

        {/* Activity sidebar */}
        {showActivity && (
          <aside className="hidden w-80 shrink-0 xl:block">
            <ActivitySidebar addToast={addToast} />
          </aside>
        )}
      </div>
    </div>
  );
}

function OverviewTab({
  selectedProperty,
  setSelectedProperty,
  addToast,
}: {
  selectedProperty: string;
  setSelectedProperty: (v: string) => void;
  addToast: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  const filtered = selectedProperty === "all" ? properties : properties.filter((p) => p.id === selectedProperty);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Monthly Net Income", value: `$${portfolioKPIs.monthlyNetIncome.toLocaleString()}`, change: "+4.2%", up: true },
          { label: "Portfolio Vacancy", value: `${portfolioKPIs.portfolioVacancy}%`, change: "2 units vacant", up: false },
          { label: "Avg Cash-on-Cash", value: `${portfolioKPIs.avgCashOnCash}%`, change: "YTD avg", up: true },
          { label: "Overdue Rent", value: `$${portfolioKPIs.overdueRent.toLocaleString()}`, change: "2 tenants", up: false },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-white/10 bg-surface-800 p-4">
            <p className="text-xs text-slate-400">{kpi.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-white">{kpi.value}</p>
            <p className={`mt-1 flex items-center gap-1 text-xs ${kpi.up ? "text-brand-400" : "text-amber-400"}`}>
              {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Property filter + chart */}
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold text-white">
            Portfolio P&L Trend
            <DevNote title="Auto P&L Calculation">
              Production: Monthly job aggregates categorized transactions per property, subtracts
              mortgage/opex, computes CoC and vacancy from lease + payment data.
            </DevNote>
          </h2>
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="rounded-lg border border-white/10 bg-surface-900 px-3 py-1.5 text-sm text-slate-300"
          >
            <option value="all">All Properties</option>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPnL}>
              <defs>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#1a2234", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="net" stroke="#10b981" fill="url(#netGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property cards */}
      <div>
        <h2 className="mb-4 font-semibold text-white">Per-Property Performance</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} addToast={addToast} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property, addToast }: { property: Property; addToast: (msg: string) => void }) {
  const statusColors = {
    performing: "text-brand-400 bg-brand-500/10",
    watch: "text-amber-400 bg-amber-500/10",
    underperforming: "text-red-400 bg-red-500/10",
  };

  return (
    <div className="rounded-xl border border-white/10 bg-surface-800 p-5 transition hover:border-brand-500/20">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{property.name}</h3>
          <p className="text-xs text-slate-400">{property.address}</p>
        </div>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[property.status]}`}>
          {property.status}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-slate-500">Net Income</p>
          <p className="font-semibold text-white">${property.netIncome}/mo</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Cash-on-Cash</p>
          <p className="font-semibold text-white">{property.cashOnCash}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Vacancy</p>
          <p className="font-semibold text-white">{property.vacancyRate}%</p>
        </div>
      </div>
      <button
        onClick={() => addToast(`Opened P&L detail for ${property.name}`)}
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-white/10 py-2 text-sm text-slate-300 transition hover:border-brand-500/30 hover:text-brand-400"
      >
        View P&L Detail <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function ImportTab({ addToast }: { addToast: (msg: string, type?: "success" | "error" | "info") => void }) {
  const [wizardStep, setWizardStep] = useState(1);
  const [importType, setImportType] = useState<"csv" | "bank" | null>(null);
  const [mappedColumns, setMappedColumns] = useState({ date: "Date", amount: "Amount", description: "Description" });
  const [bankConnected, setBankConnected] = useState(false);

  const steps = ["Choose Source", "Map Columns", "Review & Import"];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <h2 className="font-semibold text-white">
          Data Import Wizard
          <DevNote title="CSV Import Wizard">
            Production: Papa Parse reads uploaded CSV/XLSX, user maps columns to schema (date,
            amount, description, property), then batch-inserts to transactions table with
            pending categorization status.
          </DevNote>
        </h2>

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  wizardStep > i + 1
                    ? "bg-brand-500 text-white"
                    : wizardStep === i + 1
                    ? "bg-brand-500/20 text-brand-400 ring-2 ring-brand-500"
                    : "bg-surface-700 text-slate-500"
                }`}
              >
                {wizardStep > i + 1 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              <span className={`text-sm ${wizardStep === i + 1 ? "text-white" : "text-slate-500"}`}>{step}</span>
              {i < steps.length - 1 && <ChevronRight className="h-4 w-4 text-slate-600" />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {wizardStep === 1 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <button
              onClick={() => { setImportType("csv"); setWizardStep(2); }}
              className={`rounded-xl border p-6 text-left transition ${
                importType === "csv" ? "border-brand-500 bg-brand-500/10" : "border-white/10 hover:border-brand-500/30"
              }`}
            >
              <Upload className="h-8 w-8 text-brand-400" />
              <h3 className="mt-3 font-semibold text-white">Upload Spreadsheet</h3>
              <p className="mt-1 text-sm text-slate-400">CSV, XLSX from QuickBooks, Stessa, or custom sheets</p>
            </button>
            <button
              onClick={() => { setImportType("bank"); setWizardStep(2); }}
              className={`rounded-xl border p-6 text-left transition ${
                importType === "bank" ? "border-brand-500 bg-brand-500/10" : "border-white/10 hover:border-brand-500/30"
              }`}
            >
              <Link2 className="h-8 w-8 text-brand-400" />
              <h3 className="mt-3 font-semibold text-white">Connect Bank Feed</h3>
              <p className="mt-1 text-sm text-slate-400">Auto-sync transactions from Chase, Wells Fargo, BofA</p>
            </button>
          </div>
        )}

        {/* Step 2 */}
        {wizardStep === 2 && importType === "csv" && (
          <div className="mt-8 space-y-4">
            <div className="rounded-lg border border-dashed border-white/20 bg-surface-900 p-8 text-center">
              <FileSpreadsheet className="mx-auto h-10 w-10 text-slate-500" />
              <p className="mt-2 text-sm text-slate-300">Q2_expenses.xlsx — 23 rows detected</p>
              <button
                onClick={() => addToast("File uploaded: Q2_expenses.xlsx (23 rows)", "info")}
                className="mt-3 rounded-lg bg-brand-500/20 px-4 py-2 text-sm text-brand-400 hover:bg-brand-500/30"
              >
                Re-upload file
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {(["date", "amount", "description"] as const).map((col) => (
                <div key={col}>
                  <label className="text-xs text-slate-400 capitalize">{col} column</label>
                  <select
                    value={mappedColumns[col]}
                    onChange={(e) => setMappedColumns({ ...mappedColumns, [col]: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300"
                  >
                    <option>Date</option>
                    <option>Amount</option>
                    <option>Description</option>
                    <option>Property</option>
                    <option>Category</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setWizardStep(1)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300">Back</button>
              <button onClick={() => setWizardStep(3)} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">Continue</button>
            </div>
          </div>
        )}

        {wizardStep === 2 && importType === "bank" && (
          <div className="mt-8 space-y-4">
            <div className="rounded-lg border border-white/10 bg-surface-900 p-6">
              <h3 className="font-semibold text-white">Connect via Plaid</h3>
              <p className="mt-1 text-sm text-slate-400">Securely link your business checking account</p>
              <div className="mt-4 space-y-2">
                {["Chase Business Checking ••••4821", "Wells Fargo Landlord ••••9034"].map((acct) => (
                  <label key={acct} className="flex items-center gap-3 rounded-lg border border-white/10 p-3">
                    <input type="checkbox" defaultChecked className="accent-brand-500" />
                    <span className="text-sm text-slate-300">{acct}</span>
                  </label>
                ))}
              </div>
              <button
                onClick={() => { setBankConnected(true); setWizardStep(3); addToast("Bank accounts connected via Plaid", "success"); }}
                className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
              >
                Connect Accounts
                <DevNote title="Plaid Bank Connection">
                  Production: Plaid Link modal handles OAuth. Access tokens stored encrypted in
                  Supabase. Webhook triggers sync on new transactions.
                </DevNote>
              </button>
            </div>
            <button onClick={() => setWizardStep(1)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300">Back</button>
          </div>
        )}

        {/* Step 3 */}
        {wizardStep === 3 && (
          <div className="mt-8 space-y-4">
            <div className="rounded-lg border border-brand-500/30 bg-brand-500/5 p-4">
              <p className="text-sm text-brand-300">
                {importType === "csv"
                  ? "Ready to import 23 transactions. AI will auto-categorize and assign to properties."
                  : bankConnected
                  ? "2 bank accounts connected. Historical sync will pull last 90 days of transactions."
                  : "Bank connection configured."}
              </p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-slate-500">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Description</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">AI Category</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((t) => (
                  <tr key={t.id} className="border-b border-white/5">
                    <td className="py-2 text-slate-400">{t.date}</td>
                    <td className="py-2 text-slate-300">{t.description}</td>
                    <td className={`py-2 ${t.amount > 0 ? "text-brand-400" : "text-red-400"}`}>
                      {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                    </td>
                    <td className="py-2 text-slate-400">{t.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-3">
              <button onClick={() => setWizardStep(2)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300">Back</button>
              <button
                onClick={() => {
                  addToast(importType === "csv" ? "23 transactions imported and queued for categorization" : "Bank sync started — 156 historical transactions found", "success");
                  setWizardStep(1);
                  setImportType(null);
                }}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
              >
                {importType === "csv" ? "Import Transactions" : "Start Sync"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent imports */}
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <h3 className="font-semibold text-white">Recent Imports</h3>
        <div className="mt-4 space-y-3">
          {[
            { name: "Q2_expenses.xlsx", date: "Jul 8, 2026", rows: 23, status: "Completed" },
            { name: "Chase Business ••••4821", date: "Jul 10, 2026", rows: 4, status: "Synced" },
            { name: "stessa_export_may.csv", date: "Jun 15, 2026", rows: 47, status: "Completed" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-900 p-3">
              <div>
                <p className="text-sm text-white">{item.name}</p>
                <p className="text-xs text-slate-500">{item.date} · {item.rows} transactions</p>
              </div>
              <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs text-brand-400">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionsTab({
  selectedProperty,
  setSelectedProperty,
  addToast,
}: {
  selectedProperty: string;
  setSelectedProperty: (v: string) => void;
  addToast: (msg: string, type?: "success" | "error" | "info") => void;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [categorizeModal, setCategorizeModal] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (selectedProperty !== "all" && t.propertyId !== selectedProperty) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (search && !t.description.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [selectedProperty, statusFilter, search]);

  const propertyName = (id: string) => properties.find((p) => p.id === id)?.name ?? id;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="w-full rounded-lg border border-white/10 bg-surface-800 py-2 pl-10 pr-4 text-sm text-slate-300"
          />
        </div>
        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="rounded-lg border border-white/10 bg-surface-800 px-3 py-2 text-sm text-slate-300"
        >
          <option value="all">All Properties</option>
          {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-white/10 bg-surface-800 px-3 py-2 text-sm text-slate-300"
        >
          <option value="all">All Status</option>
          <option value="categorized">Categorized</option>
          <option value="pending">Pending</option>
          <option value="review">Needs Review</option>
        </select>
        <button
          onClick={() => addToast("AI auto-categorized 2 pending transactions", "success")}
          className="flex items-center gap-2 rounded-lg bg-brand-500/20 px-3 py-2 text-sm text-brand-400 hover:bg-brand-500/30"
        >
          <Filter className="h-4 w-4" />
          Auto-Categorize
          <DevNote title="AI Categorization">
            Production: Fine-tuned classifier (LLaMA) reads description + amount, assigns category
            and property based on merchant patterns and landlord rules.
          </DevNote>
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-surface-900/50 text-left text-xs text-slate-500">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-slate-400">{t.date}</td>
                <td className="px-4 py-3 text-slate-300">{t.description}</td>
                <td className="px-4 py-3 text-slate-400">{propertyName(t.propertyId)}</td>
                <td className="px-4 py-3 text-slate-300">{t.category}</td>
                <td className={`px-4 py-3 font-medium ${t.amount > 0 ? "text-brand-400" : "text-red-400"}`}>
                  {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setCategorizeModal(t)}
                    className="text-xs text-brand-400 hover:underline"
                  >
                    {t.status === "categorized" ? "Edit" : "Categorize"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {categorizeModal && (
        <Modal onClose={() => setCategorizeModal(null)} title="Categorize Transaction">
          <p className="text-sm text-slate-400">{categorizeModal.description}</p>
          <p className="mt-1 text-lg font-semibold text-white">${Math.abs(categorizeModal.amount).toFixed(2)}</p>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-slate-400">Property</label>
              <select defaultValue={categorizeModal.propertyId} className="mt-1 w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300">
                {properties.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Category</label>
              <select defaultValue={categorizeModal.category} className="mt-1 w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300">
                {["Rent Income", "Maintenance", "Insurance", "Utilities", "Mortgage", "Landscaping", "Uncategorized"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => {
              addToast(`Transaction categorized: ${categorizeModal.description}`, "success");
              setCategorizeModal(null);
            }}
            className="mt-4 w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Save Category
          </button>
        </Modal>
      )}
    </div>
  );
}

function TenantsTab({ addToast }: { addToast: (msg: string, type?: "success" | "error" | "info") => void }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reminderModal, setReminderModal] = useState<Tenant | null>(null);
  const [reminderType, setReminderType] = useState<"email" | "sms">("email");

  const filtered = tenants.filter((t) => statusFilter === "all" || t.status === statusFilter);
  const propertyName = (id: string) => properties.find((p) => p.id === id)?.name ?? id;

  const tenantStatusColors: Record<string, string> = {
    paid: "text-brand-400 bg-brand-500/10",
    due: "text-amber-400 bg-amber-500/10",
    overdue: "text-red-400 bg-red-500/10",
    partial: "text-orange-400 bg-orange-500/10",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-semibold text-white">
          Tenant Ledger
          <DevNote title="Tenant Ledger & Reminders">
            Production: Lease terms stored per tenant. Cron checks due dates daily. Overdue triggers
            Twilio SMS + SendGrid email draft generation via LLM with landlord tone preferences.
          </DevNote>
        </h2>
        <div className="ml-auto flex gap-2">
          {["all", "paid", "due", "overdue", "partial"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                statusFilter === s ? "bg-brand-500/20 text-brand-400" : "text-slate-400 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-surface-900/50 text-left text-xs text-slate-500">
              <th className="px-4 py-3">Tenant</th>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Unit</th>
              <th className="px-4 py-3">Rent Due</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 font-medium text-white">{t.name}</td>
                <td className="px-4 py-3 text-slate-400">{propertyName(t.propertyId)}</td>
                <td className="px-4 py-3 text-slate-400">{t.unit}</td>
                <td className="px-4 py-3 text-slate-300">${t.rentDue}</td>
                <td className="px-4 py-3 text-slate-300">${t.rentPaid}</td>
                <td className="px-4 py-3 text-slate-400">{t.dueDate}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${tenantStatusColors[t.status]}`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {(t.status === "overdue" || t.status === "partial") && (
                      <>
                        <button
                          onClick={() => { setReminderModal(t); setReminderType("email"); }}
                          className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-brand-400"
                          title="Email reminder"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => { setReminderModal(t); setReminderType("sms"); }}
                          className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-brand-400"
                          title="SMS reminder"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => addToast(`Opened ledger for ${t.name}`, "info")}
                      className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                      title="View ledger"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {reminderModal && (
        <Modal onClose={() => setReminderModal(null)} title={`${reminderType === "email" ? "Email" : "SMS"} Reminder Draft`}>
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => setReminderType("email")}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs ${reminderType === "email" ? "bg-brand-500/20 text-brand-400" : "text-slate-400"}`}
            >
              <Mail className="h-3 w-3" /> Email
            </button>
            <button
              onClick={() => setReminderType("sms")}
              className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs ${reminderType === "sms" ? "bg-brand-500/20 text-brand-400" : "text-slate-400"}`}
            >
              <MessageSquare className="h-3 w-3" /> SMS
            </button>
          </div>
          <div className="rounded-lg border border-white/10 bg-surface-900 p-4 text-sm text-slate-300">
            {reminderType === "email" ? (
              <>
                <p className="text-xs text-slate-500">To: {reminderModal.email}</p>
                <p className="mt-2 font-medium text-white">Subject: Rent Payment Reminder — {reminderModal.unit}</p>
                <p className="mt-3 leading-relaxed">
                  Hi {reminderModal.name.split(" ")[0]},<br /><br />
                  This is a friendly reminder that your rent payment of ${reminderModal.rentDue} for {reminderModal.unit} was due on {reminderModal.dueDate}.
                  {reminderModal.status === "partial" && ` We have received $${reminderModal.rentPaid} — a balance of $${reminderModal.rentDue - reminderModal.rentPaid} remains.`}
                  {reminderModal.status === "overdue" && " Your payment is now 9 days overdue."}<br /><br />
                  Please submit payment at your earliest convenience. Let me know if you have any questions.<br /><br />
                  Best,<br />Marcus Rivera
                </p>
              </>
            ) : (
              <p>
                Hi {reminderModal.name.split(" ")[0]}, this is Marcus (landlord at {propertyName(reminderModal.propertyId)}).
                Your ${reminderModal.rentDue} rent for {reminderModal.unit} was due {reminderModal.dueDate}.
                Please submit payment ASAP. Reply STOP to opt out.
              </p>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                addToast(`${reminderType === "email" ? "Email" : "SMS"} reminder draft saved for ${reminderModal.name}`, "success");
                setReminderModal(null);
              }}
              className="flex-1 rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Save Draft
            </button>
            <button
              onClick={() => {
                addToast(`${reminderType === "email" ? "Email" : "SMS"} sent to ${reminderModal.name}`, "success");
                setReminderModal(null);
              }}
              className="flex-1 rounded-lg border border-brand-500/30 py-2 text-sm text-brand-400 hover:bg-brand-500/10"
            >
              Send Now
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function MaintenanceTab({ addToast }: { addToast: (msg: string, type?: "success" | "error" | "info") => void }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [detailItem, setDetailItem] = useState<typeof maintenanceItems[0] | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = maintenanceItems.filter((m) => statusFilter === "all" || m.status === statusFilter);
  const propertyName = (id: string) => properties.find((p) => p.id === id)?.name ?? id;

  const statusIcons = {
    completed: <CheckCircle2 className="h-4 w-4 text-brand-400" />,
    in_progress: <Clock className="h-4 w-4 text-amber-400" />,
    scheduled: <AlertTriangle className="h-4 w-4 text-blue-400" />,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-semibold text-white">
          Maintenance Log
          <DevNote title="Maintenance → P&L Link">
            Production: Each maintenance record links to an expense transaction ID. When marked
            complete, cost auto-flows into property P&L under Maintenance category.
          </DevNote>
        </h2>
        <div className="flex gap-2">
          {["all", "completed", "in_progress", "scheduled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${
                statusFilter === s ? "bg-brand-500/20 text-brand-400" : "text-slate-400 hover:text-white"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-600"
          >
            <Plus className="h-3 w-3" /> Add Item
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setDetailItem(item)}
            className="cursor-pointer rounded-xl border border-white/10 bg-surface-800 p-4 transition hover:border-brand-500/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {statusIcons[item.status]}
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400">{propertyName(item.propertyId)} · {item.vendor}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">${item.cost.toFixed(2)}</p>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
            </div>
            {item.expenseId !== "—" && (
              <p className="mt-2 text-xs text-brand-400">
                Linked to expense {item.expenseId} → appears in P&L
              </p>
            )}
          </div>
        ))}
      </div>

      {detailItem && (
        <Modal onClose={() => setDetailItem(null)} title={detailItem.title}>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">Property</span><span className="text-white">{propertyName(detailItem.propertyId)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Vendor</span><span className="text-white">{detailItem.vendor}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Category</span><span className="text-white">{detailItem.category}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Cost</span><span className="text-white">${detailItem.cost.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Status</span><span className="capitalize text-white">{detailItem.status.replace("_", " ")}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Expense Link</span><span className="text-brand-400">{detailItem.expenseId}</span></div>
            <p className="rounded-lg bg-surface-900 p-3 text-slate-300">{detailItem.notes}</p>
          </div>
          {detailItem.status !== "completed" && (
            <button
              onClick={() => {
                addToast(`Maintenance marked complete — $${detailItem.cost} added to ${propertyName(detailItem.propertyId)} P&L`, "success");
                setDetailItem(null);
              }}
              className="mt-4 w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              Mark Complete & Link Expense
            </button>
          )}
        </Modal>
      )}

      {showAddForm && (
        <Modal onClose={() => setShowAddForm(false)} title="Add Maintenance Item">
          <div className="space-y-3">
            <input placeholder="Title" className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300" defaultValue="Gutter cleaning" />
            <select className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300">
              {properties.map((p) => <option key={p.id}>{p.name}</option>)}
            </select>
            <input placeholder="Vendor" className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300" defaultValue="Clean Gutters Pro" />
            <input placeholder="Estimated cost" className="w-full rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300" defaultValue="185.00" />
          </div>
          <button
            onClick={() => {
              addToast("Maintenance item scheduled for Oak Street Duplex", "success");
              setShowAddForm(false);
            }}
            className="mt-4 w-full rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Schedule Maintenance
          </button>
        </Modal>
      )}
    </div>
  );
}

function ReportsTab({ addToast }: { addToast: (msg: string, type?: "success" | "error" | "info") => void }) {
  const [selectedMonth, setSelectedMonth] = useState("june-2026");
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowPreview(true);
      addToast("July 2026 monthly report generated", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <h2 className="font-semibold text-white">
          AI Monthly Owner Reports
          <DevNote title="AI Report Generation">
            Production: Self-hosted LLaMA ingests per-property KPIs, transaction summaries, tenant
            status, and maintenance logs. Outputs plain-English narrative + PDF via Puppeteer.
            Emailed on 1st of each month by automation agent.
          </DevNote>
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Automated portfolio health reports with narrative insights and underperformer flags.
        </p>

        <div className="mt-6 flex flex-wrap items-end gap-4">
          <div>
            <label className="text-xs text-slate-400">Report month</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="mt-1 block rounded-lg border border-white/10 bg-surface-900 px-3 py-2 text-sm text-slate-300"
            >
              <option value="june-2026">June 2026</option>
              <option value="may-2026">May 2026</option>
              <option value="april-2026">April 2026</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="rounded-lg bg-brand-500 px-6 py-2 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate Report"}
          </button>
          <button
            onClick={() => { setShowPreview(true); addToast("Opened June 2026 report preview", "info"); }}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:text-white"
          >
            <Eye className="h-4 w-4" /> View Last Report
          </button>
        </div>
      </div>

      {/* Property performance chart for report */}
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <h3 className="font-semibold text-white">Property Comparison — Net Income</h3>
        <div className="mt-4 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={properties.map((p) => ({ name: p.name.split(" ")[0], net: p.netIncome }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1a2234", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
              <Bar dataKey="net" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Past reports */}
      <div className="rounded-xl border border-white/10 bg-surface-800 p-6">
        <h3 className="font-semibold text-white">Report History</h3>
        <div className="mt-4 space-y-2">
          {[
            { month: "June 2026", date: "Jul 1, 2026", pages: 8 },
            { month: "May 2026", date: "Jun 1, 2026", pages: 7 },
            { month: "April 2026", date: "May 1, 2026", pages: 8 },
          ].map((r) => (
            <div key={r.month} className="flex items-center justify-between rounded-lg border border-white/5 bg-surface-900 p-3">
              <div>
                <p className="text-sm font-medium text-white">{r.month} Owner Report</p>
                <p className="text-xs text-slate-500">Generated {r.date} · {r.pages} pages</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowPreview(true); addToast(`Opened ${r.month} report`, "info"); }}
                  className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => addToast(`Downloaded ${r.month}_owner_report.pdf`, "success")}
                  className="rounded p-1.5 text-slate-400 hover:bg-white/10 hover:text-brand-400"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPreview && (
        <Modal onClose={() => setShowPreview(false)} title={`${reportPreview.month} Owner Report`} wide>
          <div className="space-y-4 text-sm">
            <p className="text-xs text-slate-500">Generated {reportPreview.generatedAt}</p>
            <div className="rounded-lg border border-white/10 bg-surface-900 p-4">
              <h4 className="font-semibold text-brand-400">Executive Summary</h4>
              <p className="mt-2 leading-relaxed text-slate-300">{reportPreview.summary}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Highlights</h4>
              <ul className="mt-2 space-y-1">
                {reportPreview.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="h-3 w-3 text-brand-400" /> {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-400">Underperforming Properties</h4>
              <ul className="mt-2 space-y-1">
                {reportPreview.underperformers.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-slate-300">
                    <AlertTriangle className="h-3 w-3 text-red-400" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => addToast("PDF downloaded: june_2026_owner_report.pdf", "success")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-500 py-2 text-sm font-semibold text-white hover:bg-brand-600"
            >
              <Download className="h-4 w-4" /> Download PDF
            </button>
            <button
              onClick={() => addToast("Report emailed to marcus.rivera@gmail.com", "success")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-sm text-slate-300 hover:text-white"
            >
              <Mail className="h-4 w-4" /> Email Report
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function ActivitySidebar({ addToast }: { addToast: (msg: string, type?: "success" | "error" | "info") => void }) {
  const typeColors: Record<string, string> = {
    import: "bg-blue-500/10 text-blue-400",
    bank: "bg-brand-500/10 text-brand-400",
    tenant: "bg-amber-500/10 text-amber-400",
    maintenance: "bg-purple-500/10 text-purple-400",
    report: "bg-emerald-500/10 text-emerald-400",
    alert: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="sticky top-24 rounded-xl border border-white/10 bg-surface-800 p-4">
      <h3 className="font-semibold text-white">Activity Feed</h3>
      <div className="mt-4 space-y-3">
        {activityFeed.map((item) => (
          <button
            key={item.id}
            onClick={() => addToast(`Activity: ${item.message}`, "info")}
            className="w-full rounded-lg border border-white/5 bg-surface-900 p-3 text-left transition hover:border-brand-500/20"
          >
            <div className="flex items-center gap-2">
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase ${typeColors[item.type]}`}>
                {item.type}
              </span>
              <span className="text-[10px] text-slate-500">{item.time}</span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">{item.message}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    categorized: "text-brand-400 bg-brand-500/10",
    pending: "text-amber-400 bg-amber-500/10",
    review: "text-red-400 bg-red-500/10",
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${colors[status] ?? ""}`}>
      {status}
    </span>
  );
}

function Modal({
  onClose,
  title,
  children,
  wide,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className={`relative max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-surface-800 p-6 shadow-card ${wide ? "w-full max-w-2xl" : "w-full max-w-md"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
