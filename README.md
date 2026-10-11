# NextStep AI — Modular Web Intelligence Platform
**TinyFish + LLM + Evidence-Based Deterministic Validation | HackIIITD 2026**

NextStep AI helps users discover opportunities and services scattered across the web, understand the information, verify important details against source evidence, and make informed decisions. Rather than simply returning raw search links or hallucinating answers with an ungrounded LLM, it transforms information retrieved from live websites into structured, evidence-backed recommendations.

---

## 1. Core Architecture & Differentiators

NextStep AI combines three complementary layers:

1. **TinyFish Web Retrieval**: Retrieves information from live websites and bypasses client-side rendering roadblocks.
2. **Structured LLM Extraction**: Interprets unstructured web content into strict, schema-validated JSON records with exact verbatim evidence quotes.
3. **Deterministic Validation Engine**: Non-LLM rule checks (substring match, ISO date parsing, URL integrity) to confirm claims against source text. **The LLM is never allowed to evaluate its own truthfulness.**

### Verification States
* `VERIFIED`: Excerpt found verbatim in source text, date is future-valid, URL is valid.
* `UNVERIFIED`: LLM made a claim whose supporting excerpt is absent from source text.
* `CONFLICTING`: Two retrieved sources state differing deadlines or requirements.
* `UNKNOWN`: Field not found on source page (explicitly `null`).
* `STALE`: Source timestamp older than configured freshness limit.

---

## 2. Project Structure

```
nextAI/
├── client/                     # React 19 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Footer, VerificationBadge, EvidenceDrawer
│   │   ├── features/           # Student & Government search forms & result cards
│   │   ├── pages/              # HomePage, StudentOpportunitiesPage, GovernmentSchemesPage, SavedItemsPage
│   │   ├── services/           # api.js (Backend REST client)
│   │   └── App.jsx
│   └── package.json
│
├── server/                     # Node.js + Express (ES Modules) Backend
│   ├── src/
│   │   ├── config/             # env.js, db.js
│   │   ├── controllers/        # health, student, government, jobs
│   │   ├── fixtures/           # developmentFixtures.js (Zod-validated test fixtures)
│   │   ├── middleware/         # error.middleware.js, validate.middleware.js
│   │   ├── models/             # SearchJob, Opportunity, Scheme, SourceEvidence, SavedItem, User
│   │   ├── routes/             # health, student, government, jobs
│   │   ├── services/           # jobStore.js
│   │   ├── validators/         # student.schema.js, government.schema.js, job.schema.js
│   │   └── app.js
│   ├── tests/                  # Vitest + Supertest automated suites
│   ├── server.js               # Backend entrypoint
│   └── package.json
│
├── docs/                       # Specifications & SDLC Blueprints
│   ├── SRS.md                  # Software Requirements Specification
│   ├── architecture.md         # Detailed System Architecture
│   └── database-and-api-spec.md# Database Schemas & REST API Contracts
│
├── .gitignore
├── package.json                # Root scripts
└── README.md
```

---

## 3. Getting Started

### Prerequisites
* **Node.js**: v18+ (tested on Node.js v24)
* **npm**: v9+
* **MongoDB**: Local MongoDB instance (`mongodb://127.0.0.1:27017/nextstep_ai`) or MongoDB Atlas. *(Note: Backend includes an in-memory fallback store for offline development).*

### Installation
Clone or open the workspace and install dependencies for both server and client:

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Configuration
The backend uses `server/.env`. A template is provided at `server/.env.example`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/nextstep_ai

# External Web Intelligence (To be configured in future phase)
TINYFISH_API_KEY=your_tinyfish_api_key_here

# LLM Provider (To be configured in future phase)
LLM_PROVIDER=gemini
LLM_API_KEY=your_llm_api_key_here
```

---

## 4. Running the Application

### Start Backend API Server
```bash
cd server
npm run dev
```
* Backend runs on: `http://localhost:5000`
* Healthcheck: `http://localhost:5000/api/health`

### Start Frontend Application
```bash
cd client
npm run dev
```
* Frontend runs on: `http://localhost:5173`

---

## 5. Running Automated Tests

Run backend integration and schema validation test suites:

```bash
cd server
npm test
```

### Test Coverage in Phase 1:
* `tests/health.test.js`: Verifies API gateway status, service activation, and DB state.
* `tests/student.test.js`: Validates search criteria schemas, job creation, polling, and rejection of invalid payloads.
* `tests/government.test.js`: Validates geographic & tier filters, scheme job creation, and error handling.

---

## 6. Phase 1 Implementation Status

* [x] **Repository inspection & documentation preserved**: [`docs/SRS.md`](file:///e:/nextAI/docs/SRS.md), [`docs/architecture.md`](file:///e:/nextAI/docs/architecture.md), [`docs/database-and-api-spec.md`](file:///e:/nextAI/docs/database-and-api-spec.md).
* [x] **Node.js + Express Backend Scaffolding**: ES modules, Zod validation middleware, centralized error handling, and healthcheck endpoint.
* [x] **MongoDB Data Models**: Mongoose schemas for `SearchJob`, `Opportunity`, `Scheme`, `SourceEvidence`, `SavedItem`, and `User`.
* [x] **Unified Store & Development Fixtures**: Clearly identified Zod-validated test fixtures with verbatim source excerpts and development flags.
* [x] **React + Vite + Tailwind CSS Frontend**: Responsive dark-mode interface with separate Student and Government portals, job progress banners, score gauges, and interactive Evidence & Provenance drawers.
* [x] **Automated Tests**: 100% test pass rate with Vitest and Supertest.
