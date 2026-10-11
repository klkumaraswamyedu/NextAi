# NextStep AI — Database & REST API Specification
**HackIIITD 2026** | Waterfall Phase 3 Deliverable  
**Document Ref**: `docs/database-and-api-spec.md`

---

## 1. Database Collections & Schema Models (MongoDB)

### 1.1 `searchJobs` Collection
Tracks asynchronous background web search, crawling, and extraction jobs.

```json
{
  "_id": "ObjectId",
  "serviceType": "STUDENT | GOVERNMENT",
  "query": "String",
  "filters": {
    "category": "INTERNSHIP | HACKATHON | RESEARCH | SCHOLARSHIP",
    "skills": ["JavaScript", "React"],
    "location": "Bengaluru",
    "state": "Karnataka",
    "educationTier": "UNDERGRADUATE"
  },
  "status": "PENDING | RUNNING | COMPLETED | PARTIAL | FAILED",
  "progress": 75,
  "currentStage": "VALIDATING_EVIDENCE",
  "resultCount": 4,
  "errorMessage": null,
  "createdAt": "2026-10-11T04:30:00.000Z",
  "completedAt": "2026-10-11T04:30:12.000Z"
}
```

### 1.2 `opportunities` Collection (Student Domain)
Stores normalized student opportunities.

```json
{
  "_id": "ObjectId",
  "jobId": "ObjectId",
  "title": "Full Stack Engineering Intern",
  "organization": "NextGen Labs",
  "category": "INTERNSHIP",
  "location": "Bengaluru (Hybrid)",
  "remote": false,
  "eligibility": [
    {
      "criteria": "Enrolled in B.Tech / B.E. Computer Science or related degree",
      "evidenceExcerpt": "Applicants must be currently enrolled in an accredited undergraduate degree in CS or IT.",
      "isVerified": true
    }
  ],
  "skills": ["React", "Node.js", "TypeScript"],
  "deadline": "2026-11-15T23:59:59.000Z",
  "deadlineRaw": "November 15, 2026",
  "sourceUrl": "https://nextgenlabs.io/careers/intern-2026",
  "applicationUrl": "https://nextgenlabs.io/apply/3482",
  "relevanceScore": 88,
  "scoreBreakdown": {
    "eligibilityMatch": 100,
    "skillsMatch": 85,
    "careerRelevance": 90,
    "locationMatch": 100,
    "deadlineSuitability": 80
  },
  "explanation": "High match based on your proficiency in React & Node.js, and hybrid availability in Bengaluru.",
  "verificationStatus": "VERIFIED",
  "lastCheckedAt": "2026-10-11T04:30:12.000Z"
}
```

### 1.3 `schemes` Collection (Government Domain)
Stores verified government education schemes and scholarship programs.

```json
{
  "_id": "ObjectId",
  "jobId": "ObjectId",
  "name": "Post-Matric Scholarship for Higher Education",
  "department": "Ministry of Social Justice & Empowerment",
  "officialUrl": "https://scholarships.gov.in/post-matric-2026",
  "state": "All India / Central",
  "eligibilityRules": [
    {
      "ruleId": "edu_level",
      "description": "Student pursuing post-matriculation or post-secondary courses",
      "evidenceExcerpt": "Applicable for students pursuing post-matriculation courses in recognized institutions.",
      "status": "SATISFIED"
    },
    {
      "ruleId": "income_limit",
      "description": "Annual parental income not exceeding INR 2,50,000",
      "evidenceExcerpt": "Total family income from all sources must not exceed Rs. 2.50 lakh per annum.",
      "status": "UNKNOWN"
    }
  ],
  "requiredDocuments": [
    "Income Certificate issued by competent authority",
    "College Bonafide / Enrollment Certificate",
    "Previous Academic Year Marksheet",
    "Aadhaar-seeded Bank Account Passbook"
  ],
  "applicationInstructions": "Apply online exclusively through National Scholarship Portal (NSP). Do not submit physical forms to ministry.",
  "deadline": "2026-11-30T23:59:59.000Z",
  "verificationStatus": "VERIFIED",
  "lastCheckedAt": "2026-10-11T04:30:15.000Z"
}
```

### 1.4 `sourceEvidence` Collection
Maintains strict provenance linkage for every factual claim.

```json
{
  "_id": "ObjectId",
  "entityType": "OPPORTUNITY | SCHEME",
  "entityId": "ObjectId",
  "field": "deadline | eligibility | requiredDocuments",
  "sourceUrl": "https://nextgenlabs.io/careers/intern-2026",
  "supportingExcerpt": "Applications close promptly on November 15, 2026 at 11:59 PM IST.",
  "exactMatchFound": true,
  "confidenceScore": 1.0,
  "retrievedAt": "2026-10-11T04:30:08.000Z",
  "verificationStatus": "VERIFIED"
}
```

---

## 2. REST API Contract

### 2.1 Unified Jobs Endpoints

#### `GET /api/jobs/:jobId`
Returns real-time processing status and stage for search jobs.

**Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "jobId": "653a9f1b2c4e8d0012a4b891",
    "serviceType": "STUDENT",
    "status": "RUNNING",
    "progress": 65,
    "currentStage": "EXTRACTING_STRUCTURED_DATA",
    "resultCount": 3,
    "createdAt": "2026-10-11T04:30:00.000Z"
  }
}
```

---

### 2.2 Student Opportunities Endpoints

#### `POST /api/student/search`
Initiates an asynchronous discovery job for opportunities.

**Request Body**:
```json
{
  "category": "INTERNSHIP",
  "skills": ["React", "Node.js", "Python"],
  "academicYear": 3,
  "location": "Bengaluru",
  "isRemote": false
}
```

**Response `202 Accepted`**:
```json
{
  "success": true,
  "data": {
    "jobId": "653a9f1b2c4e8d0012a4b891",
    "status": "PENDING",
    "message": "Search job scheduled successfully."
  }
}
```

#### `GET /api/student/search/:jobId`
Retrieves search job details and populated opportunity results once completed.

**Response `200 OK`**:
```json
{
  "success": true,
  "data": {
    "jobId": "653a9f1b2c4e8d0012a4b891",
    "status": "COMPLETED",
    "resultCount": 5,
    "opportunities": [
      {
        "id": "653a9f2a2c4e8d0012a4b895",
        "title": "Full Stack Engineering Intern",
        "organization": "NextGen Labs",
        "category": "INTERNSHIP",
        "location": "Bengaluru (Hybrid)",
        "skills": ["React", "Node.js", "TypeScript"],
        "deadline": "2026-11-15T23:59:59.000Z",
        "relevanceScore": 88,
        "verificationStatus": "VERIFIED",
        "sourceUrl": "https://nextgenlabs.io/careers/intern-2026",
        "evidence": [
          {
            "field": "deadline",
            "excerpt": "Applications close promptly on November 15, 2026 at 11:59 PM IST.",
            "isVerified": true
          }
        ]
      }
    ]
  }
}
```

---

### 2.3 Government Schemes Endpoints

#### `POST /api/government/search`
Initiates a scheme search job against government portals.

**Request Body**:
```json
{
  "educationLevel": "UNDERGRADUATE",
  "state": "Karnataka",
  "category": "MERIT_CUM_MEANS",
  "familyIncome": 200000
}
```

**Response `202 Accepted`**:
```json
{
  "success": true,
  "data": {
    "jobId": "653a9f3b2c4e8d0012a4b899",
    "status": "PENDING",
    "message": "Government scheme discovery job scheduled."
  }
}
```

#### `GET /api/government/search/:jobId`
Returns discovered schemes with complete eligibility breakdowns and document checklists.

---

### 2.4 Error Response Standard

All endpoints follow a unified error envelope:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED | RATE_LIMITED | JOB_NOT_FOUND | INTERNAL_ERROR",
    "message": "Human-readable explanation of error.",
    "details": []
  }
}
```
