export type AppRole = "citizen" | "manager";

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: AppRole;
  points: number;
  badges: string[];
  language: string;
}

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: "Pothole & Roads" | "Water & Leakage" | "Waste Management" | "Streetlights" | "Public Infrastructure";
  status: "reported" | "verified" | "dispatched" | "resolved";
  imageUrl: string;
  latitude: number;
  longitude: number;
  plusCode: string;
  vulnerabilityWeight: number;
  conflictFlag: boolean;
  conflictDetail?: string;
  reporterId: string;
  reporterName: string;
  votes: string[];
  crewAssigned?: string;
  createdAt: string;
  resolvedAt?: string;
}

export interface CivicSchedule {
  id: string;
  department: string;
  task: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;
}

export interface OptimizedRoute {
  crewName: string;
  fuelEfficiencyRating: string;
  travelDistanceKm: number;
  crewSize: number;
  issueCount: number;
  startTime: string;
  estimatedFinishTime: string;
  tasks: {
    issueId: string;
    title: string;
    category: string;
    latitude: number;
    longitude: number;
    sequence: number;
    eta: string;
    estimatedResolutionTime: string;
    serviceTimeMinutes: number;
    weight: number;
    priorityReason: string;
  }[];
}

export interface MaterialForecastItem {
  name: string;
  quantityRequired: string;
  unit: string;
  bulkCost: number;
  savingRatePercent: number;
  leadTimeWeeks: number;
}

export interface MaterialForecast {
  materials: MaterialForecastItem[];
  totalCost: number;
  volumeSavings: number;
  marketInsight: string;
}

// Complete UI Translations for our Localization Engine
export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: "CivicPulse",
    tagline: "Empowering communities through AI-orchestrated infrastructure tracking",
    signIn: "Sign In",
    signUp: "Create Account",
    fullName: "Full Name",
    username: "Username",
    password: "Password",
    chooseLanguage: "Choose Language",
    roleCitizen: "Citizen Report Portal",
    roleManager: "Municipal Manager & Authority",
    logout: "Log Out",
    reportIssue: "Report New Issue",
    issueTitle: "Issue Title (e.g., Water leakage, Pothole)",
    issueDesc: "Detail Description (What is the damage or hazard?)",
    selectCategory: "Select Category",
    mapLabel: "Tap on the Grid Map to Pin Location Coordinates",
    submitReport: "Submit Geotagged AI Triage Report",
    verify: "Verify Issue",
    verified: "Verified",
    activeIssues: "Active Community Feed",
    resolved: "Resolved Issues",
    statusReported: "Reported (Awaiting Verification)",
    statusVerified: "Verified (Dispatched to Crews)",
    statusDispatched: "Active (Crews Dispatched)",
    statusResolved: "Resolved (Repaired)",
    points: "Points",
    badges: "Badges Earned",
    potholesRoads: "Pothole & Roads",
    waterLeakage: "Water & Leakage",
    wasteManagement: "Waste Management",
    streetlights: "Streetlights",
    publicInfra: "Public Infrastructure",
    gamificationTitle: "My Civic Impact Profile",
    soundTester: "Sub-Surface Acoustic Leak Detection",
    edgeOffline: "Low-Connectivity Edge Sync Simulation",
    soundStart: "Place on Hydrant & Scan Acoustic Vibration",
    soundScanning: "Analyzing audio frequencies...",
    soundSuccess: "Water escape sound identified! Hailline fracture leak registered at Rajpur Crossing.",
    edgeReporting: "Simulate Offline Disconnected Report",
    edgeOnlineSync: "Satellite Mega-Constellation Sync Triggered",
    conflictHalt: "Conflict Halt Alert",
    unresolvedHeading: "Outstanding Civic Issues",
    optimizeBtn: "AI Route & Crew Fuel-Efficiency Pathing",
    forecastBtn: "Predictive 6-Month Budget & Supply Forecasting",
    materialList: "Predictive Bulk Procurement Requirements",
    interopLog: "Semantic Interoperability Database Log",
    insarMonitoring: "InSAR sub-mm Surface Sinking Heatmap",
    diagnosticsTitle: "Simulation of Features based on sensor data",
    plusCodeLabel: "Synthetic Open Grid Plus Code",
    equityWeightLabel: "Equity-Weighted dispatch triage factor",
    vulnerabilityLabel: "Vulnerability Weight",
    pavingHalted: "Halted to prevent redundancy"
  },
  hi: {
    title: "नागरिक गूंज (CivicPulse)",
    tagline: "एआई-द्वारा संचालित बुनियादी ढांचा ट्रैकिंग के माध्यम से समुदायों का सशक्तिकरण",
    signIn: "लॉग इन करें",
    signUp: "खाता बनाएं",
    fullName: "पूरा नाम",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    chooseLanguage: "भाषा चुनें",
    roleCitizen: "नागरिक रिपोर्ट पोर्टल",
    roleManager: "नगरपालिका प्रबंधक और उच्च अधिकारी",
    logout: "लॉग आउट करें",
    reportIssue: "नई समस्या की रिपोर्ट करें",
    issueTitle: "समस्या का शीर्षक (जैसे, पानी का रिसाव, गड्ढा)",
    issueDesc: "विस्तृत विवरण (नुकसान या खतरा क्या है?)",
    selectCategory: "श्रेणी चुनें",
    mapLabel: "स्थान निर्देशांक पिन करने के लिए ग्रिड मानचित्र पर टैप करें",
    submitReport: "भू-टैग की गई एआई रिपोर्ट जमा करें",
    verify: "सत्यापित करें",
    verified: "सत्यापित",
    activeIssues: "सक्रिय सामुदायिक फीड",
    resolved: "हल की गई समस्याएं",
    statusReported: "रिपोर्ट की गई (सत्यापन की प्रतीक्षा)",
    statusVerified: "सत्यापित (क्रू को भेजी गई)",
    statusDispatched: "सक्रिय (क्रू काम पर है)",
    statusResolved: "हल की गई (मरम्मत पूर्ण)",
    points: "अंक",
    badges: "अर्जित बैच",
    potholesRoads: "सड़क और गड्ढे",
    waterLeakage: "पानी और रिसाव",
    wasteManagement: "कचरा प्रबंधन",
    streetlights: "स्ट्रीटलाइट्स",
    publicInfra: "सार्वजनिक बुनियादी ढांचा",
    gamificationTitle: "मेरा नागरिक प्रभाव प्रोफाइल",
    soundTester: "उप-सतह ध्वनिक रिसाव पहचान",
    edgeOffline: "कम-कनेक्टिविटी ऑफ़लाइन सिंक सिमुलेशन",
    soundStart: "हाइड्रेंट पर रखें और ध्वनिक स्कैन करें",
    soundScanning: "ऑडियो आवृत्तियों का विश्लेषण कर रहा है...",
    soundSuccess: "पानी निकलने की आवाज पहचानी गई! राजपुर क्रॉसिंग पर रिसाव दर्ज किया गया।",
    edgeReporting: "ऑफ़लाइन डिस्कनेक्टेड रिपोर्ट सिमुलेट करें",
    edgeOnlineSync: "सैटेलाइट मेगा-कॉन्स्टेलेशन सिंक ट्रिगर किया गया",
    conflictHalt: "टकराव चेतावनी",
    unresolvedHeading: "लंबित नागरिक समस्याएं",
    optimizeBtn: "एआई रूट और क्रू ईंधन-दक्षता पाथिंग",
    forecastBtn: "6-महीने का बजट और आपूर्ति पूर्वानुमान",
    materialList: "थोक खरीद आवश्यकताएं",
    interopLog: "डेटाबेस इंटरऑपरेबिलिटी लॉग",
    insarMonitoring: "InSAR सतह धंसने का हीटमैप",
    diagnosticsTitle: "सेंसर डेटा के आधार पर सुविधाओं का अनुकरण",
    plusCodeLabel: "सिंथेटिक ओपन ग्रिड प्लस कोड",
    equityWeightLabel: "इक्विटी-भारित प्रेषण प्राथमिकता",
    vulnerabilityLabel: "गंभीरता स्तर",
    pavingHalted: "दोहरे काम को रोकने के लिए रोका गया"
  },
  bn: {
    title: "নাগরিক প্রতিধ্বনি (CivicPulse)",
    tagline: "এআই-পরিচালিত অবকাঠামো ট্র্যাকিংয়ের মাধ্যমে সম্প্রদায়ের ক্ষমতায়ন",
    signIn: "লগ ইন করুন",
    signUp: "অ্যাকাউন্ট তৈরি করুন",
    fullName: "সম্পূর্ণ নাম",
    username: "ইউজারনেম",
    password: "পাসওয়ার্ড",
    chooseLanguage: "ভাষা নির্বাচন করুন",
    roleCitizen: "নাগরিক রিপোর্ট পোর্টাল",
    roleManager: "পৌরসভার ম্যানেজার এবং উচ্চ কর্তৃপক্ষ",
    logout: "লগ আউট",
    reportIssue: "নতুন সমস্যার রিপোর্ট করুন",
    issueTitle: "সমস্যার শিরোনাম (যেমন, জলের ফুটো, গর্ত)",
    issueDesc: "বিস্তারিত বিবরণ (ক্ষতি বা বিপদ কি?)",
    selectCategory: "বিভাগ নির্বাচন করুন",
    mapLabel: "অবস্থান স্থানাঙ্ক পিন করতে গ্রিড মানচিত্রে আলতো চাপুন",
    submitReport: "জিও-ট্যাগযুক্ত এআই রিপোর্ট জমা দিন",
    verify: "যাচাই করুন",
    verified: "যাচাইকৃত",
    activeIssues: "সক্রিয় সামাজিক ফিড",
    resolved: "সমাধানকৃত সমস্যা",
    statusReported: "রিপোর্ট করা হয়েছে (যাচাইকরণ বাকি)",
    statusVerified: "যাচাইকৃত (ক্রু পাঠানো হয়েছে)",
    statusDispatched: "সক্রিয় (ক্রু কর্মরত আছে)",
    statusResolved: "সমাধান হয়েছে (মেরামত সম্পূর্ণ)",
    points: "পয়েন্ট",
    badges: "অর্জিত ব্যাজ",
    potholesRoads: "রাস্তা ও গর্ত",
    waterLeakage: "জল ও ফুটো",
    wasteManagement: "বর্জ্য ব্যবস্থাপনা",
    streetlights: "রাস্তার আলো",
    publicInfra: "পাবলিক পরিকাঠামো",
    gamificationTitle: "আমার নাগরিক প্রোফাইল",
    soundTester: "শাব্দিক ফুটো সনাক্তকরণ",
    edgeOffline: "অফলাইন সিঙ্ক সিমুলেশন",
    soundStart: "হাইড্রেস্টে শাব্দিক স্ক্যান করুন",
    soundScanning: "অডিও ফ্রিকোয়েন্সি বিশ্লেষণ করা হচ্ছে...",
    soundSuccess: "জল ফুটো শব্দ সনাক্ত হয়েছে! রাজপুর ক্রসিংয়ে ফুটো নথিভুক্ত করা হয়েছে।",
    edgeReporting: "অফলাইন রিপোর্ট সিমুলেট করুন",
    edgeOnlineSync: "স্যাটেলাইট সিঙ্ক ট্রিগার করা হয়েছে",
    conflictHalt: "বিরোধ সতর্কতা",
    unresolvedHeading: "অমীমাংসিত নাগরিক সমস্যা",
    optimizeBtn: "এআই রুট অপ্টিমাইজেশান",
    forecastBtn: "৬ মাসের বাজেট ও সরবরাহ পূর্বাভাস",
    materialList: "পাইকারি ক্রয়ের প্রয়োজনীয়তা",
    interopLog: "ডেটাবেস ইন্টারঅপারেবিলিটি লগ",
    insarMonitoring: "InSAR পৃষ্ঠ ডেবে যাওয়ার তাপচিত্র",
    diagnosticsTitle: "সেন্সর ডেটার উপর ভিত্তি করে বৈশিষ্ট্যগুলির সিমুলেশন",
    plusCodeLabel: "সিন্থেটিক ওপেন গ্রিড প্লাস কোড",
    equityWeightLabel: "ইকুইটি-ভারী প্রেরণ অগ্রাধিকার",
    vulnerabilityLabel: "ঝুঁকির গুরুত্ব",
    pavingHalted: "পুনরাবৃত্তি এড়াতে কাজ বন্ধ"
  },
  ta: {
    title: "சிவிக் எக்கோ (CivicPulse)",
    tagline: "AI-இயக்கப்பட்ட உள்கட்டமைப்பு கண்காணிப்பு மூலம் சமூகங்களை மேம்படுத்துதல்",
    signIn: "உள்நுழைக",
    signUp: "கணக்கை உருவாக்கு",
    fullName: "முழு பெயர்",
    username: "பயனர் பெயர்",
    password: "கடவுச்சொல்",
    chooseLanguage: "மொழியைத் தேர்வுசெய்",
    roleCitizen: "குடிமகன் புகார் போர்டல்",
    roleManager: "நகராட்சி மேலாளர் மற்றும் அதிகாரிகள்",
    logout: "வெளியேறு",
    reportIssue: "புதிய புகாரை சமர்ப்பி",
    issueTitle: "பிரச்சனை தலைப்பு (எ.கா. நீர் கசிவு, பள்ளம்)",
    issueDesc: "விவரம் (என்ன சேதம் அல்லது ஆபத்து?)",
    selectCategory: "வகையைத் தேர்ந்தெடுக்கவும்",
    mapLabel: "இருப்பிடத்தை தேர்வு செய்ய வரைபடத்தில் தட்டவும்",
    submitReport: "AI புவிக்குறியிடப்பட்ட அறிக்கையை சமர்ப்பி",
    verify: "சரிபார்",
    verified: "சரிபார்க்கப்பட்டது",
    activeIssues: "சமூக புகார்கள்",
    resolved: "தீர்க்கப்பட்ட புகார்கள்",
    statusReported: "புகாரளிக்கப்பட்டது (சரிபார்ப்புக்கு காத்திருக்கிறது)",
    statusVerified: "சரிபார்க்கப்பட்டது (குழு நியமிக்கப்பட்டது)",
    statusDispatched: "செயலில் உள்ளது (குழு வேலை செய்கிறது)",
    statusResolved: "தீர்வு காணப்பட்டது (பழுதுபார்க்கப்பட்டது)",
    points: "புள்ளிகள்",
    badges: "பெற்ற பேட்ஜ்கள்",
    potholesRoads: "சாலை மற்றும் பள்ளங்கள்",
    waterLeakage: "நீர் மற்றும் கசிவு",
    wasteManagement: "கழிவு மேலாண்மை",
    streetlights: "தெருவிளக்குகள்",
    publicInfra: "பொது உள்கட்டமைப்பு",
    gamificationTitle: "எனது சிவிக் தாக்க சுயவிவரம்",
    soundTester: "ஒலி அலை கசிவு கண்டறிதல்",
    edgeOffline: "ஆஃப்லைன் ஒத்திசைவு உருவகப்படுத்துதல்",
    soundStart: "ஒலி அலை ஸ்கேன் செய்ய தட்டவும்",
    soundScanning: "ஒலி அலை பகுப்பாய்வு செய்யப்படுகிறது...",
    soundSuccess: "நீர் கசிவு ஒலி கண்டறியப்பட்டது! ராஜ்பூர் சந்திப்பில் கசிவு பதிவானது.",
    edgeReporting: "ஆஃப்லைன் புகாரை உருவாக்கவும்",
    edgeOnlineSync: "சாட்டிலைட் ஒத்திசைவு இயக்கப்பட்டது",
    conflictHalt: "திட்ட முரண்பாடு எச்சரிக்கை",
    unresolvedHeading: "தீர்க்கப்படாத பொது பிரச்சனைகள்",
    optimizeBtn: "AI சிறந்த பாதை தேர்வு",
    forecastBtn: "6 மாத பொருட்கள் மற்றும் நிதி கணிப்பு",
    materialList: "மொத்த கொள்முதல் தேவைகள்",
    interopLog: "தரவுத்தள ஒருங்கிணைப்பு பதிவு",
    insarMonitoring: "InSAR நிலத்தடி அமிழ்வு வரைபடம்",
    diagnosticsTitle: "சென்சார் தரவுகளின் அடிப்படையில் அம்சங்களின் உருவகப்படுத்துதல்",
    plusCodeLabel: "செயற்கை பிளஸ் குறியீடு",
    equityWeightLabel: "சமூக சமத்துவம் சார்ந்த முன்னுரிமை",
    vulnerabilityLabel: "பாதிப்பு எடை",
    pavingHalted: "இரட்டை செலவை தடுக்க நிறுத்தம்"
  },
  te: {
    title: "సివిక్ ఎకో (CivicPulse)",
    tagline: "AI-ఆధారిత మౌలిక సదుపాయాల పర్యవేక్షణ ద్వారా సమాజ సేవ",
    signIn: "లాగిన్ అవ్వండి",
    signUp: "ఖాతా సృష్టించండి",
    fullName: "పూర్తి పేరు",
    username: "వినియోగదారు పేరు",
    password: "పాస్వర్డ్",
    chooseLanguage: "భాషను ఎంచుకోండి",
    roleCitizen: "పౌరుల ఫిర్యాదుల పోర్టల్",
    roleManager: "మునిసిపల్ మేనేజర్ మరియు అధికారులు",
    logout: "లాగ్ అవుట్",
    reportIssue: "కొత్త ఫిర్యాదు సమర్పించండి",
    issueTitle: "సమస్య శీర్షిక (ఉదా. నీటి లీకేజీ, గుంత)",
    issueDesc: "వివరాలు (ఏమి నష్టం లేదా ప్రమాదం ఉంది?)",
    selectCategory: "వర్గాన్ని ఎంచుకోండి",
    mapLabel: "స్థానాన్ని గుర్తించడానికి మ్యాప్ పై నొక్కండి",
    submitReport: "AI ద్వారా భౌగోళిక నివేదిక సమర్పించు",
    verify: "ధృవీకరించు",
    verified: "ధృవీకరించబడింది",
    activeIssues: "సక్రియ సామాజిక నివేదికలు",
    resolved: "పరిష్కరించబడిన సమస్యలు",
    statusReported: "నివేదించబడింది (ధృవీకరణ కోసం ఎదురుచూస్తోంది)",
    statusVerified: "ధృవీకరించబడింది (సిబ్బంది కేటాయించబడింది)",
    statusDispatched: "సక్రియంగా ఉంది (సిబ్బంది పనిలో ఉన్నారు)",
    statusResolved: "పరిష్కరించబడింది (మరమ్మత్తు పూర్తి)",
    points: "పాయింట్లు",
    badges: "పొందిన బ్యాడ్జ్‌లు",
    potholesRoads: "రోడ్లు & గుంతలు",
    waterLeakage: "నీరు & లీకేజీ",
    wasteManagement: "వ్యర్థాల నిర్వహణ",
    streetlights: "వీధి దీపాలు",
    publicInfra: "పబ్లిక్ మౌలిక సదుపాయాలు",
    gamificationTitle: "నా సామాజిక ప్రభావ ప్రొఫైల్",
    soundTester: "సబ్-సర్ఫేస్ ఎకౌస్టిక్ లీక్ డిటెక్షన్",
    edgeOffline: "ఆఫ్‌లైన్ సమకాలీకరణ అనుకరణ",
    soundStart: "స్కాన్ చేయడానికి నొక్కండి",
    soundScanning: "ధ్వని తరంగాల విశ్లేషణ జరుగుతోంది...",
    soundSuccess: "నీటి లీకేజీ శబ్దం గుర్తించబడింది! రాజ్‌పూర్ క్రాసింగ్ వద్ద లీక్ నమోదైంది.",
    edgeReporting: "ఆఫ్‌లైన్ ఫిర్యాదును సమర్పించండి",
    edgeOnlineSync: "శాటిలైట్ సమకాలీకరణ ప్రారంభించబడింది",
    conflictHalt: "నిర్మాణ వివాదాల హెచ్చరిక",
    unresolvedHeading: "పరిష్కారం కాని ప్రజా సమస్యలు",
    optimizeBtn: "AI ద్వారా సమర్థవంతమైన మార్గాల అమరిక",
    forecastBtn: "6 నెలల మెటీరియల్స్ & బడ్జెట్ అంచనా",
    materialList: "మొత్తం కొనుగోలు అవసరాలు",
    interopLog: "డేటాబేస్ అనుసంధాన లాగ్",
    insarMonitoring: "InSAR ఉపరితల అణచివేత హీట్‌మ్యాప్",
    diagnosticsTitle: "సెన్సార్ డేటా ఆధారంగా ఫీచర్ల అనుకరణ",
    plusCodeLabel: "సింథటిక్ ప్లస్ కోడ్",
    equityWeightLabel: "సామాజిక ప్రాధాన్యత బరువు",
    vulnerabilityLabel: "సమస్య తీవ్రత బరువు",
    pavingHalted: "రెండుసార్లు ఖర్చు కాకుండా నిలుపుదల"
  },
  mr: {
    title: "नागरिक गूंज (CivicPulse)",
    tagline: "एआय-चलित पायाभूत सुविधा ट्रॅकिंगद्वारे समुदायांचे सक्षमीकरण",
    signIn: "लॉग इन करा",
    signUp: "खाते तयार करा",
    fullName: "पूर्ण नाव",
    username: "वापरकर्तानाव",
    password: "पासवर्ड",
    chooseLanguage: "भाषा निवडा",
    roleCitizen: "नागरिक तक्रार पोर्टल",
    roleManager: "महानगरपालिका व्यवस्थापक आणि वरिष्ठ अधिकारी",
    logout: "लॉग आउट",
    reportIssue: "नवीन तक्रार नोंदवा",
    issueTitle: "तक्रार शीर्षक (उदा. पाण्याचा विसर्ग, खड्डा)",
    issueDesc: "तपशीलवार वर्णन (नुकसान किंवा धोका काय आहे?)",
    selectCategory: "श्रेणी निवडा",
    mapLabel: "स्थान निश्चित करण्यासाठी नकाशावर टॅप करा",
    submitReport: "भू-टॅग केलेला एआय अहवाल सबमिट करा",
    verify: "सत्यापित करा",
    verified: "सत्यापित",
    activeIssues: "सक्रिय तक्रारी फीड",
    resolved: "निकाली काढलेल्या तक्रारी",
    statusReported: "तक्रार प्राप्त (सत्यापनाची प्रतीक्षा)",
    statusVerified: "सत्यापित (टीम रवाना केली)",
    statusDispatched: "सक्रिय (काम प्रगतीपथावर आहे)",
    statusResolved: "निकाली काढली (दुरुस्ती पूर्ण)",
    points: "गुण",
    badges: "मिळालेले बॅज",
    potholesRoads: "रस्ते आणि खड्डे",
    waterLeakage: "पाणी आणि गळती",
    wasteManagement: "कचरा व्यवस्थापन",
    streetlights: "पथदिवे",
    publicInfra: "सार्वजनिक पायाभूत सुविधा",
    gamificationTitle: "माझे नागरिक प्रभाव प्रोफाइल",
    soundTester: "उप-पृष्ठभाग ध्वनिक गळती शोध",
    edgeOffline: "कमी कनेक्टिव्हिटी ऑफलाइन सिंक",
    soundStart: "स्कॅन करण्यासाठी टॅप करा",
    soundScanning: "ध्वनी फ्रिक्वेन्सीचे विश्लेषण करत आहे...",
    soundSuccess: "पाण्याच्या गळतीचा आवाज सापडला! राजपूर क्रॉसिंग येथे गळती नोंदवली.",
    edgeReporting: "ऑफलाइन तक्रार सबमिट करा",
    edgeOnlineSync: "सॅटेलाईट सिंक सुरू झाले",
    conflictHalt: "कामातील परस्परविरोधी इशारा",
    unresolvedHeading: "प्रलंबित नागरी समस्या",
    optimizeBtn: "एआय मार्ग आणि कार्यक्षमता ऑप्टिमायझेशन",
    forecastBtn: "६ महिन्यांचे साहित्य आणि बजेट अंदाज",
    materialList: "थोक खरेदी आवश्यकता",
    interopLog: "डेटाबेस इंटरऑपरेबिलिटी लॉग",
    insarMonitoring: "InSAR पृष्ठभाग खचणे नकाशा",
    diagnosticsTitle: "सेन्सर डेटावर आधारित वैशिष्ट्यांचे सिम्युलेशन",
    plusCodeLabel: "सिंथेटिक प्लस कोड",
    equityWeightLabel: "सामाजिक समानता प्राधान्य",
    vulnerabilityLabel: "गंभीरता तीव्रता",
    pavingHalted: "दोनदा खर्च टाळण्यासाठी काम थांबवले"
  }
};
