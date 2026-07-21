import React, { createContext, useState, useEffect } from "react";
import * as assessmentService from "../api/assessmentService";
import * as reportService from "../api/reportService";
import { buildCalcPayload } from "../utils/formatters";

export const AssessmentContext = createContext(null);

const initialFormData = {
  mobile: "",
  email: "",
  spouseMobile: "",
  spouseEmail: "",
  address: "",
  consent: false,
  name: "",
  occupation: "",
  designation: "",
  companyName: "",
  dob: "",
  monthlyExpense: "",
  spouseName: "",
  spouseOccupation: "",
  spouseDesignation: "",
  spouseCompanyName: "",
  spouseDob: "",
  targetRetireAge: "",
  yearsUntilRetirement: "",
  requiredAnnualIncome: "",
  epfEmployerShare: "",
  epfEmployeeShare: "",
  epfTotalCorpus: "",
  npsEmployerShare: "",
  npsEmployeeShare: "",
  npsTotalCorpus: "",
  superEmployerShare: "",
  superTotalCorpus: "",
};

const initialChildren = [
  { name: "", occupation: "", dependent: "Yes", dob: "", age: "", goalType: "", targetYear: "", todaysCost: "", goals: [{ id: "g-init-1", goalType: "", targetYear: "", todaysCost: "" }] },
  { name: "", occupation: "", dependent: "Yes", dob: "", age: "", goalType: "", targetYear: "", todaysCost: "", goals: [{ id: "g-init-2", goalType: "", targetYear: "", todaysCost: "" }] },
  { name: "", occupation: "", dependent: "Yes", dob: "", age: "", goalType: "", targetYear: "", todaysCost: "", goals: [{ id: "g-init-3", goalType: "", targetYear: "", todaysCost: "" }] },
  { name: "", occupation: "", dependent: "Yes", dob: "", age: "", goalType: "", targetYear: "", todaysCost: "", goals: [{ id: "g-init-4", goalType: "", targetYear: "", todaysCost: "" }] },
];

const initialGoals = [];

// --- sessionStorage helpers ---
const SS_KEY = "ww_assessment_state";

function loadFromSession() {
  try {
    const raw = sessionStorage.getItem(SS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveToSession(patch) {
  try {
    const existing = loadFromSession() || {};
    sessionStorage.setItem(SS_KEY, JSON.stringify({ ...existing, ...patch }));
  } catch { /* ignore quota errors */ }
}
// --------------------------------

export default function AssessmentProvider({ children }) {
  const [step, setStepState] = useState(() => {
    const urlStep = parseInt(new URLSearchParams(window.location.search).get("step")) || 1;
    return urlStep >= 1 && urlStep <= 5 ? urlStep : 1;
  });

  // Use pushState so each step creates a browser history entry,
  // meaning the browser back button navigates between steps.
  // sessionStorage persistence (below) ensures formData survives any remount.
  const setStep = (n) => {
    setStepState(n);
    const url = new URL(window.location);
    url.searchParams.set("step", n);
    window.history.pushState({ step: n }, "", url);
  };

  // Restore all persisted state from sessionStorage on mount
  const _session = loadFromSession();

  const [assessmentId, setAssessmentId] = useState(() => _session?.assessmentId || localStorage.getItem("ww_assessment_id") || null);
  const [formData, setFormData] = useState(() => _session?.formData ? { ...initialFormData, ..._session.formData } : initialFormData);
  const [childrenCount, setChildrenCountState] = useState(() => _session?.childrenCount ?? 2);
  const [childrenData, setChildrenData] = useState(() => _session?.childrenData || initialChildren);
  const [activeGoals, setActiveGoals] = useState(() => _session?.activeGoals || initialGoals);
  const [calculationResult, setCalculationResult] = useState(() => _session?.calculationResult || null);
  const [reportId, setReportId] = useState(() => _session?.reportId || null);
  const [reportMessage, setReportMessage] = useState(() => _session?.reportMessage || null);
  const [showReport, setShowReport] = useState(() => _session?.showReport || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Persist critical state to sessionStorage whenever it changes
  useEffect(() => { saveToSession({ assessmentId }); }, [assessmentId]);
  useEffect(() => { saveToSession({ formData }); }, [formData]);
  useEffect(() => { saveToSession({ childrenCount }); }, [childrenCount]);
  useEffect(() => { saveToSession({ childrenData }); }, [childrenData]);
  useEffect(() => { saveToSession({ activeGoals }); }, [activeGoals]);
  useEffect(() => { saveToSession({ calculationResult }); }, [calculationResult]);
  useEffect(() => { saveToSession({ reportId }); }, [reportId]);
  useEffect(() => { saveToSession({ reportMessage }); }, [reportMessage]);
  useEffect(() => { saveToSession({ showReport }); }, [showReport]);

  // Block browser back/forward — we manage navigation via replaceState
  useEffect(() => {
    const handlePopState = (e) => {
      // Prevent browser from going to a different route;
      // just re-sync step from URL if it's still on /assessment
      const urlStep = parseInt(new URLSearchParams(window.location.search).get("step")) || 1;
      const validStep = urlStep >= 1 && urlStep <= 5 ? urlStep : 1;
      setStepState(validStep);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);



  const updateFormData = (fields) => {
    setFormData((prev) => {
      const updated = { ...prev, ...fields };

      // Auto calculate years until retirement when targetRetireAge changes
      if (fields.hasOwnProperty("targetRetireAge")) {
        const retireAgeVal = parseInt(fields.targetRetireAge, 10);
        if (updated.dob) {
          const parts = updated.dob.split("/");
          if (parts.length === 3) {
            const birthYear = parseInt(parts[2], 10);
            const currentYear = new Date().getFullYear();
            const currentAge = currentYear - birthYear;
            if (!isNaN(retireAgeVal) && !isNaN(currentAge)) {
              updated.yearsUntilRetirement = String(Math.max(0, retireAgeVal - currentAge));
            }
          }
        }
      }
      return updated;
    });
  };

  const updateChild = (index, fields) => {
    setChildrenData((prev) => {
      const updated = [...prev];
      if (!updated[index]) {
        updated[index] = { name: "", occupation: "", dependent: "Yes", dob: "", age: "", goalType: "", targetYear: "", todaysCost: "", goals: [{ id: Date.now() + Math.random(), goalType: "", targetYear: "", todaysCost: "" }] };
      }
      
      const child = { ...updated[index], ...fields };

      if (!child.goals || !Array.isArray(child.goals)) {
        child.goals = [{ id: Date.now() + Math.random(), goalType: child.goalType || "", targetYear: child.targetYear || "", todaysCost: child.todaysCost || "" }];
      }

      if (fields.hasOwnProperty("goalType") || fields.hasOwnProperty("targetYear") || fields.hasOwnProperty("todaysCost")) {
        const updatedGoals = [...child.goals];
        if (updatedGoals[0]) {
          updatedGoals[0] = {
            ...updatedGoals[0],
            ...(fields.hasOwnProperty("goalType") ? { goalType: fields.goalType } : {}),
            ...(fields.hasOwnProperty("targetYear") ? { targetYear: fields.targetYear } : {}),
            ...(fields.hasOwnProperty("todaysCost") ? { todaysCost: fields.todaysCost } : {}),
          };
          child.goals = updatedGoals;
        }
      }

      if (fields.hasOwnProperty("goals") && fields.goals.length > 0) {
        const firstGoal = fields.goals[0];
        child.goalType = firstGoal.goalType || "";
        child.targetYear = firstGoal.targetYear || "";
        child.todaysCost = firstGoal.todaysCost || "";
      }

      if (fields.hasOwnProperty("dob") && fields.dob) {
        const parts = fields.dob.split("/");
        if (parts.length === 3) {
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          const currentYear = new Date().getFullYear();
          if (!isNaN(day) && !isNaN(month) && !isNaN(year) && year > 1900 && year <= currentYear) {
            const birthDate = new Date(year, month, day);
            const today = new Date();
            let ageVal = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              ageVal--;
            }
            child.age = ageVal >= 0 ? `${ageVal} Years` : "0 Years";
          } else {
            child.age = "";
          }
        } else {
          child.age = "";
        }
      }
      updated[index] = child;
      return updated;
    });
  };

  const setChildrenCount = (n) => {
    setChildrenCountState(n);
  };

  const addGoal = (type) => {
    const newGoal = {
      id: Date.now() + Math.random(),
      type,
      targetYear: "",
      todaysCost: "",
    };
    setActiveGoals((prev) => [...prev, newGoal]);
  };

  const removeGoal = (id) => {
    setActiveGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGoal = (id, fields) => {
    setActiveGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...fields } : g))
    );
  };

  const goToStep = (n) => {
    setStep(n);
    if (n < 5) {
      setShowReport(false);
      setReportId(null);
      setReportMessage(null);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitStep1 = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      let currentId = assessmentId;
      if (!currentId) {
        // Clear any stale session from a previous assessment run
        try { sessionStorage.removeItem(SS_KEY); } catch { /* noop */ }
        await assessmentService.getRates();
        const createRes = await assessmentService.createAssessment();
        currentId = createRes.data.assessment_id;
        setAssessmentId(currentId);
        localStorage.setItem("ww_assessment_id", currentId);
      }
      const payload = {
        mobile: formData.mobile,
        email: formData.email,
        consent: formData.consent,
      };
      if (formData.spouseMobile && formData.spouseMobile.trim()) {
        payload.spouse_mobile = formData.spouseMobile;
      }
      if (formData.spouseEmail && formData.spouseEmail.trim()) {
        payload.spouse_email = formData.spouseEmail;
      }
      if (formData.address && formData.address.trim()) {
        payload.residential_address = formData.address;
      }
      await assessmentService.submitFlow1(currentId, payload);
      nextStep();
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to save step 1 details. Please review your settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep2 = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const payload = {
        client_name: formData.name,
        client_occupation: formData.occupation,
        client_designation: formData.designation,
        client_company: formData.companyName,
        client_dob: formData.dob,
        client_retirement_age: parseInt(formData.targetRetireAge) || 60,
        spouse_retirement_age: 0,
      };
      if (formData.spouseName && formData.spouseName.trim()) {
        payload.spouse_name = formData.spouseName;
      }
      if (formData.spouseOccupation && formData.spouseOccupation.trim()) {
        payload.spouse_occupation = formData.spouseOccupation;
      }
      if (formData.spouseDesignation && formData.spouseDesignation.trim()) {
        payload.spouse_designation = formData.spouseDesignation;
      }
      if (formData.spouseCompanyName && formData.spouseCompanyName.trim()) {
        payload.spouse_company = formData.spouseCompanyName;
      }
      if (formData.spouseDob && formData.spouseDob.trim()) {
        payload.spouse_dob = formData.spouseDob;
      }
      await assessmentService.submitFlow2(assessmentId, payload);
      console.log("%c ✅ [STEP 2 DONE] monthlyExpense in formData =", "background:#1a1a1a;color:#ED8B36;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;", formData.monthlyExpense, "| Full formData snapshot:", JSON.parse(JSON.stringify(formData)));
      nextStep();
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to save step 2 details. Please review your settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep3 = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const activeChildren = childrenData.slice(0, childrenCount).map((c, idx) => {
        const childObj = {
          child_number: idx + 1,
          child_name: c.name,
          financially_dependent: c.dependent === "Yes",
        };
        if (c.occupation && c.occupation.trim()) {
          childObj.occupation = c.occupation;
        }
        if (c.dob && c.dob.trim()) {
          childObj.date_of_birth = c.dob;
        }
        return childObj;
      });
      const res = await assessmentService.submitFlow3(assessmentId, {
        number_of_children: childrenCount,
        children: activeChildren,
      });

      if (res && res.data && res.data.children) {
        setChildrenData((prev) => {
          const updated = [...prev];
          res.data.children.forEach((savedChild) => {
            const idx = savedChild.child_number - 1;
            if (updated[idx]) {
              updated[idx].id = savedChild.id;
            }
          });
          return updated;
        });
      }

      nextStep();
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to save step 3 details. Please review your settings.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const submitStep4 = async () => {
    setApiError(null);
    setIsSubmitting(true);
    try {
      const apiGoals = [];

      // Child education goals
      childrenData.slice(0, childrenCount).forEach((c) => {
        if (!c) return;
        
        const goalsToSubmit = c.goals && Array.isArray(c.goals) ? c.goals : [
          { goalType: c.goalType, targetYear: c.targetYear, todaysCost: c.todaysCost }
        ];

        goalsToSubmit.forEach((g) => {
          if (g.goalType && g.targetYear && g.todaysCost) {
            const mappedType =
              g.goalType === "Higher Education"
                ? "Graduation"
                : g.goalType === "Marriage"
                ? "Marriage"
                : "Other";
            const goalObj = {
              category: "child_goal",
              goal_type: mappedType,
              target_year: parseInt(g.targetYear),
              today_cost: parseFloat(g.todaysCost),
              inflation_rate: 0.06,
            };
            if (c.id) {
              goalObj.child_id = c.id;
            }
            apiGoals.push(goalObj);
          }
        });
      });

      // Lifestyle goals
      activeGoals.forEach((g) => {
        if (g.type && g.targetYear && g.todaysCost) {
          let mappedType = g.type;
          if (mappedType === "Estate for Children") {
            mappedType = "Estate For Children";
          } else if (mappedType === "Others" || mappedType === "Other") {
            mappedType = "Other";
          }
          apiGoals.push({
            category: "lifestyle",
            goal_type: mappedType,
            target_year: parseInt(g.targetYear),
            today_cost: parseFloat(g.todaysCost),
            inflation_rate: 0.06,
          });
        }
      });

      // Submit goals (even if empty, as requested)
      await assessmentService.submitFlow4(assessmentId, {
        goals: apiGoals,
      });
      nextStep();
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to save step 4 details. Please review your settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitStep5 = async () => {
    setApiError(null);
    setIsCalculating(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Use "0" for any empty numeric fields instead of hardcoded defaults
    let finalFormData = { ...formData };
    const isRetEmpty = !formData.targetRetireAge && !formData.yearsUntilRetirement && !formData.requiredAnnualIncome &&
                       !formData.epfEmployerShare && !formData.epfEmployeeShare && !formData.epfTotalCorpus &&
                       !formData.npsEmployerShare && !formData.npsEmployeeShare && !formData.npsTotalCorpus &&
                       !formData.superEmployerShare && !formData.superTotalCorpus;

    if (!isRetEmpty) {
      const numericFields = [
        'targetRetireAge', 'yearsUntilRetirement', 'requiredAnnualIncome',
        'epfEmployerShare', 'epfEmployeeShare', 'epfTotalCorpus',
        'npsEmployerShare', 'npsEmployeeShare', 'npsTotalCorpus',
        'superEmployerShare', 'superTotalCorpus',
      ];
      numericFields.forEach((field) => {
        if (!finalFormData[field] || !finalFormData[field].toString().trim()) {
          finalFormData[field] = "0";
        }
      });
      setFormData(finalFormData);
    }

    try {
      // 1. Submit Flow 2 again with final retirement age (just in case target retirement age changed in step 5)
      const flow2Payload = {
        client_name: finalFormData.name,
        client_occupation: finalFormData.occupation,
        client_designation: finalFormData.designation,
        client_company: finalFormData.companyName,
        client_dob: finalFormData.dob,
        client_retirement_age: finalFormData.targetRetireAge ? (parseInt(finalFormData.targetRetireAge) || 60) : 60,
        spouse_retirement_age: 0,
      };
      if (finalFormData.spouseName && finalFormData.spouseName.trim()) {
        flow2Payload.spouse_name = finalFormData.spouseName;
      }
      if (finalFormData.spouseOccupation && finalFormData.spouseOccupation.trim()) {
        flow2Payload.spouse_occupation = finalFormData.spouseOccupation;
      }
      if (finalFormData.spouseDesignation && finalFormData.spouseDesignation.trim()) {
        flow2Payload.spouse_designation = finalFormData.spouseDesignation;
      }
      if (finalFormData.spouseCompanyName && finalFormData.spouseCompanyName.trim()) {
        flow2Payload.spouse_company = finalFormData.spouseCompanyName;
      }
      if (finalFormData.spouseDob && finalFormData.spouseDob.trim()) {
        flow2Payload.spouse_dob = finalFormData.spouseDob;
      }
      await assessmentService.submitFlow2(assessmentId, flow2Payload);

      // 2. Perform calculation payload building & API call
      const calcPayload = buildCalcPayload(finalFormData);
      console.log("%c 🧮 [STEP 5 CALC PAYLOAD]", "background:#1a1a1a;color:#4ade80;font-size:14px;font-weight:bold;padding:4px 8px;border-radius:4px;", {
        household_monthly: calcPayload.household_monthly,
        client_annual_ret_reqd: calcPayload.client_annual_ret_reqd,
        client_epf_annual: calcPayload.client_epf_annual,
        fullPayload: calcPayload,
        monthlyExpense_fromFormData: finalFormData.monthlyExpense,
        requiredAnnualIncome_fromFormData: finalFormData.requiredAnnualIncome,
      });
      const calcRes = await assessmentService.calculateRetirement(assessmentId, calcPayload);
      setCalculationResult(calcRes.data);
      setShowReport(true);
      setIsCalculating(false);

      // 3. Generate PDF Report in background with polling
      setReportMessage("Generating report...");
      try {
        console.log("[submitStep5] Triggering reportService.generateReport for assessmentId:", assessmentId);
        const reportRes = await reportService.generateReport(assessmentId);
        console.log("[submitStep5] generateReport response:", reportRes);
        const reportData = reportRes?.data || reportRes;
        console.log("[submitStep5] reportData:", reportData);

        if (reportData && (reportData.report_id || reportData.data?.report_id)) {
          const finalReportId = reportData.report_id || reportData.data?.report_id;
          console.log("[submitStep5] Report generated synchronously. Setting reportId directly to:", finalReportId);
          setReportId(finalReportId);
          const deliveryMode = reportData.delivery_mode || reportData.data?.delivery_mode;
          if (deliveryMode === "email") {
            setReportMessage("Report sent to your email");
          } else {
            setReportMessage("Report generated successfully");
          }
        } else if (reportData && (reportData.job_id || reportData.data?.job_id)) {
          const jobId = reportData.job_id || reportData.data?.job_id;
          console.log("[submitStep5] Polling job ID:", jobId);

          // Poll asynchronously
          (async () => {
            let reportDone = false;
            let checkCount = 0;
            const maxChecks = 45;

            while (!reportDone && checkCount < maxChecks) {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              checkCount++;
              try {
                console.log(`[polling] Check #${checkCount} status for jobId: ${jobId}`);
                const statusRes = await reportService.checkReportStatus(assessmentId, jobId);
                console.log(`[polling] Check #${checkCount} statusRes:`, statusRes);
                const statusData = statusRes?.data || statusRes;

                const currentJobStatus = statusData?.status || statusRes?.status;

                if (currentJobStatus === "completed" || currentJobStatus === "success") {
                  const finalReportId = statusData?.report_id || statusData?.id || statusRes?.report_id || statusRes?.id;
                  console.log(`[polling] Report generation completed! Setting reportId to:`, finalReportId);
                  setReportId(finalReportId);
                  
                  const deliveryMode = statusData?.delivery_mode || statusRes?.delivery_mode;
                  if (deliveryMode === "email") {
                    setReportMessage("Report sent to your email");
                  } else {
                    setReportMessage("Report generated successfully");
                  }
                  reportDone = true;
                } else if (currentJobStatus === "failed") {
                  console.error("[polling] Report generation failed on backend.");
                  setReportMessage("Failed to generate report.");
                  break;
                }
              } catch (pollErr) {
                console.error("[polling] Error in polling check:", pollErr);
              }
            }

            if (!reportDone) {
              console.warn("[polling] Polling finished or timed out without report completion.");
              setReportMessage("Report generation timed out.");
            }
          })();
        } else {
          console.warn("[submitStep5] Missing report_id or job_id in report response:", reportData);
          setReportMessage("Failed to generate report.");
        }
      } catch (reportErr) {
        console.error("Failed to generate PDF:", reportErr);
        setReportMessage("Failed to generate report.");
      }
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Failed to calculate retirement plan. Please review your settings.");
    } finally {
      setIsCalculating(false);
    }
  };

  const downloadReport = async () => {
    if (!assessmentId || !reportId) {
      console.error("[DOWNLOAD ERROR] assessmentId or reportId missing:", { assessmentId, reportId });
      throw new Error("Your report is not ready to download yet.");
    }

    // The download endpoint requires the X-API-Key request header. A native link
    // cannot attach that header, so fetch the authenticated PDF before saving it.
    const reportBlob = await reportService.downloadGeneratedReport(assessmentId, reportId);
    const download = reportService.createReportDownload(reportBlob, assessmentId);
    const link = document.createElement("a");
    link.href = download.url;
    link.download = download.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(download.url), 60_000);
  };

  const contextValue = {
    step,
    assessmentId,
    formData,
    childrenCount,
    childrenData,
    activeGoals,
    calculationResult,
    reportId,
    reportMessage,
    showReport,
    isSubmitting,
    isCalculating,
    apiError,
    updateFormData,
    updateChild,
    setChildrenCount,
    addGoal,
    removeGoal,
    updateGoal,
    goToStep,
    nextStep,
    prevStep,
    setApiError,
    submitStep1,
    submitStep2,
    submitStep3,
    submitStep4,
    submitStep5,
    downloadReport,
  };

  return (
    <AssessmentContext.Provider value={contextValue}>
      {children}
    </AssessmentContext.Provider>
  );
}
