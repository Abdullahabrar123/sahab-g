import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  Route,
  Package,
  HardHat,
  Truck,
  Settings2,
  ShieldCheck,
  Clock3,
  Handshake,
  MapPinned,
  Headset,
  FileCheck2,
} from 'lucide-react'

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Our Services' },
  { to: '/fleet', label: 'Our Fleet' },
  { to: '/routes', label: 'Routes' },
  { to: '/team', label: 'Our Team' },
  { to: '/clients', label: 'Clients & Contracts' },
  { to: '/contact', label: 'Contact Us' },
] as const

const img = (name: string) => `/images/${name}.webp`

/* ───────────────────────────── Services ───────────────────────────── */

export type Service = {
  slug: string
  title: string
  short: string
  intro: string
  body: string[]
  features: string[]
  idealFor: string[]
  vehicles: string[]
  image: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: 'corporate-transportation',
    title: 'Corporate Transportation',
    short: 'Scheduled, accountable transport for companies that need their goods moved on time, every time.',
    intro:
      'Dependable transport partnerships for corporate clients — built around your schedules, your sites and your reporting needs.',
    body: [
      'Corporate shipments demand more than a truck and a driver. They need clear communication, documented handovers and a partner who understands that a missed delivery affects an entire project or supply chain.',
      'We work with corporate clients on recurring and on-demand movements between offices, warehouses, project sites and distribution points across Pakistan, with a single point of contact for every job.',
    ],
    features: [
      'Single point of contact for every consignment',
      'Recurring schedules or on-demand dispatch',
      'Documented loading and delivery handovers',
      'Vehicle selection matched to load and site access',
      'Contract and per-trip arrangements',
      'Coordination with your site and warehouse teams',
    ],
    idealFor: ['Telecom & technology companies', 'Corporate offices & warehouses', 'Distributors & suppliers'],
    vehicles: ['container-truck', 'six-wheeler', 'mazda'],
    image: img('semi-night'),
    icon: Building2,
  },
  {
    slug: 'intercity-transportation',
    title: 'Intercity Transportation',
    short: 'Road freight between Islamabad, Lahore, Karachi, Peshawar, Faisalabad, Multan and beyond.',
    intro:
      'Connecting Pakistan’s major commercial centres by road — along the motorway and national highway network.',
    body: [
      'From the M-1 and M-2 in the north to the M-5 and M-9 corridor down to Karachi, we move cargo between Pakistan’s major cities with vehicles sized for each load.',
      'Whether it is a single full-truck load or a regular weekly lane, we plan the route, the vehicle and the timing so your consignment arrives safely.',
    ],
    features: [
      'Full-truck-load movements between major cities',
      'Regular lane scheduling for repeat shipments',
      'Route planning on motorway & highway corridors',
      'Light, medium and heavy vehicle options',
      'Loading & unloading coordination',
      'Updates from dispatch through delivery',
    ],
    idealFor: ['Manufacturers', 'Traders & wholesalers', 'Retail & FMCG distribution'],
    vehicles: ['container-truck', 'six-wheeler', 'mazda', 'flatbed'],
    image: img('mountain-highway'),
    icon: Route,
  },
  {
    slug: 'commercial-cargo',
    title: 'Commercial Cargo Transportation',
    short: 'General, palletised and bulk commercial goods moved securely from pickup to destination.',
    intro: 'Secure movement of commercial goods — from packaged cartons and pallets to bulk materials.',
    body: [
      'Commercial cargo comes in every shape. We match the vehicle to the goods: enclosed containers for weather-sensitive cargo, flatbeds for oversized items and light trucks for smaller city-to-city loads.',
      'Loads are secured for the journey and handed over at destination with care, so your goods arrive in the condition they left.',
    ],
    features: [
      'Enclosed, open and flatbed vehicle options',
      'Palletised, cartoned and bulk goods',
      'Cargo securing for long-distance travel',
      'Pickup from factories, warehouses & markets',
      'Multi-drop deliveries on request',
      'Clear pricing agreed before dispatch',
    ],
    idealFor: ['Factories & industrial units', 'Wholesale markets', 'Import / export consignments inland'],
    vehicles: ['container-truck', 'flatbed', 'six-wheeler', 'shahzore'],
    image: img('loading-cargo'),
    icon: Package,
  },
  {
    slug: 'project-logistics',
    title: 'Project-Based Logistics',
    short: 'Planned transport for projects — equipment, materials and site deliveries, phased to your timeline.',
    intro:
      'Logistics planned around your project — phased deliveries of equipment and materials to sites across Pakistan.',
    body: [
      'Infrastructure, telecom and construction projects depend on materials reaching the right site at the right phase. We plan transport as part of your project schedule, not as an afterthought.',
      'From the first mobilisation to the final delivery, we coordinate vehicles, routes and site access so your teams can keep working.',
    ],
    features: [
      'Phased delivery plans aligned to project milestones',
      'Equipment and material movement to remote sites',
      'Flatbeds for heavy and oversized items',
      'Site-access and route assessment',
      'Dedicated coordinator for the project duration',
      'Multi-city and multi-site deployments',
    ],
    idealFor: ['Telecom infrastructure rollouts', 'Construction & engineering projects', 'Energy & industrial projects'],
    vehicles: ['flatbed', 'container-truck', 'six-wheeler'],
    image: img('project-site'),
    icon: HardHat,
  },
  {
    slug: 'dedicated-vehicles',
    title: 'Dedicated Truck & Vehicle Arrangements',
    short: 'Vehicles reserved exclusively for your business — daily, weekly, monthly or for a contract term.',
    intro: 'Your own transport capacity without owning a fleet — vehicles dedicated to your operation.',
    body: [
      'When your business moves goods every day, waiting for an available truck costs time. Dedicated arrangements put agreed vehicles at your disposal for the period you need.',
      'Choose the vehicle types and the term; we handle the vehicles and drivers, so you can focus on your operation.',
    ],
    features: [
      'Daily, weekly, monthly or contract-term hire',
      'Vehicle types matched to your regular loads',
      'Consistent drivers familiar with your sites',
      'Flexible scaling for peak periods',
      'Simple monthly billing options',
      'Replacement arrangements to keep you moving',
    ],
    idealFor: ['Distribution operations', 'Corporate supply chains', 'Long-running projects'],
    vehicles: ['mazda', 'shahzore', 'pickup', 'six-wheeler'],
    image: img('decorated-trucks'),
    icon: Truck,
  },
  {
    slug: 'customized-solutions',
    title: 'Customized Transportation Solutions',
    short: 'Unusual loads, tight timelines or multi-stop routes — transport planned around your exact requirement.',
    intro: 'Not every shipment fits a standard service. Tell us the requirement and we will plan around it.',
    body: [
      'Some movements need a tailored approach: mixed vehicle types, multiple pickups and drops, time-critical windows or special handling.',
      'We start with your requirement, propose a vehicle and route plan, agree the terms with you, and then execute it.',
    ],
    features: [
      'Mixed-vehicle and multi-stop planning',
      'Time-critical and after-hours movements',
      'Special handling requirements',
      'Short-notice arrangements where possible',
      'Proposal with plan and pricing before commitment',
      'One coordinator from planning to delivery',
    ],
    idealFor: ['One-off & special movements', 'Event & exhibition logistics', 'Office & facility relocations'],
    vehicles: ['container-truck', 'flatbed', 'mazda', 'shahzore', 'pickup'],
    image: img('warehouse'),
    icon: Settings2,
  },
]

/* ───────────────────────────── Fleet ───────────────────────────── */

export type Vehicle = {
  id: string
  name: string
  category: 'Heavy' | 'Medium' | 'Light'
  description: string
  uses: string[]
  image: string
  position?: string
}

export const fleet: Vehicle[] = [
  {
    id: 'container-truck',
    name: 'Container / Long-Haul Truck',
    category: 'Heavy',
    description: 'Enclosed long-haul trucks and trailers for large, weather-sensitive consignments on intercity lanes.',
    uses: ['Long-distance intercity freight', 'Corporate & warehouse transfers', 'High-volume packaged goods'],
    image: img('container-highway'),
  },
  {
    id: 'flatbed',
    name: 'Flatbed Trailer',
    category: 'Heavy',
    description: 'Open flatbeds for heavy, oversized and awkwardly shaped cargo that will not fit an enclosed body.',
    uses: ['Machinery & equipment', 'Construction materials', 'Project site deliveries'],
    image: img('flatbed'),
  },
  {
    id: 'six-wheeler',
    name: '6-Wheeler Cargo Truck',
    category: 'Medium',
    description: 'Versatile cargo trucks — the workhorse of Pakistan’s highways — for full loads between cities.',
    uses: ['Intercity general cargo', 'Bulk & bagged goods', 'Market and factory pickups'],
    image: img('hay-truck'),
  },
  {
    id: 'mazda',
    name: 'Mazda Truck',
    category: 'Medium',
    description: 'Mid-size Mazda trucks for medium loads that need more space than a light vehicle.',
    uses: ['Medium intercity loads', 'Distribution runs', 'Dedicated contract hire'],
    image: img('mazda-truck'),
    position: 'center 35%',
  },
  {
    id: 'shahzore',
    name: 'Shahzore',
    category: 'Light',
    description: 'Light commercial trucks that are quick and economical for smaller consignments and city deliveries.',
    uses: ['Smaller consignments', 'Intra-city & nearby-city runs', 'Multi-drop deliveries'],
    image: img('shahzore'),
  },
  {
    id: 'pickup',
    name: 'Pickup',
    category: 'Light',
    description: 'Pickups for urgent, compact loads and access to locations where larger trucks cannot reach.',
    uses: ['Urgent small loads', 'Tight-access locations', 'Site support runs'],
    image: img('pickup'),
  },
]

export const vehicleById = (id: string) => fleet.find((v) => v.id === id)

/* ───────────────────────────── Cities & routes ───────────────────────────── */

export type City = { name: string; province: string; lat: number; lon: number; core: boolean }

export const cities: City[] = [
  { name: 'Islamabad', province: 'Capital Territory', lat: 33.68, lon: 73.05, core: true },
  { name: 'Rawalpindi', province: 'Punjab', lat: 33.6, lon: 73.04, core: true },
  { name: 'Peshawar', province: 'Khyber Pakhtunkhwa', lat: 34.01, lon: 71.58, core: true },
  { name: 'Lahore', province: 'Punjab', lat: 31.55, lon: 74.34, core: true },
  { name: 'Faisalabad', province: 'Punjab', lat: 31.42, lon: 73.08, core: true },
  { name: 'Multan', province: 'Punjab', lat: 30.16, lon: 71.52, core: true },
  { name: 'Karachi', province: 'Sindh', lat: 24.86, lon: 67.01, core: true },
  { name: 'Gujranwala', province: 'Punjab', lat: 32.16, lon: 74.19, core: false },
  { name: 'Sialkot', province: 'Punjab', lat: 32.49, lon: 74.53, core: false },
  { name: 'Sukkur', province: 'Sindh', lat: 27.7, lon: 68.86, core: false },
  { name: 'Hyderabad', province: 'Sindh', lat: 25.4, lon: 68.37, core: false },
  { name: 'Quetta', province: 'Balochistan', lat: 30.18, lon: 66.98, core: false },
]

export type Lane = { from: string; to: string; km: number; via: string }

/** Distances are approximate road distances, for orientation only. */
export const lanes: Lane[] = [
  { from: 'Islamabad', to: 'Lahore', km: 375, via: 'M-2 Motorway' },
  { from: 'Islamabad', to: 'Peshawar', km: 185, via: 'M-1 Motorway' },
  { from: 'Lahore', to: 'Karachi', km: 1210, via: 'M-3, M-5 & M-9 corridor' },
  { from: 'Islamabad', to: 'Karachi', km: 1410, via: 'M-2, M-4, M-5 & M-9' },
  { from: 'Lahore', to: 'Faisalabad', km: 180, via: 'M-3 / Sheikhupura Road' },
  { from: 'Faisalabad', to: 'Multan', km: 240, via: 'M-4 Motorway' },
  { from: 'Lahore', to: 'Multan', km: 340, via: 'M-3 & M-4' },
  { from: 'Multan', to: 'Karachi', km: 900, via: 'M-5 & M-9' },
  { from: 'Peshawar', to: 'Karachi', km: 1590, via: 'M-1, M-2, M-4, M-5 & M-9' },
]

/** Corridors drawn on the network map (ordered city chains). */
export const corridors: { path: string[]; dashed?: boolean }[] = [
  { path: ['Peshawar', 'Islamabad', 'Lahore'] },
  { path: ['Islamabad', 'Faisalabad', 'Multan'] },
  { path: ['Lahore', 'Faisalabad'] },
  { path: ['Lahore', 'Multan', 'Sukkur', 'Hyderabad', 'Karachi'] },
  { path: ['Lahore', 'Gujranwala', 'Sialkot'], dashed: true },
  { path: ['Quetta', 'Sukkur'], dashed: true },
]

/* ───────────────────────────── Why us / values ───────────────────────────── */

export const reasons: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Reliable delivery', text: 'Planned routes, the right vehicle and clear timelines agreed before dispatch.', icon: Clock3 },
  { title: 'Cargo handled with care', text: 'Loads secured properly for long-distance journeys and handed over with care.', icon: ShieldCheck },
  { title: 'Nationwide coverage', text: 'Major intercity lanes from Peshawar and Islamabad down to Karachi.', icon: MapPinned },
  { title: 'Right vehicle for the job', text: 'Pickups, Shahzore, Mazda, 6-wheelers, containers and flatbeds.', icon: Truck },
  { title: 'Corporate-ready', text: 'Experience serving corporate clients with documented, accountable service.', icon: FileCheck2 },
  { title: 'One point of contact', text: 'A dedicated coordinator who keeps you informed from pickup to delivery.', icon: Headset },
]

export const values: { title: string; text: string; icon: LucideIcon }[] = [
  { title: 'Reliability', text: 'We commit to timelines we can keep — and then keep them.', icon: Clock3 },
  { title: 'Integrity', text: 'Transparent pricing and honest communication on every job.', icon: Handshake },
  { title: 'Safety', text: 'Safe driving, secure loads and care for every consignment.', icon: ShieldCheck },
  { title: 'Partnership', text: 'We treat our clients’ operations as if they were our own.', icon: Building2 },
]

export const process = [
  { step: '01', title: 'Share your requirement', text: 'Pickup city, destination, cargo details and preferred date.' },
  { step: '02', title: 'Get a plan & quote', text: 'We recommend a vehicle and route and confirm pricing.' },
  { step: '03', title: 'Pickup & transit', text: 'Your cargo is loaded, secured and on its way.' },
  { step: '04', title: 'Safe delivery', text: 'Delivered and handed over at destination.' },
]
