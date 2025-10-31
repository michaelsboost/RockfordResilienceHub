function resilienceHub() {
  return {
    // UI/meta
    darkMode: false,
    showModal: false,
    showDeleteModal: false,
    showAlertModal: false,
    showShareModal: false,
    editingResource: null,
    resourceToDelete: null,
    userHasLocation: false,

    // Data
    resources: [],
    filteredResources: [],
    categories: [
      "Food Access & Nutrition",
      "Grow & Produce",
      "Skills & Training",
      "Barter & Trading",
      "Emergency & Survival",
      "Financial Resilience",
      "Mutual Aid / Community Care",
      "Self-Reliance Resources",
      "Digital Tools & Apps",
      "Healthcare & Wellness",
      "Housing & Shelter",
      "Transportation",
      "Education & Childcare",
      "Legal & Advocacy",
      "Environmental & Sustainability",
    ],
    neighborhoods: [
      "Downtown",
      "Near East",
      "West Side",
      "Auburn",
      "Southeast",
      "Kishwaukee",
      "Loves Park",
      "Machesney Park",
      "Belvidere",
      "Cherry Valley",
      "Roscoe",
      "South Beloit",
      "Rockton",
      "Winnebago",
      "Byron",
      "Durand",
      "Pecatonica",
      "New Milford",
    ],
    alerts: {
      enabled: true,
      message:
        "⚠️ Verify hours and availability before visiting. Some sites may change schedules with little notice.",
    },
    meta: { lastUpdated: null, lastUpdatedDisplay: "" },

    // Filters
    searchTerm: "",
    selectedCategories: [],
    selectedTags: [],
    selectedNeighborhood: "",
    sortBy: "verified",

    // Form
    form: {
      id: "",
      name: "",
      category: "",
      description: "",
      address: "",
      hours: "",
      contact: "",
      website: "",
      eligibility: "",
      tagsInput: "",
      languagesInput: "",
      neighborhood: "",
      status: "active",
      notes: "",
      verification_date: new Date().toISOString().split("T")[0],
    },

    init() {
      this.loadMeta();
      this.loadData();
      this.toggleDarkMode(localStorage.getItem("darkMode") === "true");
      this.filterResources();
    },

    // --- Persistence ---
    loadMeta() {
      const m = localStorage.getItem("rockfordMeta");
      if (m) {
        this.meta = JSON.parse(m);
      }
      if (!this.meta.lastUpdated) this.meta.lastUpdated = Date.now();
      this.meta.lastUpdatedDisplay = new Date(
        this.meta.lastUpdated,
      ).toLocaleString();
      const a = localStorage.getItem("rockfordAlerts");
      if (a) {
        this.alerts = JSON.parse(a);
      }
    },
    saveMeta() {
      this.meta.lastUpdated = Date.now();
      this.meta.lastUpdatedDisplay = new Date(
        this.meta.lastUpdated,
      ).toLocaleString();
      localStorage.setItem("rockfordMeta", JSON.stringify(this.meta));
      localStorage.setItem("rockfordAlerts", JSON.stringify(this.alerts));
    },
    loadData() {
      const saved = localStorage.getItem("rockfordResources");
      if (saved) {
        this.resources = JSON.parse(saved);
      } else {
        this.resources = [
          // Food Access & Nutrition
          {
            id: "souls-harbor-pantry",
            name: "Soul's Harbor Food Pantry",
            category: "Food Access & Nutrition",
            description: "Church-run food pantry with evening and midday distributions on alternating Mondays.",
            address: "2802 11th St, Rockford, IL 61109",
            hours: "1st & 3rd Mon 5:30–7pm (some listings show 6:30–8pm); 2nd & 4th Mon 12–1pm",
            contact: "(815) 229-1922",
            website: "",
            eligibility: "Open to all; bring ID if available",
            tags: ["food-pantry", "groceries", "church", "free", "distribution"],
            neighborhood: "Kishwaukee",
            languages: ["English"],
            status: "active",
            notes: "Hours vary by Monday of the month; verify before visiting.",
            verification_date: "2025-10-30"
          },
          {
            id: "carpenters-place",
            name: "Carpenter's Place Food Pantry",
            category: "Food Access & Nutrition",
            description:
              "Emergency food assistance. Fresh produce and non-perishables.",
            address: "1149 Railroad Ave, Rockford, IL 61104",
            hours: "Mon–Fri 9am–4pm, Sat 10am–2pm",
            contact: "(815) 964-4105",
            website: "https://carpentersplace.org",
            eligibility: "Rockford residents; may request income verification",
            tags: ["emergency", "groceries", "non-profit"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rock-river-garden",
            name: "Rock River Valley Community Garden",
            category: "Grow & Produce",
            description:
              "Community plots; learn gardening skills and grow food.",
            address: "201 S Main St, Rockford, IL 61101",
            hours: "Daily dawn–dusk",
            contact: "(815) 987-1555",
            website: "",
            eligibility: "Open to all",
            tags: ["gardening", "education", "sustainability"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "seasonal",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "salvation-army-meals",
            name: "Salvation Army Community Meals",
            category: "Food Access & Nutrition",
            description: "Free hot meals daily for anyone in need.",
            address: "500 S Rockford Ave, Rockford, IL 61102",
            hours: "Daily 11:30am–1pm, 5–6:30pm",
            contact: "(815) 962-9658",
            website: "https://centralusa.salvationarmy.org/rockford",
            eligibility: "Open to all",
            tags: ["meals", "emergency", "free"],
            neighborhood: "Downtown",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "winnebago-co-food-bank",
            name: "Northern Illinois Food Bank Distribution",
            category: "Food Access & Nutrition",
            description: "Large-scale food distribution events monthly.",
            address: "765 Research Parkway, Rockford, IL 61109",
            hours: "Monthly events - check website",
            contact: "(815) 961-7283",
            website: "https://solvehungertoday.org",
            eligibility: "Winnebago County residents",
            tags: ["food-bank", "distribution", "emergency"],
            neighborhood: "Southeast",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-farmers-market",
            name: "Rockford City Market",
            category: "Food Access & Nutrition",
            description:
              "Local farmers market accepting SNAP/EBT with matching program.",
            address: "116 N Madison St, Rockford, IL 61107",
            hours: "Fri 3pm–8pm (Summer), Sat 9am–1pm (Winter)",
            contact: "(815) 963-2315",
            website: "https://rockfordcitymarket.com",
            eligibility: "Open to all",
            tags: ["farmers-market", "local", "produce"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "seasonal",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Skills & Training
          {
            id: "workforce-connection",
            name: "Workforce Connection Career Training",
            category: "Skills & Training",
            description: "Training in healthcare, manufacturing, and tech.",
            address: "303 N Main St, Rockford, IL 61101",
            hours: "Mon–Fri 8am–5pm",
            contact: "(815) 395-6600",
            website: "https://workforceconnection.org",
            eligibility: "Winnebago County residents, 18+",
            tags: ["training", "employment", "education"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rock-valley-college",
            name: "Rock Valley College Continuing Education",
            category: "Skills & Training",
            description: "Affordable vocational and life skills courses.",
            address: "3301 N Mulford Rd, Rockford, IL 61114",
            hours: "Mon–Fri 8am–5pm",
            contact: "(815) 921-7820",
            website: "https://www.rockvalleycollege.edu",
            eligibility: "Open to all",
            tags: ["education", "vocational", "adult-learning"],
            neighborhood: "East Side",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "goodwill-job-training",
            name: "Goodwill Job Training Center",
            category: "Skills & Training",
            description: "Free job readiness and computer skills training.",
            address: "4610 E State St, Rockford, IL 61108",
            hours: "Mon–Sat 9am–6pm",
            contact: "(815) 965-3795",
            website: "https://goodwillni.org",
            eligibility: "No restrictions",
            tags: ["job-training", "computer-skills", "free"],
            neighborhood: "Southeast",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Emergency & Survival
          {
            id: "rockford-rescue-mission",
            name: "Rockford Rescue Mission Shelter",
            category: "Emergency & Survival",
            description: "Emergency shelter, meals, and crisis services.",
            address: "715 W State St, Rockford, IL 61102",
            hours: "24/7",
            contact: "(815) 965-5332",
            website: "https://rockfordrescuemission.org",
            eligibility: "Individuals experiencing homelessness",
            tags: ["shelter", "emergency", "meals"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "red-cross-rockford",
            name: "American Red Cross - Rockford Chapter",
            category: "Emergency & Survival",
            description: "Disaster relief, emergency shelter, blood services.",
            address: "727 N Church St, Rockford, IL 61103",
            hours: "Mon–Fri 8:30am–4:30pm",
            contact: "(815) 963-8471",
            website: "https://redcross.org",
            eligibility: "Open to all",
            tags: ["disaster-relief", "emergency-shelter", "blood-donation"],
            neighborhood: "Near East",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-emergency-shelter",
            name: "Emergency Cold Weather Shelter",
            category: "Emergency & Survival",
            description: "Activated during extreme cold weather warnings.",
            address: "Multiple locations - call for details",
            hours: "During extreme cold warnings",
            contact: "(815) 987-HELP",
            website: "",
            eligibility: "Anyone needing shelter from extreme cold",
            tags: ["shelter", "cold-weather", "emergency"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "seasonal",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "united-way-rrv-211",
            name: "United Way 211 – Winnebago & Boone Counties",
            category: "Emergency & Survival",
            description: "24/7 helpline connecting residents to food, shelter, healthcare, mental health, and other local services.",
            address: "612 N Main St, Ste 300, Rockford, IL 61103",
            hours: "24/7",
            contact: "Dial 211 or (866) 813-1731",
            website: "https://www.unitedwayrrv.org/211",
            eligibility: "Open to all",
            tags: ["211", "hotline", "referral", "multilingual"],
            neighborhood: "Citywide",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "Operated by United Way of Rock River Valley.",
            verification_date: "2025-10-30"
          },

          // Financial Resilience
          {
            id: "goodwill-financial",
            name: "Goodwill Financial Coaching",
            category: "Financial Resilience",
            description:
              "Free financial coaching, budgeting assistance, and credit counseling.",
            address: "4610 E State St, Rockford, IL 61108",
            hours: "Mon–Sat 9am–6pm",
            contact: "(815) 965-3795",
            website: "https://goodwillni.org",
            eligibility: "No restrictions",
            tags: ["financial", "coaching", "free"],
            neighborhood: "Southeast",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-community-fcu",
            name: "Rockford Community Federal Credit Union",
            category: "Financial Resilience",
            description: "Low-cost banking, small loans, financial education.",
            address: "2929 Preston St, Rockford, IL 61101",
            hours: "Mon–Fri 9am–5pm, Sat 9am–12pm",
            contact: "(815) 962-9111",
            website: "https://rockfordcommunityfcu.org",
            eligibility: "Rockford area residents",
            tags: ["banking", "loans", "financial-education"],
            neighborhood: "Near East",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "illinois-dhs-office",
            name: "Illinois Department of Human Services",
            category: "Financial Resilience",
            description:
              "SNAP, TANF, Medicaid, and other benefit applications.",
            address: "300 W State St, Rockford, IL 61101",
            hours: "Mon–Fri 8:30am–5pm",
            contact: "(815) 987-7100",
            website: "https://dhs.illinois.gov",
            eligibility: "Illinois residents meeting income guidelines",
            tags: ["benefits", "snap", "medicaid"],
            neighborhood: "Downtown",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Mutual Aid / Community Care
          {
            id: "mutual-aid-network",
            name: "Rockford Mutual Aid Network",
            category: "Mutual Aid / Community Care",
            description:
              "Community-led network for resource sharing and neighbor support.",
            address: "Various locations",
            hours: "24/7 hotline",
            contact: "(815) 555-HELP",
            website: "https://rockfordmutualaid.org",
            eligibility: "Open to all",
            tags: ["emergency", "support", "community"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-time-bank",
            name: "Rockford Time Bank",
            category: "Mutual Aid / Community Care",
            description: "Skill and service exchange using time as currency.",
            address: "Online/community locations",
            hours: "24/7 online",
            contact: "rockfordtimebank@email.com",
            website: "",
            eligibility: "Open to all",
            tags: ["time-bank", "skill-share", "barter"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "neighborhood-watch-network",
            name: "Rockford Neighborhood Watch",
            category: "Mutual Aid / Community Care",
            description: "Community safety and emergency preparedness groups.",
            address: "Various neighborhood meetings",
            hours: "Monthly meetings",
            contact: "(815) 987-5800",
            website: "",
            eligibility: "Neighborhood residents",
            tags: ["safety", "community", "preparedness"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Self-Reliance Resources
          {
            id: "rockford-tool-library",
            name: "Rockford Tool Library",
            category: "Self-Reliance Resources",
            description:
              "Borrow tools for home repair, gardening, and projects.",
            address: "415 E State St, Rockford, IL 61104",
            hours: "Tue–Thu 4pm–7pm, Sat 10am–2pm",
            contact: "(815) 555-TOOL",
            website: "",
            eligibility: "Rockford residents with ID",
            tags: ["tools", "repair", "diy"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "community-seed-library",
            name: "Rockford Seed Library",
            category: "Self-Reliance Resources",
            description: "Free seeds for gardening, save and return seeds.",
            address: "Rockford Public Library - Main Branch",
            hours: "Mon–Thu 9am–8pm, Fri–Sat 9am–5pm, Sun 1–5pm",
            contact: "(815) 965-6732",
            website: "https://rockfordpubliclibrary.org",
            eligibility: "Open to all",
            tags: ["seeds", "gardening", "sustainability"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "repair-cafe-rockford",
            name: "Rockford Repair Cafe",
            category: "Self-Reliance Resources",
            description: "Volunteers help repair items to reduce waste.",
            address: "Various locations - check schedule",
            hours: "Monthly events",
            contact: "repaircaferockford@email.com",
            website: "",
            eligibility: "Open to all",
            tags: ["repair", "sustainability", "community"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Digital Tools & Apps
          {
            id: "beacon-survival-app",
            name: "Beacon Survival App",
            category: "Digital Tools & Apps",
            description: "Offline-first emergency toolkit with checklists, local radio frequencies, SOS signaling, quick notes, and links to essential resources—built for low-connectivity and privacy.",
            address: "Online/App",
            hours: "24/7",
            contact: "",
            website: "https://michaelsboost.com/Beacon/",
            eligibility: "Open to all",
            tags: ["app", "offline", "emergency", "toolkit", "communication"],
            neighborhood: "Online",
            languages: ["English"],
            status: "active",
            notes: "Local developer",
            verification_date: "2025-10-29"
          },
          {
            id: "the-deck-app",
            name: "The Deck",
            category: "Digital Tools & Apps",
            description: "A hub for card-based connection games including Common Ground, Family Cards, Couple Cards, Survival Cards, and more — designed to help families and communities reconnect, communicate, and build trust through fun and meaningful prompts.",
            address: "Online/App",
            hours: "24/7",
            contact: "",
            website: "https://michaelsboost.com/TheDeck/",
            eligibility: "Open to all",
            tags: ["app", "family", "connection", "mental-wellness", "community"],
            neighborhood: "Online",
            languages: ["English"],
            status: "active",
            notes: "Part of Michael’s digital resilience toolkit.",
            verification_date: "2025-10-29"
          },
          {
            id: "nextdoor-rockford",
            name: "Nextdoor Rockford",
            category: "Digital Tools & Apps",
            description:
              "Hyperlocal social network for neighborhood connections.",
            address: "Online/App",
            hours: "24/7",
            contact: "",
            website: "https://nextdoor.com",
            eligibility: "Neighborhood verification required",
            tags: ["app", "social", "neighborhood"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "citizen-app-rockford",
            name: "Citizen App - Rockford",
            category: "Digital Tools & Apps",
            description: "Real-time safety alerts and community updates.",
            address: "Online/App Store",
            hours: "24/7",
            contact: "",
            website: "https://citizen.com",
            eligibility: "Open to all",
            tags: ["app", "safety", "alerts"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "pulse-point-rockford",
            name: "PulsePoint Respond",
            category: "Digital Tools & Apps",
            description: "CPR and AED alerts for cardiac emergencies.",
            address: "Online/App Store",
            hours: "24/7",
            contact: "",
            website: "https://www.pulsepoint.org",
            eligibility: "Open to all",
            tags: ["app", "emergency", "cpr", "aed"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Healthcare & Wellness
          {
            id: "crusader-clinic",
            name: "Crusaders Community Health",
            category: "Healthcare & Wellness",
            description:
              "Federally qualified health center - sliding scale fees.",
            address: "1200 W State St, Rockford, IL 61102",
            hours: "Mon–Fri 8am–5pm, Sat 8am–12pm",
            contact: "(815) 968-0286",
            website: "https://crusaderhealth.org/",
            eligibility: "Open to all, sliding scale",
            tags: ["healthcare", "clinic", "sliding-scale"],
            neighborhood: "Near East",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "swedish-american-hospital",
            name: "SwedishAmerican Hospital",
            category: "Healthcare & Wellness",
            description: "Full-service hospital with emergency care.",
            address: "1401 E State St, Rockford, IL 61104",
            hours: "24/7",
            contact: "(815) 968-4400",
            website: "https://www.swedishamerican.org",
            eligibility: "Open to all",
            tags: ["hospital", "emergency", "healthcare"],
            neighborhood: "Near East",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "mental-health-association",
            name: "Rosecrance Ware Center",
            category: "Healthcare & Wellness",
            description: "Mental health and substance abuse services.",
            address: "526 W State St, Rockford, IL 61102",
            hours: "Mon–Fri 8am–5pm",
            contact: "(815) 965-4357",
            website: "https://rosecrance.org",
            eligibility: "Open to all",
            tags: ["mental-health", "counseling", "substance-abuse"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Housing & Shelter
          {
            id: "rockford-housing-authority",
            name: "Rockford Housing Authority",
            category: "Housing & Shelter",
            description: "Public housing and Section 8 voucher programs.",
            address: "223 S Winnebago St, Rockford, IL 61102",
            hours: "Mon–Fri 8am–4:30pm",
            contact: "(815) 489-8600",
            website: "https://rockfordha.org",
            eligibility: "Income-based",
            tags: ["housing", "section-8", "low-income"],
            neighborhood: "Downtown",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "habitat-rockford",
            name: "Habitat for Humanity - Rockford",
            category: "Housing & Shelter",
            description: "Affordable home ownership and repair programs.",
            address: "1423 S Main St, Rockford, IL 61102",
            hours: "Mon–Fri 9am–5pm",
            contact: "(815) 963-2102",
            website: "https://habitatrockford.com",
            eligibility: "Income and need-based",
            tags: ["housing", "home-repair", "affordable"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Transportation
          {
            id: "rta-rockford",
            name: "Rockford Mass Transit District",
            category: "Transportation",
            description: "Public bus transportation throughout Rockford.",
            address: "501 S Court St, Rockford, IL 61101",
            hours: "Mon–Sat 5:30am–10pm",
            contact: "(815) 961-9000",
            website: "https://rmtd.org",
            eligibility: "Open to all",
            tags: ["transportation", "bus", "public"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "bike-share-rockford",
            name: "Rockford Bike Share",
            category: "Transportation",
            description: "Public bicycle sharing program.",
            address: "Multiple downtown locations",
            hours: "24/7",
            contact: "",
            website: "https://rockfordbikeshare.org",
            eligibility: "Open to all",
            tags: ["transportation", "bike", "sustainable"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "seasonal",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Education & Childcare
          {
            id: "rockford-public-library",
            name: "Rockford Public Library - Main Branch",
            category: "Education & Childcare",
            description: "Free internet, computers, workshops, and resources.",
            address: "215 N Wyman St, Rockford, IL 61101",
            hours: "Mon–Thu 9am–8pm, Fri–Sat 9am–5pm, Sun 1–5pm",
            contact: "(815) 965-6732",
            website: "https://rockfordpubliclibrary.org",
            eligibility: "Open to all",
            tags: ["library", "education", "internet", "workshops"],
            neighborhood: "Downtown",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "head-start-rockford",
            name: "Rockford Head Start Program",
            category: "Education & Childcare",
            description:
              "Free early childhood education for low-income families.",
            address: "Multiple locations",
            hours: "Mon–Fri 7:30am–5:30pm",
            contact: "(815) 987-9820",
            website: "",
            eligibility: "Income-based for children 3-5",
            tags: ["childcare", "education", "preschool"],
            neighborhood: "Citywide",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Legal & Advocacy
          {
            id: "prairie-state-legal",
            name: "Prairie State Legal Services",
            category: "Legal & Advocacy",
            description: "Free civil legal services for low-income residents.",
            address: "200 S Wyman St, Rockford, IL 61101",
            hours: "Mon–Fri 8:30am–5pm",
            contact: "(815) 965-2902",
            website: "https://pslegal.org",
            eligibility: "Income-based",
            tags: ["legal", "advocacy", "free"],
            neighborhood: "Downtown",
            languages: ["English", "Spanish"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-justice-center",
            name: "Rockford Justice Center",
            category: "Legal & Advocacy",
            description: "Self-help legal resources and forms.",
            address: "400 W State St, Rockford, IL 61101",
            hours: "Mon–Fri 8:30am–4:30pm",
            contact: "(815) 319-4500",
            website: "",
            eligibility: "Open to all",
            tags: ["legal", "self-help", "resources"],
            neighborhood: "Downtown",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Environmental & Sustainability
          {
            id: "keep-rockford-beautiful",
            name: "Keep Rockford Beautiful",
            category: "Environmental & Sustainability",
            description:
              "Community cleanups, recycling education, sustainability programs.",
            address: "425 E State St, Rockford, IL 61104",
            hours: "Mon–Fri 9am–5pm",
            contact: "(815) 987-8800",
            website: "https://keeprockfordbeautiful.org",
            eligibility: "Open to all",
            tags: ["environment", "sustainability", "recycling"],
            neighborhood: "Near East",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-recycling-center",
            name: "Rockford Recycling Center",
            category: "Environmental & Sustainability",
            description: "Free recycling drop-off for residents.",
            address: "3333 Kishwaukee St, Rockford, IL 61109",
            hours: "Tue–Sat 8am–4pm",
            contact: "(815) 987-5577",
            website: "",
            eligibility: "Rockford residents",
            tags: ["recycling", "environment", "free"],
            neighborhood: "Southeast",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },

          // Barter & Trading
          {
            id: "rockford-buy-nothing",
            name: "Rockford Buy Nothing Project",
            category: "Barter & Trading",
            description:
              "Hyperlocal gift economy - give, receive, share freely.",
            address: "Facebook Groups by neighborhood",
            hours: "24/7 online",
            contact: "",
            website: "",
            eligibility: "Neighborhood residents",
            tags: ["barter", "free", "sharing"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
          {
            id: "rockford-free-cycle",
            name: "Rockford Freecycle Network",
            category: "Barter & Trading",
            description:
              "Keep good stuff out of landfills - free item exchange.",
            address: "Online groups",
            hours: "24/7",
            contact: "",
            website: "https://freecycle.org",
            eligibility: "Open to all",
            tags: ["free", "reuse", "sustainability"],
            neighborhood: "Citywide",
            languages: ["English"],
            status: "active",
            notes: "",
            verification_date: "2025-10-29",
          },
        ];
        this.saveData();
      }
    },
    saveData() {
      localStorage.setItem("rockfordResources", JSON.stringify(this.resources));
      this.saveMeta();
      this.filterResources();
    },

    // --- Computed ---
    get allTags() {
      const s = new Set();
      this.resources.forEach(r => (r.tags || []).forEach(t => s.add(t)));
      return Array.from(s).sort((a, b) => a.localeCompare(b));
    },

    // --- Filters & sorting ---
    filterResources() {
      let list = this.resources.map(r => ({ ...r }));

      // Search
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        list = list.filter(
          r =>
            (r.name || "").toLowerCase().includes(term) ||
            (r.description || "").toLowerCase().includes(term) ||
            (r.category || "").toLowerCase().includes(term) ||
            (r.tags || []).some((t) => t.toLowerCase().includes(term)),
        );
      }

      // Category
      if (this.selectedCategories.length) {
        list = list.filter((r) => this.selectedCategories.includes(r.category));
      }

      // Tags
      if (this.selectedTags.length) {
        list = list.filter((r) =>
          (r.tags || []).some((t) => this.selectedTags.includes(t)),
        );
      }

      // Neighborhood
      if (this.selectedNeighborhood) {
        list = list.filter(
          (r) =>
            (r.neighborhood || "").toLowerCase() ===
            this.selectedNeighborhood.toLowerCase(),
        );
      }

      // Distance (precompute if we have coords and address looks geocodable)
      if (this.userHasLocation && this.sortBy === "distance") {
        list.forEach((r) => {
          r.distanceKm = this.distanceFromUser(r);
        });
      }

      this.filteredResources = this.sortResources(list);
    },
    sortResources(list = this.filteredResources) {
      const sorted = [...list];
      switch (this.sortBy) {
        case "name":
          return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "category":
          return sorted.sort((a, b) => a.category.localeCompare(b.category));
        case "distance":
          return sorted.sort(
            (a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity),
          );
        case "verified":
        default:
          return sorted.sort(
            (a, b) =>
              new Date(b.verification_date) - new Date(a.verification_date),
          );
      }
    },

    toggleCategory(category) {
      const i = this.selectedCategories.indexOf(category);
      i > -1
        ? this.selectedCategories.splice(i, 1)
        : this.selectedCategories.push(category);
      this.filterResources();
    },
    toggleTag(tag) {
      const i = this.selectedTags.indexOf(tag);
      i > -1 ? this.selectedTags.splice(i, 1) : this.selectedTags.push(tag);
      this.filterResources();
    },

    // --- CRUD ---
    openModal(resource = null) {
      this.editingResource = resource;
      if (resource) {
        this.form = {
          ...resource,
          tagsInput: (resource.tags || []).join(", "),
          languagesInput: (resource.languages || []).join(", "),
        };
      } else {
        this.form = {
          id: "",
          name: "",
          category: "",
          description: "",
          address: "",
          hours: "",
          contact: "",
          website: "",
          eligibility: "",
          tagsInput: "",
          languagesInput: "",
          neighborhood: "",
          status: "active",
          notes: "",
          verification_date: new Date().toISOString().split("T")[0],
        };
      }
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingResource = null;
    },
    editResource(resource) {
      this.openModal(resource)
    },
    saveResource() {
      const data = { ...this.form };
      data.tags = (data.tagsInput || "")
        .split(",")
        .map(x => x.trim())
        .filter(Boolean);
      data.languages = (data.languagesInput || "")
        .split(",")
        .map(x => x.trim())
        .filter(Boolean);
      data.id = this.editingResource
        ? this.editingResource.id
        : this.generateId(data.name);

      if (this.editingResource) {
        const idx = this.resources.findIndex(
          r => r.id === this.editingResource.id,
        );
        this.resources[idx] = data;
      } else {
        this.resources.push(data);
      }
      this.saveData();
      this.closeModal();
    },
    confirmDelete(resource) {
      this.resourceToDelete = resource;
      this.showDeleteModal = true;
    },
    deleteResource() {
      if (!this.resourceToDelete) return;
      this.resources = this.resources.filter(
        r => r.id !== this.resourceToDelete.id,
      );
      this.saveData();
      this.showDeleteModal = false;
      this.resourceToDelete = null;
    },
    quickDuplicate(resource) {
      const copy = JSON.parse(JSON.stringify(resource));
      copy.id = this.generateId(resource.name + " copy");
      copy.name = resource.name + " (Copy)";
      this.resources.push(copy);
      this.saveData();
    },
    suggestNote(resource) {
      const note = prompt(
        "Add a quick note for internal tracking:",
        "Called to verify hours; voicemail.",
      );
      if (note) {
        resource.notes =
          (resource.notes ? resource.notes + "\n" : "") +
          `[${new Date().toLocaleString()}] ${note}`;
        this.saveData();
      }
    },
    markVerified(resource) {
      resource.verification_date = new Date().toISOString().split("T")[0];
      this.saveData();
    },

    // --- Utils ---
    generateId(name) {
      return (name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    },
    mapLink(r) {
      return `https://maps.google.com/?q=${encodeURIComponent(r.address || r.name || "Rockford, IL")}`;
    },
    telLink(contact) {
      const n = (contact || "").replace(/[^0-9+]/g, "");
      return n ? `tel:${n}` : "#";
    },

    // Distance helpers
    getLocation() {
      if (!navigator.geolocation) return alert("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.meta.userLat = pos.coords.latitude;
          this.meta.userLng = pos.coords.longitude;
          this.userHasLocation = true;
          this.saveMeta();
          this.filterResources();
        },
        err => alert("Could not get location: " + err.message),
        { enableHighAccuracy: true, timeout: 8000 },
      );
    },
    parseCoordsFromAddress(addr = "") {
      const m = addr.match(/\(([-0-9.]+),\s*([-0-9.]+)\)/);
      if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
      return null;
    },
    distanceFromUser(r) {
      if (!this.meta.userLat || !this.meta.userLng) return NaN;
      const c = this.parseCoordsFromAddress(r.address || "");
      if (!c) return NaN;
      const R = 6371,
        dLat = ((c.lat - this.meta.userLat) * Math.PI) / 180,
        dLng = ((c.lng - this.meta.userLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((this.meta.userLat * Math.PI) / 180) *
          Math.cos((c.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    },

    // Import/Export/Print/Share
    exportData() {
      const dataStr = JSON.stringify(this.resources, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "rockford-resources.json";
      a.click();
      URL.revokeObjectURL(url);
    },
    importData(evt) {
      const file = evt.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const text = e.target.result;
          if (file.name.endsWith(".csv")) {
            const rows = text
              .split(/\r?\n/)
              .filter(Boolean)
              .map(r => r.split(","));
            const headers = rows.shift().map(h => h.trim().toLowerCase());
            rows.forEach(cols => {
              const obj = {};
              headers.forEach((h, i) => (obj[h] = cols[i] || ""));
              const r = {
                id: this.generateId(obj.name || obj.id || crypto.randomUUID()),
                name: obj.name || "",
                category: obj.category || "",
                description: obj.description || "",
                address: obj.address || "",
                hours: obj.hours || "",
                contact: obj.contact || "",
                website: obj.website || "",
                eligibility: obj.eligibility || "",
                tags: (obj.tags || "")
                  .split(";")
                  .map(x => x.trim())
                  .filter(Boolean),
                languages: (obj.languages || "")
                  .split(";")
                  .map(x => x.trim())
                  .filter(Boolean),
                neighborhood: obj.neighborhood || "",
                status: obj.status || "active",
                notes: obj.notes || "",
                verification_date:
                  obj.verification_date ||
                  new Date().toISOString().split("T")[0],
              };
              this.resources.push(r);
            });
          } else {
            const data = JSON.parse(text);
            if (!Array.isArray(data))
              throw new Error("JSON must be an array of resources");
            this.resources = data;
          }
          this.saveData();
          alert("Import successful");
        } catch (err) {
          alert("Import error: " + err.message);
        }
        evt.target.value = "";
      };
      reader.readAsText(file);
    },
    printList() {
      window.print();
    },
    copyURL() {
      const url = window.location.href;
    
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url)
          .then(() => alert("✅ Link copied to clipboard!"))
          .catch(err => alert("❌ Copy failed: " + err.message));
      } else {
        // Fallback for older browsers or non-HTTPS
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          document.execCommand("copy");
          alert("✅ Link copied to clipboard!");
        } catch (err) {
          alert("❌ Copy failed: " + err.message);
        }
        document.body.removeChild(textarea);
      }
    },

    // Alerts
    openAlertEditor() {
      this.showAlertModal = true;
    },

    // Theming
    toggleDarkMode(force = null) {
      // Toggle state
      this.darkMode = force !== null ? force : !this.darkMode;
      localStorage.setItem("darkMode", this.darkMode);
      document.documentElement.classList.toggle("dark", this.darkMode);
    
      // Define theme colors
      const lightColor = "#f9fafb";
      const darkColor = "#111827";
    
      // Pick color based on mode
      const themeColor = this.darkMode ? darkColor : lightColor;
    
      // Update <meta> tags
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      const metaMS = document.querySelector('meta[name="msapplication-navbutton-color"]');
    
      if (metaTheme) metaTheme.setAttribute("content", themeColor);
      if (metaMS) metaMS.setAttribute("content", themeColor);
    }
  };
}