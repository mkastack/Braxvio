import fs from 'fs/promises';
import path from 'path';
import {
  PartnershipInquiry,
  InvestmentInterest,
  ProjectProposal,
  AdminRole,
  INITIAL_PARTNERSHIP_INQUIRIES,
  INITIAL_INVESTMENT_INTERESTS,
  INITIAL_PROJECT_PROPOSALS,
} from '@/data/partnerships';

const STORAGE_DIR = path.join(process.cwd(), 'data', 'storage');
const PARTNERSHIPS_FILE = path.join(STORAGE_DIR, 'partnerships.json');
const INVESTMENTS_FILE = path.join(STORAGE_DIR, 'investments.json');
const PROJECTS_FILE = path.join(STORAGE_DIR, 'projects.json');

// In-memory fallback if file system write is restricted
let memoryPartnerships: PartnershipInquiry[] = [...INITIAL_PARTNERSHIP_INQUIRIES];
let memoryInvestments: InvestmentInterest[] = [...INITIAL_INVESTMENT_INTERESTS];
let memoryProjects: ProjectProposal[] = [...INITIAL_PROJECT_PROPOSALS];

async function ensureStorageDir() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function readFileSafe<T>(filePath: string, fallback: T[]): Promise<T[]> {
  try {
    await ensureStorageDir();
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch {
    // If not found, seed file
    try {
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    } catch {
      // Memory fallback
    }
    return fallback;
  }
}

async function writeFileSafe<T>(filePath: string, data: T[]): Promise<void> {
  try {
    await ensureStorageDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch {
    // Memory fallback
  }
}

function generateReference(prefix: 'BXI' | 'BX-PART' | 'BX-PROJ'): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-2026-${randomNum}`;
}

// ─── Partnership Inquiries ───────────────────────────────────────────────────

export async function getPartnershipInquiries(filters?: {
  status?: string;
  search?: string;
  productId?: string;
}): Promise<PartnershipInquiry[]> {
  let list = await readFileSafe<PartnershipInquiry>(PARTNERSHIPS_FILE, memoryPartnerships);
  memoryPartnerships = list;

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((item) => item.status === filters.status);
  }

  if (filters?.productId && filters.productId !== 'ALL') {
    list = list.filter((item) => item.targetProductId === filters.productId);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (item) =>
        item.organization.toLowerCase().includes(q) ||
        item.contactName.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.proposalTitle.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPartnershipInquiryById(id: string): Promise<PartnershipInquiry | null> {
  const list = await getPartnershipInquiries();
  return list.find((item) => item.id === id || item.reference === id) || null;
}

export async function createPartnershipInquiry(
  data: Omit<PartnershipInquiry, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<PartnershipInquiry> {
  const list = await readFileSafe<PartnershipInquiry>(PARTNERSHIPS_FILE, memoryPartnerships);
  const now = new Date().toISOString();
  const id = `part-${Date.now()}`;
  const reference = generateReference('BX-PART');

  const newInquiry: PartnershipInquiry = {
    ...data,
    id,
    reference,
    status: 'NEW',
    createdAt: now,
    updatedAt: now,
    notes: [],
    activities: [
      {
        id: `act-${Date.now()}`,
        action: 'SUBMISSION',
        actor: 'Applicant',
        details: `Partnership inquiry submitted for ${data.organization}`,
        timestamp: now,
      },
    ],
  };

  list.unshift(newInquiry);
  memoryPartnerships = list;
  await writeFileSafe(PARTNERSHIPS_FILE, list);
  return newInquiry;
}

export async function updatePartnershipInquiry(
  id: string,
  updates: Partial<PartnershipInquiry>,
  actorName: string = 'Staff'
): Promise<PartnershipInquiry | null> {
  const list = await readFileSafe<PartnershipInquiry>(PARTNERSHIPS_FILE, memoryPartnerships);
  const index = list.findIndex((item) => item.id === id || item.reference === id);
  if (index === -1) return null;

  const current = list[index];
  const now = new Date().toISOString();
  const activities = current.activities ? [...current.activities] : [];

  if (updates.status && updates.status !== current.status) {
    activities.unshift({
      id: `act-${Date.now()}`,
      action: 'STATUS_CHANGE',
      actor: actorName,
      details: `Status changed from ${current.status} to ${updates.status}`,
      timestamp: now,
    });
  }

  if (updates.assignedTo && updates.assignedTo !== current.assignedTo) {
    activities.unshift({
      id: `act-${Date.now()}`,
      action: 'ASSIGNMENT',
      actor: actorName,
      details: `Assigned to ${updates.assignedTo}`,
      timestamp: now,
    });
  }

  const updated: PartnershipInquiry = {
    ...current,
    ...updates,
    updatedAt: now,
    activities,
  };

  list[index] = updated;
  memoryPartnerships = list;
  await writeFileSafe(PARTNERSHIPS_FILE, list);
  return updated;
}

// ─── Investment Interests (Role Restricted) ──────────────────────────────────

export function canAccessInvestments(role?: AdminRole): boolean {
  if (!role) return false;
  return role === 'SUPER_ADMIN' || role === 'CEO' || role === 'FINANCE' || role === 'PARTNERSHIP_LEAD';
}

export async function getInvestmentInterests(
  role?: AdminRole,
  filters?: { status?: string; search?: string; range?: string }
): Promise<InvestmentInterest[]> {
  if (role && !canAccessInvestments(role)) {
    throw new Error('ACCESS_DENIED: You do not have permission to view investment records.');
  }

  let list = await readFileSafe<InvestmentInterest>(INVESTMENTS_FILE, memoryInvestments);
  memoryInvestments = list;

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((item) => item.status === filters.status);
  }

  if (filters?.range && filters.range !== 'ALL') {
    list = list.filter((item) => item.indicativeRange === filters.range);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (item) =>
        item.firstName.toLowerCase().includes(q) ||
        item.lastName.toLowerCase().includes(q) ||
        (item.organization && item.organization.toLowerCase().includes(q)) ||
        item.reference.toLowerCase().includes(q) ||
        item.investorType.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getInvestmentInterestById(
  id: string,
  role?: AdminRole
): Promise<InvestmentInterest | null> {
  if (role && !canAccessInvestments(role)) {
    throw new Error('ACCESS_DENIED: You do not have permission to view investment records.');
  }
  const list = await getInvestmentInterests(role);
  return list.find((item) => item.id === id || item.reference === id) || null;
}

export async function createInvestmentInterest(
  data: Omit<InvestmentInterest, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<InvestmentInterest> {
  const list = await readFileSafe<InvestmentInterest>(INVESTMENTS_FILE, memoryInvestments);
  const now = new Date().toISOString();
  const id = `inv-${Date.now()}`;
  const reference = generateReference('BXI');

  const newInterest: InvestmentInterest = {
    ...data,
    id,
    reference,
    status: 'NEW',
    createdAt: now,
    updatedAt: now,
    notes: [],
    activities: [
      {
        id: `act-${Date.now()}`,
        action: 'SUBMISSION',
        actor: 'Investor',
        details: `Investment interest registered by ${data.firstName} ${data.lastName}`,
        timestamp: now,
      },
    ],
  };

  list.unshift(newInterest);
  memoryInvestments = list;
  await writeFileSafe(INVESTMENTS_FILE, list);
  return newInterest;
}

export async function updateInvestmentInterest(
  id: string,
  updates: Partial<InvestmentInterest>,
  role?: AdminRole,
  actorName: string = 'Staff'
): Promise<InvestmentInterest | null> {
  if (role && !canAccessInvestments(role)) {
    throw new Error('ACCESS_DENIED: You do not have permission to modify investment records.');
  }

  const list = await readFileSafe<InvestmentInterest>(INVESTMENTS_FILE, memoryInvestments);
  const index = list.findIndex((item) => item.id === id || item.reference === id);
  if (index === -1) return null;

  const current = list[index];
  const now = new Date().toISOString();
  const activities = current.activities ? [...current.activities] : [];

  if (updates.status && updates.status !== current.status) {
    activities.unshift({
      id: `act-${Date.now()}`,
      action: 'STATUS_CHANGE',
      actor: actorName,
      details: `Status changed from ${current.status} to ${updates.status}`,
      timestamp: now,
    });
  }

  if (updates.assignedTo && updates.assignedTo !== current.assignedTo) {
    activities.unshift({
      id: `act-${Date.now()}`,
      action: 'ASSIGNMENT',
      actor: actorName,
      details: `Assigned to ${updates.assignedTo}`,
      timestamp: now,
    });
  }

  const updated: InvestmentInterest = {
    ...current,
    ...updates,
    updatedAt: now,
    activities,
  };

  list[index] = updated;
  memoryInvestments = list;
  await writeFileSafe(INVESTMENTS_FILE, list);
  return updated;
}

// ─── Project Proposals ───────────────────────────────────────────────────────

export async function getProjectProposals(filters?: {
  status?: string;
  search?: string;
  stage?: string;
}): Promise<ProjectProposal[]> {
  let list = await readFileSafe<ProjectProposal>(PROJECTS_FILE, memoryProjects);
  memoryProjects = list;

  if (filters?.status && filters.status !== 'ALL') {
    list = list.filter((item) => item.status === filters.status);
  }

  if (filters?.stage && filters.stage !== 'ALL') {
    list = list.filter((item) => item.stage === filters.stage);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (item) =>
        item.projectName.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.contactName.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getProjectProposalById(id: string): Promise<ProjectProposal | null> {
  const list = await getProjectProposals();
  return list.find((item) => item.id === id || item.reference === id) || null;
}

export async function createProjectProposal(
  data: Omit<ProjectProposal, 'id' | 'reference' | 'status' | 'createdAt' | 'updatedAt'>
): Promise<ProjectProposal> {
  const list = await readFileSafe<ProjectProposal>(PROJECTS_FILE, memoryProjects);
  const now = new Date().toISOString();
  const id = `proj-${Date.now()}`;
  const reference = generateReference('BX-PROJ');

  const newProject: ProjectProposal = {
    ...data,
    id,
    reference,
    status: 'NEW',
    createdAt: now,
    updatedAt: now,
    notes: [],
    activities: [
      {
        id: `act-${Date.now()}`,
        action: 'SUBMISSION',
        actor: 'Applicant',
        details: `Project proposal submitted: ${data.projectName}`,
        timestamp: now,
      },
    ],
  };

  list.unshift(newProject);
  memoryProjects = list;
  await writeFileSafe(PROJECTS_FILE, list);
  return newProject;
}

export async function updateProjectProposal(
  id: string,
  updates: Partial<ProjectProposal>,
  actorName: string = 'Staff'
): Promise<ProjectProposal | null> {
  const list = await readFileSafe<ProjectProposal>(PROJECTS_FILE, memoryProjects);
  const index = list.findIndex((item) => item.id === id || item.reference === id);
  if (index === -1) return null;

  const current = list[index];
  const now = new Date().toISOString();
  const activities = current.activities ? [...current.activities] : [];

  if (updates.status && updates.status !== current.status) {
    activities.unshift({
      id: `act-${Date.now()}`,
      action: 'STATUS_CHANGE',
      actor: actorName,
      details: `Status changed from ${current.status} to ${updates.status}`,
      timestamp: now,
    });
  }

  const updated: ProjectProposal = {
    ...current,
    ...updates,
    updatedAt: now,
    activities,
  };

  list[index] = updated;
  memoryProjects = list;
  await writeFileSafe(PROJECTS_FILE, list);
  return updated;
}

// ─── Notes Management ────────────────────────────────────────────────────────

export async function addInternalNote(
  type: 'partnership' | 'investment' | 'project',
  id: string,
  noteData: { authorName: string; authorRole: string; content: string }
) {
  const newNote = {
    id: `note-${Date.now()}`,
    ...noteData,
    createdAt: new Date().toISOString(),
  };

  if (type === 'partnership') {
    const inquiry = await getPartnershipInquiryById(id);
    if (!inquiry) return null;
    const notes = inquiry.notes ? [newNote, ...inquiry.notes] : [newNote];
    return updatePartnershipInquiry(id, { notes }, noteData.authorName);
  } else if (type === 'investment') {
    const investment = await getInvestmentInterestById(id, 'SUPER_ADMIN');
    if (!investment) return null;
    const notes = investment.notes ? [newNote, ...investment.notes] : [newNote];
    return updateInvestmentInterest(id, { notes }, 'SUPER_ADMIN', noteData.authorName);
  } else {
    const project = await getProjectProposalById(id);
    if (!project) return null;
    const notes = project.notes ? [newNote, ...project.notes] : [newNote];
    return updateProjectProposal(id, { notes }, noteData.authorName);
  }
}

// ─── Overview Stats ──────────────────────────────────────────────────────────

export async function getOverviewStats(role: AdminRole = 'SUPER_ADMIN') {
  const partnerships = await getPartnershipInquiries();
  const projects = await getProjectProposals();

  let investmentsCount = 0;
  let investmentsList: InvestmentInterest[] = [];
  const canSeeInvestments = canAccessInvestments(role);

  if (canSeeInvestments) {
    try {
      investmentsList = await getInvestmentInterests(role);
      investmentsCount = investmentsList.length;
    } catch {
      investmentsCount = 0;
    }
  }

  const allItems = [...partnerships, ...projects, ...(canSeeInvestments ? investmentsList : [])];

  const countByStatus = (status: string) => allItems.filter((i) => i.status === status).length;

  return {
    totalEnquiries: partnerships.length,
    newEnquiries: countByStatus('NEW'),
    screening: countByStatus('SCREENING'),
    underReview: countByStatus('UNDER_REVIEW'),
    contacted: countByStatus('CONTACTED'),
    meetingsRequested: countByStatus('MEETING'),
    activeDiscussions: countByStatus('DUE_DILIGENCE') + countByStatus('NEGOTIATION'),
    approved: countByStatus('APPROVED') + countByStatus('ACTIVE_PARTNERSHIP'),
    declined: countByStatus('DECLINED'),
    investmentInterests: investmentsCount,
    projectProposals: projects.length,
    canSeeInvestments,
  };
}
