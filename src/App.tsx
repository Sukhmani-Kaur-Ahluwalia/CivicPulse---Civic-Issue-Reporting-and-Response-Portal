import React, { useState, useEffect } from "react";
import {
  User,
  CivicIssue,
  CivicSchedule,
  OptimizedRoute,
  MaterialForecast
} from "./types";
import MapGrid from "./components/MapGrid";
import SoundTester from "./components/SoundTester";
import SocioeconomicTriage from "./components/SocioeconomicTriage";
import SemanticLayer from "./components/SemanticLayer";
import SatelliteInSAR from "./components/SatelliteInSAR";
import {
  Compass,
  ShieldCheck,
  Activity,
  Database,
  AlertTriangle,
  TrendingUp,
  User as UserIcon,
  Lock,
  Plus,
  MapPin,
  Sparkles,
  Check,
  FileText,
  AlertCircle,
  Calendar,
  Truck,
  LogOut,
  ChevronRight,
  TrendingDown,
  Info,
  Layers,
  RefreshCw,
  Camera,
  Video,
  Image
} from "lucide-react";

const SESSION_STORAGE_KEY = "civicpulse.currentUser";

const UI_TEXT: Record<string, Record<string, string>> = {
  en: {
    title: "CivicPulse",
    tagline: "Report local problems and help the city fix them faster.",
    signIn: "Sign In",
    signUp: "Create Account",
    fullName: "Full Name",
    username: "Username",
    password: "Password",
    chooseLanguage: "Choose Language",
    roleCitizen: "Citizen Portal",
    roleManager: "Municipal Manager",
    logout: "Log Out",
    reportIssue: "Report New Issue",
    issueTitle: "Issue Title",
    issueDesc: "Describe the problem",
    selectCategory: "Select Category",
    mapLabel: "Choose Location on Map",
    submitReport: "Submit Report",
    verify: "Verify Issue",
    verified: "Verified",
    activeIssues: "Active Issues",
    resolved: "Resolved Issues",
    points: "Points",
    badges: "Badges",
    potholesRoads: "Roads and Potholes",
    waterLeakage: "Water Leakage",
    wasteManagement: "Garbage and Waste",
    streetlights: "Streetlights",
    publicInfra: "Public Property",
    gamificationTitle: "My Profile",
    soundTester: "Water Leak Sound Test",
    diagnosticsTitle: "Test Tools",
    plusCodeLabel: "Location Code",
    equityWeightLabel: "Priority Score",
    vulnerabilityLabel: "Risk Level",
    pavingHalted: "Stopped to avoid repeated work",
    loginHint: "Tip: use rajesh for Citizen or commissioner for Manager to see demo data.",
    loginUsernamePlaceholder: "Example: rajesh or commissioner",
    loginPasswordPlaceholder: "Enter your password",
    fullNamePlaceholder: "Enter your full name",
    usernamePlaceholder: "Choose a username",
    passwordPlaceholder: "Choose a password",
    citizenHeader: "Citizen Home",
    managerHeader: "Manager Home",
    welcomeBack: "Welcome back",
    citizenIntro: "Choose what you want to do.",
    managerIntro: "Choose a tool to check issues, planned work, or water leaks.",
    yourPoints: "Your Points",
    contributorLevel: "Contributor Level 2",
    reportCardDesc: "Report a road, water, garbage, streetlight, or public property problem.",
    mapCardTitle: "Map and Issues",
    mapCardDesc: "See nearby issues and verify problems reported by others.",
    acousticCardTitle: "Water Leak Sound Test",
    acousticCardDesc: "Test pipe sound recordings to find possible water leaks.",
    profileCardTitle: "Score and Badges",
    profileCardDesc: "See your points, badges, and citizen activity.",
    backHome: "Back to Home",
    backManagerHome: "Back to Manager Home",
    citizenReportView: "Report Issue",
    citizenMapView: "Map and Issues",
    citizenAcousticView: "Sound Test",
    citizenProfileView: "My Profile",
    stepChooseLocation: "Step 1: Choose Location",
    selectedPosition: "Selected Position",
    backToMap: "Back to Map",
    runningTriage: "Checking report...",
    reportThanks: "Thank you for reporting!",
    reportSuccessDesc: "Your report has been saved and sent to the city dashboard.",
    managerTriageTitle: "Priority Dispatch",
    managerTriageDesc: "See which problems should be fixed first.",
    managerInteropTitle: "Department Work Check",
    managerInteropDesc: "Check planned work from different departments to avoid repeated road digging.",
    managerInsarTitle: "Ground Movement Map",
    managerInsarDesc: "Check places where the ground may be moving or sinking.",
    managerAcousticTitle: "Water Leak Sound Lab",
    managerAcousticDesc: "Check sound recordings to find possible underground water leaks.",
    activeTicketsTitle: "Active City Issues",
    unresolved: "Unresolved",
    conflictHalted: "Stopped",
    resolvedToday: "Resolved",
    severityLabel: "Risk Level",
    verificationVotes: "Verification Votes",
    workSuspended: "Work Stopped",
    markResolved: "Mark as Resolved",
    repairedCompleted: "Repaired",
    triageModuleTitle: "Priority Dispatch",
    interopModuleTitle: "Department Work Check",
    insarModuleTitle: "Ground Movement Map",
    acousticModuleTitle: "Water Leak Sound Lab",
    routeTitle: "Repair Route Plan",
    routeDesc: "Plan crew routes with people count, issue order, arrival time, and expected resolution time.",
    optimizing: "Planning route...",
    optimizeRoutes: "Plan Repair Routes",
    diagnosticsDesc: "Use this test tool to check satellite ground movement data.",
    insarToolSmall: "Ground Movement",
    insarToolTitle: "Satellite Ground Check",
    insarToolDesc: "Use radar data to check if land near roads or bridges is moving.",
    insarMonitoring: "Satellite Ground Movement Check",
    activateTool: "Open Tool",
    commandAlert: "City Alert",
    ok: "OK",
    footer: "CivicPulse. Built with Google AI Studio.",
    footerGrid: "India Civic Tracking Grid",
    requiredFields: "Please fill out all fields.",
    passwordTooShort: "Password must be at least 6 characters long.",
    loginRequired: "Username and password are required.",
    sortByReports: "Sort by Reports",
    sortByPriority: "Sort by Priority",
    rank: "Rank",
    issueAndPlace: "Issue and Place",
    areaCrowd: "Area Crowd",
    otherOption: "Other Option",
    reports: "Reports",
    priorityScore: "Priority Score",
    priorityHelp: "Teams are sent first where the problem is serious and people have fewer other options.",
    gpsNotSupported: "Your browser cannot get location.",
    gpsUnavailable: "Location is not available. Showing default area.",
    mapHelp: "Click on the map to choose the problem location.",
    locating: "Finding...",
    findMe: "Find Me",
    liveGpsMap: "Live GPS Map",
    gpsActive: "GPS is active",
    uploadMedia: "Upload Image / Video",
    departmentCheckDesc: "This checks work planned by different departments, so the same road is not dug again.",
    waterBoardDb: "Water Department Data",
    electricityDb: "Electricity Department Data",
    pavingDb: "Road Repair Data",
    departmentFeed: "Department Match Log",
    departmentFeedOne: "Checking water work near Rajpur Road.",
    departmentFeedTwo: "Checking road repair work in the same place.",
    departmentWarning: "Repeated digging found on Rajpur Main Road.",
    departmentWarningDesc: "Road repair is planned before water pipe work. Repair is stopped first, so the road is not repaired and dug again later.",
    soundLabTitle: "Water Leak Sound Lab",
    soundLabSubtitle: "Find possible pipe leaks from sound.",
    soundLabDesc: "Use an uploaded sound file or a sample sound. The app checks if the sound looks like a water leak.",
    waveformMonitor: "Sound Wave",
    frequency: "Frequency",
    analyzingSound: "Checking sound...",
    uploadAudio: "Upload Sound File",
    uploadAudioDesc: "Upload a pipe or hydrant sound recording.",
    audioTrack: "Audio File",
    clickUpload: "Click to upload",
    fileTypes: "Supports WAV, MP3, M4A, FLAC",
    analyzeUpload: "Check Uploaded Sound",
    sampleSounds: "Sample Sounds",
    sampleSoundsDesc: "Choose a sample sound to test this tool.",
    runSampleScan: "Check Sample Sound",
    pipeSafe: "Pipe Looks Safe",
    pipeSafeDesc: "No leak-like sound was found. No action is needed.",
    clearScan: "Clear and Check New Sound",
    leakFound: "Possible Water Leak Found",
    soundReport: "Sound Report",
    anomalyTarget: "Found Sound",
    acousticVibration: "Sound Level",
    createLeakTicket: "Create Water Leak Ticket",
    reset: "Reset"
  },
  hi: {
    title: "à¤¸à¤¿à¤µà¤¿à¤•à¤‡à¤•à¥‹",
    tagline: "à¤¸à¥à¤¥à¤¾à¤¨à¥€à¤¯ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚ à¤¬à¤¤à¤¾à¤à¤‚ à¤”à¤° à¤¶à¤¹à¤° à¤•à¥‹ à¤‰à¤¨à¥à¤¹à¥‡à¤‚ à¤œà¤²à¥à¤¦à¥€ à¤ à¥€à¤• à¤•à¤°à¤¨à¥‡ à¤®à¥‡à¤‚ à¤®à¤¦à¤¦ à¤•à¤°à¥‡à¤‚à¥¤",
    signIn: "à¤²à¥‰à¤— à¤‡à¤¨",
    signUp: "à¤–à¤¾à¤¤à¤¾ à¤¬à¤¨à¤¾à¤à¤‚",
    fullName: "à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤®",
    username: "à¤¯à¥‚à¤œà¤°à¤¨à¥‡à¤®",
    password: "à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡",
    chooseLanguage: "à¤­à¤¾à¤·à¤¾ à¤šà¥à¤¨à¥‡à¤‚",
    roleCitizen: "à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤ªà¥‹à¤°à¥à¤Ÿà¤²",
    roleManager: "à¤¨à¤—à¤°à¤ªà¤¾à¤²à¤¿à¤•à¤¾ à¤ªà¥à¤°à¤¬à¤‚à¤§à¤•",
    logout: "à¤²à¥‰à¤— à¤†à¤‰à¤Ÿ",
    reportIssue: "à¤¨à¤ˆ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤¬à¤¤à¤¾à¤à¤‚",
    issueTitle: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤•à¤¾ à¤¨à¤¾à¤®",
    issueDesc: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤²à¤¿à¤–à¥‡à¤‚",
    selectCategory: "à¤¶à¥à¤°à¥‡à¤£à¥€ à¤šà¥à¤¨à¥‡à¤‚",
    mapLabel: "à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° à¤ªà¤° à¤¸à¥à¤¥à¤¾à¤¨ à¤šà¥à¤¨à¥‡à¤‚",
    submitReport: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤­à¥‡à¤œà¥‡à¤‚",
    verify: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    verified: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤",
    activeIssues: "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚",
    resolved: "à¤¹à¤² à¤•à¥€ à¤—à¤ˆ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚",
    points: "à¤…à¤‚à¤•",
    badges: "à¤¬à¥ˆà¤œ",
    potholesRoads: "à¤¸à¤¡à¤¼à¤• à¤”à¤° à¤—à¤¡à¥à¤¢à¥‡",
    waterLeakage: "à¤ªà¤¾à¤¨à¥€ à¤•à¤¾ à¤°à¤¿à¤¸à¤¾à¤µ",
    wasteManagement: "à¤•à¤šà¤°à¤¾",
    streetlights: "à¤¸à¥à¤Ÿà¥à¤°à¥€à¤Ÿ à¤²à¤¾à¤‡à¤Ÿ",
    publicInfra: "à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿",
    gamificationTitle: "à¤®à¥‡à¤°à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤²",
    soundTester: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿ à¤œà¤¾à¤‚à¤š",
    diagnosticsTitle: "à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤Ÿà¥‚à¤²",
    plusCodeLabel: "à¤¸à¥à¤¥à¤¾à¤¨ à¤•à¥‹à¤¡",
    equityWeightLabel: "à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¸à¥à¤•à¥‹à¤°",
    vulnerabilityLabel: "à¤œà¥‹à¤–à¤¿à¤® à¤¸à¥à¤¤à¤°",
    pavingHalted: "à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤•à¤¾à¤® à¤°à¥‹à¤•à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¬à¤‚à¤¦",
    loginHint: "à¤Ÿà¤¿à¤ª: à¤¡à¥‡à¤®à¥‹ à¤¡à¥‡à¤Ÿà¤¾ à¤¦à¥‡à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ Citizen à¤®à¥‡à¤‚ rajesh à¤¯à¤¾ Manager à¤®à¥‡à¤‚ commissioner à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤",
    loginUsernamePlaceholder: "à¤‰à¤¦à¤¾à¤¹à¤°à¤£: rajesh à¤¯à¤¾ commissioner",
    loginPasswordPlaceholder: "à¤…à¤ªà¤¨à¤¾ à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤¡à¤¾à¤²à¥‡à¤‚",
    fullNamePlaceholder: "à¤…à¤ªà¤¨à¤¾ à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤® à¤¡à¤¾à¤²à¥‡à¤‚",
    usernamePlaceholder: "à¤¯à¥‚à¤œà¤°à¤¨à¥‡à¤® à¤šà¥à¤¨à¥‡à¤‚",
    passwordPlaceholder: "à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤šà¥à¤¨à¥‡à¤‚",
    citizenHeader: "à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤¹à¥‹à¤®",
    managerHeader: "à¤®à¥ˆà¤¨à¥‡à¤œà¤° à¤¹à¥‹à¤®",
    welcomeBack: "à¤µà¤¾à¤ªà¤¸à¥€ à¤ªà¤° à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ",
    citizenIntro: "à¤†à¤ª à¤•à¥à¤¯à¤¾ à¤•à¤°à¤¨à¤¾ à¤šà¤¾à¤¹à¤¤à¥‡ à¤¹à¥ˆà¤‚, à¤šà¥à¤¨à¥‡à¤‚à¥¤",
    managerIntro: "à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚, à¤¯à¥‹à¤œà¤¨à¤¾à¤¬à¤¦à¥à¤§ à¤•à¤¾à¤® à¤¯à¤¾ à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤œà¤¾à¤‚à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤Ÿà¥‚à¤² à¤šà¥à¤¨à¥‡à¤‚à¥¤",
    yourPoints: "à¤†à¤ªà¤•à¥‡ à¤…à¤‚à¤•",
    contributorLevel: "à¤¯à¥‹à¤—à¤¦à¤¾à¤¨ à¤¸à¥à¤¤à¤° 2",
    reportCardDesc: "à¤¸à¤¡à¤¼à¤•, à¤ªà¤¾à¤¨à¥€, à¤•à¤šà¤°à¤¾, à¤¸à¥à¤Ÿà¥à¤°à¥€à¤Ÿ à¤²à¤¾à¤‡à¤Ÿ à¤¯à¤¾ à¤¸à¤¾à¤°à¥à¤µà¤œà¤¨à¤¿à¤• à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿ à¤•à¥€ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤¬à¤¤à¤¾à¤à¤‚à¥¤",
    mapCardTitle: "à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° à¤”à¤° à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚",
    mapCardDesc: "à¤ªà¤¾à¤¸ à¤•à¥€ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚ à¤¦à¥‡à¤–à¥‡à¤‚ à¤”à¤° à¤¦à¥‚à¤¸à¤°à¥‹à¤‚ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",
    acousticCardTitle: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿ à¤œà¤¾à¤‚à¤š",
    acousticCardDesc: "à¤ªà¤¾à¤‡à¤ª à¤•à¥€ à¤†à¤µà¤¾à¤œ à¤¸à¥‡ à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤•à¤¾ à¤ªà¤¤à¤¾ à¤²à¤—à¤¾à¤à¤‚à¥¤",
    profileCardTitle: "à¤…à¤‚à¤• à¤”à¤° à¤¬à¥ˆà¤œ",
    profileCardDesc: "à¤…à¤ªà¤¨à¥‡ à¤…à¤‚à¤•, à¤¬à¥ˆà¤œ à¤”à¤° à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤—à¤¤à¤¿à¤µà¤¿à¤§à¤¿ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤",
    backHome: "à¤¹à¥‹à¤® à¤ªà¤° à¤µà¤¾à¤ªà¤¸",
    backManagerHome: "à¤®à¥ˆà¤¨à¥‡à¤œà¤° à¤¹à¥‹à¤® à¤ªà¤° à¤µà¤¾à¤ªà¤¸",
    citizenReportView: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ",
    citizenMapView: "à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° à¤”à¤° à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚",
    citizenAcousticView: "à¤§à¥à¤µà¤¨à¤¿ à¤œà¤¾à¤‚à¤š",
    citizenProfileView: "à¤®à¥‡à¤°à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤²",
    stepChooseLocation: "à¤šà¤°à¤£ 1: à¤¸à¥à¤¥à¤¾à¤¨ à¤šà¥à¤¨à¥‡à¤‚",
    selectedPosition: "à¤šà¥à¤¨à¤¾ à¤—à¤¯à¤¾ à¤¸à¥à¤¥à¤¾à¤¨",
    backToMap: "à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° à¤ªà¤° à¤µà¤¾à¤ªà¤¸",
    runningTriage: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤œà¤¾à¤‚à¤šà¥€ à¤œà¤¾ à¤°à¤¹à¥€ à¤¹à¥ˆ...",
    reportThanks: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤§à¤¨à¥à¤¯à¤µà¤¾à¤¦!",
    reportSuccessDesc: "à¤†à¤ªà¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤¸à¥‡à¤µ à¤¹à¥‹ à¤—à¤ˆ à¤¹à¥ˆ à¤”à¤° à¤¶à¤¹à¤° à¤•à¥‡ à¤¡à¥ˆà¤¶à¤¬à¥‹à¤°à¥à¤¡ à¤ªà¤° à¤­à¥‡à¤œ à¤¦à¥€ à¤—à¤ˆ à¤¹à¥ˆà¥¤",
    managerTriageTitle: "à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¡à¤¿à¤¸à¥à¤ªà¥ˆà¤š",
    managerTriageDesc: "à¤¦à¥‡à¤–à¥‡à¤‚ à¤•à¥Œà¤¨ à¤¸à¥€ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤ªà¤¹à¤²à¥‡ à¤ à¥€à¤• à¤•à¤°à¤¨à¥€ à¤¹à¥ˆà¥¤",
    managerInteropTitle: "à¤µà¤¿à¤­à¤¾à¤— à¤•à¤¾à¤® à¤œà¤¾à¤‚à¤š",
    managerInteropDesc: "à¤…à¤²à¤— à¤µà¤¿à¤­à¤¾à¤—à¥‹à¤‚ à¤•à¥‡ à¤•à¤¾à¤® à¤¦à¥‡à¤–à¥‡à¤‚ à¤¤à¤¾à¤•à¤¿ à¤¸à¤¡à¤¼à¤• à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤¨ à¤–à¥‹à¤¦à¥€ à¤œà¤¾à¤à¥¤",
    managerInsarTitle: "à¤œà¤®à¥€à¤¨ à¤¹à¤²à¤šà¤² à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°",
    managerInsarDesc: "à¤œà¤¹à¤¾à¤‚ à¤œà¤®à¥€à¤¨ à¤¹à¤¿à¤² à¤¯à¤¾ à¤§à¤‚à¤¸ à¤¸à¤•à¤¤à¥€ à¤¹à¥ˆ, à¤‰à¤¸à¥‡ à¤¦à¥‡à¤–à¥‡à¤‚à¥¤",
    managerAcousticTitle: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿ à¤²à¥ˆà¤¬",
    managerAcousticDesc: "à¤­à¥‚à¤®à¤¿à¤—à¤¤ à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤•à¥‡ à¤²à¤¿à¤ à¤§à¥à¤µà¤¨à¤¿ à¤°à¤¿à¤•à¥‰à¤°à¥à¤¡à¤¿à¤‚à¤— à¤œà¤¾à¤‚à¤šà¥‡à¤‚à¥¤",
    activeTicketsTitle: "à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤¶à¤¹à¤° à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤à¤‚",
    unresolved: "à¤²à¤‚à¤¬à¤¿à¤¤",
    conflictHalted: "à¤°à¥‹à¤•à¤¾ à¤—à¤¯à¤¾",
    resolvedToday: "à¤¹à¤²",
    severityLabel: "à¤œà¥‹à¤–à¤¿à¤® à¤¸à¥à¤¤à¤°",
    verificationVotes: "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¨ à¤µà¥‹à¤Ÿ",
    workSuspended: "à¤•à¤¾à¤® à¤°à¥‹à¤•à¤¾ à¤—à¤¯à¤¾",
    markResolved: "à¤¹à¤² à¤•à¥‡ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤šà¤¿à¤¨à¥à¤¹à¤¿à¤¤ à¤•à¤°à¥‡à¤‚",
    repairedCompleted: "à¤®à¤°à¤®à¥à¤®à¤¤ à¤ªà¥‚à¤°à¥€",
    triageModuleTitle: "à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¡à¤¿à¤¸à¥à¤ªà¥ˆà¤š",
    interopModuleTitle: "à¤µà¤¿à¤­à¤¾à¤— à¤•à¤¾à¤® à¤œà¤¾à¤‚à¤š",
    insarModuleTitle: "à¤œà¤®à¥€à¤¨ à¤¹à¤²à¤šà¤² à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°",
    acousticModuleTitle: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿ à¤²à¥ˆà¤¬",
    routeTitle: "à¤®à¤°à¤®à¥à¤®à¤¤ à¤®à¤¾à¤°à¥à¤— à¤¯à¥‹à¤œà¤¨à¤¾",
    routeDesc: "à¤Ÿà¥€à¤®à¥‹à¤‚ à¤•à¥‹ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¸à¤®à¤¸à¥à¤¯à¤¾à¤“à¤‚ à¤¤à¤• à¤œà¤²à¥à¤¦à¥€ à¤ªà¤¹à¥à¤‚à¤šà¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤›à¥‹à¤Ÿà¤¾ à¤°à¤¾à¤¸à¥à¤¤à¤¾ à¤¬à¤¨à¤¾à¤à¤‚à¥¤",
    optimizing: "à¤®à¤¾à¤°à¥à¤— à¤¬à¤¨ à¤°à¤¹à¤¾ à¤¹à¥ˆ...",
    optimizeRoutes: "à¤®à¤°à¤®à¥à¤®à¤¤ à¤®à¤¾à¤°à¥à¤— à¤¬à¤¨à¤¾à¤à¤‚",
    diagnosticsDesc: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤•à¥€ à¤†à¤µà¤¾à¤œ à¤”à¤° à¤œà¤®à¥€à¤¨ à¤•à¥€ à¤¹à¤²à¤šà¤² à¤œà¤¾à¤‚à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¯à¥‡ à¤Ÿà¥‚à¤² à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤",
    acousticToolSmall: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿",
    acousticToolTitle: "à¤¹à¤¾à¤‡à¤¡à¥à¤°à¥‡à¤‚à¤Ÿ à¤§à¥à¤µà¤¨à¤¿ à¤œà¤¾à¤‚à¤š",
    acousticToolDesc: "à¤ªà¤¾à¤‡à¤ª à¤®à¥‡à¤‚ à¤°à¤¿à¤¸à¤¾à¤µ à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚, à¤œà¤¾à¤‚à¤šà¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥ˆà¤‚à¤ªà¤² à¤†à¤µà¤¾à¤œ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤",
    insarToolSmall: "à¤œà¤®à¥€à¤¨ à¤¹à¤²à¤šà¤²",
    insarToolTitle: "à¤¸à¥ˆà¤Ÿà¥‡à¤²à¤¾à¤‡à¤Ÿ à¤œà¤®à¥€à¤¨ à¤œà¤¾à¤‚à¤š",
    insarToolDesc: "à¤¸à¤¡à¤¼à¤• à¤¯à¤¾ à¤ªà¥à¤² à¤•à¥‡ à¤ªà¤¾à¤¸ à¤œà¤®à¥€à¤¨ à¤¹à¤¿à¤² à¤°à¤¹à¥€ à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚, à¤œà¤¾à¤‚à¤šà¥‡à¤‚à¥¤",
    activateTool: "à¤Ÿà¥‚à¤² à¤–à¥‹à¤²à¥‡à¤‚",
    commandAlert: "à¤¶à¤¹à¤° à¤…à¤²à¤°à¥à¤Ÿ",
    ok: "à¤ à¥€à¤• à¤¹à¥ˆ",
    footer: "à¤¸à¤¿à¤µà¤¿à¤•à¤‡à¤•à¥‹. Google AI Studio à¤¸à¥‡ à¤¬à¤¨à¤¾à¤¯à¤¾ à¤—à¤¯à¤¾à¥¤",
    footerGrid: "à¤­à¤¾à¤°à¤¤ à¤¨à¤¾à¤—à¤°à¤¿à¤• à¤Ÿà¥à¤°à¥ˆà¤•à¤¿à¤‚à¤— à¤—à¥à¤°à¤¿à¤¡",
    requiredFields: "à¤•à¥ƒà¤ªà¤¯à¤¾ à¤¸à¤­à¥€ à¤œà¤¾à¤¨à¤•à¤¾à¤°à¥€ à¤­à¤°à¥‡à¤‚à¥¤",
    passwordTooShort: "à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤•à¤® à¤¸à¥‡ à¤•à¤® 6 à¤…à¤•à¥à¤·à¤° à¤•à¤¾ à¤¹à¥‹à¤¨à¤¾ à¤šà¤¾à¤¹à¤¿à¤à¥¤",
    loginRequired: "à¤¯à¥‚à¤œà¤°à¤¨à¥‡à¤® à¤”à¤° à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤œà¤°à¥‚à¤°à¥€ à¤¹à¥ˆà¥¤",
    sortByReports: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤¸à¥‡ à¤›à¤¾à¤‚à¤Ÿà¥‡à¤‚",
    sortByPriority: "à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¸à¥‡ à¤›à¤¾à¤‚à¤Ÿà¥‡à¤‚",
    rank: "à¤°à¥ˆà¤‚à¤•",
    issueAndPlace: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤”à¤° à¤¸à¥à¤¥à¤¾à¤¨",
    areaCrowd: "à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤­à¥€à¤¡à¤¼",
    otherOption: "à¤¦à¥‚à¤¸à¤°à¤¾ à¤µà¤¿à¤•à¤²à¥à¤ª",
    reports: "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ",
    priorityScore: "à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¸à¥à¤•à¥‹à¤°",
    priorityHelp: "à¤Ÿà¥€à¤® à¤ªà¤¹à¤²à¥‡ à¤µà¤¹à¤¾à¤‚ à¤œà¤¾à¤¤à¥€ à¤¹à¥ˆ à¤œà¤¹à¤¾à¤‚ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤—à¤‚à¤­à¥€à¤° à¤¹à¥ˆ à¤”à¤° à¤²à¥‹à¤—à¥‹à¤‚ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤•à¤® à¤µà¤¿à¤•à¤²à¥à¤ª à¤¹à¥ˆà¤‚à¥¤",
    gpsNotSupported: "à¤†à¤ªà¤•à¤¾ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° à¤¸à¥à¤¥à¤¾à¤¨ à¤¨à¤¹à¥€à¤‚ à¤²à¥‡ à¤¸à¤•à¤¤à¤¾à¥¤",
    gpsUnavailable: "à¤¸à¥à¤¥à¤¾à¤¨ à¤‰à¤ªà¤²à¤¬à¥à¤§ à¤¨à¤¹à¥€à¤‚ à¤¹à¥ˆà¥¤ à¤¡à¤¿à¤«à¥‰à¤²à¥à¤Ÿ à¤•à¥à¤·à¥‡à¤¤à¥à¤° à¤¦à¤¿à¤–à¤¾ à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    mapHelp: "à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤•à¤¾ à¤¸à¥à¤¥à¤¾à¤¨ à¤šà¥à¤¨à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤° à¤ªà¤° à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚à¥¤",
    locating: "à¤¢à¥‚à¤‚à¤¢ à¤°à¤¹à¤¾ à¤¹à¥ˆ...",
    findMe: "à¤®à¥à¤à¥‡ à¤¢à¥‚à¤‚à¤¢à¥‡à¤‚",
    liveGpsMap: "à¤²à¤¾à¤‡à¤µ GPS à¤®à¤¾à¤¨à¤šà¤¿à¤¤à¥à¤°",
    gpsActive: "GPS à¤šà¤¾à¤²à¥‚ à¤¹à¥ˆ",
    uploadMedia: "à¤«à¥‹à¤Ÿà¥‹ / à¤µà¥€à¤¡à¤¿à¤¯à¥‹ à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚",
    departmentCheckDesc: "à¤¯à¤¹ à¤…à¤²à¤— à¤µà¤¿à¤­à¤¾à¤—à¥‹à¤‚ à¤•à¥‡ à¤•à¤¾à¤® à¤œà¤¾à¤‚à¤šà¤¤à¤¾ à¤¹à¥ˆ, à¤¤à¤¾à¤•à¤¿ à¤µà¤¹à¥€ à¤¸à¤¡à¤¼à¤• à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤¨ à¤–à¥à¤¦à¥‡à¥¤",
    waterBoardDb: "à¤ªà¤¾à¤¨à¥€ à¤µà¤¿à¤­à¤¾à¤— à¤¡à¥‡à¤Ÿà¤¾",
    electricityDb: "à¤¬à¤¿à¤œà¤²à¥€ à¤µà¤¿à¤­à¤¾à¤— à¤¡à¥‡à¤Ÿà¤¾",
    pavingDb: "à¤¸à¤¡à¤¼à¤• à¤®à¤°à¤®à¥à¤®à¤¤ à¤¡à¥‡à¤Ÿà¤¾",
    departmentFeed: "à¤µà¤¿à¤­à¤¾à¤— à¤®à¤¿à¤²à¤¾à¤¨ à¤²à¥‰à¤—",
    departmentFeedOne: "à¤°à¤¾à¤œà¤ªà¥à¤° à¤°à¥‹à¤¡ à¤•à¥‡ à¤ªà¤¾à¤¸ à¤ªà¤¾à¤¨à¥€ à¤•à¤¾ à¤•à¤¾à¤® à¤œà¤¾à¤‚à¤š à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    departmentFeedTwo: "à¤‰à¤¸à¥€ à¤œà¤—à¤¹ à¤¸à¤¡à¤¼à¤• à¤®à¤°à¤®à¥à¤®à¤¤ à¤•à¤¾ à¤•à¤¾à¤® à¤œà¤¾à¤‚à¤š à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚à¥¤",
    departmentWarning: "à¤°à¤¾à¤œà¤ªà¥à¤° à¤®à¥‡à¤¨ à¤°à¥‹à¤¡ à¤ªà¤° à¤¦à¥‹à¤¬à¤¾à¤°à¤¾ à¤–à¥à¤¦à¤¾à¤ˆ à¤®à¤¿à¤²à¥€à¥¤",
    departmentWarningDesc: "à¤ªà¤¾à¤¨à¥€ à¤ªà¤¾à¤‡à¤ª à¤•à¤¾à¤® à¤¸à¥‡ à¤ªà¤¹à¤²à¥‡ à¤¸à¤¡à¤¼à¤• à¤®à¤°à¤®à¥à¤®à¤¤ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¥à¥€à¥¤ à¤ªà¤¹à¤²à¥‡ à¤®à¤°à¤®à¥à¤®à¤¤ à¤°à¥‹à¤•à¥€ à¤—à¤ˆ, à¤¤à¤¾à¤•à¤¿ à¤¬à¤¾à¤¦ à¤®à¥‡à¤‚ à¤¸à¤¡à¤¼à¤• à¤«à¤¿à¤° à¤¨ à¤–à¥à¤¦à¥‡à¥¤",
    soundLabTitle: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤§à¥à¤µà¤¨à¤¿ à¤²à¥ˆà¤¬",
    soundLabSubtitle: "à¤†à¤µà¤¾à¤œ à¤¸à¥‡ à¤ªà¤¾à¤‡à¤ª à¤°à¤¿à¤¸à¤¾à¤µ à¤¢à¥‚à¤‚à¤¢à¥‡à¤‚à¥¤",
    soundLabDesc: "à¤†à¤µà¤¾à¤œ à¤«à¤¾à¤‡à¤² à¤¯à¤¾ à¤¸à¥ˆà¤‚à¤ªà¤² à¤†à¤µà¤¾à¤œ à¤šà¥à¤¨à¥‡à¤‚à¥¤ à¤à¤ª à¤œà¤¾à¤‚à¤šà¤¤à¤¾ à¤¹à¥ˆ à¤•à¤¿ à¤¯à¤¹ à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤œà¥ˆà¤¸à¥€ à¤¹à¥ˆ à¤¯à¤¾ à¤¨à¤¹à¥€à¤‚à¥¤",
    waveformMonitor: "à¤§à¥à¤µà¤¨à¤¿ à¤¤à¤°à¤‚à¤—",
    frequency: "à¤«à¥à¤°à¥€à¤•à¥à¤µà¥‡à¤‚à¤¸à¥€",
    analyzingSound: "à¤†à¤µà¤¾à¤œ à¤œà¤¾à¤‚à¤š à¤°à¤¹à¥‡ à¤¹à¥ˆà¤‚...",
    uploadAudio: "à¤†à¤µà¤¾à¤œ à¤«à¤¾à¤‡à¤² à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚",
    uploadAudioDesc: "à¤ªà¤¾à¤‡à¤ª à¤¯à¤¾ à¤¹à¤¾à¤‡à¤¡à¥à¤°à¥‡à¤‚à¤Ÿ à¤•à¥€ à¤†à¤µà¤¾à¤œ à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¥‡à¤‚à¥¤",
    audioTrack: "à¤†à¤µà¤¾à¤œ à¤«à¤¾à¤‡à¤²",
    clickUpload: "à¤…à¤ªà¤²à¥‹à¤¡ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚",
    fileTypes: "WAV, MP3, M4A, FLAC à¤šà¤²à¤¤à¥‡ à¤¹à¥ˆà¤‚",
    analyzeUpload: "à¤…à¤ªà¤²à¥‹à¤¡ à¤†à¤µà¤¾à¤œ à¤œà¤¾à¤‚à¤šà¥‡à¤‚",
    sampleSounds: "à¤¸à¥ˆà¤‚à¤ªà¤² à¤†à¤µà¤¾à¤œ",
    sampleSoundsDesc: "à¤Ÿà¥‚à¤² à¤Ÿà¥‡à¤¸à¥à¤Ÿ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥ˆà¤‚à¤ªà¤² à¤†à¤µà¤¾à¤œ à¤šà¥à¤¨à¥‡à¤‚à¥¤",
    runSampleScan: "à¤¸à¥ˆà¤‚à¤ªà¤² à¤†à¤µà¤¾à¤œ à¤œà¤¾à¤‚à¤šà¥‡à¤‚",
    pipeSafe: "à¤ªà¤¾à¤‡à¤ª à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤²à¤—à¤¤à¤¾ à¤¹à¥ˆ",
    pipeSafeDesc: "à¤°à¤¿à¤¸à¤¾à¤µ à¤œà¥ˆà¤¸à¥€ à¤†à¤µà¤¾à¤œ à¤¨à¤¹à¥€à¤‚ à¤®à¤¿à¤²à¥€à¥¤ à¤•à¥‹à¤ˆ à¤•à¤¾à¤°à¥à¤°à¤µà¤¾à¤ˆ à¤œà¤°à¥‚à¤°à¥€ à¤¨à¤¹à¥€à¤‚à¥¤",
    clearScan: "à¤¸à¤¾à¤« à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤¨à¤ˆ à¤†à¤µà¤¾à¤œ à¤œà¤¾à¤‚à¤šà¥‡à¤‚",
    leakFound: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤¹à¥‹ à¤¸à¤•à¤¤à¤¾ à¤¹à¥ˆ",
    soundReport: "à¤§à¥à¤µà¤¨à¤¿ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ",
    anomalyTarget: "à¤®à¤¿à¤²à¥€ à¤†à¤µà¤¾à¤œ",
    acousticVibration: "à¤†à¤µà¤¾à¤œ à¤¸à¥à¤¤à¤°",
    createLeakTicket: "à¤ªà¤¾à¤¨à¥€ à¤°à¤¿à¤¸à¤¾à¤µ à¤Ÿà¤¿à¤•à¤Ÿ à¤¬à¤¨à¤¾à¤à¤‚",
    reset: "à¤°à¥€à¤¸à¥‡à¤Ÿ"
  }
};

export default function App() {
  // Translation helper
  const t = (key: string) => {
    return UI_TEXT.en[key] || key;
  };

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.warn("Unable to restore saved CivicPulse session:", err);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  });
  const [authTab, setAuthTab] = useState<"signin" | "signup">("signin");
  const [authRole, setAuthRole] = useState<"citizen" | "manager">("citizen");
  const [regFullName, setRegFullName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  // Grid/Coordinate Selection State (Default coordinates over Dehradun sector)
  const [selectedLat, setSelectedLat] = useState<number>(30.3325);
  const [selectedLon, setSelectedLon] = useState<number>(78.0412);

  // Issues and Schedules State
  const [issues, setIssues] = useState<CivicIssue[]>([]);
  const [schedules, setSchedules] = useState<CivicSchedule[]>([]);

  // Report Form state
  const [reportTitle, setReportTitle] = useState("");
  const [reportDesc, setReportDesc] = useState("");
  const [reportCategory, setReportCategory] = useState<string>("Pothole & Roads");
  const [reportImageUrl, setReportImageUrl] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  // Manager specific simulation responses
  const [optimizedRoutes, setOptimizedRoutes] = useState<OptimizedRoute[] | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [budgetForecast, setBudgetForecast] = useState<MaterialForecast | null>(null);
  const [isForecasting, setIsForecasting] = useState(false);

  // Judge Simulation Tool Selection Tab (Citizen View)
  const [citizenSensorTab, setCitizenSensorTab] = useState<"map" | "acoustic">("map");

  // Custom Dispatch alert overlay state
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);

  // Hub and Spoke Navigation States
  const [citizenActiveView, setCitizenActiveView] = useState<"hub" | "report" | "map" | "acoustic" | "profile">("hub");
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [managerActiveView, setManagerActiveView] = useState<"hub" | "triage" | "interop" | "insar" | "acoustic">("hub");

  // Watch for user location changes and seed local issues
  useEffect(() => {
    if (!navigator.geolocation) return;

    const handleLocationChange = async (position: GeolocationPosition) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      
      console.log(`Current user coordinates updated: (${lat}, ${lon})`);
      
      try {
        const res = await fetch("/api/issues/seed_local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude: lat, longitude: lon })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.seeded) {
            console.log("Local mock issues seeded successfully for current city!");
            // Refetch issues so the new local pins immediately appear on their map!
            fetchIssuesAndSchedules();
          }
        }
      } catch (err) {
        console.error("Failed to seed local issues:", err);
      }
    };

    const watcherId = navigator.geolocation.watchPosition(
      handleLocationChange,
      (err) => console.warn("Location watcher error:", err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watcherId);
    };
  }, []);

  // Fetch initial issues & schedules from backend
  const fetchIssuesAndSchedules = async () => {
    try {
      const res1 = await fetch("/api/issues");
      if (res1.ok) {
        const data = await res1.json();
        setIssues(data);
      }
    } catch (err) {
      console.error("Error fetching civic data:", err);
    }
  };

  useEffect(() => {
    fetchIssuesAndSchedules();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  // Handle User Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!regFullName || !regUsername || !regPassword) {
      setAuthError(t("requiredFields"));
      return;
    }
    if (regPassword.length < 6) {
      setAuthError(t("passwordTooShort"));
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: regUsername,
          password: regPassword,
          fullName: regFullName,
          role: authRole,
          language: "en"
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Registration failed.");
        return;
      }

      setAuthSuccess("Account created successfully! Please sign in.");
      setAuthTab("signin");
      setLoginUsername(regUsername);
      setLoginPassword("");
      setRegPassword("");
    } catch (err) {
      setAuthError("Failed to connect to the backend server.");
    }
  };

  // Handle User Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!loginUsername || !loginPassword) {
      setAuthError(t("loginRequired"));
      return;
    }
    if (loginPassword.length < 6) {
      setAuthError(t("passwordTooShort"));
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Login failed.");
        return;
      }

      setCurrentUser(data.user);
    } catch (err) {
      setAuthError("Failed to connect to backend.");
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setLoginUsername("");
    setLoginPassword("");
    setRegUsername("");
    setRegFullName("");
    setRegPassword("");
    setOptimizedRoutes(null);
    setBudgetForecast(null);
  };

  // Submit Geotagged Report
  const handleSubmitReport = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!reportTitle || !reportDesc || !currentUser) return;

    setIsSubmittingReport(true);
    try {
      const res = await fetch("/api/issues/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: reportTitle,
          description: reportDesc,
          category: reportCategory,
          latitude: selectedLat,
          longitude: selectedLon,
          reporterId: currentUser.id,
          reporterName: currentUser.fullName,
          imageUrl: reportImageUrl || undefined
        })
      });

      if (res.ok) {
        // Clear form
        setReportTitle("");
        setReportDesc("");
        setReportImageUrl("");
        await fetchIssuesAndSchedules();
        // Update local points for gamification visual feedback
        setCurrentUser((prev) => prev ? { ...prev, points: prev.points + 15 } : null);
      }
    } catch (err) {
      console.error("Failed to submit report:", err);
    } finally {
      setIsSubmittingReport(false);
    }
  };

  // Upvote / Verify an Issue
  const handleVoteIssue = async (issueId: string) => {
    if (!currentUser) return;
    try {
      const res = await fetch("/api/issues/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueId, userId: currentUser.id })
      });

      if (res.ok) {
        await fetchIssuesAndSchedules();
        setCurrentUser((prev) => prev ? { ...prev, points: prev.points + 5 } : null);
      }
    } catch (err) {
      console.error("Error upvoting issue:", err);
    }
  };

  // Sound Sensor diagnostics automation
  const handleAcousticSuccess = async (diagnosticData: { title: string; description: string; category: string }) => {
    if (currentUser?.role === "citizen") {
      setReportTitle(diagnosticData.title);
      setReportDesc(diagnosticData.description);
      setReportCategory(diagnosticData.category);
      // Auto-select a coordinate near a fire hydrant in Rajpur
      setSelectedLat(30.3421);
      setSelectedLon(78.0561);
      // Switch tab back to reporting view
      setCitizenSensorTab("map");
    } else {
      // It is the manager/authority role. Post the issue directly to the server!
      try {
        const response = await fetch("/api/issues/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: diagnosticData.title,
            description: diagnosticData.description,
            category: diagnosticData.category,
            latitude: 30.3421,
            longitude: 78.0561,
            reporterId: currentUser?.id || "mgr_acoustic",
            reporterName: currentUser?.fullName || "Municipal Acoustic Lab"
          })
        });
        if (response.ok) {
          await fetchIssuesAndSchedules();
          setDispatchAlert(`Acoustic Water-Leak Ticket was successfully registered in the civic database via the authority terminal. The tracking system is now active!`);
        }
      } catch (err) {
        console.error("Failed to directly file acoustic ticket:", err);
      }
    }
  };

  const buildLocalRoutes = (crewCount = 2): OptimizedRoute[] => {
    const activeIssues = issues
      .filter((issue) => issue.status !== "resolved")
      .sort((a, b) => b.vulnerabilityWeight - a.vulnerabilityWeight);
    const crewNames = ["Alpha Crew (North)", "Beta Crew (South-West)", "Gamma Crew (East Grid)", "Delta Crew (Central)"];
    const crewSizes = [4, 3, 5, 3];
    const routeBuckets: CivicIssue[][] = Array.from({ length: Math.max(1, crewCount) }, () => []);

    activeIssues.forEach((issue, index) => {
      routeBuckets[index % routeBuckets.length].push(issue);
    });

    const toTime = (minutesAfterStart: number) => {
      const date = new Date();
      date.setHours(9, minutesAfterStart, 0, 0);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    return routeBuckets
      .map((bucket, routeIndex) => {
        if (bucket.length === 0) return null;
        let cursorMinutes = routeIndex * 15;
        const tasks = bucket.map((issue, taskIndex) => {
          cursorMinutes += taskIndex === 0 ? 25 : 35;
          const serviceTimeMinutes = issue.vulnerabilityWeight >= 8 ? 75 : issue.vulnerabilityWeight >= 6 ? 55 : 40;
          const eta = toTime(cursorMinutes);
          const estimatedResolutionTime = toTime(cursorMinutes + serviceTimeMinutes);
          cursorMinutes += serviceTimeMinutes;

          return {
            issueId: issue.id,
            title: issue.title,
            category: issue.category,
            latitude: issue.latitude,
            longitude: issue.longitude,
            sequence: taskIndex + 1,
            eta,
            estimatedResolutionTime,
            serviceTimeMinutes,
            weight: issue.vulnerabilityWeight,
            priorityReason: issue.vulnerabilityWeight >= 8
              ? "High-risk issue; scheduled first for public safety."
              : "Grouped by nearby location and crew capacity."
          };
        });

        return {
          crewName: crewNames[routeIndex] || `Maintenance Crew ${routeIndex + 1}`,
          crewSize: crewSizes[routeIndex] || 3,
          issueCount: tasks.length,
          startTime: toTime(routeIndex * 15),
          estimatedFinishTime: tasks[tasks.length - 1].estimatedResolutionTime,
          fuelEfficiencyRating: `Local optimized (${88 - routeIndex * 3}% direct routing)`,
          travelDistanceKm: Number((1.8 + tasks.length * 1.1 + routeIndex * 0.4).toFixed(1)),
          tasks
        };
      })
      .filter(Boolean) as OptimizedRoute[];
  };

  // Manager: Trigger Generative Crew Path Optimization (Point 3)
  const triggerRouteOptimization = async () => {
    setIsOptimizing(true);
    setOptimizedRoutes(null);
    try {
      const res = await fetch("/api/ai/optimize-crew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activeCrewCount: 2 })
      });
      if (res.ok) {
        const data = await res.json();
        setOptimizedRoutes(data.routes?.length ? data.routes : buildLocalRoutes(2));
      } else {
        setOptimizedRoutes(buildLocalRoutes(2));
      }
    } catch (err) {
      console.error("AI optimization failing:", err);
      setOptimizedRoutes(buildLocalRoutes(2));
    } finally {
      setIsOptimizing(false);
    }
  };

  // Manager: Trigger Predictive Supply Forecasting (Point 3)
  const triggerBudgetForecast = async () => {
    setIsForecasting(true);
    setBudgetForecast(null);
    try {
      const res = await fetch("/api/ai/forecast-budget", {
        method: "POST"
      });
      if (res.ok) {
        const data = await res.json();
        setBudgetForecast(data);
      }
    } catch (err) {
      console.error("Budget forecast failing:", err);
    } finally {
      setIsForecasting(false);
    }
  };

  // Manager: Close Ticket
  const handleCloseTicket = async (issueId: string) => {
    try {
      const res = await fetch("/api/issues/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issueId,
          status: "resolved",
          managerId: currentUser?.id
        })
      });
      if (res.ok) {
        await fetchIssuesAndSchedules();
      }
    } catch (err) {
      console.error("Error closing ticket:", err);
    }
  };

  // Standard preset reporting templates (to make reporting simple and graphic for low-literacy)
  const reportPresets = [
    {
      title: "Pothole Crater on Main Street",
      category: "Pothole & Roads",
      imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&w=600&q=80",
      desc: "Deep pothole damaging tyres and causing bike riders to lose balance."
    },
    {
      title: "Freshwater main pipe leakage gushing out",
      category: "Water & Leakage",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
      desc: "Fresh potable water wasting onto the main highway road."
    },
    {
      title: "Broken streetlight hazardous darkness",
      category: "Streetlights",
      imageUrl: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&w=600&q=80",
      desc: "The streetlight poles are off. Lane is unsafe for pedestrian walking."
    }
  ];

  const handleApplyPreset = (preset: typeof reportPresets[0]) => {
    setReportTitle(preset.title);
    setReportCategory(preset.category);
    setReportDesc(preset.desc);
    setReportImageUrl(preset.imageUrl);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Bar */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Compass className="w-6 h-6 text-slate-950 animate-pulse" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                {t("title")}
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded border border-emerald-400/20">
                  v2.5 AI Orchestrator
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono hidden md:block">
                {t("tagline")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentUser && (
              <div className="flex items-center gap-3">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-200">{currentUser.fullName}</span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{currentUser.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 p-2 rounded-xl transition-colors"
                  title={t("logout")}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6">
        {!currentUser ? (
          /* Authentication / Landing Panel */
          <div className="max-w-md mx-auto my-12 bg-slate-900 border border-slate-850 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 mx-auto flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold font-sans text-white">{t("title")}</h2>
              <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
                {t("tagline")}
              </p>
            </div>

            {/* Role Select Toggle */}
            <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-850 mb-6">
              <button
                type="button"
                onClick={() => setAuthRole("citizen")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  authRole === "citizen"
                    ? "bg-emerald-500 text-slate-950"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {t("roleCitizen")}
              </button>
              <button
                type="button"
                onClick={() => setAuthRole("manager")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  authRole === "manager"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                {t("roleManager")}
              </button>
            </div>

            {/* Auth Tab selectors */}
            <div className="flex justify-center gap-6 border-b border-slate-850 pb-3 mb-6">
              <button
                onClick={() => {
                  setAuthTab("signin");
                  setAuthError("");
                  setAuthSuccess("");
                }}
                className={`text-xs font-mono font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all ${
                  authTab === "signin" ? "border-emerald-400 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-400"
                }`}
              >
                {t("signIn")}
              </button>
              <button
                onClick={() => {
                  setAuthTab("signup");
                  setAuthError("");
                  setAuthSuccess("");
                }}
                className={`text-xs font-mono font-bold uppercase tracking-wider pb-1.5 border-b-2 transition-all ${
                  authTab === "signup" ? "border-emerald-400 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-400"
                }`}
              >
                {t("signUp")}
              </button>
            </div>

            {/* Display Messages */}
            {authError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs font-mono mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}
            {authSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-mono mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{authSuccess}</span>
              </div>
            )}

            {/* Form */}
            {authTab === "signin" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("username")}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder={t("loginUsernamePlaceholder")}
                      className="w-full bg-slate-950 border border-slate-850 py-2.5 pl-10 pr-4 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("password")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder={t("loginPasswordPlaceholder")}
                      className="w-full bg-slate-950 border border-slate-850 py-2.5 pl-10 pr-4 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
                  >
                    {t("signIn")}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder={t("fullNamePlaceholder")}
                    className="w-full bg-slate-950 border border-slate-850 py-2.5 px-4 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("username")}
                  </label>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    placeholder={t("usernamePlaceholder")}
                    className="w-full bg-slate-950 border border-slate-850 py-2.5 px-4 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    {t("password")}
                  </label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder={t("passwordPlaceholder")}
                    className="w-full bg-slate-950 border border-slate-850 py-2.5 px-4 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/10"
                  >
                    {t("signUp")}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 border-t border-slate-850/50 pt-4 text-center">
              <span className="text-[10px] font-mono text-slate-500">
                {t("loginHint")}
              </span>
            </div>
          </div>
          ) : currentUser.role === "citizen" ? (
            /* CITIZEN PORTAL WORKSPACE */
          citizenActiveView === "hub" ? (
            <div className="space-y-6">
              {/* Home Hub Header */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-2xl pointer-events-none" />
                <div>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold uppercase tracking-wider">
                    {t("citizenHeader")}
                  </span>
                  <h2 className="text-xl font-bold font-sans text-white mt-1.5">
                    {t("welcomeBack")}, {currentUser.fullName}
                  </h2>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {t("citizenIntro")}
                  </p>
                </div>

                {/* Score balance quick widget */}
                <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-850 px-4 py-2.5 rounded-2xl shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-base font-mono">
                    {currentUser.points}
                  </div>
                  <div>
                    <div className="text-[8px] font-mono text-slate-500 uppercase leading-none">{t("yourPoints")}</div>
                    <div className="font-sans font-bold text-white text-[11px] mt-0.5">{t("contributorLevel")}</div>
                  </div>
                </div>
              </div>

              {/* 4 Cards Hub Menu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
                {/* 1. Report a Problem */}
                <button
                  onClick={() => { setCitizenActiveView("report"); setWizardStep(1); }}
                  className="bg-slate-900 border border-slate-850 hover:border-emerald-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("reportIssue")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("reportCardDesc")}
                  </p>
                </button>

                {/* 2. Interactive Map */}
                <button
                  onClick={() => setCitizenActiveView("map")}
                  className="bg-slate-900 border border-slate-850 hover:border-indigo-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("mapCardTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("mapCardDesc")}
                  </p>
                </button>

                {/* 3. Acoustic Hydrant Mic */}
                <button
                  onClick={() => setCitizenActiveView("acoustic")}
                  className="bg-slate-900 border border-slate-850 hover:border-blue-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("acousticCardTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("acousticCardDesc")}
                  </p>
                </button>

                {/* 4. Scoreboard & Badges */}
                <button
                  onClick={() => setCitizenActiveView("profile")}
                  className="bg-slate-900 border border-slate-850 hover:border-yellow-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("profileCardTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("profileCardDesc")}
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Back to Hub navigation bar */}
              <div className="flex justify-between items-center bg-slate-900/60 border border-slate-850 p-3 rounded-2xl">
                <button
                  onClick={() => setCitizenActiveView("hub")}
                  className="text-xs font-mono font-bold px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {"<-"} {t("backHome")}
                </button>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                  {citizenActiveView === "report" ? t("citizenReportView") :
                   citizenActiveView === "map" ? t("citizenMapView") :
                   citizenActiveView === "acoustic" ? t("citizenAcousticView") : t("citizenProfileView")}
                </span>
              </div>

              {citizenActiveView === "report" ? (
                /* Guided Spoke Wizard for issue reporting */
                <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-xl text-left max-w-4xl mx-auto">
                  {/* Wizard Header and steps */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                    <h3 className="font-sans font-bold text-white text-sm">
                      {t("reportIssue")}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold border ${wizardStep === 1 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-950 text-slate-600 border-transparent"}`}>
                        {t("stepChooseLocation")}
                      </span>
                      <span className="text-slate-700 text-xs font-bold">/</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold border ${wizardStep === 2 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-950 text-slate-600 border-transparent"}`}>
                        Step 2: Add Details
                      </span>
                      <span className="text-slate-700 text-xs font-bold">/</span>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-semibold border ${wizardStep === 3 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-slate-950 text-slate-600 border-transparent"}`}>
                        Step 3: Successful!
                      </span>
                    </div>
                  </div>

                  {wizardStep === 1 ? (
                    /* Step 1: Map Location Selection */
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400 leading-relaxed font-sans mb-2">
                        Pinpoint the exact location of the hazard on the map below. You can drag and zoom to find the place names, and select any coordinate.
                      </p>
                      
                      {/* Interactive map */}
                      <MapGrid
                        issues={issues}
                        selectedLat={selectedLat}
                        selectedLon={selectedLon}
                        onSelectCoords={(lat, lon) => {
                          setSelectedLat(lat);
                          setSelectedLon(lon);
                        }}
                        t={t}
                      />

                      <div className="flex justify-between items-center pt-4 border-t border-slate-800/60 mt-4">
                        <div className="text-xs font-mono text-slate-500">
                          {t("selectedPosition")}: <span className="text-rose-400 font-semibold">{selectedLat.toFixed(4)}&deg;N, {selectedLon.toFixed(4)}&deg;E</span>
                        </div>
                        <button
                          onClick={() => setWizardStep(2)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs py-2 px-5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                        >
                          Next: Describe Issue {"->"}
                        </button>
                      </div>
                    </div>
                  ) : wizardStep === 2 ? (
                    /* Step 2: Details and Media Attachment */
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      await handleSubmitReport(); // Wait for submission
                      setWizardStep(3); // Go to step 3 success page!
                    }} className="space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                            {t("issueTitle")}
                          </label>
                          <input
                            type="text"
                            required
                            value={reportTitle}
                            onChange={(e) => setReportTitle(e.target.value)}
                            placeholder="e.g. Severe water main leak near central park"
                            className="w-full bg-slate-950 border border-slate-850 py-2 px-3 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-sans"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                            {t("selectCategory")}
                          </label>
                          <select
                            value={reportCategory}
                            onChange={(e) => setReportCategory(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 py-2.5 px-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                          >
                            <option value="Pothole & Roads">{t("potholesRoads")}</option>
                            <option value="Water & Leakage">{t("waterLeakage")}</option>
                            <option value="Waste Management">{t("wasteManagement")}</option>
                            <option value="Streetlights">{t("streetlights")}</option>
                            <option value="Public Infrastructure">{t("publicInfra")}</option>
                          </select>
                        </div>
                      </div>

                      {/* Presets template */}
                      <div>
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                          Or Apply Quick Preset Template:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {reportPresets.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleApplyPreset(preset)}
                              className="bg-slate-950 hover:bg-slate-850 border border-slate-850 p-1.5 rounded-xl text-center text-[9px] text-slate-300 truncate font-sans cursor-pointer transition-colors"
                            >
                              {preset.category}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                          {t("issueDesc")}
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={reportDesc}
                          onChange={(e) => setReportDesc(e.target.value)}
                          placeholder="Describe the depth, exact location landmarks, and hazard impact..."
                          className="w-full bg-slate-950 border border-slate-850 py-2 px-3 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex justify-between items-center">
                          <span>Reference Attachment (Optional)</span>
                          <span className="text-[8px] text-slate-500 uppercase">Image or Video</span>
                        </label>
                        <div className="space-y-2 font-sans">
                          <div className="flex gap-2">
                            <label className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 rounded-xl p-3 cursor-pointer transition-colors text-center hover:bg-slate-950/60 group">
                              <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-200">
                                <Camera className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-300" />
                                <span className="text-[10px] font-medium">{t("uploadMedia")}</span>
                              </div>
                              <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      setReportImageUrl(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                            {reportImageUrl && (
                              <button
                                type="button"
                                onClick={() => setReportImageUrl("")}
                                className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-3 rounded-xl hover:bg-rose-500/20 text-[9px] font-mono font-semibold transition-colors uppercase cursor-pointer"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          {reportImageUrl && (
                            <div className="bg-slate-950 border border-slate-850 p-2.5 rounded-xl flex items-center gap-3">
                              {reportImageUrl.startsWith("data:video/") || reportImageUrl.includes(".mp4") || reportImageUrl.includes("video") ? (
                                <div className="relative w-12 h-12 rounded-lg bg-black flex items-center justify-center shrink-0 overflow-hidden border border-slate-800">
                                  <video src={reportImageUrl} className="w-full h-full object-cover" muted playsInline />
                                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                                    <Video className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-12 h-12 rounded-lg bg-slate-900 shrink-0 overflow-hidden border border-slate-800">
                                  <img src={reportImageUrl} className="w-full h-full object-cover" alt="Preview" referrerPolicy="no-referrer" />
                                </div>
                              )}
                              <div className="flex-grow min-w-0">
                                <span className="text-[10px] text-slate-300 block font-semibold truncate">
                                  {reportImageUrl.startsWith("data:video/") ? "Attached Video File" : "Attached Image File"}
                                </span>
                                <span className="text-[8.5px] text-emerald-400 font-mono block">
                                  Voluntary reference ready to submit
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-slate-800/60 mt-4">
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold font-sans text-xs py-2 px-5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
                        >
                          {"<-"} {t("backToMap")}
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmittingReport || !reportTitle || !reportDesc}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs py-2 px-5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-40"
                        >
                          {isSubmittingReport ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              {t("runningTriage")}
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 text-slate-950" />
                              {t("submitReport")}
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Step 3: Success Screen */
                    <div className="text-center py-6 space-y-6 max-w-md mx-auto">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 animate-bounce">
                        <Check className="w-8 h-8 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-sans text-white">{t("reportThanks")}</h4>
                        <p className="text-xs text-slate-400 mt-2 font-mono leading-relaxed">
                          {t("reportSuccessDesc")}
                        </p>
                      </div>

                      <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-slate-500">Points Awarded:</span>
                          <span className="text-emerald-400 font-bold">+15 PTS</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono border-t border-slate-900 pt-2 mt-2">
                          <span className="text-slate-500">New Score Balance:</span>
                          <span className="text-white font-bold">{currentUser.points} PTS</span>
                        </div>
                      </div>

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => {
                            setReportTitle("");
                            setReportDesc("");
                            setReportImageUrl("");
                            setCitizenActiveView("hub");
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-xs py-2.5 px-6 rounded-xl transition-all shadow-lg cursor-pointer"
                        >
                          {t("backHome")}
                        </button>
                        <button
                          onClick={() => {
                            setReportTitle("");
                            setReportDesc("");
                            setReportImageUrl("");
                            setCitizenActiveView("map");
                          }}
                          className="bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 font-bold font-sans text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                        >
                          View Map of Issues
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : citizenActiveView === "map" ? (
                /* Map Grid and Active Ticket feed */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Map canvas */}
                  <div className="lg:col-span-8 space-y-4">
                    <MapGrid
                      issues={issues}
                      selectedLat={selectedLat}
                      selectedLon={selectedLon}
                      onSelectCoords={(lat, lon) => {
                        setSelectedLat(lat);
                        setSelectedLon(lon);
                      }}
                      t={t}
                    />
                    <div className="bg-slate-900 border border-slate-850 p-4 rounded-2xl text-xs flex gap-2 text-left">
                      <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-400 leading-normal">
                        {t("mapCardDesc")}
                      </p>
                    </div>
                  </div>

                  {/* Active feeds list */}
                  <div className="lg:col-span-4 bg-slate-900 border border-slate-850 rounded-3xl p-5 shadow-xl flex flex-col h-[400px] text-left">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-sans font-bold text-slate-200 text-sm">
                        {t("activeIssues")} ({issues.length})
                      </h3>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Live Tracking feed
                      </span>
                    </div>

                    <div className="flex-grow overflow-y-auto space-y-3.5 pr-1">
                      {issues.map((iss) => (
                        <div key={iss.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-850 relative animate-in fade-in duration-200">
                          <div className="flex justify-between items-start gap-2 mb-1.5">
                            <h4 className="font-sans font-bold text-slate-100 text-xs truncate max-w-[170px]">
                              {iss.title}
                            </h4>
                            <span className={`text-[8px] font-mono px-2 py-0.5 rounded shrink-0 font-semibold border ${
                              iss.status === "reported" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                              iss.status === "verified" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                              iss.status === "dispatched" ? "bg-teal-500/10 text-teal-400 border-teal-500/20" :
                              "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}>
                              {iss.status.toUpperCase()}
                            </span>
                          </div>

                          <p className="text-[10px] text-slate-400 leading-relaxed font-sans mb-2">
                            {iss.description}
                          </p>

                          <div className="grid grid-cols-2 gap-2 border-t border-slate-900 pt-2 mb-2 font-mono text-[8.5px] text-slate-500">
                            <div>
                              <span className="text-slate-600 block">GRID SYNTHETIC CODE:</span>
                              <span className="text-emerald-400 font-semibold">{iss.plusCode}</span>
                            </div>
                            <div>
                              <span className="text-slate-600 block">AI TRIAGE WEIGHT:</span>
                              <span className="text-indigo-400 font-bold">{iss.vulnerabilityWeight} / 10.0</span>
                            </div>
                          </div>

                          {iss.conflictFlag && (
                            <div className="bg-rose-500/10 border border-rose-500/25 p-2 rounded-xl mb-3 flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <span className="text-[8.5px] font-mono text-rose-400 leading-tight">
                                {iss.conflictDetail}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-[8.5px] font-mono text-slate-500">
                              Reported by {iss.reporterName}
                            </span>
                            
                            <button
                              disabled={iss.votes.includes(currentUser.id)}
                              onClick={() => handleVoteIssue(iss.id)}
                              className={`text-[9px] font-mono px-2 py-1 rounded transition-all flex items-center gap-1 ${
                                iss.votes.includes(currentUser.id)
                                  ? "bg-slate-800 text-slate-400 border border-slate-750"
                                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold cursor-pointer"
                              }`}
                            >
                              <Check className="w-3 h-3" />
                              {iss.votes.includes(currentUser.id) ? t("verified") : t("verify")} ({iss.votes.length})
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : citizenActiveView === "acoustic" ? (
                /* Acoustic sensor tool */
                <SoundTester onSuccessDiagnostic={handleAcousticSuccess} t={t} />
              ) : (
                /* Citizen contribution profile scoreboard & badges */
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left max-w-2xl mx-auto">
                  <div className="absolute top-2 right-2 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-xl pointer-events-none" />
                  <h3 className="font-sans font-bold text-slate-200 text-sm mb-4 flex items-center gap-1.5">
                    <UserIcon className="w-4 h-4 text-emerald-400" />
                    {t("gamificationTitle")}
                  </h3>
                  
                  <div className="flex items-center gap-3 mb-6 bg-slate-950/60 p-4 rounded-2xl border border-slate-850">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold text-xl font-mono">
                      {currentUser.points}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-400">{t("points")} Balance</div>
                      <div className="font-sans font-bold text-white text-sm">Community Contributor Level 2</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2 border-b border-slate-850 pb-1">
                      {t("badges")} (Milestones & Achievements)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentUser.badges.length === 0 ? (
                        <span className="text-[10px] text-slate-500 font-mono italic block col-span-2">No badges earned yet. Submit reports to gain badges!</span>
                      ) : (
                        currentUser.badges.map((b, i) => {
                          let why = "Awarded for outstanding community participation and civic tracking.";
                          let requirement = "Milestone achieved";
                          if (b === "Civic Guardian") {
                            why = "Awarded for reaching 100+ points by reporting issues or verifying infrastructure hazards.";
                            requirement = "Unlocks at 100 points";
                          } else if (b === "Citizen Auditor") {
                            why = "Awarded for reaching 50+ points by actively upvoting and verifying others' reported issues.";
                            requirement = "Unlocks at 50 points";
                          } else if (b === "Civic Solver") {
                            why = "Awarded when one of your reported issues is physically repaired and resolved by the municipality.";
                            requirement = "Unlocks on successful issue repair (+30 bonus)";
                          } else if (b === "Voice of Citizen") {
                            why = "Awarded for submitting an AI voice IVR report via mobile telephony channel.";
                            requirement = "Unlocks on phone audio submission (+20 bonus)";
                          } else if (b === "Pothole spotter") {
                            why = "Pre-awarded early milestone for spotting the first road-fissure anomaly.";
                            requirement = "Unlocks at first road report";
                          } else if (b === "Leak Detective") {
                            why = "Pre-awarded early milestone for detecting sub-surface hydraulic water weeping.";
                            requirement = "Unlocks on water/leak report";
                          } else if (b === "Community Champion") {
                            why = "Pre-awarded early milestone for exemplary community safety leadership.";
                            requirement = "Special starter status";
                          } else if (b === "Honored Architect") {
                            why = "Special milestone badge awarded to municipal engineers for active system orchestration.";
                            requirement = "Special authority status";
                          }

                          return (
                            <div key={i} className="bg-slate-950/60 border border-slate-850/60 p-3 rounded-2xl text-left">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-indigo-300 text-[10px] font-sans font-bold flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-indigo-300 shrink-0" /> {b}
                                </span>
                                <span className="text-[8px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase font-semibold">
                                  {requirement}
                                </span>
                              </div>
                              <p className="text-[9px] text-slate-400 font-sans leading-normal">
                                {why}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-850/60">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                      Points Earning Breakdown
                    </span>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-500 block leading-tight">REPORT ISSUE</span>
                        <span className="text-emerald-400 font-mono font-bold text-[10px]">+15 PTS</span>
                      </div>
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-500 block leading-tight">VERIFY ISSUE</span>
                        <span className="text-emerald-400 font-mono font-bold text-[10px]">+5 PTS</span>
                      </div>
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-500 block leading-tight">VOICE REPORT</span>
                        <span className="text-emerald-400 font-mono font-bold text-[10px]">+20 PTS</span>
                      </div>
                      <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-mono text-slate-500 block leading-tight">REPAIR DONE</span>
                        <span className="text-emerald-400 font-mono font-bold text-[10px]">+30 PTS</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <>
              {managerActiveView === "hub" ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Terminal Dashboard Header */}
                <div className="bg-slate-900 border border-slate-850 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
                  <div>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold uppercase tracking-wider font-bold">
                      {t("managerHeader")}
                    </span>
                    <h2 className="text-xl font-bold font-sans text-white mt-1.5">
                      {t("welcomeBack")}, {currentUser.fullName}
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {t("managerIntro")}
                    </p>
                  </div>

                  {/* Quick statistics */}
                  <div className="grid grid-cols-3 gap-3 text-center shrink-0">
                    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-2.5 min-w-[90px]">
                      <span className="text-[8.5px] font-mono text-slate-500 block uppercase">{t("unresolved")}</span>
                      <span className="text-base font-bold font-mono text-amber-500">
                        {issues.filter(i => i.status !== "resolved").length}
                      </span>
                    </div>
                    <div className="bg-slate-950 border border-slate-850 rounded-2xl p-2.5 min-w-[90px]">
                    <span className="text-[8.5px] font-mono text-slate-500 block uppercase">{t("conflictHalted")}</span>
                    <span className="text-base font-bold font-mono text-rose-500">
                      {issues.filter(i => i.conflictFlag).length}
                    </span>
                  </div>
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-2.5 min-w-[90px]">
                    <span className="text-[8.5px] font-mono text-slate-500 block uppercase">{t("resolvedToday")}</span>
                    <span className="text-base font-bold font-mono text-emerald-400">
                      {issues.filter(i => i.status === "resolved").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Cards Hub Menu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                {/* 1. Socioeconomic Equity Dispatch */}
                <button
                  onClick={() => setManagerActiveView("triage")}
                  className="bg-slate-900 border border-slate-850 hover:border-emerald-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("managerTriageTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("managerTriageDesc")}
                  </p>
                </button>

                {/* 2. Institutional Interoperability Console */}
                <button
                  onClick={() => setManagerActiveView("interop")}
                  className="bg-slate-900 border border-slate-850 hover:border-emerald-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Database className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("managerInteropTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("managerInteropDesc")}
                  </p>
                </button>

                {/* 3. InSAR Sub-surface Heatmap */}
                <button
                  onClick={() => setManagerActiveView("insar")}
                  className="bg-slate-900 border border-slate-850 hover:border-emerald-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Layers className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("managerInsarTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("managerInsarDesc")}
                  </p>
                </button>

                {/* 4. Hydrant Acoustic Sensor Lab */}
                <button
                  onClick={() => setManagerActiveView("acoustic")}
                  className="bg-slate-900 border border-slate-850 hover:border-blue-500/50 hover:bg-slate-850/40 p-5 rounded-3xl transition-all cursor-pointer group shadow-lg text-left"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/25 mb-4 group-hover:scale-105 transition-transform">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-sans font-bold text-white text-sm mb-1.5">
                    {t("managerAcousticTitle")}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {t("managerAcousticDesc")}
                  </p>
                </button>

              </div>

              {/* Authority Active Ticket Management List */}
              <div className="bg-slate-900 border border-slate-850 rounded-3xl p-5 shadow-xl text-left">
                <h3 className="font-sans font-bold text-slate-200 text-sm mb-4">
                  {t("activeTicketsTitle")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {issues.map((iss) => (
                    <div key={iss.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-850 flex flex-col justify-between animate-in fade-in duration-200">
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-mono text-slate-500">{iss.plusCode}</span>
                          <span className={`text-[8.5px] font-mono font-bold px-1.5 rounded uppercase border ${
                            iss.status === "reported" ? "bg-amber-500/10 text-amber-400 border-amber-500/10" :
                            iss.status === "verified" ? "bg-blue-500/15 text-blue-400 border-blue-500/15" :
                            iss.status === "dispatched" ? "bg-teal-500/15 text-teal-400 border-teal-500/15" :
                            "bg-emerald-500/15 text-emerald-400 border-emerald-500/15"
                          }`}>
                            {iss.status}
                          </span>
                        </div>
                        <h4 className="font-sans font-bold text-slate-200 text-xs mb-1 truncate">{iss.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-normal font-sans mb-3">{iss.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 border-t border-slate-900 py-1.5 font-mono text-[9px] mb-3">
                          <div>
                            <span className="text-slate-500 block">{t("severityLabel")}:</span>
                            <span className="text-slate-300 font-bold">{iss.vulnerabilityWeight} / 10.0</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">{t("verificationVotes")}:</span>
                            <span className="text-slate-300 font-bold">{iss.votes.length}</span>
                          </div>
                        </div>

                        {iss.conflictFlag && (
                          <div className="bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg mb-4 flex items-start gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span className="text-[8px] font-mono text-rose-400 leading-tight">
                              {iss.conflictDetail}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        {iss.status !== "resolved" ? (
                          <div className="space-y-1.5">
                            {iss.conflictFlag ? (
                              <div className="w-full text-center bg-rose-500/10 border border-rose-500/20 text-rose-400 py-1.5 rounded-lg text-[9px] font-mono font-semibold uppercase">
                                {t("workSuspended")}
                              </div>
                            ) : (
                              <button
                                onClick={() => handleCloseTicket(iss.id)}
                                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-sans text-[10px] py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                                {t("markResolved")}
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl flex items-center justify-center gap-1">
                        <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">{t("repairedCompleted")}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
          <div id="manager-workspace" className="space-y-6 animate-in fade-in duration-300">
            {/* Back to Terminal Hub navigation bar */}
            <div className="flex justify-between items-center bg-slate-900 border border-slate-850 p-3 rounded-2xl">
              <button
                onClick={() => setManagerActiveView("hub")}
                className="text-xs font-mono font-bold px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {"<-"} {t("backManagerHome")}
              </button>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                {managerActiveView === "triage" ? t("triageModuleTitle") :
                 managerActiveView === "interop" ? t("interopModuleTitle") :
                 managerActiveView === "insar" ? t("insarModuleTitle") :
                 t("acousticModuleTitle")}
              </span>
            </div>

            {managerActiveView === "triage" ? (
              <div className="space-y-6">
                <SocioeconomicTriage issues={issues} t={t} />

                {/* Grid map alongside optimization triggers */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                  {/* Left: Interactive regional map */}
                  <div className="lg:col-span-7">
                    <MapGrid
                      issues={issues}
                      selectedLat={selectedLat}
                      selectedLon={selectedLon}
                      onSelectCoords={(lat, lon) => {
                        setSelectedLat(lat);
                        setSelectedLon(lon);
                      }}
                      highlightedRoutes={optimizedRoutes || []}
                      t={t}
                    />
                  </div>

                  {/* Right: Generative route optimizer panel */}
                  <div className="lg:col-span-5 bg-slate-900 border border-slate-850 rounded-3xl p-5 shadow-xl flex flex-col justify-between animate-in fade-in duration-200">
                    <div>
                      <h3 className="font-sans font-bold text-slate-200 text-sm mb-3">
                        {t("routeTitle")}
                      </h3>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans mb-4">
                        {t("routeDesc")}
                      </p>

                      {optimizedRoutes && (
                        <div className="space-y-3 mb-4 max-h-[180px] overflow-y-auto pr-1">
                          {optimizedRoutes.map((route, i) => (
                            <div key={i} className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs animate-in slide-in-from-bottom-2 duration-200">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-emerald-400 font-sans">{route.crewName}</span>
                                <span className="font-mono text-[9px] text-slate-400">{route.travelDistanceKm} km</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 my-2 text-[9px] font-mono text-slate-400">
                                <span>{route.crewSize} people sent</span>
                                <span>{route.issueCount} issues</span>
                                <span>Start {route.startTime}</span>
                                <span>Finish {route.estimatedFinishTime}</span>
                              </div>
                              <div className="space-y-1 mt-2">
                                {route.tasks.map((task, idx) => (
                                  <div key={idx} className="bg-slate-900/70 rounded-lg p-2 text-[9px] font-mono text-slate-300">
                                    <div className="flex items-center gap-1.5 font-semibold">
                                      <span className="text-emerald-400">#{task.sequence}</span>
                                      <span className="truncate">{idx === 0 ? "Pehle" : "Then"}: {task.title}</span>
                                      <span className="ml-auto text-indigo-400 font-bold">W: {task.weight}</span>
                                    </div>
                                    <div className="mt-1 text-slate-500">
                                      Arrive {task.eta} - resolve by {task.estimatedResolutionTime}
                                    </div>
                                    <div className="mt-1 text-slate-400 leading-tight">
                                      {task.priorityReason}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={triggerRouteOptimization}
                      disabled={isOptimizing || issues.filter(i => i.status !== "resolved").length === 0}
                      className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-40"
                    >
                      {isOptimizing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          {t("optimizing")}
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-slate-950" />
                          {t("optimizeRoutes")}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : managerActiveView === "interop" ? (
              <SemanticLayer schedules={schedules} t={t} />
            ) : managerActiveView === "insar" ? (
              <SatelliteInSAR t={t} />
            ) : (
              <SoundTester onSuccessDiagnostic={handleAcousticSuccess} t={t} />
            )}
          </div>
        )}
        </>
      )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <span>&copy; 2026 {t("footer")}</span>
          <span className="text-[10px] text-slate-600">
            {t("footerGrid")}
          </span>
        </div>
      </footer>
      {dispatchAlert && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <Truck className="w-6 h-6 text-emerald-400 animate-bounce" />
            </div>
            <h3 className="text-sm font-sans font-bold text-white mb-2">{t("commandAlert")}</h3>
            <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6">
              {dispatchAlert}
            </p>
            <button
              onClick={() => setDispatchAlert(null)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-sans font-bold text-xs py-2.5 rounded-xl transition-all shadow-lg cursor-pointer"
            >
              {t("ok")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
