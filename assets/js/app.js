/**
 * DviSetu - Main Shared Application Shell & UI Orchestrator
 * Dynamically injects Header, Sidebar, Lifecycle Stepper, Role Switcher, and Toast Notifications.
 */

window.GovApp = (function () {
  'use strict';

  // 10 Lifecycle Steps Definition
  const LIFECYCLE_STEPS = [
    { num: 1, label: 'Creation' },
    { num: 2, label: 'Matching' },
    { num: 3, label: 'Eligibility' },
    { num: 4, label: 'Evaluation' },
    { num: 5, label: 'Selection' },
    { num: 6, label: 'Milestones' },
    { num: 7, label: 'Payments' },
    { num: 8, label: 'KPI Audit' },
    { num: 9, label: 'Validation' },
    { num: 10, label: 'Scale Decision' }
  ];

  // Helper to determine relative path prefix to root
  function getPathPrefix() {
    const path = window.location.pathname;
    if (path.includes('/gov/') || path.includes('/startup/') || path.includes('/expert/')) {
      return '../';
    }
    return './';
  }

  function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Toast Notification System
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()" style="background:none; border:none; color:white; font-size:16px; cursor:pointer; margin-left:12px;">&times;</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4000);
  }

  // Inject DviSetu Geometric Bridge Emblem SVG
  function getEmblemSVG() {
    return `
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="DviSetu Logo">
        <rect width="40" height="40" rx="8" fill="#0B2545"/>
        <!-- Government Pillar (Left) -->
        <path d="M9 28V15C9 13.9 9.9 13 11 13H13C14.1 13 15 13.9 15 15V28H9Z" fill="#FFFFFF"/>
        <!-- Startup Innovation Pillar (Right) -->
        <path d="M25 28V15C25 13.9 25.9 13 27 13H29C30.1 13 31 13.9 31 15V28H25Z" fill="#FF9933"/>
        <!-- The Connecting Bridge Span / Deck ("Setu") -->
        <path d="M7 21C13 17 27 17 33 21" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M6 24H34" stroke="#FF9933" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Central Keystone Node -->
        <circle cx="20" cy="18" r="2.5" fill="#138808"/>
      </svg>
    `;
  }

  // Render Header
  function initHeader() {
    const headerElement = document.getElementById('app-header');
    if (!headerElement) return;

    const prefix = getPathPrefix();
    const currentRole = GovStore.getRole();
    const authUser = window.GovStore ? GovStore.getAuthUser() : null;
    let roleLabel = 'Government Officer';
    let roleBadgeClass = 'gov';

    if (currentRole === 'startup') {
      roleLabel = 'Startup Founder';
      roleBadgeClass = 'startup';
    } else if (currentRole === 'expert') {
      roleLabel = 'Expert Evaluator';
      roleBadgeClass = 'expert';
    }

    headerElement.innerHTML = `
      <div class="brand-container">
        <a href="${prefix}overview.html" class="brand-logo" title="DviSetu Overview & Lifecycle Tour">${getEmblemSVG()}</a>
        <div>
          <a href="${prefix}overview.html" class="brand-title">DviSetu</a>
          <span class="brand-subtitle">Government&ndash;Startup Innovation Procurement Platform</span>
        </div>
      </div>
      
      <div class="header-right">
        <div class="role-badge-pill ${roleBadgeClass}">
          <span>●</span> Persona: <strong>${roleLabel}</strong>
          ${authUser && authUser.email ? `<span style="font-weight:400; opacity:0.85; margin-left:4px;">(${authUser.email})</span>` : ''}
        </div>
        
        <button id="btn-switch-role" class="btn-header-link">Switch Role</button>
        ${authUser ? 
          `<button id="btn-logout" class="btn-header-link" title="Sign out of portal">Sign Out</button>` : 
          `<a href="${prefix}login.html" class="btn-header-link" style="text-decoration:none;">Sign In</a>`
        }
        <button id="btn-reset-demo" class="btn-reset-data" title="Revert to original seed demonstration dataset">Reset Demo Data</button>
      </div>
    `;

    document.getElementById('btn-switch-role')?.addEventListener('click', openRoleModal);
    document.getElementById('btn-logout')?.addEventListener('click', () => {
      if (window.GovStore) GovStore.clearAuthUser();
      showToast('Signed out of portal session', 'info');
      setTimeout(() => {
        window.location.href = `${prefix}index.html`;
      }, 300);
    });
    document.getElementById('btn-reset-demo')?.addEventListener('click', () => {
      if (confirm('Reset all demo state to original seed data?')) {
        GovStore.resetDemoData();
        showToast('Demo data successfully reset!', 'success');
        setTimeout(() => window.location.reload(), 600);
      }
    });
  }

  // Render Sidebar based on current Role
  function initSidebar() {
    const sidebarElement = document.getElementById('app-sidebar');
    if (!sidebarElement) return;

    const prefix = getPathPrefix();
    const role = GovStore.getRole();
    const currentPath = window.location.pathname;

    let menuHTML = '';

    if (role === 'gov') {
      menuHTML = `
        <div class="sidebar-menu-header">Department Procurement</div>
        <ul class="sidebar-menu">
          <li class="sidebar-menu-item ${currentPath.includes('gov/dashboard') ? 'active' : ''}">
            <a href="${prefix}gov/dashboard.html">📊 Operational Dashboard</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/challenges') ? 'active' : ''}">
            <a href="${prefix}gov/challenges.html">🎯 All Challenges</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/create-challenge') ? 'active' : ''}">
            <a href="${prefix}gov/create-challenge.html">➕ Create Challenge</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/startups') ? 'active' : ''}">
            <a href="${prefix}gov/startups.html">🔍 Startup Discovery</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/pilot') ? 'active' : ''}">
            <a href="${prefix}gov/pilot.html?id=PL-901">🚀 Active Pilot Oversight</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/scale-decision') ? 'active' : ''}">
            <a href="${prefix}gov/scale-decision.html?id=PL-901">📈 Scale Decisions</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/audit-trail') ? 'active' : ''}">
            <a href="${prefix}gov/audit-trail.html">📜 Transparent Audit Trail</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('overview') ? 'active' : ''}">
            <a href="${prefix}overview.html">📋 10-Step Tour &amp; Specs</a>
          </li>
        </ul>
      `;
    } else if (role === 'startup') {
      menuHTML = `
        <div class="sidebar-menu-header">Startup Portal</div>
        <ul class="sidebar-menu">
          <li class="sidebar-menu-item ${currentPath.includes('startup/dashboard') ? 'active' : ''}">
            <a href="${prefix}startup/dashboard.html">🚀 Startup Dashboard</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('startup/browse-challenges') ? 'active' : ''}">
            <a href="${prefix}startup/browse-challenges.html">🔍 Browse Open Challenges</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('startup/my-pilot') ? 'active' : ''}">
            <a href="${prefix}startup/my-pilot.html?id=PL-901">📋 Active Pilot Execution</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/audit-trail') ? 'active' : ''}">
            <a href="${prefix}gov/audit-trail.html">📜 Procurement Audit Log</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('overview') ? 'active' : ''}">
            <a href="${prefix}overview.html">📋 10-Step Tour &amp; Specs</a>
          </li>
        </ul>
      `;
    } else if (role === 'expert') {
      menuHTML = `
        <div class="sidebar-menu-header">Evaluation Portal</div>
        <ul class="sidebar-menu">
          <li class="sidebar-menu-item ${currentPath.includes('expert/evaluate') ? 'active' : ''}">
            <a href="${prefix}expert/evaluate.html">⚖️ Proposal Evaluation</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('gov/audit-trail') ? 'active' : ''}">
            <a href="${prefix}gov/audit-trail.html">📜 Evaluation Audit Trail</a>
          </li>
          <li class="sidebar-menu-item ${currentPath.includes('overview') ? 'active' : ''}">
            <a href="${prefix}overview.html">📋 10-Step Tour &amp; Specs</a>
          </li>
        </ul>
      `;
    }

    sidebarElement.innerHTML = menuHTML;
  }

  // Render Official Disclaimer Footer
  function initFooter() {
    if (document.getElementById('portal-footer')) return;
    const footer = document.createElement('footer');
    footer.id = 'portal-footer';
    footer.className = 'portal-disclaimer-footer';
    footer.innerHTML = `
      <div>
        <strong>DviSetu</strong> &bull; Government&ndash;Startup Innovation Procurement Platform &bull; 
        Department of Skills, Employment, Entrepreneurship & Innovation.
      </div>
      <div style="font-size: 11px; color: #64748B; margin-top: 4px;">
        Smart India Hackathon 2026 (SIH26136) Demonstration Platform &bull; Prototype for Presentation & Evaluation Purposes Only.
      </div>
    `;
    document.body.appendChild(footer);
  }

  // Render 10-Step Lifecycle Stepper Component
  function renderLifecycleStepper(activeStepIndex = 1, targetContainerId = 'lifecycle-stepper-container') {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    let stepsHTML = '';
    LIFECYCLE_STEPS.forEach(step => {
      let stateClass = '';
      if (step.num < activeStepIndex) {
        stateClass = 'completed';
      } else if (step.num === activeStepIndex) {
        stateClass = 'active';
      }

      stepsHTML += `
        <div class="stepper-step ${stateClass}">
          <div class="step-icon-circle">${step.num < activeStepIndex ? '✓' : step.num}</div>
          <div class="step-label">${step.label}</div>
        </div>
      `;
    });

    const activeLabel = LIFECYCLE_STEPS.find(s => s.num === activeStepIndex)?.label || '';

    container.innerHTML = `
      <div class="stepper-container">
        <div class="stepper-header">
          <span class="stepper-header-title">Procurement Lifecycle Stepper</span>
          <span class="stepper-current-label">Stage ${activeStepIndex} of 10: ${activeLabel}</span>
        </div>
        <div class="stepper-steps">
          ${stepsHTML}
        </div>
      </div>
    `;
  }

  // Switch Role Modal
  function openRoleModal() {
    let modal = document.getElementById('role-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'role-modal';
      modal.className = 'modal-overlay';
      const prefix = getPathPrefix();
      modal.innerHTML = `
        <div class="modal-box" style="padding:24px;">
          <h3 style="color:var(--navy-primary); margin-bottom:16px;">Switch Active Role Persona</h3>
          <p style="color:var(--text-muted); font-size:13px; margin-bottom:20px;">
            Select a role to test role-specific dashboards, controls, and workflows.
          </p>
          <div class="grid grid-3" style="margin-bottom:20px;">
            <div class="role-select-card" data-role="gov">
              <div style="font-size:24px; margin-bottom:8px;">🏛️</div>
              <strong style="display:block; color:var(--navy-primary);">Gov Officer</strong>
              <span style="font-size:11px; color:var(--text-muted);">Challenges, Pilots, KPI Approval, Scale Decision</span>
            </div>
            <div class="role-select-card" data-role="startup">
              <div style="font-size:24px; margin-bottom:8px;">🚀</div>
              <strong style="display:block; color:var(--navy-primary);">Startup Founder</strong>
              <span style="font-size:11px; color:var(--text-muted);">Apply, Eligibility, Upload Evidence</span>
            </div>
            <div class="role-select-card" data-role="expert">
              <div style="font-size:24px; margin-bottom:8px;">⚖️</div>
              <strong style="display:block; color:var(--navy-primary);">Expert Evaluator</strong>
              <span style="font-size:11px; color:var(--text-muted);">6-Factor Weighted Scoring & Audit Log</span>
            </div>
          </div>
          <div style="text-align:right;">
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('role-modal').classList.remove('active')">Cancel</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelectorAll('.role-select-card').forEach(card => {
        card.addEventListener('click', (e) => {
          const role = card.getAttribute('data-role');
          GovStore.setRole(role);
          modal.classList.remove('active');
          showToast(`Role switched to ${role.toUpperCase()}`, 'success');
          
          // Redirect to role home page
          setTimeout(() => {
            if (role === 'gov') window.location.href = `${prefix}gov/dashboard.html`;
            else if (role === 'startup') window.location.href = `${prefix}startup/dashboard.html`;
            else if (role === 'expert') window.location.href = `${prefix}expert/evaluate.html`;
          }, 300);
        });
      });
    }

    modal.classList.add('active');
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initSidebar();
    initFooter();
  });

  return {
    showToast,
    getParam,
    renderLifecycleStepper,
    openRoleModal,
    getPathPrefix
  };
})();
