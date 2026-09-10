export interface Product {
  id: string;
  name: string;
  slug: string;
  label: string;
  tagline: string;
  description: string;
  category: 'Education' | 'Healthcare' | 'Sustainability' | 'Digital Economy';
  status: 'LIVE' | 'PUBLIC BETA' | 'PRIVATE BETA' | 'IN DEVELOPMENT' | 'RESEARCH';
  accentColor: string;
  platforms: string[];
  launchYear: string;
  overview: string;
  problem: string;
  approach: string;
  features: {
    title: string;
    description: string;
  }[];
  technologyStack: string[];
  impactStatement: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Engineering' | 'Design' | 'Systems' | 'Africa' | 'Perspective';
  excerpt: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  content: string[];
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string;
  linkedin?: string;
}

export const BRAXVIO_PRODUCTS: Product[] = [
  {
    id: 'kampus',
    name: 'Kampus',
    slug: 'kampus',
    label: '01 / EDUCATION',
    tagline: 'University life. One connected experience.',
    description: 'A digital ecosystem designed around the everyday realities of university students—unifying academics, verified student housing, peer marketplaces, and campus life.',
    category: 'Education',
    status: 'PUBLIC BETA',
    accentColor: '#11AFC1',
    platforms: ['iOS', 'Android', 'Web'],
    launchYear: '2024',
    overview: 'University students across emerging markets navigate fragmented, disconnected systems—finding verified accommodation, trading essentials, tracking campus schedules, and building early networks.',
    problem: 'Higher education institutions provide academic portals, but daily student life outside the lecture hall is completely fractured across informal WhatsApp groups, insecure marketplace listings, and unverified housing middlemen.',
    approach: 'Kampus unifies the entire student journey into an institutional-grade, student-verified ecosystem. From verified campus accommodation to peer-to-peer textbook and gadget exchange, Kampus treats student life as a complete system.',
    features: [
      {
        title: 'Verified Student Housing',
        description: 'Direct verification with vetted hostel managers, transparent pricing, student reviews, and scam-free reservations.'
      },
      {
        title: 'Campus Peer Marketplace',
        description: 'Safe, student-id verified buy-and-sell channels restricted to campus networks for textbooks, gadgets, and services.'
      },
      {
        title: 'Academic & Campus Feeds',
        description: 'Unified schedules, department updates, student union announcements, and campus event discovery.'
      },
      {
        title: 'Digital Student Identity',
        description: 'Cryptographically verifiable student identity badge unlocking campus perks, transport discounts, and peer trust.'
      }
    ],
    technologyStack: ['Next.js', 'React Native', 'Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    impactStatement: 'Eliminating housing scams, reducing daily living friction, and connecting over 45,000 university students across flagship campuses.'
  },
  {
    id: 'pharmora',
    name: 'Pharmora',
    slug: 'pharmora',
    label: '02 / HEALTHCARE',
    tagline: 'Making healthcare access feel closer.',
    description: 'A technology-enabled marketplace connecting patients directly with licensed pharmacies, authentic medication inventories, and verified telehealth consultations.',
    category: 'Healthcare',
    status: 'IN DEVELOPMENT',
    accentColor: '#008FC4',
    platforms: ['Web', 'Mobile'],
    launchYear: '2025',
    overview: 'In many emerging cities, finding critical prescribed medication requires physically traveling between multiple retail pharmacies, risking counterfeit drugs and volatile pricing.',
    problem: 'Over 60% of independent pharmacies in sub-Saharan Africa lack real-time digital inventory systems, leading to stockouts, counterfeit drug penetration, and critical delays for chronic patients.',
    approach: 'Pharmora connects licensed community pharmacies via a lightweight cloud inventory bridge, giving patients instant visibility into legitimate stock availability, regulated pricing, and temperature-monitored courier delivery.',
    features: [
      {
        title: 'Real-Time Pharmacy Inventory Network',
        description: 'Live query engine across licensed neighborhood pharmacies to locate specialized medicines without physical store visits.'
      },
      {
        title: 'Prescription Digital Verification',
        description: 'Secure prescription upload verified by licensed pharmacists before fulfillment, complying with healthcare regulatory standards.'
      },
      {
        title: 'Cold-Chain Delivery Tracking',
        description: 'Temperature-sensitive dispatch tracking for insulin, vaccines, and specialized pharmaceuticals with tamper-evident authentication.'
      },
      {
        title: 'Chronic Refill Automation',
        description: 'Predictive reminders and automated recurring refill routing for hypertension, diabetes, and long-term care medications.'
      }
    ],
    technologyStack: ['TypeScript', 'GraphQL', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'Encrypted FHIR Layer'],
    impactStatement: 'Protecting patient safety, reducing prescription search latency from hours to seconds, and expanding retail pharmacy distribution.'
  },
  {
    id: 'ecolift',
    name: 'Ecolift',
    slug: 'ecolift',
    label: '03 / SUSTAINABILITY',
    tagline: 'Smarter movement. Cleaner communities.',
    description: 'A digital logistics platform optimizing municipal and private waste collection, recycling incentives, and dynamic route orchestration for urban sanitation.',
    category: 'Sustainability',
    status: 'IN DEVELOPMENT',
    accentColor: '#42D6C5',
    platforms: ['Driver Mobile', 'Citizen App', 'Dispatcher Web Console'],
    launchYear: '2025',
    overview: 'Rapid urbanization in African metropolises has outpaced traditional municipal waste collection routes, leading to overflowing transfer stations and uncoordinated private haulers.',
    problem: 'Waste management companies run static, inefficient truck routes with high fuel overheads, zero visibility into actual bin volume, and no structured incentive for household waste segregation.',
    approach: 'Ecolift deploys dynamic route optimization, community on-demand pickup requests, and recyclable material credits to transform waste management into a predictable, modern utility.',
    features: [
      {
        title: 'Dynamic Route Optimization',
        description: 'Algorithmic haul dispatching that cuts fuel consumption and vehicle wear by routing based on live bin fill-levels and traffic patterns.'
      },
      {
        title: 'On-Demand Bulky Waste Scheduling',
        description: 'Citizens schedule pickup for e-waste, furniture, and large scrap with transparent municipal fee tracking.'
      },
      {
        title: 'Circular Economy Tokenization',
        description: 'Earn redeemable utility credits or mobile airtime by sorting plastics and aluminum at source before collection.'
      },
      {
        title: 'Municipal Telemetry Dashboard',
        description: 'City governments and private operators view real-time fleet GPS, tonnage collected, and carbon diversion metrics.'
      }
    ],
    technologyStack: ['Go', 'React', 'OpenStreetMap / Valhalla', 'MQTT IoT Gateway', 'ClickHouse', 'PostGIS'],
    impactStatement: 'Targeting a 35% reduction in municipal collection route transit times and accelerating household recyclable segregation.'
  },
  {
    id: 'devpay-africa',
    name: 'DevPay Africa',
    slug: 'devpay-africa',
    label: '04 / DIGITAL ECONOMY',
    tagline: 'African talent. Global opportunity.',
    description: 'A unified financial and contract infrastructure enabling African software engineers, designers, and creators to invoice international clients, hold multi-currency earnings, and get paid with zero friction.',
    category: 'Digital Economy',
    status: 'PRIVATE BETA',
    accentColor: '#006EAA',
    platforms: ['Web Platform', 'API'],
    launchYear: '2024',
    overview: 'Africa has the fastest growing developer workforce globally, yet receiving cross-border remittances, managing international client contracts, and overcoming banking barriers remains severely difficult.',
    problem: 'International wire transfers take 5–10 business days, lose up to 12% in hidden FX conversion spreads, and foreign clients frequently hesitate due to compliance and local invoicing fears.',
    approach: 'DevPay Africa delivers compliant international invoicing, milestone-locked smart escrow, multi-currency virtual accounts (USD, GBP, EUR), and instant payout into local mobile money or domestic bank accounts.',
    features: [
      {
        title: 'Global Multi-Currency Receiving Accounts',
        description: 'Direct virtual accounts in the US, UK, and EU allowing international clients to pay via standard local domestic ACH/SEPA transfers.'
      },
      {
        title: 'Milestone Escrow & Contract Protection',
        description: 'Automated contract generation with escrow milestones that release funds upon verified pull-request or deliverable approval.'
      },
      {
        title: 'Instant Local Settlement',
        description: 'Immediate liquidity into Mobile Money (MTN, Telecel, M-Pesa) and commercial banks across 14 African nations at institutional FX rates.'
      },
      {
        title: 'Tax & Compliance Automation',
        description: 'Automated W-8BEN form handling, localized invoices, and annual income summaries for sovereign tax filings.'
      }
    ],
    technologyStack: ['Next.js', 'Rust Engine', 'PostgreSQL', 'Stripe / Banking APIs', 'Audit Log Trail'],
    impactStatement: 'Empowering African technological professionals to compete globally without arbitrary banking and geographic boundaries.'
  }
];

export const BRAXVIO_PRINCIPLES = [
  {
    number: '01',
    title: 'Start with the problem.',
    description: 'We do not build technology because an idea sounds clever or trendy. We build because an essential daily system is fractured, slow, or unfair to the people relying on it.'
  },
  {
    number: '02',
    title: 'Design around people.',
    description: 'Real users operate on varying device capabilities, intermittent network connectivity, and under busy, stressful circumstances. Interfaces must be forgiving, transparent, and effortlessly clear.'
  },
  {
    number: '03',
    title: 'Build for reality.',
    description: 'Abstract software theories fail when deployed into the messy complexities of physical cities and developing markets. We build for the actual world as it is, not as a silicon valley whitepaper envisions it.'
  },
  {
    number: '04',
    title: 'Think in systems.',
    description: 'No product exists in isolation. Health connects to logistics; education connects to commerce and financial identity. Braxvio products share unified infrastructural DNA.'
  },
  {
    number: '05',
    title: 'Earn trust.',
    description: 'Trust is fragile and takes years to earn. We handle user data, healthcare privacy, and financial earnings with institutional discipline and zero deceptive patterns.'
  },
  {
    number: '06',
    title: 'Keep evolving.',
    description: 'Technology is never finished. We listen constantly, measure what happens in the field, discard our own preconceptions, and continuously refine our craft.'
  }
];

export const SECTORS = [
  {
    id: 'education',
    name: 'Education',
    tagline: 'Connected university ecosystems',
    description: 'Rebuilding the fragmented digital fabric of higher education to serve student living, verified housing, and campus economies.',
    productName: 'Kampus',
    productSlug: 'kampus'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    tagline: 'Democratized pharmacy distribution',
    description: 'Unifying independent retail pharmacies into a resilient digital supply network that guarantees authentic medication accessibility.',
    productName: 'Pharmora',
    productSlug: 'pharmora'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    tagline: 'Intelligent urban logistics',
    description: 'Deploying algorithmic routing and citizen incentives to optimize municipal sanitation and circular economy resource recovery.',
    productName: 'Ecolift',
    productSlug: 'ecolift'
  },
  {
    id: 'digital-economy',
    name: 'Digital Economy',
    tagline: 'Frictionless cross-border labor rails',
    description: 'Bridging the geographic financial divide so African talent can contract, work, and settle internationally with dignity.',
    productName: 'DevPay Africa',
    productSlug: 'devpay-africa'
  }
];

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: '1',
    slug: 'why-we-build-systems-not-apps',
    title: 'Why Braxvio Builds Systems, Not Disposable Apps',
    category: 'Perspective',
    excerpt: 'The consumer internet is crowded with standalone applications that solve symptoms while ignoring root infrastructural failures. Here is why we treat everyday problems as interconnected systems.',
    readTime: '6 min read',
    publishedDate: 'February 2025',
    author: {
      name: 'Braxvio Systems Architecture',
      role: 'Core Engineering Group'
    },
    content: [
      'In the consumer technology landscape of the past decade, the dominant playbook was simple: take one specific interaction, build an app around it, spend venture capital to subsidize acquisition, and hope network effects solidify before unit economics catch up.',
      'In emerging markets, particularly across Africa, this model breaks down. The reason is structural: you cannot simply build a ride-hailing app if road addressing is broken; you cannot simply build an online pharmacy if pharmaceutical supply authenticity is compromised upstream; you cannot build a freelance marketplace if cross-border banking rails reject domestic debit cards.',
      'At Braxvio, we arrived at an uncompromising conclusion: we do not build isolated apps. We build systems.',
      'A system looks at the complete lifecycle of human activity. When we engineered Kampus, we did not create another forum. We looked at where a university student lives, how they pay for utilities, how they find safe accommodation without extortion, and how their verified student identity can anchor micro-commerce.',
      'When products share common architectural primitives—cryptographic identity, resilient offline-first data sync, local currency settlement rails, and unified design tokens—each new product makes every previous product stronger.'
    ]
  },
  {
    id: '2',
    slug: 'engineering-for-the-real-world',
    title: 'Engineering for Sub-Saharan Network Realities',
    category: 'Engineering',
    excerpt: 'Designing high-performance web and mobile platforms that maintain sub-second responsiveness across volatile 3G/4G cellular networks and low-memory devices.',
    readTime: '8 min read',
    publishedDate: 'January 2025',
    author: {
      name: 'Braxvio Engineering Group',
      role: 'Platform & Infrastructure'
    },
    content: [
      'Most software architectures are unconsciously tested on fiber connections and the latest high-end smartphones. In our target operational environments, the reality is starkly different.',
      'A user walking across a campus or checking a medical dispensary inventory in an urban market might encounter sudden cell tower congestion, 200ms latency spikes, and high packet drop rates. If your frontend bundle requires 4MB of uncompressed JavaScript before first paint, you have failed before the user even begins.',
      'Our engineering tenets mandate extreme bundle discipline: strict server component boundaries, zero unnecessary runtime dependencies, progressive SVG rendering, and aggressive edge-caching of static query paths.',
      'Furthermore, state synchronization across our products relies on optimistic local storage with conflict-free idempotent retry loops. When connectivity drops, the user interface remains responsive and transparent.'
    ]
  },
  {
    id: '3',
    slug: 'the-future-of-african-digital-labor',
    title: 'The Geography of Code: Unlocking Africa’s Engineering Capital',
    category: 'Africa',
    excerpt: 'Africa possesses the youngest and fastest-growing technical population on earth. The bottleneck has never been talent; it has always been structural settlement and financial sovereignty.',
    readTime: '5 min read',
    publishedDate: 'December 2024',
    author: {
      name: 'Braxvio Economic Research',
      role: 'Digital Work Practice'
    },
    content: [
      'Software is one of the few industries where intellectual output is borderless. A pull request written in Accra, Nairobi, or Lagos compiles to the exact same bytecode as one written in San Francisco or London.',
      'Yet for years, African software engineers faced an invisible wall: foreign employers worried about regulatory compliance, SWIFT transfers took weeks with punitive exchange spreads, and local banking systems struggled to receive international treasury settlements.',
      'With DevPay Africa, our objective is simple: make hiring an African engineer as frictionless, compliant, and instantaneous as hiring someone across the street. By pairing compliant multi-currency escrow with real-time local mobile money and banking payout, we dismantle geographic friction.'
    ]
  }
];

export const LEADERSHIP_PROFILES: LeadershipMember[] = [
  {
    id: 'michael-kwesi-annor',
    name: 'Michael Kwesi Annor',
    role: 'Founder & Chief Executive Officer',
    bio: 'Fullstack developer, hardworking and smart entrepreneur. Directs Braxvio’s overarching vision, platform architecture, and product engineering initiatives across Africa and global markets.',
    focus: 'Ecosystem Architecture, Executive Strategy & Product Engineering',
    linkedin: 'https://gh.linkedin.com/in/michael-annor-412012300'
  },
  {
    id: 'kofi-adams',
    name: 'Kofi Adams',
    role: 'Co-Founder & Chief Technology Officer',
    bio: 'Systems architect and distributed engineering lead. Formerly engineered scalable payment and data routing platforms across West Africa. Passionate about resilient software primitives and high-availability systems.',
    focus: 'Core Platform Architecture & Security',
    linkedin: 'https://linkedin.com/company/braxvio'
  },
  {
    id: 'elizabeth-asare',
    name: 'Dr. Elizabeth Asare',
    role: 'Head of Product & Healthcare Systems',
    bio: 'Product strategist and health informatics specialist with a background spanning public health logistics, regulatory compliance, and community pharmacy networks.',
    focus: 'Pharmora & Regulated Ecosystems',
    linkedin: 'https://linkedin.com/company/braxvio'
  },
  {
    id: 'marcus-owusu',
    name: 'Marcus Owusu',
    role: 'Head of Design & Human Experience',
    bio: 'Design systems lead focused on typography, human-computer interaction, and interface clarity across varying literacy and device contexts.',
    focus: 'Braxvio Design System & Brand Identity',
    linkedin: 'https://linkedin.com/company/braxvio'
  }
];

export const COMPANY_FACTS = {
  name: 'Braxvio Technologies',
  hq: 'Accra, Ghana',
  mission: 'Build technology that makes everyday systems work better.',
  vision: 'A future where technology expands what people can do without friction.',
  status: 'Parent Technology Company',
  founded: '2024',
  scope: 'African-Born • Globally Standardized',
  socials: {
    linkedin: 'https://linkedin.com/company/braxvio',
    x: 'https://x.com/braxvio',
    github: 'https://github.com/braxvio'
  }
};
