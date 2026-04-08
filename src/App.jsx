import React, { useState, useMemo } from 'react';
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
  MoreVertical,
  UserCheck
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
  { id: 1, name: "Downtown Main Clinic", address: "123 Main St, Chicago, IL 60601", city: "Chicago", stage: 'Porting', state: 'In Progress', progress: 65, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'RingCentral', owner: 'Marcus T.', sectionStatus: [1, 1, 1, 0, 0, 0] },
  { id: 2, name: "North Hills Pediatric", address: "456 North Rd, Evanston, IL 60201", city: "Evanston", stage: 'Onboarding', state: 'Changes Requested', progress: 15, timezone: 'America/Chicago', pms: 'Eaglesoft', phoneSys: 'Traditional', owner: 'Sarah J.', sectionStatus: [1, 0, 0, 0, 0, 0] },
  { id: 3, name: "Westside Family Dental", address: "789 West Blvd, Oak Park, IL 60301", city: "Oak Park", stage: 'Device Ordering', state: 'Pending Review', progress: 45, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'VOIP', owner: 'Marcus T.', sectionStatus: [1, 1, 0, 0, 0, 0] },
  { id: 4, name: "Lakeside Specialists", address: "101 Lake Dr, Chicago, IL 60611", city: "Chicago", stage: 'Go Live', state: 'Completed', progress: 100, timezone: 'America/Chicago', pms: 'Dentrix', phoneSys: 'Nextiva', owner: 'James K.', sectionStatus: [1, 1, 1, 1, 1, 1] },
];

const MOCK_INTERNAL_ACCOUNTS = [
  { name: 'BrightSmiles Dental Group', sites: 100, live: 24, progress: 34, lead: 'Marcus T.', status: 'Active Rollout', health: 'Healthy' },
  { name: 'Unity Medical Center', sites: 12, live: 12, progress: 100, lead: 'Sarah J.', status: 'Fully Live', health: 'Healthy' },
  { name: 'Evergreen Orthodontics', sites: 45, live: 0, progress: 12, lead: 'Marcus T.', status: 'Stalled Intake', health: 'At Risk' },
  { name: 'North Chicago Pediatrics', sites: 8, live: 4, progress: 50, lead: 'Sarah J.', status: 'In Implementation', health: 'Healthy' },
];

const PRACTICE_TIMELINE = [
  { event: "Practice Workspace Created", date: "Aug 01, 2024", type: "system" },
  { event: "Shared Practice Setup Completed", date: "Aug 05, 2024", type: "user" },
  { event: "First Location Onboarding Started", date: "Aug 10, 2024", type: "rollout" },
  { event: "Contract Milestone: 25% Go-Live Reached", date: "Sep 20, 2024", type: "milestone" },
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

const ContactCard = ({ title, data, isBackup = false, editable = true, onClone }) => (
  <div className={`p-4 rounded-2xl border ${isBackup ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 shadow-sm'}`}>
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg ${isBackup ? 'bg-slate-200 text-slate-500' : 'bg-blue-50 text-blue-600'}`}>
          <Users size={14} />
        </div>
        <p className={`text-[10px] font-black uppercase tracking-wider ${isBackup ? 'text-slate-400' : 'text-blue-600'}`}>{title}</p>
      </div>
      <div className="flex gap-2">
        {onClone && <button onClick={onClone} title="Clone POC Details" className="text-[10px] font-bold text-blue-600 p-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"><Copy size={12}/></button>}
        {editable && <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 hover:underline transition-colors">EDIT</button>}
      </div>
    </div>
    {data ? (
      <div className="space-y-1">
        <p className="text-sm font-black text-slate-800">{data.name}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase">{data.role}</p>
        <div className="pt-2 flex flex-col gap-1 border-t border-slate-100/60 mt-2">
           <div className="flex items-center gap-2 text-[11px] text-slate-600"><Mail size={12}/> {data.email}</div>
           <div className="flex items-center gap-2 text-[11px] text-slate-600"><Phone size={12}/> {data.phone}</div>
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
  <div className="mb-6 last:mb-0">
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

const SectionMiniStepper = ({ statusArray }) => (
  <div className="flex items-center gap-1.5">
    {statusArray.map((filled, idx) => (
      <div 
        key={idx} 
        className={`w-4 h-1.5 rounded-full transition-all ${filled ? 'bg-blue-600 shadow-sm' : 'bg-slate-200'}`}
        title={LOCATION_SECTIONS[idx].title}
      />
    ))}
  </div>
);

// --- Main Application ---

export default function App() {
  const [role, setRole] = useState(ROLES.PRACTICE_ADMIN);
  const [currentPage, setCurrentPage] = useState('profile'); 
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedLocId, setExpandedLocId] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSummaryExportModal, setShowSummaryExportModal] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [internalTab, setInternalTab] = useState('profile');
  const [exportScope, setExportScope] = useState('entire');
  const [showCloneModal, setShowCloneModal] = useState(false);

  // Filtering States
  const [portfolioFilter, setPortfolioFilter] = useState("");
  const [summaryOwnerFilter, setSummaryOwnerFilter] = useState("All Owners");

  const toggleLocationExpand = (id) => {
    setExpandedLocId(expandedLocId === id ? null : id);
  };

  const toggleLocationSelection = (id) => {
    setSelectedLocations(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectAllLocations = () => {
    if (selectedLocations.length === MOCK_LOCATIONS.length) {
      setSelectedLocations([]);
    } else {
      setSelectedLocations(MOCK_LOCATIONS.map(l => l.id));
    }
  };

  const filteredPortfolio = useMemo(() => {
    return MOCK_LOCATIONS.filter(l => 
      l.name.toLowerCase().includes(portfolioFilter.toLowerCase()) || 
      l.city.toLowerCase().includes(portfolioFilter.toLowerCase())
    );
  }, [portfolioFilter]);

  const filteredSummary = useMemo(() => {
    return MOCK_LOCATIONS.filter(l => 
      summaryOwnerFilter === "All Owners" || l.owner === summaryOwnerFilter
    );
  }, [summaryOwnerFilter]);

  // DASHBOARD 1: Practice Profile
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
          <button className="px-4 py-2 text-xs font-black uppercase text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm">Edit Practice</button>
          <button className="px-4 py-2 text-xs font-black uppercase text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">+ Add Location</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <Card title="Entity Identity" icon={Building2}>
              <div className="grid grid-cols-2 gap-10">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Practice Name</p>
                    <p className="text-sm font-bold text-slate-800">{PRACTICE_BASE_DATA.name}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Master Address</p>
                    <p className="text-sm font-bold text-slate-800 leading-relaxed">{PRACTICE_BASE_DATA.address}</p>
                 </div>
              </div>
           </Card>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Site Management Portfolio ({MOCK_LOCATIONS.length})</h3>
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Filter sites..." 
                      className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-blue-100 w-64 shadow-sm"
                      value={portfolioFilter}
                      onChange={(e) => setPortfolioFilter(e.target.value)}
                    />
                    <Search size={14} className="absolute left-3 top-2.5 text-slate-300" />
                 </div>
              </div>
              <div className="space-y-3">
                 {filteredPortfolio.map(loc => (
                   <div key={loc.id} className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden group">
                      <div onClick={() => toggleLocationExpand(loc.id)} className={`px-8 py-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors ${expandedLocId === loc.id ? 'bg-slate-50/50 border-b border-slate-100' : ''}`}>
                         <div className="flex items-center gap-6">
                            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all"><MapPin size={20}/></div>
                            <div>
                               <p className="text-sm font-black text-slate-800 tracking-tight">{loc.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase">{loc.city} • {loc.timezone}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-6">
                            <Badge variant="indigo">{loc.stage}</Badge>
                            <ChevronDown size={20} className={`text-slate-300 transition-transform ${expandedLocId === loc.id ? 'rotate-180' : ''}`} />
                         </div>
                      </div>
                      {expandedLocId === loc.id && (
                        <div className="p-8 grid grid-cols-2 gap-10 animate-in slide-in-from-top-4">
                           <div className="space-y-6">
                              <div>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Site Identity Details</p>
                                 <p className="text-xs font-bold text-slate-700 leading-relaxed">{loc.address}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                                 <ContactCard 
                                    title="Primary Site Lead" 
                                    data={PRACTICE_BASE_DATA.poc.primary} 
                                    editable={false} 
                                    onClone={() => setShowCloneModal(true)} 
                                  />
                                 <ContactCard 
                                    title="Backup Site Lead" 
                                    editable={false} 
                                    onClone={() => setShowCloneModal(true)} 
                                  />
                              </div>
                           </div>
                           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-between">
                              <div>
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">State</p>
                                       <Badge variant={loc.state === 'Completed' ? 'success' : 'warning'}>{loc.state}</Badge>
                                    </div>
                                    <div className="text-right">
                                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total progress</p>
                                       <p className="text-xl font-black text-blue-600">{loc.progress}%</p>
                                    </div>
                                 </div>
                                 <p className="text-[10px] text-slate-400 mt-4 italic font-medium">Local Config: {loc.pms} • {loc.phoneSys}</p>
                              </div>
                              <div className="flex gap-2 mt-6">
                                 <button className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-600 hover:bg-slate-100 transition-all">Profile Edit</button>
                                 <button onClick={() => { setActiveLocation(loc); setActiveStep(0); setCurrentPage('location-detail'); }} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-100 flex items-center justify-center gap-2 tracking-widest">Workspace <ArrowUpRight size={14}/></button>
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
          <Card title="Stakeholders" icon={Users}>
             <div className="space-y-4">
                <ContactCard title="Practice Lead" data={PRACTICE_BASE_DATA.poc.primary} />
                <ContactCard title="Backup Lead" data={PRACTICE_BASE_DATA.poc.backup} isBackup={true} />
             </div>
          </Card>

          <Card title="Audit Timeline" icon={History}>
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

  // DASHBOARD 2: Rollout Tracker
  const renderRolloutTracker = () => (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Rollout Tracker</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest font-bold opacity-60">Implementation Phase Pipeline</p>
        </div>
        <button onClick={() => setShowSummaryExportModal(true)} className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all tracking-widest">
          <Download size={18} /> Download Tracker
        </button>
      </header>

      <Card title="Funnel Distribution" icon={BarChart}>
        <div className="flex items-center w-full gap-1 h-16 bg-slate-50 p-2 rounded-2xl mb-6">
          {PRACTICE_BASE_DATA.stageDistribution.map((item, i) => {
            const width = `${(item.count / 100) * 100}%`;
            const colors = ['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-indigo-600', 'bg-emerald-500'];
            return (
              <div key={item.stage} style={{ width }} className={`${colors[i]} h-full first:rounded-l-xl last:rounded-r-xl relative transition-all hover:opacity-80`} />
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-4">
          {PRACTICE_BASE_DATA.stageDistribution.map((item) => (
            <div key={item.stage} className="text-center">
              <p className="text-2xl font-black text-slate-800">{item.count}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter truncate leading-tight">{item.stage}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Operational Status Board" icon={Layers}>
        <div className="overflow-x-auto -mx-6 -mb-6">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-y border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Site Identifier</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Stage</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Section Completion</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-right">Completion %</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {MOCK_LOCATIONS.map(loc => (
                 <tr key={loc.id} className="hover:bg-blue-50/20 group cursor-pointer" onClick={() => { setActiveLocation(loc); setActiveStep(0); setCurrentPage('location-detail'); }}>
                    <td className="px-8 py-5">
                       <p className="text-sm font-black text-slate-800">{loc.name}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">{loc.city}</p>
                    </td>
                    <td className="px-8 py-5">
                       <Badge variant="indigo">{loc.stage}</Badge>
                    </td>
                    <td className="px-8 py-5 flex justify-center">
                       <SectionMiniStepper statusArray={loc.sectionStatus} />
                    </td>
                    <td className="px-8 py-5 text-right font-black text-blue-600 text-sm">
                       {loc.progress}%
                    </td>
                    <td className="px-8 py-5 text-right pr-10">
                       <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                          <ChevronRight size={14} />
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  // DASHBOARD 3: Setup Summary (Refined with Section Summary & Owner Filtering)
  const renderSetupSummary = () => (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Setup Summary</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest font-bold opacity-60">Account Documentation Hub</p>
        </div>
        <button onClick={() => setShowSummaryExportModal(true)} className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all tracking-widest">
          <Download size={18} /> Export Workspace
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-6">
           <Card title="Section-wise Population Status" icon={FileCheck}>
              <div className="space-y-4">
                 {LOCATION_SECTIONS.map(s => (
                   <div key={s.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex justify-between items-center group hover:bg-white hover:border-blue-200 transition-all shadow-sm">
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

           <Card title="Practice Overview" icon={Building2}>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Master Configuration</p>
                    <p className="text-sm font-bold text-slate-800 leading-relaxed">{PRACTICE_BASE_DATA.name}</p>
                 </div>
                 <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl font-medium text-xs text-blue-800">
                    82% population matched. Local overrides identified in 3 locations.
                 </div>
              </div>
           </Card>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-6">
           <Card title="Consolidated Site Review" icon={Layers} action={
             <div className="flex gap-3 items-center">
                <div className="relative">
                  <select 
                    value={summaryOwnerFilter}
                    onChange={(e) => setSummaryOwnerFilter(e.target.value)}
                    className="pl-8 pr-4 py-1.5 text-[10px] font-black uppercase bg-slate-50 border border-slate-200 rounded-lg outline-none appearance-none cursor-pointer hover:border-blue-300"
                  >
                    <option>All Owners</option>
                    <option>Marcus T.</option>
                    <option>Sarah J.</option>
                    <option>James K.</option>
                  </select>
                  <Filter size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
                </div>
                <button onClick={selectAllLocations} className="text-[10px] font-black text-blue-600 uppercase hover:underline">Toggle All</button>
             </div>
           }>
              <div className="overflow-x-auto -mx-6 -mb-6">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 border-y border-slate-100">
                       <tr>
                          <th className="px-8 py-4 w-10"></th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Site</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Implementation Owner</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Setup Progress</th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-right">Inheritance</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {filteredSummary.map(loc => (
                         <tr key={loc.id} className={`hover:bg-slate-50/80 transition-all ${selectedLocations.includes(loc.id) ? 'bg-blue-50/40' : ''}`}>
                            <td className="px-8 py-5">
                               <input type="checkbox" checked={selectedLocations.includes(loc.id)} onChange={() => toggleLocationSelection(loc.id)} className="w-4 h-4 rounded accent-blue-600" />
                            </td>
                            <td className="px-8 py-5">
                               <p className="text-sm font-black text-slate-800">{loc.name}</p>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{loc.timezone}</p>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">{loc.owner.charAt(0)}</div>
                                  <span className="text-xs font-bold text-slate-700">{loc.owner}</span>
                               </div>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-2">
                                  <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                                     <div className="h-full bg-blue-600" style={{ width: `${loc.progress}%` }} />
                                  </div>
                                  <span className="text-[10px] font-black text-slate-500">{loc.progress}%</span>
                               </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                               {loc.id % 2 === 0 ? <Badge variant="warning">Manual Override</Badge> : <Badge>Sync Active</Badge>}
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

  // DASHBOARD 4: Contracts & Documents
  const renderContractsAndDocs = () => (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
       <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contracts & Documents</h1>
          <p className="text-slate-500 text-sm uppercase tracking-widest font-bold opacity-60">Legal and Commercial Hub</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all tracking-widest">
          <Upload size={18} /> New File
        </button>
      </header>

      <div className="grid grid-cols-12 gap-8">
         <div className="col-span-12 lg:col-span-5 space-y-6">
            <Card title="Agreement Intelligence" icon={FileBadge}>
               <div className="space-y-6">
                  <div className="flex justify-between items-start">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                        <p className="text-lg font-black text-slate-800 tracking-tight">{PRACTICE_BASE_DATA.contractStatus}</p>
                     </div>
                     <Badge variant="success">ACTIVE</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Renewal Date</p>
                        <p className="text-sm font-bold text-slate-700">{PRACTICE_BASE_DATA.contractRenewal}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Last Sync</p>
                        <p className="text-sm font-bold text-slate-700">Aug 12, 2024</p>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                     <FileText size={18}/> Download Master MSA
                  </button>
               </div>
            </Card>

            <Card title="Implementation Context" icon={Tag}>
               <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl italic text-sm text-slate-600 leading-relaxed">
                  "{PRACTICE_BASE_DATA.salesNotes}"
               </div>
            </Card>
         </div>

         <div className="col-span-12 lg:col-span-7 space-y-6">
            <Card title="Uploaded Documentation" icon={FileCheck}>
               <div className="space-y-3">
                  {[
                    { n: 'Letters of Authorization - Bulk.pdf', s: 'Verified', d: 'Oct 01, 2024' },
                    { n: 'Hardware Receipt - Downtown Main.pdf', s: 'Pending', d: 'Oct 02, 2024' },
                    { n: 'Emergency 911 Certification.pdf', s: 'Verified', d: 'Aug 20, 2024' }
                  ].map((doc, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between bg-white border border-slate-100 rounded-2xl hover:border-blue-200 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:scale-105 transition-transform"><FileText size={20}/></div>
                          <div>
                             <p className="text-sm font-black text-slate-800">{doc.n}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{doc.d}</p>
                          </div>
                       </div>
                       <Badge variant={doc.s === 'Verified' ? 'success' : 'warning'}>{doc.s}</Badge>
                    </div>
                  ))}
               </div>
            </Card>
         </div>
      </div>
    </div>
  );

  // IMPLEMENTATION TEAM: Global Registry View
  const renderInternalRegistry = () => (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Implementation Registry</h1>
          <p className="text-slate-500 text-sm mt-1 uppercase font-bold tracking-widest opacity-60">Global Portfolio Pipeline</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700">
          <Plus size={18} /> Add Enterprise Group
        </button>
      </header>

      <div className="grid grid-cols-4 gap-6">
        {[
          { l: 'Active Projects', v: '48', i: <Layers size={18}/>, c: 'blue' },
          { l: 'Porting Tasks', v: '124', i: <Phone size={18}/>, c: 'indigo' },
          { l: 'Validation Queue', v: '18', i: <Eye size={18}/>, c: 'amber' },
          { l: 'Upcoming Launch', v: '42', i: <Activity size={18}/>, c: 'emerald' }
        ].map((s, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/60 flex items-center gap-5 shadow-sm">
             <div className={`p-4 bg-${s.c}-50 text-${s.c}-600 rounded-2xl shadow-inner`}>{s.i}</div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.l}</p>
                <p className="text-2xl font-black text-slate-800">{s.v}</p>
             </div>
          </div>
        ))}
      </div>

      <Card title="Active Implementation Queue" icon={Briefcase}>
         <div className="overflow-x-auto -mx-6 -mb-6">
            <table className="w-full text-left border-collapse">
               <thead className="bg-slate-50 border-y border-slate-100">
                  <tr>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Practice Group</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase">Progress</th>
                     <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase text-center">Health</th>
                     <th className="px-8 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {MOCK_INTERNAL_ACCOUNTS.map((p, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 group cursor-pointer transition-colors" onClick={() => { setRole(ROLES.INTERNAL_IMPLEMENTATION); setInternalTab('profile'); setCurrentPage('profile'); }}>
                       <td className="px-8 py-6">
                          <p className="text-sm font-black text-slate-800">{p.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lead: {p.lead} • {p.sites} Sites</p>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className={`h-full ${p.health === 'At Risk' ? 'bg-amber-500' : 'bg-blue-600'}`} style={{ width: `${p.progress}%` }} />
                             </div>
                             <span className="text-[10px] font-black text-slate-700">{p.progress}%</span>
                          </div>
                       </td>
                       <td className="px-8 py-6 text-center">
                          <Badge variant={p.health === 'At Risk' ? 'error' : 'success'}>{p.health}</Badge>
                       </td>
                       <td className="px-8 py-6 text-right pr-12 transition-all">
                          <ChevronRight size={18} className="text-slate-300 inline group-hover:text-blue-600 group-hover:translate-x-1" />
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </Card>
    </div>
  );

  const renderLocationStepper = () => {
    if (!activeLocation) return null;
    const currentSection = LOCATION_SECTIONS[activeStep];
    return (
      <div className="max-w-[1400px] mx-auto space-y-8 animate-in slide-in-from-right-10 duration-500 pb-20">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-6">
            <button onClick={() => { setActiveLocation(null); setCurrentPage('tracker'); }} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm transition-all">
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{activeLocation.name}</h1>
                <Badge variant={activeLocation.state === 'Completed' ? 'success' : 'warning'}>{activeLocation.state}</Badge>
              </div>
              <p className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest font-mono">
                <MapPin size={14} className="text-blue-500" /> {activeLocation.city} • {activeLocation.timezone}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowCloneModal(true)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm tracking-[0.1em]">
              <Copy size={16} /> Clone
            </button>
            <button className="px-6 py-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2 tracking-[0.1em]">
              Submit Stage <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Setup Path</p>
                <div className="space-y-1">
                  {LOCATION_SECTIONS.map((s, i) => (
                    <button 
                      key={s.id}
                      onClick={() => setActiveStep(i)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${activeStep === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'hover:bg-slate-100'}`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border-2 ${activeStep === i ? 'border-white/40 bg-white/20' : 'border-slate-200 text-slate-400'}`}>
                        {s.status === 'Complete' ? <CheckCircle2 size={12}/> : i + 1}
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
           </div>

           <div className="lg:col-span-9 bg-white rounded-[3rem] border border-slate-200 shadow-sm p-12 lg:p-16">
              <div className="mb-12">
                 <Badge variant="indigo">Step {activeStep + 1} of {LOCATION_SECTIONS.length}</Badge>
                 <h2 className="text-4xl font-black text-slate-900 mt-3 tracking-tighter">{currentSection.title}</h2>
              </div>

              {activeStep === 0 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                  <div className="grid grid-cols-2 gap-10">
                    <FormField label="Location name" required inheritance="overridden">
                      <input type="text" defaultValue={activeLocation.name} className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                    <FormField label="Site Timezone" required inheritance="default">
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
                  
                  <FormField label="Practice Address" required inheritance="overridden">
                    <textarea defaultValue={activeLocation.address} className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none h-24 resize-none focus:ring-2 focus:ring-blue-100" />
                  </FormField>

                  <div className="grid grid-cols-2 gap-10 pt-8 border-t border-slate-50">
                    <FormField label="Primary site Lead" inheritance={null}>
                       <div className="space-y-4">
                          <input type="text" placeholder="Full Name" defaultValue={PRACTICE_BASE_DATA.poc.primary.name} className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                          <div className="grid grid-cols-2 gap-3">
                             <input type="email" placeholder="Email" defaultValue={PRACTICE_BASE_DATA.poc.primary.email} className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                             <input type="tel" placeholder="Phone" defaultValue={PRACTICE_BASE_DATA.poc.primary.phone} className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                          </div>
                       </div>
                    </FormField>
                    <FormField label="Backup site Lead" inheritance={null}>
                       <div className="space-y-4">
                          <input type="text" placeholder="Full Name" className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                          <div className="grid grid-cols-2 gap-3">
                             <input type="email" placeholder="Email" className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                             <input type="tel" placeholder="Phone" className="w-full px-5 py-3.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none" />
                          </div>
                       </div>
                    </FormField>
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
                   Previous
                 </button>
                 <button onClick={() => setActiveStep(s => Math.min(LOCATION_SECTIONS.length - 1, s + 1))} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-3">
                    {activeStep === LOCATION_SECTIONS.length - 1 ? 'Save site' : 'Save & Continue'} <ArrowRight size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    );
  };

  const renderSidebarItem = (id, label, icon, badge = null) => {
    const isActive = currentPage === id;
    return (
      <button 
        onClick={() => { setCurrentPage(id); setActiveLocation(null); setInternalTab(id); }}
        className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${isActive ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
      >
         <div className="flex items-center gap-4">
            {React.createElement(icon, { size: 18 })}
            {label}
         </div>
         {badge && <Badge variant="indigo">{badge}</Badge>}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700">
      <div className="bg-slate-900 text-white py-1.5 px-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest sticky top-0 z-[110] border-b border-white/5 shadow-lg">
        <div className="flex gap-6">
          <span className="text-blue-400 flex items-center gap-2"><Layers size={12}/> Rollout Command v3.8</span>
        </div>
        <div className="flex gap-1 p-0.5 bg-slate-800 rounded-lg overflow-hidden border border-white/5">
          {Object.values(ROLES).map(r => (
            <button key={r} onClick={() => { setRole(r); setCurrentPage(r === ROLES.PRACTICE_ADMIN ? 'profile' : 'registry'); }} className={`px-3 py-1 rounded-md transition-all ${role === r ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
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
                {renderSidebarItem('registry', 'Account Registry', Layers)}
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                    <History size={18} /> Global Reviews
                </button>
              </>
            ) : (
              <>
                {renderSidebarItem('profile', 'Practice Profile', Building2)}
                {renderSidebarItem('tracker', 'Rollout Tracker', Activity)}
                {renderSidebarItem('summary', 'Setup Summary', ClipboardCheck)}
                {renderSidebarItem('documents', 'Contracts & Docs', FileBadge)}
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
           {currentPage === 'registry' && role === ROLES.INTERNAL_IMPLEMENTATION && renderInternalRegistry()}
           
           {(currentPage === 'profile' || currentPage === 'tracker' || currentPage === 'summary' || currentPage === 'documents') && (
              <div className="space-y-10">
                {role === ROLES.INTERNAL_IMPLEMENTATION && (
                   <div className="flex border-b border-slate-200 gap-10 mb-2 overflow-x-auto no-scrollbar">
                      {['Profile', 'Tracker', 'Summary', 'Documents'].map(tab => (
                        <button 
                          key={tab} 
                          onClick={() => setInternalTab(tab.toLowerCase())}
                          className={`pb-5 text-[11px] font-black uppercase tracking-widest relative transition-all whitespace-nowrap ${internalTab === tab.toLowerCase() ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                           {tab}
                           {internalTab === tab.toLowerCase() && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-blue-600 rounded-t-lg" />}
                        </button>
                      ))}
                   </div>
                )}

                {(role === ROLES.PRACTICE_ADMIN ? currentPage === 'profile' : internalTab === 'profile') && renderPracticeProfile()}
                {(role === ROLES.PRACTICE_ADMIN ? currentPage === 'tracker' : internalTab === 'tracker') && renderRolloutTracker()}
                {(role === ROLES.PRACTICE_ADMIN ? currentPage === 'summary' : internalTab === 'summary') && renderSetupSummary()}
                {(role === ROLES.PRACTICE_ADMIN ? currentPage === 'documents' : internalTab === 'documents') && renderContractsAndDocs()}
              </div>
           )}

           {currentPage === 'location-detail' && renderLocationStepper()}
        </main>
      </div>

      {showSummaryExportModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-12 animate-in zoom-in-95 duration-400 text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm"><Download size={36}/></div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight uppercase text-xs">Rollout Export Scope</h3>
              <div className="space-y-3 mb-10 text-left">
                <button 
                  onClick={() => setExportScope('entire')}
                  className={`w-full p-6 border-2 rounded-3xl transition-all flex items-center justify-between ${exportScope === 'entire' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl shadow-sm ${exportScope === 'entire' ? 'bg-white text-blue-600' : 'bg-white text-slate-400'}`}><Building2 size={16}/></div>
                      <div>
                         <p className={`text-sm font-black ${exportScope === 'entire' ? 'text-blue-800' : 'text-slate-600'}`}>Practice-wise Consolidated</p>
                         <p className="text-[10px] text-slate-400 uppercase font-bold">Full Portfolio Dataset</p>
                      </div>
                   </div>
                   <div className={`w-4 h-4 rounded-full border-4 bg-white ${exportScope === 'entire' ? 'border-blue-600' : 'border-slate-200'}`} />
                </button>
                <button 
                  onClick={() => setExportScope('selected')}
                  className={`w-full p-6 border-2 rounded-3xl transition-all flex items-center justify-between ${exportScope === 'selected' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl shadow-sm ${exportScope === 'selected' ? 'bg-white text-blue-600' : 'bg-white text-slate-400'}`}><MapPin size={16}/></div>
                      <div>
                         <p className={`text-sm font-black ${exportScope === 'selected' ? 'text-blue-800' : 'text-slate-600'}`}>Location-wise Targeted</p>
                         <p className="text-[10px] text-slate-400 uppercase font-bold">{selectedLocations.length} Sites Identified</p>
                      </div>
                   </div>
                   <div className={`w-4 h-4 rounded-full border-4 bg-white ${exportScope === 'selected' ? 'border-blue-600' : 'border-slate-200'}`} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setShowSummaryExportModal(false)} className="py-4 font-black text-slate-400 hover:text-slate-600 uppercase text-xs tracking-widest">Cancel</button>
                 <button className="py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase text-xs tracking-widest tracking-widest flex items-center justify-center gap-3">
                   <Download size={16}/> Download Dataset
                 </button>
              </div>
           </div>
        </div>
      )}

      {showCloneModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 animate-in zoom-in-95 duration-400 text-center">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm"><Copy size={36}/></div>
              <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight uppercase text-xs">Clone Site Stakeholders</h3>
              <p className="text-slate-400 text-sm mb-10 leading-relaxed px-4">Select source to copy POC and Lead details.</p>
              <div className="space-y-3 mb-10 text-left">
                <select className="w-full p-5 border-2 border-slate-100 bg-slate-50 rounded-3xl text-sm font-bold text-slate-700 outline-none appearance-none font-bold">
                   <option>Master Practice Profile</option>
                   <option>Downtown Main Clinic (Live)</option>
                   <option>Lakeside Specialists (Live)</option>
                </select>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => setShowCloneModal(false)} className="flex-1 py-4 font-black text-slate-400 hover:text-slate-600 uppercase text-xs tracking-widest">Cancel</button>
                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition-all uppercase text-xs tracking-widest">Clone POC Data</button>
              </div>
           </div>
        </div>
      )}

      {showInviteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-400">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Invite Manager</h2>
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
                    <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">Send Invite</button>
                 </div>
              </div>
           </div>
        </div>
      )}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
