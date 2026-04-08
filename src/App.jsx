import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardCheck, 
  MapPin, 
  Phone, 
  Settings, 
  FileText, 
  Users, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  MoreHorizontal, 
  Search, 
  Plus, 
  Download, 
  MessageSquare, 
  ArrowRight,
  Info,
  Upload,
  Copy,
  Lock,
  Filter,
  RefreshCcw,
  Layers,
  ArrowUpRight,
  Calendar,
  Building2,
  History,
  ShieldCheck,
  Sticker,
  Mail,
  FileCheck,
  Tag,
  Globe,
  Briefcase,
  BarChart,
  Activity,
  UserPlus,
  Eye,
  FileSpreadsheet,
  FileType,
  FileBadge,
  Check,
  ChevronDown,
  Trash2,
  MoreVertical
} from 'lucide-react';

// --- Constants & Data ---

const ROLES = {
  PRACTICE_ADMIN: 'Practice Admin',
  INTERNAL_IMPLEMENTATION: 'Implementation Team'
};

const ROLLOUT_STAGES = [
  'Onboarding',
  'Kickoff',
  'Document Verification',
  'Device Ordering',
  'Porting',
  'Pre Go-Live',
  'Go Live'
];

const STAGE_STATES = [
  'Not Started',
  'In Progress',
  'Pending Review',
  'Changes Requested',
  'Completed'
];

const PRACTICE_BASE_DATA = {
  name: "BrightSmiles Dental Group",
  address: "500 N Michigan Ave, Suite 600, Chicago, IL 60611",
  totalLocations: 100,
  prefContact: "Email",
  sharedProgress: 82,
  contractStatus: "Active - Annual Enterprise",
  contractRenewal: "Aug 12, 2025",
  salesNotes: "Aggressive expansion planned for Q4. Focus on high-quality audio branding. Primary competitor was RingCentral.",
  poc: {
    primary: { name: "Dr. Sarah Lee", role: "Owner / Lead Dentist", email: "dr.lee@brightsmiles.com", phone: "(312) 555-0192", pref: "Email" },
    backup: { name: "James Wilson", role: "Operations Manager", email: "j.wilson@brightsmiles.com", phone: "(312) 555-0195", pref: "Phone" }
  },
  stageDistribution: [
    { stage: 'Onboarding', count: 15 },
    { stage: 'Kickoff', count: 12 },
    { stage: 'Doc Verification', count: 8 },
    { stage: 'Device Ordering', count: 10 },
    { stage: 'Porting', count: 5 },
    { stage: 'Pre Go-Live', count: 6 },
    { stage: 'Go Live', count: 44 }
  ]
};

const MOCK_LOCATIONS = [
  { id: 1, name: "Downtown Main Clinic", address: "123 Main St, Chicago, IL 60601", city: "Chicago", stage: 'Porting', state: 'In Progress', progress: 65, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'RingCentral' },
  { id: 2, name: "North Hills Pediatric", address: "456 North Rd, Evanston, IL 60201", city: "Evanston", stage: 'Onboarding', state: 'Changes Requested', progress: 15, timezone: 'America/Chicago', pms: 'Eaglesoft', phoneSys: 'Traditional' },
  { id: 3, name: "Westside Family Dental", address: "789 West Blvd, Oak Park, IL 60301", city: "Oak Park", stage: 'Device Ordering', state: 'Pending Review', progress: 45, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'VOIP' },
  { id: 4, name: "Lakeside Specialists", address: "101 Lake Dr, Chicago, IL 60611", city: "Chicago", stage: 'Go Live', state: 'Completed', progress: 100, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'Nextiva' },
];

const PRACTICE_TIMELINE = [
  { event: "Practice Workspace Created", date: "Aug 01, 2024", type: "system" },
  { event: "Shared Practice Setup Completed", date: "Aug 05, 2024", type: "user" },
  { event: "First Location (Lakeside) Onboarding Started", date: "Aug 10, 2024", type: "rollout" },
  { event: "Contract Milestone: 25% Go-Live Reached", date: "Sep 20, 2024", type: "milestone" },
];

const MOCK_INTERNAL_ACCOUNTS = [
  { name: 'BrightSmiles Dental Group', sites: 100, live: 24, progress: 34, lead: 'Marcus T.', status: 'Active Rollout', health: 'Healthy' },
  { name: 'Unity Medical Center', sites: 12, live: 12, progress: 100, lead: 'Sarah J.', status: 'Fully Live', health: 'Healthy' },
  { name: 'Evergreen Orthodontics', sites: 45, live: 0, progress: 12, lead: 'Marcus T.', status: 'Stalled Intake', health: 'At Risk' },
  { name: 'North Chicago Pediatrics', sites: 8, live: 4, progress: 50, lead: 'Sarah J.', status: 'In Implementation', health: 'Healthy' },
  { name: 'Elite Vision Care', sites: 32, live: 0, progress: 5, lead: 'James K.', status: 'Onboarding', health: 'Healthy' },
];

const LOCATION_SECTIONS = [
  { id: 'basics', title: 'Location Basics', status: 'Complete' },
  { id: 'phones', title: 'Phone Setup', status: 'In Progress' },
  { id: 'workflow', title: 'Workflow Details', status: 'Not Started' },
  { id: 'hours', title: 'Hours & Holidays', status: 'Not Started' },
  { id: 'additional', title: 'Additional Info', status: 'Not Started' },
  { id: 'uploads', title: 'Documents & Uploads', status: 'Not Started' },
];

// --- Sub-Components ---

const Badge = ({ children, variant = 'default' }) => {
  const styles = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700',
    info: 'bg-blue-50 text-blue-700',
    error: 'bg-red-50 text-red-700',
    indigo: 'bg-indigo-50 text-indigo-700',
  };
  return <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>{children}</span>;
};

const ContactCard = ({ title, data, isBackup = false, editable = true }) => (
  <div className={`p-4 rounded-2xl border ${isBackup ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${isBackup ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
          <Users size={14} />
        </div>
        <p className={`text-[10px] font-black uppercase tracking-wider ${isBackup ? 'text-slate-400' : 'text-blue-600'}`}>{title}</p>
      </div>
      {editable && <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:underline">EDIT</button>}
    </div>
    {data ? (
      <div className="space-y-1">
        <p className="text-sm font-black text-slate-800">{data.name}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase">{data.role}</p>
        <div className="pt-2 flex flex-col gap-1">
           <div className="flex items-center gap-2 text-[11px] text-slate-600"><Mail size={12}/> {data.email}</div>
           <div className="flex items-center gap-2 text-[11px] text-slate-600"><Phone size={12}/> {data.phone}</div>
           <div className="mt-1"><Badge variant="info">Prefers: {data.pref}</Badge></div>
        </div>
      </div>
    ) : (
      <div className="py-2">
        <button className="w-full py-3 border border-dashed border-slate-300 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white transition-all">+ Add POC</button>
      </div>
    )}
  </div>
);

const Card = ({ children, title, icon: Icon, action, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden ${className}`}>
    {(title || Icon) && (
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-slate-400" />}
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{title}</h3>
        </div>
        {action}
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);

const FormField = ({ label, helper, children, required, inheritance = 'default' }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-1.5">
      <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {inheritance && (
        <div className={`flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${inheritance === 'default' ? 'text-slate-400 bg-slate-50' : 'text-blue-600 bg-blue-50'}`}>
          {inheritance === 'default' ? <Layers size={10}/> : <RefreshCcw size={10}/>}
          {inheritance === 'default' ? 'Default' : 'Override'}
        </div>
      )}
    </div>
    {children}
    {helper && <p className="text-[10px] text-slate-400 mt-2 italic">{helper}</p>}
  </div>
);

// --- Main Application ---

export default function App() {
  const [role, setRole] = useState(ROLES.PRACTICE_ADMIN);
  const [currentPage, setCurrentPage] = useState('profile'); // profile | tracker | summary | shared | docs
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedLocId, setExpandedLocId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSummaryExportModal, setShowSummaryExportModal] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [internalTab, setInternalTab] = useState('overview'); // overview | summary | notes | timeline
  const [exportScope, setExportScope] = useState('entire');
  const [showCloneModal, setShowCloneModal] = useState(false);

  // Form states
  const [formState, setFormState] = useState({
    recordAll: "No",
    routingPattern: "Simultaneous",
    dnd: true,
    timezone: "America/Chicago"
  });

  const handleInputChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const toggleLocationExpand = (id) => {
    setExpandedLocId(expandedLocId === id ? null : id);
  };

  const toggleLocationSelection = (id) => {
    setSelectedLocations(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // 1. New Practice Profile Dashboard
  const renderPracticeProfile = () => (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-start pb-2 border-b border-slate-200">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{PRACTICE_BASE_DATA.name} Profile</h1>
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <div className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-500" /> {PRACTICE_BASE_DATA.address}</div>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase text-[10px] tracking-widest"><Building2 size={12}/> {PRACTICE_BASE_DATA.totalLocations} Locations</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-xs font-black uppercase text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">Edit Practice</button>
          <button className="px-4 py-2 text-xs font-black uppercase text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">+ Add Location</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Rollout Funnel Snapshot */}
          <div className="bg-white rounded-3xl border border-slate-200/60 p-8 shadow-sm">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><Activity size={16} className="text-blue-500" /> Rollout Stage Distribution</h3>
                <Badge variant="indigo">Global Rollup</Badge>
             </div>
             <div className="flex gap-1 h-2 bg-slate-50 rounded-full overflow-hidden mb-6">
                {PRACTICE_BASE_DATA.stageDistribution.map((item, i) => (
                  <div key={item.stage} style={{ width: `${item.count}%` }} className={`${['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-indigo-600', 'bg-emerald-500'][i]} h-full`} />
                ))}
             </div>
             <div className="grid grid-cols-7 gap-2">
                {PRACTICE_BASE_DATA.stageDistribution.map(item => (
                  <div key={item.stage} className="text-center">
                    <p className="text-lg font-black text-slate-800">{item.count}</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter leading-tight">{item.stage}</p>
                  </div>
                ))}
             </div>
          </div>

          {/* Expandable Locations Section */}
          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Sites & Configuration ({MOCK_LOCATIONS.length})</h3>
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <input type="text" placeholder="Search sites..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-100 w-64 shadow-sm" />
                      <Search size={14} className="absolute left-3 top-2.5 text-slate-300" />
                   </div>
                </div>
             </div>

             <div className="space-y-3">
                {MOCK_LOCATIONS.map(loc => (
                  <div key={loc.id} className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden transition-all group">
                    <div 
                      onClick={() => toggleLocationExpand(loc.id)}
                      className={`px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${expandedLocId === loc.id ? 'bg-slate-50/50 border-b border-slate-100' : ''}`}
                    >
                       <div className="flex items-center gap-6">
                          <div className={`w-2 h-2 rounded-full ${loc.state === 'Completed' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                          <div className="w-48">
                             <p className="text-sm font-black text-slate-800 tracking-tight">{loc.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{loc.city} • {loc.timezone}</p>
                          </div>
                          <div className="hidden md:block w-40">
                             <p className="text-[9px] font-black text-slate-400 uppercase mb-0.5">Stage</p>
                             <Badge variant="indigo">{loc.stage}</Badge>
                          </div>
                          <div className="hidden md:block">
                             <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Status</p>
                             <Badge variant={loc.state === 'Completed' ? 'success' : 'warning'}>{loc.state}</Badge>
                          </div>
                       </div>
                       <ChevronDown size={20} className={`text-slate-300 transition-transform duration-300 ${expandedLocId === loc.id ? 'rotate-180' : ''}`} />
                    </div>

                    {expandedLocId === loc.id && (
                      <div className="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-10 animate-in slide-in-from-top-4 duration-300">
                         <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Full Address</p>
                                  <p className="text-xs font-bold text-slate-700 leading-relaxed">{loc.address}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Local Settings</p>
                                  <p className="text-xs font-bold text-slate-700">{loc.pms} • {loc.phoneSys}</p>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                               <ContactCard title="Primary Site Lead" data={PRACTICE_BASE_DATA.poc.primary} editable={false} />
                               <ContactCard title="Backup Site Lead" editable={false} />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col gap-4">
                               <div className="flex justify-between items-center">
                                  <div>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                                     <p className="text-xs font-bold text-slate-700">2 hours ago</p>
                                  </div>
                                  <button onClick={() => { setActiveLocation(loc); setCurrentPage('location-detail'); }} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2">
                                     Workspace <ArrowUpRight size={14}/>
                                  </button>
                               </div>
                               <div className="w-full bg-white p-4 rounded-2xl border border-slate-200">
                                  <div className="flex justify-between items-center mb-2">
                                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Rollout Timeline</p>
                                     <Badge variant="indigo">Stage {ROLLOUT_STAGES.indexOf(loc.stage) + 1}/7</Badge>
                                  </div>
                                  <div className="flex items-center gap-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                     {ROLLOUT_STAGES.map((s, idx) => (
                                       <div key={idx} className={`h-full flex-grow ${idx <= ROLLOUT_STAGES.indexOf(loc.stage) ? 'bg-blue-600' : 'bg-transparent'}`} />
                                     ))}
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card title="Practice POCs" icon={Users}>
             <div className="space-y-4">
                <ContactCard title="Primary Practice POC" data={PRACTICE_BASE_DATA.poc.primary} />
                <ContactCard title="Backup Practice POC" data={PRACTICE_BASE_DATA.poc.backup} isBackup />
             </div>
          </Card>

          <Card title="Practice Timeline" icon={History}>
             <div className="space-y-6 relative ml-2">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100" />
                {PRACTICE_TIMELINE.map((item, i) => (
                  <div key={i} className="relative pl-8">
                     <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${item.type === 'milestone' ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                     <p className="text-[11px] font-black text-slate-800 leading-tight tracking-tight">{item.event}</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{item.date}</p>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );

  // 2. Setup Summary Content (Consolidated Review)
  const renderSetupSummaryContent = () => (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Setup Summary</h1>
          <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest opacity-60">Consolidated Workspace Data</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSummaryExportModal(true)} className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all tracking-widest">
            <Download size={18} /> Generate Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
           <Card title="Practice Data Overview" icon={Building2}>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Account Structure</p>
                    <p className="text-sm font-black text-slate-800 tracking-tight">{PRACTICE_BASE_DATA.name}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{PRACTICE_BASE_DATA.address}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Contract Status</p>
                       <p className="text-xs font-bold text-slate-700">{PRACTICE_BASE_DATA.contractStatus}</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Population</p>
                       <p className="text-xs font-bold text-slate-700">{PRACTICE_BASE_DATA.totalLocations} Sites</p>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Internal Implementation Notes</p>
                    <div className="space-y-3">
                       <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                          <p className="text-[11px] text-slate-600 italic">"Client priority shifted to Chicago Metro sites for rollout phase 1."</p>
                          <p className="text-[8px] text-slate-400 mt-1 font-bold uppercase">Marcus Thompson • 1d ago</p>
                       </div>
                    </div>
                 </div>
              </div>
           </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <Card title="Section Readiness Analytics" icon={FileCheck}>
              <div className="grid grid-cols-2 gap-4">
                 {LOCATION_SECTIONS.map(s => (
                   <div key={s.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:bg-white hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${s.status === 'Complete' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                           {s.status === 'Complete' ? <CheckCircle2 size={16}/> : <Clock size={16}/>}
                        </div>
                        <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{s.title}</p>
                      </div>
                      <Badge variant={s.status === 'Complete' ? 'success' : 'info'}>{s.status}</Badge>
                   </div>
                 ))}
              </div>
           </Card>

           <Card title="Consolidated Site Rollup" icon={Layers} action={
             <div className="flex items-center gap-4">
                <button onClick={() => setSelectedLocations(MOCK_LOCATIONS.map(l => l.id))} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Select All</button>
                <div className="w-px h-3 bg-slate-200" />
                <button onClick={() => setSelectedLocations([])} className="text-[10px] font-black text-slate-400 uppercase hover:underline">Clear</button>
             </div>
           }>
              <div className="overflow-x-auto -mx-6 -mb-6">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-y border-slate-100">
                       <tr>
                          <th className="px-6 py-3 w-10"></th>
                          <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Site</th>
                          <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Stage</th>
                          <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Progress</th>
                          <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-right">Settings</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {MOCK_LOCATIONS.map(loc => (
                         <tr key={loc.id} className={`hover:bg-slate-50/80 transition-colors ${selectedLocations.includes(loc.id) ? 'bg-blue-50/40' : ''}`}>
                            <td className="px-6 py-4">
                               <input 
                                  type="checkbox" 
                                  checked={selectedLocations.includes(loc.id)} 
                                  onChange={() => toggleLocationSelection(loc.id)}
                                  className="w-4 h-4 rounded accent-blue-600" 
                               />
                            </td>
                            <td className="px-6 py-4">
                               <p className="text-sm font-black text-slate-800">{loc.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase">{loc.city}</p>
                            </td>
                            <td className="px-6 py-4"><Badge variant="indigo">{loc.stage}</Badge></td>
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-2">
                                  <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="bg-blue-600 h-full" style={{ width: `${loc.progress}%` }} />
                                  </div>
                                  <span className="text-[10px] font-black text-slate-500">{loc.progress}%</span>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                               {loc.id % 2 === 0 ? <Badge variant="warning">Overrides Active</Badge> : <Badge>Default</Badge>}
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );

  // 3. Implementation Team Dashboard View (Account Registry)
  const renderInternalRegistry = () => (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Implementation Registry</h1>
          <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest opacity-60">Global Project Pipeline</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> New Account Rollout
        </button>
      </header>
      <div className="grid grid-cols-4 gap-6">
        {[
          { l: 'Projects', v: '48', i: <Layers/>, c: 'blue' },
          { l: 'Porting Queue', v: '124', i: <Phone/>, c: 'indigo' },
          { l: 'Reviews', v: '18', i: <Eye/>, c: 'amber' },
          { l: '7 Day Go-Live', v: '42', i: <Activity/>, c: 'emerald' }
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-5 shadow-sm hover:border-blue-200 transition-all">
             <div className={`p-4 bg-${s.c}-50 text-${s.c}-600 rounded-xl`}>{s.i}</div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.l}</p>
                <p className="text-2xl font-black text-slate-800">{s.v}</p>
             </div>
          </div>
        ))}
      </div>
      <Card title="Practice Implementation Queue" icon={Briefcase}>
         <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-left">
               <thead className="bg-slate-50 border-y border-slate-100">
                  <tr>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Practice Group</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Rollout Progress</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase">Sites</th>
                     <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Health</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_INTERNAL_ACCOUNTS.map((p, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 cursor-pointer" onClick={() => { setCurrentPage('dashboard'); setInternalTab('overview'); }}>
                       <td className="px-6 py-5">
                          <p className="text-sm font-black text-slate-800">{p.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Implementation Lead: {p.lead}</p>
                       </td>
                       <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                             <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${p.health === 'At Risk' ? 'bg-amber-500' : 'bg-blue-600'}`} style={{ width: `${p.progress}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-slate-700">{p.progress}%</span>
                          </div>
                       </td>
                       <td className="px-6 py-5 font-bold text-xs text-slate-700 uppercase tracking-widest">{p.sites} Locations</td>
                       <td className="px-6 py-5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                             <div className={`w-1.5 h-1.5 rounded-full ${p.health === 'At Risk' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                             <span className={`text-[10px] font-black uppercase ${p.health === 'At Risk' ? 'text-amber-600' : 'text-emerald-600'}`}>{p.health}</span>
                          </div>
                       </td>
                       <td className="px-6 py-5 text-right pr-8"><ChevronRight size={18} className="text-slate-300 inline" /></td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );

  const renderLocationDetail = () => {
    if (!activeLocation) return null;
    const currentSection = LOCATION_SECTIONS[activeStep];
    return (
      <div className="max-w-[1400px] mx-auto space-y-8 animate-in slide-in-from-right-10 duration-500 pb-20">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-6">
            <button onClick={() => { setActiveLocation(null); setCurrentPage('dashboard'); }} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{activeLocation.name}</h1>
                <Badge variant={activeLocation.state === 'Completed' ? 'success' : 'warning'}>{activeLocation.state}</Badge>
              </div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <MapPin size={14} className="text-blue-500" /> {activeLocation.city} • {activeLocation.timezone}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowCloneModal(true)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Copy size={16} /> Clone Configuration
            </button>
            <button className="px-6 py-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
              Finalize Step <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Execution Steps</p>
                <div className="space-y-1">
                  {LOCATION_SECTIONS.map((s, i) => (
                    <button 
                      key={s.id}
                      onClick={() => setActiveStep(i)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${activeStep === i ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-100'}`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border-2 ${activeStep === i ? 'border-white/40 bg-white/20' : 'border-slate-200 text-slate-400 group-hover:border-blue-200'}`}>
                        {s.status === 'Complete' ? <CheckCircle2 size={12}/> : i + 1}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white">
                <p className="text-[10px] font-black text-blue-400 uppercase mb-6 tracking-widest">Site Implementation Timeline</p>
                <div className="space-y-6 relative ml-1">
                   <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-white/10" />
                   {[
                     { l: 'Intake Started', d: 'Aug 10', s: 'done' },
                     { l: 'Shared Practice Sync', d: 'Aug 12', s: 'done' },
                     { l: 'Technical Technical Audit', d: 'Current', s: 'active' },
                     { l: 'Target Go-Live', d: 'Oct 12', s: 'todo' },
                   ].map((t, idx) => (
                     <div key={idx} className="relative pl-6">
                        <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-slate-900 z-10 ${t.s === 'done' ? 'bg-emerald-500' : t.s === 'active' ? 'bg-blue-600 animate-pulse' : 'bg-slate-700'}`} />
                        <p className={`text-[10px] font-black uppercase tracking-tight ${t.s === 'todo' ? 'text-slate-500' : 'text-slate-200'}`}>{t.l}</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">{t.d}</p>
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div className="lg:col-span-9 bg-white rounded-[3rem] border border-slate-200 shadow-sm p-12 lg:p-16">
              <div className="mb-12">
                 <Badge variant="indigo">Section {activeStep + 1} of {LOCATION_SECTIONS.length}</Badge>
                 <h2 className="text-4xl font-black text-slate-900 mt-3 tracking-tighter">{currentSection.title}</h2>
                 <p className="text-slate-400 text-sm mt-2 italic font-medium">Fields are autosaved. Defaults inherited from Practice Workspace.</p>
              </div>

              {activeStep === 0 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                    <FormField label="Location Name" required inheritance="overridden">
                      <input type="text" defaultValue={activeLocation.name} className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                    <FormField label="Local Timezone" required inheritance="default">
                      <div className="relative">
                        <select className="w-full px-5 py-4 text-sm font-bold bg-white border border-slate-200 rounded-2xl outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100">
                           <option>America/Chicago (CST)</option>
                           <option>America/New_York (EST)</option>
                           <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                        </select>
                        <Globe size={18} className="absolute right-4 top-4 text-slate-300" />
                      </div>
                    </FormField>
                  </div>
                  
                  <FormField label="Practice Address" required inheritance="overridden" helper="Physical address for location-specific billing and service registration.">
                    <textarea defaultValue={activeLocation.address} className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none h-24 resize-none focus:ring-2 focus:ring-blue-100" />
                  </FormField>

                  <div className="grid grid-cols-2 gap-10 pt-8 border-t border-slate-50">
                    <ContactCard title="Primary Site Lead" data={PRACTICE_BASE_DATA.poc.primary} />
                    <ContactCard title="Backup Site Lead" />
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                   <div className="grid grid-cols-2 gap-10">
                      <FormField label="Total Handsets" required inheritance="overridden">
                        <input type="number" defaultValue={12} className="w-full px-5 py-4 text-sm font-bold bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100" />
                      </FormField>
                      <FormField label="Device Model" inheritance="default">
                        <input type="text" readOnly defaultValue="Poly VVX 450" className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl" />
                      </FormField>
                   </div>
                </div>
              )}

              <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
                 <button onClick={() => setActiveStep(s => Math.max(0, s - 1))} className={`px-10 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all ${activeStep === 0 ? 'opacity-0 invisible' : ''}`}>
                   Previous Section
                 </button>
                 <button onClick={() => setActiveStep(s => Math.min(LOCATION_SECTIONS.length - 1, s + 1))} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-3">
                    {activeStep === LOCATION_SECTIONS.length - 1 ? 'Finalize Workspace' : 'Continue Step'} <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <div className="bg-slate-900 text-white py-1.5 px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest sticky top-0 z-[110] border-b border-white/5 shadow-lg">
        <div className="flex gap-6">
          <span className="text-blue-400 flex items-center gap-2"><Layers size={12}/> Rollout Console v3.5</span>
        </div>
        <div className="flex gap-1 p-0.5 bg-slate-800 rounded-lg overflow-hidden border border-white/5">
          {Object.values(ROLES).map(r => (
            <button key={r} onClick={() => { setRole(r); setCurrentPage(r === ROLES.PRACTICE_ADMIN ? 'profile' : 'dashboard'); setInternalTab('overview'); }} className={`px-3 py-1 rounded-md transition-all ${role === r ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-screen">
        <nav className="w-80 bg-white border-r border-slate-200/60 p-8 hidden lg:flex flex-col h-screen sticky top-10">
          <div className="flex items-center gap-4 mb-16 px-2">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-100">VS</div>
            <div>
              <h2 className="text-xl font-black leading-none tracking-tighter text-slate-900">VoiceStack</h2>
              <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mt-1">Rollout Workspace</p>
            </div>
          </div>
          
          <div className="space-y-2 flex-grow">
            {role === ROLES.INTERNAL_IMPLEMENTATION ? (
              <>
                <button onClick={() => { setCurrentPage('dashboard'); setInternalTab('overview'); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${currentPage === 'dashboard' && internalTab === 'overview' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                    <Layers size={18} /> Implementation Registry
                </button>
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <History size={18} /> Global Review Queue
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <div className="flex items-center gap-4"><Users size={18} /> Team Capacity</div>
                    <Badge variant="success">82%</Badge>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setCurrentPage('profile')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${currentPage === 'profile' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                    <LayoutDashboard size={18} /> Practice Profile
                </button>
                <button onClick={() => setCurrentPage('dashboard')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${currentPage === 'dashboard' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                    <Activity size={18} /> Rollout Tracker
                </button>
                <button onClick={() => setCurrentPage('setup-summary')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${currentPage === 'setup-summary' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                    <ClipboardCheck size={18} /> Setup Summary
                </button>
                <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <div className="flex items-center gap-4"><FileBadge size={18} /> Contract & Docs</div>
                    <Badge variant="indigo">100</Badge>
                </button>
              </>
            )}
          </div>

          <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-lg uppercase">
                  {role === ROLES.PRACTICE_ADMIN ? 'SL' : 'MT'}
                </div>
                <div>
                   <p className="text-sm font-black text-slate-800 truncate tracking-tight">
                    {role === ROLES.PRACTICE_ADMIN ? 'Dr. Sarah Lee' : 'Marcus Thompson'}
                   </p>
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{role}</p>
                </div>
             </div>
          </div>
        </nav>

        <main className="flex-grow p-8 lg:p-12 overflow-y-auto max-h-screen">
           {currentPage === 'profile' && renderPracticeProfile()}
           {currentPage === 'dashboard' && (
             role === ROLES.INTERNAL_IMPLEMENTATION ? renderInternalRegistry() : renderPracticeProfile()
           )}
           {currentPage === 'setup-summary' && (role === ROLES.PRACTICE_ADMIN ? renderSetupSummaryContent() : renderPracticeProfile())}
           {currentPage === 'location-detail' && renderLocationDetail()}
        </main>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-400">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Invite Team Member</h2>
                 <button onClick={() => setShowInviteModal(false)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all"><Plus size={24} className="rotate-45" /></button>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <FormField label="Full Name" required inheritance={null}>
                       <input type="text" placeholder="John Doe" className="w-full px-5 py-3.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                    <FormField label="Email" required inheritance={null}>
                       <input type="email" placeholder="john@example.com" className="w-full px-5 py-3.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button onClick={() => setShowInviteModal(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Cancel</button>
                    <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">Send Invitation</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {showSummaryExportModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-12 animate-in zoom-in-95 duration-400 text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm"><Download size={36}/></div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight uppercase text-xs">Export Scope Manager</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed px-4 italic">Configure scope and format for documentation.</p>
              
              <div className="space-y-3 mb-10">
                <button 
                  onClick={() => setExportScope('entire')}
                  className={`w-full p-5 border-2 rounded-3xl text-left transition-all ${exportScope === 'entire' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}
                >
                   <div className="flex justify-between items-center mb-2">
                      <div className={`p-2 rounded-xl shadow-sm ${exportScope === 'entire' ? 'bg-white text-blue-600' : 'bg-white text-slate-400'}`}><Building2 size={16}/></div>
                      <div className={`w-4 h-4 rounded-full border-4 bg-white ${exportScope === 'entire' ? 'border-blue-600' : 'border-slate-200'}`} />
                   </div>
                   <p className={`text-sm font-black ${exportScope === 'entire' ? 'text-blue-800' : 'text-slate-600'}`}>Entire Practice Dataset (All 100 Sites)</p>
                </button>
                <button 
                  onClick={() => setExportScope('selected')}
                  className={`w-full p-5 border-2 rounded-3xl text-left transition-all ${exportScope === 'selected' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}
                >
                   <div className="flex justify-between items-center mb-2">
                      <div className={`p-2 rounded-xl shadow-sm ${exportScope === 'selected' ? 'bg-white text-blue-600' : 'bg-white text-slate-400'}`}><MapPin size={16}/></div>
                      <div className={`w-4 h-4 rounded-full border-4 bg-white ${exportScope === 'selected' ? 'border-blue-600' : 'border-slate-200'}`} />
                   </div>
                   <p className={`text-sm font-black ${exportScope === 'selected' ? 'text-blue-800' : 'text-slate-600'}`}>Targeted Selection ({selectedLocations.length} Sites)</p>
                </button>
              </div>

              <div className="flex gap-4">
                 <button onClick={() => setShowSummaryExportModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase text-xs tracking-widest">Cancel</button>
                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase text-xs tracking-widest">Prepare Download</button>
              </div>
           </div>
        </div>
      )}

      {showCloneModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 duration-400 text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm"><Copy size={36}/></div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight uppercase text-xs">Smart Clone Profile</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed px-4">Apply configurations from another location or shared defaults.</p>
              <div className="space-y-3 mb-10 text-left">
                <select className="w-full p-5 border-2 border-slate-100 bg-slate-50 rounded-3xl text-sm font-bold text-slate-700 outline-none appearance-none font-bold">
                   <option>Lakeside Specialists (Live)</option>
                   <option>Downtown Main Clinic (95%)</option>
                </select>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setShowCloneModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase text-xs tracking-widest">Cancel</button>
                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase text-xs tracking-widest">Apply Setup</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
