/**
 * DviSetu - Expert Proposal Evaluation Controller
 * Configurable multi-factor weights, real-time score computation, and audit trail persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  setupSlidersAndWeights();
  renderEvaluationHistory();

  // Toggle weights panel
  const toggleBtn = document.getElementById('btn-toggle-weights');
  const weightsPanel = document.getElementById('weights-config-panel');
  toggleBtn?.addEventListener('click', () => {
    const isHidden = weightsPanel.style.display === 'none';
    weightsPanel.style.display = isHidden ? 'block' : 'none';
    toggleBtn.innerText = isHidden ? 'Hide Weight Config' : '⚙️ Configure Weights';
  });

  // Handle Form Submission
  const form = document.getElementById('evaluation-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const challengeId = document.getElementById('select-eval-challenge').value;
    const startupId = document.getElementById('select-eval-startup').value;
    const evaluatorName = document.getElementById('input-evaluator-name').value;
    const comments = document.getElementById('input-eval-comments').value;

    const scores = getScores();
    const weights = getWeights();
    const weightedTotal = GovRules.calculateWeightedScore(scores, weights);

    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);

    const newEval = {
      id: 'EVAL-' + Math.floor(700 + Math.random() * 200),
      challengeId,
      startupId,
      evaluatorName,
      timestamp,
      scores,
      weights,
      weightedTotal,
      comments
    };

    GovStore.saveEvaluation(newEval);

    // Save Document Metadata
    GovStore.addDocument({
      entityId: newEval.id,
      title: `Expert Evaluation Scorecard for ${startupId}`,
      category: 'Proposal',
      fileName: `Scorecard_${newEval.id}_${startupId}.pdf`,
      uploadedBy: evaluatorName
    });

    // Record Audit Event
    GovStore.logAuditEvent(
      'Expert Evaluation Submitted',
      'expert',
      'Evaluation',
      newEval.id,
      'Scored',
      `${evaluatorName} submitted weighted evaluation of ${weightedTotal}/100 for ${startupId} on ${challengeId}`
    );

    GovApp.showToast(`Official Evaluation score (${weightedTotal}/100) recorded!`, 'success');
    renderEvaluationHistory();
  });
});

function getScores() {
  return {
    feasibility: parseFloat(document.getElementById('score-feasibility').value) || 0,
    impact: parseFloat(document.getElementById('score-impact').value) || 0,
    innovation: parseFloat(document.getElementById('score-innovation').value) || 0,
    scalability: parseFloat(document.getElementById('score-scalability').value) || 0,
    cost: parseFloat(document.getElementById('score-cost').value) || 0,
    readiness: parseFloat(document.getElementById('score-readiness').value) || 0
  };
}

function getWeights() {
  return {
    feasibility: parseFloat(document.getElementById('weight-feasibility')?.value) || 25,
    impact: parseFloat(document.getElementById('weight-impact')?.value) || 25,
    innovation: parseFloat(document.getElementById('weight-innovation')?.value) || 20,
    scalability: parseFloat(document.getElementById('weight-scalability')?.value) || 15,
    cost: parseFloat(document.getElementById('weight-cost')?.value) || 10,
    readiness: parseFloat(document.getElementById('weight-readiness')?.value) || 5
  };
}

function updateLiveScore() {
  const scores = getScores();
  const weights = getWeights();

  const weightSum = weights.feasibility + weights.impact + weights.innovation + weights.scalability + weights.cost + weights.readiness;
  const weightTotalEl = document.getElementById('weight-total-sum');
  if (weightTotalEl) {
    weightTotalEl.innerText = `${weightSum}%`;
    weightTotalEl.style.color = weightSum === 100 ? 'var(--green-dark)' : 'var(--red-primary)';
  }

  // Update label weights
  document.getElementById('lbl-weight-feasibility').innerText = `${weights.feasibility}%`;
  document.getElementById('lbl-weight-impact').innerText = `${weights.impact}%`;
  document.getElementById('lbl-weight-innovation').innerText = `${weights.innovation}%`;
  document.getElementById('lbl-weight-scalability').innerText = `${weights.scalability}%`;
  document.getElementById('lbl-weight-cost').innerText = `${weights.cost}%`;
  document.getElementById('lbl-weight-readiness').innerText = `${weights.readiness}%`;

  const total = GovRules.calculateWeightedScore(scores, weights);
  const badge = document.getElementById('live-total-score-badge');
  if (badge) {
    badge.innerText = total.toFixed(1);
    badge.className = `score-badge-large ${total >= 80 ? 'green' : total >= 65 ? '' : 'failed'}`;
  }

  // Render Breakdown Table
  const breakdownTbody = document.getElementById('eval-breakdown-tbody');
  if (breakdownTbody) {
    const factors = [
      { name: 'Feasibility', score: scores.feasibility, weight: weights.feasibility },
      { name: 'Impact', score: scores.impact, weight: weights.impact },
      { name: 'Innovation', score: scores.innovation, weight: weights.innovation },
      { name: 'Scalability', score: scores.scalability, weight: weights.scalability },
      { name: 'Cost', score: scores.cost, weight: weights.cost },
      { name: 'Readiness', score: scores.readiness, weight: weights.readiness }
    ];

    breakdownTbody.innerHTML = factors.map(f => {
      const weightedVal = Math.round((f.score * (f.weight / (weightSum || 100)) * 10) * 10) / 10;
      return `
        <tr>
          <td><strong>${f.name}</strong></td>
          <td>${f.score.toFixed(1)}</td>
          <td>${f.weight}%</td>
          <td><strong style="color:var(--navy-primary);">${weightedVal.toFixed(1)}</strong></td>
        </tr>
      `;
    }).join('');
  }
}

function setupSlidersAndWeights() {
  const dimensions = ['feasibility', 'impact', 'innovation', 'scalability', 'cost', 'readiness'];

  dimensions.forEach(dim => {
    const slider = document.getElementById(`score-${dim}`);
    const valDisplay = document.getElementById(`val-${dim}`);
    const weightInput = document.getElementById(`weight-${dim}`);

    slider?.addEventListener('input', () => {
      if (valDisplay) valDisplay.innerText = parseFloat(slider.value).toFixed(1);
      updateLiveScore();
    });

    weightInput?.addEventListener('input', () => {
      updateLiveScore();
    });
  });

  updateLiveScore();
}

function populateDropdowns() {
  const selectChall = document.getElementById('select-eval-challenge');
  const selectStart = document.getElementById('select-eval-startup');

  if (!selectChall || !selectStart) return;

  const challenges = GovStore.getChallenges();
  const startups = GovStore.getStartups();

  selectChall.innerHTML = challenges.map(c => `
    <option value="${c.id}">${c.id}: ${c.title.substring(0, 35)}...</option>
  `).join('');

  selectStart.innerHTML = startups.map(s => `
    <option value="${s.id}">${s.name} (${s.id})</option>
  `).join('');
}

function renderEvaluationHistory() {
  const tbody = document.getElementById('eval-history-tbody');
  if (!tbody) return;

  const evals = GovStore.getEvaluations();
  if (evals.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">No evaluation records found.</td></tr>';
    return;
  }

  tbody.innerHTML = evals.map(ev => {
    const startup = GovStore.getStartupById(ev.startupId);
    return `
      <tr>
        <td class="audit-time">${ev.timestamp}</td>
        <td><strong>${ev.challengeId}</strong></td>
        <td>${startup ? startup.name : ev.startupId}</td>
        <td>${ev.evaluatorName}</td>
        <td>
          <span style="font-size:16px; font-weight:800; color:var(--navy-primary);">
            ${ev.weightedTotal} / 100
          </span>
        </td>
        <td style="font-size:12px; color:var(--text-muted); line-height:1.4;">${ev.comments}</td>
      </tr>
    `;
  }).join('');
}
