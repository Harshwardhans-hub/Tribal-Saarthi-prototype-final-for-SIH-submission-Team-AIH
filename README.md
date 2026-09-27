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

## 📖 Overview
ST students must navigate fragmented scholarship and fellowship processes, while officials repeatedly verify documents, eligibility, and applications across multiple stages. The same applicant information often requires repeated submission, scrutiny, and correspondence, creating delays, inconsistent verification, and limited real-time visibility.

**Tribal Saarthi** is an intelligent, end-to-end administration platform built to convert these fragmented scheme workflows into one configurable orchestration layer without disrupting existing government workflows.

---

## 🌟 Unique Selling Points (USPs)
1. **"DIALECT-SHIELD" (Tribal Name Transliteration Engine):** Uses custom Soundex + Levenshtein Distance matching to address variations in tribal names across English, Hindi, and regional scripts.
2. **"TRIBAL COVERAGE GAP ENGINE" (District-Level Demand Analytics):** Identifies "DARK ZONES" featuring high ST populations but low application rates.
3. **"ARTICLE 342 CONSTITUTIONAL LOOKUP":** Automatically validates whether the applicant's claimed tribe/sub-caste is recognized under the Presidential Order for their state.
4. **"MEITY BHASHINI MULTILINGUAL ENGINE":** Integrates MeitY Bhashini / ULCA-based language services to provide multilingual UI, translation, and voice support.
5. **REAL-TIME GOVERNANCE DASHBOARDS:** SLA monitoring, audit trails, and bottleneck insights to trace delays precisely.
6. **"EVIDENCE WALLET":** Reuses verified documents across schemes via SHA-256 hash-linked records with validity tracking.

---

## 💻 Technical Stack
**Frontend:**
- React 18 + TypeScript + Vite + Tailwind CSS (Note: Prototype uses HTML/CSS/JS for demonstration)

**Backend & Data Processing:**
- Python FastAPI + Pydantic
- PostgreSQL + PostGIS

**AI & Document Intelligence:**
- **Configurable Rule Engine:** Python + Pydantic + JSON Rule Trees
- **OCR:** Tesseract / PaddleOCR + OpenCV
- **3-Layer Trust Shield:** OpenCV + ELA + LMStudio + LlamaGuard (Detects tampering and suspicious submissions)
- **Policy Impact Simulator:** Pandas + NumPy (Simulates policy changes)
- **AI/ML:** scikit-learn + Optional Local LLM

**Infrastructure & Others:**
- **Workflow Queue:** Redis + Celery / RQ
- **Evidence Wallet:** Tamper-evident records of authenticated evidence

---

## 🎯 Target Users & Stakeholders
- ST Applicants
- Selection Committee / Expert Panel
- Institute Nodal Officers
- MoTA Approving Officers
- Finance / DBT Officers
- Scheme Administrators

---

## 🚀 Key Benefits
- **Predictable Applicant Journey:** Proactive WhatsApp/SMS/Email notifications, continuous visibility, and "Cure-not-reject" workflows.
- **Traceable MoTA Decision-Making:** Cryptographic audit trails ensure every decision follows the *Policy → Evidence → Rule → Human Decision → Audit* chain.
- **Observable Ecosystem:** Works as an orchestration layer integrating seamlessly with existing MoTA, NSP/State portals, DigiLocker, and DBT/PFMS.

---

## 🛠 Setup & Running Locally (Prototype)
1. Clone the repository.
2. Open `index.html` in your browser.
3. No build tools are required for this frontend prototype demonstration.

## ⚠️ Disclaimer
All data, IDs, and tokens in this prototype are synthetic/demo data and do not represent real individuals.
