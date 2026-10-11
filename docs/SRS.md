# NextStep AI — Software Requirements Specification (SRS)
**Project Title**: NextStep AI: An Evidence-Grounded, LLM-Powered Web Intelligence Platform  
**Target Milestone**: HackIIITD 2026 MVP  
**Version**: 1.0.0 (Waterfall Phase 1 & 2 Deliverable)  
**Status**: APPROVED BASELINE  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes the formal functional, non-functional, and interface requirements for **NextStep AI**. It serves as the authoritative baseline for the Waterfall development lifecycle through requirements analysis, system specification, architectural design, implementation, and rigorous validation.

### 1.2 Scope
NextStep AI is an evidence-grounded web intelligence platform that discovers live online opportunities and government initiatives, interprets unstructured content using a single Large Language Model (LLM), and subjects all extracted factual claims to deterministic validation against retrieved source text.

#### In-Scope for MVP (Phase 1–6):
1. **Student Opportunities Service**: Internships, hackathons, research opportunities, and scholarships with automated skills matching and deadline tracking.
2. **Government Schemes Service**: Education-related government schemes and scholarship schemes with published eligibility criteria assessment and document checklists.
3. **Live Web Retrieval Engine**: Integration with TinyFish API for search, page retrieval, and web agent navigation.
4. **Structured LLM Extraction & Explanation**: Strict schema-guided parsing of raw webpage text and evidence excerpt preservation.
5. **Deterministic Validation Engine**: Non-LLM rule evaluation verifying exact phrase presence, date sanity, URL security, freshness, and duplicate elimination.
6. **Asynchronous Polling Architecture**: Express-based job orchestrator supporting `PENDING -> RUNNING -> (COMPLETED | PARTIAL | FAILED)` states.

#### Out-of-Scope (Future Expansion / Post-Hackathon):
- Travel Intelligence (flights, trains, buses).
- Product Intelligence & Price Tracking.
- Career Intelligence (dynamic career graph mapping).
- Multi-agent autonomous debate systems or custom LLM fine-tuning.
- Direct automated submission/application forms on external government portals.

---

## 2. Overall Description

### 2.1 Product Perspective
NextStep AI operates as a modular monolith. Unlike traditional search engines that return raw, unverified link listings, or generative chatbots that hallucinate dates and eligibility rules, NextStep AI pairs **TinyFish live retrieval** with **deterministic evidence verification**.

```
+-----------------------------------------------------------------------+
|                             USER CLIENT                               |
+-----------------------------------------------------------------------+
                                   |
                                   v
+-----------------------------------------------------------------------+
|                            BACKEND API                                |
|  +---------------------+   +---------------------+   +-------------+  |
|  | Student Opportunity |   |  Government Scheme  |   | Job Status  |  |
|  |       Service       |   |       Service       |   |   Engine    |  |
|  +---------------------+   +---------------------+   +-------------+  |
+-----------------------------------------------------------------------+
                                   |
         +-------------------------+-------------------------+
         v                                                   v
+--------------------+                             +--------------------+
|  TINYFISH RETRIEVAL|                             |    LLM EXTRACTOR   |
| (Live Web Search & |                             | (Structured Output |
|   Page Fetching)   |                             |    with Excerpts)  |
+--------------------+                             +--------------------+
         \                                                   /
          +------------------------+------------------------+
                                   v
                    +-----------------------------+
                    | DETERMINISTIC VALIDATOR     |
                    | - Exact Substring Evidence  |
                    | - Date & Freshness Check    |
                    | - Official Source Priority  |
                    +-----------------------------+
                                   |
                                   v
                    +-----------------------------+
                    |       MONGODB STORAGE       |
                    +-----------------------------+
```

### 2.2 User Personas & Stakeholders
1. **College Student (Aryan, 20)**: Computer Science undergraduate searching for Summer 2026 backend/full-stack internships and hackathons matching his React/Node skill set. Needs to know confirmed deadlines and valid application URLs without spam aggregator links.
2. **Scholarship Applicant (Priya, 19)**: First-generation student seeking state and central government higher education scholarships. Needs an unambiguous breakdown of satisfied vs. unknown eligibility criteria and the exact list of required certificates (income certificate, domicile, marksheets).
3. **Evaluation Jury (HackIIITD 2026)**: Technical judges assessing real-world TinyFish integration, proof-of-provenance, avoidance of hallucinations, modular clean-code standards, and system resilience under network/data latency.

---

## 3. Specific Functional Requirements (FR)

| ID | Title | Description | Acceptance Criteria |
| :--- | :--- | :--- | :--- |
| **FR-01** | Service Selection Portal | Homepage displays distinct, dedicated service cards for "Student Opportunities" and "Government Schemes" rather than a single universal search bar. | Selecting a card routes immediately to `/student` or `/government` with tailored search schemas. |
| **FR-02** | Student Profile Management | Users configure educational level, academic degree, year of study (1–4), technical skills tags, and location preference (City / Remote). | Parameters persist in local session or database profile; used automatically to filter searches. |
| **FR-03** | Student Opportunity Discovery | User submits search filters (category: Internship / Hackathon / Research / Scholarship, skills, location). Backend dispatches TinyFish discovery task. | TinyFish returns external website content; orchestrator creates an asynchronous job record with a unique `jobId`. |
| **FR-04** | Government Scheme Discovery | User submits demographic/academic criteria (state, education tier, category). Backend queries verified official sources (`.gov.in`, `.nic.in`, UGC, AICTE) via TinyFish. | Queries prioritize official portals over unverified aggregator blogs. |
| **FR-05** | Structured LLM Extraction | An LLM transforms unstructured HTML/Markdown into a strict JSON contract containing title, organization, eligibility criteria, skills, deadline, location, and supporting verbatim excerpt. | Output parses against Zod schemas; hallucinations or malformed JSON trigger controlled retries or quarantine. |
| **FR-06** | Evidence-Based Validation | Deterministic engine compares extracted claims against source text. If a deadline or eligibility claim excerpt does not exist as an exact substring in raw text, it is marked `UNVERIFIED`. | No claim is labeled `VERIFIED` without an exact supporting excerpt match from an active source. |
| **FR-07** | Eligibility Criteria Engine | Scheme requirements are categorized into criteria: Satisfied, Unsatisfied, and Unknown. | System displays: *"Potentially eligible — [X] requirements verified, [Y] unknown"*. It must explicitly state it is not an official government grant. |
| **FR-08** | Multi-Factor Opportunity Ranking | Compute composite relevance score: $S = 0.35E + 0.30K + 0.20R + 0.10L + 0.05D$ (Eligibility, Skills, Relevance, Location, Deadline). | Scores normalized to [0, 100]; ranking transparently displays match rationale. |
| **FR-09** | Saved Items & Provenance View | Users can bookmark opportunities and schemes with complete snapshot of evidence, retrieved timestamp, and official URL. | Saved items stored in `savedItems` collection; accessible offline from cache. |
| **FR-10** | Resilient Error & Timeout Handling | Gracefully handle TinyFish rate limits, external site 404/503 errors, LLM token limits, and network dropouts. | Jobs transition to `PARTIAL` if at least 1 source succeeds, or `FAILED` with human-readable error messages. Never fabricate synthetic data. |

---

## 4. Verification States Specification

To ensure auditability, each extracted field adheres to a strict 5-state lifecycle:

1. **`VERIFIED`**: The extracted attribute matches an exact verbatim excerpt located within the retrieved primary/official source document, passes format/logical sanity checks, and falls within the current validity cycle.
2. **`UNVERIFIED`**: Extracted by the LLM, but either the supporting excerpt fails exact text matching or the source is an unaccredited third-party aggregator.
3. **`CONFLICTING`**: Multiple retrieved sources report contradictory values (e.g., Portal A claims Deadline is 30 Oct 2026, Portal B claims 15 Nov 2026).
4. **`UNKNOWN`**: Field was not discovered or published on the retrieved pages (e.g., application deadline is unspecified or rolling). Represented explicitly as `null`, never guessed.
5. **`STALE`**: Evidence timestamp exceeds the domain TTL (e.g., retrieved > 7 days ago for internships, > 30 days for schemes).

---

## 5. Non-Functional Requirements (NFR)

- **NFR-01: Security**: TinyFish API keys, LLM API keys, and MongoDB credentials exist strictly in server-side `.env` files. Retrieved web content is treated as untrusted user input to mitigate prompt injection.
- **NFR-02: Performance**: Search job status polling endpoint (`/api/jobs/:jobId`) responds in $< 50\text{ ms}$. Web scraping and LLM extraction complete within 8–20 seconds for standard queries.
- **NFR-03: Reliability**: Background search worker ensures that failure of one target domain does not abort sibling retrievals.
- **NFR-04: Transparency**: UI includes an expandable "Evidence & Provenance Panel" on every result card revealing the exact raw excerpt, source URL, and timestamp.
- **NFR-05: Maintainability**: Modular Monolith design with clean domain boundaries allowing independent addition of future modules (`travel/`, `products/`).
