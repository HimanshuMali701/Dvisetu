/**
 * DviSetu - Government–Startup Innovation Procurement Platform
 * Formal Portal Authentication Controller (SIH26136)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Role Configuration Definitions
  const ROLES = {
    gov: {
      key: 'gov',
      badge: '🏛️ Government Officer',
      title: 'Government Officer Login',
      emailLabel: 'Department Email',
      placeholder: 'e.g. officer.procurement@maharashtra.gov.in',
      submitBtnText: 'Sign In as Government Officer',
      demoEmail: 'gov@demo.local',
      targetUrl: './gov/dashboard.html'
    },
    startup: {
      key: 'startup',
      badge: '🚀 Startup Founder',
      title: 'Startup Founder Login',
      emailLabel: 'Registered Startup Email',
      placeholder: 'e.g. founder@innovate.startup.in',
      submitBtnText: 'Sign In as Startup',
      demoEmail: 'startup@demo.local',
      targetUrl: './startup/dashboard.html'
    },
    expert: {
      key: 'expert',
      badge: '⚖️ Expert / Evaluator',
      title: 'Expert / Evaluator Login',
      emailLabel: 'Registered Email',
      placeholder: 'e.g. evaluator.tech@expert.gov.in',
      submitBtnText: 'Sign In as Expert',
      demoEmail: 'expert@demo.local',
      targetUrl: './expert/evaluate.html'
    }
  };

  // State
  let activeRole = null;

  // DOM Elements
  const sectionRoleSelect = document.getElementById('section-role-select');
  const sectionLoginForm = document.getElementById('section-login-form');
  const btnChangeRole = document.getElementById('btn-change-role');

  const selectedRoleBadge = document.getElementById('selected-role-badge');
  const formTitle = document.getElementById('form-title');
  const emailLabel = document.getElementById('email-label');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const btnTogglePassword = document.getElementById('btn-toggle-password');
  const submitBtn = document.getElementById('btn-submit-login');
  const inlineAlert = document.getElementById('login-inline-error');
  const alertText = document.getElementById('login-error-text');

  const demoFillChip = document.getElementById('demo-fill-chip');
  const demoRoleText = document.getElementById('demo-role-text');
  const demoEmailText = document.getElementById('demo-email-text');

  // Switch to Role Login Form (Step 2)
  function activateRole(roleKey) {
    const config = ROLES[roleKey];
    if (!config) return;

    activeRole = roleKey;

    // Update Header & Labels in Form View
    if (selectedRoleBadge) selectedRoleBadge.textContent = config.badge;
    if (formTitle) formTitle.textContent = config.title;
    if (emailLabel) emailLabel.innerHTML = `${config.emailLabel} <span class="required" aria-hidden="true">*</span>`;
    if (emailInput) {
      emailInput.placeholder = config.placeholder;
      emailInput.value = '';
    }
    if (passwordInput) passwordInput.value = '';
    if (submitBtn) {
      submitBtn.textContent = config.submitBtnText;
      submitBtn.disabled = true; // disabled until fields have input
    }

    // Update Demo Info Box
    if (demoRoleText) demoRoleText.textContent = config.badge + ':';
    if (demoEmailText) demoEmailText.textContent = config.demoEmail;

    clearError();

    // Show Form View, Hide Role Selection
    if (sectionRoleSelect) sectionRoleSelect.style.display = 'none';
    if (sectionLoginForm) {
      sectionLoginForm.style.display = 'block';
      setTimeout(() => emailInput?.focus(), 50);
    }
  }

  // Switch back to Role Selection (Step 1)
  function showRoleSelection() {
    activeRole = null;
    clearError();
    if (sectionLoginForm) sectionLoginForm.style.display = 'none';
    if (sectionRoleSelect) sectionRoleSelect.style.display = 'block';
  }

  // Check form completeness to enable/disable Sign In button
  function validateInputsLive() {
    if (!submitBtn) return;
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const passVal = passwordInput ? passwordInput.value : '';
    const isReady = emailVal.length > 0 && passVal.length > 0;
    submitBtn.disabled = !isReady;
  }

  // Display Inline Error
  function showError(msg) {
    if (!inlineAlert || !alertText) return;
    alertText.textContent = msg;
    inlineAlert.classList.add('visible');
    inlineAlert.setAttribute('aria-hidden', 'false');
  }

  // Clear Inline Error
  function clearError() {
    if (!inlineAlert || !alertText) return;
    inlineAlert.classList.remove('visible');
    inlineAlert.setAttribute('aria-hidden', 'true');
    alertText.textContent = '';
  }

  // Event Listeners for Role Selection Cards
  document.querySelectorAll('.portal-role-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const roleKey = card.getAttribute('data-role');
      activateRole(roleKey);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const roleKey = card.getAttribute('data-role');
        activateRole(roleKey);
      }
    });
  });

  // Event Listener for "← Change Role"
  if (btnChangeRole) {
    btnChangeRole.addEventListener('click', (e) => {
      e.preventDefault();
      showRoleSelection();
    });
  }

  // Live input validation (enables/disables submit button)
  emailInput?.addEventListener('input', () => {
    clearError();
    validateInputsLive();
  });
  passwordInput?.addEventListener('input', () => {
    clearError();
    validateInputsLive();
  });

  // Toggle Password Visibility
  if (btnTogglePassword && passwordInput) {
    btnTogglePassword.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      btnTogglePassword.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      btnTogglePassword.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  // Demo auto-fill chip
  if (demoFillChip) {
    demoFillChip.addEventListener('click', () => {
      if (!activeRole || !ROLES[activeRole]) return;
      const config = ROLES[activeRole];
      if (emailInput) emailInput.value = config.demoEmail;
      if (passwordInput) passwordInput.value = 'demo@2026';
      clearError();
      validateInputsLive();
      if (submitBtn) submitBtn.focus();
    });
  }

  // Form Submission
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearError();

      if (!activeRole || !ROLES[activeRole]) {
        showError('Please select your operational role first.');
        showRoleSelection();
        return;
      }

      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passwordInput ? passwordInput.value : '';

      if (!emailVal) {
        showError('Enter a valid email address.');
        emailInput?.focus();
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        showError('Enter a valid email address.');
        emailInput?.focus();
        return;
      }

      if (!passVal) {
        showError('Please enter your password.');
        passwordInput?.focus();
        return;
      }

      if (passVal.length < 3) {
        showError('Incorrect email or password.');
        passwordInput?.focus();
        return;
      }

      // Enter Loading State
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span style="display:inline-block; width:12px; height:12px; border:2px solid #FFFFFF; border-top-color:transparent; border-radius:50%; animation: spin 0.6s linear infinite; margin-right:6px; vertical-align:middle;"></span>
        Signing in...
      `;
      if (emailInput) emailInput.disabled = true;
      if (passwordInput) passwordInput.disabled = true;

      setTimeout(() => {
        try {
          const config = ROLES[activeRole];

          // Store authentication session
          if (window.GovStore) {
            GovStore.setRole(activeRole);
            GovStore.setAuthUser({
              email: emailVal,
              role: activeRole,
              roleName: config.badge,
              name: config.badge,
              loggedInAt: new Date().toISOString()
            });

            GovStore.logAuditEvent(
              'User Login',
              activeRole,
              'AuthSession',
              emailVal,
              'Success',
              `User authenticated as ${config.badge} via DviSetu portal.`
            );
          }

          // Check for redirect query param
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get('redirect');
          const dest = (redirect && !redirect.startsWith('http')) ? redirect : config.targetUrl;

          window.location.href = dest;

        } catch (err) {
          console.error('Sign-in error:', err);
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          if (emailInput) emailInput.disabled = false;
          if (passwordInput) passwordInput.disabled = false;
          showError('An error occurred during authentication. Please try again.');
        }
      }, 400);
    });
  }

  // Pre-activate role if provided in URL (e.g. index.html?role=startup)
  const urlParams = new URLSearchParams(window.location.search);
  const initialRole = urlParams.get('role');
  if (initialRole && ROLES[initialRole]) {
    activateRole(initialRole);
  }
});
