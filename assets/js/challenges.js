/**
 * DviSetu - All Challenges Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('challenges-grid');
  const searchInput = document.getElementById('search-query');
  const sectorSelect = document.getElementById('filter-sector');
  const statusSelect = document.getElementById('filter-status');

  function render() {
    if (!grid) return;
    let list = GovStore.getChallenges();

    const q = (searchInput?.value || '').toLowerCase().trim();
    const sector = sectorSelect?.value || '';
    const status = statusSelect?.value || '';

    if (q) {
      list = list.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (sector) {
      list = list.filter(c => c.sector === sector);
    }

    if (status) {
      list = list.filter(c => c.status === status);
    }

    if (list.length === 0) {
      grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:40px; color:var(--text-muted);">No matching challenges found.</div>';
      return;
    }

    grid.innerHTML = list.map(c => {
      let badgeClass = 'badge-open';
      if (c.status === 'Pilot Running') badgeClass = 'badge-pilot';
      else if (c.status === 'Scaled') badgeClass = 'badge-scaled';
      else if (c.status === 'Evaluation') badgeClass = 'badge-evaluation';

      return `
        <div class="card">
          <div class="card-header">
            <div>
              <span class="badge ${badgeClass}">${c.status}</span>
              <span style="font-size:12px; color:var(--text-muted); margin-left:8px;">${c.id}</span>
            </div>
            <strong style="font-size:13px; color:var(--saffron-dark);">${c.budgetRange}</strong>
          </div>
          <div class="card-body">
            <h3 style="font-size:16px; font-weight:700; color:var(--navy-primary); margin-bottom:8px;">${c.title}</h3>
            <div style="font-size:12px; color:var(--text-muted); margin-bottom:12px;">🏛️ ${c.department}</div>
            <p style="font-size:13px; color:var(--text-main); margin-bottom:16px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
              ${c.problemStatement}
            </p>
            <div class="tag-list" style="margin-bottom:16px;">
              ${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <a href="challenge-detail.html?id=${c.id}" class="btn btn-primary btn-sm" style="width:100%;">View Challenge & Manage &rarr;</a>
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
  sectorSelect?.addEventListener('change', render);
  statusSelect?.addEventListener('change', render);

  render();
});
