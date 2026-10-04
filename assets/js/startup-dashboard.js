/**
 * DviSetu - Startup Dashboard Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Use SU-201 (MedQ) as default logged-in startup for demo
  const currentStartupId = 'SU-201';

  const apps = GovStore.getApplicationsByStartup(currentStartupId);
  const pilots = GovStore.getPilots().filter(p => p.startupId === currentStartupId);

  // Stats
  document.getElementById('startup-stat-apps').innerText = apps.length;
  document.getElementById('startup-stat-pilots').innerText = pilots.filter(p => p.status === 'In Progress').length;

  let totalPaid = 0;
  pilots.forEach(p => {
    (p.milestones || []).forEach(m => {
      if (m.status === 'Done' || m.status === 'Approved' || m.status === 'Completed') totalPaid += (m.amount || 0);
    });
  });
  document.getElementById('startup-stat-payments').innerText = GovRules.formatINR(totalPaid);

  // Render Applications Table
  const tbody = document.getElementById('startup-apps-tbody');
  if (tbody) {
    if (apps.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding:16px;">No applications submitted yet.</td></tr>';
    } else {
      tbody.innerHTML = apps.map(app => {
        const challenge = GovStore.getChallengeById(app.challengeId);
        let statusBadge = 'badge-screening';
        if (app.status === 'Shortlisted') statusBadge = 'badge-evaluation';
        else if (app.status === 'Selected for Pilot') statusBadge = 'badge-pilot';
        else if (app.status === 'Rejected') statusBadge = 'badge-failed';

        return `
          <tr>
            <td>
              <strong>${challenge ? challenge.title : app.challengeId}</strong>
              <div style="font-size:11px; color:var(--text-muted);">${app.challengeId}</div>
            </td>
            <td>${app.submissionDate}</td>
            <td><strong>${GovRules.formatINR(app.proposedBudget)}</strong></td>
            <td><span class="badge ${statusBadge}">${app.status}</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  // Active Pilot
  const activePilot = pilots[0] || GovStore.getPilotById('PL-901');
  if (activePilot) {
    document.getElementById('active-pilot-title').innerText = activePilot.challengeTitle;
    let paidAmt = 0;
    (activePilot.milestones || []).forEach(m => {
      if (m.status === 'Done') paidAmt += m.amount;
    });
    const pct = activePilot.contractValue > 0 ? Math.round((paidAmt / activePilot.contractValue) * 100) : 0;
    document.getElementById('active-pilot-progress-text').innerText = `${pct}%`;
    document.getElementById('active-pilot-bar').style.width = `${pct}%`;
  }
});
