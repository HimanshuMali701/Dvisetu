/**
 * DviSetu - LocalStorage State Store Engine
 * Handles persistent data storage, retrieval, and demo data resets.
 */

window.GovStore = (function () {
  'use strict';

  const STORAGE_KEY_PREFIX = 'govinnovate_';
  const KEYS = {
    INITIALIZED: STORAGE_KEY_PREFIX + 'initialized',
    ROLE: STORAGE_KEY_PREFIX + 'current_role',
    CHALLENGES: STORAGE_KEY_PREFIX + 'challenges',
    STARTUPS: STORAGE_KEY_PREFIX + 'startups',
    APPLICATIONS: STORAGE_KEY_PREFIX + 'applications',
    EVALUATIONS: STORAGE_KEY_PREFIX + 'evaluations',
    PILOTS: STORAGE_KEY_PREFIX + 'pilots',
    SCALE_DECISIONS: STORAGE_KEY_PREFIX + 'scale_decisions',
    AUDIT_EVENTS: STORAGE_KEY_PREFIX + 'audit_events',
    DOCUMENTS: STORAGE_KEY_PREFIX + 'documents',
    AUTH_USER: STORAGE_KEY_PREFIX + 'auth_user'
  };

  function initStore() {
    if (!localStorage.getItem(KEYS.INITIALIZED)) {
      resetDemoData();
    }
  }

  function resetDemoData() {
    if (!window.GovSeedData) {
      console.error('GovSeedData not loaded!');
      return;
    }
    localStorage.setItem(KEYS.INITIALIZED, 'true');
    localStorage.setItem(KEYS.ROLE, 'gov'); // default role
    localStorage.setItem(KEYS.CHALLENGES, JSON.stringify(window.GovSeedData.challenges));
    localStorage.setItem(KEYS.STARTUPS, JSON.stringify(window.GovSeedData.startups));
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(window.GovSeedData.applications));
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(window.GovSeedData.evaluations));
    localStorage.setItem(KEYS.PILOTS, JSON.stringify(window.GovSeedData.pilots));
    localStorage.setItem(KEYS.SCALE_DECISIONS, JSON.stringify(window.GovSeedData.scaleDecisions));
    localStorage.setItem(KEYS.AUDIT_EVENTS, JSON.stringify(window.GovSeedData.auditEvents || []));
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(window.GovSeedData.documents || []));
    localStorage.removeItem(KEYS.AUTH_USER);
    console.log('DviSetu state reset to initial demo dataset.');
  }

  /* --- Role --- */
  function getRole() {
    return localStorage.getItem(KEYS.ROLE) || 'gov';
  }
  function setRole(role) {
    localStorage.setItem(KEYS.ROLE, role);
  }

  /* --- Authentication Session --- */
  function getAuthUser() {
    initStore();
    try {
      const data = localStorage.getItem(KEYS.AUTH_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function setAuthUser(user) {
    if (user) {
      localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
      if (user.role) {
        setRole(user.role);
      }
    } else {
      localStorage.removeItem(KEYS.AUTH_USER);
    }
  }

  function clearAuthUser() {
    localStorage.removeItem(KEYS.AUTH_USER);
  }

  /* --- Challenges --- */
  function getChallenges() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.CHALLENGES) || '[]');
  }
  function getChallengeById(id) {
    const list = getChallenges();
    return list.find(c => c.id === id) || null;
  }
  function saveChallenge(challenge) {
    const list = getChallenges();
    const existingIndex = list.findIndex(c => c.id === challenge.id);
    if (existingIndex >= 0) {
      list[existingIndex] = challenge;
    } else {
      list.unshift(challenge);
    }
    localStorage.setItem(KEYS.CHALLENGES, JSON.stringify(list));
    return challenge;
  }
  function updateChallengeStatus(id, status) {
    const list = getChallenges();
    const item = list.find(c => c.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(KEYS.CHALLENGES, JSON.stringify(list));
    }
  }

  /* --- Startups --- */
  function getStartups() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.STARTUPS) || '[]');
  }
  function getStartupById(id) {
    const list = getStartups();
    return list.find(s => s.id === id) || null;
  }

  /* --- Applications --- */
  function getApplications() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || '[]');
  }
  function getApplicationsByChallenge(challengeId) {
    const list = getApplications();
    return list.filter(a => a.challengeId === challengeId);
  }
  function getApplicationsByStartup(startupId) {
    const list = getApplications();
    return list.filter(a => a.startupId === startupId);
  }
  function submitApplication(app) {
    const list = getApplications();
    list.unshift(app);
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(list));
    return app;
  }
  function updateApplicationStatus(id, status) {
    const list = getApplications();
    const app = list.find(a => a.id === id);
    if (app) {
      app.status = status;
      localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(list));
    }
  }

  /* --- Evaluations --- */
  function getEvaluations() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.EVALUATIONS) || '[]');
  }
  function getEvaluationsByChallenge(challengeId) {
    const list = getEvaluations();
    return list.filter(e => e.challengeId === challengeId);
  }
  function saveEvaluation(evalData) {
    const list = getEvaluations();
    list.unshift(evalData);
    localStorage.setItem(KEYS.EVALUATIONS, JSON.stringify(list));
    return evalData;
  }

  /* --- Pilots --- */
  function getPilots() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.PILOTS) || '[]');
  }
  function getPilotById(id) {
    const list = getPilots();
    return list.find(p => p.id === id) || null;
  }
  function getPilotByChallenge(challengeId) {
    const list = getPilots();
    return list.find(p => p.challengeId === challengeId) || null;
  }
  function savePilot(pilot) {
    const list = getPilots();
    const existingIndex = list.findIndex(p => p.id === pilot.id);
    if (existingIndex >= 0) {
      list[existingIndex] = pilot;
    } else {
      list.unshift(pilot);
    }
    localStorage.setItem(KEYS.PILOTS, JSON.stringify(list));
    return pilot;
  }

  /* --- Scale Decisions --- */
  function getScaleDecisions() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.SCALE_DECISIONS) || '[]');
  }
  function saveScaleDecision(decision) {
    const list = getScaleDecisions();
    list.unshift(decision);
    localStorage.setItem(KEYS.SCALE_DECISIONS, JSON.stringify(list));
    return decision;
  }

  /* --- Milestone State Management --- */
  function updateMilestone(pilotId, milestoneId, updates) {
    const list = getPilots();
    const pilot = list.find(p => p.id === pilotId);
    if (!pilot || !pilot.milestones) return null;
    const ms = pilot.milestones.find(m => m.id === milestoneId);
    if (!ms) return null;

    Object.assign(ms, updates);
    localStorage.setItem(KEYS.PILOTS, JSON.stringify(list));
    return ms;
  }

  /* --- Pilot Validation --- */
  function updatePilotValidation(pilotId, validationData) {
    const list = getPilots();
    const pilot = list.find(p => p.id === pilotId);
    if (!pilot) return null;
    pilot.validation = Object.assign({}, pilot.validation || {}, validationData);
    localStorage.setItem(KEYS.PILOTS, JSON.stringify(list));
    return pilot.validation;
  }

  /* --- Audit Trail System --- */
  function getAuditEvents() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.AUDIT_EVENTS) || '[]');
  }

  function logAuditEvent(action, role, entityType, entityId, status, details) {
    initStore();
    const events = getAuditEvents();
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newEvent = {
      id: 'AUD-' + Date.now().toString().slice(-6),
      timestamp,
      action,
      role: role || getRole(),
      entityType,
      entityId,
      status: status || 'Completed',
      details: details || ''
    };
    events.unshift(newEvent);
    // keep maximum 100 recent events
    if (events.length > 100) events.length = 100;
    localStorage.setItem(KEYS.AUDIT_EVENTS, JSON.stringify(events));
    return newEvent;
  }

  /* --- Document Repository --- */
  function getDocuments() {
    initStore();
    return JSON.parse(localStorage.getItem(KEYS.DOCUMENTS) || '[]');
  }

  function addDocument(doc) {
    initStore();
    const docs = getDocuments();
    const newDoc = Object.assign({
      id: 'DOC-' + Date.now().toString().slice(-5),
      uploadDate: new Date().toISOString().substring(0, 10),
      status: 'Approved'
    }, doc);
    docs.unshift(newDoc);
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs));
    return newDoc;
  }

  // Auto initialize on script read
  initStore();

  return {
    resetDemoData,
    getRole,
    setRole,
    getChallenges,
    getChallengeById,
    saveChallenge,
    updateChallengeStatus,
    getStartups,
    getStartupById,
    getApplications,
    getApplicationsByChallenge,
    getApplicationsByStartup,
    submitApplication,
    updateApplicationStatus,
    getEvaluations,
    getEvaluationsByChallenge,
    saveEvaluation,
    getPilots,
    getPilotById,
    getPilotByChallenge,
    savePilot,
    updateMilestone,
    updatePilotValidation,
    getScaleDecisions,
    saveScaleDecision,
    getAuditEvents,
    logAuditEvent,
    getDocuments,
    addDocument,
    getAuthUser,
    setAuthUser,
    clearAuthUser
  };
})();
