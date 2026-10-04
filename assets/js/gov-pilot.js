/**
 * DviSetu - Pilot Management Controller
 * Milestone lifecycle transitions, payment disbursement tracking, KPI variance audit, and independent validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pilotId = GovApp.getParam('id') || 'PL-901';
  let pilot = GovStore.getPilotById(pilotId);

  if (!pilot) {
    alert('Pilot contract not found!');
    window.location.href = 'dashboard.html';
    return;
  }

  // Lifecycle Stepper: Pilot is Step 7
  GovApp.renderLifecycleStepper(pilot.currentStep || 7, 'lifecycle-stepper-container');

  renderPilotHeader(pilot);
  renderFinancialSummary(pilot);
  renderMilestonesTable(pilot);
  renderKPIAuditTable(pilot);
  renderContractClauses(pilot);
  renderValidationSection(pilot);

  // Link proceed to scale decision button
  const scaleBtn = document.getElementById('btn-proceed-scale');
  if (scaleBtn) scaleBtn.href = `scale-decision.html?id=${pilot.id}`;

  // KPI Save Listener
  document.getElementById('btn-save-kpis')?.addEventListener('click', () => {
    saveKPIUpdates(pilot);
  });

  // Validation Save Listener
  document.getElementById('btn-save-validation')?.addEventListener('click', () => {
    saveValidationUpdates(pilot);
  });
});

function renderPilotHeader(pilot) {
  document.getElementById('pilot-challenge-title').innerText = pilot.challengeTitle;
  document.getElementById('pilot-startup-name').innerText = pilot.startupName;
  document.getElementById('pilot-department').innerText = pilot.department;
  document.getElementById('pilot-status-badge').innerText = pilot.status;
  document.getElementById('pilot-id-badge').innerText = pilot.id;
  document.getElementById('pilot-contract-value').innerText = GovRules.formatINR(pilot.contractValue);
  document.getElementById('pilot-duration').innerText = `Duration: ${pilot.durationMonths} Months (Commenced: ${pilot.startDate})`;
  if (pilot.pilotArea) {
    document.getElementById('pilot-area').innerText = pilot.pilotArea;
  }
}

function renderFinancialSummary(pilot) {
  const total = pilot.contractValue || 0;
  let paid = 0;

  (pilot.milestones || []).forEach(m => {
    if (m.status === 'Approved' || m.status === 'Completed' || m.status === 'Done') {
      paid += (m.amount || 0);
    }
  });

  const pending = total - paid;
  const percent = total > 0 ? Math.round((paid / total) * 100) : 0;

  document.getElementById('summary-contract').innerText = GovRules.formatINR(total);
  document.getElementById('summary-paid').innerText = GovRules.formatINR(paid);
  document.getElementById('summary-pending').innerText = GovRules.formatINR(pending);
  document.getElementById('summary-progress-percent').innerText = `${percent}% Disbursed`;
  document.getElementById('summary-progress-fill').style.width = `${percent}%`;
}

function renderMilestonesTable(pilot) {
  const tbody = document.getElementById('milestones-tbody');
  if (!tbody) return;

  tbody.innerHTML = (pilot.milestones || []).map(m => {
    let statusBadge = 'badge-screening';
    const isApproved = m.status === 'Approved' || m.status === 'Completed' || m.status === 'Done';

    if (isApproved) statusBadge = 'badge-scaled';
    else if (m.status === 'Under Review' || m.status === 'Submitted') statusBadge = 'badge-pilot';
    else if (m.status === 'In Progress') statusBadge = 'badge-open';
    else if (m.status === 'Rejected') statusBadge = 'badge-failed';

    const displayStatus = isApproved ? 'Approved / Disbursed' : m.status;

    return `
      <tr>
        <td>
          <strong style="color:var(--navy-primary); font-size:13px;">${m.title}</strong>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${m.description || ''}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Due: <strong>${m.dueDate || 'Standard'}</strong></div>
        </td>
        <td><strong>${m.percentage}%</strong></td>
        <td><strong>${GovRules.formatINR(m.amount)}</strong></td>
        <td><span class="badge ${statusBadge}">${displayStatus}</span></td>
        <td style="max-width:240px; font-size:11px;">
          ${m.evidenceFile ? `
            <div class="doc-badge" style="margin-bottom:4px;">📄 ${m.evidenceFile}</div>
            <div style="color:var(--text-main); font-style:italic;">"${m.evidenceNote || 'Deliverable uploaded'}"</div>
          ` : '<span style="color:var(--text-muted);">Awaiting deliverable submission</span>'}
        </td>
        <td>
          ${!isApproved ? `
            <div style="display:flex; flex-direction:column; gap:4px;">
              <button class="btn btn-green btn-sm" onclick="approveMilestone('${pilot.id}', '${m.id}')">
                ✓ Authorize Disbursement
              </button>
              ${m.evidenceFile ? `
                <button class="btn btn-secondary btn-sm" onclick="rejectMilestone('${pilot.id}', '${m.id}')">
                  &times; Request Revision
                </button>
              ` : ''}
            </div>
          ` : `
            <span style="font-size:11px; color:var(--green-dark); font-weight:700;">
              ✓ Disbursed (${m.approvalDate || 'Verified'})
            </span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function approveMilestone(pilotId, milestoneId) {
  const pilot = GovStore.getPilotById(pilotId);
  if (!pilot) return;

  const milestone = (pilot.milestones || []).find(m => m.id === milestoneId);
  if (milestone) {
    milestone.status = 'Approved';
    milestone.approvalDate = new Date().toISOString().split('T')[0];
    GovStore.savePilot(pilot);

    GovStore.logAuditEvent(
      'Milestone Payment Disbursed',
      'gov',
      'Pilot',
      pilot.id,
      'Disbursed',
      `Officer approved ${milestone.title} and released tranche of ₹${milestone.amount.toLocaleString('en-IN')}`
    );

    GovApp.showToast(`Milestone ${milestone.id} approved & tranche released!`, 'success');
    renderFinancialSummary(pilot);
    renderMilestonesTable(pilot);
  }
}

function rejectMilestone(pilotId, milestoneId) {
  const pilot = GovStore.getPilotById(pilotId);
  if (!pilot) return;

  const milestone = (pilot.milestones || []).find(m => m.id === milestoneId);
  if (milestone) {
    milestone.status = 'Rejected';
    GovStore.savePilot(pilot);

    GovStore.logAuditEvent(
      'Milestone Deliverable Rejected',
      'gov',
      'Pilot',
      pilot.id,
      'Rejected',
      `Officer requested revisions on ${milestone.title} deliverables.`
    );

    GovApp.showToast(`Milestone ${milestone.id} marked for revision.`, 'info');
    renderMilestonesTable(pilot);
  }
}

function renderKPIAuditTable(pilot) {
  const tbody = document.getElementById('kpis-tbody');
  if (!tbody) return;

  tbody.innerHTML = (pilot.kpiData || []).map((k, index) => {
    const evalResult = GovRules.calculateKPIImprovement(k.baseline, k.target, k.actual, k.higherIsBetter);
    const passBadge = evalResult.passed ? 'badge-scaled' : 'badge-failed';
    const passText = evalResult.passed ? 'TARGET ACHIEVED' : 'BELOW BENCHMARK';

    return `
      <tr>
        <td>
          <strong style="color:var(--navy-primary); font-size:13px;">${k.name}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${k.higherIsBetter ? 'Higher is better (↑)' : 'Lower is better (↓)'}</div>
        </td>
        <td>${k.baseline} ${k.unit}</td>
        <td><strong>${k.target} ${k.unit}</strong></td>
        <td>
          <input type="number" step="any" class="form-control kpi-actual-input" data-index="${index}" value="${k.actual}" style="width:110px; font-weight:700;">
        </td>
        <td>
          <strong style="color:${evalResult.improvementPercent >= 0 ? 'var(--green-dark)' : 'var(--red-primary)'}; font-size:14px;">
            ${evalResult.improvementPercent > 0 ? '+' : ''}${evalResult.improvementPercent}%
          </strong>
        </td>
        <td>
          <span class="badge ${passBadge}">${passText}</span>
        </td>
      </tr>
    `;
  }).join('');
}

function saveKPIUpdates(pilot) {
  const inputs = document.querySelectorAll('.kpi-actual-input');
  inputs.forEach(input => {
    const idx = parseInt(input.getAttribute('data-index'));
    const val = parseFloat(input.value) || 0;
    if (pilot.kpiData[idx]) {
      pilot.kpiData[idx].actual = val;
    }
  });

  GovStore.savePilot(pilot);
  GovStore.logAuditEvent(
    'KPI Metrics Updated',
    'gov',
    'Pilot',
    pilot.id,
    'Updated',
    `Officer updated operational field KPI measurements for ${pilot.id}`
  );

  GovApp.showToast('KPI performance audit updated & re-evaluated!', 'success');
  renderKPIAuditTable(pilot);
}

function renderContractClauses(pilot) {
  const c = pilot.contractClauses || {};
  document.getElementById('clause-data').innerText = c.dataOwnership || 'Exclusive Government Property';
  document.getElementById('clause-ip').innerText = c.ipOwnership || 'Perpetual Public Sector License';
  document.getElementById('clause-security').innerText = c.securityRequirements || 'STQC / CERT-In Clearance Mandatory';
  document.getElementById('clause-retention').innerText = c.dataRetention || '7 Years State Data Centre Retention';
}

function renderValidationSection(pilot) {
  const v = pilot.validation || {};
  if (document.getElementById('val-agency') && v.agency) {
    document.getElementById('val-agency').value = v.agency;
  }
  if (document.getElementById('val-reviewer') && v.reviewer) {
    document.getElementById('val-reviewer').value = v.reviewer;
  }
  if (document.getElementById('val-clearance-id') && v.clearanceId) {
    document.getElementById('val-clearance-id').value = v.clearanceId;
  }
  if (document.getElementById('val-status-select')) {
    document.getElementById('val-status-select').value = v.status || (v.approved ? 'Approved' : 'Pending');
  }
  if (document.getElementById('val-remarks') && v.comments) {
    document.getElementById('val-remarks').value = v.comments;
  }

  const pill = document.getElementById('validation-status-pill');
  if (pill) {
    const status = v.status || (v.approved ? 'Approved' : 'Pending');
    pill.innerText = status;
    pill.className = `badge ${status === 'Approved' ? 'badge-scaled' : status === 'Conditional' ? 'badge-pilot' : 'badge-open'}`;
  }
}

function saveValidationUpdates(pilot) {
  const status = document.getElementById('val-status-select')?.value || 'Pending';
  const agency = document.getElementById('val-agency')?.value || '';
  const reviewer = document.getElementById('val-reviewer')?.value || '';
  const clearanceId = document.getElementById('val-clearance-id')?.value || '';
  const remarks = document.getElementById('val-remarks')?.value || '';

  const isApproved = status === 'Approved';

  pilot.validation = {
    approved: isApproved,
    status: status,
    agency: agency,
    reviewer: reviewer,
    clearanceId: clearanceId,
    validationDate: isApproved ? new Date().toISOString().split('T')[0] : null,
    comments: remarks,
    evidenceFile: 'NHA_Field_Audit_Validation_Report_v2.pdf'
  };

  GovStore.savePilot(pilot);
  GovStore.logAuditEvent(
    'Independent Validation Recorded',
    'expert',
    'Validation',
    clearanceId || pilot.id,
    status,
    `Auditor ${reviewer} (${agency}) recorded validation status: ${status}`
  );

  GovApp.showToast(`Validation clearance saved as ${status}!`, 'success');
  renderValidationSection(pilot);
}

window.approveMilestone = approveMilestone;
window.rejectMilestone = rejectMilestone;
