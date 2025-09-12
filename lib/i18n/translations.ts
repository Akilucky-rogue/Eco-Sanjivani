export type Language = "en" | "hi" | "mr" | "gu" | "ta" | "te" | "kn" | "ml" | "bn"

export interface Translations {
  // Navigation
  nav: {
    home: string
    dashboard: string
    events: string
    community: string
    analytics: string
    partnerships: string
    export: string
    profile: string
    settings: string
  }

  // Common
  common: {
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    delete: string
    edit: string
    view: string
    search: string
    filter: string
    submit: string
    close: string
    next: string
    previous: string
    yes: string
    no: string
  }

  // Home page
  home: {
    title: string
    subtitle: string
    heroTitle: string
    heroSubtitle: string
    joinButton: string
    learnMore: string
    impactTitle: string
    featuresTitle: string
  }

  // Dashboard
  dashboard: {
    welcome: string
    yourImpact: string
    upcomingEvents: string
    recentActivity: string
    quickActions: string
    createEvent: string
    joinEvent: string
    viewProfile: string
  }

  // Events
  events: {
    title: string
    upcoming: string
    past: string
    myEvents: string
    createNew: string
    joinEvent: string
    eventDetails: string
    location: string
    date: string
    time: string
    duration: string
    participants: string
    difficulty: string
    category: string
    description: string
  }

  // Profile
  profile: {
    title: string
    personalInfo: string
    name: string
    email: string
    phone: string
    location: string
    bio: string
    skills: string
    availability: string
    statistics: string
    eventsJoined: string
    hoursVolunteered: string
    pointsEarned: string
    level: string
    badges: string
  }

  // Impact metrics
  impact: {
    wasteCollected: string
    volunteersActive: string
    eventsCompleted: string
    areasRestored: string
    marineLifeProtected: string
    carbonOffset: string
    thisMonth: string
    totalImpact: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      events: "Events",
      community: "Community",
      analytics: "Analytics",
      partnerships: "Partnerships",
      export: "Export",
      profile: "Profile",
      settings: "Settings",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      submit: "Submit",
      close: "Close",
      next: "Next",
      previous: "Previous",
      yes: "Yes",
      no: "No",
    },
    home: {
      title: "Eco-Sanjivani",
      subtitle: "Marine Conservation Platform",
      heroTitle: "Protect India's Marine Ecosystems",
      heroSubtitle:
        "Join thousands of volunteers in gamified conservation efforts to restore our oceans and coastal areas.",
      joinButton: "Join the Movement",
      learnMore: "Learn More",
      impactTitle: "Our Collective Impact",
      featuresTitle: "Platform Features",
    },
    dashboard: {
      welcome: "Welcome back",
      yourImpact: "Your Impact",
      upcomingEvents: "Upcoming Events",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      createEvent: "Create Event",
      joinEvent: "Join Event",
      viewProfile: "View Profile",
    },
    events: {
      title: "Conservation Events",
      upcoming: "Upcoming",
      past: "Past",
      myEvents: "My Events",
      createNew: "Create New Event",
      joinEvent: "Join Event",
      eventDetails: "Event Details",
      location: "Location",
      date: "Date",
      time: "Time",
      duration: "Duration",
      participants: "Participants",
      difficulty: "Difficulty",
      category: "Category",
      description: "Description",
    },
    profile: {
      title: "Profile",
      personalInfo: "Personal Information",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      bio: "Bio",
      skills: "Skills",
      availability: "Availability",
      statistics: "Statistics",
      eventsJoined: "Events Joined",
      hoursVolunteered: "Hours Volunteered",
      pointsEarned: "Points Earned",
      level: "Level",
      badges: "Badges",
    },
    impact: {
      wasteCollected: "Waste Collected",
      volunteersActive: "Active Volunteers",
      eventsCompleted: "Events Completed",
      areasRestored: "Areas Restored",
      marineLifeProtected: "Marine Life Protected",
      carbonOffset: "Carbon Offset",
      thisMonth: "This Month",
      totalImpact: "Total Impact",
    },
  },

  hi: {
    nav: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      events: "कार्यक्रम",
      community: "समुदाय",
      analytics: "विश्लेषण",
      partnerships: "साझेदारी",
      export: "निर्यात",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स",
    },
    common: {
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      cancel: "रद्द करें",
      save: "सहेजें",
      delete: "हटाएं",
      edit: "संपादित करें",
      view: "देखें",
      search: "खोजें",
      filter: "फ़िल्टर",
      submit: "जमा करें",
      close: "बंद करें",
      next: "अगला",
      previous: "पिछला",
      yes: "हाँ",
      no: "नहीं",
    },
    home: {
      title: "इको-संजीवनी",
      subtitle: "समुद्री संरक्षण मंच",
      heroTitle: "भारत के समुद्री पारिस्थितिकी तंत्र की रक्षा करें",
      heroSubtitle: "हमारे महासागरों और तटीय क्षेत्रों को बहाल करने के लिए गेमिफाइड संरक्षण प्रयासों में हजारों स्वयंसेवकों के साथ जुड़ें।",
      joinButton: "आंदोलन में शामिल हों",
      learnMore: "और जानें",
      impactTitle: "हमारा सामूहिक प्रभाव",
      featuresTitle: "प्लेटफॉर्म सुविधाएं",
    },
    dashboard: {
      welcome: "वापसी पर स्वागत है",
      yourImpact: "आपका प्रभाव",
      upcomingEvents: "आगामी कार्यक्रम",
      recentActivity: "हाल की गतिविधि",
      quickActions: "त्वरित कार्य",
      createEvent: "कार्यक्रम बनाएं",
      joinEvent: "कार्यक्रम में शामिल हों",
      viewProfile: "प्रोफ़ाइल देखें",
    },
    events: {
      title: "संरक्षण कार्यक्रम",
      upcoming: "आगामी",
      past: "पिछले",
      myEvents: "मेरे कार्यक्रम",
      createNew: "नया कार्यक्रम बनाएं",
      joinEvent: "कार्यक्रम में शामिल हों",
      eventDetails: "कार्यक्रम विवरण",
      location: "स्थान",
      date: "दिनांक",
      time: "समय",
      duration: "अवधि",
      participants: "प्रतिभागी",
      difficulty: "कठिनाई",
      category: "श्रेणी",
      description: "विवरण",
    },
    profile: {
      title: "प्रोफ़ाइल",
      personalInfo: "व्यक्तिगत जानकारी",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      location: "स्थान",
      bio: "बायो",
      skills: "कौशल",
      availability: "उपलब्धता",
      statistics: "आंकड़े",
      eventsJoined: "शामिल हुए कार्यक्रम",
      hoursVolunteered: "स्वयंसेवा के घंटे",
      pointsEarned: "अर्जित अंक",
      level: "स्तर",
      badges: "बैज",
    },
    impact: {
      wasteCollected: "एकत्रित कचरा",
      volunteersActive: "सक्रिय स्वयंसेवक",
      eventsCompleted: "पूर्ण कार्यक्रम",
      areasRestored: "बहाल क्षेत्र",
      marineLifeProtected: "संरक्षित समुद्री जीवन",
      carbonOffset: "कार्बन ऑफसेट",
      thisMonth: "इस महीने",
      totalImpact: "कुल प्रभाव",
    },
  },

  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      dashboard: "डॅशबोर्ड",
      events: "कार्यक्रम",
      community: "समुदाय",
      analytics: "विश्लेषण",
      partnerships: "भागीदारी",
      export: "निर्यात",
      profile: "प्रोफाइल",
      settings: "सेटिंग्ज",
    },
    common: {
      loading: "लोड होत आहे...",
      error: "त्रुटी",
      success: "यश",
      cancel: "रद्द करा",
      save: "जतन करा",
      delete: "हटवा",
      edit: "संपादित करा",
      view: "पहा",
      search: "शोधा",
      filter: "फिल्टर",
      submit: "सबमिट करा",
      close: "बंद करा",
      next: "पुढे",
      previous: "मागे",
      yes: "होय",
      no: "नाही",
    },
    home: {
      title: "इको-संजीवनी",
      subtitle: "सागरी संवर्धन व्यासपीठ",
      heroTitle: "भारताच्या सागरी पर्यावरणाचे संरक्षण करा",
      heroSubtitle: "आमच्या महासागर आणि किनारी भागांच्या पुनर्वसनासाठी गेमिफाइड संवर्धन प्रयत्नांमध्ये हजारो स्वयंसेवकांसोबत सामील व्हा.",
      joinButton: "चळवळीत सामील व्हा",
      learnMore: "अधिक जाणून घ्या",
      impactTitle: "आमचा सामूहिक प्रभाव",
      featuresTitle: "प्लॅटफॉर्म वैशिष्ट्ये",
    },
    dashboard: {
      welcome: "परत स्वागत आहे",
      yourImpact: "तुमचा प्रभाव",
      upcomingEvents: "आगामी कार्यक्रम",
      recentActivity: "अलीकडील क्रियाकलाप",
      quickActions: "द्रुत क्रिया",
      createEvent: "कार्यक्रम तयार करा",
      joinEvent: "कार्यक्रमात सामील व्हा",
      viewProfile: "प्रोफाइल पहा",
    },
    events: {
      title: "संवर्धन कार्यक्रम",
      upcoming: "आगामी",
      past: "मागील",
      myEvents: "माझे कार्यक्रम",
      createNew: "नवीन कार्यक्रम तयार करा",
      joinEvent: "कार्यक्रमात सामील व्हा",
      eventDetails: "कार्यक्रम तपशील",
      location: "स्थान",
      date: "दिनांक",
      time: "वेळ",
      duration: "कालावधी",
      participants: "सहभागी",
      difficulty: "अडचण",
      category: "श्रेणी",
      description: "वर्णन",
    },
    profile: {
      title: "प्रोफाइल",
      personalInfo: "वैयक्तिक माहिती",
      name: "नाव",
      email: "ईमेल",
      phone: "फोन",
      location: "स्थान",
      bio: "बायो",
      skills: "कौशल्ये",
      availability: "उपलब्धता",
      statistics: "आकडेवारी",
      eventsJoined: "सामील झालेले कार्यक्रम",
      hoursVolunteered: "स्वयंसेवा तास",
      pointsEarned: "मिळवलेले गुण",
      level: "स्तर",
      badges: "बॅज",
    },
    impact: {
      wasteCollected: "गोळा केलेला कचरा",
      volunteersActive: "सक्रिय स्वयंसेवक",
      eventsCompleted: "पूर्ण कार्यक्रम",
      areasRestored: "पुनर्संचयित क्षेत्र",
      marineLifeProtected: "संरक्षित सागरी जीवन",
      carbonOffset: "कार्बन ऑफसेट",
      thisMonth: "या महिन्यात",
      totalImpact: "एकूण प्रभाव",
    },
  },

  gu: {
    nav: {
      home: "હોમ",
      dashboard: "ડેશબોર્ડ",
      events: "ઇવેન્ટ્સ",
      community: "સમુદાય",
      analytics: "વિશ્લેષણ",
      partnerships: "ભાગીદારી",
      export: "નિકાસ",
      profile: "પ્રોફાઇલ",
      settings: "સેટિંગ્સ",
    },
    common: {
      loading: "લોડ થઈ રહ્યું છે...",
      error: "ભૂલ",
      success: "સફળતા",
      cancel: "રદ કરો",
      save: "સેવ કરો",
      delete: "ડિલીટ કરો",
      edit: "એડિટ કરો",
      view: "જુઓ",
      search: "શોધો",
      filter: "ફિલ્ટર",
      submit: "સબમિટ કરો",
      close: "બંધ કરો",
      next: "આગળ",
      previous: "પાછળ",
      yes: "હા",
      no: "ના",
    },
    home: {
      title: "ઇકો-સંજીવની",
      subtitle: "દરિયાઈ સંરક્ષણ પ્લેટફોર્મ",
      heroTitle: "ભારતના દરિયાઈ ઇકોસિસ્ટમનું રક્ષણ કરો",
      heroSubtitle:
        "અમારા મહાસાગરો અને દરિયાકાંઠાના વિસ્તારોને પુનઃસ્થાપિત કરવા માટે ગેમિફાઇડ સંરક્ષણ પ્રયાસોમાં હજારો સ્વયંસેવકો સાથે જોડાઓ.",
      joinButton: "ચળવળમાં જોડાઓ",
      learnMore: "વધુ જાણો",
      impactTitle: "અમારી સામૂહિક અસર",
      featuresTitle: "પ્લેટફોર્મ લક્ષણો",
    },
    dashboard: {
      welcome: "પાછા સ્વાગત છે",
      yourImpact: "તમારી અસર",
      upcomingEvents: "આગામી ઇવેન્ટ્સ",
      recentActivity: "તાજેતરની પ્રવૃત્તિ",
      quickActions: "ઝડપી ક્રિયાઓ",
      createEvent: "ઇવેન્ટ બનાવો",
      joinEvent: "ઇવેન્ટમાં જોડાઓ",
      viewProfile: "પ્રોફાઇલ જુઓ",
    },
    events: {
      title: "સંરક્ષણ ઇવેન્ટ્સ",
      upcoming: "આગામી",
      past: "ભૂતકાળ",
      myEvents: "મારી ઇવેન્ટ્સ",
      createNew: "નવી ઇવેન્ટ બનાવો",
      joinEvent: "ઇવેન્ટમાં જોડાઓ",
      eventDetails: "ઇવેન્ટ વિગતો",
      location: "સ્થાન",
      date: "તારીખ",
      time: "સમય",
      duration: "અવધિ",
      participants: "સહભાગીઓ",
      difficulty: "મુશ્કેલી",
      category: "શ્રેણી",
      description: "વર્ણન",
    },
    profile: {
      title: "પ્રોફાઇલ",
      personalInfo: "વ્યક્તિગત માહિતી",
      name: "નામ",
      email: "ઇમેઇલ",
      phone: "ફોન",
      location: "સ્થાન",
      bio: "બાયો",
      skills: "કુશળતા",
      availability: "ઉપલબ્ધતા",
      statistics: "આંકડાશાસ્ત્ર",
      eventsJoined: "જોડાયેલી ઇવેન્ટ્સ",
      hoursVolunteered: "સ્વયંસેવા કલાકો",
      pointsEarned: "મેળવેલા પોઇન્ટ્સ",
      level: "સ્તર",
      badges: "બેજ",
    },
    impact: {
      wasteCollected: "એકત્રિત કચરો",
      volunteersActive: "સક્રિય સ્વયંસેવકો",
      eventsCompleted: "પૂર્ણ ઇવેન્ટ્સ",
      areasRestored: "પુનઃસ્થાપિત વિસ્તારો",
      marineLifeProtected: "સંરક્ષિત દરિયાઈ જીવન",
      carbonOffset: "કાર્બન ઓફસેટ",
      thisMonth: "આ મહિને",
      totalImpact: "કુલ અસર",
    },
  },

  ta: {
    nav: {
      home: "முகப்பு",
      dashboard: "டாஷ்போர்டு",
      events: "நிகழ்வுகள்",
      community: "சமூகம்",
      analytics: "பகுப்பாய்வு",
      partnerships: "கூட்டாண்மை",
      export: "ஏற்றுமதி",
      profile: "சுயவிவரம்",
      settings: "அமைப்புகள்",
    },
    common: {
      loading: "ஏற்றுகிறது...",
      error: "பிழை",
      success: "வெற்றி",
      cancel: "ரத்து செய்",
      save: "சேமி",
      delete: "நீக்கு",
      edit: "திருத்து",
      view: "பார்",
      search: "தேடு",
      filter: "வடிகட்டி",
      submit: "சமர்ப்பி",
      close: "மூடு",
      next: "அடுத்து",
      previous: "முந்தைய",
      yes: "ஆம்",
      no: "இல்லை",
    },
    home: {
      title: "ஈகோ-சஞ்சீவனி",
      subtitle: "கடல் பாதுகாப்பு தளம்",
      heroTitle: "இந்தியாவின் கடல் சுற்றுச்சூழல் அமைப்புகளைப் பாதுகாக்கவும்",
      heroSubtitle:
        "எங்கள் கடல்கள் மற்றும் கடலோர பகுதிகளை மீட்டெடுக்க கேமிஃபைட் பாதுகாப்பு முயற்சிகளில் ஆயிரக்கணக்கான தன்னார்வலர்களுடன் சேரவும்.",
      joinButton: "இயக்கத்தில் சேரவும்",
      learnMore: "மேலும் அறிக",
      impactTitle: "எங்கள் கூட்டு தாக்கம்",
      featuresTitle: "தளத்தின் அம்சங்கள்",
    },
    dashboard: {
      welcome: "மீண்டும் வரவேற்கிறோம்",
      yourImpact: "உங்கள் தாக்கம்",
      upcomingEvents: "வரவிருக்கும் நிகழ்வுகள்",
      recentActivity: "சமீபத்திய செயல்பாடு",
      quickActions: "விரைவு செயல்கள்",
      createEvent: "நிகழ்வை உருவாக்கு",
      joinEvent: "நிகழ்வில் சேர்",
      viewProfile: "சுயவிவரத்தைப் பார்",
    },
    events: {
      title: "பாதுகாப்பு நிகழ்வுகள்",
      upcoming: "வரவிருக்கும்",
      past: "கடந்த",
      myEvents: "என் நிகழ்வுகள்",
      createNew: "புதிய நிகழ்வை உருவாக்கு",
      joinEvent: "நிகழ்வில் சேர்",
      eventDetails: "நிகழ்வு விவரங்கள்",
      location: "இடம்",
      date: "தேதி",
      time: "நேரம்",
      duration: "கால அளவு",
      participants: "பங்கேற்பாளர்கள்",
      difficulty: "சிரமம்",
      category: "வகை",
      description: "விளக்கம்",
    },
    profile: {
      title: "சுயவிவரம்",
      personalInfo: "தனிப்பட்ட தகவல்",
      name: "பெயர்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      location: "இடம்",
      bio: "சுயவிவரம்",
      skills: "திறன்கள்",
      availability: "கிடைக்கும் தன்மை",
      statistics: "புள்ளிவிவரங்கள்",
      eventsJoined: "சேர்ந்த நிகழ்வுகள்",
      hoursVolunteered: "தன்னார்வ மணிநேரங்கள்",
      pointsEarned: "பெற்ற புள்ளிகள்",
      level: "நிலை",
      badges: "பேட்ஜ்கள்",
    },
    impact: {
      wasteCollected: "சேகரிக்கப்பட்ட கழிவு",
      volunteersActive: "செயலில் உள்ள தன்னார்வலர்கள்",
      eventsCompleted: "முடிக்கப்பட்ட நிகழ்வுகள்",
      areasRestored: "மீட்டெடுக்கப்பட்ட பகுதிகள்",
      marineLifeProtected: "பாதுகாக்கப்பட்ட கடல் வாழ்க்கை",
      carbonOffset: "கார்பன் ஆஃப்செட்",
      thisMonth: "இந்த மாதம்",
      totalImpact: "மொத்த தாக்கம்",
    },
  },

  te: {
    nav: {
      home: "హోమ్",
      dashboard: "డాష్‌బోర్డ్",
      events: "ఈవెంట్‌లు",
      community: "కమ్యూనిటీ",
      analytics: "అనలిటిక్స్",
      partnerships: "భాగస్వామ్యాలు",
      export: "ఎక్స్‌పోర్ట్",
      profile: "ప్రొఫైల్",
      settings: "సెట్టింగ్‌లు",
    },
    common: {
      loading: "లోడ్ అవుతోంది...",
      error: "లోపం",
      success: "విజయం",
      cancel: "రద్దు చేయండి",
      save: "సేవ్ చేయండి",
      delete: "తొలగించండి",
      edit: "ఎడిట్ చేయండి",
      view: "చూడండి",
      search: "వెతకండి",
      filter: "ఫిల్టర్",
      submit: "సబ్మిట్ చేయండి",
      close: "మూసివేయండి",
      next: "తదుపరి",
      previous: "మునుపటి",
      yes: "అవును",
      no: "లేదు",
    },
    home: {
      title: "ఈకో-సంజీవని",
      subtitle: "సముద్ర పరిరక్షణ వేదిక",
      heroTitle: "భారతదేశ సముద్ర పర్యావరణ వ్యవస్థలను రక్షించండి",
      heroSubtitle: "మా మహాసముద్రాలు మరియు తీర ప్రాంతాలను పునరుద్ధరించడానికి గేమిఫైడ్ పరిరక్షణ ప్రయత్నాలలో వేలాది మంది వాలంటీర్లతో చేరండి.",
      joinButton: "ఉద్యమంలో చేరండి",
      learnMore: "మరింత తెలుసుకోండి",
      impactTitle: "మా సామూహిక ప్రభావం",
      featuresTitle: "ప్లాట్‌ఫారమ్ లక్షణాలు",
    },
    dashboard: {
      welcome: "తిరిగి స్వాగతం",
      yourImpact: "మీ ప్రభావం",
      upcomingEvents: "రాబోయే ఈవెంట్‌లు",
      recentActivity: "ఇటీవలి కార్యకలాపం",
      quickActions: "త్వరిత చర్యలు",
      createEvent: "ఈవెంట్ సృష్టించండి",
      joinEvent: "ఈవెంట్‌లో చేరండి",
      viewProfile: "ప్రొఫైల్ చూడండి",
    },
    events: {
      title: "పరిరక్షణ ఈవెంట్‌లు",
      upcoming: "రాబోయే",
      past: "గత",
      myEvents: "నా ఈవెంట్‌లు",
      createNew: "కొత్త ఈవెంట్ సృష్టించండి",
      joinEvent: "ఈవెంట్‌లో చేరండి",
      eventDetails: "ఈవెంట్ వివరాలు",
      location: "స్థానం",
      date: "తేదీ",
      time: "సమయం",
      duration: "వ్యవధి",
      participants: "పాల్గొనేవారు",
      difficulty: "కష్టం",
      category: "వర్గం",
      description: "వివరణ",
    },
    profile: {
      title: "ప్రొఫైల్",
      personalInfo: "వ్యక్తిగత సమాచారం",
      name: "పేరు",
      email: "ఇమెయిల్",
      phone: "ఫోన్",
      location: "స్థానం",
      bio: "బయో",
      skills: "నైపుణ్యాలు",
      availability: "లభ్యత",
      statistics: "గణాంకాలు",
      eventsJoined: "చేరిన ఈవెంట్‌లు",
      hoursVolunteered: "వాలంటీర్ గంటలు",
      pointsEarned: "సంపాదించిన పాయింట్లు",
      level: "స్థాయి",
      badges: "బ్యాడ్జ్‌లు",
    },
    impact: {
      wasteCollected: "సేకరించిన వ్యర్థాలు",
      volunteersActive: "క్రియాశీల వాలంటీర్లు",
      eventsCompleted: "పూర్తయిన ఈవెంట్‌లు",
      areasRestored: "పునరుద్ధరించిన ప్రాంతాలు",
      marineLifeProtected: "రక్షించబడిన సముద్ర జీవులు",
      carbonOffset: "కార్బన్ ఆఫ్‌సెట్",
      thisMonth: "ఈ నెల",
      totalImpact: "మొత్తం ప్రభావం",
    },
  },

  kn: {
    nav: {
      home: "ಮುಖ್ಯಪುಟ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      events: "ಕಾರ್ಯಕ್ರಮಗಳು",
      community: "ಸಮುದಾಯ",
      analytics: "ವಿಶ್ಲೇಷಣೆ",
      partnerships: "ಪಾಲುದಾರಿಕೆ",
      export: "ರಫ್ತು",
      profile: "ಪ್ರೊಫೈಲ್",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    },
    common: {
      loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
      error: "ದೋಷ",
      success: "ಯಶಸ್ಸು",
      cancel: "ರದ್ದುಗೊಳಿಸಿ",
      save: "ಉಳಿಸಿ",
      delete: "ಅಳಿಸಿ",
      edit: "ಸಂಪಾದಿಸಿ",
      view: "ನೋಡಿ",
      search: "ಹುಡುಕಿ",
      filter: "ಫಿಲ್ಟರ್",
      submit: "ಸಲ್ಲಿಸಿ",
      close: "ಮುಚ್ಚಿ",
      next: "ಮುಂದೆ",
      previous: "ಹಿಂದೆ",
      yes: "ಹೌದು",
      no: "ಇಲ್ಲ",
    },
    home: {
      title: "ಇಕೋ-ಸಂಜೀವನಿ",
      subtitle: "ಸಮುದ್ರ ಸಂರಕ್ಷಣಾ ವೇದಿಕೆ",
      heroTitle: "ಭಾರತದ ಸಮುದ್ರ ಪರಿಸರ ವ್ಯವಸ್ಥೆಗಳನ್ನು ರಕ್ಷಿಸಿ",
      heroSubtitle: "ನಮ್ಮ ಸಾಗರಗಳು ಮತ್ತು ಕರಾವಳಿ ಪ್ರದೇಶಗಳನ್ನು ಪುನಃಸ್ಥಾಪಿಸಲು ಗೇಮಿಫೈಡ್ ಸಂರಕ್ಷಣಾ ಪ್ರಯತ್ನಗಳಲ್ಲಿ ಸಾವಿರಾರು ಸ್ವಯಂಸೇವಕರೊಂದಿಗೆ ಸೇರಿ.",
      joinButton: "ಚಳುವಳಿಯಲ್ಲಿ ಸೇರಿ",
      learnMore: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
      impactTitle: "ನಮ್ಮ ಸಾಮೂಹಿಕ ಪ್ರಭಾವ",
      featuresTitle: "ವೇದಿಕೆಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    },
    dashboard: {
      welcome: "ಮತ್ತೆ ಸ್ವಾಗತ",
      yourImpact: "ನಿಮ್ಮ ಪ್ರಭಾವ",
      upcomingEvents: "ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು",
      recentActivity: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
      quickActions: "ತ್ವರಿತ ಕ್ರಿಯೆಗಳು",
      createEvent: "ಕಾರ್ಯಕ್ರಮ ರಚಿಸಿ",
      joinEvent: "ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಿ",
      viewProfile: "ಪ್ರೊಫೈಲ್ ನೋಡಿ",
    },
    events: {
      title: "ಸಂರಕ್ಷಣಾ ಕಾರ್ಯಕ್ರಮಗಳು",
      upcoming: "ಮುಂಬರುವ",
      past: "ಹಿಂದಿನ",
      myEvents: "ನನ್ನ ಕಾರ್ಯಕ್ರಮಗಳು",
      createNew: "ಹೊಸ ಕಾರ್ಯಕ್ರಮ ರಚಿಸಿ",
      joinEvent: "ಕಾರ್ಯಕ್ರಮದಲ್ಲಿ ಸೇರಿ",
      eventDetails: "ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳು",
      location: "ಸ್ಥಳ",
      date: "ದಿನಾಂಕ",
      time: "ಸಮಯ",
      duration: "ಅವಧಿ",
      participants: "ಭಾಗವಹಿಸುವವರು",
      difficulty: "ಕಷ್ಟತೆ",
      category: "ವರ್ಗ",
      description: "ವಿವರಣೆ",
    },
    profile: {
      title: "ಪ್ರೊಫೈಲ್",
      personalInfo: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
      name: "ಹೆಸರು",
      email: "ಇಮೇಲ್",
      phone: "ಫೋನ್",
      location: "ಸ್ಥಳ",
      bio: "ಬಯೋ",
      skills: "ಕೌಶಲ್ಯಗಳು",
      availability: "ಲಭ್ಯತೆ",
      statistics: "ಅಂಕಿಅಂಶಗಳು",
      eventsJoined: "ಸೇರಿದ ಕಾರ್ಯಕ್ರಮಗಳು",
      hoursVolunteered: "ಸ್ವಯಂಸೇವಾ ಗಂಟೆಗಳು",
      pointsEarned: "ಗಳಿಸಿದ ಅಂಕಗಳು",
      level: "ಮಟ್ಟ",
      badges: "ಬ್ಯಾಡ್ಜ್‌ಗಳು",
    },
    impact: {
      wasteCollected: "ಸಂಗ್ರಹಿಸಿದ ತ್ಯಾಜ್ಯ",
      volunteersActive: "ಸಕ್ರಿಯ ಸ್ವಯಂಸೇವಕರು",
      eventsCompleted: "ಪೂರ್ಣಗೊಂಡ ಕಾರ್ಯಕ್ರಮಗಳು",
      areasRestored: "ಪುನಃಸ್ಥಾಪಿಸಿದ ಪ್ರದೇಶಗಳು",
      marineLifeProtected: "ಸಂರಕ್ಷಿತ ಸಮುದ್ರ ಜೀವಿಗಳು",
      carbonOffset: "ಕಾರ್ಬನ್ ಆಫ್‌ಸೆಟ್",
      thisMonth: "ಈ ತಿಂಗಳು",
      totalImpact: "ಒಟ್ಟು ಪ್ರಭಾವ",
    },
  },

  ml: {
    nav: {
      home: "ഹോം",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      events: "ഇവന്റുകൾ",
      community: "കമ്മ്യൂണിറ്റി",
      analytics: "അനലിറ്റിക്സ്",
      partnerships: "പങ്കാളിത്തം",
      export: "എക്സ്പോർട്ട്",
      profile: "പ്രൊഫൈൽ",
      settings: "സെറ്റിംഗ്സ്",
    },
    common: {
      loading: "ലോഡ് ചെയ്യുന്നു...",
      error: "പിശക്",
      success: "വിജയം",
      cancel: "റദ്ദാക്കുക",
      save: "സേവ് ചെയ്യുക",
      delete: "ഇല്ലാതാക്കുക",
      edit: "എഡിറ്റ് ചെയ്യുക",
      view: "കാണുക",
      search: "തിരയുക",
      filter: "ഫിൽട്ടർ",
      submit: "സമർപ്പിക്കുക",
      close: "അടയ്ക്കുക",
      next: "അടുത്തത്",
      previous: "മുമ്പത്തെ",
      yes: "അതെ",
      no: "ഇല്ല",
    },
    home: {
      title: "ഇക്കോ-സഞ്ജീവനി",
      subtitle: "സമുദ്ര സംരക്ഷണ പ്ലാറ്റ്‌ഫോം",
      heroTitle: "ഇന്ത്യയുടെ സമുദ്ര പരിസ്ഥിതി വ്യവസ്ഥകളെ സംരക്ഷിക്കുക",
      heroSubtitle:
        "നമ്മുടെ സമുദ്രങ്ങളും തീരപ്രദേശങ്ങളും പുനഃസ്ഥാപിക്കാൻ ഗെയിമിഫൈഡ് സംരക്ഷണ ശ്രമങ്ങളിൽ ആയിരക്കണക്കിന് സന്നദ്ധപ്രവർത്തകരോടൊപ്പം ചേരുക.",
      joinButton: "പ്രസ്ഥാനത്തിൽ ചേരുക",
      learnMore: "കൂടുതൽ അറിയുക",
      impactTitle: "നമ്മുടെ കൂട്ടായ സ്വാധീനം",
      featuresTitle: "പ്ലാറ്റ്‌ഫോം സവിശേഷതകൾ",
    },
    dashboard: {
      welcome: "തിരികെ സ്വാഗതം",
      yourImpact: "നിങ്ങളുടെ സ്വാധീനം",
      upcomingEvents: "വരാനിരിക്കുന്ന ഇവന്റുകൾ",
      recentActivity: "സമീപകാല പ്രവർത്തനം",
      quickActions: "ദ്രുത പ്രവർത്തനങ്ങൾ",
      createEvent: "ഇവന്റ് സൃഷ്ടിക്കുക",
      joinEvent: "ഇവന്റിൽ ചേരുക",
      viewProfile: "പ്രൊഫൈൽ കാണുക",
    },
    events: {
      title: "സംരക്ഷണ ഇവന്റുകൾ",
      upcoming: "വരാനിരിക്കുന്ന",
      past: "കഴിഞ്ഞ",
      myEvents: "എന്റെ ഇവന്റുകൾ",
      createNew: "പുതിയ ഇവന്റ് സൃഷ്ടിക്കുക",
      joinEvent: "ഇവന്റിൽ ചേരുക",
      eventDetails: "ഇവന്റ് വിശദാംശങ്ങൾ",
      location: "സ്ഥലം",
      date: "തീയതി",
      time: "സമയം",
      duration: "കാലാവധി",
      participants: "പങ്കാളികൾ",
      difficulty: "ബുദ്ധിമുട്ട്",
      category: "വിഭാഗം",
      description: "വിവരണം",
    },
    profile: {
      title: "പ്രൊഫൈൽ",
      personalInfo: "വ്യക്തിഗത വിവരങ്ങൾ",
      name: "പേര്",
      email: "ഇമെയിൽ",
      phone: "ഫോൺ",
      location: "സ്ഥലം",
      bio: "ബയോ",
      skills: "കഴിവുകൾ",
      availability: "ലഭ്യത",
      statistics: "സ്ഥിതിവിവരക്കണക്കുകൾ",
      eventsJoined: "ചേർന്ന ഇവന്റുകൾ",
      hoursVolunteered: "സന്നദ്ധപ്രവർത്തന മണിക്കൂറുകൾ",
      pointsEarned: "നേടിയ പോയിന്റുകൾ",
      level: "ലെവൽ",
      badges: "ബാഡ്ജുകൾ",
    },
    impact: {
      wasteCollected: "ശേഖരിച്ച മാലിന്യം",
      volunteersActive: "സജീവ സന്നദ്ധപ്രവർത്തകർ",
      eventsCompleted: "പൂർത്തിയാക്കിയ ഇവന്റുകൾ",
      areasRestored: "പുനഃസ്ഥാപിച്ച പ്രദേശങ്ങൾ",
      marineLifeProtected: "സംരക്ഷിത സമുദ്രജീവികൾ",
      carbonOffset: "കാർബൺ ഓഫ്‌സെറ്റ്",
      thisMonth: "ഈ മാസം",
      totalImpact: "മൊത്തം സ്വാധീനം",
    },
  },

  bn: {
    nav: {
      home: "হোম",
      dashboard: "ড্যাশবোর্ড",
      events: "ইভেন্ট",
      community: "কমিউনিটি",
      analytics: "অ্যানালিটিক্স",
      partnerships: "অংশীদারিত্ব",
      export: "এক্সপোর্ট",
      profile: "প্রোফাইল",
      settings: "সেটিংস",
    },
    common: {
      loading: "লোড হচ্ছে...",
      error: "ত্রুটি",
      success: "সফলতা",
      cancel: "বাতিল",
      save: "সংরক্ষণ",
      delete: "মুছুন",
      edit: "সম্পাদনা",
      view: "দেখুন",
      search: "অনুসন্ধান",
      filter: "ফিল্টার",
      submit: "জমা দিন",
      close: "বন্ধ",
      next: "পরবর্তী",
      previous: "পূর্ববর্তী",
      yes: "হ্যাঁ",
      no: "না",
    },
    home: {
      title: "ইকো-সঞ্জীবনী",
      subtitle: "সামুদ্রিক সংরক্ষণ প্ল্যাটফর্ম",
      heroTitle: "ভারতের সামুদ্রিক বাস্তুতন্ত্র রক্ষা করুন",
      heroSubtitle: "আমাদের সমুদ্র এবং উপকূলীয় অঞ্চল পুনরুদ্ধারের জন্য গেমিফাইড সংরক্ষণ প্রচেষ্টায় হাজার হাজার স্বেচ্ছাসেবকদের সাথে যোগ দিন।",
      joinButton: "আন্দোলনে যোগ দিন",
      learnMore: "আরও জানুন",
      impactTitle: "আমাদের সম্মিলিত প্রভাব",
      featuresTitle: "প্ল্যাটফর্মের বৈশিষ্ট্য",
    },
    dashboard: {
      welcome: "আবার স্বাগতম",
      yourImpact: "আপনার প্রভাব",
      upcomingEvents: "আসন্ন ইভেন্ট",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      quickActions: "দ্রুত কর্ম",
      createEvent: "ইভেন্ট তৈরি করুন",
      joinEvent: "ইভেন্টে যোগ দিন",
      viewProfile: "প্রোফাইল দেখুন",
    },
    events: {
      title: "সংরক্ষণ ইভেন্ট",
      upcoming: "আসন্ন",
      past: "অতীত",
      myEvents: "আমার ইভেন্ট",
      createNew: "নতুন ইভেন্ট তৈরি করুন",
      joinEvent: "ইভেন্টে যোগ দিন",
      eventDetails: "ইভেন্টের বিবরণ",
      location: "অবস্থান",
      date: "তারিখ",
      time: "সময়",
      duration: "সময়কাল",
      participants: "অংশগ্রহণকারী",
      difficulty: "কঠিনতা",
      category: "বিভাগ",
      description: "বর্ণনা",
    },
    profile: {
      title: "প্রোফাইল",
      personalInfo: "ব্যক্তিগত তথ্য",
      name: "নাম",
      email: "ইমেইল",
      phone: "ফোন",
      location: "অবস্থান",
      bio: "বায়ো",
      skills: "দক্ষতা",
      availability: "প্রাপ্যতা",
      statistics: "পরিসংখ্যান",
      eventsJoined: "যোগদানকৃত ইভেন্ট",
      hoursVolunteered: "স্বেচ্ছাসেবী ঘন্টা",
      pointsEarned: "অর্জিত পয়েন্ট",
      level: "স্তর",
      badges: "ব্যাজ",
    },
    impact: {
      wasteCollected: "সংগৃহীত বর্জ্য",
      volunteersActive: "সক্রিয় স্বেচ্ছাসেবক",
      eventsCompleted: "সম্পন্ন ইভেন্ট",
      areasRestored: "পুনরুদ্ধারকৃত এলাকা",
      marineLifeProtected: "সুরক্ষিত সামুদ্রিক জীবন",
      carbonOffset: "কার্বন অফসেট",
      thisMonth: "এই মাসে",
      totalImpact: "মোট প্রভাব",
    },
  },
}
