/* =============================================================================
   TRIBAL SCHOLARSHIP & FELLOWSHIP PORTAL — APP.JS
   SIH 2026 PS 26239 · Ministry of Tribal Affairs, Government of India
   Tech Stack: React+TS+Vite+Tailwind / Python FastAPI / PostgreSQL+JSONB /
   Pydantic Rules Engine / Tesseract+PaddleOCR+OpenCV / scikit-learn /
   Pandas+NumPy / Redis+Celery / REST Adapters / SMS+Email+WhatsApp /
   Recharts/Plotly / JWT+OAuth2+RBAC / Docker+Nginx+NIC-Cloud
============================================================================= */
'use strict';

// ─── DATA ──────────────────────────────────────────────────────────────────
const SCHEMES = [
  { id:'NFST', name:'National Fellowship (NFST)', short:'National Fellowship', icon:'🎓',
    desc:'Fellowship for ST students pursuing M.Phil / PhD research.',
    color:'#1b3a6b', bg:'rgba(27,58,107,.1)', tag:'Research', tag2:'Fellowship',
    seats:750, income:'≤ ₹6 L [DEMO]', age:'≤ 35 yrs [DEMO]',
    benefit:'₹25,000–28,000/mo [DEMO]', type:'Central Sector', code:'ARG45',
    eligibility:[
      {label:'ST Category Certificate', note:'Valid ST certificate issued by competent authority'},
      {label:"Master's Degree ≥ 55%", note:'Minimum PG marks (50% for SC/PwD) [DEMO]'},
      {label:'Age ≤ 35 years [DEMO]', note:'Age at time of application'},
      {label:'Annual Family Income ≤ ₹6 Lakh [DEMO]', note:'As per income certificate'},
      {label:'Enrolled for M.Phil/PhD', note:'Admission letter from university required'}
    ],
    documents:['ST Certificate','Marksheets (UG + PG)','PhD Admission Letter','Income Certificate','Bank Passbook','Aadhaar (masked)','Research Proposal'],
    demoNote:true },
  { id:'NOS', name:'National Overseas Scholarship (NOS)', short:'Overseas Scholarship', icon:'✈️',
    desc:'For ST students pursuing Master\'s / PhD / Post-doc abroad.',
    color:'#0d7a8a', bg:'rgba(13,122,138,.1)', tag:'Overseas', tag2:'PG/PhD',
    seats:20, income:'≤ ₹6 L [DEMO]', age:'≤ 35 yrs [DEMO]',
    benefit:'Tuition + living via Indian Mission', type:'Central Sector', code:'AZKMI',
    eligibility:[
      {label:'ST Category Certificate', note:'Valid ST certificate'},
      {label:'Income ≤ ₹6 Lakh/year [DEMO]', note:'Family annual income'},
      {label:'Age ≤ 35 years [DEMO]', note:'At time of application'},
      {label:'Admission offer — foreign university', note:'Valid offer letter required'},
      {label:'UG + PG qualification', note:'Relevant academic qualifications'}
    ],
    documents:['ST Certificate','Income Certificate','Passport','Foreign University Offer Letter','UG + PG Marksheets','SOP / Research Proposal','Bank Details'],
    demoNote:true },
  { id:'TCE', name:'Top Class Education', short:'Top Class Education', icon:'🏛️',
    desc:'For ST students in premier institutes (IITs, IIMs, AIIMS, NITs etc.).',
    color:'#5e35b1', bg:'rgba(94,53,177,.1)', tag:'Premier Institutes', tag2:'UG/PG',
    seats:1000, income:'≤ ₹6 L [DEMO]', age:'No age limit',
    benefit:'Full tuition + maintenance [DEMO]', type:'Central Sector', code:'A023B',
    eligibility:[
      {label:'ST Certificate', note:'Valid ST certificate'},
      {label:'Enrolled in notified premier institute', note:'IIT/IIM/AIIMS/NIT and other notified institutes'},
      {label:'Income ≤ ₹6 Lakh [DEMO]', note:'Family annual income'}
    ],
    documents:['ST Certificate','Income Certificate','Institute Admission Letter','Previous Marksheets','Fee Receipt','Bank Passbook'],
    demoNote:true },
  { id:'PREMATRIC', name:'Pre-Matric Scholarship', short:'Pre-Matric', icon:'📚',
    desc:'For ST students studying in Classes IX and X. State-administered via NSP.',
    color:'#1c7c4a', bg:'rgba(28,124,74,.1)', tag:'Class IX–X', tag2:'State-run',
    seats:null, income:'≤ ₹2.5 L [DEMO]', age:'Class IX–X',
    benefit:'₹225–525/mo (10 months) [DEMO]', type:'Centrally Sponsored', code:'BPVGK',
    eligibility:[
      {label:'ST Certificate', note:'Valid ST certificate'},
      {label:'Income ≤ ₹2.5 Lakh [DEMO]', note:'Family annual income'},
      {label:'Enrolled in Class IX or X', note:'Enrolled in recognised school'}
    ],
    documents:['ST Certificate','Income Certificate','School Enrollment Certificate','Previous Year Marksheet','Bank Passbook'],
    note:'State-administered — this portal provides monitoring & interoperability.',
    demoNote:true },
  { id:'POSTMATRIC', name:'Post-Matric Scholarship', short:'Post-Matric', icon:'📖',
    desc:'For ST students in Class XI and above, in recognised courses.',
    color:'#e85d04', bg:'rgba(232,93,4,.1)', tag:'Class XI+', tag2:'State-run',
    seats:null, income:'≤ ₹2.5 L [DEMO]', age:'Class XI+',
    benefit:'Compulsory fees + ₹230–1,200/mo [DEMO]', type:'Centrally Sponsored', code:'BVOBC',
    eligibility:[
      {label:'ST Certificate', note:'Valid ST certificate'},
      {label:'Income ≤ ₹2.5 Lakh [DEMO]', note:'Family annual income'},
      {label:'Enrolled in Class XI+ or recognised course', note:'Recognised institution'}
    ],
    documents:['ST Certificate','Income Certificate','Enrollment Certificate','Previous Marksheet','Bank Passbook','Fee Receipt'],
    note:'State-administered — this portal provides monitoring & interoperability.',
    demoNote:true }
];

const TECH_STACK = [
  {n:'01',layer:'Frontend',tech:'React + TypeScript + Vite + Tailwind CSS',desc:'Fast, responsive Applicant, Officer & Admin interfaces',icon:'⚛️',color:'#61dafb'},
  {n:'02',layer:'Backend',tech:'Python FastAPI',desc:'Scalable APIs, workflow processing and automatic API documentation',icon:'🐍',color:'#059669'},
  {n:'03',layer:'Database',tech:'PostgreSQL + JSONB',desc:'Applications, scheme versions, rules, documents, decisions and audit data',icon:'🐘',color:'#336791'},
  {n:'04',layer:'Rules & Workflow Engine',tech:'Python + Pydantic',desc:'Configurable eligibility, documents, workflow stages, quotas and scoring',icon:'⚙️',color:'#e85d04'},
  {n:'05',layer:'Document Intelligence',tech:'Tesseract / PaddleOCR + OpenCV',desc:'OCR, document classification, quality checks and field extraction',icon:'🔍',color:'#0d7a8a'},
  {n:'06',layer:'AI / ML',tech:'scikit-learn + Optional Local LLM',desc:'Name matching, anomaly detection, similarity checks and intelligent assistance',icon:'🧠',color:'#7c3aed'},
  {n:'07',layer:'Policy Impact Analytics',tech:'Pandas + NumPy',desc:'Simulate rule changes and analyse eligibility and scheme impact',icon:'📊',color:'#1c7c4a'},
  {n:'08',layer:'Workflow Queue',tech:'Redis + Celery / RQ',desc:'Async processing, notifications and heavy background tasks',icon:'🔄',color:'#cc2929'},
  {n:'09',layer:'Integrations',tech:'REST APIs + Adapter Architecture',desc:'Connect existing MoTA, NSP/State, DigiLocker and DBT/PFMS systems',icon:'🔌',color:'#0288d1'},
  {n:'10',layer:'Notifications',tech:'SMS + Email + WhatsApp API',desc:'Deficiency alerts, status updates, reminders and applicant communication',icon:'📱',color:'#f7a800'},
  {n:'11',layer:'Dashboard & Analytics',tech:'Recharts / Plotly',desc:'Application funnel, SLA, grievance, scheme and state-wise analytics',icon:'📈',color:'#5e35b1'},
  {n:'12',layer:'Security & Audit',tech:'JWT + OAuth2 + RBAC + HTTPS',desc:'Secure access, role isolation, privacy and tamper-evident audit logs',icon:'🔐',color:'#1b3a6b'},
  {n:'13',layer:'Deployment',tech:'Docker + Nginx + NIC/MeitY Cloud-ready',desc:'Portable, reproducible and government-deployment-ready architecture',icon:'🐳',color:'#2496ed'}
];

const DEMO_APPS = [
  { id:'NFST-2026-04817', scheme:'NFST', applicant:'Adi Kumar', status:'scrutiny', stage:3,
    submitted:'12 Sep 2026', autoCheck:'14 Sep 2026', score:78.4,
    deficiency:{ active:true, doc:'ST Certificate', reason:'Document scan is unclear. Upload a higher-quality scan.', deadline:'12 Oct 2026' },
    docs:[
      {name:"Master's Marksheet",status:'ok',source:'DigiLocker',ocr:94},
      {name:'PhD Admission Letter',status:'ok',source:'DigiLocker',ocr:91},
      {name:'ST Certificate',status:'warn',source:'Upload',ocr:42,reason:'Unclear scan'},
      {name:'Bank Passbook',status:'pend',source:'Upload'}
    ],
    elig:[
      {label:'ST category verified',note:'Valid per GOI ST list',pass:true},
      {label:'PG marks 68% (min 55%)',note:'Exceeds minimum requirement',pass:true},
      {label:'Age within limit (26 yrs ≤ 35 yrs)',note:'Within age limit [DEMO]',pass:true},
      {label:'Income certificate',note:'Pending verification — declared ₹3.2L [DEMO]',pass:null}
    ]
  },
  { id:'NOS-2026-00321', scheme:'NOS', applicant:'Priya Soren', status:'submitted', stage:1,
    submitted:'20 Sep 2026', autoCheck:'', score:null, deficiency:null,
    docs:[
      {name:'ST Certificate',status:'ok',source:'DigiLocker',ocr:96},
      {name:'Passport',status:'ok',source:'Upload',ocr:89},
      {name:'University Offer Letter',status:'ok',source:'Upload',ocr:82},
      {name:'Income Certificate',status:'ok',source:'Upload',ocr:88}
    ],
    elig:[
      {label:'ST category verified',note:'Valid ST certificate',pass:true},
      {label:'Income ≤ ₹6L [DEMO]',note:'₹4.8L declared',pass:true},
      {label:'Foreign university admission',note:'Manchester University',pass:true},
      {label:'Age ≤ 35 yrs [DEMO]',note:'Age 28 years',pass:true}
    ]
  },
  { id:'TCE-2026-01143', scheme:'TCE', applicant:'Rajesh Minj', status:'selected', stage:4,
    submitted:'5 Sep 2026', autoCheck:'7 Sep 2026', score:86.2, deficiency:null,
    docs:[
      {name:'ST Certificate',status:'ok',source:'DigiLocker',ocr:97},
      {name:'IIT Admission Letter',status:'ok',source:'Upload',ocr:93},
      {name:'Income Certificate',status:'ok',source:'DigiLocker',ocr:91}
    ],
    elig:[
      {label:'ST category verified',pass:true,note:'Valid ST certificate'},
      {label:'Premier institute enrollment',pass:true,note:'IIT Bombay — notified list'},
      {label:'Income ≤ ₹6L [DEMO]',pass:true,note:'₹5.1L declared'}
    ]
  }
];

const OFFICER_QUEUE = [
  {id:'NFST-2026-04817',applicant:'Adi Kumar',scheme:'NFST',risk:'high',confidence:62,sla:5,stage:'Scrutiny',
    flags:['OCR confidence 42% on ST certificate — below 60% threshold','Income mismatch: declared ₹3.2L, certificate shows ₹4.5L [DEMO values]']},
  {id:'NFST-2026-04102',applicant:'Sunita Tirkey',scheme:'NFST',risk:'low',confidence:93,sla:2,stage:'Auto-Verified',flags:[]},
  {id:'NOS-2026-00321',applicant:'Priya Soren',scheme:'NOS',risk:'med',confidence:76,sla:3,stage:'Scrutiny',
    flags:['Name mismatch: passport vs application form (edit distance 2)']},
  {id:'TCE-2026-01502',applicant:'Mohan Lakra',scheme:'TCE',risk:'low',confidence:96,sla:1,stage:'Auto-Verified',flags:[]},
  {id:'NFST-2026-03987',applicant:'Anita Munda',scheme:'NFST',risk:'high',confidence:31,sla:7,stage:'Exception',
    flags:['Duplicate certificate number across 2 applications','PVTG flag — senior officer review required']}
];

const MERIT_LIST = [
  {rank:1,name:'Rajesh Minj',score:86.2,state:'Jharkhand',institute:'IIT Bombay',quota:'General',acad:51.7,interview:21.6,pref:12.9,status:'selected'},
  {rank:2,name:'Kavita Ekka',score:83.5,state:'Odisha',institute:'TISS Mumbai',quota:'Women',acad:50.1,interview:20.2,pref:13.2,status:'selected'},
  {rank:3,name:'Deepak Oram',score:81.8,state:'Chhattisgarh',institute:'JNU Delhi',quota:'PVTG',acad:49.1,interview:20.0,pref:12.7,status:'selected'},
  {rank:4,name:'Sunita Tirkey',score:79.4,state:'Jharkhand',institute:'Hyderabad Univ.',quota:'General',acad:47.6,interview:19.8,pref:12.0,status:'waitlist'},
  {rank:5,name:'Priya Soren',score:76.1,state:'West Bengal',institute:'BHU Varanasi',quota:'Women',acad:45.7,interview:18.4,pref:12.0,status:'waitlist'},
  {rank:6,name:'Adi Kumar',score:74.3,state:'MP',institute:'IIT Kharagpur',quota:'General',acad:44.6,interview:17.5,pref:12.2,status:'waitlist'}
];

const AUDIT_LOG = [
  {actor:'System',role:'sys',action:'Application NFST-2026-04817 submitted. Auto-screening initiated.',time:'14 Sep 2026, 09:12',hash:'a3f8c2d1...e9'},
  {actor:'AI Screening',role:'sys',action:'OCR completed. ST cert confidence 42% — flagged for human review. Income mismatch detected [DEMO values].',time:'14 Sep 2026, 09:14',hash:'b7e4a1c9...f2'},
  {actor:'Officer (Rahul S.)',role:'ofc',action:'Deficiency raised: ST certificate scan unclear. Deadline: 12 Oct 2026. Remarks logged.',time:'15 Sep 2026, 11:30',hash:'c9f2b8e3...a1'},
  {actor:'Adi Kumar',role:'app',action:'Re-uploaded ST Certificate (v2). Auto-rescreening triggered.',time:'18 Sep 2026, 14:22',hash:'d1a6c5f7...b8'},
  {actor:'System',role:'sys',action:'Re-screening: ST cert confidence 88%. Income mismatch still flagged. Routed to officer queue.',time:'18 Sep 2026, 14:24',hash:'e8d3b2a1...c4'}
];

const RULES = [
  {id:'R01',name:'ST Category Verification',type:'hard',field:'st_category',op:'EQUALS',val:'ST',src:'Guideline 2022 Sec 3.1',on:true},
  {id:'R02',name:'PG Marks Threshold',type:'hard',field:'pg_marks',op:'>=',val:55,src:'Guideline 2022 Sec 4.2 [DEMO]',on:true},
  {id:'R03',name:'Income Cap',type:'hard',field:'annual_income',op:'<=',val:600000,src:'DBT portal [DEMO]',on:true},
  {id:'R04',name:'Age Limit',type:'hard',field:'age',op:'<=',val:35,src:'Guideline 2022 Sec 4.3 [DEMO]',on:true},
  {id:'R05',name:'Female Applicant Preference',type:'soft',field:'gender',op:'EQUALS',val:'F',src:'Guideline 2022 Sec 6.1',on:true},
  {id:'R06',name:'PVTG Preference',type:'soft',field:'pvtg',op:'EQUALS',val:true,src:'Guideline 2022 Sec 6.2',on:true}
];

const GRIEVANCES = [
  {id:'GRV-2026-0441',subject:'ST Certificate not accepted despite valid document',scheme:'NFST',status:'open',date:'20 Sep 2026',cat:'Document verification',priority:'high'},
  {id:'GRV-2026-0389',subject:'Income mismatch flag raised on correct document',scheme:'NOS',status:'inprogress',date:'18 Sep 2026',cat:'AI flag review',priority:'med'},
  {id:'GRV-2026-0312',subject:'Application status not updated for 10 days',scheme:'TCE',status:'resolved',date:'10 Sep 2026',cat:'Process delay',priority:'low'}
];

const WIZARD_STEPS = [
  { q:'Are you a Scheduled Tribe (ST) student?',
    hint:'You must have a valid ST certificate issued by a competent authority.',
    field:'is_st',
    opts:[{val:true,label:'Yes, I hold a valid ST certificate',icon:'✅',hint:null},
          {val:false,label:'No, I am not an ST student',icon:'❌',hint:null}] },
  { q:'What is your current level of education?',
    hint:'Select the highest qualification you are currently enrolled in.',
    field:'edu',
    opts:[{val:'prematric',label:'Class IX – X (Pre-Matric)',icon:'📚',hint:'Suitable for Pre-Matric Scholarship'},
          {val:'postmatric',label:'Class XI+ / Diploma / UG',icon:'📖',hint:'Suitable for Post-Matric Scholarship'},
          {val:'tce',label:'UG at IIT / IIM / AIIMS / NIT etc.',icon:'🏛️',hint:'Suitable for Top Class Education'},
          {val:'phd',label:'M.Phil / PhD (Research)',icon:'🎓',hint:'Suitable for NFST Fellowship'},
          {val:'overseas',label:'Planning to study abroad (PG/PhD)',icon:'✈️',hint:'Suitable for NOS'}] },
  { q:'What is your annual family income?',
    hint:'Total income from all sources of your family.',
    field:'income',
    opts:[{val:250000,label:'Below ₹2.5 Lakh',icon:'💰',hint:null},
          {val:500000,label:'₹2.5 Lakh – ₹6 Lakh',icon:'💰',hint:null},
          {val:700000,label:'Above ₹6 Lakh',icon:'💰',hint:'May not qualify for most MoTA schemes [DEMO]'}] },
  { q:'Do you belong to any of these special categories?',
    hint:'These categories receive additional preference in selection.',
    field:'special',
    opts:[{val:'women',label:'Woman applicant',icon:'👩‍🎓',hint:'Preference in NFST & NOS'},
          {val:'pvtg',label:'Particularly Vulnerable Tribal Group (PVTG)',icon:'🌿',hint:'Additional preference'},
          {val:'divyang',label:'Person with Disability (Divyang)',icon:'♿',hint:'Disability preference'},
          {val:'none',label:'None of the above',icon:'➡️',hint:null}] }
];

// ─── TÜRKIYE BURSLARI THEME DATA ─────────────────────────────────────────────
const TB_SLIDES = [
  {
    hashtag: '#TribalScholarships',
    title: 'National Fellowship for ST Students (M.Phil / Ph.D.)',
    desc: 'Empowering tribal research excellence at premier Indian universities with up to ₹35,000/month fellowship, ₹28,000 annual contingency grants, and 100% tuition coverage for doctoral scholars.',
    scheme: 'NFST',
    badge: '750 Fellowships Annually'
  },
  {
    hashtag: '#BeyondBorders',
    title: 'National Overseas Scholarship (NOS) for Global Degrees',
    desc: 'Unlock Master\'s and Ph.D. opportunities at QS World Top 500 universities. Covers 100% foreign tuition, living allowances through Indian Missions, international economy airfare, and equipment grants.',
    scheme: 'NOS',
    badge: 'QS World Top 500 Abroad'
  },
  {
    hashtag: '#PremierInstitutes',
    title: 'Top Class Education at IITs, IIMs, AIIMS & NLUs',
    desc: 'Direct institutional tuition fee coverage and monthly maintenance allowances for Scheduled Tribe students admitted to notified centers of excellence across India.',
    scheme: 'TCE',
    badge: '258 Notified Institutes'
  },
  {
    hashtag: '#ZeroExclusion',
    title: '100% Aadhaar-Seeded Direct Benefit Transfer (DBT)',
    desc: 'Transparent, automated PFMS disbursal directly into student bank accounts, powered by real-time DigiLocker e-KYC and AI document scrutiny with zero intermediary delay.',
    scheme: 'POSTMATRIC',
    badge: 'Direct to Bank Account'
  }
];

const TB_NEWS = [
  {
    type: 'News',
    date: '28 Sep 2026',
    title: 'MoTA Announces Cycle 2026-27 for National Fellowship for ST Students (NFST)',
    desc: 'Applications are now officially open for 750 annual fellowship slots across Humanities, Sciences, Engineering, and Social Sciences.',
    scheme: 'NFST'
  },
  {
    type: 'Announcement',
    date: '25 Sep 2026',
    title: 'National Overseas Scholarship (NOS) 2026: Application Window Open for QS Top 500',
    desc: 'Eligible ST candidates with unconditional admission offers from QS Top 500 world universities may submit applications online.',
    scheme: 'NOS'
  },
  {
    type: 'Announcement',
    date: '20 Sep 2026',
    title: 'DigiLocker Integration Live: 1-Click Verification of Caste & Income Certificates',
    desc: 'Integrated API enables instant digital document verification, eliminating paper delays and reducing rejection rates.',
    scheme: 'TCE'
  },
  {
    type: 'News',
    date: '15 Sep 2026',
    title: 'Top Class Education Scheme: 258 Premier Institutes Enlisted for Direct Tuition Remittance',
    desc: 'IITs, IIMs, AIIMS, and National Law Universities added to the automated institutional remittance framework via PFMS.',
    scheme: 'TCE'
  }
];

const TB_SUPPORTS = [
  {
    cat: 'stipend',
    ico: '💰',
    title: 'Monthly Research Stipend',
    amt: '₹31,000 – ₹35,000 / mo',
    desc: 'JRF @ ₹31,000/mo for first 2 years, upgradable to SRF @ ₹35,000/mo for remaining 3 years under NFST, plus applicable HRA.',
    schemes: 'NFST (M.Phil / Ph.D.)'
  },
  {
    cat: 'tuition',
    ico: '🏛️',
    title: '100% Tuition & Academic Fees',
    amt: 'Full Non-Refundable Fees',
    desc: 'Direct institutional transfer covering full tuition, laboratory, library, exam, and computer fees at IITs, IIMs, and universities.',
    schemes: 'Top Class, NOS, NFST'
  },
  {
    cat: 'contingency',
    ico: '🔬',
    title: 'Annual Contingency Grant',
    amt: '₹20,000 – ₹28,000 / yr',
    desc: 'Contingency for books, scientific equipment, chemical reagents, academic field visits, and conference registrations.',
    schemes: 'NFST & NOS'
  },
  {
    cat: 'travel',
    ico: '✈️',
    title: 'International Airfare & Visa',
    amt: '100% Economy Airfare',
    desc: 'Return economy air ticket to destination university country, actual visa issuance fees, and transit insurance through Indian Missions.',
    schemes: 'National Overseas (NOS)'
  },
  {
    cat: 'research',
    ico: '💻',
    title: 'Laptop & Equipment Grant',
    amt: '₹45,000 One-Time Grant',
    desc: 'One-time computer/laptop allowance with accessories, ensuring digital empowerment for research and technical coursework.',
    schemes: 'Top Class Education'
  },
  {
    cat: 'hostel',
    ico: '🏠',
    title: 'Hostel & Living Allowance',
    amt: '₹3,000 – ₹15,400 / mo',
    desc: 'Monthly living allowance for hostel boarding expenses, plus special allowances for books and stationery in premier institutes.',
    schemes: 'Top Class & Overseas'
  },
  {
    cat: 'stipend',
    ico: '♿',
    title: 'Escorts / Reader Allowance',
    amt: '₹2,000 / month',
    desc: 'Dedicated assistance for Divyangjan (differently-abled) ST scholars for readers, escorts, and assistive study tools.',
    schemes: 'All MoTA Schemes'
  },
  {
    cat: 'tuition',
    ico: '💳',
    title: 'PFMS Direct Benefit Transfer',
    amt: 'Direct Bank Credit',
    desc: 'Zero leakages, zero paper cheques. Funds are pushed straight into the student\'s Aadhaar-seeded bank account via PFMS DBT-P.',
    schemes: 'All 5 Schemes'
  }
];

const TB_FAQS = [
  {
    q: 'How do I apply for MoTA Scholarships & Fellowships?',
    a: 'Applications are submitted online directly on this portal. Simply register with your Mobile & Aadhaar, select your scheme (NFST, NOS, Top Class, or Post-Matric), verify your certificates via DigiLocker e-KYC, and submit. Application is 100% free of charge.'
  },
  {
    q: 'What is the selection and evaluation process?',
    a: 'The selection is competitive and merit-based. Applications undergo instant AI document OCR extraction and cross-document validation, followed by verification by State Nodal Officers and Ministry Committees. Final merit lists are published transparently on the portal.'
  },
  {
    q: 'What are the income thresholds for different schemes?',
    a: 'For National Fellowship (NFST), Top Class Education (TCE), and National Overseas Scholarship (NOS), the annual family income ceiling is ≤ ₹6,00,000. For Pre-Matric and Post-Matric schemes, the ceiling is ≤ ₹2,50,000.'
  },
  {
    q: 'How does DigiLocker e-KYC assist in faster verification?',
    a: 'When you link your DigiLocker, your ST Category Certificate and Income Certificate are pulled directly from the issuing authority registry with verified digital signatures. This eliminates physical attestation and accelerates scrutiny from weeks to seconds.'
  },
  {
    q: 'Can an applicant claim multiple scholarships at the same time?',
    a: 'Per statutory guidelines, an applicant can hold only one active government scholarship/fellowship at a given time. Our system includes a Cross-Scheme Conflict Checker that cross-references NSP and state databases to protect applicants from duplicate-benefit penalties.'
  }
];

const TB_CALENDAR = [
  { day: '15', month: 'OCT', title: 'NFST & NOS Application Window Closes', desc: 'Final date for online form submission and DigiLocker document upload for 2026-27 cycle.' },
  { day: '25', month: 'OCT', title: 'Officer Scrutiny & Deficiency Rectification', desc: 'Candidates notified of document clarifications have 10 days to resubmit corrected scans.' },
  { day: '10', month: 'NOV', title: 'First Merit List & Sanction Orders Published', desc: 'Automated merit ranking with PVTG and 30% female quota published for public verification.' },
  { day: '25', month: 'NOV', title: 'First Quarter DBT Disbursal via PFMS', desc: 'Direct electronic remittance of tuition and research stipends to Aadhaar-seeded accounts.' }
];

function setTbSlide(idx) {
  APP.tbSlide = idx;
  render();
}

function setSupportFilter(cat) {
  APP.supportFilter = cat;
  render();
}

function toggleFaq(idx) {
  APP.faqOpen = APP.faqOpen === idx ? null : idx;
  render();
}

function runProgramSearch() {
  const field = $('tb-field') ? $('tb-field').value : '';
  const level = $('tb-level') ? $('tb-level').value : '';
  const scheme = $('tb-scheme') ? $('tb-scheme').value : '';
  
  if (scheme) {
    toast('🔍 Found matching scheme! Redirecting to ' + scheme + ' details...');
    setTimeout(() => nav('scheme', { scheme }), 600);
  } else if (level === 'phd' || field.includes('Research') || field.includes('Doctoral')) {
    toast('🔍 1 Program found: National Fellowship for ST Students (NFST)');
    setTimeout(() => nav('scheme', { scheme: 'NFST' }), 600);
  } else if (level === 'overseas') {
    toast('🔍 1 Program found: National Overseas Scholarship (NOS)');
    setTimeout(() => nav('scheme', { scheme: 'NOS' }), 600);
  } else if (level === 'ug') {
    toast('🔍 1 Program found: Top Class Education (TCE) for Premier Institutes');
    setTimeout(() => nav('scheme', { scheme: 'TCE' }), 600);
  } else {
    toast('🔍 Showing all active MoTA programs matching criteria...');
    setTimeout(() => nav('schemes'), 600);
  }
}

// ─── STATE ─────────────────────────────────────────────────────────────────
const APP = {
  page: 'home', user: null,
  scheme: null, appId: null, officerAppId: null,
  lang: 'en', chatOpen: false,
  wizStep: 0, wizAns: {},
  formStep: 0,
  sideTab: 'overview',
  charts: {}, simRan: false, tbSlide: 0, supportFilter: 'all', faqOpen: null
};

// ─── UTILS ──────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const toast = (msg, dur=3000) => {
  let t = $('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    Object.assign(t.style, {
      position:'fixed',bottom:'1.5rem',left:'50%',transform:'translateX(-50%)',
      background:'#1b3a6b',color:'#fff',padding:'10px 22px',
      borderRadius:'8px',fontSize:'.84rem',fontWeight:'600',
      zIndex:'9999',boxShadow:'0 4px 24px rgba(0,0,0,.25)',
      maxWidth:'480px',textAlign:'center',whiteSpace:'pre-wrap',
      transition:'opacity .3s',opacity:'0',pointerEvents:'none'
    });
    document.body.appendChild(t);
  }
  t.innerHTML = msg; t.style.opacity = '1';
  clearTimeout(t._t);
  t._t = setTimeout(() => { t.style.opacity = '0'; }, dur);
};

function nav(page, extra={}) {
  Object.assign(APP, { page, ...extra });
  if (extra.wizStep === undefined && page === 'eligibility') { APP.wizStep = 0; APP.wizAns = {}; }
  render();
  window.scrollTo(0,0);
}

// ─── GOV BAR ────────────────────────────────────────────────────────────────
function renderGovBar() {
  return `
  <div class="gov-bar" role="navigation" aria-label="Accessibility bar">
    <div class="gov-bar-left">
      <a href="#main-content">Skip to main content</a>
      <span class="gov-sep">|</span>
      <a href="#">Screen reader access</a>
      <span class="gov-sep">|</span>
      <div class="font-ctrl" aria-label="Font size controls">
        <button onclick="chFont(-1)" aria-label="Decrease font size">A-</button>
        <button onclick="chFont(0)" aria-label="Reset font size">A</button>
        <button onclick="chFont(1)" aria-label="Increase font size">A+</button>
      </div>
      <span class="gov-sep">|</span>
      <div class="theme-btn" role="switch" aria-label="Toggle dark mode" onclick="toast('Dark mode — coming soon')">
        <div class="theme-btn-dot"></div>
      </div>
    </div>
    <div class="gov-bar-right">
      🌐
      <div class="lang-group" role="group" aria-label="Language selector">
        <button class="lang-btn ${APP.lang==='en'?'active':''}" onclick="setLang('en')">English</button>
        <button class="lang-btn ${APP.lang==='hi'?'active':''}" onclick="setLang('hi')">हिंदी</button>
        <button class="lang-btn ${APP.lang==='mr'?'active':''}" onclick="setLang('mr')">मराठी</button>
      </div>
    </div>
  </div>`;
}

// ─── HEADER ─────────────────────────────────────────────────────────────────
function renderHeader() {
  const u = APP.user;
  return `
  <header class="site-header" role="banner">
    <div class="header-brand" onclick="nav('home')" aria-label="Go to home">
      <div class="brand-logo-wrap" style="background:#900C3F;color:#fff;border-color:rgba(144,12,63,.3)">🏛️</div>
      <div class="brand-text-wrap">
        <div class="portal-name" style="color:#900C3F;font-weight:800">Tribal Scholarship and Fellowship Portal</div>
        <div class="portal-ministry" style="color:#757575">Ministry of Tribal Affairs, Government of India</div>
      </div>
    </div>
    <div class="header-actions">
      ${u ? `
        <div class="notif-icon" onclick="nav('dashboard',{sideTab:'notifications'})" aria-label="Notifications" style="color:#900C3F">
          🔔 <span class="notif-badge">3</span>
        </div>
        <div class="user-pill" onclick="nav('dashboard')" style="background:rgba(144,12,63,.07);border-color:rgba(144,12,63,.2)">
          <div class="user-avatar" style="background:#900C3F;color:#fff">${u.initials}</div>
          <span style="color:#333">${u.name.split(' ')[0]}</span> ▾
        </div>
        <button class="btn btn-outline btn-sm" onclick="logout()" style="color:#900C3F;border-color:#900C3F">Sign out</button>
      ` : `
        <button class="btn-login" onclick="nav('login')" style="border-color:#900C3F;color:#900C3F">Login</button>
        <button class="btn-register" onclick="nav('register')" style="background:#900C3F;color:#fff">Apply Now</button>
      `}
    </div>
  </header>`;
}

// ─── NAV BAR ────────────────────────────────────────────────────────────────
function renderNav() {
  const p = APP.page;
  return `
  <nav class="nav-bar" role="navigation" aria-label="Main navigation">
    <button class="nav-item ${p==='home'?'active':''}" onclick="nav('home')">
      <span class="nav-icon">🏠</span> HOME
    </button>
    <div class="nav-dropdown-wrap">
      <button class="nav-item ${p==='about'?'active':''}">
        <span class="nav-icon">ℹ️</span> ABOUT <span class="chevron">▾</span>
      </button>
      <div class="nav-dropdown-menu">
        <a onclick="nav('about')">🏛️ Ministry of Tribal Affairs (MoTA)</a>
        <a onclick="nav('guidelines')">📜 Guidelines &amp; Legislation</a>
        <a onclick="nav('about')">🏢 State Tribal Welfare Offices</a>
        <a onclick="nav('grievance')">📞 Contact &amp; Helpdesk</a>
      </div>
    </div>
    <div class="nav-dropdown-wrap">
      <button class="nav-item ${['scheme','schemes'].includes(p)?'active':''}">
        <span class="nav-icon">📋</span> SCHOLARSHIPS <span class="chevron">▾</span>
      </button>
      <div class="nav-dropdown-menu">
        ${SCHEMES.map(s=>`<a onclick="nav('scheme',{scheme:'${s.id}'})">${s.icon} ${s.name}</a>`).join('')}
        <hr style="border:none;border-top:1px solid #eee;margin:4px 0">
        <a onclick="nav('schemes')">📋 All Schemes Directory →</a>
      </div>
    </div>
    <button class="nav-item ${p==='eligibility'?'active':''}" onclick="nav('eligibility')">
      <span class="nav-icon">✅</span> CRITERIA &amp; ELIGIBILITY
    </button>
    <button class="nav-item ${p==='track'?'active':''}" onclick="nav('track')">
      <span class="nav-icon">🔍</span> TRACK APPLICATION
    </button>
    <button class="nav-item ${p==='notices'?'active':''}" onclick="nav('notices')">
      <span class="nav-icon">🔔</span> NOTICES &amp; CALENDAR
    </button>
    <button class="nav-item ${p==='grievance'?'active':''}" onclick="nav('grievance')">
      <span class="nav-icon">🤝</span> FAQ &amp; GRIEVANCE
    </button>
    <button class="nav-item" onclick="nav('dashboard',{sideTab:'officerReview'})" style="color:#900C3F;font-weight:700">
      <span class="nav-icon">🛡️</span> OFFICER PORTAL
    </button>
  </nav>`;
}

// ─── NOTICE TICKER ──────────────────────────────────────────────────────────
function renderNoticeBar() {
  return `
  <div class="notice-bar" aria-label="Latest notices">
    <div class="notice-label">📢 Latest notices</div>
    <div class="notice-scroll" aria-live="polite">
      <div class="notice-text">
        ● Applications open for National Fellowship for ST Students (NFST) 2026–27 &nbsp;&nbsp;
        ● Last date extended for Post-Matric Scholarship — now applies till 15 Oct 2026 &nbsp;&nbsp;
        ● Guidelines for income certificate updated — refer to latest circular &nbsp;&nbsp;
        ● New: NOS 2026–27 applications invited — check eligibility now &nbsp;&nbsp;
      </div>
    </div>
    <div class="notice-ctrl">
      <button aria-label="Previous notice">‹</button>
      <button aria-label="Next notice">›</button>
    </div>
    <span class="notice-viewall" onclick="nav('notices')" role="link" tabindex="0">View all →</span>
  </div>`;
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function renderFooter() {
  return `
  <footer class="tb-footer" role="contentinfo">
    <div class="tb-footer-container">
      <div>
        <div class="tb-footer-brand-title">🏛️ MoTA Tribal Scholarships</div>
        <p class="tb-footer-brand-p">
          Ministry of Tribal Affairs, Government of India. Official AI-assisted portal for National Fellowship, Overseas Scholarship, Top Class Education, and Direct Benefit Transfer for Scheduled Tribe students.
        </p>
        <button class="tb-footer-app-btn" onclick="nav(APP.user?'dashboard':'login')">
          ${APP.user?'Go to Dashboard →':'Application / Log In →'}
        </button>
      </div>

      <div class="tb-footer-col">
        <h4>About</h4>
        <ul>
          <li><a onclick="nav('about')">About the Portal</a></li>
          <li><a onclick="nav('about')">Ministry of Tribal Affairs</a></li>
          <li><a onclick="nav('guidelines')">Guidelines &amp; Acts</a></li>
          <li><a onclick="nav('about')">State Tribal Nodal Offices</a></li>
          <li><a onclick="nav('grievance')">Contact &amp; Helpdesk</a></li>
        </ul>
      </div>

      <div class="tb-footer-col">
        <h4>Tribal Scholarships</h4>
        <ul>
          ${SCHEMES.map(s=>`<li><a onclick="nav('scheme',{scheme:'${s.id}'})">${s.name}</a></li>`).join('')}
          <li><a onclick="nav('eligibility')">Eligibility Checker</a></li>
          <li><a onclick="nav('notices')">Application Calendar</a></li>
        </ul>
      </div>

      <div class="tb-footer-col">
        <h4>Discover &amp; Services</h4>
        <ul>
          <li><a onclick="nav('track')">Track Application Status</a></li>
          <li><a onclick="nav('dashboard',{sideTab:'officerReview'})">Officer Scrutiny Tower</a></li>
          <li><a onclick="nav('grievance')">Grievance Redressal</a></li>
          <li><a onclick="toggleChat()">SahayBot Virtual Helpdesk</a></li>
          <li><a onclick="toast('🔒 Digital Personal Data Protection (DPDP) Act 2023 compliant.')">DPDP Act 2023 Compliance</a></li>
        </ul>
      </div>
    </div>

    <div class="tb-footer-bottom">
      <div>© 2026 Ministry of Tribal Affairs, Government of India. All Rights Reserved. SIH 2026 PS 26239.</div>
      <div>National Informatics Centre (NIC) Cloud-Ready Architecture · GIGW 3.0 &amp; WCAG 2.1 AA Compliant</div>
    </div>
  </footer>`;
}

function renderTop() { return renderGovBar() + renderHeader() + renderNav() + renderNoticeBar(); }

// ─── CHAT ────────────────────────────────────────────────────────────────────
const chatFAQ = {
  nfst: 'NFST (National Fellowship for ST Students) supports M.Phil/PhD students with fellowships. ~750 awards per year [DEMO]. Apply at fellowship.tribal.gov.in.',
  nos: 'NOS (National Overseas Scholarship) supports 20 ST students [DEMO] per year for abroad Master\'s/PhD.',
  document: 'Typical documents: ST Certificate, Income Certificate, Marksheets, Admission Letter, Bank Passbook, Aadhaar (masked). Exact list varies by scheme.',
  track: 'Track your application by logging in → My Applications, or use Track Application in the top nav.',
  income: 'Income limits: NFST/NOS/TCE — ₹6 Lakh; Pre-Matric/Post-Matric — ₹2.5 Lakh [DEMO values — verify from official guidelines].',
  eligibility: 'Use the Check Eligibility wizard above. It asks 4 simple questions and shows which schemes you may qualify for.',
  aadhaar: 'Your Aadhaar is never stored in full. Only a masked token is kept as per DPDP Act 2023.',
  default: 'I can answer questions about schemes, eligibility, documents, and the application process. Ask me anything!'
};

function renderChat() {
  return `
  <button class="chat-fab" onclick="toggleChat()" aria-label="Open help chat" title="SahayBot — Scholarship Helpdesk">💬</button>
  <div class="chat-win ${APP.chatOpen?'open':''}" id="chat-win" role="dialog" aria-label="SahayBot help chat">
    <div class="chat-hd">
      <div class="chat-bot-av">🤖</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:.88rem">SahayBot</div>
        <div style="font-size:.68rem;opacity:.7">Scholarship Helpdesk — FAQ only · AI does not decide eligibility</div>
      </div>
      <button onclick="toggleChat()" style="background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.7);cursor:pointer;padding:4px 7px;border-radius:4px;font-size:.9rem">✕</button>
    </div>
    <div class="chat-body" id="chat-body">
      <div class="chat-msg bot">Hello! I'm SahayBot. I can help you with questions about scholarships, eligibility, and the application process.<br><br><em style="font-size:.72rem;color:#888">ⓘ I only provide factual scheme information. I do not make eligibility or selection decisions.</em></div>
      <div class="chat-msg bot">Try asking: "What is NFST?", "What documents are needed?", "Income limit?", "How to track my application?"</div>
    </div>
    <div class="chat-inp-row">
      <input class="chat-inp" id="chat-inp" type="text" placeholder="Ask a question…" onkeydown="if(event.key==='Enter')sendChat()">
      <button class="chat-send" onclick="sendChat()" aria-label="Send message">➤</button>
    </div>
  </div>`;
}
function toggleChat() {
  APP.chatOpen = !APP.chatOpen;
  const w = $('chat-win'); if(w) w.classList.toggle('open', APP.chatOpen);
  if(APP.chatOpen) setTimeout(() => { const i=$('chat-inp'); if(i)i.focus(); }, 200);
}
function sendChat() {
  const inp = $('chat-inp'); if(!inp||!inp.value.trim()) return;
  const msg = inp.value.trim(); inp.value = '';
  const body = $('chat-body'); if(!body) return;
  body.innerHTML += `<div class="chat-msg user">${esc(msg)}</div>`;
  body.scrollTop = body.scrollHeight;
  setTimeout(() => {
    const low = msg.toLowerCase();
    let resp = chatFAQ.default;
    for(const [k,v] of Object.entries(chatFAQ)) {
      if(k!=='default' && low.includes(k)){resp=v;break;}
    }
    body.innerHTML += `<div class="chat-msg bot">${resp}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 650);
}

// ─── HOME PAGE ───────────────────────────────────────────────────────────────
function renderHome() {
  const currentSlide = TB_SLIDES[APP.tbSlide || 0] || TB_SLIDES[0];
  const activeFilter = APP.supportFilter || 'all';
  const filteredSupports = activeFilter === 'all' 
    ? TB_SUPPORTS 
    : TB_SUPPORTS.filter(s => s.cat === activeFilter);

  return `
  ${renderTop()}
  <main id="main-content">

    <!-- ① TÜRKIYE BURSLARI INSPIRO SLIDER / HERO -->
    <section class="tb-hero-slider" aria-label="Tribal Scholarship Portal Hero">
      <div class="tb-hero-container anim">
        <div class="tb-hero-hashtag">${currentSlide.hashtag} · ${currentSlide.badge}</div>
        <h1 class="tb-hero-title">${currentSlide.title}</h1>
        <p class="tb-hero-desc">${currentSlide.desc}</p>
        <div class="tb-hero-actions">
          <button class="tb-btn-primary" onclick="nav('scheme',{scheme:'${currentSlide.scheme}'})">
            Detail &amp; Apply Now →
          </button>
          <button class="tb-btn-outline" onclick="nav('eligibility')">
            Check Eligibility Criteria
          </button>
          <button class="tb-btn-outline" onclick="toast('▶ Launching interactive system demo and verification walkthrough...')">
            ▶ System Walkthrough
          </button>
        </div>
        <div class="tb-slider-dots">
          ${TB_SLIDES.map((_, i) => `
            <div class="tb-dot ${(APP.tbSlide||0)===i?'active':''}" onclick="setTbSlide(${i})" title="Slide ${i+1}"></div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ② SHORTCUTS (3 ICON BOXES - WHAT COVERS, CRITERIA, HOW TO APPLY) -->
    <section class="tb-shortcuts-section" aria-label="Key Highlights">
      <div class="tb-shortcuts-grid">
        <div class="tb-icon-box anim d1" onclick="nav('schemes')">
          <div class="tb-icon-wrap">🎓</div>
          <h3>What the Scholarship Covers</h3>
          <p>Comprehensive financial coverage: 100% tuition fees, monthly living and research stipends up to ₹35,000/mo, annual contingency grants, and foreign university placement.</p>
          <div class="tb-icon-link">Explore Benefits &amp; Allowances →</div>
        </div>

        <div class="tb-icon-box anim d2" onclick="nav('eligibility')">
          <div class="tb-icon-wrap">📋</div>
          <h3>Application Criteria</h3>
          <p>Competitive, merit-based selection with ST certificate validation, qualifying degree threshold (55%+), parental income criteria, and transparent AI merit scoring.</p>
          <div class="tb-icon-link">View Eligibility Criteria →</div>
        </div>

        <div class="tb-icon-box anim d3" onclick="nav(APP.user?'apply':'register')">
          <div class="tb-icon-wrap">💻</div>
          <h3>How to Apply</h3>
          <p>Completely online application system, zero application fees, instant DigiLocker e-KYC document verification, OCR scrutiny, and direct Aadhaar-seeded DBT bank transfer.</p>
          <div class="tb-icon-link">Application in 5 Steps →</div>
        </div>
      </div>
    </section>

    <!-- ③ VITRIN 1 (GRAY BG: NEWS & ANNOUNCEMENTS + PROGRAM SEARCH WIDGET) -->
    <section class="tb-vitrin-1" aria-label="News and Program Search">
      <div class="tb-vitrin-container">
        <!-- Left: News & Announcements -->
        <div>
          <div class="tb-widget-title">
            <span>📰 News &amp; Announcements</span>
            <span class="tb-view-all" onclick="nav('notices')">All Announcements →</span>
          </div>
          <div class="tb-news-grid">
            ${TB_NEWS.map(n => `
              <div class="tb-post-card anim" onclick="nav('scheme',{scheme:'${n.scheme}'})">
                <div class="tb-post-thumb">
                  <span>🏛️</span>
                  <span class="tb-post-badge">${n.type}</span>
                </div>
                <div class="tb-post-body">
                  <div>
                    <div class="tb-post-date">${n.date}</div>
                    <div class="tb-post-title">${n.title}</div>
                    <p style="font-size:.78rem;color:#666;line-height:1.4">${n.desc}</p>
                  </div>
                  <div class="tb-post-footer">
                    <span>View Scheme Details</span>
                    <span>➔</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Program Search Widget (Signature Türkiye Burslari Widget) -->
        <div>
          <div class="tb-search-widget anim">
            <div class="tb-search-widget-title">
              <span>Program Search</span> <span>🔍</span>
            </div>
            <form onsubmit="event.preventDefault(); runProgramSearch();">
              <div class="tb-form-group">
                <label class="tb-form-label">Education Field</label>
                <select class="tb-form-select" id="tb-field">
                  <option value="">Select Education Field</option>
                  <option value="Engineering & Technology">Engineering &amp; Technology</option>
                  <option value="Medicine & Health Sciences">Medicine &amp; Health Sciences</option>
                  <option value="Natural & Space Sciences">Natural &amp; Space Sciences</option>
                  <option value="Ph.D. / Doctoral Research">Ph.D. / Doctoral Research</option>
                  <option value="Humanities & Tribal Studies">Humanities &amp; Tribal Studies</option>
                  <option value="Business & Management">Business &amp; Management</option>
                  <option value="Law & Public Policy">Law &amp; Public Policy</option>
                  <option value="Agriculture & Forestry">Agriculture &amp; Forestry</option>
                </select>
              </div>

              <div class="tb-form-group">
                <label class="tb-form-label">Degree Level</label>
                <select class="tb-form-select" id="tb-level">
                  <option value="">Select Level</option>
                  <option value="ug">Undergraduate / Bachelor's (IITs/AIIMS)</option>
                  <option value="pg">Postgraduate / Master's</option>
                  <option value="phd">Ph.D. / M.Phil Research Fellowship</option>
                  <option value="overseas">International / Overseas Study (QS Top 500)</option>
                </select>
              </div>

              <div class="tb-form-group">
                <label class="tb-form-label">Scholarship Scheme</label>
                <select class="tb-form-select" id="tb-scheme">
                  <option value="">Select Scheme</option>
                  <option value="NFST">National Fellowship (NFST - Ph.D.)</option>
                  <option value="NOS">National Overseas Scholarship (NOS)</option>
                  <option value="TCE">Top Class Education (Premier Institutes)</option>
                  <option value="POSTMATRIC">Post-Matric Scholarship for ST</option>
                  <option value="PREMATRIC">Pre-Matric Scholarship for ST</option>
                </select>
              </div>

              <div class="tb-form-group">
                <label class="tb-form-label">Institution Tier</label>
                <select class="tb-form-select" id="tb-tier">
                  <option value="">Select Institution Category</option>
                  <option value="iit">IITs, IIMs, AIIMS, NITs, NLUs</option>
                  <option value="central">Central Universities &amp; National Institutes</option>
                  <option value="global">Foreign QS Top 500 Universities</option>
                  <option value="state">Recognized State Colleges &amp; Universities</option>
                </select>
              </div>

              <button type="submit" class="tb-btn-search">
                Search Programs ➔
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ④ SHOWCASE PORTFOLIO: WHAT THE SCHOLARSHIP COVERS (FILTER TABS) -->
    <section class="tb-portfolio-section" aria-label="Scholarship Support Portfolio">
      <div class="tb-section-heading">
        <h2>What the Scholarship Covers</h2>
        <p>Explore comprehensive support components provided to Scheduled Tribe scholars under Ministry of Tribal Affairs schemes</p>
      </div>

      <div class="tb-filter-nav">
        ${[
          ['all','All Benefits'],
          ['stipend','Monthly Stipend'],
          ['tuition','Tuition & Fees'],
          ['contingency','Contingency Grant'],
          ['travel','Overseas Travel'],
          ['research','Equipment & Laptops'],
          ['hostel','Hostel Allowance']
        ].map(([k, label]) => `
          <button class="tb-filter-btn ${activeFilter===k?'active':''}" onclick="setSupportFilter('${k}')">
            ${label}
          </button>
        `).join('')}
      </div>

      <div class="tb-support-grid">
        ${filteredSupports.map(s => `
          <div class="tb-support-card anim">
            <div class="tb-support-ico">${s.ico}</div>
            <h4>${s.title}</h4>
            <div class="tb-support-amt">${s.amt}</div>
            <p class="tb-support-desc">${s.desc}</p>
            <div style="margin-top:.75rem;padding-top:.5rem;border-top:1px solid #f0f0f0;font-size:.72rem;color:#888;font-weight:600">
              Scheme: ${s.schemes}
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- ⑤ COUNTERS SECTION (DARK WINE BACKGROUND) -->
    <section id="counters" class="tb-counters-section" aria-label="Portal Key Metrics">
      <div class="tb-counters-container">
        <div class="tb-counter-box anim d1">
          <div class="tb-counter-ico">🏛️</div>
          <div class="tb-counter-num">258+</div>
          <div class="tb-counter-label">Premier Universities &amp; Institutes</div>
        </div>
        <div class="tb-counter-box anim d2">
          <div class="tb-counter-ico">📚</div>
          <div class="tb-counter-num">45,000+</div>
          <div class="tb-counter-label">ST Scholars Funded &amp; Supported</div>
        </div>
        <div class="tb-counter-box anim d3">
          <div class="tb-counter-ico">💳</div>
          <div class="tb-counter-num">₹480+ Cr</div>
          <div class="tb-counter-label">Disbursed Directly via PFMS DBT</div>
        </div>
        <div class="tb-counter-box anim d4">
          <div class="tb-counter-ico">🎓</div>
          <div class="tb-counter-num">100%</div>
          <div class="tb-counter-label">Automated AI &amp; DigiLocker Scrutiny</div>
        </div>
      </div>
    </section>

    <!-- ⑥ DEGREE LEVELS SHOWCASE (3 VISUAL CARDS) -->
    <section class="tb-showcase-section" aria-label="Degree Level Categories">
      <div class="tb-showcase-container">
        <div class="tb-showcase-card anim d1" style="background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\\' fill=\\'%23900C3F\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3C/path%3E%3C/svg%3E')">
          <div class="tb-showcase-overlay"></div>
          <div class="tb-showcase-content">
            <span class="tb-showcase-badge">Undergraduate &amp; Professional</span>
            <h3 class="tb-showcase-title">Top Class Education</h3>
            <p class="tb-showcase-copy">Full tuition and living stipend for ST students admitted into notified Indian Institutes of Technology, IIMs, AIIMS, and National Law Universities.</p>
            <button class="tb-btn-detail" onclick="nav('scheme',{scheme:'TCE'})">Explore Program →</button>
          </div>
        </div>

        <div class="tb-showcase-card anim d2" style="background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\\' fill=\\'%235A0828\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3C/path%3E%3C/svg%3E')">
          <div class="tb-showcase-overlay"></div>
          <div class="tb-showcase-content">
            <span class="tb-showcase-badge">Postgraduate &amp; Ph.D. Research</span>
            <h3 class="tb-showcase-title">National Fellowship (NFST)</h3>
            <p class="tb-showcase-copy">750 annual fellowships for M.Phil and Ph.D. research scholars with ₹31,000–₹35,000/mo stipend and ₹28,000 contingency grants.</p>
            <button class="tb-btn-detail" onclick="nav('scheme',{scheme:'NFST'})">Explore Fellowship →</button>
          </div>
        </div>

        <div class="tb-showcase-card anim d3" style="background-image:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.8)),url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\\' fill=\\'%23C9A96E\\' fill-opacity=\\'0.4\\' fill-rule=\\'evenodd\\'%3E%3C/path%3E%3C/svg%3E')">
          <div class="tb-showcase-overlay"></div>
          <div class="tb-showcase-content">
            <span class="tb-showcase-badge">International Higher Education</span>
            <h3 class="tb-showcase-title">National Overseas Scholarship</h3>
            <p class="tb-showcase-copy">Full tuition fees, airfare, and annual living allowance of $15,400 / £9,900 for Master's and Ph.D. students at top 500 QS world universities.</p>
            <button class="tb-btn-detail" onclick="nav('scheme',{scheme:'NOS'})">Explore NOS Program →</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ⑦ VITRIN 3: GUIDANCE BANNERS ("GOOD TO KNOW") -->
    <section class="tb-guidance-section" aria-label="Student Guidance">
      <div class="tb-section-heading">
        <h2>Guidance &amp; Resources</h2>
        <p>Essential information to prepare and complete your scholarship application with zero delays</p>
      </div>
      <div class="tb-guidance-grid">
        <div class="tb-guide-card anim d1">
          <div class="tb-guide-icon">📝</div>
          <h3>Application in 5 Steps</h3>
          <p>Learn how to register, fill academic details, link DigiLocker certificates, pass AI pre-submission checks, and track your application status online.</p>
          <div class="tb-icon-link" onclick="nav('guidelines')">Read Application Guide →</div>
        </div>

        <div class="tb-guide-card anim d2">
          <div class="tb-guide-icon">🛡️</div>
          <h3>AI Document Scrutiny &amp; Rules</h3>
          <p>Understand how PaddleOCR, cross-document verification, and Dialect-Shield transliteration matching prevent erroneous rejections.</p>
          <div class="tb-icon-link" onclick="nav('dashboard',{sideTab:'officerReview'})">Inspect Scrutiny Engine →</div>
        </div>

        <div class="tb-guide-card anim d3">
          <div class="tb-guide-icon">💳</div>
          <h3>Aadhaar Bank Seeding for DBT</h3>
          <p>Ensure your bank account is seeded with NPCI Aadhaar mapper to receive direct scholarship stipends without transaction failure.</p>
          <div class="tb-icon-link" onclick="nav('track')">Check Payment Tracker →</div>
        </div>
      </div>
    </section>

    <!-- ⑧ CALENDAR & FAQ SECTION -->
    <section class="tb-cal-faq-section" aria-label="Calendar and FAQs">
      <div class="tb-cal-faq-container">
        <!-- Left: Application Calendar -->
        <div class="tb-card-box anim">
          <div class="tb-widget-title" style="margin-bottom:.75rem">
            <span>📅 Application Calendar (2026-27)</span>
            <span class="tb-view-all" onclick="nav('notices')">Full Schedule →</span>
          </div>
          <div class="tb-cal-timeline">
            ${TB_CALENDAR.map(c => `
              <div class="tb-cal-item">
                <div class="tb-cal-date-badge">
                  <div class="tb-cal-day">${c.day}</div>
                  <div class="tb-cal-month">${c.month}</div>
                </div>
                <div class="tb-cal-details">
                  <h4>${c.title}</h4>
                  <p>${c.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: FAQ Accordions -->
        <div class="tb-card-box anim">
          <div class="tb-widget-title" style="margin-bottom:.75rem">
            <span>❓ Frequently Asked Questions</span>
            <span class="tb-view-all" onclick="nav('grievance')">All FAQs →</span>
          </div>
          <div class="tb-faq-list">
            ${TB_FAQS.map((faq, i) => `
              <div class="tb-faq-item">
                <div class="tb-faq-question" onclick="toggleFaq(${i})">
                  <span>${faq.q}</span>
                  <span style="color:#900C3F;font-size:1.1rem">${APP.faqOpen===i?'−':'+'}</span>
                </div>
                ${APP.faqOpen===i ? `<div class="tb-faq-answer anim">${faq.a}</div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- ⑨ SCHEMES DIRECTORY CARDS -->
    <section class="section section-bg-white" aria-labelledby="schemes-hd">
      <div style="max-width:1200px;margin:0 auto">
        <div class="section-header">
          <div>
            <div class="section-title" id="schemes-hd">All MoTA Schemes &amp; Fellowships</div>
            <div class="section-subtitle">Financial support for Scheduled Tribe scholars at every stage of academic excellence</div>
          </div>
          <span class="view-all" onclick="nav('schemes')">View all schemes directory →</span>
        </div>
        <div class="scheme-row">
          ${SCHEMES.map((s,i)=>`
            <div class="scheme-card anim d${i+1}" style="--sc-color:${s.color};--sc-bg:${s.bg}" onclick="nav('scheme',{scheme:'${s.id}'})" role="button" tabindex="0">
              <div class="sc-icon-wrap">${s.icon}</div>
              <div class="sc-name">${s.name}</div>
              <div class="sc-desc">${s.desc}</div>
              <div class="sc-learn">Learn more &amp; apply →</div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- ⑩ TECH STACK ARCHITECTURE -->
    ${renderTechStackSection()}

    <!-- ⑪ PARTNERS STRIP -->
    <section class="tb-partners-section" aria-label="Collaborating Institutions">
      <div class="tb-section-heading" style="margin-bottom:1rem">
        <h2 style="font-size:1.35rem">Partners &amp; Statutory Integrations</h2>
        <p style="font-size:.82rem">Institutions and national registries powering transparent scholarship administration</p>
      </div>
      <div class="tb-partners-grid">
        ${[
          ['🏛️','Ministry of Tribal Affairs'],
          ['🔐','DigiLocker API'],
          ['💳','PFMS DBT-P'],
          ['🎓','National Scholarship Portal'],
          ['📚','University Grants Commission'],
          ['⚙️','AICTE Council'],
          ['🏛️','IIT Council'],
          ['🌐','National Informatics Centre']
        ].map(([ico, name]) => `
          <div class="tb-partner-item">
            <div class="tb-partner-ico">${ico}</div>
            <div class="tb-partner-name">${name}</div>
          </div>
        `).join('')}
      </div>
    </section>

  </main>
  ${renderFooter()}
  ${renderChat()}`;
}

function renderTechStackSection() {
  return `
  <section class="tech-stack-section" aria-labelledby="ts-hd">
    <div style="max-width:1200px;margin:0 auto">
      <div class="section-header" style="margin-bottom:.25rem">
        <div>
          <div class="ts-title" id="ts-hd">Tech Stack — AI-Enabled Scholarship &amp; Fellowship System</div>
          <div class="ts-subtitle">13-layer production architecture — built for scale, security, and government deployment</div>
        </div>
        <span class="demo-tag">Implementation Reference</span>
      </div>
      <div class="ts-grid">
        ${TECH_STACK.map(t=>`
          <div class="ts-card anim" style="--ts-color:${t.color}" title="${t.tech}">
            <div class="ts-num" style="background:${t.color}">${t.n}</div>
            <div class="ts-ico">${t.icon}</div>
            <div class="ts-body">
              <div class="ts-layer">${t.layer}</div>
              <div class="ts-tech">${t.tech}</div>
              <div class="ts-desc">${t.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

// ─── SCHEMES LIST ────────────────────────────────────────────────────────────
function renderSchemes() {
  return `
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>All Schemes</div>
  <main id="main-content" style="max-width:1200px;margin:0 auto;padding:1.5rem">
    <div class="page-hd"><h1>All Scholarship &amp; Fellowship Schemes</h1><p>MoTA scholarship schemes for Scheduled Tribe (ST) students</p></div>
    <div class="scheme-row" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
      ${SCHEMES.map((s,i)=>`
        <div class="scheme-card anim d${i+1}" style="--sc-color:${s.color};--sc-bg:${s.bg}" onclick="nav('scheme',{scheme:'${s.id}'})">
          <div class="sc-icon-wrap">${s.icon}</div>
          <div class="sc-name">${s.name}</div>
          <div class="sc-desc">${s.desc}</div>
          <div style="font-size:.72rem;color:var(--text-muted);margin-bottom:.5rem">${s.type}</div>
          ${s.demoNote?`<span class="demo-tag">Demo values</span>`:''}
          <div class="sc-learn" style="margin-top:.75rem">View details →</div>
        </div>
      `).join('')}
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

// ─── SCHEME DETAIL ───────────────────────────────────────────────────────────
function renderScheme() {
  const s = SCHEMES.find(x=>x.id===APP.scheme)||SCHEMES[0];
  return `
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span><a onclick="nav('schemes')">Schemes</a><span class="bc-sep">›</span>${esc(s.name)}</div>
  <div class="scheme-detail-hd" style="background:linear-gradient(135deg,${s.color} 0%,${s.color}cc 100%)">
    <div style="max-width:900px;margin:0 auto">
      <div style="font-size:2.5rem;margin-bottom:.75rem">${s.icon}</div>
      <h1 style="font-size:1.75rem;margin-bottom:.5rem">${esc(s.name)}</h1>
      <p style="opacity:.85;font-size:.95rem;margin-bottom:1rem">${esc(s.desc)}</p>
      ${s.demoNote?`<span class="demo-tag" style="margin-bottom:1rem;display:inline-flex">⚠️ Some values are demo placeholders — verify from official guidelines</span><br>`:''}
      <div style="display:flex;flex-wrap:wrap;gap:1rem;margin-bottom:1.25rem">
        ${s.seats?`<div style="background:rgba(255,255,255,.15);padding:8px 16px;border-radius:6px"><div style="font-size:.68rem;opacity:.7;text-transform:uppercase;letter-spacing:.08em">Annual Seats</div><div style="font-weight:800">${s.seats}${s.demoNote?' [DEMO]':''}</div></div>`:''}
        ${[['Income Limit',s.income],['Age Limit',s.age],['Benefit',s.benefit],['Type',s.type],['DBT Code',s.code]].map(([l,v])=>`
          <div style="background:rgba(255,255,255,.15);padding:8px 16px;border-radius:6px"><div style="font-size:.68rem;opacity:.7;text-transform:uppercase;letter-spacing:.08em">${l}</div><div style="font-weight:700;font-size:.88rem">${v}</div></div>
        `).join('')}
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn btn-orange" onclick="nav(APP.user?'apply':'login',{scheme:'${s.id}'})">Apply Now</button>
        <button class="btn" style="background:rgba(255,255,255,.2);color:#fff;border:1.5px solid rgba(255,255,255,.4)" onclick="nav('eligibility')">Check Eligibility</button>
      </div>
    </div>
  </div>
  <main id="main-content" style="max-width:900px;margin:0 auto;padding:1.5rem">
    <div class="sd-tabs" id="sd-tabs">
      <button class="sd-tab active" onclick="sdTab('overview',this)">Overview</button>
      <button class="sd-tab" onclick="sdTab('eligibility',this)">Eligibility</button>
      <button class="sd-tab" onclick="sdTab('documents',this)">Documents</button>
      <button class="sd-tab" onclick="sdTab('process',this)">Process</button>
      <button class="sd-tab" onclick="sdTab('faqs',this)">FAQs</button>
    </div>

    <div id="sdt-overview">
      <div class="card">
        <div class="card-title" style="margin-bottom:.75rem">About this Scheme</div>
        <p style="color:var(--text-mid);line-height:1.7">${esc(s.desc)} ${s.note?`<br><br><em>${esc(s.note)}</em>`:''}</p>
      </div>
    </div>

    <div id="sdt-eligibility" style="display:none">
      <div class="card">
        <div class="card-title" style="margin-bottom:1rem">Eligibility Criteria</div>
        <div class="elig-list">
          ${s.eligibility.map(e=>`
            <div class="elig-item pass">
              <span class="elig-icon">✅</span>
              <div class="elig-text"><strong>${esc(e.label)}</strong><span>${esc(e.note||'')}</span></div>
            </div>
          `).join('')}
        </div>
        <div class="alert alert-info" style="margin-top:1rem">
          <span class="alert-icon">ℹ️</span>
          <div class="alert-body">Use the <strong>Eligibility Pre-check</strong> wizard for a personalised assessment before applying.</div>
          <div class="alert-action"><button class="btn btn-navy btn-sm" onclick="nav('eligibility')">Check Eligibility</button></div>
        </div>
      </div>
    </div>

    <div id="sdt-documents" style="display:none">
      <div class="card">
        <div class="card-title" style="margin-bottom:1rem">Required Documents</div>
        <div class="doc-list">
          ${s.documents.map((d,i)=>`
            <div class="doc-row">
              <div class="doc-status ok">${i+1}</div>
              <span class="doc-name">${esc(d)}</span>
              <span class="doc-tag digilocker">Mandatory</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div id="sdt-process" style="display:none">
      <div class="card">
        <div class="card-title" style="margin-bottom:1.25rem">Application Process</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem">
          ${['Register / Login','Fill Application Form','Upload Documents','AI Auto-Screening','Officer Scrutiny','Merit Listing','Selection & Sanction','Disbursement via DBT'].map((step,i)=>`
            <div style="text-align:center;padding:.875rem;background:var(--bg);border:1.5px solid var(--border);border-radius:var(--radius)">
              <div style="width:32px;height:32px;border-radius:50%;background:var(--navy);color:#fff;font-weight:800;font-size:.8rem;display:flex;align-items:center;justify-content:center;margin:0 auto .5rem">${i+1}</div>
              <div style="font-size:.76rem;font-weight:700">${step}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div id="sdt-faqs" style="display:none">
      ${[
        ['Can I apply for multiple schemes?','You can check eligibility for all schemes. However, some may have restrictions on concurrent receipt. Check individual guidelines.'],
        ['What if my document is rejected?','You will receive a deficiency notice with exact details. You have a deadline window to re-upload the corrected document.'],
        ['How long does verification take?','AI auto-screening typically completes within 24–48 hours. Officer scrutiny depends on application volume.'],
        ['Is my Aadhaar data safe?','We never store full Aadhaar numbers. Only a masked/tokenised form is kept as per DPDP Act 2023.'],
        ['How will I receive payments?','Payments go directly to your bank account via DBT/PFMS. For NOS, through Indian Missions abroad.']
      ].map(([q,a])=>`
        <div class="card" style="margin-bottom:.625rem;cursor:pointer" onclick="const ans=this.querySelector('.faq-ans');ans.style.display=ans.style.display==='none'?'block':'none'">
          <div style="font-weight:700;font-size:.88rem;display:flex;justify-content:space-between">${q} <span style="color:var(--text-muted)">▾</span></div>
          <div class="faq-ans" style="display:none;margin-top:.75rem;font-size:.82rem;color:var(--text-mid);line-height:1.65">${a}</div>
        </div>
      `).join('')}
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

function sdTab(tab, btn) {
  ['overview','eligibility','documents','process','faqs'].forEach(t=>{
    const e=$(`sdt-${t}`); if(e) e.style.display=t===tab?'block':'none';
  });
  qsa('#sd-tabs .sd-tab').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
}

// ─── ELIGIBILITY WIZARD ──────────────────────────────────────────────────────
function renderEligibility() {
  if(APP.wizStep>=WIZARD_STEPS.length) return renderEligResult();
  const ws = WIZARD_STEPS[APP.wizStep];
  return `
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>Check Eligibility</div>
  <main id="main-content" style="max-width:600px;margin:2rem auto;padding:0 1.5rem">
    <div class="card anim">
      <div style="margin-bottom:1.25rem">
        <div style="font-size:1.1rem;font-weight:800;margin-bottom:3px">Eligibility Pre-Check Wizard</div>
        <div style="font-size:.78rem;color:var(--text-muted)">Step ${APP.wizStep+1} of ${WIZARD_STEPS.length} — Answer to see which schemes you may qualify for</div>
      </div>
      <div class="wiz-prog">
        ${WIZARD_STEPS.map((_,i)=>`<div class="wiz-bar ${i<APP.wizStep?'done':i===APP.wizStep?'cur':''}"></div>`).join('')}
      </div>
      <div class="wiz-q">${ws.q}</div>
      <div class="wiz-hint">${ws.hint}</div>
      <div class="wiz-opts">
        ${ws.opts.map(o=>`
          <div class="wiz-opt ${APP.wizAns[ws.field]===o.val?'sel':''}"
               onclick="APP.wizAns['${ws.field}']=${JSON.stringify(o.val)};render()">
            <div class="wiz-opt-ico">${o.icon}</div>
            <div class="wiz-opt-txt">
              <strong>${esc(o.label)}</strong>
              ${o.hint?`<span>${esc(o.hint)}</span>`:''}
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;padding-top:1.25rem;border-top:1.5px solid var(--border)">
        ${APP.wizStep>0?`<button class="btn btn-outline" onclick="APP.wizStep--;render()">← Back</button>`:''}
        <button class="btn btn-navy" style="flex:1"
                onclick="nextWiz()"
                ${APP.wizAns[ws.field]===undefined?'disabled':''}>
          ${APP.wizStep<WIZARD_STEPS.length-1?'Next →':'See Results'}
        </button>
      </div>
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}
function nextWiz() {
  const ws = WIZARD_STEPS[APP.wizStep];
  if(APP.wizAns[ws.field]===undefined) return;
  APP.wizStep++;
  render();
}
function renderEligResult() {
  const a = APP.wizAns;
  const matches = [];
  if(a.is_st===true) {
    if(a.edu==='prematric' && a.income<=250000) matches.push({id:'PREMATRIC',why:'Pre-Matric is for Class IX–X ST students with income ≤ ₹2.5L [DEMO].'});
    if(a.edu==='postmatric' && a.income<=250000) matches.push({id:'POSTMATRIC',why:'Post-Matric is for Class XI+ ST students with income ≤ ₹2.5L [DEMO].'});
    if(a.edu==='tce' && a.income<=600000) matches.push({id:'TCE',why:'Top Class Education supports ST students in premier institutions.'});
    if(a.edu==='phd' && a.income<=600000) matches.push({id:'NFST',why:'NFST is the flagship fellowship for M.Phil/PhD research by ST students.'});
    if(a.edu==='overseas' && a.income<=600000) matches.push({id:'NOS',why:'NOS supports ST students pursuing Master\'s/PhD abroad.'});
  }
  const ok = matches.length>0 && a.is_st===true;
  return `
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span><a onclick="nav('eligibility')">Check Eligibility</a><span class="bc-sep">›</span>Results</div>
  <main id="main-content" style="max-width:600px;margin:2rem auto;padding:0 1.5rem">
    <div class="card anim" style="text-align:center">
      <div style="font-size:3rem;margin-bottom:.75rem">${ok?'🎉':a.is_st!==true?'❌':'⚠️'}</div>
      <h1 style="font-size:1.25rem;color:${ok?'var(--green)':a.is_st!==true?'var(--red)':'var(--amber)'}">
        ${ok?`You may qualify for ${matches.length} scheme${matches.length>1?'s':''}!`:a.is_st!==true?'Not eligible for MoTA schemes':'No scheme matched your answers'}
      </h1>
      <p style="color:var(--text-muted);font-size:.84rem;margin:1rem 0">${
        ok?'Based on your answers, the schemes below may be relevant. Please read the full eligibility criteria before applying.':
        a.is_st!==true?'MoTA scholarships are specifically for Scheduled Tribe students. Check state or other central portals.':
        'Your income or education level may not match any current scheme. Contact our helpdesk for guidance.'
      }</p>
      ${ok?`
        <div style="text-align:left;margin-bottom:1.25rem">
          ${matches.map(m=>{
            const sc=SCHEMES.find(x=>x.id===m.id);
            return `<div class="crit-item pass" style="margin-bottom:.4rem">
              <span style="font-size:1.1rem">${sc?.icon}</span>
              <div class="crit-lbl"><strong>${esc(sc?.name||m.id)}</strong><br><span style="font-size:.72rem;color:var(--text-muted)">${esc(m.why)}</span></div>
              <span class="crit-res">ELIGIBLE</span>
            </div>`;
          }).join('')}
        </div>
        <div style="display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center">
          ${matches.map(m=>`<button class="btn btn-navy btn-sm" onclick="nav('scheme',{scheme:'${m.id}'})">View ${m.id}</button>`).join('')}
          <button class="btn btn-orange" onclick="nav(APP.user?'apply':'login',{scheme:'${matches[0].id}'})">Apply Now</button>
        </div>
      `:''}
      <div style="margin-top:1.25rem;display:flex;gap:.75rem;justify-content:center">
        <button class="btn btn-outline" onclick="APP.wizStep=0;APP.wizAns={};nav('eligibility')">Start over</button>
        <button class="btn btn-ghost" onclick="nav('home')">← Home</button>
      </div>
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

// ─── AUTH ────────────────────────────────────────────────────────────────────
function renderLogin() {
  return `
  ${renderGovBar()}${renderHeader()}${renderNav()}
  <main id="main-content">
    <div class="auth-layout">
      <div class="auth-left">
        <h2>One portal for all ST scholarships &amp; fellowships</h2>
        <p>Access NFST, NOS, Top Class Education, Pre-Matric and Post-Matric scholarships in one secure place.</p>
        <div class="auth-features">
          ${[['🤖','AI-assisted document verification — officer approves every decision'],['🔒','OTP-based login — no passwords to forget'],['📱','Track applications on mobile — SMS & WhatsApp alerts'],['🌐','Available in 12 languages'],['♿','Accessible — WCAG 2.1 AA compliant']].map(([ico,txt])=>`
            <div class="auth-feat"><div class="auth-feat-ico">${ico}</div><span>${txt}</span></div>
          `).join('')}
        </div>
      </div>
      <div class="auth-right">
        <h1 class="auth-title">Sign in to your account</h1>
        <p class="auth-subtitle">Enter your mobile number or email to receive an OTP</p>
        <div class="auth-tabs" id="auth-tabs">
          <button class="auth-tab active" onclick="setActive('#auth-tabs','button',this)">Applicant</button>
          <button class="auth-tab" onclick="setActive('#auth-tabs','button',this)">Officer / Admin</button>
        </div>
        <div class="form-group">
          <label class="form-label">Mobile number or Email <span class="req">*</span></label>
          <input class="form-input" id="login-id" type="text" placeholder="+91 XXXXX XXXXX or email@example.com">
        </div>
        <div id="otp-sec" style="display:none">
          <p style="font-size:.78rem;color:var(--text-muted);margin-bottom:.75rem">OTP sent. Enter the 6-digit code. <span style="color:var(--navy);cursor:pointer">Resend (30s)</span></p>
          <div class="otp-row">
            ${[1,2,3,4,5,6].map(i=>`<input class="otp-dig form-input" id="otp-${i}" maxlength="1" inputmode="numeric" onkeyup="otpUp(event,${i})" type="text">`).join('')}
          </div>
        </div>
        <button class="btn btn-navy btn-full" id="otp-btn" onclick="handleOtp()">Send OTP</button>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted)">New user? <span style="color:var(--navy);font-weight:700;cursor:pointer" onclick="nav('register')">Register here</span></p>
        <div class="demo-login-row">
          <div class="demo-login-label">Demo login — click to instantly sign in as:</div>
          <div class="demo-btns">
            <button onclick="demoLogin('applicant')">👤 Applicant</button>
            <button onclick="demoLogin('officer')">🕵️ Officer</button>
            <button onclick="demoLogin('admin')">⚙️ Admin</button>
          </div>
        </div>
      </div>
    </div>
  </main>`;
}

function renderRegister() {
  return `
  ${renderGovBar()}${renderHeader()}${renderNav()}
  <main id="main-content">
    <div class="auth-layout">
      <div class="auth-left">
        <h2>Create your ST student profile — once, for all schemes</h2>
        <p>Register once and apply to any MoTA scholarship without re-entering your details.</p>
        <div class="auth-features">
          ${[['📋','One profile — multiple scheme applications'],['🔒','DPDP Act 2023 compliant — your data is secure'],['📄','DigiLocker integration for instant document fetch [Mock]'],['🌐','Apply in your language']].map(([ico,txt])=>`
            <div class="auth-feat"><div class="auth-feat-ico">${ico}</div><span>${txt}</span></div>
          `).join('')}
        </div>
      </div>
      <div class="auth-right">
        <h1 class="auth-title">Create your account</h1>
        <p class="auth-subtitle">Fill in your details to get started</p>
        <div class="form-row">
          <div class="form-group"><label class="form-label">First name <span class="req">*</span></label><input class="form-input" placeholder="First name"></div>
          <div class="form-group"><label class="form-label">Last name <span class="req">*</span></label><input class="form-input" placeholder="Last name"></div>
        </div>
        <div class="form-group"><label class="form-label">Mobile number <span class="req">*</span></label><input class="form-input" type="tel" placeholder="+91 XXXXX XXXXX"></div>
        <div class="form-group"><label class="form-label">Email address</label><input class="form-input" type="email" placeholder="your@email.com"></div>
        <div class="form-group">
          <label class="form-label">State / UT <span class="req">*</span></label>
          <select class="form-select">
            <option>Select State</option>
            ${['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'].map(s=>`<option>${s}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.8rem;cursor:pointer">
            <input type="checkbox" id="reg-consent" style="margin-top:3px;flex-shrink:0">
            I consent to data processing as per the Privacy Policy and DPDP Act 2023. My Aadhaar will be masked and never stored in full.
          </label>
        </div>
        <button class="btn btn-navy btn-full" onclick="handleRegister()">Create Account &amp; Send OTP</button>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted);margin-top:.75rem">Already have an account? <span style="color:var(--navy);font-weight:700;cursor:pointer" onclick="nav('login')">Sign in</span></p>
      </div>
    </div>
  </main>`;
}

function setActive(parent, child, target) {
  qsa(`${parent} ${child}`).forEach(e=>e.classList.remove('active'));
  if(target) target.classList.add('active');
}
function handleOtp() {
  const id = $('login-id'); const btn = $('otp-btn'); const sec = $('otp-sec');
  if(!id?.value.trim()){id.style.borderColor='var(--red)';return;}
  if(sec?.style.display==='none'){sec.style.display='block';btn.textContent='Verify OTP & Sign In';id.readOnly=true;}
  else demoLogin('applicant');
}
function otpUp(e,i){if(e.target.value&&i<6){const n=$(`otp-${i+1}`);if(n)n.focus();}}
function handleRegister() {
  if(!$('reg-consent')?.checked){toast('⚠️ Please accept the privacy policy to continue.');return;}
  demoLogin('applicant');
}
function demoLogin(role) {
  APP.user = {
    applicant:{name:'Adi Kumar',initials:'AK',role:'applicant',email:'adi@example.com'},
    officer:{name:'Rahul Singh',initials:'RS',role:'officer',email:'rahul@mota.gov.in'},
    admin:{name:'Admin (MoTA)',initials:'MA',role:'admin',email:'admin@mota.gov.in'}
  }[role];
  nav('dashboard', {sideTab:'overview'});
}
function logout() { APP.user=null; nav('home'); }

// ─── APPLICANT DASHBOARD ─────────────────────────────────────────────────────
function renderDashboard() {
  const u = APP.user;
  if(!u) { nav('login'); return ''; }
  if(u.role==='officer') return renderOfficerDash();
  if(u.role==='admin') return renderAdminDash();
  return renderApplicantDash();
}

function dashLayout(sidebar, main) {
  return `
  ${renderTop()}
  <div class="dash-layout">
    <aside class="sidebar" role="complementary">${sidebar}</aside>
    <div class="main-panel" id="main-content">${main}</div>
  </div>
  ${renderChat()}`;
}

function renderApplicantDash() {
  const u = APP.user;
  const myApps = DEMO_APPS.filter(a=>a.applicant==='Adi Kumar');
  const tab = APP.sideTab;
  const sb = `
    <div class="sb-section">
      <div class="sb-section-title">My Account</div>
      <button class="sb-item ${tab==='overview'?'active':''}" onclick="APP.sideTab='overview';render()"><span class="sb-ico">🏠</span>Dashboard</button>
      <button class="sb-item ${tab==='my-apps'?'active':''}" onclick="APP.sideTab='my-apps';render()"><span class="sb-ico">📋</span>My Applications</button>
      <button class="sb-item ${tab==='documents'?'active':''}" onclick="APP.sideTab='documents';render()"><span class="sb-ico">📁</span>Document Wallet</button>
      <button class="sb-item ${tab==='track'?'active':''}" onclick="APP.sideTab='track';render()"><span class="sb-ico">🔍</span>Track Status</button>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <div class="sb-section-title">Apply</div>
      <button class="sb-item" onclick="nav('schemes')"><span class="sb-ico">🎓</span>All Schemes</button>
      <button class="sb-item" onclick="nav('eligibility')"><span class="sb-ico">✅</span>Check Eligibility</button>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <div class="sb-section-title">Support</div>
      <button class="sb-item ${tab==='notifications'?'active':''}" onclick="APP.sideTab='notifications';render()"><span class="sb-ico">🔔</span>Notifications<span class="sb-badge">3</span></button>
      <button class="sb-item" onclick="nav('grievance')"><span class="sb-ico">🤝</span>Grievance</button>
      <button class="sb-item" onclick="toggleChat()"><span class="sb-ico">💬</span>Help & Chat</button>
    </div>`;
  const main = tab==='overview' ? renderApplicantOverview(u, myApps) :
               tab==='my-apps' ? renderMyApps(myApps) :
               tab==='documents' ? renderDocWallet() :
               tab==='track' ? renderTrackStatus() :
               tab==='notifications' ? renderNotifs() : renderApplicantOverview(u, myApps);
  return dashLayout(sb, main);
}

function renderApplicantOverview(u, myApps) {
  const app = myApps[0];
  const scheme = SCHEMES.find(s=>s.id===app?.scheme);
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div><h1>Welcome back, ${esc(u.name.split(' ')[0])}</h1><p>${app?`${app.id} · ${scheme?.name}`:'No active applications'}</p></div>
      <button class="btn btn-navy btn-sm" onclick="nav('apply',{scheme:'NFST'})">+ New Application</button>
    </div>
  </div>
  ${app?.deficiency?.active?`
    <div class="alert alert-warn anim">
      <span class="alert-icon">⚠️</span>
      <div class="alert-body"><strong>1 document needs attention</strong>Your ${app.deficiency.doc} scan is unclear. Please re-upload by <strong>${app.deficiency.deadline}</strong>.</div>
      <div class="alert-action"><button class="btn btn-orange btn-sm" onclick="APP.sideTab='documents';render()">Fix now →</button></div>
    </div>
  `:''}
  ${app?`
  <div class="card anim d1" style="margin-bottom:1rem">
    <div class="card-header">
      <div class="card-title">📊 Application Status — ${app.id}</div>
      <span class="badge badge-${app.status}">${app.status}</span>
    </div>
    <div class="timeline">
      ${['Submitted','Auto-check','Scrutiny','Selection','Sanction'].map((name,i)=>`
        <div class="tl-step ${i+1<app.stage?'done':i+1===app.stage?'active':'pending'}">
          <div class="tl-dot">${i+1<app.stage?'✓':i+1===app.stage?i+1:''}</div>
          <div class="tl-name">${name}</div>
          <div class="tl-date">${i===0?app.submitted:i===1?app.autoCheck||'':''}</div>
        </div>
      `).join('')}
    </div>
  </div>`:''}
  <div class="card-grid g2 anim d2">
    <div class="card">
      <div class="card-header">
        <div class="card-title">📁 Documents</div>
        <span class="view-all" onclick="APP.sideTab='documents';render()">View all →</span>
      </div>
      <div class="doc-list">
        ${(app?.docs||[]).map(d=>`
          <div class="doc-row">
            <div class="doc-status ${d.status==='ok'?'ok':d.status==='warn'?'warn':'pend'}">${d.status==='ok'?'✓':d.status==='warn'?'⚠':'○'}</div>
            <span class="doc-name">${esc(d.name)}</span>
            <span class="doc-tag ${d.status==='warn'?'unclear':d.source==='DigiLocker'?'digilocker':'pend'}">${d.status==='warn'?'Unclear':d.source==='DigiLocker'?'DigiLocker':'Pending'}</span>
            <span class="doc-chevron">›</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">🛡️ Eligibility Checks</div>
        <span style="font-size:.68rem;color:var(--text-muted)">⚠️ AI-assisted · Officer verifies all</span>
      </div>
      <div class="elig-list">
        ${(app?.elig||[]).map(c=>`
          <div class="elig-item ${c.pass===true?'pass':c.pass===false?'fail':'pend'}">
            <span class="elig-icon">${c.pass===true?'✅':c.pass===false?'❌':'⏳'}</span>
            <div class="elig-text"><strong>${esc(c.label)}</strong><span>${esc(c.note||'')}</span></div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
  <div class="card-grid g3 anim d3">
    <div class="card" style="cursor:pointer;text-align:center;padding:1rem" onclick="toggleChat()">
      <div style="font-size:1.75rem;margin-bottom:.4rem">💬</div>
      <div style="font-weight:700;font-size:.84rem">Get help</div>
      <div style="font-size:.72rem;color:var(--text-muted)">FAQs & SahayBot chat</div>
    </div>
    <div class="card" style="cursor:pointer;text-align:center;padding:1rem" onclick="APP.sideTab='notifications';render()">
      <div style="font-size:1.75rem;margin-bottom:.4rem">📲</div>
      <div style="font-weight:700;font-size:.84rem">SMS & WhatsApp alerts</div>
      <div style="font-size:.72rem;color:var(--text-muted)">Stay updated on your application</div>
    </div>
    <div class="card" style="cursor:pointer;text-align:center;padding:1rem">
      <div style="font-size:1.75rem;margin-bottom:.4rem">🔊</div>
      <div style="font-weight:700;font-size:.84rem">Voice guide</div>
      <div style="font-size:.72rem;color:var(--text-muted)">Step-by-step in your language</div>
    </div>
  </div>`;
}

function renderMyApps(apps) {
  return `
  <div class="page-hd page-hd-row">
    <div><h1>My Applications</h1></div>
    <button class="btn btn-navy btn-sm" onclick="nav('apply',{scheme:'NFST'})">+ New Application</button>
  </div>
  ${apps.map(app=>{
    const sc=SCHEMES.find(s=>s.id===app.scheme);
    return `
    <div class="card anim" style="margin-bottom:.875rem;cursor:pointer" onclick="nav('app-detail',{appId:'${app.id}'})">
      <div class="card-header">
        <div><div style="font-size:.68rem;color:var(--text-muted)">${app.id}</div><div class="card-title">${sc?.icon} ${esc(sc?.name)}</div></div>
        <span class="badge badge-${app.status}">${app.status}</span>
      </div>
      <div class="timeline">
        ${['Submitted','Auto-check','Scrutiny','Selection','Sanction'].map((n,i)=>`
          <div class="tl-step ${i+1<app.stage?'done':i+1===app.stage?'active':'pending'}">
            <div class="tl-dot">${i+1<app.stage?'✓':i+1===app.stage?i+1:''}</div>
            <div class="tl-name">${n}</div>
          </div>
        `).join('')}
      </div>
      ${app.deficiency?.active?`<div class="alert alert-warn" style="margin-top:.75rem"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>Deficiency:</strong> ${esc(app.deficiency.reason)}</div><div class="alert-action"><button class="btn btn-orange btn-xs" onclick="event.stopPropagation();APP.sideTab='documents';render()">Fix now</button></div></div>`:''}
      <div style="font-size:.72rem;color:var(--text-muted);margin-top:.625rem">Submitted: ${app.submitted}${app.score?` · Score: ${app.score}`:''}</div>
    </div>`;
  }).join('')}
  <div class="card" style="text-align:center;border-style:dashed;cursor:pointer;padding:2rem" onclick="nav('apply',{scheme:'NOS'})">
    <div style="font-size:1.75rem">+</div>
    <div style="font-weight:700">Apply to another scheme</div>
    <div style="font-size:.8rem;color:var(--text-muted)">Check eligibility and apply for NFST, NOS, TCE and more</div>
  </div>`;
}

function renderDocWallet() {
  const docs = [
    {name:'ST Certificate',type:'Category',ico:'📜',status:'ok',src:'DigiLocker',ocr:88,hash:'a3f8...e9',valid:'31 Dec 2027'},
    {name:"Master's Marksheet",type:'Education',ico:'🎓',status:'ok',src:'DigiLocker',ocr:94,hash:'b7e4...f2',valid:'Lifetime'},
    {name:'PhD Admission Letter',type:'Education',ico:'📄',status:'ok',src:'Upload',ocr:91,hash:'c9f2...a1',valid:'Course duration'},
    {name:'Income Certificate',type:'Financial',ico:'💳',status:'warn',src:'Upload',ocr:72,hash:'d1a6...b8',valid:'31 Mar 2027'},
    {name:'Bank Passbook',type:'Financial',ico:'🏦',status:'pend',src:'Upload',ocr:null,hash:null,valid:null}
  ];
  return `
  <div class="page-hd"><h1>Document Wallet</h1><p>Upload once — reuse across all scheme applications</p></div>
  <div class="alert alert-warn anim"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>ST Certificate needs attention.</strong> Please re-upload a clearer scan. Deadline: 12 Oct 2026.</div><div class="alert-action"><button class="btn btn-orange btn-sm" onclick="simulateOCR()">Re-upload →</button></div></div>
  <div class="card-grid g2 anim">
    ${docs.map(d=>`
      <div class="card" style="cursor:pointer">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem">
          <span style="font-size:1.5rem">${d.ico}</span>
          <div style="flex:1"><div style="font-weight:700;font-size:.88rem">${esc(d.name)}</div><div style="font-size:.7rem;color:var(--text-muted)">${d.type} · ${d.src}</div></div>
          <span class="badge ${d.status==='ok'?'badge-selected':d.status==='warn'?'badge-deficient':'badge-draft'}">${d.status==='ok'?'Verified':d.status==='warn'?'Unclear':'Pending'}</span>
        </div>
        ${d.hash?`<div style="font-family:monospace;font-size:.66rem;color:var(--text-muted);background:var(--bg);padding:3px 7px;border-radius:3px;margin-bottom:.6rem">SHA-256: ${d.hash}</div>`:''}
        ${d.ocr!==null?`
          <div style="margin-bottom:.625rem">
            <div style="font-size:.68rem;color:var(--text-muted);margin-bottom:3px">OCR Confidence</div>
            <div class="prog-bar"><div class="prog-fill ${d.ocr>=85?'high':d.ocr>=60?'med':'low'}" style="width:${d.ocr}%;background:${d.ocr>=85?'var(--green)':d.ocr>=60?'var(--amber)':'var(--red)'}"></div></div>
            <div style="font-size:.68rem;font-weight:800;color:${d.ocr>=85?'var(--green)':d.ocr>=60?'var(--amber)':'var(--red)'}">  ${d.ocr}%</div>
          </div>
        `:''}
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-outline btn-sm" style="flex:1" onclick="event.stopPropagation()">View</button>
          <button class="btn btn-navy btn-sm" style="flex:1" onclick="event.stopPropagation();simulateOCR()">Re-upload</button>
        </div>
      </div>
    `).join('')}
    <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border-style:dashed;cursor:pointer;min-height:180px" onclick="simulateOCR()">
      <div style="font-size:2rem;margin-bottom:.5rem">📎</div>
      <div style="font-weight:700;font-size:.88rem">Upload new document</div>
      <div style="font-size:.72rem;color:var(--text-muted);margin:4px 0">PDF, JPG, PNG · Max 5MB</div>
      <button class="btn btn-navy btn-sm" style="margin-top:.75rem">+ Upload</button>
    </div>
  </div>
  <div id="ocr-area"></div>`;
}

function renderTrackStatus() {
  return `
  <div class="page-hd"><h1>Track Application Status</h1></div>
  <div class="card anim" style="max-width:460px;margin-bottom:1.5rem">
    <div class="form-group" style="margin-bottom:.75rem">
      <label class="form-label">Application ID or Mobile Number</label>
      <input class="form-input" id="track-id" placeholder="e.g. NFST-2026-04817" value="NFST-2026-04817">
    </div>
    <button class="btn btn-navy" onclick="$('track-results').scrollIntoView({behavior:'smooth'})">Track</button>
  </div>
  <div id="track-results">
    ${DEMO_APPS.map(app=>{
      const sc=SCHEMES.find(s=>s.id===app.scheme);
      return `
      <div class="card anim" style="margin-bottom:.875rem">
        <div class="card-header"><div><div style="font-size:.68rem;color:var(--text-muted)">${app.id}</div><div class="card-title">${sc?.icon} ${esc(sc?.name)}</div></div><span class="badge badge-${app.status}">${app.status}</span></div>
        <div class="timeline">${['Submitted','Auto-check','Scrutiny','Selection','Sanction'].map((n,i)=>`<div class="tl-step ${i+1<app.stage?'done':i+1===app.stage?'active':'pending'}"><div class="tl-dot">${i+1<app.stage?'✓':i+1===app.stage?i+1:''}</div><div class="tl-name">${n}</div><div class="tl-date">${i===0?app.submitted:''}</div></div>`).join('')}</div>
        ${app.deficiency?.active?`<div class="alert alert-warn" style="margin-top:.75rem"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>Action needed by ${app.deficiency.deadline}:</strong> ${esc(app.deficiency.reason)}</div></div>`:''}
      </div>`;
    }).join('')}
  </div>`;
}

function renderNotifs() {
  const notifs = [
    {title:'Deficiency raised — NFST-2026-04817',desc:'Your ST Certificate scan is unclear. Re-upload by 12 Oct 2026.',time:'2 hours ago',unread:true},
    {title:'Application successfully submitted',desc:'NFST-2026-04817 submitted. Auto-screening has begun.',time:'15 Sep 2026',unread:true},
    {title:"Document auto-verified: Master's Marksheet",desc:'OCR confidence 94%. DigiLocker document verified.',time:'14 Sep 2026',unread:true},
    {title:'Application auto-screened',desc:'3 of 4 checks passed. One item pending officer review.',time:'14 Sep 2026',unread:false},
    {title:'Registration confirmed',desc:'Welcome to the Tribal Scholarship & Fellowship Portal.',time:'12 Sep 2026',unread:false}
  ];
  return `
  <div class="page-hd page-hd-row"><div><h1>Notifications</h1></div><button class="btn btn-ghost btn-sm">Mark all read</button></div>
  <div class="card anim" style="padding:0">
    <div class="notif-list">
      ${notifs.map(n=>`
        <div class="notif-row ${n.unread?'unread':''}">
          ${n.unread?`<div class="notif-unread-dot"></div>`:'<div style="width:7px"></div>'}
          <div class="notif-body"><div class="notif-title">${n.title}</div><div class="notif-desc">${n.desc}</div><div class="notif-time">${n.time}</div></div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ─── APPLICATION FORM ────────────────────────────────────────────────────────
function renderApply() {
  if(!APP.user){nav('login');return'';}
  const sc = SCHEMES.find(s=>s.id===APP.scheme)||SCHEMES[0];
  const step = APP.formStep||0;
  const steps = ['Personal Info','Education','Bank Details','Documents','Review & Submit'];
  return `
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span><a onclick="nav('scheme',{scheme:'${sc.id}'})">${esc(sc.name)}</a><span class="bc-sep">›</span>Apply</div>
  <main id="main-content" style="max-width:780px;margin:0 auto;padding:1.5rem">
    <div class="page-hd page-hd-row"><div><h1>${sc.icon} Apply — ${esc(sc.name)}</h1><div class="demo-tag">⚠️ Demo — form will not actually submit</div></div></div>
    <div class="form-steps anim">
      ${steps.map((s,i)=>`<div class="form-step ${i===step?'active':i<step?'done':''}"><div class="form-step-num">${i<step?'✓':i+1}</div>${s}</div>`).join('')}
    </div>
    <div class="card anim">
      ${step===0?renderFormPersonal():''}${step===1?renderFormEdu():''}
      ${step===2?renderFormBank():''}${step===3?renderFormDocs(sc):''}${step===4?renderFormReview():''}
      <div style="display:flex;gap:.75rem;margin-top:1.5rem;padding-top:1.25rem;border-top:1.5px solid var(--border)">
        <button class="btn btn-ghost btn-sm" onclick="toast('💾 Draft saved.')">💾 Save Draft</button>
        <div style="flex:1"></div>
        ${step>0?`<button class="btn btn-outline" onclick="APP.formStep--;render()">← Previous</button>`:''}
        ${step<4?`<button class="btn btn-navy" onclick="APP.formStep++;render()">Next →</button>`:''}
        ${step===4?`<button class="btn btn-green" onclick="submitForm()">✅ Submit Application</button>`:''}
      </div>
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

function renderFormPersonal(){return`
  <div class="form-sec-title">Personal Information</div>
  <div class="alert alert-info"><span class="alert-icon">ℹ️</span><div class="alert-body">Profile data pre-filled — please verify and update if needed.</div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">First name <span class="req">*</span></label><input class="form-input" value="Adi"></div><div class="form-group"><label class="form-label">Last name <span class="req">*</span></label><input class="form-input" value="Kumar"></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">Date of birth <span class="req">*</span></label><input class="form-input" type="date" value="2000-04-15"></div><div class="form-group"><label class="form-label">Gender <span class="req">*</span></label><select class="form-select"><option selected>Male</option><option>Female</option><option>Transgender</option></select></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">Mobile <span class="req">*</span></label><input class="form-input" value="+91 98765 43210"></div><div class="form-group"><label class="form-label">Email</label><input class="form-input" value="adi@example.com"></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">ST Category <span class="req">*</span></label><input class="form-input" value="Munda" readonly style="background:var(--bg)"></div><div class="form-group"><label class="form-label">PVTG?</label><select class="form-select"><option>No</option><option>Yes</option></select></div></div>
  <div class="form-group"><label class="form-label">Aadhaar (last 4 digits only stored) <span class="req">*</span></label><input class="form-input" value="●●●●-●●●●-4321" readonly style="background:var(--bg);font-family:monospace"><div class="form-hint">🔒 Aadhaar never stored in full per DPDP Act 2023 — only a masked token is kept.</div></div>`;}

function renderFormEdu(){return`
  <div class="form-sec-title">Education Details</div>
  <div class="form-row"><div class="form-group"><label class="form-label">UG University <span class="req">*</span></label><input class="form-input" value="Delhi University"></div><div class="form-group"><label class="form-label">UG % / CGPA <span class="req">*</span></label><input class="form-input" value="72%"></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">PG University <span class="req">*</span></label><input class="form-input" value="JNU, New Delhi"></div><div class="form-group"><label class="form-label">PG % / CGPA <span class="req">*</span></label><input class="form-input" value="68%"></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">Course <span class="req">*</span></label><input class="form-input" value="PhD in Tribal Studies"></div><div class="form-group"><label class="form-label">Year of enrollment <span class="req">*</span></label><input class="form-input" type="number" value="2025"></div></div>
  <div class="form-group"><label class="form-label">Research Institute / University <span class="req">*</span></label><input class="form-input" value="Indian Institute of Advanced Study, Shimla"></div>
  <div class="form-group"><label class="form-label">Annual family income <span class="req">*</span></label><input class="form-input" type="number" value="320000"><div class="form-hint">As per income certificate. <span class="demo-tag">Income limit: ₹6L [DEMO]</span></div></div>`;}

function renderFormBank(){return`
  <div class="form-sec-title">Bank Account Details</div>
  <div class="alert alert-info"><span class="alert-icon">🏦</span><div class="alert-body">Payment will be made directly to this account via DBT/PFMS. Ensure details are accurate.</div></div>
  <div class="form-group"><label class="form-label">Account holder name <span class="req">*</span></label><input class="form-input" value="Adi Kumar"></div>
  <div class="form-row"><div class="form-group"><label class="form-label">Account number <span class="req">*</span></label><input class="form-input" type="password" value="XXXXXXXXXX4521"></div><div class="form-group"><label class="form-label">Confirm account number <span class="req">*</span></label><input class="form-input" type="password"></div></div>
  <div class="form-row"><div class="form-group"><label class="form-label">IFSC code <span class="req">*</span></label><input class="form-input" value="SBIN0001234"></div><div class="form-group"><label class="form-label">Bank name <span class="req">*</span></label><input class="form-input" value="State Bank of India" readonly style="background:var(--bg)"></div></div>
  <div class="form-group"><label style="display:flex;align-items:flex-start;gap:.5rem;font-size:.8rem;cursor:pointer"><input type="checkbox" checked style="margin-top:3px">I confirm this is my own bank account. Providing false bank details is a criminal offence.</label></div>`;}

function renderFormDocs(sc){return`
  <div class="form-sec-title">Upload Documents</div>
  <div class="alert alert-info"><span class="alert-icon">🤖</span><div class="alert-body">AI will automatically verify documents after upload — checking quality, classification and extracted fields. Officer reviews all flagged documents.</div></div>
  ${sc.documents.map((d,i)=>`
    <div class="card" style="background:var(--bg);margin-bottom:.625rem">
      <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem">
        <span style="font-weight:700;font-size:.86rem">${i+1}. ${esc(d)}</span>
        <span class="badge badge-submitted">Required</span>
        ${d.includes('Aadhaar')?`<span style="font-size:.7rem;color:var(--text-muted)">(Last 4 digits only)</span>`:''}
      </div>
      ${i<2?`<div style="display:flex;align-items:center;gap:.5rem;background:#fff;padding:7px 10px;border-radius:5px;border:1.5px solid var(--green)">
        <span style="color:var(--green)">✓</span><span style="font-size:.82rem;font-weight:600">Fetched via DigiLocker</span><span class="badge badge-selected" style="margin-left:auto">Verified</span>
      </div>`:i===2?`<div style="display:flex;align-items:center;gap:.5rem;background:#fff8f5;padding:7px 10px;border-radius:5px;border:1.5px solid var(--red)">
        <span>⚠️</span><span style="font-size:.82rem;color:var(--red)">Unclear scan — re-upload required</span>
        <button class="btn btn-orange btn-xs" style="margin-left:auto" onclick="simulateOCR()">Re-upload</button>
      </div>`:`<div class="upload-zone" onclick="simulateOCR()">
        <div class="upload-zone-icon">📁</div>
        <div class="upload-zone-title">Click or drag &amp; drop to upload</div>
        <div class="upload-zone-hint">PDF, JPG, PNG · Max 5MB · File will be hashed (SHA-256)</div>
      </div>`}
    </div>
  `).join('')}
  <div id="ocr-area"></div>`;}

function renderFormReview(){return`
  <div class="form-sec-title">Review &amp; Submit</div>
  <div class="card-grid g2" style="margin-bottom:1rem">
    <div class="card" style="background:var(--bg)">
      <div style="font-size:.7rem;font-weight:800;color:var(--text-muted);text-transform:uppercase;margin-bottom:.75rem">Personal</div>
      ${[['Name','Adi Kumar'],['DoB','15 Apr 2000'],['Category','ST — Munda'],['Mobile','+91 98765 43210']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:4px 0;border-bottom:1px solid var(--border-light)"><span style="color:var(--text-muted)">${k}</span><strong>${v}</strong></div>`).join('')}
    </div>
    <div class="card" style="background:var(--bg)">
      <div style="font-size:.7rem;font-weight:800;color:var(--text-muted);text-transform:uppercase;margin-bottom:.75rem">Education</div>
      ${[['PG Marks','68%'],['Institute','IIAS Shimla'],['Course','PhD Tribal Studies'],['Income','₹3,20,000']].map(([k,v])=>`<div style="display:flex;justify-content:space-between;font-size:.82rem;padding:4px 0;border-bottom:1px solid var(--border-light)"><span style="color:var(--text-muted)">${k}</span><strong>${v}</strong></div>`).join('')}
    </div>
  </div>
  ${renderReadinessGate('NFST')}
  ${renderConflictChecker()}
  <div class="alert alert-warn"><span class="alert-icon">⚠️</span><div class="alert-body">By submitting I declare all information is true and correct. False information may lead to disqualification and legal action.</div></div>`;}


function submitForm(){toast('✅ Application submitted!\nApplication ID: NFST-2026-'+Math.floor(10000+Math.random()*90000));setTimeout(()=>nav('dashboard'),2000);}

// ─── OCR SIMULATION ──────────────────────────────────────────────────────────
function simulateOCR() {
  const area = $('ocr-area'); if(!area) return;
  area.innerHTML = `
  <div class="card anim" style="margin-top:1rem">
    <div style="font-weight:800;font-size:.9rem;margin-bottom:.75rem">🤖 AI Document Processing — Tesseract/PaddleOCR + OpenCV</div>
    <div id="ocr-steps"></div>
    <div id="ocr-final" style="display:none"></div>
  </div>`;
  const steps = [
    '✅ File uploaded — SHA-256: e8d3b2a1f0c4d7...',
    '✅ Image quality check: Blur 94/100 · Contrast 87/100 — Acceptable',
    '✅ Document classified: ST Certificate (confidence: 91%)',
    '✅ OCR extraction complete — 88% overall confidence',
    '✅ Cross-check: Name match ✓ · Category match ✓ · Income cross-reference ⚠ pending'
  ];
  let i=0;
  const stepsEl = $('ocr-steps');
  const run = setInterval(()=>{
    if(i<steps.length){
      stepsEl.innerHTML += `<div class="flag ok">${steps[i]}</div>`;
      i++;
    } else {
      clearInterval(run);
      $('ocr-final').innerHTML = `
        <div class="ocr-result">
          <div class="ocr-header"><h4>Extracted Fields (OCR)</h4><div><div class="conf-bar" style="width:120px"><div class="conf-fill high" style="width:88%"></div></div><div class="conf-pct" style="color:var(--green)">88% confidence</div></div></div>
          <div class="ocr-fields">
            ${[['Name','Adi Kumar'],['Category','Munda (ST)'],['Cert. No.','ST/JH/2023/4521'],['Issue Date','15 Mar 2023'],['Authority','SDO, Ranchi'],['Valid Till','31 Dec 2027']].map(([l,v])=>`<div class="ocr-f"><div class="ocr-f-label">${l}</div><div class="ocr-f-val">${v}</div></div>`).join('')}
          </div>
        </div>
        <div class="alert alert-success" style="margin-top:.75rem"><span class="alert-icon">✅</span><div class="alert-body"><strong>Document verified.</strong> ST Certificate accepted. Hash stored. DigiLocker provenance recorded.</div></div>`;
      $('ocr-final').style.display='block';
    }
  }, 750);
  area.scrollIntoView({behavior:'smooth'});
}

// ─── OFFICER DASHBOARD ───────────────────────────────────────────────────────
function renderOfficerDash() {
  const tab = APP.sideTab;
  const sb = `
    <div class="sb-section">
      <div class="sb-section-title">Officer Console</div>
      <button class="sb-item ${tab==='queue'?'active':''}" onclick="APP.sideTab='queue';render()"><span class="sb-ico">📋</span>Exception Queue<span class="sb-badge">${OFFICER_QUEUE.filter(x=>x.risk==='high').length}</span></button>
      <button class="sb-item ${tab==='review'?'active':''}" onclick="APP.sideTab='review';APP.officerAppId=OFFICER_QUEUE[0].id;render()"><span class="sb-ico">🔍</span>Review Workspace</button>
      <button class="sb-item ${tab==='merit'?'active':''}" onclick="APP.sideTab='merit';render()"><span class="sb-ico">🏆</span>Merit & Selection</button>
      <button class="sb-item ${tab==='audit'?'active':''}" onclick="APP.sideTab='audit';render()"><span class="sb-ico">📜</span>Audit Log</button>
    </div>
    <div class="sb-divider"></div>
    <div class="sb-section">
      <div class="sb-section-title">Admin View</div>
      <button class="sb-item" onclick="APP.user.role='admin';APP.sideTab='exec';nav('dashboard')"><span class="sb-ico">📊</span>Executive Dashboard</button>
      <button class="sb-item" onclick="nav('grievance')"><span class="sb-ico">🤝</span>Grievances</button>
    </div>`;
  const main = tab==='queue'?renderOfficerQueue():
               tab==='review'?renderReviewWorkspace():
               tab==='merit'?renderMeritList():
               tab==='audit'?renderAuditLog():renderOfficerQueue();
  return dashLayout(sb, main);
}

function renderOfficerQueue() {
  const riskBadge = r => r==='high'?'badge-rejected':r==='med'?'badge-deficient':'badge-selected';
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div><h1>Exception Queue</h1><p>AI-flagged applications requiring human review · <span class="demo-tag">AI ADVISES — OFFICER DECIDES</span></p></div>
    </div>
  </div>
  <div class="filter-bar anim">
    <div class="search-wrap"><span class="search-ico">🔍</span><input class="search-inp" placeholder="Search applicant, ID, scheme…"></div>
    <button class="filter-chip active">All <span class="chip-count">${OFFICER_QUEUE.length}</span></button>
    <button class="filter-chip">🔴 High <span class="chip-count">${OFFICER_QUEUE.filter(x=>x.risk==='high').length}</span></button>
    <button class="filter-chip">🟡 Med <span class="chip-count">${OFFICER_QUEUE.filter(x=>x.risk==='med').length}</span></button>
    <button class="filter-chip">🟢 Low <span class="chip-count">${OFFICER_QUEUE.filter(x=>x.risk==='low').length}</span></button>
  </div>
  <div class="card anim" style="padding:0">
    <div class="tbl-wrap">
      <table class="data-tbl">
        <thead><tr><th>App ID</th><th>Applicant</th><th>Scheme</th><th>Risk</th><th>AI Confidence</th><th>SLA Age</th><th>Stage</th><th>Action</th></tr></thead>
        <tbody>
          ${OFFICER_QUEUE.map(q=>`
            <tr>
              <td style="font-family:monospace;font-weight:700;font-size:.78rem">${q.id}</td>
              <td style="font-weight:600">${esc(q.applicant)}</td>
              <td><span class="badge badge-submitted">${q.scheme}</span></td>
              <td>
                <span class="badge ${riskBadge(q.risk)}">${q.risk==='high'?'🔴':q.risk==='med'?'🟡':'🟢'} ${q.risk}</span>
                ${q.flags.length?`<div style="font-size:.68rem;color:var(--text-muted);margin-top:2px">${esc(q.flags[0].substring(0,55))}…</div>`:''}
              </td>
              <td>
                <div style="font-weight:900;color:${q.confidence>=85?'var(--green)':q.confidence>=60?'var(--amber)':'var(--red)'}">${q.confidence}%</div>
                <div class="prog-bar" style="width:70px;margin-top:3px"><div class="prog-fill ${q.confidence>=85?'high':q.confidence>=60?'med':'low'}" style="width:${q.confidence}%;background:${q.confidence>=85?'var(--green)':q.confidence>=60?'var(--amber)':'var(--red)'}"></div></div>
              </td>
              <td style="font-weight:700;color:${q.sla>5?'var(--red)':q.sla>3?'var(--amber)':'var(--green)'}">${q.sla} days</td>
              <td><span class="badge ${q.stage==='Exception'?'badge-rejected':q.stage==='Scrutiny'?'badge-scrutiny':'badge-selected'}">${q.stage}</span></td>
              <td><button class="btn btn-navy btn-xs" onclick="APP.sideTab='review';APP.officerAppId='${q.id}';render()">Review</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

function renderReviewWorkspace() {
  const qid = APP.officerAppId||OFFICER_QUEUE[0].id;
  const qi = OFFICER_QUEUE.find(x=>x.id===qid)||OFFICER_QUEUE[0];
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div style="display:flex;align-items:center;gap:.75rem">
        <button class="btn btn-outline btn-sm" onclick="APP.sideTab='queue';render()">← Back</button>
        <div><h1>Evidence Review Workspace</h1><p>${qid} · ${esc(qi.applicant)} · <span class="demo-tag">AI ADVISES — OFFICER DECIDES</span></p></div>
      </div>
    </div>
  </div>
  ${qi.flags.length?`<div class="alert alert-danger anim"><span class="alert-icon">🚨</span><div class="alert-body"><strong>AI-generated flags:</strong><ul style="margin-top:6px;padding-left:1.25rem">${qi.flags.map(f=>`<li style="font-size:.8rem">${esc(f)}</li>`).join('')}</ul><p style="font-size:.7rem;margin-top:6px;opacity:.7">ⓘ These are AI flags — all decisions rest with the reviewing officer.</p></div></div>`:''}
  <div class="review-grid">
    <div>
      <div style="font-weight:800;font-size:.86rem;margin-bottom:.75rem">📄 Document Viewer — ST Certificate</div>
      <div class="doc-viewer">
        <div class="dv-toolbar"><span>ST_Certificate_${esc(qi.applicant).replace(' ','_')}.pdf</span><button class="btn btn-ghost btn-xs" style="color:rgba(255,255,255,.5)">🔍 Zoom</button></div>
        <div class="dv-body">
          <div class="doc-sheet">
            <div class="ds-header">Government of [State] — Scheduled Tribe Certificate</div>
            <div class="ds-line w80"></div><div class="ds-line w60"></div>
            <hr style="border:none;border-top:1px solid #ddd;margin:.5rem 0">
            <div style="font-size:.58rem;color:#888">This is to certify that</div>
            <div class="ds-line w90" style="background:#b8d4f0;height:10px"></div>
            <div style="font-size:.58rem;color:#888;margin:.25rem 0">belongs to the Munda tribe, a Scheduled Tribe listed in the Constitution</div>
            <div class="ds-line w80"></div><div class="ds-line w60"></div>
            <div style="margin-top:.75rem;display:flex;justify-content:space-between;font-size:.56rem;color:#888">
              <span>Date: 15 Mar 2023</span><span>Cert No: ST/JH/2023/4521</span>
            </div>
            <div class="ds-highlight" style="top:22%;left:5%;width:90%;height:28%;border:2px solid var(--orange);background:rgba(232,93,4,.08);position:absolute;border-radius:3px"></div>
          </div>
        </div>
        <div class="dv-warn">⚠️ OCR Confidence: 42% — Highlighted region is unclear</div>
      </div>
    </div>
    <div>
      <div style="font-weight:800;font-size:.86rem;margin-bottom:.75rem">🔍 Extracted Values &amp; Cross-Checks</div>
      <div class="card" style="margin-bottom:.75rem">
        <div class="ocr-header">
          <h4>OCR Extraction (Tesseract + PaddleOCR)</h4>
          <div><div class="conf-bar" style="width:100px"><div class="conf-fill low" style="width:42%"></div></div><div class="conf-pct" style="color:var(--red)">42% confidence</div></div>
        </div>
        <div class="ocr-fields">
          ${[['Applicant Name','Adi Kumar',false],['Tribe / Category','Munda (ST)',false],['Certificate No.','ST/JH/2023/4521',false],['Issuing Authority','SDO, Ranchi',false]].map(([l,v,bad])=>`<div class="ocr-f ${bad?'bad':''}"><div class="ocr-f-label">${l}</div><div class="ocr-f-val">${v}</div></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div style="font-weight:800;font-size:.82rem;margin-bottom:.75rem">Cross-Checks</div>
        <div class="review-fields">
          ${[['Name (form)','Adi Kumar','ok'],['Name (doc)','Adi Kumar','ok'],['Declared income','₹3,20,000','warn'],['Income (cert)','₹4,50,000 — Mismatch [DEMO]','bad'],['ST Category','Munda — Valid','ok'],['Cert. validity','Valid till 2027','ok']].map(([l,v,s])=>`
            <div class="rf-row">
              <span class="rf-label">${l}</span>
              <span class="rf-val ${s==='bad'?'bad':''}">${v}</span>
              <span class="rf-flag ${s}">${s==='ok'?'✓ Match':s==='bad'?'✗ Mismatch':'⚠ Review'}</span>
            </div>
          `).join('')}
        </div>
        <div class="flag warn" style="margin-top:.75rem">⚠️ <strong>Income mismatch [DEMO values]:</strong> declared ₹3.2L, certificate shows ₹4.5L. Exceeds NFST limit — verify source.</div>
        <div class="flag warn">⚠️ <strong>Low OCR confidence (42%):</strong> Scan quality below threshold. Recommend requesting re-upload.</div>
        <div style="margin-top:.875rem">${renderPhoneticMatch('Adi Kumar','Adhi Kumar')}</div>
        <div style="margin-top:.5rem">${renderQRCheck('ST Certificate')}</div>
      </div>
    </div>
    <div>
      <div class="card action-panel">
        <div class="ap-title">Rule Results</div>
        <div style="margin-bottom:.875rem">
          ${[['ST Category','pass','Munda — in GOI ST list'],['PG Marks ≥ 55%','pass','68% → passes'],['Age ≤ 35 [DEMO]','pass','26 years'],['Income ≤ ₹6L [DEMO]','warn','Mismatch — verify'],['Doc Quality','fail','OCR 42% — unclear']].map(([n,r,e])=>`
            <div class="rule-row"><div class="rule-dot ${r}"></div><span class="rule-name">${n}</span><span class="rule-ev">${e}</span></div>
          `).join('')}
        </div>
        <div style="font-weight:800;font-size:.82rem;margin-bottom:.625rem;padding-top:.75rem;border-top:1.5px solid var(--border)">Officer Decision</div>
        <div class="form-group">
          <label class="form-label">Remarks <span class="req">*</span></label>
          <textarea class="form-textarea" id="officer-remarks" style="min-height:90px" placeholder="Enter your observations and reasoning…">Income certificate mismatch needs clarification. Requesting re-upload of clearer ST cert.</textarea>
        </div>
        <div style="display:flex;flex-direction:column;gap:.5rem">
          <button class="btn btn-navy" style="justify-content:center" onclick="officerAction('approve')">✓ Approve &amp; Forward</button>
          <button class="btn btn-orange" style="justify-content:center" onclick="officerAction('deficiency')">⚠ Raise Deficiency</button>
          <button class="btn btn-red" style="justify-content:center" onclick="officerAction('reject')">✗ Mark Ineligible</button>
        </div>
        <p style="font-size:.66rem;color:var(--text-muted);margin-top:.75rem">⚠️ All decisions logged with officer ID, timestamp, and remarks. Overrides require written justification.</p>
      </div>
    </div>
  </div>`;
}

function officerAction(action) {
  if(!$('officer-remarks')?.value.trim()){toast('⚠️ Officer remarks are mandatory for all decisions.');return;}
  const msgs = {approve:'✅ Application approved and forwarded.',deficiency:'⚠️ Deficiency raised. Applicant notified.',reject:'❌ Application marked ineligible. Logged in audit trail.'};
  toast(msgs[action]);
  setTimeout(()=>{APP.sideTab='queue';render();},1500);
}

function renderMeritList(){
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div><h1>Merit List — NFST 2026–27</h1><span class="demo-tag">DEMO DATA</span></div>
      <div style="display:flex;gap:.625rem">
        <button class="btn btn-outline btn-sm">📊 Download CSV</button>
        <button class="btn btn-navy btn-sm" onclick="toast('📢 Merit list published. Applicants notified via SMS & email.')">Publish</button>
      </div>
    </div>
  </div>
  <div class="card anim" style="padding:0">
    ${MERIT_LIST.map(m=>`
      <div class="merit-row">
        <div class="merit-rank ${m.rank<=3?'top':''}">${m.rank<=3?['🥇','🥈','🥉'][m.rank-1]:m.rank}</div>
        <div class="merit-info">
          <div class="merit-name">${esc(m.name)}</div>
          <div class="merit-meta">${esc(m.state)} · ${esc(m.institute)}</div>
          <div style="font-size:.68rem;color:var(--text-muted)">Academic: ${m.acad} | Interview: ${m.interview} | Preference: ${m.pref}</div>
        </div>
        <div class="merit-bar-wrap">
          <div class="merit-score-lbl">${m.score}</div>
          <div class="merit-bar"><div class="merit-bar-fill" style="width:${m.score}%"></div></div>
        </div>
        ${m.quota!=='General'?`<span class="merit-quota">${m.quota}</span>`:''}
        <span class="badge ${m.status==='selected'?'badge-selected':'badge-waitlisted'}">${m.status}</span>
        <div style="display:flex;gap:.4rem">
          <button class="btn btn-outline btn-xs" onclick="toast('Score breakdown: Academic ${m.acad} + Interview ${m.interview} + Preference ${m.pref} = ${m.score}')">View</button>
          <button class="btn btn-ghost btn-xs" onclick="toast('⚠️ Override requires written justification — stored in audit log.')">Override</button>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function renderAuditLog(){
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div><h1>Audit &amp; Decision Record</h1></div>
      <div style="display:flex;gap:.625rem">
        <button class="btn btn-outline btn-sm">📊 Export</button>
        <button class="btn btn-navy btn-sm" onclick="toast('🔐 Audit chain verified — all 5 entries intact. No tampering detected.')">🔐 Verify Chain</button>
      </div>
    </div>
  </div>
  <div class="alert alert-info anim"><span class="alert-icon">🔐</span><div class="alert-body">Hash-chained audit log — every entry links to the previous. Tamper detection is available via Verify Chain button.</div></div>
  <div class="card anim" style="padding:0">
    <div class="audit-list">
      ${AUDIT_LOG.map(e=>`
        <div class="audit-row">
          <div class="audit-dot ${e.role}"></div>
          <div style="flex:1">
            <div><span class="audit-actor">${esc(e.actor)}</span> — <span class="audit-action">${esc(e.action)}</span></div>
            <div class="audit-time">${e.time}</div>
            <div class="audit-hash">SHA-256: ${e.hash}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ─── ADMIN DASHBOARD ─────────────────────────────────────────────────────────
function renderAdminDash() {
  const tab = APP.sideTab;
  const sb = `
    <div class="sb-section">
      <div class="sb-section-title">Admin Console</div>
      <button class="sb-item ${tab==='exec'?'active':''}" onclick="APP.sideTab='exec';render()"><span class="sb-ico">📊</span>Executive Dashboard</button>
      <button class="sb-item ${tab==='scheme-config'?'active':''}" onclick="APP.sideTab='scheme-config';render()"><span class="sb-ico">⚙️</span>Scheme Config Studio</button>
      <button class="sb-item ${tab==='impact'?'active':''}" onclick="APP.sideTab='impact';render()"><span class="sb-ico">🔬</span>Policy Impact Simulator</button>
      <button class="sb-item ${tab==='audit'?'active':''}" onclick="APP.sideTab='audit';render()"><span class="sb-ico">📜</span>Audit &amp; Security</button>
      <button class="sb-item ${tab==='integration'?'active':''}" onclick="APP.sideTab='integration';render()"><span class="sb-ico">🔌</span>Integration Tower</button>
      <button class="sb-item ${tab==='grv-intel'?'active':''}" onclick="APP.sideTab='grv-intel';render()"><span class="sb-ico">🤝</span>Grievance Intel</button>
      <button class="sb-item ${tab==='roles'?'active':''}" onclick="APP.sideTab='roles';render()"><span class="sb-ico">👥</span>Roles &amp; Users</button>
      <button class="sb-item ${tab==='coverage-gap'?'active':''}" onclick="APP.sideTab='coverage-gap';render()"><span class="sb-ico">🗺️</span>Coverage Gap Intel</button>
      <button class="sb-item ${tab==='guideline-diff'?'active':''}" onclick="APP.sideTab='guideline-diff';render()"><span class="sb-ico">📋</span>Guideline Change Detector</button>
      <button class="sb-item ${tab==='dossier'?'active':''}" onclick="APP.sideTab='dossier';render()"><span class="sb-ico">📦</span>Audit Dossier Export</button>
    </div>`;
  const main = tab==='exec'?renderExecDash():tab==='scheme-config'?renderSchemeConfig():
               tab==='impact'?renderImpactSim():tab==='audit'?renderAuditLog():
               tab==='integration'?renderIntegration():tab==='grv-intel'?renderGrvIntel():
               tab==='roles'?renderRoles():tab==='coverage-gap'?renderCoverageGap():
               tab==='guideline-diff'?renderGuidelineDiff():tab==='dossier'?renderDossierExport():
               renderExecDash();
  return dashLayout(sb, main);
}

function renderExecDash(){
  return `
  <div class="page-hd">
    <div class="page-hd-row">
      <div><h1>Executive Dashboard</h1><span class="demo-tag">DEMO DATA</span></div>
      <div style="display:flex;gap:.625rem">
        <select class="form-select" style="width:auto;padding:6px 12px;font-size:.8rem"><option>All Schemes</option>${SCHEMES.map(s=>`<option>${s.short}</option>`).join('')}</select>
        <button class="btn btn-outline btn-sm">📊 Export PDF</button>
      </div>
    </div>
  </div>
  <div class="metric-row anim">
    ${[['3,48,721','Total Applications','#1b3a6b','↑ 12% vs 2024-25','up'],['83.6%','Auto-Verified Rate','#1c7c4a','↑ 6.2pp vs last year','up'],['6.2 days','Avg. Processing Time','#0d7a8a','↓ 3.1 days improvement','up'],['54,218','Awards Sanctioned','#e85d04','↑ 8% vs 2024-25','up'],['2,847','Active Deficiencies','#d4870a','↓ 22% vs last month','up'],['14','Override Reviews Pending','#c0392b','SLA: 3 days','dn']].map(([val,lbl,col,delta,dir])=>`
      <div class="metric-card" style="--mc-color:${col}"><div class="metric-val" style="color:${col}">${val}</div><div class="metric-label">${lbl}</div><div class="metric-delta ${dir==='up'?'delta-up':'delta-dn'}">${delta}</div></div>
    `).join('')}
  </div>
  <div class="card-grid g2 anim">
    <div class="chart-card"><h3>Application Funnel by Scheme</h3><canvas id="ch-funnel" height="220"></canvas></div>
    <div class="chart-card"><h3>Status Distribution</h3><canvas id="ch-status" height="220"></canvas></div>
    <div class="chart-card"><h3>State-wise Applications (Top 10)</h3><canvas id="ch-state" height="220"></canvas></div>
    <div class="chart-card"><h3>Equity View — Selected vs Applied (NFST) <span class="demo-tag">Demo</span></h3><canvas id="ch-equity" height="220"></canvas></div>
  </div>
  <script>
  (function(){
    if(typeof Chart==='undefined')return;
    const opts={responsive:true,plugins:{legend:{labels:{font:{size:11}}}}};
    const cc=id=>{const e=document.getElementById(id);return e?e.getContext('2d'):null;};
    const f=cc('ch-funnel');if(f&&!APP.charts.funnel){APP.charts.funnel=new Chart(f,{type:'bar',data:{labels:['Applied','Auto-verified','Scrutiny','Selected','Sanctioned'],datasets:[{label:'NFST',data:[45820,38200,12400,720,680],backgroundColor:'rgba(27,58,107,.8)'},{label:'NOS',data:[2840,2400,820,18,17],backgroundColor:'rgba(13,122,138,.8)'},{label:'TCE',data:[28400,24100,8200,980,960],backgroundColor:'rgba(94,53,177,.8)'}]},options:{...opts,scales:{x:{stacked:false},y:{stacked:false}}}});}
    const s=cc('ch-status');if(s&&!APP.charts.status){APP.charts.status=new Chart(s,{type:'doughnut',data:{labels:['Auto-Verified','Scrutiny','Deficient','Selected','Rejected','Pending'],datasets:[{data:[291403,24180,2847,54218,18420,57653],backgroundColor:['#1c7c4a','#e85d04','#d4870a','#1b3a6b','#c0392b','#9ca3af']}]},options:{...opts,plugins:{legend:{position:'right',labels:{font:{size:10}}}}}});}
    const st=cc('ch-state');if(st&&!APP.charts.state){APP.charts.state=new Chart(st,{type:'bar',data:{labels:['Jharkhand','MP','Odisha','Rajasthan','Chhattisgarh','Maharashtra','Gujarat','West Bengal','Andhra Pradesh','Assam'],datasets:[{label:'Applications',data:[68420,54210,48320,32100,28400,24500,18200,16800,14200,12600],backgroundColor:'rgba(27,58,107,.75)'}]},options:{...opts,indexAxis:'y',plugins:{legend:{display:false}}}});}
    const eq=cc('ch-equity');if(eq&&!APP.charts.equity){APP.charts.equity=new Chart(eq,{type:'bar',data:{labels:['Women','Men','PVTG','Divyang','Others'],datasets:[{label:'Applied %',data:[42,58,18,6,82],backgroundColor:'rgba(27,58,107,.3)'},{label:'Selected %',data:[48,52,22,8,78],backgroundColor:'rgba(27,58,107,.85)'}]},options:{...opts,scales:{y:{max:100,ticks:{callback:v=>v+'%'}}}}});}
  })();
  </script>`;
}

function renderSchemeConfig(){
  return `
  <div class="page-hd page-hd-row">
    <div><h1>Scheme Configuration Studio</h1><p>Eligibility rules, scoring models, and workflow — configured as data, not hard-code</p></div>
    <div style="display:flex;gap:.625rem">
      <button class="btn btn-outline btn-sm">📜 Version History</button>
      <button class="btn btn-orange btn-sm" onclick="toast('⚠️ Publishing requires maker-checker approval.')">Publish Changes</button>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:180px 1fr;gap:1rem">
    <div class="card" style="padding:0">
      <div style="padding:.75rem 1rem;font-size:.7rem;font-weight:800;color:var(--text-muted);border-bottom:1px solid var(--border)">SCHEME: NFST 2026 v3.1</div>
      ${['📋 Overview','📝 Form Fields','📁 Documents','📜 Eligibility Rules','🏆 Scoring Model','📊 Workflow Stages','🔬 Sandbox Test'].map((l,i)=>`
        <button class="sb-item ${i===3?'active':''}" onclick="qsa('.sb-item').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${l}</button>
      `).join('')}
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">📜 Eligibility Rules — NFST 2026</div>
        <div style="display:flex;gap:.5rem">
          <button class="btn btn-outline btn-sm" onclick="toast('🔬 Sandbox: running rules against 45,820 existing applications…')">🔬 Test in Sandbox</button>
          <button class="btn btn-navy btn-sm">+ Add Rule</button>
        </div>
      </div>
      <div class="alert alert-warn" style="margin-bottom:.875rem"><span class="alert-icon">⚠️</span><div class="alert-body">Rule values shown are demo placeholders. Source each rule from official guidelines with version number and date.</div></div>
      ${RULES.map(r=>`
        <div class="rule-card anim">
          <div class="rule-card-hd">
            <span class="rule-card-title">${esc(r.name)}</span>
            <span class="rule-type-tag ${r.type}">${r.type.toUpperCase()}</span>
            <div class="sev-tog"><button class="${r.type==='hard'?'hard':''}">Hard</button><button class="${r.type==='soft'?'soft':''}">Soft</button></div>
            <div class="tog-switch ${r.on?'on':''}" onclick="this.classList.toggle('on');toast('Rule toggled')"><div class="tog-thumb"></div></div>
          </div>
          <div style="display:flex;gap:1rem;font-size:.78rem;flex-wrap:wrap;color:var(--text-mid)">
            <span>Field: <code style="background:var(--bg);padding:1px 5px;border-radius:3px">${r.field}</code></span>
            <span>Op: <code style="background:var(--bg);padding:1px 5px;border-radius:3px">${r.op}</code></span>
            <span>Value: <code style="background:var(--bg);padding:1px 5px;border-radius:3px">${r.val}</code></span>
            <span style="color:var(--text-muted)">Source: ${esc(r.src)}</span>
          </div>
          <div style="display:flex;gap:.4rem;margin-top:.625rem">
            <button class="btn btn-outline btn-xs" onclick="toast('Rule editor opened')">✏️ Edit</button>
            <button class="btn btn-ghost btn-xs" onclick="toast('Rule duplicated')">📋 Duplicate</button>
            <button class="btn btn-ghost btn-xs" style="color:var(--red)" onclick="toast('⚠️ Deletion requires maker-checker approval.')">🗑️ Delete</button>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function renderImpactSim(){
  return `
  <div class="page-hd"><h1>Policy Impact Simulator</h1><p>Test rule changes against existing applications before publishing — powered by Pandas + NumPy</p></div>
  <div class="card anim" style="margin-bottom:1rem">
    <div class="card-title" style="margin-bottom:1rem">🔬 Proposed Rule Change</div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Scheme</label><select class="form-select">${SCHEMES.map(s=>`<option>${s.short}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">Rule</label><select class="form-select"><option>PG Marks Threshold</option><option>Age Limit</option><option>Income Cap</option></select></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Current value</label><input class="form-input" value="55%" readonly style="background:var(--bg)"></div>
      <div class="form-group"><label class="form-label">Proposed new value</label><input class="form-input" value="60%" id="sim-val"></div>
    </div>
    <button class="btn btn-navy" onclick="APP.simRan=true;render()">▶ Run Impact Simulation</button>
  </div>
  ${APP.simRan?`
    <div class="alert alert-warn anim" style="margin-bottom:1rem"><span class="alert-icon">⚠️</span><div class="alert-body">Simulation complete. Review equity impact carefully before publishing.</div></div>
    <div class="impact-diff anim">
      <div class="impact-panel">
        <h4>Before (55% threshold)</h4>
        ${[['Total eligible','38,420'],['Women eligible','16,241'],['PVTG eligible','6,914'],['Jharkhand','8,102'],['MP','6,432']].map(([k,v])=>`<div class="impact-stat-row"><span>${k}</span><strong>${v}</strong></div>`).join('')}
      </div>
      <div class="impact-panel">
        <h4>After (60% threshold)</h4>
        ${[['Total eligible','29,840','−8,580'],['Women eligible','11,940','−4,301'],['PVTG eligible','4,120','−2,794'],['Jharkhand','5,910','−2,192'],['MP','4,810','−1,622']].map(([k,v,d])=>`<div class="impact-stat-row"><span>${k}</span><div style="display:flex;align-items:center;gap:.5rem"><strong>${v}</strong>${d?`<span class="delta dn">${d}</span>`:''}</div></div>`).join('')}
      </div>
    </div>
    <div class="alert alert-danger anim"><span class="alert-icon">🚨</span><div class="alert-body"><strong>Equity Alert:</strong> This change reduces PVTG-eligible applications by 40.4%. Verify alignment with scheme objectives before publishing.</div></div>
    <div class="card anim" style="max-width:480px">
      <div class="form-group"><label class="form-label">Change justification (required for publishing)</label><textarea class="form-textarea" placeholder="Enter policy rationale for this rule change…"></textarea></div>
      <div style="display:flex;gap:.75rem"><button class="btn btn-navy" onclick="toast('Change submitted for maker-checker approval.')">Submit for Approval</button><button class="btn btn-ghost" onclick="APP.simRan=false;render()">Discard</button></div>
    </div>
  `:''}`;
}

function renderIntegration(){
  const ints=[
    {name:'DigiLocker',ico:'🔗',status:'mock',desc:'Document fetch via OAuth 2.0',total:12480,ok:11940,fail:540},
    {name:'NSP / State Portals',ico:'🌐',status:'mock',desc:'Pre/Post-Matric beneficiary data import',total:8420,ok:8100,fail:320},
    {name:'DBT / PFMS / APBS',ico:'💳',status:'mock',desc:'Sanction & disbursement tracking',total:54218,ok:51480,fail:2738},
    {name:'Aadhaar e-KYC',ico:'🪪',status:'mock',desc:'Masked/tokenised identity verification',total:0,ok:0,fail:0},
    {name:'SMS / WhatsApp',ico:'📱',status:'live',desc:'Notification delivery gateway',total:284200,ok:281800,fail:2400},
    {name:'Email Gateway',ico:'📧',status:'live',desc:'Email notifications (SMTP/API)',total:184200,ok:183800,fail:400}
  ];
  return `
  <div class="page-hd"><h1>Integration Control Tower</h1><p>Adapter-pattern integrations — each has a documented API contract for production</p></div>
  <div class="alert alert-info anim"><span class="alert-icon">ℹ️</span><div class="alert-body">All IDs, tokens and reference numbers shown are <strong>synthetic/demo data</strong>. Mock/Live toggle is for demonstration only.</div></div>
  <div class="int-grid anim">
    ${ints.map(i=>`
      <div class="int-card">
        <div class="int-hd">
          <span style="font-size:1.5rem">${i.ico}</span>
          <div><div style="font-weight:700;font-size:.88rem">${esc(i.name)}</div><div style="font-size:.7rem;color:var(--text-muted)">${esc(i.desc)}</div></div>
          <div class="int-status ${i.status}"><div class="int-dot ${i.status}"></div>${i.status.toUpperCase()}</div>
        </div>
        <div class="int-stats">
          <div><div class="int-stat-val" style="color:var(--navy)">${i.total.toLocaleString()}</div><div class="int-stat-lbl">Total</div></div>
          <div><div class="int-stat-val" style="color:var(--green)">${i.ok.toLocaleString()}</div><div class="int-stat-lbl">Success</div></div>
          <div><div class="int-stat-val" style="color:${i.fail>0?'var(--red)':'var(--text-muted)'}">${i.fail.toLocaleString()}</div><div class="int-stat-lbl">Failed</div></div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem">
          <span style="font-size:.72rem;color:var(--text-muted)">Mock mode</span>
          <div class="tog-switch ${i.status==='mock'?'on':''}" onclick="this.classList.toggle('on');toast('Integration toggle updated')"><div class="tog-thumb"></div></div>
          <button class="btn btn-outline btn-xs" onclick="toast('API contract documentation opened')">View API Contract</button>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function renderGrvIntel(){
  return `
  <div class="page-hd"><h1>Grievance Intelligence</h1><p>AI-assisted root-cause analysis from applicant grievances</p></div>
  <div class="metric-row anim">
    ${[['847','Open','var(--red)'],['312','In Progress','var(--amber)'],['4,218','Resolved (YTD)','var(--green)'],['3.2 days','Avg Resolution','var(--navy)']].map(([v,l,c])=>`<div class="metric-card" style="--mc-color:${c}"><div class="metric-val" style="color:${c}">${v}</div><div class="metric-label">${l}</div></div>`).join('')}
  </div>
  <div class="card anim" style="margin-bottom:1rem">
    <h3 style="font-size:.9rem;font-weight:800;margin-bottom:.875rem">Top recurring grievance categories</h3>
    ${[['Document verification rejected',342,'Suggest image quality guide to applicants'],['Income mismatch flag',218,'Cross-check tolerance may need adjustment'],['Application status not updated',142,'Check queue health and notification delays'],['DigiLocker fetch failed',98,'Improve OAuth retry flow and session expiry handling'],['Income certificate format',87,'Create state-wise template guide']].map(([cat,cnt,sug])=>`
      <div style="display:flex;align-items:center;gap:.75rem;padding:6px 0;border-bottom:1px solid var(--border-light);font-size:.8rem">
        <span style="flex:1;font-weight:600">${cat}</span>
        <span style="font-weight:900;color:var(--red)">${cnt}</span>
        <div style="width:90px;height:5px;background:var(--border);border-radius:3px"><div style="height:100%;background:var(--red);border-radius:3px;width:${cnt/3.5}%"></div></div>
        <span style="font-size:.7rem;color:var(--text-muted);flex:1.5">💡 ${sug}</span>
      </div>
    `).join('')}
  </div>
  <div class="card anim" style="padding:0">
    <div style="padding:1rem;border-bottom:1px solid var(--border);font-weight:800;font-size:.9rem">Recent Grievances</div>
    ${GRIEVANCES.map(g=>`
      <div class="grv-card" style="border-radius:0;border-left:none;border-right:none;border-top:none">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:3px">
          <span class="grv-id">${g.id}</span>
          <span class="badge ${g.status==='open'?'badge-rejected':g.status==='inprogress'?'badge-deficient':'badge-selected'}">${g.status}</span>
          <span class="badge ${g.priority==='high'?'badge-rejected':g.priority==='med'?'badge-deficient':'badge-submitted'}" style="margin-left:auto">${g.priority} priority</span>
        </div>
        <div class="grv-subject">${esc(g.subject)}</div>
        <div class="grv-meta"><span>${g.scheme}</span><span>·</span><span>${g.cat}</span><span>·</span><span>${g.date}</span></div>
      </div>
    `).join('')}
  </div>`;
}

function renderRoles(){
  const roles=[
    {name:'ST Applicant',users:3487,perms:['apply','upload','track','grievance']},
    {name:'Document Verifier',users:84,perms:['view_queue','review_docs','raise_deficiency']},
    {name:'Scrutiny Officer',users:42,perms:['full_scrutiny','mark_eligible','override_with_remarks']},
    {name:'Institute Nodal Officer',users:246,perms:['confirm_enrollment','fee_structure']},
    {name:'Selection Committee',users:18,perms:['shortlist','interview_scores','recommendations']},
    {name:'MoTA Approving Officer',users:6,perms:['approve_merit','sanction','override_with_remarks']},
    {name:'Finance / DBT Officer',users:12,perms:['disbursement_tracking','pfms_reconciliation']},
    {name:'Scheme Admin',users:4,perms:['create_scheme','publish_rules','manage_versions']},
    {name:'Auditor / Super Admin',users:2,perms:['read_all','audit_log','user_management']}
  ];
  return `
  <div class="page-hd page-hd-row"><div><h1>Roles &amp; User Management</h1><p>JWT + OAuth2 + RBAC — 9 roles</p></div><button class="btn btn-navy btn-sm">+ Add User</button></div>
  <div class="card anim" style="padding:0">
    <div class="tbl-wrap">
      <table class="data-tbl">
        <thead><tr><th>Role</th><th>Active Users</th><th>Key Permissions</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${roles.map(r=>`<tr>
            <td style="font-weight:700">${esc(r.name)}</td>
            <td>${r.users.toLocaleString()}</td>
            <td>${r.perms.map(p=>`<span style="display:inline-block;font-size:.66rem;background:rgba(27,58,107,.07);color:var(--navy);padding:1px 5px;border-radius:3px;margin:1px">${p}</span>`).join('')}</td>
            <td><span class="badge badge-selected">Active</span></td>
            <td><button class="btn btn-outline btn-xs" onclick="toast('Role editor opened')">Edit</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ─── MISC PAGES ──────────────────────────────────────────────────────────────
function renderTrack(){return`
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>Track Application</div>
  <main id="main-content" style="max-width:680px;margin:2rem auto;padding:0 1.5rem">
    <div class="page-hd"><h1>Track Your Application</h1></div>
    <div class="card anim">
      <div class="form-group"><label class="form-label">Application ID or Mobile Number <span class="req">*</span></label><input class="form-input" id="pub-track" placeholder="e.g. NFST-2026-04817" value="NFST-2026-04817"><div class="form-hint">You can also track using your registered mobile number</div></div>
      <div class="form-row" style="align-items:flex-end">
        <div class="form-group"><label class="form-label">Date of Birth (verification)</label><input class="form-input" type="date" value="2000-04-15"></div>
        <div class="form-group"><button class="btn btn-navy" onclick="$('pub-result').style.display='block';$('pub-result').scrollIntoView({behavior:'smooth'})">🔍 Track</button></div>
      </div>
    </div>
    <div id="pub-result" style="display:none;margin-top:1rem">
      ${DEMO_APPS.slice(0,1).map(app=>{const sc=SCHEMES.find(s=>s.id===app.scheme);return`
        <div class="card anim">
          <div class="card-header"><div><div style="font-size:.68rem;color:var(--text-muted)">${app.id}</div><div class="card-title">${sc?.icon} ${esc(sc?.name)}</div></div><span class="badge badge-${app.status}">${app.status}</span></div>
          <div class="timeline">${['Submitted','Auto-check','Scrutiny','Selection','Sanction'].map((n,i)=>`<div class="tl-step ${i+1<app.stage?'done':i+1===app.stage?'active':'pending'}"><div class="tl-dot">${i+1<app.stage?'✓':i+1===app.stage?i+1:''}</div><div class="tl-name">${n}</div><div class="tl-date">${i===0?app.submitted:''}</div></div>`).join('')}</div>
          ${app.deficiency?.active?`<div class="alert alert-warn" style="margin-top:.75rem"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>Action needed by ${app.deficiency.deadline}:</strong> ${esc(app.deficiency.reason)}</div></div>`:''}
          <div style="text-align:center;margin-top:1rem"><button class="btn btn-navy btn-sm" onclick="nav('login')">Log in to view details &amp; re-upload</button></div>
        </div>`;}).join('')}
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;}

function renderNotices(){
  const ns=[
    {date:'29 Sep 2026',title:'Guidelines for income certificate updated',desc:'Latest circular on acceptable income certificate formats.',badge:'New',scheme:'All'},
    {date:'25 Sep 2026',title:'Applications open for NFST 2026–27',desc:'NFST applications are now open. Last date: 31 Oct 2026.',badge:'Open',scheme:'NFST'},
    {date:'20 Sep 2026',title:'Post-Matric deadline extended to 15 Oct 2026',desc:'The last date for Post-Matric applications has been extended.',badge:'Update',scheme:'Post-Matric'},
    {date:'15 Sep 2026',title:'NOS 2026–27 applications invited',desc:'National Overseas Scholarship applications for 2026-27 are invited.',badge:'Open',scheme:'NOS'},
    {date:'10 Sep 2026',title:'NFST merit list 2025–26 published',desc:'Merit list for NFST 2025-26 published. Check dashboard.',badge:'Result',scheme:'NFST'}
  ];
  return`${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>Notices</div>
  <main id="main-content" style="max-width:800px;margin:0 auto;padding:1.5rem">
    <div class="page-hd"><h1>Latest Notices &amp; Announcements</h1></div>
    ${ns.map((n,i)=>`<div class="card anim d${Math.min(i+1,4)}" style="margin-bottom:.625rem;cursor:pointer">
      <div style="display:flex;align-items:flex-start;gap:.75rem">
        <div style="flex:1">
          <div style="display:flex;gap:.5rem;align-items:center;margin-bottom:4px">
            <span class="badge badge-new">${n.badge}</span><span class="badge badge-submitted">${n.scheme}</span>
            <span style="font-size:.7rem;color:var(--text-muted);margin-left:auto">${n.date}</span>
          </div>
          <div style="font-weight:700;font-size:.92rem;margin-bottom:3px">${esc(n.title)}</div>
          <div style="font-size:.8rem;color:var(--text-muted)">${esc(n.desc)}</div>
        </div>
      </div>
    </div>`).join('')}
  </main>
  ${renderFooter()} ${renderChat()}`;
}

function renderAbout(){return`
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>About</div>
  <div style="background:linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 100%);padding:2.5rem 1.5rem;color:#fff;text-align:center">
    <h1 style="font-size:1.75rem">About the Portal</h1>
    <p style="opacity:.8;margin-top:.5rem">AI-Enabled Scholarship & Fellowship Management System — SIH 2026 PS 26239</p>
  </div>
  <main id="main-content" style="max-width:860px;margin:0 auto;padding:1.5rem">
    <div class="card anim" style="margin-bottom:1.25rem">
      <div class="card-title" style="margin-bottom:.75rem">About this System</div>
      <p style="color:var(--text-mid);line-height:1.75;margin-bottom:1rem">This portal is a unified, AI-assisted platform developed for the Ministry of Tribal Affairs (MoTA), Government of India, as part of Smart India Hackathon 2026 (PS 26239). It enables end-to-end management of scholarship and fellowship schemes for Scheduled Tribe (ST) students across India.</p>
      <div class="alert alert-warn"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>SIH Prototype Notice:</strong> This is a demonstration prototype. All policy values marked [DEMO] are illustrative. Production deployment would require official MoTA guideline validation and NIC/MeitY-empanelled cloud hosting.</div></div>
    </div>
    <div class="card-grid g2 anim d2" style="margin-bottom:1.25rem">
      ${[['🤖','AI-Assisted Verification','OCR & document intelligence — AI advises, officers decide. No AI-only approval.'],['🔒','Data Privacy','DPDP Act 2023 compliant. Aadhaar masked/tokenised. Documents encrypted at rest.'],['📜','Audit Trail','Hash-chained, tamper-evident log. Every decision recorded with actor, reason and timestamp.'],['⚙️','Configurable Rules','Scheme rules, eligibility criteria and scoring are configured as data — not hard-coded.'],['🌐','Multilingual','English, Hindi, Marathi and more. WCAG 2.1 AA accessible.'],['🔌','Integration Ready','Documented adapter contracts for DigiLocker, NSP, DBT/PFMS, Aadhaar e-KYC.']].map(([ico,t,d])=>`
        <div class="card" style="background:var(--bg)"><div style="font-size:1.75rem;margin-bottom:.5rem">${ico}</div><div style="font-weight:700;margin-bottom:3px">${t}</div><div style="font-size:.8rem;color:var(--text-mid)">${d}</div></div>
      `).join('')}
    </div>
    ${renderTechStackSection()}
  </main>
  ${renderFooter()} ${renderChat()}`;}

function renderGuidelines(){
  const docs=[
    {name:'NFST Guidelines 2022',size:'4.1 MB',scheme:'NFST'},
    {name:'NOS Guidelines 2022 (Revised)',size:'633 KB',scheme:'NOS'},
    {name:'Post-Matric Scholarship Guidelines',size:'612 KB',scheme:'Post-Matric'},
    {name:'Pre-Matric Scholarship Guidelines',size:'621 KB',scheme:'Pre-Matric'},
    {name:'User Manual — Applicant Portal',size:'1.2 MB',scheme:'All'},
    {name:'Income Certificate Format',size:'180 KB',scheme:'All'}
  ];
  return`${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>Guidelines & Downloads</div>
  <main id="main-content" style="max-width:800px;margin:0 auto;padding:1.5rem">
    <div class="page-hd"><h1>Guidelines &amp; Downloads</h1></div>
    <div class="card anim" style="padding:0">
      ${docs.map(d=>`<div style="display:flex;align-items:center;gap:.75rem;padding:.875rem;border-bottom:1px solid var(--border-light)">
        <span style="font-size:1.4rem">📄</span>
        <div style="flex:1"><div style="font-weight:700;font-size:.86rem">${esc(d.name)}</div><div style="font-size:.7rem;color:var(--text-muted)">PDF · ${d.size} · ${d.scheme}</div></div>
        <button class="btn btn-navy btn-sm" onclick="toast('Downloading ${d.name}...')">⬇ Download</button>
      </div>`).join('')}
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

function renderGrievance(){return`
  ${renderTop()}
  <div class="breadcrumb"><a onclick="nav('home')">Home</a><span class="bc-sep">›</span>Grievance & Help</div>
  <main id="main-content" style="max-width:760px;margin:0 auto;padding:1.5rem">
    <div class="page-hd"><h1>Grievance &amp; Help</h1></div>
    <div class="card-grid g2 anim" style="margin-bottom:1.5rem">
      <div class="card" style="cursor:pointer;text-align:center" onclick="toggleChat()">
        <div style="font-size:2rem;margin-bottom:.4rem">💬</div>
        <div style="font-weight:700">Chat with SahayBot</div>
        <div style="font-size:.78rem;color:var(--text-muted)">Instant answers to scheme questions</div>
      </div>
      <div class="card" style="text-align:center">
        <div style="font-size:2rem;margin-bottom:.4rem">📞</div>
        <div style="font-weight:700">Helpline: 1800-XXX-XXXX</div>
        <div style="font-size:.78rem;color:var(--text-muted)">Mon–Sat, 9am–6pm [Demo number]</div>
      </div>
    </div>
    <div class="card anim" style="margin-bottom:1.5rem">
      <div class="card-header"><div class="card-title">📝 Submit a Grievance</div></div>
      <div class="form-group"><label class="form-label">Application ID (if applicable)</label><input class="form-input" placeholder="e.g. NFST-2026-04817"></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Category <span class="req">*</span></label><select class="form-select"><option>Document verification issue</option><option>Income mismatch flagged incorrectly</option><option>Application status not updated</option><option>Payment not received</option><option>Other</option></select></div>
        <div class="form-group"><label class="form-label">Scheme</label><select class="form-select">${SCHEMES.map(s=>`<option>${s.short}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Describe your issue <span class="req">*</span></label><textarea class="form-textarea" placeholder="Describe your grievance in detail…" rows="4"></textarea></div>
      <div class="form-group"><label class="form-label">Supporting attachment (optional)</label><div class="upload-zone" onclick="toast('File upload simulated')"><div class="upload-zone-icon" style="font-size:1.5rem">📎</div><div class="upload-zone-title">Attach screenshot or document</div><div class="upload-zone-hint">PDF, JPG, PNG · Max 5MB</div></div></div>
      <button class="btn btn-navy" onclick="toast('✅ Grievance submitted. Reference: GRV-2026-'+Math.floor(1000+Math.random()*9000))">Submit Grievance</button>
    </div>
    <div class="card anim">
      <div class="card-header"><div class="card-title">🔍 Track Grievance Status</div></div>
      <div class="form-row" style="align-items:flex-end">
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Grievance ID</label><input class="form-input" placeholder="e.g. GRV-2026-0441" value="GRV-2026-0441"></div>
        <button class="btn btn-navy btn-sm" style="height:38px">Track</button>
      </div>
      <div style="margin-top:1rem">
        ${GRIEVANCES.map(g=>`<div class="grv-card"><div style="display:flex;align-items:center;gap:.5rem;margin-bottom:3px"><span class="grv-id">${g.id}</span><span class="badge ${g.status==='open'?'badge-rejected':g.status==='inprogress'?'badge-deficient':'badge-selected'}">${g.status}</span></div><div class="grv-subject">${esc(g.subject)}</div><div class="grv-meta"><span>${g.scheme}</span><span>·</span><span>${g.date}</span></div></div>`).join('')}
      </div>
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;}

function renderAppDetail(){
  const app = DEMO_APPS.find(a=>a.id===APP.appId)||DEMO_APPS[0];
  const sc = SCHEMES.find(s=>s.id===app.scheme);
  return`${renderTop()}
  <div class="breadcrumb"><a onclick="nav('dashboard')">Dashboard</a><span class="bc-sep">›</span><a onclick="nav('dashboard',{sideTab:'my-apps'})">My Applications</a><span class="bc-sep">›</span>${app.id}</div>
  <main id="main-content" style="max-width:860px;margin:0 auto;padding:1.5rem">
    <div class="page-hd page-hd-row">
      <div style="display:flex;align-items:center;gap:.75rem">
        <button class="btn btn-outline btn-sm" onclick="nav('dashboard',{sideTab:'my-apps'})">← Back</button>
        <div><h1>${sc?.icon} ${app.id}</h1><p>${esc(sc?.name)}</p></div>
      </div>
      <span class="badge badge-${app.status}" style="font-size:.8rem;padding:5px 12px">${app.status}</span>
    </div>
    <div class="card anim" style="margin-bottom:1.25rem">
      <div class="card-header"><div class="card-title">📊 Status Timeline</div></div>
      <div class="timeline">${['Submitted','Auto-check','Scrutiny','Selection','Sanction'].map((n,i)=>`<div class="tl-step ${i+1<app.stage?'done':i+1===app.stage?'active':'pending'}"><div class="tl-dot">${i+1<app.stage?'✓':i+1===app.stage?i+1:''}</div><div class="tl-name">${n}</div><div class="tl-date">${i===0?app.submitted:i===1?app.autoCheck||'':''}</div></div>`).join('')}</div>
    </div>
    ${app.deficiency?.active?`<div class="alert alert-warn anim"><span class="alert-icon">⚠️</span><div class="alert-body"><strong>Deficiency: ${esc(app.deficiency.doc)}</strong><br>${esc(app.deficiency.reason)}<br><span style="font-size:.72rem">Deadline: ${app.deficiency.deadline}</span></div><div class="alert-action"><button class="btn btn-orange btn-sm" onclick="nav('dashboard',{sideTab:'documents'})">Fix Now →</button></div></div>`:''}
    <div class="card-grid g2 anim d2">
      <div class="card"><div class="card-header"><div class="card-title">📁 Documents</div></div><div class="doc-list">${app.docs.map(d=>`<div class="doc-row"><div class="doc-status ${d.status==='ok'?'ok':d.status==='warn'?'warn':'pend'}">${d.status==='ok'?'✓':d.status==='warn'?'⚠':'○'}</div><span class="doc-name">${esc(d.name)}</span>${d.ocr?`<span class="doc-tag ${d.status==='warn'?'unclear':'digilocker'}">OCR ${d.ocr}%</span>`:''}<span class="doc-chevron">›</span></div>`).join('')}</div></div>
      <div class="card"><div class="card-header"><div class="card-title">🛡️ Eligibility Results</div></div><div class="elig-list">${app.elig.map(c=>`<div class="elig-item ${c.pass===true?'pass':c.pass===false?'fail':'pend'}"><span class="elig-icon">${c.pass===true?'✅':c.pass===false?'❌':'⏳'}</span><div class="elig-text"><strong>${esc(c.label)}</strong><span>${esc(c.note||'')}</span></div></div>`).join('')}</div></div>
    </div>
  </main>
  ${renderFooter()} ${renderChat()}`;
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────
function render() {
  const app = document.getElementById('app'); if(!app) return;
  let html='';
  switch(APP.page){
    case 'home': html=renderHome(); break;
    case 'scheme': html=renderScheme(); break;
    case 'schemes': html=renderSchemes(); break;
    case 'eligibility': html=renderEligibility(); break;
    case 'login': html=renderLogin(); break;
    case 'register': html=renderRegister(); break;
    case 'dashboard': html=renderDashboard(); break;
    case 'apply': html=renderApply(); break;
    case 'track': html=renderTrack(); break;
    case 'app-detail': html=renderAppDetail(); break;
    case 'notices': html=renderNotices(); break;
    case 'about': html=renderAbout(); break;
    case 'guidelines': html=renderGuidelines(); break;
    case 'grievance': html=renderGrievance(); break;
    default: html=renderHome();
  }
  app.innerHTML = html;
  // re-run any inline scripts (for Chart.js charts)
  app.querySelectorAll('script').forEach(s=>{try{eval(s.textContent);}catch(e){console.warn('Script:',e.message);}});
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function chFont(dir){
  const c=parseInt(document.documentElement.style.fontSize)||15;
  document.documentElement.style.fontSize=(dir===0?15:Math.max(13,Math.min(19,c+dir*2)))+'px';
}
function setLang(lang){APP.lang=lang;render();}

// ─── NEW FEATURE: APPLICATION READINESS GATE ─────────────────────────────────
// Competitor analysis: UNNATI, TribalAid, JanVidya all implement pre-submit checks
// "Check → Fix → Submit" instead of "Submit → Discover problem"
function renderReadinessGate(scheme) {
  scheme = scheme || 'NFST';
  const checks = [
    { label: 'Personal information complete',     status: 'pass', note: 'All required fields filled' },
    { label: 'ST category certificate uploaded',  status: 'pass', note: 'Caste cert — OCR 97% confidence' },
    { label: 'Income certificate',                status: 'warn', note: 'Declared ₹2,10,000; certificate shows ₹2,85,000 — officer will review' },
    { label: 'Marksheet (PG) uploaded',           status: 'pass', note: 'PG marks 68% — above 55% NFST threshold [DEMO]' },
    { label: 'Bank account linked (DBT)',          status: 'pass', note: 'IFSC SBIN0001234 verified' },
    { label: 'Age ≤ 35 years (NFST)',             status: 'pass', note: 'Age 26 years confirmed from ID' },
    { label: 'University listed on NFST portal',  status: 'pass', note: 'IIT Delhi — listed institute' },
    { label: 'No duplicate application detected', status: 'pass', note: 'No prior NFST claim for this token' },
    { label: 'Cross-scheme conflict check',        status: 'pass', note: 'Not claiming conflicting scheme simultaneously' },
    { label: 'Wrong-slot document check',          status: 'pass', note: 'All uploads match required document types' },
    { label: 'Document quality gate',             status: 'pass', note: 'Blur/skew/resolution — all passed' },
    { label: 'Declaration & consent signed',       status: 'fail', note: 'Final consent not yet submitted' },
  ];
  const passCount = checks.filter(c=>c.status==='pass').length;
  const warnCount = checks.filter(c=>c.status==='warn').length;
  const failCount = checks.filter(c=>c.status==='fail').length;
  const pct = Math.round((passCount / checks.length) * 100);
  const color = failCount > 0 ? 'var(--red)' : warnCount > 0 ? 'var(--amber)' : 'var(--green)';
  return `
  <div class="card anim" style="border-left:4px solid ${color};margin-bottom:1rem">
    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem">
      <div style="font-size:2rem">${failCount>0?'⚠️':warnCount>0?'🟡':'✅'}</div>
      <div>
        <div style="font-size:1.05rem;font-weight:800">Application Readiness Gate — ${pct}%</div>
        <div style="font-size:.8rem;color:var(--text-muted)">${passCount} passed · ${warnCount} warnings · ${failCount} blocking</div>
      </div>
      <div style="margin-left:auto">
        <div style="width:80px;height:80px;border-radius:50%;background:conic-gradient(${color} ${pct*3.6}deg,var(--border) 0);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:.95rem">${pct}%</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:.35rem">
      ${checks.map(c=>`
        <div style="display:flex;align-items:flex-start;gap:.6rem;padding:5px 0;border-bottom:1px solid var(--border-light);font-size:.8rem">
          <span style="font-size:1rem;min-width:1.2rem">${c.status==='pass'?'✅':c.status==='warn'?'⚠️':'❌'}</span>
          <div style="flex:1">
            <div style="font-weight:600;color:${c.status==='fail'?'var(--red)':c.status==='warn'?'var(--amber)':'var(--text)'}">${c.label}</div>
            <div style="color:var(--text-muted)">${c.note}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:.5rem;margin-top:.875rem;justify-content:flex-end">
      <button class="btn btn-outline btn-sm" onclick="toast('💾 Draft saved.')">Save Draft</button>
      <button class="btn ${failCount>0?'btn-ghost':'btn-navy'} btn-sm"
        onclick="${failCount>0?`toast('❌ Fix ${failCount} blocking issue(s) before submitting.')`:
          `toast('✅ Application submitted! ID: NFST-2026-'+Math.floor(10000+Math.random()*89999)+'. SMS acknowledgement sent.')`}">
        ${failCount>0?'Fix Issues First':'Submit Application'}
      </button>
    </div>
  </div>`;
}

// ─── NEW FEATURE: CROSS-SCHEME CONFLICT CHECKER ────────────────────────────────
// Competitor analysis: Mobile-platform implementations; prevent simultaneous conflicting benefit claims
function renderConflictChecker() {
  const rows = [
    { name:'NFST 2026–27',          status:'current', conflict:false, reason:'Currently applying — this is the target scheme' },
    { name:'NOS 2026–27',           status:'none',    conflict:true,  reason:'Cannot claim NFST + NOS simultaneously (both are research fellowships)' },
    { name:'Top Class Education',   status:'past',    conflict:false, reason:'Completed (IIT Delhi, 2022–26) — no active conflict' },
    { name:'Post-Matric Scholarship',status:'none',   conflict:false, reason:'Different education level — no conflict with NFST' },
    { name:'Pre-Matric Scholarship', status:'none',   conflict:false, reason:'Different education level — no conflict' },
  ];
  return `
  <div class="card anim" style="margin-bottom:1rem">
    <div class="card-header"><div class="card-title">🔄 Cross-Scheme Benefit Conflict Checker</div><span class="demo-tag">MOCK NSP LOOKUP</span></div>
    <div class="alert alert-info" style="margin-bottom:.75rem"><span class="alert-icon">ℹ️</span>
      <div class="alert-body">Checks MoTA, NSP and State portal records for active/pending claims that would create a duplicate-benefit conflict. One applicant, one active fellowship at a time.</div>
    </div>
    ${rows.map(s=>`
      <div style="display:flex;align-items:center;gap:.75rem;padding:8px 0;border-bottom:1px solid var(--border-light);font-size:.82rem">
        <span style="font-size:1.1rem">${s.conflict?'❌':s.status==='current'?'🔵':'✅'}</span>
        <div style="flex:1">
          <div style="font-weight:700">${s.name} <span class="badge ${s.status==='current'?'badge-submitted':s.status==='past'?'badge-selected':'badge-deficient'}" style="font-size:.65rem">${s.status}</span></div>
          <div style="color:${s.conflict?'var(--red)':'var(--text-muted)'};">${s.reason}</div>
        </div>
      </div>
    `).join('')}
    <div style="margin-top:.625rem;padding:.5rem .625rem;background:var(--bg);border-radius:6px;font-size:.8rem">
      <strong>Result:</strong> <span style="color:var(--green)">✅ No active conflict detected.</span> NOS conflict flagged but applicant has not applied.
    </div>
  </div>`;
}

// ─── NEW FEATURE: PHONETIC / TRANSLITERATION NAME MATCHING (DIALECT SHIELD) ───
// Competitor analysis: MoTA SETU "Dialect-Shield" — Soren/Saren, Munda/Mounda, Kerketta/Kerketa
// Statutory Rule 14(b) Gazette Dialect Exemption
function renderPhoneticMatch(formName, certName) {
  formName = formName || 'Meena Soren';
  certName = certName || 'Mina Saren';
  const editDist = 3;
  const phonetic1 = 'M500 S650'; // Soundex — Meena Soren
  const phonetic2 = 'M500 S650'; // Soundex — Mina Saren (same!)
  const phoneticMatch = phonetic1 === phonetic2;
  const tokenScore = 78;
  return `
  <div class="card anim" style="border-left:4px solid var(--amber);margin-bottom:.875rem">
    <div class="card-header">
      <div class="card-title">🔤 Phonetic / Transliteration Matching — Dialect Shield</div>
      <span style="font-size:.72rem;color:var(--text-muted)">Statutory Rule 14(b) Gazette Dialect Exemption</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;font-size:.82rem;margin-bottom:.75rem">
      <div style="padding:.5rem .625rem;background:var(--bg);border-radius:7px">
        <div style="font-size:.7rem;color:var(--text-muted);margin-bottom:3px">APPLICATION FORM</div>
        <div style="font-size:1.1rem;font-weight:800">${formName}</div>
      </div>
      <div style="padding:.5rem .625rem;background:var(--bg);border-radius:7px">
        <div style="font-size:.7rem;color:var(--text-muted);margin-bottom:3px">ST CERTIFICATE (OCR)</div>
        <div style="font-size:1.1rem;font-weight:800">${certName}</div>
      </div>
    </div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;font-size:.78rem;margin-bottom:.75rem">
      <div style="padding:5px 9px;background:var(--bg);border-radius:6px">
        <div style="color:var(--text-muted);font-size:.7rem">Edit Distance</div>
        <div style="font-weight:800;color:var(--amber)">${editDist} chars</div>
      </div>
      <div style="padding:5px 9px;background:var(--bg);border-radius:6px">
        <div style="color:var(--text-muted);font-size:.7rem">Soundex (M500 S650)</div>
        <div style="font-weight:800;color:var(--green)">✅ MATCH</div>
      </div>
      <div style="padding:5px 9px;background:var(--bg);border-radius:6px">
        <div style="color:var(--text-muted);font-size:.7rem">Token Sort Ratio</div>
        <div style="font-weight:800;color:var(--amber)">${tokenScore}%</div>
      </div>
      <div style="padding:5px 9px;background:var(--bg);border-radius:6px">
        <div style="color:var(--text-muted);font-size:.7rem">Verdict</div>
        <div style="font-weight:800;color:var(--amber)">⚠️ Probable Match</div>
      </div>
    </div>
    <div class="alert alert-warn" style="margin-bottom:.625rem">
      <span class="alert-icon">⚠️</span>
      <div class="alert-body">
        <strong>Dialect Variation Detected.</strong> "${formName}" and "${certName}" are likely transliteration variants of the same tribal name (Santali/Odia dialect). Soundex codes match. Per Rule 14(b), officers may accept phonetically equivalent names without requiring a name-correction affidavit.
        <div style="margin-top:3px;font-size:.75rem">AI flags for officer confirmation — not an automatic approval or rejection.</div>
      </div>
    </div>
    <div style="display:flex;gap:.4rem">
      <button class="btn btn-navy btn-xs" onclick="toast('✅ Rule 14(b) dialect exemption noted. Application proceeds.')">Accept (Rule 14b)</button>
      <button class="btn btn-outline btn-xs" onclick="toast('📋 Deficiency raised: please provide name-correction affidavit.')">Request Affidavit</button>
      <button class="btn btn-ghost btn-xs" onclick="toast('🔍 Escalated to senior officer.')">Escalate</button>
    </div>
  </div>`;
}

// ─── NEW FEATURE: QR CERTIFICATE VERIFICATION ──────────────────────────────────
// Competitor analysis: TribalSetu — QR parsing as optional evidence signal
function renderQRCheck(docType) {
  docType = docType || 'ST Certificate';
  const rows = [
    { label:'QR Code Detected',     val:'Yes — 1 QR on page 1',                       ok:true  },
    { label:'QR Content Parsed',    val:'Cert ID: MH/2024/ST/8742-C · Issuer: SDM Nashik', ok:true  },
    { label:'Issuer Authority',     val:'Sub-Divisional Magistrate, Nashik, Maharashtra', ok:true  },
    { label:'Issue Date',           val:'14 Mar 2024 (within 3-year validity window)', ok:true  },
    { label:'Digital Signature',    val:'Cannot verify — issuer public key not configured', ok:null  },
    { label:'Live Registry Check',  val:'Not available — mock adapter only',           ok:null  },
  ];
  return `
  <div class="card anim" style="margin-bottom:.875rem">
    <div class="card-header"><div class="card-title">🔲 QR Certificate Verification — ${docType}</div><span class="demo-tag">PROTOTYPE SIGNAL</span></div>
    <div class="alert alert-info" style="margin-bottom:.625rem"><span class="alert-icon">ℹ️</span>
      <div class="alert-body">QR parsing provides structural evidence only. Certificate is not legally verified until the issuing authority registry is queried. This assists officer review — it does not substitute official verification.</div>
    </div>
    ${rows.map(s=>`
      <div style="display:flex;gap:.6rem;padding:5px 0;border-bottom:1px solid var(--border-light);font-size:.8rem;align-items:center">
        <span>${s.ok===true?'✅':s.ok===false?'❌':'⚠️'}</span>
        <span style="font-weight:600;width:180px;flex-shrink:0">${s.label}</span>
        <span style="color:${s.ok===null?'var(--amber)':'var(--text)'}">${s.val}</span>
      </div>
    `).join('')}
    <div style="margin-top:.5rem;font-size:.75rem;color:var(--text-muted)"><strong>Officer note:</strong> QR data consistent with application. Digital signature unverified — requires issuer key configuration in Integration Tower.</div>
  </div>`;
}

// ─── NEW ADMIN TAB: COVERAGE GAP INTELLIGENCE ─────────────────────────────────
// Unique differentiator — cross-reference ST student population vs scholarship claims
// to identify unreached eligible beneficiaries and trigger outreach campaigns
function renderCoverageGap() {
  const states = [
    { state:'Madhya Pradesh',  stPop:2100000, applicants:54210, gap:87 },
    { state:'Jharkhand',       stPop: 860000, applicants:68420, gap:21 },
    { state:'Rajasthan',       stPop: 920000, applicants:32100, gap:65 },
    { state:'Chhattisgarh',    stPop: 780000, applicants:28400, gap:62 },
    { state:'Odisha',          stPop: 950000, applicants:48320, gap:49 },
    { state:'Gujarat',         stPop: 890000, applicants:18200, gap:80 },
    { state:'Assam',           stPop: 380000, applicants:12600, gap:67 },
    { state:'Maharashtra',     stPop:1000000, applicants:24500, gap:75 },
  ];
  const pvtg = [
    { district:'Bijapur, CG',    pvtgPop:42000, claims:320,  pct:0.8, status:'critical' },
    { district:'Narayanpur, CG', pvtgPop:31000, claims:480,  pct:1.5, status:'critical' },
    { district:'Malkangiri, OD', pvtgPop:58000, claims:1240, pct:2.1, status:'low'      },
    { district:'Dantewada, CG',  pvtgPop:37000, claims:290,  pct:0.8, status:'critical' },
    { district:'Kinnaur, HP',    pvtgPop:18000, claims:820,  pct:4.6, status:'moderate' },
  ];
  return `
  <div class="page-hd"><h1>Coverage Gap Intelligence</h1><p>Identify eligible but unreached ST beneficiaries · Cross-reference scholarship claims vs ST population data</p></div>
  <div class="alert alert-info anim"><span class="alert-icon">🗺️</span>
    <div class="alert-body"><strong>What this does:</strong> Cross-references state ST population estimates (AISHE/Census) with actual scholarship claims to identify states and districts where eligible ST students are not applying, then generates targeted outreach recommendations.
    <div style="font-size:.75rem;margin-top:3px">Population data is <strong>DEMO PLACEHOLDER</strong>. Source actual figures from Census 2011/AISHE 2023–24 before presenting to Ministry.</div></div>
  </div>
  <div class="metric-row anim">
    ${[['₹2,847 Cr','Estimated unclaimed benefit value','var(--red)','↑ Opportunity'],['18.4 lakh','Est. eligible ST students not applying','var(--amber)','Across 8 key states'],['7 states','Coverage gap &gt; 60%','var(--orange)','Need outreach priority'],['94 districts','PVTG coverage &lt; 2%','var(--red)','Critical zones']
    ].map(([v,l,c,d])=>`<div class="metric-card" style="--mc-color:${c}"><div class="metric-val" style="color:${c}">${v}</div><div class="metric-label">${l}</div><div class="metric-delta delta-dn">${d}</div></div>`).join('')}
  </div>
  <div class="card anim" style="padding:0;margin-bottom:1rem">
    <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div style="font-weight:800;font-size:.9rem">State-wise Coverage Gap <span class="demo-tag">DEMO</span></div>
      <button class="btn btn-outline btn-sm" onclick="toast('📊 Coverage gap CSV exported.')">📊 Export</button>
    </div>
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-size:.8rem">
        <thead style="background:var(--bg)"><tr>${['State','Est. ST Pop','Applicants','Gap %','Priority'].map(h=>`<th style="padding:7px 10px;text-align:left;font-weight:700;border-bottom:1px solid var(--border)">${h}</th>`).join('')}</tr></thead>
        <tbody>${states.map(s=>`
          <tr style="border-bottom:1px solid var(--border-light)">
            <td style="padding:6px 10px;font-weight:600">${s.state}</td>
            <td style="padding:6px 10px">${(s.stPop/1e5).toFixed(1)}L</td>
            <td style="padding:6px 10px">${s.applicants.toLocaleString()}</td>
            <td style="padding:6px 10px">
              <div style="display:flex;align-items:center;gap:.4rem">
                <div style="width:55px;height:6px;background:var(--border);border-radius:3px">
                  <div style="height:100%;background:${s.gap>70?'var(--red)':s.gap>50?'var(--amber)':'var(--green)'};border-radius:3px;width:${s.gap}%"></div>
                </div>
                <span style="font-weight:700;color:${s.gap>70?'var(--red)':s.gap>50?'var(--amber)':'var(--green)'}">${s.gap}%</span>
              </div>
            </td>
            <td style="padding:6px 10px"><span class="badge ${s.gap>70?'badge-rejected':s.gap>50?'badge-deficient':'badge-selected'}">${s.gap>70?'🔴 Critical':s.gap>50?'🟡 High':'🟢 Moderate'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  <div class="card anim" style="padding:0;margin-bottom:1rem">
    <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);font-weight:800;font-size:.9rem">PVTG Districts — Critical Zones <span class="demo-tag">DEMO</span></div>
    ${pvtg.map(d=>`
      <div style="padding:.5rem 1rem;border-bottom:1px solid var(--border-light);display:flex;align-items:center;gap:1rem;font-size:.8rem">
        <div style="flex:1">
          <div style="font-weight:700">${d.district}</div>
          <div style="color:var(--text-muted)">PVTG Pop: ~${d.pvtgPop.toLocaleString()} · Claims: ${d.claims.toLocaleString()}</div>
        </div>
        <div style="text-align:right"><div style="font-size:1.1rem;font-weight:900;color:${d.status==='critical'?'var(--red)':'var(--amber)'}">${d.pct}%</div><div style="font-size:.7rem;color:var(--text-muted)">coverage</div></div>
        <span class="badge ${d.status==='critical'?'badge-rejected':'badge-deficient'}">${d.status}</span>
        <button class="btn btn-outline btn-xs" onclick="toast('📢 Outreach campaign drafted for ${d.district}.')">Generate Outreach</button>
      </div>
    `).join('')}
  </div>
  <div class="card anim">
    <div class="card-title" style="margin-bottom:.75rem">Recommended Outreach Actions</div>
    ${[
      ['🏫','School Awareness Camps','Gujarat, Rajasthan — gap > 75%','Workshops at tribal schools explaining NFST/NOS eligibility'],
      ['📱','CSC/Kiosk Assisted Applications','MP, Chhattisgarh — remote PVTG districts','CSC staff to assist with applications in local language'],
      ['📻','Radio Campaign (Doordarshan)','Assam, NE states — low digital penetration','Broadcast scheme info in Bodo, Mising, Karbi languages'],
      ['📋','Pre-filled Eligibility Forms','All PVTG districts','Share pre-filled forms via UMANG app to reduce barrier'],
    ].map(([ico,type,region,action])=>`
      <div style="display:flex;gap:.75rem;padding:7px 0;border-bottom:1px solid var(--border-light);font-size:.8rem">
        <div style="font-size:1.2rem">${ico}</div>
        <div style="flex:1"><div style="font-weight:700">${type}</div><div style="color:var(--text-muted)">${region}</div><div style="font-size:.72rem;color:var(--text-mid);margin-top:2px">${action}</div></div>
        <button class="btn btn-navy btn-xs" onclick="toast('📋 Outreach plan drafted.')">Plan</button>
      </div>
    `).join('')}
  </div>`;
}

// ─── NEW ADMIN TAB: GUIDELINE CHANGE DETECTOR ─────────────────────────────────
// Compare official guideline PDF versions, identify affected rules + applicants
function renderGuidelineDiff() {
  const diffs = [
    { field:'NFST Monthly Stipend (PhD)',   old:'₹25,000/month', new:'₹28,000/month',              severity:'high',     affected:748   },
    { field:'NFST Income Ceiling',          old:'No ceiling',    new:'≤ ₹6,00,000/year (proposed)', severity:'critical', affected:5480  },
    { field:'NOS Age Limit (PhD)',          old:'≤ 35 years',    new:'≤ 40 years (revised)',        severity:'medium',   affected:840   },
    { field:'NOS QS Rank Threshold',        old:'Top 500',       new:'Top 600 (expanded)',          severity:'medium',   affected:1240  },
    { field:'Required Documents — NFST',    old:'4 documents',   new:'+ Research proposal (new)',   severity:'high',     affected:45820 },
  ];
  return `
  <div class="page-hd"><h1>Guideline Change Detector</h1><p>Compare official guideline versions · Identify rules and applicants affected before publishing</p></div>
  <div class="alert alert-warn anim"><span class="alert-icon">⚠️</span>
    <div class="alert-body"><strong>DEMO PLACEHOLDER.</strong> In production, upload a new guideline PDF. The system OCRs it, parses rule values, and generates this diff against the active version. All values are illustrative.</div>
  </div>
  <div class="card anim" style="padding:0;margin-bottom:1rem">
    <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-weight:800;font-size:.9rem">NFST Guidelines Version Diff</div><div style="font-size:.75rem;color:var(--text-muted)">Active: v2022.10 → Proposed: v2026.09 (uploaded 29 Sep 2026)</div></div>
      <div style="display:flex;gap:.5rem">
        <button class="btn btn-outline btn-sm" onclick="toast('📄 Diff PDF downloaded.')">📄 Download</button>
        <button class="btn btn-navy btn-sm" onclick="toast('🔬 Dry-run started against 45,820 applications...')">🔬 Impact Simulation</button>
      </div>
    </div>
    ${diffs.map(d=>`
      <div style="padding:.625rem 1rem;border-bottom:1px solid var(--border-light)">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.35rem">
          <span class="badge ${d.severity==='critical'?'badge-rejected':d.severity==='high'?'badge-deficient':'badge-submitted'}">${d.severity.toUpperCase()}</span>
          <span style="font-weight:700;font-size:.85rem">${d.field}</span>
          <span style="margin-left:auto;font-size:.72rem;color:var(--text-muted)">${d.affected.toLocaleString()} affected</span>
        </div>
        <div style="display:flex;gap:.75rem;font-size:.78rem;margin-bottom:.3rem">
          <div style="flex:1;padding:3px 7px;background:#fee2e2;border-radius:4px;color:#991b1b">− OLD: ${d.old}</div>
          <div style="flex:1;padding:3px 7px;background:#dcfce7;border-radius:4px;color:#166534">+ NEW: ${d.new}</div>
        </div>
      </div>
    `).join('')}
  </div>
  <div class="card anim">
    <div class="card-title" style="margin-bottom:.625rem">Upload New Guideline PDF</div>
    <div class="upload-zone" onclick="toast('📄 Guideline PDF uploaded. OCR extraction + diff will run automatically.')" style="min-height:70px">
      <div class="upload-ico">📋</div>
      <div style="font-weight:600">Drop Official Guideline PDF here</div>
      <div style="font-size:.75rem;color:var(--text-muted)">System OCRs, parses rules, generates diff vs active version</div>
    </div>
  </div>`;
}

// ─── NEW ADMIN TAB: AUDIT DOSSIER EXPORT ───────────────────────────────────────
// Hash-chained audit records + one-click RTI compliance dossier export
function renderDossierExport() {
  const cases = [
    { id:'NFST-2026-04817', name:'Meena Soren',  scheme:'NFST 2026–27', stage:'Selected', events:18, hash:'a3f9c2…d81e', risk:'Low'    },
    { id:'NFST-2026-04823', name:'Ramesh Munda', scheme:'NFST 2026–27', stage:'Deficient',events:11, hash:'b7e1d4…c29a', risk:'Medium' },
    { id:'NOS-2026-00142',  name:'Sunita Lakra', scheme:'NOS 2026–27',  stage:'Scrutiny', events:7,  hash:'f2a84c…1b63', risk:'High'   },
  ];
  const contents = [
    ['📋','Policy Snapshot','Scheme version + all rules at submission time'],
    ['📁','Document Bundle','All uploaded files with SHA-256 checksums'],
    ['🔍','OCR Evidence','Extracted fields + confidence + source regions'],
    ['⚖️','Rule Evaluation','Pass/fail per rule with cited evidence'],
    ['🕒','Status Timeline','All transitions with actor, timestamp, remarks'],
    ['🔐','Hash Chain','Linked-hash chain for tamper detection'],
    ['👤','Actor Log','Every human decision with role, name, IP hash'],
    ['📊','Merit Breakdown','Score components, quota bucket, final rank'],
  ];
  return `
  <div class="page-hd"><h1>Audit Dossier Export</h1><p>Generate downloadable, reproducible decision bundles for RTI compliance, appeals &amp; Ministry oversight</p></div>
  <div class="alert alert-info anim"><span class="alert-icon">📦</span>
    <div class="alert-body">An <strong>Audit Dossier</strong> is a single downloadable bundle: policy version at submission · all documents (with hashes) · OCR extraction · rule evaluation evidence · every status transition with actor, timestamp, remarks · the full hash-chain. Designed for RTI, appeal review and Ministry oversight.</div>
  </div>
  <div class="card anim" style="padding:0;margin-bottom:1rem">
    <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div style="font-weight:800;font-size:.9rem">Select Applications</div>
      <div style="display:flex;gap:.5rem">
        <button class="btn btn-outline btn-sm" onclick="toast('📦 Batch dossier queued — 3 applications.')">📦 Export Selected</button>
        <button class="btn btn-navy btn-sm" onclick="toast('🔐 Full scheme export initiated — NFST 2026. Est. 12 min.')">🔐 Full Scheme Export</button>
      </div>
    </div>
    ${cases.map(c=>`
      <div style="padding:.625rem 1rem;border-bottom:1px solid var(--border-light);display:flex;align-items:center;gap:.875rem;font-size:.82rem">
        <input type="checkbox" checked style="accent-color:var(--navy)">
        <div style="flex:1">
          <div style="font-weight:700">${c.name} <span class="badge badge-submitted" style="font-size:.65rem">${c.id}</span></div>
          <div style="color:var(--text-muted)">${c.scheme} · ${c.stage} · ${c.events} audit events</div>
          <div style="font-size:.7rem;font-family:monospace;color:var(--text-muted);margin-top:2px">Hash: ${c.hash}</div>
        </div>
        <span class="badge ${c.risk==='High'?'badge-rejected':c.risk==='Medium'?'badge-deficient':'badge-selected'}">${c.risk}</span>
        <div style="display:flex;gap:.35rem">
          <button class="btn btn-outline btn-xs" onclick="toast('📄 Dossier for ${c.id}: PDF 12p + JSON chain + SHA-256 manifest.')">📄 Export</button>
          <button class="btn btn-ghost btn-xs" onclick="toast('🔐 Hash chain verified — ${c.events} events intact.')">🔐 Verify</button>
        </div>
      </div>
    `).join('')}
  </div>
  <div class="card anim">
    <div class="card-title" style="margin-bottom:.625rem">Dossier Contents (per application)</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:.625rem;font-size:.8rem">
      ${contents.map(([ico,title,desc])=>`
        <div style="padding:.5rem .625rem;background:var(--bg);border-radius:7px">
          <div style="font-size:1.1rem;margin-bottom:3px">${ico}</div>
          <div style="font-weight:700">${title}</div>
          <div style="color:var(--text-muted);font-size:.72rem">${desc}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ─── INIT ────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  render();
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&APP.chatOpen)toggleChat();
    if(e.altKey&&e.key==='1'){const m=document.querySelector('#main-content');if(m){m.setAttribute('tabindex','-1');m.focus();}}
  });
});
