/**
 * DviSetu - Pure Business Rules Engine
 * Explicit, pure functions for matching, eligibility, evaluation, KPI measurement, and scale recommendations.
 */

window.GovRules = (function () {
  'use strict';

  /**
   * 1. Rule-based Startup Match Score (0 - 100%)
   * Calculates tag overlap and sector alignment between challenge and startup capability tags.
   */
  function calculateMatchScore(challengeTags, startupTags, challengeSector, startupSector) {
    if (!challengeTags || !startupTags || challengeTags.length === 0) return 0;
    
    // Normalize strings
    const normChall = challengeTags.map(t => t.toLowerCase().trim());
    const normStart = startupTags.map(t => t.toLowerCase().trim());
    
    let matchedCount = 0;
    normChall.forEach(tag => {
      if (normStart.some(st => st.includes(tag) || tag.includes(st))) {
        matchedCount++;
      }
    });

    const tagOverlapScore = (matchedCount / normChall.length) * 80; // 80% weight from tags
    const sectorBonus = (challengeSector && startupSector && challengeSector.toLowerCase() === startupSector.toLowerCase()) ? 20 : 5; // 20% sector alignment
    
    const totalScore = Math.min(100, Math.round(tagOverlapScore + sectorBonus));
    
    const matchedTags = challengeTags.filter(tag => 
      normStart.some(st => st.includes(tag.toLowerCase().trim()) || tag.toLowerCase().trim().includes(st))
    );
    const missingTags = challengeTags.filter(tag => 
      !normStart.some(st => st.includes(tag.toLowerCase().trim()) || tag.toLowerCase().trim().includes(st))
    );
    const isSectorAligned = Boolean(challengeSector && startupSector && challengeSector.toLowerCase() === startupSector.toLowerCase());

    return {
      score: totalScore,
      matchedTags: matchedTags,
      missingTags: missingTags,
      totalChallengeTags: challengeTags.length,
      sectorAligned: isSectorAligned
    };
  }

  /**
   * 2. Eligibility Screening Rule Engine
   * Evaluates startup compliance against statutory government criteria.
   */
  function checkEligibility(startup, criteria) {
    if (!startup || !criteria) {
      return { eligible: false, status: 'Not Eligible', checklist: [] };
    }

    const checklist = [];
    let eligibleCount = 0;
    let totalCriteria = 0;

    // GST & Statutory Registration
    if (criteria.gstRequired) {
      totalCriteria++;
      const hasGst = Boolean(startup.gstRegistered);
      if (hasGst) eligibleCount++;
      checklist.push({
        rule: 'GST & Statutory Registration',
        passed: hasGst,
        details: hasGst ? `Registered GSTIN: ${startup.gstin || '27AAAAA0000A1Z5'}` : 'GST Registration Missing or Invalid'
      });
    }

    // DPIIT Startup Recognition
    if (criteria.dpiitRequired) {
      totalCriteria++;
      const hasDpiit = Boolean(startup.dpiitRecognized);
      if (hasDpiit) eligibleCount++;
      checklist.push({
        rule: 'DPIIT Startup Recognition',
        passed: hasDpiit,
        details: hasDpiit ? `DPIIT Cert #: ${startup.dpiitNumber || 'DPIIT-84920'}` : 'DPIIT Recognition Not Found'
      });
    }

    // Security & Quality Certification
    if (criteria.certificationRequired) {
      totalCriteria++;
      const hasCert = startup.certifications && startup.certifications.length > 0;
      if (hasCert) eligibleCount++;
      checklist.push({
        rule: 'Security / Quality Certification',
        passed: hasCert,
        details: hasCert ? `Certifications: ${startup.certifications.join(', ')}` : 'No Required Certifications (ISO/STQC/CERT-In)'
      });
    }

    // Financial Requirement / Turnover Threshold
    if (criteria.financialRequirement) {
      totalCriteria++;
      const meetsFinancial = Boolean(startup.meetsFinancialTurnover);
      if (meetsFinancial) eligibleCount++;
      checklist.push({
        rule: 'Financial Turnover & Audit Compliance',
        passed: meetsFinancial,
        details: meetsFinancial ? `Audited Financials Verified (Turnover > ₹${criteria.minTurnoverLakhs || 10} Lakhs)` : 'Financial Turnover Below Threshold'
      });
    }

    // Conflict of Interest Declaration
    if (criteria.conflictDeclaration) {
      totalCriteria++;
      const signedConflict = Boolean(startup.conflictDeclarationSigned);
      if (signedConflict) eligibleCount++;
      checklist.push({
        rule: 'Conflict of Interest Declaration',
        passed: signedConflict,
        details: signedConflict ? 'Self-Declaration Signed & Verified' : 'Declaration Pending or Signed with Disclosures'
      });
    }

    let status = 'Eligible';
    let eligible = true;

    if (eligibleCount === totalCriteria) {
      status = 'Eligible';
      eligible = true;
    } else if (eligibleCount >= totalCriteria - 1) {
      status = 'Needs Review';
      eligible = false;
    } else {
      status = 'Not Eligible';
      eligible = false;
    }

    return {
      eligible,
      status,
      score: totalCriteria > 0 ? Math.round((eligibleCount / totalCriteria) * 100) : 100,
      checklist
    };
  }

  /**
   * 3. Expert Weighted Evaluation Rule Engine
   * Calculates total weighted evaluation score out of 100 based on configurable dimension weights.
   * Defaults: Feasibility: 25%, Impact: 25%, Innovation: 20%, Scalability: 15%, Cost: 10%, Readiness: 5%
   */
  function calculateWeightedScore(scores, customWeights = null) {
    const defaultWeights = {
      feasibility: 25,
      impact: 25,
      innovation: 20,
      scalability: 15,
      cost: 10,
      readiness: 5
    };
    const weights = Object.assign({}, defaultWeights, customWeights || {});
    const weightSum = (weights.feasibility + weights.impact + weights.innovation + weights.scalability + weights.cost + weights.readiness) || 100;

    const feasibilityScore = (parseFloat(scores.feasibility) || 0) * (weights.feasibility / weightSum) * 10;
    const impactScore = (parseFloat(scores.impact) || 0) * (weights.impact / weightSum) * 10;
    const innovationScore = (parseFloat(scores.innovation) || 0) * (weights.innovation / weightSum) * 10;
    const scalabilityScore = (parseFloat(scores.scalability) || 0) * (weights.scalability / weightSum) * 10;
    const costScore = (parseFloat(scores.cost) || 0) * (weights.cost / weightSum) * 10;
    const readinessScore = (parseFloat(scores.readiness) || 0) * (weights.readiness / weightSum) * 10;

    const total = feasibilityScore + impactScore + innovationScore + scalabilityScore + costScore + readinessScore;
    return Math.round(total * 10) / 10;
  }

  /**
   * 4. KPI Performance & Improvement Rule Engine
   * Calculates improvement percentage and validates target pass/fail.
   */
  function calculateKPIImprovement(baseline, target, actual, higherIsBetter) {
    const base = parseFloat(baseline) || 0;
    const tgt = parseFloat(target) || 0;
    const act = parseFloat(actual) || 0;

    if (base === 0) return { improvementPercent: 0, passed: act >= tgt };

    let improvementPercent = 0;
    let passed = false;

    if (higherIsBetter) {
      improvementPercent = ((act - base) / base) * 100;
      passed = act >= tgt;
    } else {
      // Lower is better (e.g. wait time, latency, error rate)
      improvementPercent = ((base - act) / base) * 100;
      passed = act <= tgt;
    }

    return {
      improvementPercent: Math.round(improvementPercent * 10) / 10,
      passed
    };
  }

  /**
   * 5. Scale Recommendation Rule Engine
   * Evaluates overall pilot KPIs, budget adherence, and third-party validation to issue scale advice.
   */
  function calculateScaleRecommendation(kpiResults, budgetAdherence, validationApproved) {
    const totalKPIs = kpiResults.length;
    const passedKPIs = kpiResults.filter(k => k.passed).length;
    const kpiPassRate = totalKPIs > 0 ? (passedKPIs / totalKPIs) * 100 : 0;

    let recommendation = 'Do Not Scale';
    let summaryText = '';

    if (kpiPassRate >= 80 && validationApproved && budgetAdherence) {
      recommendation = 'Scale Up';
      summaryText = `High performance achieved (${passedKPIs}/${totalKPIs} KPIs Met, ${Math.round(kpiPassRate)}% success rate). Third-party validation confirmed and budget remained compliant. Full production deployment recommended.`;
    } else if (kpiPassRate >= 50 && validationApproved) {
      recommendation = 'Conditional Scale';
      summaryText = `Moderate performance (${passedKPIs}/${totalKPIs} KPIs Met). Third-party validation granted, but key performance gaps require target refinements before state-wide rollout.`;
    } else {
      recommendation = 'Do Not Scale';
      summaryText = `Pilot did not achieve requisite benchmark performance (${passedKPIs}/${totalKPIs} KPIs Met). Third-party validation or budget requirements failed. Contract closure advised.`;
    }

    return {
      recommendation,
      summaryText,
      kpiPassRate: Math.round(kpiPassRate),
      passedKPIs,
      totalKPIs
    };
  }

  /**
   * 6. Currency Formatter (Indian System)
   * Formats numbers into standard INR notation (e.g. ₹10,00,000)
   */
  function formatINR(amount) {
    const num = Number(amount);
    if (isNaN(num)) return '₹0';
    return '₹' + num.toLocaleString('en-IN');
  }

  return {
    calculateMatchScore,
    checkEligibility,
    calculateWeightedScore,
    calculateKPIImprovement,
    calculateScaleRecommendation,
    formatINR
  };
})();
