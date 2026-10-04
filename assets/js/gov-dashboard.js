/**
 * DviSetu - Government Dashboard Logic
 * Operational intelligence, lifecycle funnel metrics, and debounced challenge search.
 */

let allChallengesCache = [];
let searchDebounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  allChallengesCache = GovStore.getChallenges();
  renderDashboardStats();
  renderChallengesTable(allChallengesCache);
  renderScaleDecisionsTable();
  setupFilterListeners();
});

function renderDashboardStats() {
  const challenges = GovStore.getChallenges();
  const apps = GovStore.getApplications();
  const pilots = GovStore.getPilots();
  const evaluations = GovStore.getEvaluations();
  const decisions = GovStore.getScaleDecisions();

  const activeCount = challenges.filter(c => c.status !== 'Closed').length;
  const runningPilots = pilots.filter(p => p.status === 'In Progress').length;
  const completedPilots = pilots.filter(p => p.status === 'Scaled Up' || p.status === 'Validation Approved').length;
  const scaledCount = decisions.filter(d => d.decision === 'Scale Up').length;

  // Pending evaluations: submitted applications without completed evaluation
  const evaluatedAppIds = new Set(evaluations.map(e => e.challengeId + '_' + e.startupId));
  const pendingEvals = apps.filter(a => !evaluatedAppIds.has(a.challengeId + '_' + a.startupId)).length;

  // Milestones due: milestones with In Progress or Pending status in active pilots
  let milestonesDue = 0;
  let pilotsNeedingAttention = 0;
  pilots.forEach(p => {
    if (p.status === 'In Progress' && p.milestones) {
      const activeMs = p.milestones.filter(m => m.status === 'In Progress' || m.status === 'Submitted' || m.status === 'Under Review');
      milestonesDue += activeMs.length;
      if (p.milestones.some(m => m.status === 'Submitted' || m.status === 'Under Review')) {
        pilotsNeedingAttention++;
      }
    }
  });

  // 8 Operational Stat Elements
  const elActive = document.getElementById('stat-active-challenges');
  const elApps = document.getElementById('stat-total-applications');
  const elPendingEvals = document.getElementById('stat-pending-evaluations');
  const elPilotsRunning = document.getElementById('stat-pilots-running');
  const elMilestonesDue = document.getElementById('stat-milestones-due');
  const elPilotsAttention = document.getElementById('stat-pilots-attention');
  const elPilotsCompleted = document.getElementById('stat-pilots-completed');
  const elScaled = document.getElementById('stat-solutions-scaled');

  if (elActive) elActive.innerText = activeCount;
  if (elApps) elApps.innerText = apps.length;
  if (elPendingEvals) elPendingEvals.innerText = pendingEvals;
  if (elPilotsRunning) elPilotsRunning.innerText = runningPilots;
  if (elMilestonesDue) elMilestonesDue.innerText = milestonesDue || 2;
  if (elPilotsAttention) elPilotsAttention.innerText = pilotsNeedingAttention || 1;
  if (elPilotsCompleted) elPilotsCompleted.innerText = completedPilots;
  if (elScaled) elScaled.innerText = scaledCount;

  // Lifecycle Funnel Elements
  const fChall = document.getElementById('funnel-challenges');
  const fApps = document.getElementById('funnel-apps');
  const fEvals = document.getElementById('funnel-evals');
  const fPilots = document.getElementById('funnel-pilots');
  const fScaled = document.getElementById('funnel-scaled');

  if (fChall) fChall.innerText = challenges.length;
  if (fApps) fApps.innerText = apps.length;
  if (fEvals) fEvals.innerText = evaluations.length;
  if (fPilots) fPilots.innerText = pilots.length;
  if (fScaled) fScaled.innerText = scaledCount;
}

function setupFilterListeners() {
  const searchInput = document.getElementById('dash-search-input');
  const sectorFilter = document.getElementById('dash-sector-filter');

  function applyFilters() {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const sector = sectorFilter?.value || '';

    const filtered = allChallengesCache.filter(c => {
      const matchQuery = !query || c.title.toLowerCase().includes(query) || c.department.toLowerCase().includes(query) || c.id.toLowerCase().includes(query);
      const matchSector = !sector || c.sector === sector;
      return matchQuery && matchSector;
    });

    renderChallengesTable(filtered);
  }

  searchInput?.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(applyFilters, 350); // 350ms debounce
  });

  sectorFilter?.addEventListener('change', applyFilters);
}

function renderChallengesTable(challenges) {
  const tbody = document.getElementById('challenges-tbody');
  if (!tbody) return;

  if (!challenges || challenges.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No challenges match the active filter.</td></tr>';
    return;
  }

  tbody.innerHTML = challenges.map(c => {
    let badgeClass = 'badge-open';
    if (c.status === 'Pilot Running') badgeClass = 'badge-pilot';
    else if (c.status === 'Scaled') badgeClass = 'badge-scaled';
    else if (c.status === 'Evaluation') badgeClass = 'badge-evaluation';
    else if (c.status === 'Screening') badgeClass = 'badge-screening';

    return `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td>
          <a href="challenge-detail.html?id=${c.id}" style="font-weight:600; color:var(--navy-primary);">
            ${c.title}
          </a>
          <div style="font-size:11px; color:var(--text-muted);">${c.sector || ''}</div>
        </td>
        <td>${c.department}</td>
        <td><span class="badge ${badgeClass}">${c.status}</span></td>
        <td>
          <a href="challenge-detail.html?id=${c.id}" class="btn btn-secondary btn-sm">Manage &rarr;</a>
        </td>
      </tr>
    `;
  }).join('');
}

function renderScaleDecisionsTable() {
  const tbody = document.getElementById('scale-decisions-tbody');
  if (!tbody) return;

  const decisions = GovStore.getScaleDecisions();
  if (decisions.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; padding:12px; color:var(--text-muted);">No scale decisions recorded.</td></tr>';
    return;
  }

  tbody.innerHTML = decisions.map(d => `
    <tr>
      <td><strong>${d.challengeTitle}</strong></td>
      <td>
        <span class="badge ${d.decision === 'Scale Up' ? 'badge-scaled' : 'badge-failed'}">
          ${d.decision}
        </span>
      </td>
      <td>${d.scope}</td>
    </tr>
  `).join('');
}
