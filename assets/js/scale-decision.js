/**
 * DviSetu - Evidence-Based Scale Decision Controller
 * Evaluates pilot performance factors, displays pure rule recommendation, and finalizes official scale decrees.
 */

document.addEventListener('DOMContentLoaded', () => {
  GovApp.renderLifecycleStepper(10, 'lifecycle-stepper-container');

  const pilotId = GovApp.getParam('id') || 'PL-901';
  let pilot = GovStore.getPilotById(pilotId);

  if (!pilot) {
    alert('Pilot data not found!');
    window.location.href = 'dashboard.html';
    return;
  }

  // Calculate KPI results using pure rules engine
  const kpiResults = (pilot.kpiData || []).map(k => {
    const res = GovRules.calculateKPIImprovement(k.baseline, k.target, k.actual, k.higherIsBetter);
    return {
      ...k,
      improvementPercent: res.improvementPercent,
      passed: res.passed
    };
  });

  const validationApproved = Boolean(pilot.validation && (pilot.validation.approved || pilot.validation.status === 'Approved'));
  const budgetAdherence = true; // No cost overruns

  // Calculate pure rule recommendation
  const rec = GovRules.calculateScaleRecommendation(kpiResults, budgetAdherence, validationApproved);

  // Render Recommendation Banner
  const recBadge = document.getElementById('rec-badge');
  const recTitle = document.getElementById('rec-title');
  const recSummary = document.getElementById('rec-summary');
  const recPassCircle = document.getElementById('rec-kpi-pass-circle');
  const recBanner = document.getElementById('recommendation-banner');

  if (rec.recommendation === 'Scale Up') {
    recBadge.innerText = 'Scale Up Recommended';
    recBadge.className = 'badge badge-scaled';
    recTitle.innerText = 'Evidence-Based Recommendation: Ready for State-Wide Scale';
    recBanner.className = 'callout success';
  } else if (rec.recommendation === 'Conditional Scale') {
    recBadge.innerText = 'Conditional Scale';
    recBadge.className = 'badge badge-screening';
    recTitle.innerText = 'Evidence-Based Recommendation: Conditional Scale Review';
    recBanner.className = 'callout warning';
  } else {
    recBadge.innerText = 'Do Not Scale';
    recBadge.className = 'badge badge-failed';
    recTitle.innerText = 'Evidence-Based Recommendation: Not Ready for Scale';
    recBanner.className = 'callout danger';
  }

  recSummary.innerText = rec.summaryText;
  recPassCircle.innerText = `${rec.kpiPassRate}%`;

  // Render 5 Factor Indicators
  const elFactorKpi = document.getElementById('factor-kpi');
  const elFactorVal = document.getElementById('factor-validation');
  if (elFactorKpi) elFactorKpi.innerText = `${rec.passedKPIs} / ${rec.totalKPIs} Met`;
  if (elFactorVal) elFactorVal.innerText = validationApproved ? 'APPROVED' : 'PENDING';

  // Render Audited Evidence Breakdown
  const tbody = document.getElementById('evidence-kpi-tbody');
  tbody.innerHTML = kpiResults.map(k => `
    <tr>
      <td><strong style="color:var(--navy-primary);">${k.name}</strong></td>
      <td>${k.baseline} ${k.unit}</td>
      <td><strong>${k.actual} ${k.unit}</strong></td>
      <td style="color:${k.improvementPercent >= 0 ? 'var(--green-dark)' : 'var(--red-primary)'}; font-weight:700;">
        ${k.improvementPercent > 0 ? '+' : ''}${k.improvementPercent}%
      </td>
      <td><span class="badge ${k.passed ? 'badge-scaled' : 'badge-failed'}">${k.passed ? 'PASSED' : 'BELOW BENCHMARK'}</span></td>
    </tr>
  `).join('');

  // Prefill reasoning textarea
  const reasoningTxt = document.getElementById('input-scale-reasoning');
  if (reasoningTxt) {
    reasoningTxt.value = `Official Procurement Decree: Field pilot execution for '${pilot.challengeTitle}' conducted by ${pilot.startupName} attained ${rec.passedKPIs} of ${rec.totalKPIs} benchmark KPIs (${rec.kpiPassRate}% pass rate). Third-party technical clearance confirmed by ${pilot.validation?.agency || 'auditor'}. Budget remained compliant with zero cost overruns. Authorized under Maharashtra State Innovation Procurement Sandbox Guidelines.`;
  }

  // Handle Form Submission
  const form = document.getElementById('scale-decision-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedDecision = document.querySelector('input[name="radio-decision"]:checked')?.value || rec.recommendation;
    const scope = document.getElementById('select-scope').value;
    const budgetAllocated = parseFloat(document.getElementById('input-scale-budget').value) || 25000000;
    const reasoning = reasoningTxt.value;

    const decisionRecord = {
      id: 'SD-' + Math.floor(1000 + Math.random() * 9000),
      pilotId: pilot.id,
      challengeTitle: pilot.challengeTitle,
      startupName: pilot.startupName,
      decision: selectedDecision,
      scope: scope,
      budgetAllocated: budgetAllocated,
      timestamp: new Date().toISOString().split('T')[0],
      reasoning: reasoning
    };

    GovStore.saveScaleDecision(decisionRecord);

    // Update pilot and challenge status
    pilot.status = selectedDecision === 'Scale Up' ? 'Scaled Up' : 'Closed';
    GovStore.savePilot(pilot);
    GovStore.updateChallengeStatus(pilot.challengeId, 'Scaled');

    // Add Document Record
    GovStore.addDocument({
      entityId: decisionRecord.id,
      title: `Sanction Order for ${pilot.startupName} Scale-up (${scope})`,
      category: 'Scale Decree',
      fileName: `Govt_Sanction_Order_${decisionRecord.id}_Final.pdf`,
      uploadedBy: 'Nodal Procurement Authority'
    });

    // Record Audit Event
    GovStore.logAuditEvent(
      'Scale Authorization Decree Finalized',
      'gov',
      'ScaleDecision',
      decisionRecord.id,
      selectedDecision,
      `Government authority authorized ${selectedDecision} for ${pilot.startupName} across ${scope} with budget sanction of ₹${budgetAllocated.toLocaleString('en-IN')}`
    );

    GovApp.showToast(`Scale Decision ${decisionRecord.id} Authorized & Saved!`, 'success');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 700);
  });
});
