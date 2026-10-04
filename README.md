# DviSetu - Government Startup Innovation Procurement Platform
**Smart India Hackathon 2026 &bull; Problem Statement SIH26136**  
**Organization:** Government of Maharashtra  
**Department:** Department of Skills, Employment, Entrepreneurship & Innovation  
**Disclaimer:** *SIH26136 Demonstration Platform &bull; Prototype for presentation and evaluation purposes only.*

---

DviSetu is a formal, enterprise-grade government innovation procurement platform built to bridge the gap between public departments and eligible DPIIT startups. It replaces rigid lowest-bid (L1) tender mechanics with transparent capability matching, automated statutory eligibility screening, milestone-based performance contracting, independent technical validation, and evidence-based scale authorization decrees.

---

## 🚀 How to Run the Application
1. **Zero Setup / Double-Click Execution:**
   - Double-click `index.html` in any modern web browser.
   - Zero `npm`, zero build steps, zero external CDN dependencies, and 100% offline capable.
2. **Local HTTP Server (Optional):**
   - Run `python3 -m http.server 8000` or `npx serve .` from the repository root and open `http://localhost:8000/index.html`.

---

## ⏱️ 3-Minute Judge Demonstration Script

### **Stage 1: Operational Role Sign In & Portal Entry (0:00 - 0:30)**
- Open `index.html` (Initial DviSetu Login Portal).
- Select your operational role (**Government Officer**, **Startup Founder**, or **Expert / Evaluator**) to reveal the dedicated login form.
- Use 1-click demonstration auto-fill or enter credentials, and click **"Sign In"** &rarr; routes directly to `gov/dashboard.html` (or respective role workspace).
- Note: The full 10-step lifecycle tour & PS requirement matrix is preserved and directly accessible via `overview.html` or the header link.

### **Stage 2: Operational Dashboard & Multi-Step Challenge Creation (0:30 - 1:00)**
- Review 8 operational indicators: Active Challenges, Applications Received, Pending Evaluations, Active Pilots, Milestones Due, Pilots Needing Attention, Completed Pilots, Scale Decrees.
- Observe the Procurement Pipeline Operational Funnel (Challenges &rarr; Applications &rarr; Evaluated &rarr; Pilots &rarr; Scaled).
- Test the debounced search and sector filters on the challenges table.
- Click **"+ Create New Challenge"** &rarr; `gov/create-challenge.html`.
- Step through the 4-step wizard:
  1. *Administrative Scope:* Department, Unit, Sector, Problem Statement, Baseline & Outcome.
  2. *Commercials & Governance:* Budget, Duration, Capability Tags, Cybersecurity & Risk clauses.
  3. *Eligibility Criteria:* Mandatory GSTIN, DPIIT, Certifications, Turnover threshold, and Conflict undertaking.
  4. *Success Metrics:* Dynamic KPI table with Baseline, Target, Unit, and Higher/Lower is better.
- Click **"Publish Challenge"** &rarr; Auto-redirects to Command Center (`gov/challenge-detail.html`).

### **Stage 3: Startup Discovery, Capability Matching & Eligibility (1:00 - 1:30)**
- Click **"Startup Discovery"** in the sidebar (`gov/startups.html`).
- Select **"Match against Challenge: CH-101"** & filter by sector/stage/certification.
- View live Capability Overlap % (e.g. 92% Match with matched/missing badges) and statutory credentials.
- Navigate to `gov/challenge-detail.html?id=CH-101`:
  - **Matched Startups Tab:** Transparent match breakdown (matched tags, missing tags, sector bonus).
  - **Applications & Eligibility Tab:** Automated audit checklist with explicit legal reasons for GST, DPIIT, ISO, Turnover, and Conflict declarations.
  - Click **"Shortlist"** &rarr; Logged to audit trail.

### **Stage 4: Expert Multi-Criteria Evaluation (1:30 - 2:00)**
- Switch role to **Expert Evaluator** (via Topbar "Switch Role" button or navigate to `expert/evaluate.html`).
- Click **"⚙️ Configure Weights"** to observe non-hardcoded, customizable criteria percentages.
- Adjust the 6 factor sliders: Feasibility (25%), Impact (25%), Innovation (20%), Scalability (15%), Cost (10%), Readiness (5%).
- Observe live total weighted score calculation (e.g., `87.0 / 100`) and scoring summary table.
- Click **"Submit Official Score"** &rarr; Score logged with evaluator audit record.

### **Stage 5: Pilot Execution, Milestone Tracking & Payment Tranches (2:00 - 2:30)**
- Navigate to `gov/pilot.html?id=PL-901` (MedQ HealthTech OPD Queue Pilot).
- Inspect the **Sequential Visual Timeline Track** and **Payment Status / Milestone Disbursement Tracking** bar (no fake bank claims).
- Under Milestone Verification, observe the 7-state transitions (`Not Started`, `In Progress`, `Submitted`, `Under Review`, `Approved`, `Rejected`, `Completed`).
- Click **"✓ Authorize Disbursement"** on Milestone 2:
  - Milestone status flips to **Approved / Disbursed**.
  - Payment progress bar advances live.
- Under **KPI Performance Audit**, edit actual achieved metric (e.g., set wait time to `35 min`) & click **"Save & Update KPI Audit Metrics"** &rarr; Auto-evaluates to **TARGET ACHIEVED (+70.8% Improvement)**.

### **Stage 6: Independent Validation & Evidence-based Scale Review (2:30 - 3:00)**
- Under **Independent Third-Party Technical Validation**, review Agency (NHA Tech Evaluation Cell), Reviewer, Reference ID, and set status to **Approved**.
- Click **"Proceed to Evidence-based Scale Review (Step 10)"** &rarr; `gov/scale-decision.html`.
- Inspect the **5 Decision Factor Indicators** (KPI benchmark rate &ge; 80%, Budget compliance, 3rd-party validation, deliverables verified, operational risk).
- Review automated recommendation: **Ready for State-Wide Scale**.
- Select scope: **State-wide (All 36 District Hospitals in Maharashtra)**, confirm budget allocation, and click **"✍️ Authorize & Finalize Scale Decision Decree"**.
- Navigate to `gov/audit-trail.html` &rarr; View complete chronological, immutable log of every action taken!

---

## 🧮 Pure Business Rules Engine (`assets/js/rules.js`)
All core procurement logic is decoupled into pure, deterministic mathematical functions:
1. `calculateMatchScore(challengeTags, startupTags, challengeSector, startupSector)`:
   - Tag overlap (80% weight) + sector alignment (20% bonus). Returns `{ score, matchedTags, missingTags, sectorAligned }`.
2. `checkEligibility(startup, criteria)`:
   - Evaluates GSTIN, DPIIT certificate, quality/security certifications, financial turnover, and conflict declarations. Returns `{ eligible, status, score, checklist }`.
3. `calculateWeightedScore(scores, customWeights)`:
   - Configurable multi-criteria evaluation with normalization.
4. `calculateKPIImprovement(baseline, target, actual, higherIsBetter)`:
   - Evaluates percentage improvement with direction-aware pass/fail thresholds.
5. `calculateScaleRecommendation(kpiResults, budgetAdherence, validationApproved)`:
   - Evidence-based scale readiness calculation (`Scale Up`, `Conditional Scale`, `Do Not Scale`).
6. `formatINR(amount)`:
   - Indian numbering system formatter (₹ Lakhs / Crores).

---

## 📁 Repository Directory Structure

```
DviSetu/
├── index.html                  # Formal initial login portal with 2-step role authentication
├── overview.html               # Preserved landing portal with 10-step lifecycle tour & PS matrix
├── login.html                  # Dedicated direct login route
├── README.md                   # Complete documentation & 3-minute judge script
├── docs/
│   └── SI26136_IMPLEMENTATION_PLAN.md # Comprehensive architecture & inspection plan
├── assets/
│   ├── css/
│   │   └── styles.css          # Government enterprise design system (tokens, tables, wizard, audit)
│   └── js/
│       ├── rules.js            # Pure business rules engine
│       ├── data.js             # Seed demonstration mock data (challenges, startups, pilots, audits)
│       ├── store.js            # LocalStorage state manager with audit log & document methods
│       ├── app.js              # Administrative shell, role switcher, stepper & footer disclaimer
│       ├── index.js            # Landing page interactive tour controller
│       ├── gov-dashboard.js    # Operational dashboard with 8 metrics & debounced filter
│       ├── challenges.js       # Filterable challenges repository
│       ├── create-challenge.js # 4-step challenge creation wizard controller
│       ├── startups.js         # Government Startup Discovery & capability matching controller
│       ├── challenge-detail.js # Command center: matching, eligibility checklist, selection
│       ├── gov-pilot.js        # Pilot oversight: milestone state machine, payments, KPI audit, validation
│       ├── scale-decision.js   # Evidence-based scale review & decree generator
│       ├── audit-trail.js      # Chronological audit trail ledger controller
│       ├── evaluate.js         # Expert workspace with configurable weights & score log
│       ├── startup-dashboard.js# Startup portal overview & milestone tracking
│       ├── browse-challenges.js# Startup challenge discovery with eligibility check
│       ├── apply.js            # Proposal submission with statutory declarations
│       └── my-pilot.js         # Startup deliverable evidence uploads & disbursement status
├── gov/
│   ├── dashboard.html          # Operational metrics, pipeline funnel, active pilots
│   ├── challenges.html         # All published challenges listing
│   ├── create-challenge.html   # 4-step challenge creation wizard
│   ├── startups.html           # Startup discovery & capability repository
│   ├── challenge-detail.html   # 4-tab challenge command center
│   ├── pilot.html              # Pilot management, milestone approvals, KPI audit, validation
│   ├── scale-decision.html     # Evidence-based scale authorization decree generator
│   └── audit-trail.html        # Transparent administrative audit ledger
├── expert/
│   └── evaluate.html           # 6-factor proposal evaluation workspace with configurable weights
└── startup/
    ├── dashboard.html          # Startup bid tracking & active pilot overview
    ├── browse-challenges.html  # Search & filter open government challenges
    ├── apply.html              # Technical proposal & commercial submission form
    └── my-pilot.html           # Milestone execution, proof upload & payout tracking
```
