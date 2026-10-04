/**
 * DviSetu - Startup My Pilot Controller
 * Deliverable uploads, milestone execution status, payment tracking, and audit logging.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pilotId = GovApp.getParam('id') || 'PL-901';
  let pilot = GovStore.getPilotById(pilotId);

  if (!pilot) {
    alert('No active pilot contract found!');
    window.location.href = 'dashboard.html';
    return;
  }

  document.getElementById('my-pilot-title').innerText = pilot.challengeTitle;
  document.getElementById('my-pilot-dept').innerText = `Department: ${pilot.department} | Startup: ${pilot.startupName}`;
  document.getElementById('my-pilot-status').innerText = pilot.status;
  document.getElementById('my-pilot-value').innerText = GovRules.formatINR(pilot.contractValue);

  renderMilestones(pilot);

  // Modal logic
  const modal = document.getElementById('upload-modal');
  const form = document.getElementById('evidence-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const mId = document.getElementById('modal-milestone-id').value;
    const note = document.getElementById('modal-evidence-note').value;
    const fileInput = document.getElementById('modal-evidence-file');

    let fileName = 'Deliverable_Verification_Signed.pdf';
    if (fileInput.files && fileInput.files[0]) {
      fileName = fileInput.files[0].name;
    }

    const milestone = pilot.milestones.find(m => m.id === mId);
    if (milestone) {
      milestone.evidenceNote = note;
      milestone.evidenceFile = fileName;
      milestone.status = 'Under Review'; // Moves to Under Review state

      GovStore.savePilot(pilot);

      // Add to Document Metadata
      GovStore.addDocument({
        entityId: pilot.id,
        title: `${milestone.title} Verification Evidence`,
        category: 'Milestone Deliverable',
        fileName: fileName,
        uploadedBy: pilot.startupName
      });

      // Log Audit Event
      GovStore.logAuditEvent(
        'Milestone Deliverable Submitted',
        'startup',
        'Pilot',
        pilot.id,
        'Under Review',
        `${pilot.startupName} uploaded deliverable proof (${fileName}) for ${milestone.title}. Awaiting government review.`
      );

      modal.classList.remove('active');
      GovApp.showToast(`Evidence uploaded for ${milestone.title}! Submitted for Government review.`, 'success');
      setTimeout(() => window.location.reload(), 500);
    }
  });
});

function renderMilestones(pilot) {
  const tbody = document.getElementById('my-milestones-tbody');
  if (!tbody) return;

  tbody.innerHTML = (pilot.milestones || []).map(m => {
    const isApproved = m.status === 'Approved' || m.status === 'Completed' || m.status === 'Done';
    let statusBadge = 'badge-screening';
    if (isApproved) statusBadge = 'badge-scaled';
    else if (m.status === 'Under Review' || m.status === 'Submitted') statusBadge = 'badge-pilot';
    else if (m.status === 'In Progress') statusBadge = 'badge-open';
    else if (m.status === 'Rejected') statusBadge = 'badge-failed';

    const displayStatus = isApproved ? 'Approved / Disbursed' : m.status;

    return `
      <tr>
        <td>
          <strong style="color:var(--navy-primary); font-size:13px;">${m.title}</strong>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${m.description || ''}</div>
          <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">Due: <strong>${m.dueDate || 'Standard'}</strong></div>
        </td>
        <td><strong>${m.percentage}%</strong></td>
        <td><strong>${GovRules.formatINR(m.amount)}</strong></td>
        <td><span class="badge ${statusBadge}">${displayStatus}</span></td>
        <td style="font-size:12px; max-width:240px;">
          ${m.evidenceFile ? `
            <div class="doc-badge" style="margin-bottom:4px;">📄 ${m.evidenceFile}</div>
            <div style="color:var(--text-muted); font-size:11px; font-style:italic;">"${m.evidenceNote}"</div>
          ` : '<span style="color:var(--text-muted);">No evidence uploaded yet</span>'}
        </td>
        <td>
          ${!isApproved ? `
            <button class="btn btn-saffron btn-sm" onclick="openUploadModal('${m.id}')">
              📤 Upload Deliverable Proof &rarr;
            </button>
          ` : `
            <span style="font-size:11px; color:var(--green-dark); font-weight:700;">✓ Disbursed (${m.approvalDate || 'Verified'})</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function openUploadModal(milestoneId) {
  const modal = document.getElementById('upload-modal');
  document.getElementById('modal-milestone-id').value = milestoneId;
  document.getElementById('modal-evidence-note').value = '';
  modal.classList.add('active');
}

window.openUploadModal = openUploadModal;
