/**
 * DviSetu - Startup Discovery & Capability Matching Engine
 * Debounced search, multi-criteria filtering, and live capability match scoring against active challenges.
 */

let allStartupsCache = [];
let allChallengesCache = [];
let searchDebounceTimer = null;
let selectedChallenge = null;

document.addEventListener('DOMContentLoaded', () => {
  allStartupsCache = GovStore.getStartups();
  allChallengesCache = GovStore.getChallenges();

  populateChallengeDropdown();
  setupFilterListeners();
  renderStartups();
});

function populateChallengeDropdown() {
  const select = document.getElementById('select-active-challenge');
  if (!select) return;

  const openChallenges = allChallengesCache.filter(c => c.status !== 'Closed');
  openChallenges.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.innerText = `${c.id}: ${c.title.substring(0, 30)}...`;
    select.appendChild(opt);
  });

  select.addEventListener('change', (e) => {
    const cid = e.target.value;
    selectedChallenge = allChallengesCache.find(c => c.id === cid) || null;
    renderStartups();
  });
}

function setupFilterListeners() {
  const searchInput = document.getElementById('startup-search-input');
  const sectorFilter = document.getElementById('filter-sector');
  const stageFilter = document.getElementById('filter-stage');
  const certFilter = document.getElementById('filter-cert');

  function triggerFilter() {
    renderStartups();
  }

  searchInput?.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(triggerFilter, 350);
  });

  sectorFilter?.addEventListener('change', triggerFilter);
  stageFilter?.addEventListener('change', triggerFilter);
  certFilter?.addEventListener('change', triggerFilter);
}

function getFilteredStartups() {
  const query = (document.getElementById('startup-search-input')?.value || '').toLowerCase().trim();
  const sector = document.getElementById('filter-sector')?.value || '';
  const stage = document.getElementById('filter-stage')?.value || '';
  const cert = document.getElementById('filter-cert')?.value || '';

  return allStartupsCache.filter(s => {
    const matchesQuery = !query || 
      s.name.toLowerCase().includes(query) || 
      (s.founder && s.founder.toLowerCase().includes(query)) ||
      (s.location && s.location.toLowerCase().includes(query)) ||
      (s.pitchSummary && s.pitchSummary.toLowerCase().includes(query)) ||
      (s.capabilityTags && s.capabilityTags.some(t => t.toLowerCase().includes(query)));

    const matchesSector = !sector || s.sector === sector;
    const matchesStage = !stage || s.stage === stage;
    const matchesCert = !cert || (s.certifications && s.certifications.some(c => c.includes(cert)));

    return matchesQuery && matchesSector && matchesStage && matchesCert;
  });
}

function renderStartups() {
  const container = document.getElementById('startups-grid');
  const countLabel = document.getElementById('discovery-results-count');
  if (!container) return;

  const startups = getFilteredStartups();

  if (countLabel) {
    countLabel.innerText = `Showing ${startups.length} of ${allStartupsCache.length} registered startups`;
  }

  if (startups.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: var(--border-radius);">
        <p style="color: var(--text-muted); font-size: 15px;">No startups found matching your filter criteria.</p>
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('startup-search-input').value=''; document.getElementById('filter-sector').value=''; renderStartups();" style="margin-top: 10px;">
          Clear All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = startups.map(s => {
    // If challenge selected, compute capability match score
    let matchSection = '';
    if (selectedChallenge) {
      const matchResult = GovRules.calculateMatchScore(
        selectedChallenge.tags || [],
        s.capabilityTags || [],
        selectedChallenge.sector,
        s.sector
      );

      const scoreColor = matchResult.score >= 75 ? 'var(--green-dark)' : matchResult.score >= 50 ? 'var(--saffron-dark)' : 'var(--text-muted)';
      const matchedBadges = matchResult.matchedTags.slice(0, 3).map(t => `<span class="tag-badge" style="background:#DCFCE7; color:#15803D; font-size:10px;">✓ ${t}</span>`).join(' ');
      const missingBadges = matchResult.missingTags.slice(0, 2).map(t => `<span class="tag-badge" style="background:#F1F5F9; color:#64748B; font-size:10px;">&times; ${t}</span>`).join(' ');

      matchSection = `
        <div style="margin-top: 12px; padding: 10px 12px; background: #F8FAFC; border: 1px solid var(--border-color); border-radius: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--navy-primary); text-transform: uppercase;">
              Capability Match to ${selectedChallenge.id}
            </span>
            <span style="font-size: 14px; font-weight: 800; color: ${scoreColor};">
              ${matchResult.score}%
            </span>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); display: flex; flex-wrap: wrap; gap: 4px; align-items: center;">
            ${matchedBadges} ${missingBadges}
          </div>
        </div>
      `;
    }

    const certBadges = (s.certifications || []).map(c => `<span class="badge badge-open" style="font-size:10px; padding:2px 6px;">${c}</span>`).join(' ');
    const tagBadges = (s.capabilityTags || []).slice(0, 4).map(t => `<span class="tag-badge" style="font-size:11px;">${t}</span>`).join(' ');

    return `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div class="card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div>
              <span class="badge badge-open" style="font-size: 11px;">${s.sector || 'Technology'}</span>
              <h3 style="font-size: 16px; font-weight: 700; color: var(--navy-primary); margin-top: 4px;">
                ${s.name}
              </h3>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                📍 ${s.location || 'India'} &bull; Stage: <strong>${s.stage || 'Startup'}</strong> &bull; Founded by: ${s.founder || 'Founders'}
              </div>
            </div>
            <div style="text-align: right;">
              ${s.dpiitRecognized ? '<span class="badge badge-scaled" title="DPIIT Recognized Startup">✓ DPIIT</span>' : '<span class="badge badge-failed" title="Non-DPIIT">Non-DPIIT</span>'}
            </div>
          </div>

          <p style="font-size: 12px; color: var(--text-main); margin-bottom: 12px; line-height: 1.4;">
            ${s.pitchSummary ? s.pitchSummary.substring(0, 140) + '...' : 'Innovative startup delivering technology solutions for public sector modernization.'}
          </p>

          <div style="margin-bottom: 8px;">
            <div style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">Capability Tags:</div>
            <div class="tag-list">${tagBadges}</div>
          </div>

          ${certBadges ? `<div style="margin-top: 6px; display: flex; gap: 4px; flex-wrap: wrap;">${certBadges}</div>` : ''}

          ${matchSection}
        </div>

        <div class="card-footer" style="display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;">
          <span style="font-size: 11px; color: var(--text-muted);">
            Deployments: <strong>${s.pastDeployments || 0}</strong>
          </span>
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="openStartupModal('${s.id}')">
              View Profile
            </button>
            <button type="button" class="btn btn-saffron btn-sm" onclick="inviteStartup('${s.id}')">
              Invite to Bid
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.openStartupModal = function (startupId) {
  const startup = allStartupsCache.find(s => s.id === startupId);
  if (!startup) return;

  const modal = document.getElementById('startup-modal');
  document.getElementById('modal-startup-name').innerText = startup.name;
  document.getElementById('modal-startup-sector').innerText = startup.sector;
  document.getElementById('modal-startup-meta').innerText = `HQ: ${startup.location} | Stage: ${startup.stage} | Team: ${startup.teamSize || 15} members`;
  document.getElementById('modal-startup-pitch').innerText = startup.pitchSummary || 'No summary provided.';

  const tagsContainer = document.getElementById('modal-startup-tags');
  tagsContainer.innerHTML = (startup.capabilityTags || []).map(t => `<span class="tag-badge">${t}</span>`).join(' ');

  const statutoryTbody = document.getElementById('modal-startup-statutory');
  statutoryTbody.innerHTML = `
    <tr>
      <td><strong>DPIIT Recognition</strong></td>
      <td>${startup.dpiitRecognized ? '✓ Verified (' + (startup.dpiitNumber || 'DPIIT-Cert') + ')' : '<span style="color:var(--red-primary);">Not Recognized</span>'}</td>
    </tr>
    <tr>
      <td><strong>GST Registration</strong></td>
      <td>${startup.gstRegistered ? '✓ Registered (' + (startup.gstin || '27AAAAA0000A1Z5') + ')' : '<span style="color:var(--red-primary);">Unregistered</span>'}</td>
    </tr>
    <tr>
      <td><strong>Certifications</strong></td>
      <td>${(startup.certifications && startup.certifications.length) ? startup.certifications.join(', ') : 'None Reported'}</td>
    </tr>
    <tr>
      <td><strong>Financial Audit Turnover</strong></td>
      <td>${startup.meetsFinancialTurnover ? '✓ Compliant with Minimum Turnover Criteria' : '<span style="color:var(--red-primary);">Below Threshold</span>'}</td>
    </tr>
    <tr>
      <td><strong>Conflict Undertaking</strong></td>
      <td>${startup.conflictDeclarationSigned ? '✓ Signed & Legally Verified' : '<span style="color:var(--yellow-primary);">Pending Disclosures</span>'}</td>
    </tr>
  `;

  const inviteBtn = document.getElementById('modal-btn-invite');
  if (inviteBtn) {
    inviteBtn.onclick = () => {
      inviteStartup(startup.id);
      modal.classList.remove('active');
    };
  }

  modal.classList.add('active');
};

window.inviteStartup = function (startupId) {
  const startup = allStartupsCache.find(s => s.id === startupId);
  const challengeTitle = selectedChallenge ? selectedChallenge.title : 'Active Departmental Challenges';
  const challengeId = selectedChallenge ? selectedChallenge.id : 'CH-101';

  GovStore.logAuditEvent(
    'Startup Invitation Issued',
    'gov',
    'Startup',
    startupId,
    'Invited',
    `Government officer dispatched procurement challenge invitation to ${startup ? startup.name : startupId} for ${challengeTitle}`
  );

  GovApp.showToast(`Invitation sent to ${startup ? startup.name : 'Startup'} for ${challengeId}!`, 'success');
};
