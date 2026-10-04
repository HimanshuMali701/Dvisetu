/**
 * DviSetu - Startup Application Submission Controller
 * Pre-fills challenge data, executes live statutory audit, stores proposal metadata, and logs audit events.
 */

document.addEventListener('DOMContentLoaded', () => {
  const challengeId = GovApp.getParam('id') || 'CH-101';
  const challenge = GovStore.getChallengeById(challengeId);
  const currentStartup = GovStore.getStartupById('SU-201') || GovStore.getStartups()[0];

  if (!challenge) {
    alert('Challenge not found!');
    window.location.href = 'browse-challenges.html';
    return;
  }

  document.getElementById('apply-challenge-id').innerText = challenge.id;
  document.getElementById('apply-challenge-title').innerText = challenge.title;
  document.getElementById('apply-challenge-budget').innerText = challenge.budgetRange;
  document.getElementById('input-proposed-budget').value = challenge.budgetMax || 2200000;
  document.getElementById('input-proposed-months').value = challenge.durationMonths || 6;

  // Run live statutory eligibility audit pure rule function
  const elig = GovRules.checkEligibility(currentStartup, challenge.eligibilityCriteria);
  const banner = document.getElementById('apply-eligibility-banner');
  const checklistContainer = document.getElementById('apply-eligibility-checklist');

  if (elig.eligible) {
    banner.className = 'callout success';
  } else if (elig.status === 'Needs Review') {
    banner.className = 'callout warning';
  } else {
    banner.className = 'callout danger';
  }

  checklistContainer.innerHTML = `
    <div style="font-weight:700; margin-bottom:8px; font-size:13px;">
      Compliance Result: <span class="badge ${elig.eligible ? 'badge-scaled' : elig.status === 'Needs Review' ? 'badge-pilot' : 'badge-failed'}">${elig.status}</span> 
      &bull; Statutory Score: <strong>${elig.score}%</strong>
    </div>
    <div class="grid grid-2">
      ${elig.checklist.map(item => `
        <div style="font-size:12px; padding:6px 10px; background:#FFFFFF; border:1px solid var(--border-color); border-radius:4px;">
          <span style="color:${item.passed ? 'var(--green-primary)' : 'var(--red-primary)'}; font-weight:700;">
            ${item.passed ? '✓ PASSED' : '✗ FAILED'}
          </span> &bull; <strong>${item.rule}</strong>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${item.details}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Submit Application Form
  const form = document.getElementById('apply-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const appId = 'APP-' + Math.floor(500 + Math.random() * 400);
    const newApp = {
      id: appId,
      challengeId: challenge.id,
      startupId: currentStartup.id,
      submissionDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      solutionOverview: document.getElementById('input-solution-overview').value,
      technicalApproach: document.getElementById('input-tech-approach').value,
      implementationPlan: document.getElementById('input-implementation-plan').value,
      relevantExperience: document.getElementById('input-relevant-experience').value,
      proposalText: document.getElementById('input-solution-overview').value,
      proposedBudget: parseFloat(document.getElementById('input-proposed-budget').value) || 2200000,
      proposedMonths: parseInt(document.getElementById('input-proposed-months').value) || 6,
      eligibilityResult: elig
    };

    GovStore.submitApplication(newApp);

    // Add Document Record
    GovStore.addDocument({
      entityId: appId,
      title: `${currentStartup.name} Technical & Commercial Proposal`,
      category: 'Proposal',
      fileName: `Proposal_${challenge.id}_${currentStartup.id}.pdf`,
      uploadedBy: currentStartup.name
    });

    // Record Audit Event
    GovStore.logAuditEvent(
      'Startup Bid Proposal Submitted',
      'startup',
      'Application',
      appId,
      'Submitted',
      `${currentStartup.name} submitted official proposal for ${challenge.id} (Bid: ₹${newApp.proposedBudget.toLocaleString('en-IN')})`
    );

    GovApp.showToast(`Proposal ${appId} submitted successfully!`, 'success');

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 600);
  });
});
