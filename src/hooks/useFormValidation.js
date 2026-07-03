export const isValidDateStr = (dateStr) => {
  if (!dateStr) return false;
  const parts = dateStr.split('/');
  if (parts.length !== 3) return false;
  const d = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const y = parseInt(parts[2], 10);
  if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
  
  const date = new Date(y, m, d);
  if (date.getFullYear() !== y || date.getMonth() !== m || date.getDate() !== d) {
    return false;
  }
  return true;
};

export const validateStep1Fields = (formData) => {
  const errors = {};
  if (!formData.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(formData.mobile.trim())) {
    errors.mobile = "Mobile number must be exactly 10 digits";
  }

  if (!formData.email?.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.address?.trim()) {
    errors.address = "Residential address is required";
  }

  if (formData.spouseMobile?.trim()) {
    if (!/^\d{10}$/.test(formData.spouseMobile.trim())) {
      errors.spouseMobile = "Spouse mobile number must be exactly 10 digits";
    }
  }

  if (formData.spouseEmail?.trim()) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.spouseEmail.trim())) {
      errors.spouseEmail = "Please enter a valid spouse email address";
    }
  }

  if (!formData.consent) {
    errors.consent = "Consent is required to proceed";
  }

  return errors;
};

export const validateStep2Fields = (formData) => {
  const errors = {};
  if (!formData.name?.trim()) errors.name = "Full name is required";
  if (!formData.occupation?.trim()) errors.occupation = "Occupation is required";
  if (!formData.designation?.trim()) errors.designation = "Designation is required";
  if (!formData.companyName?.trim()) errors.companyName = "Company name is required";
  
  if (!formData.dob?.trim()) {
    errors.dob = "Date of birth is required";
  } else if (!isValidDateStr(formData.dob)) {
    errors.dob = "Please enter a valid date of birth (DD/MM/YYYY)";
  } else {
    const parts = formData.dob.split('/');
    const y = parseInt(parts[2], 10);
    const currentYear = new Date().getFullYear();
    if (y < 1920 || y > currentYear) {
      errors.dob = `Year must be between 1920 and ${currentYear}`;
    }
  }

  if (!formData.monthlyExpense?.toString().trim()) {
    errors.monthlyExpense = "Monthly expense is required";
  } else {
    const val = parseFloat(formData.monthlyExpense);
    if (isNaN(val) || val <= 0) {
      errors.monthlyExpense = "Monthly expense must be a positive number";
    }
  }

  if (formData.spouseDob?.trim()) {
    if (!isValidDateStr(formData.spouseDob)) {
      errors.spouseDob = "Please enter a valid spouse date of birth (DD/MM/YYYY)";
    } else {
      const parts = formData.spouseDob.split('/');
      const y = parseInt(parts[2], 10);
      const currentYear = new Date().getFullYear();
      if (y < 1920 || y > currentYear) {
        errors.spouseDob = `Year must be between 1920 and ${currentYear}`;
      }
    }
  }

  return errors;
};

export const validateStep3Fields = (childrenData, childrenCount) => {
  const errors = {};
  if (childrenCount === 0) return errors;

  for (let i = 0; i < childrenCount; i++) {
    const child = childrenData[i];
    if (!child) continue;

    const childErrors = {};
    if (!child.name?.trim()) childErrors.name = "Child full name is required";
    
    if (!child.dob?.trim()) {
      childErrors.dob = "Date of birth is required";
    } else if (!isValidDateStr(child.dob)) {
      childErrors.dob = "Valid date (DD/MM/YYYY) is required";
    } else {
      const parts = child.dob.split('/');
      const y = parseInt(parts[2], 10);
      const currentYear = new Date().getFullYear();
      if (y < 1970 || y > currentYear) {
        childErrors.dob = `Year must be between 1970 and ${currentYear}`;
      }
    }

    if (!child.goalType?.trim()) {
      childErrors.goalType = "Goal type is required";
    }

    if (!child.targetYear?.toString().trim()) {
      childErrors.targetYear = "Target year is required";
    } else {
      const year = parseInt(child.targetYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < currentYear || year > currentYear + 60) {
        childErrors.targetYear = `Year must be between ${currentYear} and ${currentYear + 60}`;
      }
    }

    if (!child.todaysCost?.toString().trim()) {
      childErrors.todaysCost = "Today's cost is required";
    } else {
      const val = parseFloat(child.todaysCost);
      if (isNaN(val) || val <= 0) {
        childErrors.todaysCost = "Cost must be a positive number";
      }
    }

    if (Object.keys(childErrors).length > 0) {
      errors[i] = childErrors;
    }
  }

  return errors;
};

export const validateStep4Fields = (activeGoals) => {
  const errors = {};
  activeGoals.forEach((goal) => {
    const goalErrors = {};
    
    if (!goal.targetYear?.toString().trim()) {
      goalErrors.targetYear = "Target year is required";
    } else {
      const year = parseInt(goal.targetYear, 10);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < currentYear || year > currentYear + 60) {
        goalErrors.targetYear = `Year must be between ${currentYear} and ${currentYear + 60}`;
      }
    }

    if (!goal.todaysCost?.toString().trim()) {
      goalErrors.todaysCost = "Cost is required";
    } else {
      const val = parseFloat(goal.todaysCost);
      if (isNaN(val) || val <= 0) {
        goalErrors.todaysCost = "Cost must be a positive number";
      }
    }

    if (Object.keys(goalErrors).length > 0) {
      errors[goal.id] = goalErrors;
    }
  });
  return errors;
};

export const validateStep5Fields = (formData) => {
  const errors = {};
  
  if (formData.targetRetireAge !== undefined && formData.targetRetireAge !== null && formData.targetRetireAge.toString().trim() !== "") {
    const age = parseInt(formData.targetRetireAge, 10);
    if (isNaN(age) || age < 18 || age > 100) {
      errors.targetRetireAge = "Age must be between 18 and 100";
    }
  }

  if (formData.yearsUntilRetirement !== undefined && formData.yearsUntilRetirement !== null && formData.yearsUntilRetirement.toString().trim() !== "") {
    const yrs = parseInt(formData.yearsUntilRetirement, 10);
    if (isNaN(yrs) || yrs < 0 || yrs > 80) {
      errors.yearsUntilRetirement = "Years must be between 0 and 80";
    }
  }

  if (formData.requiredAnnualIncome !== undefined && formData.requiredAnnualIncome !== null && formData.requiredAnnualIncome.toString().trim() !== "") {
    const inc = parseFloat(formData.requiredAnnualIncome);
    if (isNaN(inc) || inc <= 0) {
      errors.requiredAnnualIncome = "Required income must be positive";
    }
  }

  // Helper for non-negative numbers
  const validateNonNegative = (val, fieldName) => {
    if (val !== undefined && val !== null && val.toString().trim() !== "") {
      const num = parseFloat(val);
      if (isNaN(num) || num < 0) {
        errors[fieldName] = "Must be a non-negative number";
      }
    }
  };

  validateNonNegative(formData.epfEmployerShare, "epfEmployerShare");
  validateNonNegative(formData.epfEmployeeShare, "epfEmployeeShare");
  validateNonNegative(formData.epfTotalCorpus, "epfTotalCorpus");
  validateNonNegative(formData.npsEmployerShare, "npsEmployerShare");
  validateNonNegative(formData.npsEmployeeShare, "npsEmployeeShare");
  validateNonNegative(formData.npsTotalCorpus, "npsTotalCorpus");
  validateNonNegative(formData.superEmployerShare, "superEmployerShare");
  validateNonNegative(formData.superTotalCorpus, "superTotalCorpus");

  return errors;
};

// Legacy compatibility exports (returning boolean)
export const validateStep1 = (formData) => {
  return Object.keys(validateStep1Fields(formData)).length === 0;
};

export const validateStep2 = (formData) => {
  return Object.keys(validateStep2Fields(formData)).length === 0;
};

export const validateStep3 = (childrenData, childrenCount) => {
  return Object.keys(validateStep3Fields(childrenData, childrenCount)).length === 0;
};

export const validateStep4 = (activeGoals) => {
  return Object.keys(validateStep4Fields(activeGoals)).length === 0;
};
