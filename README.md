# Tribal Saarthi – Intelligent End-to-End Scholarship Administration Platform

Welcome to the **Tribal Saarthi** repository. This project is the official submission by **Team AIH** for the **Smart India Hackathon 2026**.

## 📌 Project Details
- **Problem Statement ID:** 26239
- **Problem Statement Title:** AI-Enabled Scholarship and Fellowship Management System for Scheduled Tribes
- **Theme:** Smart Education
- **PS Category:** Software
- **Team ID:** 160604
- **Team Name:** AIH

---

## 📖 The Problem: Fragmented Ecosystem
Currently, ST students must navigate fragmented scholarship and fellowship processes, while officials repeatedly verify documents, eligibility, and applications across multiple stages. 
- **Key Issues Identified:** Repeated verification, processing delays, document/eligibility errors, repeated correspondence, and limited real-time visibility.
- **Configurable-process Problem:** The same applicant information often requires repeated submission, scrutiny, and correspondence.

**Tribal Saarthi** solves this by acting as an intelligent, end-to-end administration platform built to convert these fragmented scheme workflows into one **configurable orchestration layer** without disrupting existing government workflows.

---

## 🌟 Unique Selling Points (USPs)
1. **"DIALECT-SHIELD" (Tribal Name Transliteration Engine):** Uses custom Soundex + Levenshtein Distance matching to address variations in tribal names across English, Hindi, and regional scripts.
2. **"TRIBAL COVERAGE GAP ENGINE" (District-Level Demand Analytics):** Identifies "DARK ZONES" featuring high ST populations but low application rates.
3. **"ARTICLE 342 CONSTITUTIONAL LOOKUP":** Automatically validates whether the applicant's claimed tribe/sub-caste is recognized under the Presidential Order for their state.
4. **"MEITY BHASHINI MULTILINGUAL ENGINE":** Integrates MeitY Bhashini / ULCA-based language services to provide multilingual UI, translation, and voice support.
5. **REAL-TIME GOVERNANCE DASHBOARDS:** SLA monitoring, audit trails, and process bottleneck insights (Trace delays through Scheme → State → Institute → Stage → Cause).
6. **"EVIDENCE WALLET":** Reuses verified documents across schemes via SHA-256 hash-linked records with validity tracking. No duplicate verification if still valid.

---

## 🏗️ Core Architecture & Features
The unified application dashboard supports 5 primary MoTA schemes: **NFST, NOS, TCE, PMS-ST, PreMS-ST**.

### 1. Platform Workflow & Intelligence
- **Scheme Rule Engine & Policy Impact Simulator:** Keep rules as configurable versions (Draft → simulate → approve → publish).
- **AI & Document Intelligence:** OCR Extraction (Tesseract/PaddleOCR), Document Quality Guard (blur, contrast check), Duplicate Detection (SHA-256 fuzzy lookup).
- **3-Layer Trust Shield:** Detects document tampering (ELA, EXIF, moiré).

### 2. Disbursement & Action
- Pre-Disbursement Readiness, Aadhaar-Bank Seeding, and IFSC Validation.
- 5-Stage Payment Tracker and Stuck Payment Alerts.

### 3. External Services & Integrations
- **DigiLocker API & Aadhaar e-KYC / NPCI Mapper**
- **PFMS / DBT Gateway & Jan Parichay SSO**
- **MeitY Bhashini NMT (Multilingual)**

---

## 💻 Technical Stack
**Frontend:**
- React 18 + TypeScript + Vite + Tailwind CSS *(Note: Prototype uses HTML/CSS/JS for demonstration)*

**Backend & Data Processing:**
- Python FastAPI + Pydantic (Secure APIs & application logic)
- PostgreSQL + PostGIS (Applications, beneficiaries, rules, and records)

**AI & Document Intelligence:**
- **Configurable Rule Engine:** Python + Pydantic + JSON Rule Trees
- **OCR:** Tesseract / PaddleOCR + OpenCV
- **3-Layer Trust Shield:** OpenCV + ELA + LMStudio + LlamaGuard (Detects tampering and suspicious submissions)
- **Policy Impact Simulator:** Pandas + NumPy (Simulates policy changes on existing applications)
- **AI/ML:** scikit-learn + Optional Local LLM (Intent classification, decision support)

**Infrastructure & Others:**
- **Workflow Queue:** Redis + Celery / RQ (Handles asynchronous OCR and validation tasks)
- **Evidence Wallet:** IBM-DS6 Hack + Verifiable Tracking

---

## ⚖️ Feasibility & Viability
- **Technical Viability:** Policy-as-Data + Evidence-First architecture. Version-pinned processing ensures exactly reproducible decisions. Adapter-based integration with existing platforms (MoTA, NSP/State, DigiLocker).
- **Economical Viability:** Build once, scale across schemes using open-source, modular technology. Automation reduces manual overhead without requiring an expensive all-at-once system replacement.
- **Operational Viability:** "No-disruption" adoption. Focuses on an **Exception-first** and **Cure-not-reject** workflow (applicants fix only the identified deficiency).

### Overcoming Challenges
- **Challenge:** AI output is difficult to justify. 
  - **Strategy:** Evidence-to-Decision Chain (Policy → Rule → Document → Extracted Value → AI Flag → Human Decision).
- **Challenge:** Policy changes disrupt workflows or have unintended effects.
  - **Strategy:** Policy Impact Simulator allows running proposed rules on existing applications first before publishing.

---

## 🚀 Impact & Benefits
- **Applicant Journey Becomes Predictable:** Shifts from "submit and wait" to visible, trackable journey. Proactive WhatsApp/SMS/Email notifications are sent at every stage.
- **Traceable MoTA Decision-Making:** Cryptographic audit trails make every decision tamper-evident and RTI-exportable.
- **Observable Ecosystem:** Works as an orchestration layer integrating seamlessly with existing interfaces instead of showing individual application statuses blindly.
- **Social & Operational Benefits:** Clearer access, automated eligibility checks, and a common bilingual digital interaction platform.

---

## 🔮 Future Scope
1. **Full multi-scheme lifecycle support:** Extending across verification, selection, sanction, renewal, and grievance management without rebuilding core systems.
2. **Explainable AI + Human Decision:** AI handles document classification and cross-checks, while eligibility remains rule-driven and final decisions stay with authorized officials.
3. **Integration-First, Not Replacement-First:** Gradual adoption while preserving existing government infrastructure through replaceable adapters.

---

## 🛠 Setup & Running Locally (Prototype)
1. Clone the repository.
2. Open `index.html` in your browser.
3. No build tools are required for this frontend prototype demonstration.

## ⚠️ Disclaimer
All data, IDs, and tokens in this prototype are synthetic/demo data and do not represent real individuals.
