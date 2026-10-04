/**
 * DviSetu - Interactive Self-Explanatory Overview Controller
 * Controls Live Stats, 10-Step Interactive Lifecycle Preview, 60s Auto-Tour, and Persona Routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Data Dictionary for the 10 Lifecycle Steps
  const LIFECYCLE_DATA = [
    {
      step: 1,
      title: '1. Structured Challenge Creation',
      badge: 'Gov Officer Action',
      desc: 'Government departments post structured innovation problem statements, defining budget ceilings, pilot duration, technology tags, and target success KPIs.',
      psRequirement: 'SIH PS Req #1: Structured Problem Statement Definition & Commercial Boundaries',
      link: './gov/create-challenge.html',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:12px; border-radius:6px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong style="color:var(--navy-primary);">Dept of Health & Family Welfare</strong>
            <span class="badge badge-open">Open</span>
          </div>
          <div style="font-weight:700; font-size:13px; color:var(--navy-primary); margin-bottom:4px;">
            AI-Based Hospital OPD Queue & Waiting Time Optimization (CH-101)
          </div>
          <div style="color:var(--text-muted); margin-bottom:8px;">Budget: ₹15,00,000 - ₹25,00,000 | Duration: 6 Months</div>
          <div class="tag-list">
            <span class="tag">AI/ML</span><span class="tag">Queue Management</span><span class="tag">HealthTech</span><span class="tag">OPD Triage</span>
          </div>
        </div>
      `
    },
    {
      step: 2,
      title: '2. Startup Discovery & Rule-Based Matching',
      badge: 'Capability Match Engine',
      desc: 'Real-time rule engine matches challenge capability tags with registered startup technical profiles to compute an instant tag overlap match score (0-100%).',
      psRequirement: 'SIH PS Req #2: Startup Discovery & Multi-Tag Capability Overlap Matching',
      link: './gov/challenge-detail.html?id=CH-101',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:12px; border-radius:6px; font-size:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <div>
              <strong style="font-size:13px; color:var(--navy-primary);">MedQ HealthTech Innovations</strong>
              <div style="font-size:11px; color:var(--text-muted);">Bengaluru • Growth Stage</div>
            </div>
            <div class="score-badge-large" style="width:40px; height:40px; font-size:13px;">92%</div>
          </div>
          <div class="tag-list">
            <span class="tag matched">AI/ML ✓</span><span class="tag matched">Queue Management ✓</span><span class="tag matched">HealthTech ✓</span><span class="tag matched">OPD Triage ✓</span>
          </div>
        </div>
      `
    },
    {
      step: 3,
      title: '3. Statutory Eligibility Automated Screening',
      badge: 'Instant Rule Audit',
      desc: 'Automates statutory compliance verification against GSTIN registration, DPIIT startup recognition, security clearance (ISO/STQC), and financial turnover.',
      psRequirement: 'SIH PS Req #3: Statutory Compliance & Multi-Tier Eligibility Verification',
      link: './gov/challenge-detail.html?id=CH-101',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
            <strong>MedQ HealthTech Statutory Audit</strong>
            <span class="badge badge-eligible">Eligible (100%)</span>
          </div>
          <div style="color:var(--green-dark); font-weight:600;">✓ GSTIN Registered: 29AAACM1234F1Z9</div>
          <div style="color:var(--green-dark); font-weight:600;">✓ DPIIT Recognition #: DPIIT-77491</div>
          <div style="color:var(--green-dark); font-weight:600;">✓ Certifications: ISO 27001, CERT-In Cleared</div>
          <div style="color:var(--green-dark); font-weight:600;">✓ Financial Turnover: Verified > ₹15 Lakhs</div>
        </div>
      `
    },
    {
      step: 4,
      title: '4. Expert 6-Factor Weighted Evaluation',
      badge: 'Evaluation Committee',
      desc: 'Independent expert panel evaluates proposals across 6 weighted factors (Feasibility 25%, Impact 25%, Innovation 20%, Scalability 15%, Cost 10%, Readiness 5%).',
      psRequirement: 'SIH PS Req #4: Multi-Factor Weighted Scoring & Transparent Audit Logging',
      link: './expert/evaluate.html',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Evaluator: Dr. R. K. Shrivastava (Medical Director)</strong>
              <div style="color:var(--text-muted);">Feasibility: 9.0 | Impact: 9.0 | Innovation: 8.0</div>
            </div>
            <div style="font-size:18px; font-weight:800; color:var(--navy-primary);">87.0 / 100</div>
          </div>
        </div>
      `
    },
    {
      step: 5,
      title: '5. Competitive Pilot Selection & Contract Award',
      badge: 'Gov Approval',
      desc: 'Government officer selects top-evaluated startup proposal, initializes pilot contract parameters (₹22,00,000 ceiling), and establishes statutory terms.',
      psRequirement: 'SIH PS Req #5: Transparent Selection & Legal Contract Initialization',
      link: './gov/challenge-detail.html?id=CH-101',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span class="badge badge-pilot">Selected for Pilot</span>
              <strong style="display:block; color:var(--navy-primary); margin-top:2px;">MedQ HealthTech Solutions</strong>
            </div>
            <button class="btn btn-saffron btn-sm">Award Pilot Contract &rarr;</button>
          </div>
        </div>
      `
    },
    {
      step: 6,
      title: '6. Milestone Schedule & Deliverables Setup',
      badge: 'Contract Baseline',
      desc: 'Establishes a 4-stage milestone delivery schedule (M1 Integration, M2 Field Testing, M3 Stress Audit, M4 Validation) tied to percentage payment releases.',
      psRequirement: 'SIH PS Req #6: Structured Milestone Architecture & Payment Splitting',
      link: './gov/pilot.html?id=PL-901',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span>M1: HIS API Setup (20% = ₹4,40,000)</span><span style="color:var(--green-dark); font-weight:bold;">Released</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span>M2: Field Deployment (30% = ₹6,60,000)</span><span style="color:var(--navy-primary); font-weight:bold;">In Progress</span>
          </div>
        </div>
      `
    },
    {
      step: 7,
      title: '7. Milestone Payments & Evidence Verification',
      badge: 'Fund Disbursement',
      desc: 'Startups upload milestone completion evidence (PDF logs/reports). Government officers verify evidence and release payment disbursements directly to bank accounts.',
      psRequirement: 'SIH PS Req #7: Direct Payment Disbursement & Audit Evidence Verification',
      link: './gov/pilot.html?id=PL-901',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; font-weight:600; margin-bottom:4px;">
            <span>Payment Released: ₹4,40,000 / ₹22,00,000</span>
            <span style="color:var(--green-dark);">20% Complete</span>
          </div>
          <div class="progress-bar-container"><div class="progress-bar-fill green" style="width:20%;"></div></div>
        </div>
      `
    },
    {
      step: 8,
      title: '8. KPI Performance Audit & Target Measurement',
      badge: 'Impact Measurement',
      desc: 'Live KPI performance audit tracks actual achieved operational metrics against initial baselines, automatically calculating improvement percentages and pass/fail badges.',
      psRequirement: 'SIH PS Req #8: Empirical KPI Benchmark Measurement & Automated Improvement Calculation',
      link: './gov/pilot.html?id=PL-901',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Average OPD Wait Time</strong>
              <div style="color:var(--text-muted);">Baseline: 120m &rarr; Target: 45m &rarr; <strong>Actual: 38m</strong></div>
            </div>
            <div style="text-align:right;">
              <span class="badge badge-passed">PASSED</span>
              <div style="color:var(--green-dark); font-weight:bold; margin-top:2px;">+68.3% Improvement</div>
            </div>
          </div>
        </div>
      `
    },
    {
      step: 9,
      title: '9. Independent Third-Party Validation Clearance',
      badge: 'Independent Audit',
      desc: 'Independent tech auditors (e.g. National Health Authority / STQC) conduct technical inspections and grant formal clearance required for public scaling.',
      psRequirement: 'SIH PS Req #9: Third-Party Independent Technical Audit & Quality Sign-Off',
      link: './gov/pilot.html?id=PL-901',
      mockHTML: `
        <div style="background:#F8FAFC; border:1px solid var(--border-color); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>Validator: National Health Authority (NHA) Tech Cell</strong>
              <div style="color:var(--green-dark); font-weight:bold;">✓ Technical Audit Approved</div>
            </div>
            <span class="badge badge-eligible">Validation Granted</span>
          </div>
        </div>
      `
    },
    {
      step: 10,
      title: '10. Evidence-Based Scale-Up Decision Engine',
      badge: 'Institutional Scale',
      desc: 'Automated recommendation engine synthesizes KPI pass rates (100%), budget compliance, and 3rd-party audit clearance to authorize state-wide production rollout.',
      psRequirement: 'SIH PS Req #10: Evidence-Based Scale-Up Recommendation & Departmental Authorization',
      link: './gov/scale-decision.html?id=PL-901',
      mockHTML: `
        <div style="background:#F0FDF4; border:1px solid var(--green-primary); padding:10px; border-radius:6px; font-size:11px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span class="badge badge-scaled">Scale Up Authorized</span>
              <strong style="display:block; color:var(--navy-primary); margin-top:2px;">State-Wide Rollout (All 18 District Hospitals)</strong>
            </div>
            <div style="font-weight:800; font-size:16px; color:var(--green-dark);">₹2.5 Cr Budget</div>
          </div>
        </div>
      `
    }
  ];

  // State Variables
  let currentStepIndex = 1;
  let tourTimer = null;
  let tourProgressInterval = null;
  let isTourPlaying = false;
  let tourProgress = 0; // 0 to 100%
  const STEP_DURATION_MS = 6000; // 6 seconds per step

  // 2. Initialize Live Stats Strip
  function initLiveStats() {
    const challenges = GovStore.getChallenges();
    const apps = GovStore.getApplications();
    const startups = GovStore.getStartups();
    const pilots = GovStore.getPilots();
    const decisions = GovStore.getScaleDecisions();

    const activeCount = challenges.filter(c => c.status !== 'Closed').length;
    const runningPilots = pilots.filter(p => p.status === 'In Progress').length;
    const scaledCount = decisions.filter(d => d.decision === 'Scale Up').length;

    let totalDisbursed = 0;
    pilots.forEach(p => {
      (p.milestones || []).forEach(m => {
        if (m.status === 'Done') totalDisbursed += (m.amount || 0);
      });
    });

    document.getElementById('stat-active-challenges').innerText = activeCount;
    document.getElementById('stat-total-apps').innerText = apps.length;
    document.getElementById('stat-matched-startups').innerText = startups.length;
    document.getElementById('stat-running-pilots').innerText = runningPilots;
    document.getElementById('stat-disbursed-funds').innerText = GovRules.formatINR(totalDisbursed);
    document.getElementById('stat-scaled-solutions').innerText = scaledCount;
  }

  // 3. Render Stepper Buttons
  function renderStepperButtons() {
    const container = document.getElementById('interactive-stepper-buttons');
    if (!container) return;

    container.innerHTML = LIFECYCLE_DATA.map(item => `
      <button 
        type="button" 
        class="stepper-step ${item.step === currentStepIndex ? 'active' : ''} ${item.step < currentStepIndex ? 'completed' : ''}" 
        data-step="${item.step}"
        role="tab"
        aria-selected="${item.step === currentStepIndex ? 'true' : 'false'}"
        tabindex="0"
        aria-label="Step ${item.step}: ${item.title}"
      >
        <div class="step-icon-circle">${item.step < currentStepIndex ? '✓' : item.step}</div>
        <div class="step-label">${item.title.split(' ')[1] || item.title}</div>
      </button>
    `).join('');

    container.querySelectorAll('.stepper-step').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const stepNum = parseInt(btn.getAttribute('data-step'));
        stopTour(); // Stop auto tour if user manually interacts
        selectStep(stepNum);
      });

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextStep = currentStepIndex < 10 ? currentStepIndex + 1 : 1;
          stopTour();
          selectStep(nextStep);
          focusStepButton(nextStep);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevStep = currentStepIndex > 1 ? currentStepIndex - 1 : 10;
          stopTour();
          selectStep(prevStep);
          focusStepButton(prevStep);
        } else if (e.key === 'Home') {
          e.preventDefault();
          stopTour();
          selectStep(1);
          focusStepButton(1);
        } else if (e.key === 'End') {
          e.preventDefault();
          stopTour();
          selectStep(10);
          focusStepButton(10);
        }
      });
    });
  }

  function focusStepButton(stepNum) {
    const btn = document.querySelector(`.stepper-step[data-step="${stepNum}"]`);
    btn?.focus();
  }

  // 4. Update Preview Panel Content
  function selectStep(stepNum) {
    currentStepIndex = stepNum;
    const data = LIFECYCLE_DATA.find(d => d.step === stepNum) || LIFECYCLE_DATA[0];

    // Update buttons UI
    renderStepperButtons();

    // Update panel text & mock UI
    document.getElementById('preview-badge').innerText = data.badge;
    document.getElementById('preview-title').innerText = data.title;
    document.getElementById('preview-desc').innerText = data.desc;
    document.getElementById('preview-ps-req').innerText = data.psRequirement;
    document.getElementById('preview-screen-link').href = data.link;
    document.getElementById('preview-mock-container').innerHTML = data.mockHTML;
  }

  // 5. 60-Second Auto Tour Controller
  function startTour() {
    isTourPlaying = true;
    updateTourControlsUI();
    resetProgress();
    runStepLoop();
  }

  function stopTour() {
    isTourPlaying = false;
    clearTimeout(tourTimer);
    clearInterval(tourProgressInterval);
    updateTourControlsUI();
    resetProgress();
  }

  function toggleTour() {
    if (isTourPlaying) {
      stopTour();
    } else {
      startTour();
    }
  }

  function resetProgress() {
    tourProgress = 0;
    const bar = document.getElementById('tour-progress-bar-fill');
    if (bar) bar.style.width = '0%';
  }

  function runStepLoop() {
    if (!isTourPlaying) return;

    let startTime = Date.now();
    const bar = document.getElementById('tour-progress-bar-fill');

    tourProgressInterval = setInterval(() => {
      if (!isTourPlaying) {
        clearInterval(tourProgressInterval);
        return;
      }
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / STEP_DURATION_MS) * 100);
      if (bar) bar.style.width = `${pct}%`;

      if (elapsed >= STEP_DURATION_MS) {
        clearInterval(tourProgressInterval);
        const nextStep = currentStepIndex < 10 ? currentStepIndex + 1 : 1;
        selectStep(nextStep);
        runStepLoop(); // Continue next step
      }
    }, 100);
  }

  function updateTourControlsUI() {
    const btn = document.getElementById('btn-play-tour');
    const statusText = document.getElementById('tour-status-text');

    if (btn) {
      if (isTourPlaying) {
        btn.innerHTML = '⏸️ Pause 60-Sec Tour';
        btn.className = 'btn btn-secondary btn-sm';
      } else {
        btn.innerHTML = '▶️ Play 60-Sec Auto Tour';
        btn.className = 'btn btn-saffron btn-sm';
      }
    }

    if (statusText) {
      statusText.innerText = isTourPlaying ? `Playing Stage ${currentStepIndex} of 10...` : 'Paused (Click step or play tour)';
    }
  }

  // Event Listeners for Tour Controls
  document.getElementById('btn-play-tour')?.addEventListener('click', toggleTour);

  // Keyboard Spacebar to Pause/Play Tour
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
      e.preventDefault();
      toggleTour();
    }
  });

  // Initial Boot
  initLiveStats();
  selectStep(1);
});
