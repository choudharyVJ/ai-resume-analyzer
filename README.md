# 🤖 AI PDF Analyzer & Resume ATS Scorer

An intelligent, full-stack web application designed to parse, extract, and deeply evaluate PDF resumes. By leveraging high-performance processing on the backend and advanced LLM reasoning via Groq, this application provides candidates and recruiters with institutional-grade ATS scoring, skill mapping, and actionable career development suggestions.

---

## 🚀 Key Features

*   **⚡ Sub-Second PDF Text Extraction:** Driven by `pypdf` to swiftly parse raw text without performance bottlenecks.
*   **🎯 Intent-Aware Skill Mapping:** Dissects the candidate's core competencies, tools, and methodologies.
*   **📊 Algorithmic ATS Scoring:** Evaluates document alignment against modern applicant tracking standards.
*   **🔍 Granular SWOT Analytics:** Highlights explicitly isolated strengths, critical skill gaps, and developmental weaknesses.
*   **👔 Recruiter Insights Feed:** Provides objective, high-level structural notes simulating an executive recruiter's viewpoint.
*   **💡 Proactive AI Suggestions:** Delivers concrete, contextual recommendations for resume optimization.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **Animations:** Framer Motion
*   **Utilities:** jsPDF

### Backend
*   **Framework:** Django 5.2 + Django REST Framework (DRF) 3.17
*   **AI Engine:** Groq API SDK (`groq-cloud`)
*   **PDF Parser:** pypdf 6.12
*   **Data Validation:** Pydantic v2

### Infrastructure & Deployment
*   **Frontend Hosting:** Vercel
*   **Backend Hosting:** Render
*   **Database:** SQLite (Development) / PostgreSQL (Production)

---

## 📂 Project Structure

```text
├── frontend/ (Next.js Application)
│   ├── src/
│   │   ├── app/            # App router pages & layouts
│   │   ├── components/     # UI atoms, layout wrappers, & analysis charts
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── upload/
│   │   │   └── analysis/
│   │   ├── services/       # API call definitions & client architecture
│   │   ├── lib/            # Utility functions
│   │   ├── types/          # TypeScript structural definitions
│   │   └── styles/         # Custom globals and design configurations
│   └── package.json
│
└── backend/ (Django REST Application)
    ├── apps/
    │   └── resume_analyzer/# Core business logic, APIs, and AI processing
    ├── backend/            # Main project configuration (settings, urls)
    ├── media/              # Temporary file storage directories
    ├── utils/              # Helper modules and AI prompting templates
    └── requirements.txt