/**
 * DviSetu - Multi-Step Challenge Creation Wizard
 * Step-by-step validation, dynamic KPI table, and audit trail logging.
 */

document.addEventListener('DOMContentLoaded', () => {
  GovApp.renderLifecycleStepper(1, 'lifecycle-stepper-container');

  const form = document.getElementById('create-challenge-form');
  const kpiTbody = document.getElementById('kpi-rows-tbody');
  const addKpiBtn = document.getElementById('btn-add-kpi');
  const saveDraftBtn = document.getElementById('btn-save-draft');

  // Multi-step wizard navigation
  const stepButtons = document.querySelectorAll('.wizard-step-btn');
  const stepPanes = document.querySelectorAll('.wizard-pane');
  let currentStep = 1;

  function showStep(stepNumber) {
    currentStep = stepNumber;
    stepButtons.forEach(btn => {
      const step = parseInt(btn.getAttribute('data-step'));
      btn.classList.toggle('active', step === currentStep);
      btn.classList.toggle('completed', step < currentStep);
    });
    stepPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === `step-pane-${currentStep}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step'));
      showStep(targetStep);
    });
  });

  document.querySelectorAll('.btn-next-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-target'));
      // Basic validation for step 1
      if (currentStep === 1) {
        const title = document.getElementById('input-title')?.value.trim();
        const dept = document.getElementById('input-department')?.value.trim();
        if (!title || !dept) {
          GovApp.showToast('Please fill in Department and Problem Title before proceeding.', 'error');
          return;
        }
      }
      showStep(target);
    });
  });

  document.querySelectorAll('.btn-prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-target'));
      showStep(target);
    });
  });

  // KPI Table Management
  function addKpiRow(name = '', baseline = '', target = '', unit = '', higherIsBetter = true) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="form-control kpi-name" value="${name}" placeholder="KPI Name (e.g. Wait Time)" required></td>
      <td><input type="number" step="any" class="form-control kpi-base" value="${baseline}" placeholder="120" required></td>
      <td><input type="number" step="any" class="form-control kpi-target" value="${target}" placeholder="45" required></td>
      <td><input type="text" class="form-control kpi-unit" value="${unit}" placeholder="minutes / %" required></td>
      <td>
        <select class="form-control kpi-direction">
          <option value="true" ${higherIsBetter ? 'selected' : ''}>Higher is Better (&uarr;)</option>
          <option value="false" ${!higherIsBetter ? 'selected' : ''}>Lower is Better (&darr;)</option>
        </select>
      </td>
      <td style="text-align:center;">
        <button type="button" class="btn btn-secondary btn-sm" onclick="this.closest('tr').remove()" title="Remove row">&times;</button>
      </td>
    `;
    kpiTbody.appendChild(tr);
  }

  // Pre-seed default KPIs
  addKpiRow('Average OPD Waiting Time', '120', '45', 'minutes', false);
  addKpiRow('Daily Patient Throughput per Counter', '150', '280', 'patients', true);
  addKpiRow('Patient Satisfaction Index', '2.2', '4.5', 'out of 5', true);

  addKpiBtn?.addEventListener('click', () => {
    addKpiRow('', '', '', '', true);
  });

  // Extract challenge object
  function collectChallengePayload(status = 'Open') {
    const kpis = [];
    kpiTbody.querySelectorAll('tr').forEach((tr, index) => {
      const name = tr.querySelector('.kpi-name')?.value.trim();
      const baseline = parseFloat(tr.querySelector('.kpi-base')?.value) || 0;
      const target = parseFloat(tr.querySelector('.kpi-target')?.value) || 0;
      const unit = tr.querySelector('.kpi-unit')?.value.trim() || '';
      const higherIsBetter = tr.querySelector('.kpi-direction')?.value === 'true';

      if (name) {
        kpis.push({
          id: 'kpi-' + (index + 1),
          name,
          baseline,
          target,
          unit,
          higherIsBetter
        });
      }
    });

    const rawTags = document.getElementById('input-tags').value;
    const tags = rawTags.split(',').map(t => t.trim()).filter(Boolean);
    const challengeId = 'CH-' + Math.floor(200 + Math.random() * 800);

    return {
      id: challengeId,
      title: document.getElementById('input-title').value.trim(),
      department: document.getElementById('input-department').value.trim(),
      departmentUnit: document.getElementById('input-department-unit').value.trim(),
      sector: document.getElementById('input-sector').value,
      status: status,
      budgetRange: document.getElementById('input-budget-range').value.trim(),
      budgetMax: parseFloat(document.getElementById('input-budget-max').value) || 0,
      durationMonths: parseInt(document.getElementById('input-duration').value) || 6,
      problemStatement: document.getElementById('input-problem').value.trim(),
      currentProcess: document.getElementById('input-process').value.trim(),
      expectedOutcome: document.getElementById('input-outcome').value.trim(),
      tags: tags,
      dataRequirements: document.getElementById('input-data-req').value.trim(),
      cybersecurityRequirements: document.getElementById('input-cybersecurity-req').value.trim(),
      riskConsiderations: document.getElementById('input-risk-considerations').value.trim(),
      eligibilityCriteria: {
        gstRequired: document.getElementById('chk-gst').checked,
        dpiitRequired: document.getElementById('chk-dpiit').checked,
        certificationRequired: document.getElementById('chk-cert').checked,
        financialRequirement: document.getElementById('chk-financial').checked,
        minTurnoverLakhs: parseFloat(document.getElementById('input-min-turnover').value) || 10,
        conflictDeclaration: document.getElementById('chk-conflict').checked
      },
      kpis: kpis,
      createdDate: new Date().toISOString().split('T')[0]
    };
  }

  // Handle Save Draft
  saveDraftBtn?.addEventListener('click', () => {
    const draft = collectChallengePayload('Draft');
    GovStore.saveChallenge(draft);
    GovStore.logAuditEvent(
      'Challenge Draft Saved',
      'gov',
      'Challenge',
      draft.id,
      'Draft',
      `Officer saved challenge draft: ${draft.title}`
    );
    GovApp.showToast(`Challenge ${draft.id} saved as Draft!`, 'info');
    setTimeout(() => {
      window.location.href = `challenge-detail.html?id=${draft.id}`;
    }, 600);
  });

  // Handle Publish
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const challenge = collectChallengePayload('Open');
    GovStore.saveChallenge(challenge);
    GovStore.logAuditEvent(
      'Challenge Published',
      'gov',
      'Challenge',
      challenge.id,
      'Published',
      `Officer published innovation challenge for ${challenge.department}: ${challenge.title}`
    );
    GovApp.showToast(`Challenge ${challenge.id} published successfully!`, 'success');
    setTimeout(() => {
      window.location.href = `challenge-detail.html?id=${challenge.id}`;
    }, 600);
  });
});
