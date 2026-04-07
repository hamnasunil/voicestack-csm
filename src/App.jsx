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
  UserPlus,
  Mail,
  FileCheck,
  Tag,
  Globe,
  Briefcase,
  BarChart
} from 'lucide-react';

// --- Constants ---

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

const LOCATION_SECTIONS = [
  { id: 'basics', title: 'Location Basics', status: 'Complete' },
  { id: 'phones', title: 'Phone Setup', status: 'In Progress' },
  { id: 'workflow', title: 'Workflow Details', status: 'Not Started' },
  { id: 'hours', title: 'Hours & Holidays', status: 'Not Started' },
  { id: 'additional', title: 'Additional Info', status: 'Not Started' },
  { id: 'uploads', title: 'Documents & Uploads', status: 'Not Started' },
];

const PRACTICE_BASE_DATA = {
  name: "BrightSmiles Dental Group",
  address: "500 N Michigan Ave, Suite 600, Chicago, IL 60611",
  totalLocations: 100,
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
  { id: 1, name: "Downtown Main Clinic", city: "Chicago", stage: 'Porting', state: 'In Progress', progress: 65, timezone: 'America/Chicago' },
  { id: 2, name: "North Hills Pediatric", city: "Evanston", stage: 'Onboarding', state: 'Changes Requested', progress: 15, timezone: 'America/Chicago' },
  { id: 3, name: "Westside Family Dental", city: "Oak Park", stage: 'Device Ordering', state: 'Pending Review', progress: 45, timezone: 'America/Chicago' },
  { id: 4, name: "Lakeside Specialists", city: "Chicago", stage: 'Go Live', state: 'Completed', progress: 100, timezone: 'America/Chicago' },
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
      <div className={`flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${inheritance === 'default' ? 'text-slate-400 bg-slate-50' : 'text-blue-600 bg-blue-50'}`}>
        {inheritance === 'default' ? <Layers size={10}/> : <RefreshCcw size={10}/>}
        {inheritance === 'default' ? 'Default' : 'Override'}
      </div>
    </div>
    {children}
    {helper && <p className="text-[10px] text-slate-400 mt-2 italic">{helper}</p>}
  </div>
);

const ContactCard = ({ title, data, isBackup = false }) => (
  <div className={`p-4 rounded-2xl border ${isBackup ? 'bg-slate-50 border-slate-200/60 opacity-80' : 'bg-blue-50/50 border-blue-100/50'}`}>
    <div className="flex justify-between items-start mb-2">
      <p className={`text-[10px] font-black uppercase ${isBackup ? 'text-slate-400' : 'text-blue-600'}`}>{title}</p>
      <button className={`text-[10px] font-bold hover:underline ${isBackup ? 'text-slate-400' : 'text-blue-600'}`}>EDIT</button>
    </div>
    {data ? (
      <>
        <p className="text-sm font-black text-slate-800">{data.name}</p>
        <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">{data.role}</p>
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          <Mail size={12}/> {data.email}
        </div>
      </>
    ) : (
      <div className="py-4 text-center">
        <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-dashed border-slate-300 rounded-lg px-4 py-2 hover:bg-white transition-all">Add Backup Lead</button>
      </div>
    )}
  </div>
);

// --- Main Application ---

export default function App() {
  const [role, setRole] = useState(ROLES.PRACTICE_ADMIN);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [activeLocation, setActiveLocation] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showInviteModal, setShowInviteModal] = useState(false);
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

  const renderPracticeDashboard = () => (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-end pb-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{PRACTICE_BASE_DATA.name}</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin size={14} className="text-blue-500" />
              <span>{PRACTICE_BASE_DATA.address}</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full" />
            <Badge variant="indigo">{PRACTICE_BASE_DATA.totalLocations} Locations</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
            <Download size={16} /> Export
          </button>
          <button onClick={() => setShowInviteModal(true)} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
            <UserPlus size={16} /> Invite Team
          </button>
        </div>
      </header>

      <Card title="Rollout Progress Funnel" icon={BarChart}>
        <div className="flex items-center w-full gap-1 h-12 mb-4 bg-slate-50 p-1 rounded-xl">
          {PRACTICE_BASE_DATA.stageDistribution.map((item, i) => {
            const width = `${(item.count / 100) * 100}%`;
            const colors = ['bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-indigo-600', 'bg-emerald-500'];
            return (
              <div 
                key={item.stage} 
                style={{ width }} 
                className={`${colors[i]} h-full first:rounded-l-lg last:rounded-r-lg relative group cursor-help`}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10 pointer-events-none">
                  {item.stage}: {item.count} sites
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {PRACTICE_BASE_DATA.stageDistribution.map((item) => (
            <div key={item.stage} className="text-center">
              <p className="text-[16px] font-black text-slate-800">{item.count}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter truncate">{item.stage}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <Card title="Execution Board" icon={Layers} action={
            <div className="relative">
              <input type="text" placeholder="Filter sites..." className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-100" />
              <Search size={12} className="absolute left-2.5 top-2.5 text-slate-400" />
            </div>
          }>
            <div className="overflow-x-auto -mx-6 -mb-6">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-y border-slate-100">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Location</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase">Lifecycle Stage</th>
                    <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase text-center">State</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_LOCATIONS.map(loc => (
                    <tr key={loc.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer" onClick={() => { setActiveLocation(loc); setActiveStep(0); setCurrentPage('location-detail'); }}>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">{loc.name}</p>
                        <p className="text-[10px] text-slate-400">{loc.city} • {loc.timezone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                           <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">{loc.stage}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Badge variant={loc.state === 'Completed' ? 'success' : loc.state === 'Changes Requested' ? 'error' : 'warning'}>
                          {loc.state}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <ArrowRight size={14} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-4 text-center border-t border-slate-100">
                <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">See all locations portfolio</button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Card title="Contract Intelligence" icon={FileCheck}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Current Tier</p>
                  <p className="text-sm font-black text-slate-800">{PRACTICE_BASE_DATA.contractStatus}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Renewal</p>
                  <p className="text-sm font-black text-slate-800">{PRACTICE_BASE_DATA.contractRenewal}</p>
                </div>
              </div>
              <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase transition-all">View Agreement PDF</button>
            </Card>

            <Card title="Implementation Snippet" icon={Tag}>
              <p className="text-xs text-slate-500 italic leading-relaxed">
                "{PRACTICE_BASE_DATA.salesNotes}"
              </p>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card title="Practice Contacts" icon={Users}>
             <div className="space-y-4">
                <ContactCard title="Primary POC" data={PRACTICE_BASE_DATA.poc.primary} />
                <ContactCard title="Backup POC" data={PRACTICE_BASE_DATA.poc.backup} isBackup />
             </div>
          </Card>

          <Card title="Authorized Team" icon={ShieldCheck} className="!bg-slate-900 !border-slate-800">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-4">Workspace Access</h3>
            <div className="space-y-3 mb-6">
              {[
                { name: 'Dr. Sarah Lee', initial: 'SL', role: 'Admin' },
                { name: 'James Wilson', initial: 'JW', role: 'Operations' },
              ].map(u => (
                <div key={u.name} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-xl border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">{u.initial}</div>
                  <div>
                    <p className="text-xs font-bold text-white">{u.name}</p>
                    <p className="text-[9px] text-slate-400 uppercase">{u.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setShowInviteModal(true)} className="w-full py-3 bg-white hover:bg-slate-100 text-slate-900 rounded-xl text-xs font-black uppercase transition-all shadow-xl">
              Manage Invitations
            </button>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderLocationDetail = () => {
    if (!activeLocation) return null;
    const currentSection = LOCATION_SECTIONS[activeStep];
    return (
      <div className="max-w-[1400px] mx-auto space-y-8 animate-in slide-in-from-right-10 duration-500 pb-20">
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentPage('dashboard')} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
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
            <button onClick={() => setShowCloneModal(true)} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
              <Copy size={16} /> Clone
            </button>
            <button className="px-6 py-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all flex items-center gap-2">
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           <div className="lg:col-span-3 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Onboarding Steps</p>
                <div className="space-y-1">
                  {LOCATION_SECTIONS.map((s, i) => (
                    <button 
                      key={s.id}
                      onClick={() => setActiveStep(i)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${activeStep === i ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'hover:bg-slate-100'}`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black border-2 ${activeStep === i ? 'border-white/40 bg-white/20' : 'border-slate-200 text-slate-400 group-hover:border-blue-200'}`}>
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
                    <FormField label="Branch Name" required inheritance="overridden">
                      <input type="text" defaultValue={activeLocation.name} className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                    <FormField label="Local Timezone" required inheritance="default">
                      <div className="relative">
                        <select className="w-full px-5 py-4 text-sm font-bold bg-white border border-slate-200 rounded-2xl outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-100" value={formState.timezone} onChange={e => handleInputChange('timezone', e.target.value)}>
                           <option value="America/Chicago">America/Chicago (CST)</option>
                           <option value="America/New_York">America/New_York (EST)</option>
                           <option value="America/Los_Angeles">America/Los_Angeles (PST)</option>
                        </select>
                        <Globe size={18} className="absolute right-4 top-4 text-slate-300" />
                      </div>
                    </FormField>
                  </div>
                  <FormField label="Service Address" required inheritance="overridden">
                    <textarea defaultValue="123 Dental Lane, Chicago IL 60614" className="w-full px-5 py-4 text-sm font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none h-24 resize-none focus:ring-2 focus:ring-blue-100" />
                  </FormField>
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
                    {activeStep === LOCATION_SECTIONS.length - 1 ? 'Review Submission' : 'Continue'} <ArrowRight size={16} />
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
          <span className="text-blue-400 flex items-center gap-2"><Layers size={12}/> Rollout Console v3.1</span>
        </div>
        <div className="flex gap-1 p-0.5 bg-slate-800 rounded-lg overflow-hidden border border-white/5">
          {Object.values(ROLES).map(r => (
            <button key={r} onClick={() => setRole(r)} className={`px-3 py-1 rounded-md transition-all ${role === r ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
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
            <button onClick={() => setCurrentPage('dashboard')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider transition-all ${currentPage === 'dashboard' ? 'bg-blue-50 text-blue-600 shadow-sm border border-blue-100' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                <LayoutDashboard size={18} /> Rollout Tracker
            </button>
            <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl font-black uppercase text-[11px] tracking-wider text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
                <div className="flex items-center gap-4"><MapPin size={18} /> Portfolio</div>
                <Badge variant="indigo">100</Badge>
            </button>
          </div>
          <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-200/60">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-black text-xs text-white shadow-lg">SL</div>
                <div>
                   <p className="text-sm font-black text-slate-800 truncate">Dr. Sarah Lee</p>
                   <p className="text-[9px] text-slate-500 font-bold uppercase">{role}</p>
                </div>
             </div>
          </div>
        </nav>

        <main className="flex-grow p-8 lg:p-12 overflow-y-auto max-h-screen">
           {currentPage === 'dashboard' ? renderPracticeDashboard() : renderLocationDetail()}
        </main>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 duration-400">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Invite Team</h2>
                 <button onClick={() => setShowInviteModal(false)} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-all"><Plus size={24} className="rotate-45" /></button>
              </div>
              <div className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                    <FormField label="Full Name" required>
                       <input type="text" placeholder="John Doe" className="w-full px-5 py-3.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                    <FormField label="Email Address" required>
                       <input type="email" placeholder="john@example.com" className="w-full px-5 py-3.5 text-sm font-bold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100" />
                    </FormField>
                 </div>
                 <div className="flex gap-4 pt-6">
                    <button onClick={() => setShowInviteModal(false)} className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Cancel</button>
                    <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100">Send Invite</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
