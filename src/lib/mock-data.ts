export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  units: number;
  monthlyRent: number;
  mortgage: number;
  purchasePrice: number;
  cashInvested: number;
  vacancyRate: number;
  cashOnCash: number;
  netIncome: number;
  status: "performing" | "watch" | "underperforming";
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  propertyId: string;
  source: "bank" | "csv" | "manual";
  status: "categorized" | "pending" | "review";
}

export interface Tenant {
  id: string;
  name: string;
  propertyId: string;
  unit: string;
  rentDue: number;
  rentPaid: number;
  dueDate: string;
  status: "paid" | "due" | "overdue" | "partial";
  email: string;
  phone: string;
  leaseEnd: string;
}

export interface MaintenanceItem {
  id: string;
  propertyId: string;
  title: string;
  vendor: string;
  date: string;
  cost: number;
  status: "completed" | "in_progress" | "scheduled";
  category: string;
  expenseId: string;
  notes: string;
}

export interface ActivityItem {
  id: string;
  time: string;
  message: string;
  type: "import" | "bank" | "tenant" | "maintenance" | "report" | "alert";
}

export const properties: Property[] = [
  {
    id: "p1",
    name: "Oak Street Duplex",
    address: "1420 Oak St, Austin, TX 78702",
    type: "Duplex",
    units: 2,
    monthlyRent: 3200,
    mortgage: 1850,
    purchasePrice: 385000,
    cashInvested: 77000,
    vacancyRate: 0,
    cashOnCash: 12.4,
    netIncome: 798,
    status: "performing",
  },
  {
    id: "p2",
    name: "Maple Court Fourplex",
    address: "88 Maple Ct, Denver, CO 80205",
    type: "Fourplex",
    units: 4,
    monthlyRent: 5800,
    mortgage: 3100,
    purchasePrice: 620000,
    cashInvested: 124000,
    vacancyRate: 25,
    cashOnCash: 6.2,
    netIncome: 642,
    status: "watch",
  },
  {
    id: "p3",
    name: "Pine Ridge Single Family",
    address: "310 Pine Ridge Dr, Raleigh, NC 27609",
    type: "Single Family",
    units: 1,
    monthlyRent: 1950,
    mortgage: 1420,
    purchasePrice: 298000,
    cashInvested: 59600,
    vacancyRate: 0,
    cashOnCash: 9.8,
    netIncome: 487,
    status: "performing",
  },
  {
    id: "p4",
    name: "Cedar Lane Triplex",
    address: "55 Cedar Ln, Nashville, TN 37206",
    type: "Triplex",
    units: 3,
    monthlyRent: 4200,
    mortgage: 2680,
    purchasePrice: 445000,
    cashInvested: 89000,
    vacancyRate: 33,
    cashOnCash: 3.1,
    netIncome: 230,
    status: "underperforming",
  },
  {
    id: "p5",
    name: "Riverview Townhome",
    address: "12 Riverview Way, Portland, OR 97214",
    type: "Townhome",
    units: 1,
    monthlyRent: 2400,
    mortgage: 1680,
    purchasePrice: 415000,
    cashInvested: 83000,
    vacancyRate: 0,
    cashOnCash: 8.5,
    netIncome: 588,
    status: "performing",
  },
];

export const transactions: Transaction[] = [
  { id: "t1", date: "2026-07-01", description: "Zelle — Marcus Chen rent", amount: 1600, category: "Rent Income", propertyId: "p1", source: "bank", status: "categorized" },
  { id: "t2", date: "2026-07-01", description: "Zelle — Priya Patel rent", amount: 1600, category: "Rent Income", propertyId: "p1", source: "bank", status: "categorized" },
  { id: "t3", date: "2026-07-02", description: "Home Depot — HVAC filter", amount: -89.47, category: "Maintenance", propertyId: "p2", source: "bank", status: "categorized" },
  { id: "t4", date: "2026-07-03", description: "State Farm Insurance", amount: -312.0, category: "Insurance", propertyId: "p3", source: "bank", status: "categorized" },
  { id: "t5", date: "2026-07-05", description: "ACH — Denver Water", amount: -156.22, category: "Utilities", propertyId: "p2", source: "bank", status: "categorized" },
  { id: "t6", date: "2026-07-06", description: "Venmo — James Okonkwo rent", amount: 1450, category: "Rent Income", propertyId: "p2", source: "bank", status: "categorized" },
  { id: "t7", date: "2026-07-07", description: "ABC Plumbing LLC", amount: -485.0, category: "Maintenance", propertyId: "p4", source: "csv", status: "categorized" },
  { id: "t8", date: "2026-07-08", description: "Unknown deposit", amount: 2200, category: "Uncategorized", propertyId: "p5", source: "bank", status: "pending" },
  { id: "t9", date: "2026-07-09", description: "Lowe's — paint supplies", amount: -134.56, category: "Maintenance", propertyId: "p4", source: "bank", status: "review" },
  { id: "t10", date: "2026-07-09", description: "Mortgage — Wells Fargo", amount: -1850.0, category: "Mortgage", propertyId: "p1", source: "bank", status: "categorized" },
  { id: "t11", date: "2026-07-10", description: "Zelle — Elena Vasquez rent", amount: 1950, category: "Rent Income", propertyId: "p3", source: "bank", status: "categorized" },
  { id: "t12", date: "2026-07-10", description: "Lawn Pro Services", amount: -175.0, category: "Landscaping", propertyId: "p3", source: "csv", status: "categorized" },
];

export const tenants: Tenant[] = [
  { id: "tn1", name: "Marcus Chen", propertyId: "p1", unit: "Unit A", rentDue: 1600, rentPaid: 1600, dueDate: "2026-07-01", status: "paid", email: "marcus.chen@gmail.com", phone: "(512) 555-0142", leaseEnd: "2027-03-31" },
  { id: "tn2", name: "Priya Patel", propertyId: "p1", unit: "Unit B", rentDue: 1600, rentPaid: 1600, dueDate: "2026-07-01", status: "paid", email: "priya.patel@outlook.com", phone: "(512) 555-0198", leaseEnd: "2026-06-30" },
  { id: "tn3", name: "James Okonkwo", propertyId: "p2", unit: "Unit 1", rentDue: 1450, rentPaid: 1450, dueDate: "2026-07-01", status: "paid", email: "j.okonkwo@yahoo.com", phone: "(303) 555-0234", leaseEnd: "2026-08-31" },
  { id: "tn4", name: "Sarah Mitchell", propertyId: "p2", unit: "Unit 2", rentDue: 1450, rentPaid: 0, dueDate: "2026-07-01", status: "overdue", email: "s.mitchell@gmail.com", phone: "(303) 555-0267", leaseEnd: "2026-12-31" },
  { id: "tn5", name: "Unit 3 — Vacant", propertyId: "p2", unit: "Unit 3", rentDue: 1450, rentPaid: 0, dueDate: "2026-07-01", status: "due", email: "—", phone: "—", leaseEnd: "—" },
  { id: "tn6", name: "Elena Vasquez", propertyId: "p3", unit: "Main", rentDue: 1950, rentPaid: 1950, dueDate: "2026-07-01", status: "paid", email: "elena.v@icloud.com", phone: "(919) 555-0312", leaseEnd: "2027-01-31" },
  { id: "tn7", name: "Unit A — Vacant", propertyId: "p4", unit: "Unit A", rentDue: 1400, rentPaid: 0, dueDate: "2026-07-01", status: "due", email: "—", phone: "—", leaseEnd: "—" },
  { id: "tn8", name: "David Kim", propertyId: "p4", unit: "Unit B", rentDue: 1400, rentPaid: 700, dueDate: "2026-07-01", status: "partial", email: "david.kim@gmail.com", phone: "(615) 555-0389", leaseEnd: "2026-09-30" },
  { id: "tn9", name: "Rachel Torres", propertyId: "p5", unit: "Main", rentDue: 2400, rentPaid: 2400, dueDate: "2026-07-01", status: "paid", email: "rachel.torres@proton.me", phone: "(503) 555-0411", leaseEnd: "2027-05-31" },
];

export const maintenanceItems: MaintenanceItem[] = [
  { id: "m1", propertyId: "p2", title: "HVAC filter replacement", vendor: "Self (Home Depot)", date: "2026-07-02", cost: 89.47, status: "completed", category: "HVAC", expenseId: "t3", notes: "Quarterly filter change for units 1-2." },
  { id: "m2", propertyId: "p4", title: "Kitchen sink leak repair", vendor: "ABC Plumbing LLC", date: "2026-07-07", cost: 485.0, status: "completed", category: "Plumbing", expenseId: "t7", notes: "Replaced P-trap and supply line in Unit B." },
  { id: "m3", propertyId: "p4", title: "Unit A turnover paint", vendor: "Self (Lowe's)", date: "2026-07-09", cost: 134.56, status: "in_progress", category: "Turnover", expenseId: "t9", notes: "Repainting after tenant move-out. 60% complete." },
  { id: "m4", propertyId: "p3", title: "Lawn mowing — July", vendor: "Lawn Pro Services", date: "2026-07-10", cost: 175.0, status: "completed", category: "Landscaping", expenseId: "t12", notes: "Monthly lawn service." },
  { id: "m5", propertyId: "p1", title: "Annual roof inspection", vendor: "Summit Roofing Co.", date: "2026-07-15", cost: 250.0, status: "scheduled", category: "Roofing", expenseId: "—", notes: "Scheduled for Jul 15. Estimate only." },
  { id: "m6", propertyId: "p5", title: "Garbage disposal replacement", vendor: "Portland Handyman Pros", date: "2026-07-12", cost: 320.0, status: "scheduled", category: "Appliances", expenseId: "—", notes: "Tenant reported grinding noise." },
];

export const activityFeed: ActivityItem[] = [
  { id: "a1", time: "2 min ago", message: "Bank feed synced 4 new transactions from Chase Business", type: "bank" },
  { id: "a2", time: "18 min ago", message: "AI categorized 'Lowe's — paint supplies' as Maintenance for Cedar Lane", type: "import" },
  { id: "a3", time: "1 hr ago", message: "Rent reminder draft created for Sarah Mitchell (9 days overdue)", type: "tenant" },
  { id: "a4", time: "3 hrs ago", message: "Maintenance expense linked: ABC Plumbing → Cedar Lane P&L", type: "maintenance" },
  { id: "a5", time: "Yesterday", message: "June 2026 monthly report generated for 5 properties", type: "report" },
  { id: "a6", time: "Yesterday", message: "Cedar Lane Triplex flagged as underperforming (CoC 3.1%)", type: "alert" },
  { id: "a7", time: "2 days ago", message: "CSV import completed: 23 transactions from Q2_expenses.xlsx", type: "import" },
];

export const monthlyPnL = [
  { month: "Feb", income: 14200, expenses: 8900, net: 5300 },
  { month: "Mar", income: 14800, expenses: 9200, net: 5600 },
  { month: "Apr", income: 15100, expenses: 8800, net: 6300 },
  { month: "May", income: 14900, expenses: 9400, net: 5500 },
  { month: "Jun", income: 15350, expenses: 9100, net: 6250 },
  { month: "Jul", income: 12850, expenses: 7200, net: 5650 },
];

export const portfolioKPIs = {
  totalProperties: 5,
  totalUnits: 11,
  occupiedUnits: 8,
  portfolioVacancy: 27.3,
  monthlyNetIncome: 2745,
  avgCashOnCash: 8.0,
  ytdNetIncome: 34600,
  overdueRent: 2150,
};

export const reportPreview = {
  month: "June 2026",
  generatedAt: "July 1, 2026 at 6:00 AM",
  summary: `Your portfolio generated $6,250 net income in June across 5 properties. Oak Street Duplex and Riverview Townhome continue to outperform with cash-on-cash returns above 8%. Cedar Lane Triplex remains your weakest performer — vacancy in Unit A and a partial payment from David Kim in Unit B are dragging returns to 3.1% CoC. Consider accelerating the Unit A turnover (paint in progress) and sending a formal late-rent notice to David Kim.`,
  highlights: [
    "Portfolio net income up 4.2% vs. May",
    "2 properties flagged for review",
    "3 maintenance items completed, 2 scheduled",
    "1 tenant overdue by 9+ days",
  ],
  underperformers: ["Cedar Lane Triplex", "Maple Court Fourplex"],
};
