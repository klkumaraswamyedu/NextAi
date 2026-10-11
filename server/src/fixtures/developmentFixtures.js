/**
 * NextStep AI - Development Fixtures
 * 
 * NOTE: These fixtures are strictly for development, offline UI preview, and automated testing.
 * They represent realistic shapes conforming to Zod & Mongoose schemas prior to live TinyFish / LLM integration.
 */

export const DEV_STUDENT_OPPORTUNITIES = [
  {
    id: "dev_opp_01",
    isDevelopmentFixture: true,
    title: "Backend Engineering Intern (Distributed Systems)",
    organization: "Razorpay",
    category: "INTERNSHIP",
    location: "Bengaluru, India",
    remote: false,
    skills: ["Node.js", "MongoDB", "Express", "REST APIs"],
    deadline: "2026-11-20T23:59:59.000Z",
    deadlineRaw: "November 20, 2026",
    sourceUrl: "https://razorpay.com/jobs/intern-backend-2026",
    applicationUrl: "https://razorpay.com/apply/backend-intern",
    relevanceScore: 94,
    scoreBreakdown: {
      eligibilityMatch: 100,
      skillsMatch: 95,
      careerRelevance: 90,
      locationMatch: 90,
      deadlineSuitability: 95
    },
    explanation: "Strong match for Node.js, Express, and MongoDB backend stack; hybrid role in Bengaluru matching your preferences.",
    verificationStatus: "VERIFIED",
    eligibility: [
      {
        criteria: "Enrolled in 3rd or 4th year B.Tech/B.E. in CS or IT",
        evidenceExcerpt: "Eligible applicants must be enrolled in an undergraduate degree program in Computer Science or allied fields graduating in 2026 or 2027.",
        isVerified: true
      },
      {
        criteria: "Hands-on experience with JavaScript/TypeScript and asynchronous backend frameworks",
        evidenceExcerpt: "Demonstrated proficiency with Node.js and RESTful API architecture through academic or personal projects.",
        isVerified: true
      }
    ],
    evidence: [
      {
        field: "deadline",
        excerpt: "Applications for the Summer 2026 batch will strictly close on November 20, 2026 at 11:59 PM IST.",
        isVerified: true,
        sourceUrl: "https://razorpay.com/jobs/intern-backend-2026"
      },
      {
        field: "eligibility",
        excerpt: "Eligible applicants must be enrolled in an undergraduate degree program in Computer Science or allied fields graduating in 2026 or 2027.",
        isVerified: true,
        sourceUrl: "https://razorpay.com/jobs/intern-backend-2026"
      }
    ]
  },
  {
    id: "dev_opp_02",
    isDevelopmentFixture: true,
    title: "Smart India Hackathon (SIH 2026) - Software Edition",
    organization: "Ministry of Education's Innovation Cell & AICTE",
    category: "HACKATHON",
    location: "Pan-India (Nodal Centers)",
    remote: true,
    skills: ["Full Stack", "AI/ML", "React", "Cloud"],
    deadline: "2026-12-05T23:59:59.000Z",
    deadlineRaw: "December 05, 2026",
    sourceUrl: "https://sih.gov.in/sih2026",
    applicationUrl: "https://sih.gov.in/register",
    relevanceScore: 91,
    scoreBreakdown: {
      eligibilityMatch: 100,
      skillsMatch: 85,
      careerRelevance: 95,
      locationMatch: 90,
      deadlineSuitability: 90
    },
    explanation: "Prestigious national hackathon with software tracks matching your full-stack and web app skill set.",
    verificationStatus: "VERIFIED",
    eligibility: [
      {
        criteria: "Team of 6 bona fide undergraduate students with at least 1 female teammate",
        evidenceExcerpt: "Each team must consist of 6 members with mandatory female representation as per official guidelines.",
        isVerified: true
      }
    ],
    evidence: [
      {
        field: "deadline",
        excerpt: "College internal hackathon nominations must be submitted to the SIH portal by December 05, 2026.",
        isVerified: true,
        sourceUrl: "https://sih.gov.in/sih2026"
      }
    ]
  },
  {
    id: "dev_opp_03",
    isDevelopmentFixture: true,
    title: "Research Fellow in Trustworthy AI & Web Intelligence",
    organization: "IIIT Delhi - Center for AI",
    category: "RESEARCH",
    location: "New Delhi (Hybrid)",
    remote: false,
    skills: ["Python", "Natural Language Processing", "Information Retrieval"],
    deadline: "2026-11-10T17:00:00.000Z",
    deadlineRaw: "November 10, 2026",
    sourceUrl: "https://iiitd.ac.in/research/fellowships/ai-2026",
    applicationUrl: "https://iiitd.ac.in/apply/research-fellow",
    relevanceScore: 78,
    scoreBreakdown: {
      eligibilityMatch: 80,
      skillsMatch: 75,
      careerRelevance: 85,
      locationMatch: 70,
      deadlineSuitability: 85
    },
    explanation: "Research opportunity in Web Intelligence & LLM grounding. Requires foundational NLP coursework.",
    verificationStatus: "UNVERIFIED",
    eligibility: [
      {
        criteria: "Prior coursework in Data Structures, Algorithms, or Natural Language Processing",
        evidenceExcerpt: "Candidates must have completed intermediate coursework in algorithms or machine learning.",
        isVerified: true
      }
    ],
    evidence: [
      {
        field: "deadline",
        excerpt: "Rolling applications accepted until positions fill, priority deadline November 10, 2026.",
        isVerified: false,
        sourceUrl: "https://iiitd.ac.in/research/fellowships/ai-2026"
      }
    ]
  }
];

export const DEV_GOVERNMENT_SCHEMES = [
  {
    id: "dev_scheme_01",
    isDevelopmentFixture: true,
    name: "Central Sector Scheme of Scholarships for College and University Students",
    department: "Department of Higher Education, Ministry of Education",
    officialUrl: "https://scholarships.gov.in/scheme/central-sector-2026",
    state: "All India / Central",
    deadline: "2026-11-30T23:59:59.000Z",
    deadlineRaw: "November 30, 2026",
    verificationStatus: "VERIFIED",
    overallAssessment: "POTENTIALLY_ELIGIBLE",
    assessmentSummary: "2 criteria satisfied, 1 criterion requires user confirmation (Parental Income Certificate).",
    eligibilityRules: [
      {
        ruleId: "academic_tier",
        description: "Scored above 80th percentile in relevant stream in Class XII / Higher Secondary",
        evidenceExcerpt: "Students who are above 80th percentile of successful candidates in the relevant stream from the respective Board of Examination.",
        status: "SATISFIED"
      },
      {
        ruleId: "course_type",
        description: "Pursuing regular undergraduate course in recognized University / College",
        evidenceExcerpt: "Applicable to students pursuing regular (not correspondence or distance mode) degree courses in recognized institutions.",
        status: "SATISFIED"
      },
      {
        ruleId: "income_cap",
        description: "Gross parental/family income not exceeding Rs. 4,50,000 per annum",
        evidenceExcerpt: "Income ceiling of the scheme is Rs. 4.5 lakh per annum for all categories.",
        status: "UNKNOWN"
      }
    ],
    requiredDocuments: [
      "Class XII Marksheet / Board Passing Certificate",
      "College Bonafide Student Certificate",
      "Family Income Certificate issued by Revenue Authority",
      "Aadhaar Card linked Bank Account Passbook"
    ],
    applicationInstructions: "Apply exclusively through the National Scholarship Portal (NSP). Online verification will be processed by your college Nodal Officer.",
    evidence: [
      {
        field: "income_cap",
        excerpt: "Income ceiling of the scheme is Rs. 4.5 lakh per annum for all categories.",
        isVerified: true,
        sourceUrl: "https://scholarships.gov.in/scheme/central-sector-2026"
      },
      {
        field: "deadline",
        excerpt: "NSP application verification deadline for academic session 2026-27 is 30th November 2026.",
        isVerified: true,
        sourceUrl: "https://scholarships.gov.in/scheme/central-sector-2026"
      }
    ]
  },
  {
    id: "dev_scheme_02",
    isDevelopmentFixture: true,
    name: "Karnataka State Scholarship Portal (SSP) Post-Matric Scheme",
    department: "Social Welfare Department, Government of Karnataka",
    officialUrl: "https://ssp.postmatric.karnataka.gov.in/",
    state: "Karnataka",
    deadline: "2026-12-15T23:59:59.000Z",
    deadlineRaw: "December 15, 2026",
    verificationStatus: "VERIFIED",
    overallAssessment: "POTENTIALLY_ELIGIBLE",
    assessmentSummary: "State domicile and student status matched. Caste/Income verification certificate required via Kutumba ID.",
    eligibilityRules: [
      {
        ruleId: "domicile",
        description: "Domicile of Karnataka State with valid Kutumba / Citizen ID",
        evidenceExcerpt: "Only permanent residents of Karnataka studying in recognized colleges within or outside the state are eligible.",
        status: "SATISFIED"
      },
      {
        ruleId: "attendance",
        description: "Minimum 75% attendance record reported by institution",
        evidenceExcerpt: "Institutions must certify at least 75% student attendance for the disbursement cycle.",
        status: "UNKNOWN"
      }
    ],
    requiredDocuments: [
      "Karnataka Kutumba Family ID",
      "RD Number for Caste & Income Certificate",
      "College Fee Receipt & College Registration Number",
      "Bank Account seeded with NPCI / Aadhaar"
    ],
    applicationInstructions: "Log in with Aadhaar to SSP Karnataka portal. Fetch automated certificates via e-Pramana/Kutumba integration.",
    evidence: [
      {
        field: "domicile",
        excerpt: "Only permanent residents of Karnataka studying in recognized colleges within or outside the state are eligible.",
        isVerified: true,
        sourceUrl: "https://ssp.postmatric.karnataka.gov.in/"
      }
    ]
  }
];
