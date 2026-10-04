/**
 * DviSetu - Challenge Command Center Controller
 * Capability matching engine, structured statutory eligibility audit, and selection review.
 */

document.addEventListener('DOMContentLoaded', () => {
  const challengeId = GovApp.getParam('id') || 'CH-101';
  const challenge = GovStore.getChallengeById(challengeId);

  if (!challenge) {
    alert('Challenge not found!');
    window.location.href = 'dashboard.html';
    return;
  }

  // Determine current lifecycle step
  let stepIndex = 2; // Default matching
  if (challenge.status === 'Open') stepIndex = 2;
  else if (challenge.status === 'Screening') stepIndex = 3;
  else if (challenge.status === 'Evaluation') stepIndex = 4;
  else if (challenge.status === 'Pilot Running') stepIndex = 6;
  else if (challenge.status === 'Scaled') stepIndex = 10;

  GovApp.renderLifecycleStepper(stepIndex, 'lifecycle-stepper-container');

  // Tab switching logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  // Render TAB 1: OVERVIEW
  document.getElementById('detail-title').innerText = challenge.title;
  document.getElementById('detail-subtitle').innerText = `${challenge.id} • ${challenge.department} (${challenge.departmentUnit || 'Nodal Unit'}) • Sector: ${challenge.sector}`;
  document.getElementById('detail-status-badge').innerText = challenge.status;
  document.getElementById('detail-problem').innerText = challenge.problemStatement;
  document.getElementById('detail-process').innerText = challenge.currentProcess || 'N/A';
  document.getElementById('detail-outcome').innerText = challenge.expectedOutcome || 'N/A';
  document.getElementById('detail-budget').innerText = challenge.budgetRange;
  document.getElementById('detail-duration').innerText = `${challenge.durationMonths} Months`;
  document.getElementById('detail-created-date').innerText = challenge.createdDate;
  document.getElementById('detail-data-req').innerText = challenge.dataRequirements || 'Standard API & Database Access';

  // Tags
  document.getElementById('detail-tags').innerHTML = (challenge.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

  // KPIs Table
  const kpisTbody = document.getElementById('detail-kpis-tbody');
  kpisTbody.innerHTML = (challenge.kpis || []).map(k => `
    <tr>
      <td><strong>${k.name}</strong></td>
      <td>${k.baseline}</td>
      <td><strong>${k.target}</strong></td>
      <td>${k.unit}</td>
      <td><span class="badge ${k.higherIsBetter ? 'badge-passed' : 'badge-failed'}">${k.higherIsBetter ? 'Higher is Better (&uarr;)' : 'Lower is Better (&darr;)'}</span></td>
    </tr>
  `).join('');

  // Eligibility Checklist Card
  const elig = challenge.eligibilityCriteria || {};
  document.getElementById('detail-eligibility-list').innerHTML = `
    <div class="checklist-item"><span>GST & Statutory Registration</span> <strong>${elig.gstRequired ? '✓ Mandatory' : 'Optional'}</strong></div>
    <div class="checklist-item"><span>DPIIT Startup Recognition</span> <strong>${elig.dpiitRequired ? '✓ Mandatory' : 'Optional'}</strong></div>
    <div class="checklist-item"><span>Security / Quality Certification</span> <strong>${elig.certificationRequired ? '✓ Mandatory' : 'Optional'}</strong></div>
    <div class="checklist-item"><span>Financial Turnover Audit</span> <strong>${elig.financialRequirement ? '✓ Mandatory (> ₹' + (elig.minTurnoverLakhs || 10) + ' L)' : 'Optional'}</strong></div>
    <div class="checklist-item"><span>Conflict of Interest Undertaking</span> <strong>${elig.conflictDeclaration ? '✓ Mandatory' : 'Optional'}</strong></div>
  `;

  // Render TAB 2: CAPABILITY MATCHING
  renderMatchedStartups(challenge);

  // Render TAB 3: APPLICATIONS & STATUTORY ELIGIBILITY SCREENING
  renderApplications(challenge);

  // Render TAB 4: SELECTION REVIEW & EXPERT SCORES
  renderEvaluationSummary(challenge);
});

function renderMatchedStartups(challenge) {
  const container = document.getElementById('matched-startups-list');
  if (!container) return;

  const startups = GovStore.getStartups();
  const ranked = startups.map(s => {
    const match = GovRules.calculateMatchScore(challenge.tags || [], s.capabilityTags || [], challenge.sector, s.sector);
    return { startup: s, match };
  }).sort((a, b) => b.match.score - a.match.score);

  container.innerHTML = ranked.map(item => {
    const s = item.startup;
    const m = item.match;

    const matchedBadges = (m.matchedTags || []).map(t => `<span class="tag-badge" style="background:#DCFCE7; color:#15803D; font-size:11px;">✓ ${t}</span>`).join(' ');
    const missingBadges = (m.missingTags || []).map(t => `<span class="tag-badge" style="background:#F1F5F9; color:#64748B; font-size:11px;">&times; ${t}</span>`).join(' ');

    return `
      <div class="card" style="margin-bottom:16px;">
        <div class="card-header" style="background:#F8FAFC;">
          <div>
            <strong style="font-size:16px; color:var(--navy-primary);">${s.name}</strong>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
              📍 ${s.location} &bull; Stage: <strong>${s.stage}</strong> &bull; Founded by: ${s.founder}
            </div>
          </div>
          <div style="text-align:right;">
            <div class="score-badge-large" style="margin-left:auto;">
              ${m.score}%
            </div>
            <span style="font-size:11px; color:var(--text-muted); font-weight:600; display:block; margin-top:4px;">
              Capability Match
            </span>
          </div>
        </div>
        <div class="card-body">
          <p style="font-size:13px; color:var(--text-main); margin-bottom:14px; line-height:1.4;">
            ${s.pitchSummary}
          </p>

          <div class="grid grid-2" style="margin-bottom:12px; background:#F8FAFC; padding:12px; border-radius:4px; border:1px solid var(--border-color);">
            <div>
              <span style="font-size:11px; font-weight:700; color:var(--green-dark); text-transform:uppercase;">
                Matched Capabilities (${m.matchedTags ? m.matchedTags.length : 0})
              </span>
              <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:4px;">
                ${matchedBadges || '<span style="font-size:11px; color:var(--text-muted);">None</span>'}
              </div>
            </div>
            <div>
              <span style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
                Missing Capabilities (${m.missingTags ? m.missingTags.length : 0})
              </span>
              <div style="margin-top:6px; display:flex; flex-wrap:wrap; gap:4px;">
                ${missingBadges || '<span style="font-size:11px; color:var(--green-dark);">All Tags Satisfied</span>'}
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; font-size:12px; color:var(--text-muted);">
            <div>
              Sector Alignment: <strong>${m.sectorAligned ? '✓ Sector Matched (+20%)' : 'General Domain Alignment (+5%)'}</strong>
            </div>
            <div>
              DPIIT: <strong>${s.dpiitRecognized ? '✓ ' + (s.dpiitNumber || 'Verified') : '✗ Unregistered'}</strong> &bull; 
              GST: <strong>${s.gstRegistered ? '✓ ' + (s.gstin || 'Registered') : '✗ Missing'}</strong>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderApplications(challenge) {
  const tbody = document.getElementById('applications-tbody');
  if (!tbody) return;

  const apps = GovStore.getApplicationsByChallenge(challenge.id);
  if (apps.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:24px; color:var(--text-muted);">No startup applications received yet for this challenge.</td></tr>';
    return;
  }

  tbody.innerHTML = apps.map(app => {
    const startup = GovStore.getStartupById(app.startupId);
    if (!startup) return '';

    // Run structured statutory eligibility checklist
    const elig = GovRules.checkEligibility(startup, challenge.eligibilityCriteria);

    let statusBadge = 'badge-screening';
    if (elig.status === 'Eligible') statusBadge = 'badge-scaled';
    else if (elig.status === 'Not Eligible') statusBadge = 'badge-failed';
    else if (elig.status === 'Needs Review') statusBadge = 'badge-pilot';

    let appStatusBadge = 'badge-open';
    if (app.status === 'Shortlisted') appStatusBadge = 'badge-evaluation';
    else if (app.status === 'Rejected') appStatusBadge = 'badge-failed';
    else if (app.status === 'Selected for Pilot') appStatusBadge = 'badge-scaled';

    const checklistHTML = elig.checklist.map(item => `
      <div style="font-size:11px; margin-bottom:4px; line-height:1.3;">
        <span style="color:${item.passed ? 'var(--green-primary)' : 'var(--red-primary)'}; font-weight:700;">
          ${item.passed ? '✓' : '✗'}
        </span> <strong>${item.rule}:</strong> <span style="color:var(--text-muted);">${item.details}</span>
      </div>
    `).join('');

    return `
      <tr>
        <td>
          <strong style="color:var(--navy-primary); font-size:13px;">${startup.name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${startup.id} &bull; ${startup.location}</div>
        </td>
        <td>${app.submissionDate}</td>
        <td><strong>${GovRules.formatINR(app.proposedBudget)}</strong><div style="font-size:11px; color:var(--text-muted);">${app.proposedMonths} Months</div></td>
        <td style="max-width:320px;">${checklistHTML}</td>
        <td><span class="badge ${statusBadge}">${elig.status}</span></td>
        <td><span class="badge ${appStatusBadge}">${app.status}</span></td>
        <td>
          ${app.status === 'Submitted' ? `
            <div style="display:flex; flex-direction:column; gap:4px;">
              <button class="btn btn-green btn-sm" onclick="shortlistApp('${app.id}')">Shortlist</button>
              <button class="btn btn-secondary btn-sm" onclick="rejectApp('${app.id}')">Reject</button>
            </div>
          ` : `
            <span style="font-size:11px; color:var(--text-muted); font-weight:600;">${app.status}</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function shortlistApp(appId) {
  const apps = GovStore.getApplications();
  const app = apps.find(a => a.id === appId);
  GovStore.updateApplicationStatus(appId, 'Shortlisted');
  GovStore.logAuditEvent(
    'Application Shortlisted',
    'gov',
    'Application',
    appId,
    'Shortlisted',
    `Government officer shortlisted proposal from ${app ? app.startupId : 'Startup'} for expert evaluation.`
  );
  GovApp.showToast('Application shortlisted for Expert Technical Evaluation!', 'success');
  setTimeout(() => window.location.reload(), 500);
}

function rejectApp(appId) {
  const apps = GovStore.getApplications();
  const app = apps.find(a => a.id === appId);
  GovStore.updateApplicationStatus(appId, 'Rejected');
  GovStore.logAuditEvent(
    'Application Rejected',
    'gov',
    'Application',
    appId,
    'Rejected',
    `Government officer disqualified proposal from ${app ? app.startupId : 'Startup'} based on screening review.`
  );
  GovApp.showToast('Application marked Disqualified/Rejected.', 'info');
  setTimeout(() => window.location.reload(), 500);
}

function renderEvaluationSummary(challenge) {
  const tbody = document.getElementById('evaluation-summary-tbody');
  if (!tbody) return;

  const evals = GovStore.getEvaluationsByChallenge(challenge.id);
  if (evals.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">No expert evaluations submitted yet. Switch to Expert Evaluator persona to score shortlisted proposals.</td></tr>';
    return;
  }

  tbody.innerHTML = evals.map(ev => {
    const startup = GovStore.getStartupById(ev.startupId);
    return `
      <tr>
        <td>
          <strong>${startup ? startup.name : ev.startupId}</strong>
          <div style="font-size:11px; color:var(--text-muted);">Shortlisted Bidder</div>
        </td>
        <td>${ev.evaluatorName}</td>
        <td>${ev.timestamp}</td>
        <td>
          <span style="font-size:18px; font-weight:800; color:var(--navy-primary);">
            ${ev.weightedTotal} / 100
          </span>
        </td>
        <td style="max-width:280px; font-size:12px; line-height:1.4;">${ev.comments}</td>
        <td>
          <button class="btn btn-saffron btn-sm" onclick="selectStartupForPilot('${challenge.id}', '${ev.startupId}')">
            Execute Pilot Contract &rarr;
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function selectStartupForPilot(challengeId, startupId) {
  const challenge = GovStore.getChallengeById(challengeId);
  const startup = GovStore.getStartupById(startupId);

  if (!challenge || !startup) return;

  // Create new formal Pilot contract
  const pilotId = 'PL-' + Math.floor(900 + Math.random() * 99);
  const contractValue = challenge.budgetMax || 2500000;

  const newPilot = {
    id: pilotId,
    challengeId: challenge.id,
    startupId: startup.id,
    startupName: startup.name,
    challengeTitle: challenge.title,
    department: challenge.department,
    pilotArea: 'District Civil Hospital, General OPD & Triage',
    startDate: new Date().toISOString().split('T')[0],
    durationMonths: challenge.durationMonths || 6,
    contractValue: contractValue,
    status: 'In Progress',
    currentStep: 6,
    milestones: [
      {
        id: 'M1',
        title: 'Milestone 1: HIS API Integration & Kiosk Hardware Setup',
        description: 'Deploy 15 OPD Kiosk Terminals and integrate API adapter with District Hospital Information System.',
        percentage: 20,
        amount: contractValue * 0.2,
        status: 'Approved',
        dueDate: 'Month 1',
        approvalDate: new Date().toISOString().split('T')[0],
        evidenceNote: '15 Kiosks delivered & installed at Victoria Hospital OPD. HIS API endpoints verified.',
        evidenceFile: 'M1_HIS_Integration_Report_Signed.pdf'
      },
      {
        id: 'M2',
        title: 'Milestone 2: OPD Triage & Field Deployment (2 Wings)',
        description: 'Launch digital token system in General OPD and Orthopedics OPD wings with WhatsApp notifications.',
        percentage: 30,
        amount: contractValue * 0.3,
        status: 'Under Review',
        dueDate: 'Month 3',
        approvalDate: null,
        evidenceNote: 'Field testing active across 4 counters. Patient token generation active.',
        evidenceFile: 'M2_Field_Test_Log.pdf'
      },
      {
        id: 'M3',
        title: 'Milestone 3: Performance & Load Balancing Test',
        description: '30-day continuous stress testing during peak OPD hours (8 AM - 1 PM) with 3,000+ daily patients.',
        percentage: 30,
        amount: contractValue * 0.3,
        status: 'In Progress',
        dueDate: 'Month 5',
        approvalDate: null,
        evidenceNote: '',
        evidenceFile: ''
      },
      {
        id: 'M4',
        title: 'Milestone 4: Final Evaluation & Third-Party Validation',
        description: 'Submission of 6-month KPI audit report and third-party validation clearance.',
        percentage: 20,
        amount: contractValue * 0.2,
        status: 'Not Started',
        dueDate: 'Month 6',
        approvalDate: null,
        evidenceNote: '',
        evidenceFile: ''
      }
    ],
    kpiData: (challenge.kpis || []).map(k => ({
      ...k,
      actual: k.baseline
    })),
    contractClauses: {
      dataOwnership: 'Department of Health Exclusive Data Property',
      ipOwnership: 'Startup Core IP, Perpetual Public Use License for Government Facilities',
      dataRetention: 'State Data Centre 7-Year Retention Mandate',
      securityRequirements: 'STQC & ISO 27001 Compliance Mandatory'
    },
    validation: {
      approved: false,
      status: 'Pending',
      agency: 'National Health Authority (NHA) Tech Evaluation Cell',
      reviewer: 'Dr. S. K. Verma, Chief Evaluation Officer',
      validationDate: null,
      clearanceId: 'NHA-TEC-2026-PENDING',
      remarks: 'Field audit report under review by technical evaluation panel.',
      evidenceFile: 'NHA_Field_Audit_Scope_Doc.pdf'
    }
  };

  GovStore.savePilot(newPilot);
  GovStore.updateChallengeStatus(challenge.id, 'Pilot Running');

  GovStore.logAuditEvent(
    'Pilot Contract Created',
    'gov',
    'Pilot',
    pilotId,
    'Contracted',
    `Officer executed Pilot contract ${pilotId} with ${startup.name} for ₹${contractValue.toLocaleString('en-IN')}`
  );

  GovApp.showToast(`Pilot ${pilotId} created for ${startup.name}!`, 'success');

  setTimeout(() => {
    window.location.href = `pilot.html?id=${pilotId}`;
  }, 500);
}

window.shortlistApp = shortlistApp;
window.rejectApp = rejectApp;
window.selectStartupForPilot = selectStartupForPilot;
