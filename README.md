# DviSetu
## Government–Startup Innovation Procurement Platform

**Smart India Hackathon 2026 · Problem Statement SIH26136**  
**Organization:** Government of Maharashtra  
**Department:** Department of Skills, Employment, Entrepreneurship & Innovation  
**Solution Category:** Project Management  
**Platform Type:** Web-based demonstration prototype

> **Disclaimer:** DviSetu is an SIH26136 demonstration platform developed for presentation and evaluation purposes. It is not an official Government of Maharashtra procurement system.

---

## 1. Executive Summary

**DviSetu** is a structured digital platform designed to connect government departments with eligible startups through a transparent, measurable and repeatable innovation-procurement lifecycle.

The platform addresses a practical gap: government departments may identify innovative solutions but face difficulty moving from **problem identification → startup discovery → evaluation → pilot → performance measurement → procurement → scale-up** in a consistent manner.

DviSetu brings these activities into one operational workflow.

### Core lifecycle

**Challenge → Discover → Screen → Evaluate → Select → Pilot → Measure → Validate → Procure → Scale**

The platform supports three operational personas:

- **Government Officer** — creates challenges, discovers startups, manages evaluations and pilots, verifies milestones and reviews scale decisions.
- **Startup Founder** — discovers challenges, submits proposals, tracks application status, manages pilot deliverables and monitors milestone/payment status.
- **Expert / Evaluator** — evaluates proposals using configurable multi-criteria scoring and records technical recommendations.

---

## 2. Problem Addressed

Traditional public procurement processes are primarily designed around compliant purchasing and price-based competition. Innovative startup solutions can require a different pathway because the government may need to:

1. Define an outcome-oriented problem statement.
2. Discover startups with relevant capabilities.
3. Screen statutory and challenge-specific eligibility.
4. Evaluate novel technical solutions fairly.
5. Design a controlled pilot with measurable outcomes.
6. Link milestones to deliverables and payment status.
7. Measure actual performance against predefined KPIs.
8. Obtain independent technical validation.
9. Make an evidence-based decision on whether to scale the solution.

DviSetu converts these requirements into a structured digital workflow rather than treating them as disconnected administrative activities.

---

## 3. Proposed Solution

DviSetu provides a single operational workspace for the complete innovation procurement journey.

### A. Government Challenge Management

Government officers can create outcome-oriented innovation challenges through a structured wizard covering:

- Department and administrative unit
- Sector
- Problem statement
- Current baseline
- Expected outcome
- Budget
- Pilot duration
- Required capabilities
- Cybersecurity and risk requirements
- Eligibility requirements
- Success KPIs

### B. Startup Discovery & Capability Matching

Government users can search and filter the startup repository and compare startup capabilities against challenge requirements.

The demonstration includes a transparent matching mechanism that shows:

- Capability tags
- Matched capabilities
- Missing capabilities
- Sector alignment
- Overall capability-match score

The objective is not to replace human decision-making, but to reduce discovery effort and make the basis of a recommendation visible.

### C. Eligibility Screening

A structured checklist verifies configurable criteria such as:

- GSTIN
- DPIIT recognition/certificate
- Required certifications
- Turnover threshold
- Conflict-of-interest declaration

Each criterion produces an explicit status and reason so that screening is auditable.

### D. Expert Evaluation

Experts can evaluate proposals using configurable weighted criteria.

The demonstration includes six evaluation dimensions:

| Criterion | Demonstration Weight |
|---|---:|
| Technical Feasibility | 25% |
| Expected Impact | 25% |
| Innovation | 20% |
| Scalability | 15% |
| Cost Effectiveness | 10% |
| Implementation Readiness | 5% |

Weights are configurable in the demonstration rather than being hard-coded into the evaluation interface.

### E. Pilot Management

Selected startups can be moved into a controlled pilot workflow.

Each pilot contains:

- Objectives
- Milestones
- Deliverables
- Payment/disbursement status
- KPI targets
- Evidence
- Verification status
- Technical validation

Milestones follow a defined state machine:

**Not Started → In Progress → Submitted → Under Review → Approved / Rejected → Completed**

### F. KPI Performance Audit

DviSetu records:

- Baseline
- Target
- Actual result
- Measurement unit
- Direction of improvement
- Achievement status

The platform can calculate direction-aware improvement for both:

- Higher-is-better KPIs
- Lower-is-better KPIs

This helps shift the pilot decision from subjective claims toward measurable outcomes.

### G. Independent Validation

Before scale-up, the demonstration provides an independent technical-validation stage where the reviewer, agency/reference information and validation status can be recorded.

### H. Evidence-Based Scale Review

The final stage evaluates multiple evidence points, including:

- KPI performance
- Budget adherence
- Independent validation
- Deliverable verification
- Operational risk

The demonstration produces one of three outcomes:

**Scale Up · Conditional Scale · Do Not Scale**

The final scale decision remains an administrative decision supported by recorded evidence; the prototype does not claim to autonomously make a legal procurement decision.

### I. Audit Trail

Important actions are recorded in a chronological audit ledger, providing visibility into:

- Who performed an action
- What action occurred
- When it occurred
- What stage of the lifecycle was affected

---

## 4. Why DviSetu Is Different

DviSetu is not simply a startup directory or procurement dashboard.

It connects the complete lifecycle.

| Common Gap | DviSetu Approach |
|---|---|
| Difficult startup discovery | Capability-based startup matching |
| Manual eligibility checking | Structured eligibility checklist |
| Difficult comparison of novel solutions | Configurable weighted evaluation |
| Unstructured pilots | Milestone-based pilot management |
| Weak performance evidence | Baseline → Target → Actual KPI tracking |
| Unclear payment progress | Milestone/disbursement status |
| Subjective scale decisions | Evidence-based scale review |
| Limited traceability | Chronological audit trail |
| Fragmented stakeholders | Government, Expert and Startup workspaces |

The key idea is to create a **repeatable bridge between innovation discovery and accountable public procurement**.

---

## 5. User Roles

### Government Officer

Primary responsibilities:

- Create and publish innovation challenges
- Search and match startups
- Review applications
- Verify eligibility
- Shortlist proposals
- Manage pilots
- Approve milestone progress
- Review KPI performance
- Review independent validation
- Authorize the demonstrated scale-review workflow
- Inspect the audit trail

### Startup Founder

Primary responsibilities:

- Browse government challenges
- Review eligibility requirements
- Submit technical/commercial proposals
- Track application status
- View pilot requirements
- Submit milestone evidence
- Track milestone and payment status

### Expert / Evaluator

Primary responsibilities:

- Review assigned proposals
- Configure evaluation weights
- Score proposals
- Add technical observations
- Submit evaluation records

---

## 6. End-to-End Workflow

```text
┌────────────────────┐
│ 1. Challenge       │
│    Definition      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 2. Startup         │
│    Discovery       │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 3. Eligibility     │
│    Screening       │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 4. Expert          │
│    Evaluation      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 5. Selection &     │
│    Pilot Setup     │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 6. Milestones &    │
│    Deliverables    │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 7. KPI Performance │
│    Audit           │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 8. Independent     │
│    Validation      │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 9. Evidence Review │
│    for Scale       │
└─────────┬──────────┘
          ↓
┌────────────────────┐
│ 10. Scale /        │
│     Decision Record│
└────────────────────┘
```

---

## 7. Demonstration Architecture

DviSetu is intentionally implemented as a **self-contained, browser-based prototype** so that evaluators can run the complete workflow without installing a backend or external services.

### Architecture

```text
                    ┌──────────────────────┐
                    │     DviSetu UI       │
                    │ HTML / CSS / JS      │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ↓                 ↓                 ↓
      ┌─────────────┐   ┌─────────────┐   ┌─────────────┐
      │ Government  │   │   Startup   │   │   Expert    │
      │ Workspace   │   │ Workspace   │   │ Workspace   │
      └─────────────┘   └─────────────┘   └─────────────┘
                               │
                               ↓
                    ┌──────────────────────┐
                    │ Business Rules       │
                    │ Engine               │
                    └──────────┬───────────┘
                               ↓
                    ┌──────────────────────┐
                    │ Local Demo State     │
                    │ / LocalStorage       │
                    └──────────┬───────────┘
                               ↓
                    ┌──────────────────────┐
                    │ Audit / Documents /  │
                    │ Lifecycle State      │
                    └──────────────────────┘
```

### Design principle

The prototype separates:

- Presentation/UI
- Business rules
- Seed demonstration data
- State management
- Role-specific workflows

This makes the demonstration easier to understand and provides a clear path toward a production architecture.

---

## 8. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript ES6 |
| UI | Custom responsive government-enterprise design system |
| State | LocalStorage-based demonstration state |
| Business Logic | Pure JavaScript rules engine |
| Data | Seeded demonstration data |
| Runtime | Modern web browser |
| Deployment for Demo | Static hosting / local HTTP server |

### External dependency approach

The current demonstration is designed to run without external CDN dependencies and can operate offline.

This makes the prototype suitable for:

- SIH demonstrations
- Evaluation laptops
- Offline presentations
- Controlled judging environments

---

## 9. Business Rules Engine

Core procurement logic is separated into deterministic functions in:

`assets/js/rules.js`

### Capability Matching

`calculateMatchScore(...)`

Combines:

- Required/matched capability tags
- Sector alignment

Returns:

- Match score
- Matched capabilities
- Missing capabilities
- Sector alignment

### Eligibility

`checkEligibility(...)`

Evaluates configurable criteria including:

- GSTIN
- DPIIT
- Certifications
- Turnover
- Conflict declaration

### Weighted Evaluation

`calculateWeightedScore(...)`

Calculates a normalized score using configurable evaluation weights.

### KPI Evaluation

`calculateKPIImprovement(...)`

Supports both:

- Higher-is-better
- Lower-is-better

### Scale Recommendation

`calculateScaleRecommendation(...)`

Combines pilot evidence to classify the demonstrated scale readiness as:

- Scale Up
- Conditional Scale
- Do Not Scale

These rules are deterministic and inspectable rather than hidden inside an opaque AI model.

---

## 10. Repository Structure

```text
DviSetu/
<<<<<<< HEAD
│
├── index.html
├── overview.html
├── login.html
├── README.md
│
=======
├── index.html                  # Formal initial login portal with 2-step role authentication
├── overview.html               # Preserved landing portal with 10-step lifecycle tour & PS matrix
├── login.html                  # Dedicated direct login route
├── README.md                   # Complete documentation & 3-minute judge script
>>>>>>> 0e9db03780df7c7e8dbb8a7e8583c568da3bd014
├── assets/
│   ├── css/
│   │   └── styles.css
│   │
│   └── js/
│       ├── rules.js
│       ├── data.js
│       ├── store.js
│       ├── app.js
│       ├── index.js
│       ├── gov-dashboard.js
│       ├── challenges.js
│       ├── create-challenge.js
│       ├── startups.js
│       ├── challenge-detail.js
│       ├── gov-pilot.js
│       ├── scale-decision.js
│       ├── audit-trail.js
│       ├── evaluate.js
│       ├── startup-dashboard.js
│       ├── browse-challenges.js
│       ├── apply.js
│       └── my-pilot.js
│
├── gov/
│   ├── dashboard.html
│   ├── challenges.html
│   ├── create-challenge.html
│   ├── startups.html
│   ├── challenge-detail.html
│   ├── pilot.html
│   ├── scale-decision.html
│   └── audit-trail.html
│
├── expert/
│   └── evaluate.html
│
└── startup/
    ├── dashboard.html
    ├── browse-challenges.html
    ├── apply.html
    └── my-pilot.html
```

---

## 11. How to Run

### Option 1 — Direct Browser

The prototype can be opened directly by launching:

```text
index.html
```

in a modern browser.

### Option 2 — Local HTTP Server

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

No package installation or build process is required for the current demonstration.

---

# 12. Key Innovation

### From procurement transactions to an innovation lifecycle

DviSetu focuses on the part of public procurement where innovative startup solutions are difficult to handle through conventional workflows.

The platform introduces a structured mechanism for:

**Discover → Verify → Evaluate → Pilot → Measure → Validate → Scale**

This creates a repeatable operating model that can potentially be adapted across departments and sectors.

---


# 13. Expected Impact

### For Government Departments

- Faster discovery of relevant startup capabilities
- Structured challenge formulation
- Consistent evaluation
- Better pilot governance
- Measurable outcome tracking
- Evidence-supported scale decisions
- Improved auditability

### For Startups

- Greater visibility of government challenges
- Clear eligibility requirements
- Transparent evaluation stages
- Structured pilot opportunities
- Milestone visibility
- Better understanding of scale-up requirements

### For the Public Procurement Ecosystem

- Encourages innovation-led procurement
- Reduces fragmented workflows
- Improves traceability
- Creates measurable pilot-to-scale pathways
- Supports responsible adoption of innovative solutions

---

**Smart India Hackathon 2026 · SIH26136**  
**Government of Maharashtra · Department of Skills, Employment, Entrepreneurship & Innovation**
