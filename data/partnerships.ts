export type PipelineStage =
  | 'NEW'
  | 'SCREENING'
  | 'UNDER_REVIEW'
  | 'CONTACTED'
  | 'MEETING'
  | 'DUE_DILIGENCE'
  | 'NEGOTIATION'
  | 'APPROVED'
  | 'DECLINED'
  | 'ACTIVE_PARTNERSHIP';

export type AdminRole =
  | 'SUPER_ADMIN'
  | 'CEO'
  | 'FINANCE'
  | 'PARTNERSHIP_LEAD'
  | 'PRODUCT_LEAD';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  title: string;
}

export interface InternalNote {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  details?: string;
  timestamp: string;
}

export interface PartnershipDocument {
  id: string;
  inquiryType: 'PARTNERSHIP' | 'INVESTMENT' | 'PROJECT';
  inquiryId: string;
  fileName: string;
  storageKey: string;
  mimeType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface PartnershipInquiry {
  id: string;
  reference: string;
  type: string; // Strategic, Product, Technology, Institutional, Distribution, Research, Media, Sponsorship, Other
  organization: string;
  contactName: string;
  email: string;
  phone?: string;
  country: string;
  website?: string;
  industry: string;
  organizationType?: string;
  targetProductId?: string; // kampus, pharmora, ecolift, devpay-africa, or 'braxvio-parent'
  proposalTitle: string;
  proposal: string;
  organizationContribution?: string;
  braxvioContribution?: string;
  contributionTypes: string[];
  timeline: string;
  status: PipelineStage;
  assignedTo?: string;
  followUpDate?: string;
  documents?: PartnershipDocument[];
  notes?: InternalNote[];
  activities?: ActivityLog[];
  createdAt: string;
  updatedAt: string;
}

export interface InvestmentInterest {
  id: string;
  reference: string;
  investorType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  jobTitle?: string;
  country: string;
  website?: string;
  interestType: string;
  productId?: string;
  indicativeRange?: string;
  timeline?: string;
  message: string;
  consentAgreed: boolean;
  status: PipelineStage;
  assignedTo?: string;
  followUpDate?: string;
  documents?: PartnershipDocument[];
  notes?: InternalNote[];
  activities?: ActivityLog[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectProposal {
  id: string;
  reference: string;
  projectName: string;
  organization: string;
  contactName: string;
  email: string;
  country: string;
  industry: string;
  description: string;
  problem: string;
  targetUsers: string;
  stage: string;
  needs: string[];
  timeline: string;
  budgetRange?: string;
  status: PipelineStage;
  assignedTo?: string;
  followUpDate?: string;
  documents?: PartnershipDocument[];
  notes?: InternalNote[];
  activities?: ActivityLog[];
  createdAt: string;
  updatedAt: string;
}

// ─── Configurable Constants ──────────────────────────────────────────────────

export const PARTNERSHIP_CATEGORIES = [
  {
    id: 'strategic',
    number: '01',
    title: 'STRATEGIC PARTNERSHIP',
    headline: 'Strategic Partnership',
    description:
      'For companies, technology providers, and organizations interested in building deep, long-term operational relationships with Braxvio.',
    cta: 'EXPLORE →',
    href: '/partners/propose?type=strategic',
  },
  {
    id: 'investment',
    number: '02',
    title: 'INVESTMENT INTEREST',
    headline: 'Investment Interest',
    description:
      'For qualified individuals, angel syndicates, venture funds, family offices, and institutions interested in discussing potential financial participation in Braxvio or eligible initiatives.',
    cta: 'EXPRESS INTEREST →',
    href: '/partners/investment-interest',
  },
  {
    id: 'product',
    number: '03',
    title: 'PRODUCT PARTNERSHIP',
    headline: 'Product Partnership',
    description:
      'Partner directly with an individual Braxvio platform—Kampus, Pharmora, Ecolift, or DevPay Africa—to expand capabilities or serve targeted communities.',
    cta: 'VIEW PRODUCTS →',
    href: '/partners#products',
  },
  {
    id: 'technology',
    number: '04',
    title: 'TECHNOLOGY PARTNERSHIP',
    headline: 'Technology Partnership',
    description:
      'Infrastructure, cloud compute, payment rails, AI models, telecom APIs, identity verification, cold-chain IoT, and specialized technical integrations.',
    cta: 'PARTNER ON TECHNOLOGY →',
    href: '/partners/propose?type=technology',
  },
  {
    id: 'institutional',
    number: '05',
    title: 'INSTITUTIONAL PARTNERSHIP',
    headline: 'Institutional Partnership',
    description:
      'For universities, municipal governments, ministries, non-governmental organizations, hospital networks, and financial institutions exploring research or pilot deployments.',
    cta: 'START A CONVERSATION →',
    href: '/partners/propose?type=institutional',
  },
  {
    id: 'distribution',
    number: '06',
    title: 'DISTRIBUTION & MARKET PARTNERSHIP',
    headline: 'Distribution & Market',
    description:
      'For regional distributors, retail networks, trade associations, and localized operators that can accelerate market adoption across African and international borders.',
    cta: 'EXPLORE MARKET PARTNERSHIP →',
    href: '/partners/propose?type=distribution',
  },
];

export const INVESTOR_TYPES = [
  'Individual Investor',
  'Angel Investor',
  'Venture Capital Firm',
  'Private Equity Firm',
  'Family Office',
  'Corporate Investor',
  'Institution',
  'Other',
];

export const INDICATIVE_CAPITAL_RANGES = [
  'Below $10K',
  '$10K–$50K',
  '$50K–$250K',
  '$250K–$1M',
  '$1M+',
  'Prefer not to disclose',
];

export const INVESTMENT_HORIZONS = [
  'Exploring',
  'Within 3 months',
  '3–6 months',
  '6–12 months',
  'Long-term / future',
];

export const INVESTMENT_AREAS = [
  'Braxvio Parent Company',
  'Specific Braxvio Product',
  'Future Funding Opportunities',
  'Strategic Investment',
  'Corporate Partnership',
  'Other',
];

export const CONTRIBUTION_TYPES = [
  'Capital',
  'Technology',
  'Infrastructure',
  'Distribution',
  'Research',
  'Expertise',
  'Marketing',
  'Data',
  'Operations',
  'Facilities',
  'Network / Market Access',
  'Other',
];

export const PROJECT_STAGES = [
  'Idea',
  'Research',
  'Prototype',
  'MVP',
  'Existing Product',
  'Scaling',
  'Transformation Project',
];

export const PROJECT_NEEDS = [
  'Product Strategy',
  'Software Development',
  'AI',
  'Mobile Application',
  'Web Platform',
  'Infrastructure',
  'Design',
  'Technical Partnership',
  'Joint Venture Discussion',
  'Research',
  'Other',
];

export const PARTNERSHIP_PROCESS_STEPS = [
  {
    step: '01',
    title: 'SUBMIT',
    description: 'Tell us about your organization, strategic alignment, and the collaborative initiative you envision.',
  },
  {
    step: '02',
    title: 'REVIEW',
    description: 'The Braxvio leadership and product teams thoroughly assess operational alignment, technical feasibility, and value creation.',
  },
  {
    step: '03',
    title: 'DISCUSS',
    description: 'Promising initiatives advance to an introductory dialogue to align on mutual capabilities and high-level milestones.',
  },
  {
    step: '04',
    title: 'EVALUATE',
    description: 'Both parties explore formal scope, technical architecture, roles, commercial or operational frameworks, and governance.',
  },
  {
    step: '05',
    title: 'BUILD',
    description: 'Approved partnerships progress into formal collaboration agreements, sprint planning, integration, and joint deployment.',
  },
];

export const PIPELINE_STAGES: { key: PipelineStage; label: string; color: string }[] = [
  { key: 'NEW', label: 'New Enquiry', color: 'bg-blue-500/10 text-blue-700 border-blue-300' },
  { key: 'SCREENING', label: 'Screening', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-300' },
  { key: 'UNDER_REVIEW', label: 'Under Review', color: 'bg-amber-500/10 text-amber-700 border-amber-300' },
  { key: 'CONTACTED', label: 'Contacted', color: 'bg-purple-500/10 text-purple-700 border-purple-300' },
  { key: 'MEETING', label: 'Meeting Scheduled', color: 'bg-cyan-500/10 text-cyan-700 border-cyan-300' },
  { key: 'DUE_DILIGENCE', label: 'Due Diligence', color: 'bg-yellow-500/10 text-yellow-700 border-yellow-300' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'bg-orange-500/10 text-orange-700 border-orange-300' },
  { key: 'APPROVED', label: 'Approved', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300' },
  { key: 'DECLINED', label: 'Declined', color: 'bg-rose-500/10 text-rose-700 border-rose-300' },
  { key: 'ACTIVE_PARTNERSHIP', label: 'Active Partnership', color: 'bg-teal-500/10 text-teal-700 border-teal-300' },
];

export const AUTHORIZED_STAFF = [
  { id: 'ceo', name: 'Michael Kwesi Annor', role: 'CEO', email: 'michael@braxvio.com' },
  { id: 'part-lead', name: 'Strategic Partnerships Lead', role: 'PARTNERSHIP_LEAD', email: 'partnerships@braxvio.com' },
  { id: 'prod-lead', name: 'Product Engineering Lead', role: 'PRODUCT_LEAD', email: 'engineering@braxvio.com' },
  { id: 'finance', name: 'Finance & Treasury', role: 'FINANCE', email: 'finance@braxvio.com' },
  { id: 'legal', name: 'Legal & Compliance', role: 'LEGAL', email: 'legal@braxvio.com' },
];

export const ADMIN_USERS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Michael Kwesi Annor',
    email: 'michael@braxvio.com',
    role: 'SUPER_ADMIN',
    title: 'Founder & CEO',
  },
  {
    id: 'user-2',
    name: 'Sarah Mensah',
    email: 'sarah.m@braxvio.com',
    role: 'PARTNERSHIP_LEAD',
    title: 'Head of Global Partnerships',
  },
  {
    id: 'user-3',
    name: 'Kofi Adams',
    email: 'kofi.a@braxvio.com',
    role: 'PRODUCT_LEAD',
    title: 'Chief Technology Officer',
  },
  {
    id: 'user-4',
    name: 'Kwame Osei',
    email: 'kwame.o@braxvio.com',
    role: 'FINANCE',
    title: 'Director of Capital & Finance',
  },
];

// Seed inquiries for initial realistic preview
export const INITIAL_PARTNERSHIP_INQUIRIES: PartnershipInquiry[] = [
  {
    id: 'part-001',
    reference: 'BX-PART-2026-88102',
    type: 'Institutional Partnership',
    organization: 'University of Ghana Technology Directorate',
    contactName: 'Prof. Eric Boateng',
    email: 'eboateng@ug.edu.gh',
    phone: '+233 24 411 9021',
    country: 'Ghana',
    website: 'https://ug.edu.gh',
    industry: 'Higher Education',
    organizationType: 'University',
    targetProductId: 'kampus',
    proposalTitle: 'Official Campus Housing Verification & Academic Portal Federation',
    proposal:
      'We seek an official collaboration with Kampus to integrate our student identity registry with the Kampus student housing verification rails across 6 university hostels.',
    organizationContribution: 'Official student API federation and approved hostel manager directory.',
    braxvioContribution: 'Kampus verification portal deployment and student support desk.',
    contributionTypes: ['Infrastructure', 'Data', 'Operations'],
    timeline: 'Within 3 months',
    status: 'MEETING',
    assignedTo: 'Strategic Partnerships Lead',
    followUpDate: '2026-09-24',
    notes: [
      {
        id: 'n-1',
        authorName: 'Sarah Mensah',
        authorRole: 'Head of Global Partnerships',
        content: 'Met with dean of student affairs. Strong interest in pilot rollout before next semester intake.',
        createdAt: '2026-09-12T14:30:00Z',
      },
    ],
    activities: [
      {
        id: 'act-1',
        action: 'STATUS_CHANGE',
        actor: 'Sarah Mensah',
        details: 'Moved from UNDER_REVIEW to MEETING',
        timestamp: '2026-09-12T14:32:00Z',
      },
    ],
    createdAt: '2026-09-08T09:15:00Z',
    updatedAt: '2026-09-12T14:32:00Z',
  },
  {
    id: 'part-002',
    reference: 'BX-PART-2026-44219',
    type: 'Technology Partnership',
    organization: 'Helios Cold-Chain Telemetry',
    contactName: 'Julian Meyer',
    email: 'j.meyer@heliostelemetry.com',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    website: 'https://heliostelemetry.com',
    industry: 'Logistics IoT & Healthcare',
    organizationType: 'Technology Provider',
    targetProductId: 'pharmora',
    proposalTitle: 'Bluetooth IoT Temperature Sensor Bridge for Medicine Dispatch',
    proposal:
      'Integration of our certified temperature logging BLE beacons into the Pharmora cold-chain courier dispatch app to ensure automated temperature breach alerting for vaccine deliveries.',
    organizationContribution: 'API SDK access, discounted sensor hardware for pharmacy riders.',
    braxvioContribution: 'Mobile integration into Pharmora courier application.',
    contributionTypes: ['Technology', 'Hardware', 'Data'],
    timeline: '3–6 months',
    status: 'UNDER_REVIEW',
    assignedTo: 'Product Engineering Lead',
    followUpDate: '2026-09-28',
    notes: [
      {
        id: 'n-2',
        authorName: 'Kofi Adams',
        authorRole: 'CTO',
        content: 'Reviewing their Bluetooth low-energy telemetry payload specs. Architecture looks clean.',
        createdAt: '2026-09-14T11:00:00Z',
      },
    ],
    activities: [
      {
        id: 'act-2',
        action: 'SUBMISSION',
        actor: 'System',
        details: 'Initial submission received',
        timestamp: '2026-09-14T10:45:00Z',
      },
    ],
    createdAt: '2026-09-14T10:45:00Z',
    updatedAt: '2026-09-14T11:00:00Z',
  },
  {
    id: 'part-003',
    reference: 'BX-PART-2026-11930',
    type: 'Distribution & Market Partnership',
    organization: 'Ecofleet Municipal Logistics',
    contactName: 'Nadia Larbi',
    email: 'n.larbi@ecofleet.ci',
    country: 'Côte d’Ivoire',
    industry: 'Urban Sanitation',
    targetProductId: 'ecolift',
    proposalTitle: 'Francophone West Africa Municipal Waste Routing Expansion',
    proposal:
      'We operate 45 private sanitation vehicles in Abidjan and wish to deploy Ecolift route optimization and citizen collection booking across 3 districts.',
    contributionTypes: ['Distribution', 'Operations', 'Network / Market Access'],
    timeline: '6–12 months',
    status: 'SCREENING',
    assignedTo: 'Strategic Partnerships Lead',
    createdAt: '2026-09-15T16:20:00Z',
    updatedAt: '2026-09-15T16:20:00Z',
  },
];

export const INITIAL_INVESTMENT_INTERESTS: InvestmentInterest[] = [
  {
    id: 'inv-001',
    reference: 'BXI-2026-90412',
    investorType: 'Venture Capital Firm',
    firstName: 'Marcus',
    lastName: 'Vanderbilt',
    email: 'marcus@africafutureventures.com',
    phone: '+1 415 890 2200',
    organization: 'Africa Future Ventures',
    jobTitle: 'Partner',
    country: 'United States',
    website: 'https://africafutureventures.com',
    interestType: 'Braxvio Parent Company',
    indicativeRange: '$250K–$1M',
    timeline: '3–6 months',
    message:
      'We have followed Braxvio’s multi-product systems approach and engineering rigor across Kampus and DevPay Africa. We would like to initiate an introductory briefing on the corporate roadmap and future capitalization.',
    consentAgreed: true,
    status: 'UNDER_REVIEW',
    assignedTo: 'Michael Kwesi Annor',
    followUpDate: '2026-09-22',
    notes: [
      {
        id: 'n-inv-1',
        authorName: 'Michael Kwesi Annor',
        authorRole: 'CEO',
        content: 'Credible fund with active fintech and logistics portfolio. Preparing introductory overview deck.',
        createdAt: '2026-09-11T18:00:00Z',
      },
    ],
    activities: [
      {
        id: 'act-inv-1',
        action: 'STATUS_CHANGE',
        actor: 'Michael Kwesi Annor',
        details: 'Assigned to CEO, marked Under Review',
        timestamp: '2026-09-11T18:05:00Z',
      },
    ],
    createdAt: '2026-09-10T14:10:00Z',
    updatedAt: '2026-09-11T18:05:00Z',
  },
  {
    id: 'inv-002',
    reference: 'BXI-2026-31804',
    investorType: 'Angel Investor',
    firstName: 'Amara',
    lastName: 'Okonkwo',
    email: 'amara.o@alumnipartners.ng',
    phone: '+234 803 129 4410',
    organization: 'Okonkwo Family Office',
    jobTitle: 'Principal',
    country: 'Nigeria',
    interestType: 'Specific Braxvio Product',
    productId: 'devpay-africa',
    indicativeRange: '$50K–$250K',
    timeline: 'Within 3 months',
    message:
      'We have high conviction around cross-border freelance infrastructure and would value discussing early participation specifically around DevPay Africa liquidity rails.',
    consentAgreed: true,
    status: 'MEETING',
    assignedTo: 'Kwame Osei',
    followUpDate: '2026-09-25',
    createdAt: '2026-09-13T08:30:00Z',
    updatedAt: '2026-09-13T08:30:00Z',
  },
];

export const INITIAL_PROJECT_PROPOSALS: ProjectProposal[] = [
  {
    id: 'proj-001',
    reference: 'BX-PROJ-2026-77319',
    projectName: 'Accra Municipal Smart Sanitation Dispatch',
    organization: 'Greater Accra Environmental Health Coalition',
    contactName: 'Emmanuel Darko',
    email: 'e.darko@gaehealth.org',
    country: 'Ghana',
    industry: 'Municipal & Public Services',
    description:
      'Co-development of an algorithmic truck dispatch and community complaint tracking system linked to the Ecolift routing engine.',
    problem:
      'Informal waste cart operators and municipal trucks overlap in the same zones while peri-urban neighborhoods remain unserviced for up to 3 weeks.',
    targetUsers: 'Municipal sanitary inspectors, dispatch supervisors, and 250,000 households.',
    stage: 'MVP',
    needs: ['Software Development', 'Technical Partnership', 'Mobile Application', 'Infrastructure'],
    timeline: '3–6 months',
    budgetRange: '$25,000 - $75,000',
    status: 'UNDER_REVIEW',
    assignedTo: 'Product Engineering Lead',
    createdAt: '2026-09-14T15:20:00Z',
    updatedAt: '2026-09-14T15:20:00Z',
  },
];
