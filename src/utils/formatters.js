export const calculateCorpus = (formData) => {
  const years = parseInt(formData.yearsUntilRetirement, 10) || 30;
  const baseCorpus = (parseFloat(formData.requiredAnnualIncome) * 20) / 10000000 || 4.2;
  return Math.max(1.2, parseFloat(baseCorpus.toFixed(2)));
};

export const calculateReadinessScore = (formData) => {
  const totalSavings =
    (parseFloat(formData.epfTotalCorpus) || 0) +
    (parseFloat(formData.npsTotalCorpus) || 0) +
    (parseFloat(formData.superTotalCorpus) || 0);
  const scoreVal = Math.min(100, Math.round((totalSavings / 5000000) * 100));
  return scoreVal > 0 ? scoreVal : 72;
};

export const buildCalcPayload = (formData) => {
  // Check if retirement section was skipped (all fields empty)
  const fields = [
    'targetRetireAge', 'yearsUntilRetirement', 'requiredAnnualIncome',
    'epfEmployerShare', 'epfEmployeeShare', 'epfTotalCorpus',
    'npsEmployerShare', 'npsEmployeeShare', 'npsTotalCorpus',
    'superEmployerShare', 'superTotalCorpus',
  ];
  const isRetEmpty = fields.every(field => !formData[field] || formData[field].toString().trim() === '');

  if (isRetEmpty) {
    return {};
  }

  const parseNum = (val) => {
    if (val === undefined || val === null || val.toString().trim() === '') return undefined;
    const num = parseFloat(val);
    return isNaN(num) ? undefined : num;
  };

  const epfEmp = parseNum(formData.epfEmployerShare);
  const epfSelf = parseNum(formData.epfEmployeeShare);
  const epfAccum = parseNum(formData.epfTotalCorpus);

  const npsEmp = parseNum(formData.npsEmployerShare);
  const npsSelf = parseNum(formData.npsEmployeeShare);
  const npsAccum = parseNum(formData.npsTotalCorpus);

  const saEmp = parseNum(formData.superEmployerShare);
  const saAccum = parseNum(formData.superTotalCorpus);

  const reqIncome = parseNum(formData.requiredAnnualIncome);
  const hhMonthly = parseNum(formData.monthlyExpense);

  const epfAnnualShares = [epfEmp, epfSelf].filter(v => v !== undefined);
  const clientEpfAnnual = epfAnnualShares.length > 0 ? epfAnnualShares.reduce((a, b) => a + b, 0) : undefined;
  const clientEpfAccum = epfAccum;

  const payload = {};

  if (reqIncome !== undefined) payload.client_annual_ret_reqd = reqIncome;
  if (hhMonthly !== undefined) payload.household_monthly = hhMonthly;
  if (clientEpfAnnual !== undefined) payload.client_epf_annual = clientEpfAnnual;
  if (clientEpfAccum !== undefined) payload.client_epf_accum = clientEpfAccum;

  // OpenAPI standard parameters for NPS & Superannuation (SA) — strictly without frontend defaults
  if (npsEmp !== undefined) {
    payload.employer_nps_pm = npsEmp;
    payload.nps_employer_share = npsEmp;
  }
  if (npsSelf !== undefined) {
    payload.self_nps_pm = npsSelf;
    payload.nps_employee_share = npsSelf;
  }
  if (npsAccum !== undefined) {
    payload.current_nps_accum = npsAccum;
    payload.nps_total_corpus = npsAccum;
    payload.nps_corpus = npsAccum;
    payload.npsTotalCorpus = npsAccum;
    payload.npsCorpus = npsAccum;
  }

  if (saEmp !== undefined) {
    payload.sa_pm = saEmp;
    payload.super_employer_share = saEmp;
    payload.sa_employer_share = saEmp;
  }
  if (saAccum !== undefined) {
    payload.current_sa_accum = saAccum;
    payload.super_total_corpus = saAccum;
    payload.super_corpus = saAccum;
    payload.superTotalCorpus = saAccum;
    payload.superCorpus = saAccum;
    payload.sa_total_corpus = saAccum;
    payload.sa_corpus = saAccum;
    payload.saTotalCorpus = saAccum;
    payload.saCorpus = saAccum;
  }

  if (epfAccum !== undefined) {
    payload.epf_total_corpus = epfAccum;
    payload.epf_corpus = epfAccum;
    payload.epfTotalCorpus = epfAccum;
    payload.epfCorpus = epfAccum;
  }
  if (epfEmp !== undefined) payload.epf_employer_share = epfEmp;
  if (epfSelf !== undefined) payload.epf_employee_share = epfSelf;

  return payload;
};

/**
 * Helper to infer the real child name from childrenData if child_name is missing or generic ("Child 1", "Child 2").
 */
export const getActualChildName = (goal = {}, childrenData = [], allGoals = []) => {
  if (!goal) return '';
  let name = (goal.child_name || goal.childName || '').trim();

  // If raw title or goal_name starts with a name + "'s", e.g. "Aarav's Higher Studies"
  const rawTitle = (goal.goal_name || goal.goal_type || goal.title || goal.goal || goal.name || '').trim();
  const titleNameMatch = rawTitle.match(/^([A-Za-z0-9\s]+)'s\s+/i);
  if (titleNameMatch && titleNameMatch[1] && !/^child\s*\d+$/i.test(titleNameMatch[1].trim())) {
    name = titleNameMatch[1].trim();
  }

  // If generic ("Child 1", "Child 2") or empty, look up in childrenData by child_id, child_number, child_index
  if ((!name || /^child\s*\d+('s)?$/i.test(name)) && Array.isArray(childrenData) && childrenData.length > 0) {
    let childIdx = -1;
    if (goal.child_id) {
      childIdx = childrenData.findIndex(c => c && String(c.id || c._id) === String(goal.child_id));
    }
    if (childIdx < 0 && goal.child_number !== undefined && goal.child_number !== null) {
      childIdx = parseInt(goal.child_number, 10) - 1;
    } else if (childIdx < 0 && goal.child_index !== undefined && goal.child_index !== null) {
      childIdx = parseInt(goal.child_index, 10);
    } else if (childIdx < 0) {
      const goalStr = `${goal.goal || ''} ${goal.goal_type || ''} ${goal.name || ''} ${goal.title || ''} ${goal.goal_name || ''}`;
      const match = goalStr.match(/child\s*(\d+)/i);
      if (match && match[1]) {
        childIdx = parseInt(match[1], 10) - 1;
      }
    }

    // If still no index found and we have allGoals list, find which child_goal index this goal is in allGoals
    if (childIdx < 0 && Array.isArray(allGoals) && (goal.category === 'child_goal' || goal.category === 'child')) {
      const childGoalsOnly = allGoals.filter(g => g && (g.category === 'child_goal' || g.category === 'child'));
      const foundPos = childGoalsOnly.indexOf(goal);
      if (foundPos >= 0) {
        childIdx = Math.min(foundPos, childrenData.length - 1);
      }
    }

    if (childIdx >= 0 && childrenData[childIdx]) {
      const foundChild = childrenData[childIdx];
      const realName = (foundChild.name || foundChild.child_name || foundChild.childName || '').trim();
      if (realName && !/^child\s*\d+('s)?$/i.test(realName)) {
        name = realName;
      }
    }
  }

  // Fallback for child goals when child index is specified or single child
  if ((!name || /^child\s*\d+('s)?$/i.test(name)) && (goal.category === 'child_goal' || goal.child_id || goal.child_number !== undefined || goal.child_index !== undefined) && Array.isArray(childrenData) && childrenData.length > 0) {
    let targetIdx = 0;
    if (goal.child_number) targetIdx = parseInt(goal.child_number, 10) - 1;
    else if (goal.child_index !== undefined) targetIdx = parseInt(goal.child_index, 10);

    const fallbackChild = childrenData[targetIdx] || childrenData[0];
    if (fallbackChild) {
      const realName = (fallbackChild.name || fallbackChild.child_name || fallbackChild.childName || '').trim();
      if (realName && !/^child\s*\d+('s)?$/i.test(realName)) {
        name = realName;
      }
    }
  }

  // If still generic or empty, assign a fallback name like "Child 1" / "Child 2" for child goals
  if (!name || /^child\s*\d+('s)?$/i.test(name)) {
    if (goal.child_number) {
      name = `Child ${goal.child_number}`;
    } else if (goal.child_index !== undefined) {
      name = `Child ${parseInt(goal.child_index, 10) + 1}`;
    } else if (name) {
      // keep existing generic "Child 1", etc.
    } else if (goal.category === 'child_goal') {
      name = 'Child 1';
    } else {
      return '';
    }
  }
  return name.replace(/'s$/i, '');
};

/**
 * Format goal title uniformly across Roadmap, Goal Cards, and Report tables.
 * Replaces "Graduation", "Higher Education", "Education" with "Higher Studies".
 * Prefixes child-related goals with child's name (e.g. "Aarav's Higher Studies", "Priya's Marriage").
 */
export const formatGoalTitle = (goal = {}, childrenData = [], allGoals = []) => {
  if (!goal) return 'Financial Goal';
  if (typeof goal === 'string') {
    let formatted = goal.trim();
    if (
      /^graduation(\s*fund)?$/i.test(formatted) ||
      /^higher\s*education$/i.test(formatted) ||
      /^education$/i.test(formatted) ||
      /^child\s*education$/i.test(formatted) ||
      /^higher\s*studies$/i.test(formatted)
    ) {
      return 'Higher Studies';
    }
    return formatted
      .replace(/\bgraduation\b/gi, 'Higher Studies')
      .replace(/\bhigher education\b/gi, 'Higher Studies');
  }

  const rawTitle = (goal.goal_name || goal.goal_type || goal.goal || goal.title || goal.name || 'Financial Goal').trim();
  const childName = getActualChildName(goal, childrenData, allGoals);

  let specificType = rawTitle;
  if (childName && rawTitle.toLowerCase().startsWith(`${childName.toLowerCase()}'s`)) {
    specificType = rawTitle.slice(`${childName.toLowerCase()}'s`.length).trim();
  } else {
    specificType = rawTitle
      .replace(/^child\s*\d+('s)?\s*/i, '')
      .replace(/^child\s*/i, '')
      .replace(/\s*goal$/i, '')
      .trim();
  }

  // Standardize Graduation / Education variants to "Higher Studies"
  if (
    /^graduation(\s*fund)?$/i.test(specificType) ||
    /^higher\s*education$/i.test(specificType) ||
    /^education$/i.test(specificType) ||
    /^child\s*education$/i.test(specificType) ||
    /^higher\s*studies$/i.test(specificType)
  ) {
    specificType = 'Higher Studies';
  }

  if (childName && (specificType.toLowerCase() === childName.toLowerCase() || specificType.toLowerCase().includes(childName.toLowerCase()))) {
    specificType = 'Other Goal';
  } else if (!specificType || specificType.toLowerCase() === 'other') {
    specificType = 'Other Goal';
  }

  if (childName) {
    if (specificType === 'Other Goal') {
      return `${childName}'s Other Goal`;
    }
    return `${childName}'s ${specificType}`;
  }

  return specificType === 'Other Goal' ? (rawTitle.toLowerCase().includes('other') ? 'Other Goal' : rawTitle) : specificType;
};

/**
 * Removes salutations such as Mr., Ms., Mrs., Miss, Dr., Prof., Shri, Smt, Master from a name string.
 * @param {string} name 
 * @returns {string}
 */
export const stripSalutation = (name = '') => {
  if (!name || typeof name !== 'string') return '';
  const cleaned = name.replace(/^(mrs|miss|master|prof|shri|smt|mr|ms|dr)\.?\s*/i, '').trim();
  return cleaned || name;
};



