/**
 * DviSetu - Audit Trail Ledger Script
 * Chronological immutable audit history viewer with debounced filtering and export.
 */

let allAuditEventsCache = [];
let auditSearchTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  allAuditEventsCache = GovStore.getAuditEvents();
  renderAuditTable();
  setupAuditFilterListeners();

  document.getElementById('btn-export-audit')?.addEventListener('click', () => {
    window.print();
  });
});

function setupAuditFilterListeners() {
  const searchInput = document.getElementById('audit-search-input');
  const roleFilter = document.getElementById('audit-role-filter');
  const entityFilter = document.getElementById('audit-entity-filter');

  function triggerFilter() {
    renderAuditTable();
  }

  searchInput?.addEventListener('input', () => {
    clearTimeout(auditSearchTimer);
    auditSearchTimer = setTimeout(triggerFilter, 300);
  });

  roleFilter?.addEventListener('change', triggerFilter);
  entityFilter?.addEventListener('change', triggerFilter);
}

function getFilteredAuditEvents() {
  const query = (document.getElementById('audit-search-input')?.value || '').toLowerCase().trim();
  const role = document.getElementById('audit-role-filter')?.value || '';
  const entity = document.getElementById('audit-entity-filter')?.value || '';

  return allAuditEventsCache.filter(item => {
    const matchesQuery = !query ||
      item.action.toLowerCase().includes(query) ||
      (item.entityId && item.entityId.toLowerCase().includes(query)) ||
      (item.details && item.details.toLowerCase().includes(query));

    const matchesRole = !role || item.role === role;
    const matchesEntity = !entity || item.entityType === entity;

    return matchesQuery && matchesRole && matchesEntity;
  });
}

function renderAuditTable() {
  const tbody = document.getElementById('audit-tbody');
  const badge = document.getElementById('audit-count-badge');
  if (!tbody) return;

  const events = getFilteredAuditEvents();

  if (badge) {
    badge.innerText = `${events.length} of ${allAuditEventsCache.length} Logged Actions`;
  }

  if (events.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 30px; color: var(--text-muted);">
          No audit records found matching your filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = events.map(e => {
    let roleClass = 'badge-open';
    let roleLabel = 'Gov Officer';
    if (e.role === 'startup') {
      roleClass = 'badge-pilot';
      roleLabel = 'Startup Founder';
    } else if (e.role === 'expert') {
      roleClass = 'badge-evaluation';
      roleLabel = 'Expert Evaluator';
    }

    let statusBadgeClass = 'badge-open';
    if (e.status === 'Approved' || e.status === 'Authorized' || e.status === 'Disbursed') {
      statusBadgeClass = 'badge-scaled';
    } else if (e.status === 'Rejected' || e.status === 'Failed') {
      statusBadgeClass = 'badge-failed';
    } else if (e.status === 'Pending' || e.status === 'Submitted') {
      statusBadgeClass = 'badge-screening';
    }

    return `
      <tr>
        <td class="audit-time">${e.timestamp}</td>
        <td>
          <span class="audit-action-tag">${e.action}</span>
        </td>
        <td>
          <span class="badge ${roleClass}">${roleLabel}</span>
        </td>
        <td>
          <strong style="color: var(--navy-primary); font-size: 13px;">${e.entityId || '--'}</strong>
          <span style="font-size: 10px; color: var(--text-muted); display: block;">${e.entityType || ''}</span>
        </td>
        <td>
          <span class="badge ${statusBadgeClass}">${e.status}</span>
        </td>
        <td style="font-size: 12px; color: var(--text-main); line-height: 1.4;">
          ${e.details}
        </td>
      </tr>
    `;
  }).join('');
}
