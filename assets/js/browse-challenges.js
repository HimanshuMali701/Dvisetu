/**
 * DviSetu - Startup Browse Challenges Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentStartup = GovStore.getStartupById('SU-201') || GovStore.getStartups()[0];

  const grid = document.getElementById('startup-challenges-grid');
  const searchInput = document.getElementById('startup-search-input');
  const sectorFilter = document.getElementById('startup-sector-filter');

  function render() {
    if (!grid) return;
    let challenges = GovStore.getChallenges().filter(c => c.status !== 'Closed');

    const q = (searchInput?.value || '').toLowerCase().trim();
    const sec = sectorFilter?.value || '';

    if (q) {
      challenges = challenges.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sec) {
      challenges = challenges.filter(c => c.sector === sec);
    }

    if (challenges.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">No open challenges match your criteria.</div>';
      return;
    }

    grid.innerHTML = challenges.map(c => {
      // Calculate live match score for current startup
      const match = GovRules.calculateMatchScore(c.tags, currentStartup.capabilityTags, c.sector, currentStartup.sector);
      const elig = GovRules.checkEligibility(currentStartup, c.eligibilityCriteria);

      let statusBadge = 'badge-open';
      if (c.status === 'Pilot Running') statusBadge = 'badge-pilot';

      return `
        <div class="card">
          <div class="card-header">
            <div>
              <span class="badge ${statusBadge}">${c.status}</span>
              <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">${c.id}</span>
            </div>
            <div class="score-badge-large" style="width:42px; height:42px; font-size:13px;" title="Capability Tag Overlap Match">
              ${match.score}%
            </div>
          </div>
          <div class="card-body">
            <h3 style="font-size:16px; font-weight:700; color:var(--navy-primary); margin-bottom:4px;">${c.title}</h3>
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">🏛️ ${c.department}</div>
            
            <p style="font-size:13px; color:var(--text-main); margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${c.problemStatement}
            </p>

            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:12px;">
              <span>Budget: <strong style="color:var(--saffron-dark);">${c.budgetRange}</strong></span>
              <span>Duration: <strong>${c.durationMonths} Months</strong></span>
            </div>

            <div class="tag-list" style="margin-bottom:12px;">
              ${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>

            <div style="font-size:11px; padding:6px 10px; border-radius:4px; background-color:${elig.eligible ? 'var(--green-light)' : 'var(--yellow-light)'}; color:${elig.eligible ? 'var(--green-dark)' : 'var(--yellow-primary)'};">
              Auto Eligibility Check: <strong>${elig.status}</strong> (${elig.score}% criteria met)
            </div>
          </div>
          <div class="card-footer">
            <a href="apply.html?id=${c.id}" class="btn btn-primary btn-sm" style="width:100%;">Apply Now &rarr;</a>
          </div>
        </div>
      `;
    }).join('');
  }

  let debounceTimer = null;
  searchInput?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(render, 350);
  });
  sectorFilter?.addEventListener('change', render);

  render();
});
