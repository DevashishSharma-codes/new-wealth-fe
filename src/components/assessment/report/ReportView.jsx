import React, { useEffect, useRef, useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { calculateCorpus } from '../../../utils/formatters';
import { MetricCards } from './MetricCards';
import { RetirementTable } from './RetirementTable';
import { GoalsTable } from './GoalsTable';
import { InsuranceTable } from './InsuranceTable';
import { FullReportTemplate } from './FullReportTemplate';
import { generateFullFrontendPdf, triggerBlobDownload } from '../../../utils/frontendPdfGenerator';
import { uploadReportPdf } from '../../../api/reportService';
import client from '../../../config/api';

export function ReportView() {
  const {
    calculationResult,
    services,
    testimonials,
    reportId,
    reportMessage,
    formData,
    reportData,
    activeGoals,
    childrenCount,
    childrenData,
    assessmentId,
    pdfBlob,
    setPdfBlob,
    isUploaded,
    setIsUploaded,
    downloadReport
  } = useAssessment();

  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showRoadmapPreview, setShowRoadmapPreview] = useState(false);
  const roadmapRef = useRef(null);
  const downloadLockedUntilRef = useRef(0);

  const [isAutoPreparingPdf, setIsAutoPreparingPdf] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  const fullReportRef = useRef(null);
  const autoPreparedRef = useRef(false);

  useEffect(() => {
    if (!isGeneratingPdf && !(isAutoPreparingPdf && !pdfBlob)) return;
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 4 ? '' : prev + '.'));
    }, 350);
    return () => clearInterval(interval);
  }, [isGeneratingPdf, isAutoPreparingPdf, pdfBlob]);

  const pdfBlobRef = useRef(pdfBlob);
  useEffect(() => {
    pdfBlobRef.current = pdfBlob;
  }, [pdfBlob]);

  useEffect(() => {
    if (!calculationResult || autoPreparedRef.current) return;

    let checkAttempts = 0;
    const prepareAndUploadPdf = async () => {
      if (!fullReportRef.current) {
        if (checkAttempts < 40) {
          checkAttempts++;
          setTimeout(prepareAndUploadPdf, 100);
        } else {
          console.warn("[ReportView] fullReportRef container not found after 4 seconds.");
        }
        return;
      }

      autoPreparedRef.current = true;
      setIsAutoPreparingPdf(true);

      try {
        console.log("[ReportView] Auto pre-generating PDF blob on frontend after Step 5 completion...");
        const filename = `wealth-wisdom-report-${assessmentId ? assessmentId.substring(0, 8) : 'assessment'}.pdf`;
        
        // 1. Pre-generate PDF blob in memory
        const blob = await generateFullFrontendPdf(fullReportRef.current, filename, false);
        setPdfBlob(blob);
        pdfBlobRef.current = blob;
        console.log("[ReportView] Frontend pre-generated PDF ready! Size:", blob.size);

        // 2. Upload PDF blob directly to backend POST /api/v1/report/{assessment_id}/upload
        if (assessmentId) {
          console.log("[ReportView] Uploading generated PDF to backend POST /report/" + assessmentId + "/upload...");
          const uploadRes = await uploadReportPdf(assessmentId, blob, filename);
          setIsUploaded(true);
          console.log("[ReportView] PDF successfully uploaded to backend and dispatched via email!", uploadRes);
        }
      } catch (err) {
        console.error("[ReportView] Auto PDF background preparation/upload failed:", err);
      } finally {
        setIsAutoPreparingPdf(false);
      }
    };

    const timer = setTimeout(prepareAndUploadPdf, 200);
    return () => clearTimeout(timer);
  }, [calculationResult, assessmentId]);

  const handleOpenContactModal = () => {
    setContactName(formData?.name || '');
    setContactEmail(formData?.email || '');
    setContactMobile(formData?.mobile || '');
    setContactMessage('');
    setSubmitSuccess(false);
    setSubmitError('');
    setIsContactModalOpen(true);
  };

  const handleDownloadClick = async () => {
    const filename = `wealth-wisdom-report-${assessmentId ? assessmentId.substring(0, 8) : 'download'}.pdf`;

    const activeBlob = pdfBlob || pdfBlobRef.current;
    if (activeBlob) {
      console.log("[ReportView] Instant 0-delay download triggered from pre-generated PDF blob.");
      triggerBlobDownload(activeBlob, filename);
      return;
    }

    // If pre-generation is still running, wait for it, else generate on demand
    setIsGeneratingPdf(true);
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (pdfBlobRef.current) {
        clearInterval(interval);
        setIsGeneratingPdf(false);
        console.log("[ReportView] Background PDF ready! Triggering instant download.");
        triggerBlobDownload(pdfBlobRef.current, filename);
      } else if (attempts > 35) {
        clearInterval(interval);
        console.log("[ReportView] Background PDF wait timeout, generating on demand...");
        generateFullFrontendPdf(fullReportRef.current, filename, false)
          .then((blob) => {
            setPdfBlob(blob);
            pdfBlobRef.current = blob;
            triggerBlobDownload(blob, filename);
          })
          .catch((err) => alert("Download failed: " + err.message))
          .finally(() => setIsGeneratingPdf(false));
      }
    }, 100);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await client.post('/contact/get-in-touch', {
        name: contactName,
        mobile: contactMobile,
        email: contactEmail,
        message: contactMessage
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError(err.response?.data?.message || err.message || "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    sessionStorage.removeItem("ww_assessment_state");
    localStorage.removeItem("ww_assessment_id");
    window.location.href = "/";
  };

  if (!calculationResult) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-[#ED8B36] animate-spin" />
        <p className="text-sm text-slate-400">Loading calculation results...</p>
      </div>
    );
  }

  const getMoneyDisplay = (money) => {
    if (!money) return "₹0";
    if (typeof money === 'number') return `₹${Math.round(money).toLocaleString('en-IN')}`;
    if (typeof money === 'object') {
      if (money.raw !== undefined && typeof money.raw === 'number') {
        return `₹${Math.round(money.raw).toLocaleString('en-IN')}`;
      }
      let str = money.inr || money.formatted || money.display || "₹0";
      return formatInrFullString(str);
    }
    return formatInrFullString(String(money));
  };

  const formatInrFullString = (str) => {
    if (!str) return "₹0";
    let cleaned = String(str).trim().replace(/^₹\s+/, '₹');
    if (cleaned.includes('Cr')) {
      const num = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) return `₹${Math.round(num * 10000000).toLocaleString('en-IN')}`;
    }
    if (cleaned.includes('Lakh') || cleaned.match(/\bL\b/i)) {
      const num = parseFloat(cleaned.replace(/[^0-9.]/g, ''));
      if (!isNaN(num)) return `₹${Math.round(num * 100000).toLocaleString('en-IN')}`;
    }
    return cleaned;
  };

  const invSummary = calculationResult?.investment_summary || 
                     calculationResult?.data?.investment_summary || 
                     calculationResult?.calculation?.investment_summary ||
                     reportData?.investment_summary ||
                     reportData?.data?.investment_summary;

  const displayInsurance = getMoneyDisplay(
    calculationResult.summary?.average_insurance_required || calculationResult.insurance?.total_required || reportData?.insurance?.total_required
  );

  const displayCorpus = getMoneyDisplay(
    calculationResult.summary?.total_retirement_corpus_required || calculationResult.client?.corpus || reportData?.summary?.total_retirement_corpus_required
  );

  const displayMonthly = getMoneyDisplay(
    invSummary?.total_monthly_investment ||
    calculationResult.summary?.monthly_investment_required ||
    calculationResult.client?.monthly_sip
  );


  const hasGoals = calculationResult.goals?.items?.length > 0;

  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-4 sm:space-y-5 animate-fade-in px-3 sm:px-4 lg:px-6">


      {/* Thank You Envelope & Title Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FAF7F2] border border-[#EFE9DF] p-4 sm:p-5 rounded-[1.5rem] shadow-xs select-none">
        <div className="flex items-center gap-3 text-center md:text-left flex-col md:flex-row w-full md:w-auto">
          <div className="hidden md:block w-14 h-14 lg:w-16 lg:h-16 shrink-0 select-none pointer-events-none drop-shadow-xs">
            <img
              src="/assets/thank_you_envelope.png"
              alt="3D Envelope Thank You illustration"
              className="w-full h-auto object-contain animate-float"
            />
          </div>
          <div className="space-y-1">
            <h1 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1C1B1A] leading-tight">
              Your Financial Blueprint is Ready!
            </h1>
            <p className="text-[#8E8A80] text-xs sm:text-sm font-light">
              {reportId ? (
                <>
                  Your comprehensive financial assessment report has been sent to your email:{' '}
                  <span className="font-semibold text-[#ED8B36]">{formData.email}</span>. You can also download it directly.
                </>
              ) : (
                <>
                  A detailed PDF report of your assessment is being prepared and will be delivered to your email:{' '}
                  <span className="font-semibold text-[#ED8B36]">{formData.email}</span> within a minute.
                </>
              )}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDownloadClick}
          disabled={isGeneratingPdf}
          className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs flex items-center gap-2 w-full md:w-auto justify-center shrink-0 bg-[#1C1B1A] hover:bg-slate-800 text-white cursor-pointer disabled:opacity-75"
        >
          <svg
            className="w-4 h-4 text-[#ED8B36]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {isGeneratingPdf ? (
            <span className="flex items-center">
              Downloading PDF
              <span className="inline-block w-6 text-left text-[#ED8B36] font-mono font-extrabold text-base ml-0.5">
                {loadingDots}
              </span>
            </span>
          ) : isAutoPreparingPdf && !pdfBlob ? (
            <span className="flex items-center">
              Preparing PDF
              <span className="inline-block w-6 text-left text-[#ED8B36] font-mono font-extrabold text-base ml-0.5">
                {loadingDots}
              </span>
            </span>
          ) : (
            "Download PDF Report"
          )}
        </button>
      </div>

      {/* Assessment Metrics Cards */}
      <MetricCards
        displayInsurance={displayInsurance}
        displayCorpus={displayCorpus}
        displayMonthly={displayMonthly}
      />

      {/* Detailed Financial Blueprint Report */}
      {false && (
        <div className="neu-card-raised rounded-[1.5rem] p-4 sm:p-6 space-y-5 animate-fade-in w-full">
          <div className="border-b border-[#EFE9DF] pb-3">
            <h2 className="font-heading text-lg sm:text-xl font-extrabold text-[#1E2B49] leading-tight">
              Your Personalized Financial Blueprint
            </h2>
            <p className="text-[#8E8A80] text-xs sm:text-sm mt-1">
              A detailed breakdown of your retirement calculations, life protection, and future goals.
            </p>
          </div>

          {/* Retirement Targets — full width, this is the densest block */}
          <RetirementTable
            formData={formData}
            calculationResult={calculationResult}
          />

          {/* Goals + Insurance: side-by-side ONLY when Goals actually has data.
              Otherwise Insurance takes the full width so it never looks
              like it's stuck in a half-empty column. */}
          {hasGoals ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <GoalsTable calculationResult={calculationResult} />
              <InsuranceTable calculationResult={calculationResult} />
            </div>
          ) : (
            <div className="w-full">
              <InsuranceTable calculationResult={calculationResult} />
            </div>
          )}
        </div>
      )}

      {/* Ready to Build Plan Banner */}
      <div className="bg-[#111E6C] rounded-[1.5rem] p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 border border-blue-900/10 shadow-lg text-white w-full">
        <div className="flex-1 space-y-4">
          <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
            Ready to Build Your Complete Financial Plan?
          </h2>
          <p className="text-blue-100/80 text-xs sm:text-[13px] leading-relaxed font-light">
            Your goal-based financial assessment provides a strong starting point, but a personalized financial strategy can help you optimize investments, future wealth, insurance coverage, tax efficiency, estate planning, and long-term milestone achievements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 pt-1">
            {[
              'Personalized Retirement Strategy',
              'Investment Allocation Guidance',
              'Tax-Efficient Wealth Planning',
              'Insurance Gap Analysis',
              'Legacy & Estate Planning'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-white text-xs sm:text-[13px] font-medium select-none">
                <div className="w-5 h-5 rounded-full bg-[#ED8B36] flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(237,139,54,0.3)]">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 lg:flex-initial flex flex-col items-center justify-center gap-4 shrink-0 w-full lg:w-auto">
          <div className="w-full max-w-[200px] select-none pointer-events-none drop-shadow-md">
            <img
              src="/assets/financial_plan_badge.png"
              alt="3D Document & Shield Financial Plan illustration"
              className="w-full h-auto object-contain animate-float"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {reportId && (
              <button
                type="button"
                onClick={handleDownloadClick}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs hover:shadow-md flex items-center gap-2 w-full sm:w-auto justify-center border bg-white hover:bg-slate-50 text-[#1E2B49] border-[#E5E2DA] cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Report
              </button>
            )}
            <button
              type="button"
              onClick={handleOpenContactModal}
              className="bg-[#ED8B36] hover:bg-[#E56A1F] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-orange-500/20 hover:shadow-lg flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center whitespace-nowrap"
            >
              Unlock My Complete Financial Plan &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Get In Touch Contact Area */}
      <div className="space-y-2 pt-2">
        <div className="max-w-4xl mx-auto mb-5 bg-[#F4F1EA] border border-[#E8E2D8] rounded-[1.75rem] p-5 sm:p-6 text-center space-y-2.5 shadow-[4px_4px_14px_rgba(180,172,158,0.3),inset_4px_4px_12px_rgba(180,172,158,0.4),inset_-4px_-4px_12px_rgba(255,255,255,0.95)] relative overflow-hidden select-none">
          
          {/* Ambient Background Orange Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#F0883E]/10 blur-2xl rounded-full pointer-events-none" />

          {/* Glowing Badge Tag */}
          <div className="inline-flex items-center gap-2 bg-[#FFF6ED] border border-[#EFE9DF] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold text-[#F0883E] shadow-sm uppercase tracking-wider">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Personalized Financial Advisory</span>
          </div>

          {/* Main Title */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2B2A28] leading-tight tracking-tight">
            Get In Touch For <span className="bg-gradient-to-r from-[#F0883E] to-[#E07A2E] text-transparent bg-clip-text">Detailed Investment Planning</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[#8A8578] text-xs sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
            We're here to help you plan a financially secure future with tailored wealth strategies and expert guidance.
          </p>

          {/* Feature Highlights */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-[#2B2A28]">
            <div className="flex items-center gap-1.5 text-[#F0883E]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>1-on-1 Advisory Session</span>
            </div>
            <span className="text-[#D9D4C7] hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#F0883E]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>Custom Milestone Roadmap</span>
            </div>
            <span className="text-[#D9D4C7] hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5 text-[#F0883E]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>100% Secure & Confidential</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* Left Side: Bento Cards for Contact Info */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">

            {/* Card 1: Phone */}
            <div className="bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-4 flex items-center gap-4 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)] hover:bg-[#EFE9DC] transition-all duration-300 scale-100 hover:scale-[0.98]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6ED] border border-[#EFE9DF] flex items-center justify-center shrink-0 text-[#F0883E] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-[#8A8578] tracking-wider uppercase block mb-0.5">PHONE NUMBERS</span>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs sm:text-sm font-bold text-[#2B2A28]">
                  <a href="tel:+919422203162" className="hover:text-[#F0883E] transition-colors">+91 94222 03162</a>
                  <span className="text-[#D9D4C7]">·</span>
                  <a href="tel:+918623912149" className="hover:text-[#F0883E] transition-colors">+91 86239 12149</a>
                </div>
              </div>
            </div>

            {/* Card 2: WhatsApp & Email in 2 Cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-4 flex items-center gap-3.5 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)] hover:bg-[#EFE9DC] transition-all duration-300 scale-100 hover:scale-[0.98]">
                <div className="w-9 h-9 rounded-xl bg-[#FFF6ED] border border-[#EFE9DF] flex items-center justify-center shrink-0 text-[#F0883E] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.234 5.232.003 11.64.003c3.106.001 6.027 1.213 8.225 3.414 2.199 2.201 3.409 5.123 3.408 8.23-.004 6.407-5.233 11.637-11.641 11.637-2.007-.001-3.978-.52-5.748-1.503L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.336 0 9.684-4.32 9.688-9.626.002-2.57-1.002-4.986-2.825-6.809-1.824-1.824-4.244-2.827-6.818-2.829-5.342 0-9.69 4.32-9.694 9.628-.002 1.776.47 3.51 1.365 5.041L2.17 21.8l4.477-1.176z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold text-[#8A8578] tracking-wider uppercase block mb-0.5">WHATSAPP</span>
                  <a href="https://wa.me/919561115408" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#2B2A28] hover:text-[#F0883E] transition-colors truncate block">+91 95611 15408</a>
                </div>
              </div>

              <div className="bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-4 flex items-center gap-3.5 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)] hover:bg-[#EFE9DC] transition-all duration-300 scale-100 hover:scale-[0.98]">
                <div className="w-9 h-9 rounded-xl bg-[#FFF6ED] border border-[#EFE9DF] flex items-center justify-center shrink-0 text-[#F0883E] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-extrabold text-[#8A8578] tracking-wider uppercase block mb-0.5">EMAIL</span>
                  <a href="mailto:kailashmalpani@wealthswisdom.com" className="text-xs font-bold text-[#2B2A28] hover:text-[#F0883E] transition-colors truncate block">kailashmalpani@wealthswisdom.com</a>
                </div>
              </div>
            </div>

            {/* Card 3: Head Office */}
            <div className="bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-4 flex items-start gap-4 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)] hover:bg-[#EFE9DC] transition-all duration-300 scale-100 hover:scale-[0.98]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6ED] border border-[#EFE9DF] flex items-center justify-center shrink-0 text-[#F0883E] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)] mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-[#8A8578] tracking-wider uppercase block mb-0.5">HEAD OFFICE</span>
                <p className="text-xs font-semibold text-[#2B2A28] leading-relaxed">
                  D 614, FREEDOM TOWERS, Behind Asian Hospital, Akashwani square, Chhatrapati Sambhaji Nagar (Aurangabad) 431005
                </p>
              </div>
            </div>

            {/* Card 4: Branch Office */}
            <div className="bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-4 flex items-start gap-4 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] hover:shadow-[1px_1px_4px_rgba(180,172,158,0.25),inset_10px_10px_20px_rgba(170,160,144,0.7),inset_-10px_-10px_20px_rgba(255,255,255,1)] hover:bg-[#EFE9DC] transition-all duration-300 scale-100 hover:scale-[0.98]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF6ED] border border-[#EFE9DF] flex items-center justify-center shrink-0 text-[#F0883E] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(210,200,185,0.5)] mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold text-[#8A8578] tracking-wider uppercase block mb-0.5">BRANCH OFFICE</span>
                <p className="text-xs font-semibold text-[#2B2A28] leading-relaxed">
                  1st Floor, MASSIA Building More Chowk, Waluj MIDC Chh. Sambhajinagar (Aurangabad) – 431136
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: Contact Form Card */}
          <form onSubmit={handleContactSubmit} className="lg:col-span-7 bg-[#F4F1EA] border border-[#E8E2D8] rounded-2xl p-5 sm:p-7 space-y-4 shadow-[2px_2px_6px_rgba(180,172,158,0.3),inset_4px_4px_10px_rgba(180,172,158,0.45),inset_-4px_-4px_10px_rgba(255,255,255,0.9)] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-[11px] font-extrabold text-[#F0883E] tracking-wider uppercase">
                GET EXPERT GUIDANCE FOR YOUR FINANCIAL FUTURE
              </div>
              <h3 className="font-heading text-base sm:text-lg font-extrabold text-[#2B2A28] leading-tight">
                Send Us a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#2B2A28]">Your Name*</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your full name"
                    className={`${contactName ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-[#2B2A28]">Email address*</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`${contactEmail ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[#2B2A28]">Mobile Number*</label>
                <div className="flex gap-2">
                  <div className="neu-prefix rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold select-none shrink-0 flex items-center justify-center font-sans">
                    +91
                  </div>
                  <input
                    type="tel"
                    required
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    placeholder="Enter your mobile number"
                    className={`${contactMobile ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-[#2B2A28]">Message</label>
                <textarea
                  rows="3"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Enter your message"
                  className={`${contactMessage ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200 resize-none`}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenContactModal}
              className="w-full neu-btn-raised py-3.5 font-bold text-xs sm:text-sm cursor-pointer mt-2"
            >
              Get My Complete Financial Roadmap &rarr;
            </button>
          </form>

        </div>
      </div>



      {/* Get In Touch Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fade-in select-none">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#1C1B1A]/40 backdrop-blur-xs transition-opacity cursor-pointer" 
            onClick={() => setIsContactModalOpen(false)}
          />
          
          {/* Outer Modal Container */}
          <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#EFE9DF] rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden z-10 text-left max-h-[85vh] sm:max-h-[90vh] flex flex-col">
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#8E8A80] hover:text-[#1C1B1A] transition-colors w-8 h-8 rounded-full flex items-center justify-center neu-btn-flat-inactive cursor-pointer z-20"
              aria-label="Close modal"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Inner Body Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scrollbar-none rounded-2xl sm:rounded-[2rem]">
              <div className="p-6 sm:p-8 space-y-4">
                {submitSuccess ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-[#FFF6ED] text-[#ED8B36] rounded-full flex items-center justify-center mx-auto border border-[#EFE9DF] shadow-inner">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-xl font-extrabold text-[#1C1B1A]">Request Submitted!</h3>
                    <p className="text-xs sm:text-sm text-[#8E8A80] max-w-xs mx-auto">
                      Thank you! Our expert financial advisor will get in touch with you shortly to help you build your custom plan.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(false)}
                      className="neu-btn-raised px-6 py-2.5 text-xs font-bold rounded-xl mt-2 cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="text-[11px] font-bold text-[#ED8B36] tracking-wider uppercase mb-1">
                      GET EXPERT GUIDANCE FOR YOUR FINANCIAL FUTURE
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#1C1B1A] leading-tight mb-2">
                      Book Your Consultation
                    </h3>

                    {submitError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                        {submitError}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#4A4740]">Your Name*</label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Enter your full name"
                        className={`${contactName ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#4A4740]">Email address*</label>
                      <input
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className={`${contactEmail ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#4A4740]">Mobile Number*</label>
                      <div className="flex gap-2">
                        <div className="neu-prefix rounded-xl px-3 py-3 text-xs sm:text-sm font-semibold select-none shrink-0 flex items-center justify-center font-sans">
                          +91
                        </div>
                        <input
                          type="tel"
                          required
                          value={contactMobile}
                          onChange={(e) => setContactMobile(e.target.value)}
                          placeholder="Enter your mobile number"
                          className={`${contactMobile ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-[#4A4740]">Message</label>
                      <textarea
                        rows="3"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Enter your message (optional)"
                        className={`${contactMessage ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200 resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full neu-btn-raised py-3 font-bold text-xs sm:text-sm cursor-pointer mt-2 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Get My Complete Financial Roadmap ➔"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Off-Screen Container for 100% Pure Frontend Browser PDF Generation */}
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', overflow: 'hidden' }}>
        <FullReportTemplate
          ref={fullReportRef}
          formData={{ ...formData, activeGoals, goals: activeGoals }}
          childrenData={childrenData}
          calculationResult={calculationResult}
          reportData={reportData}
          services={services}
          testimonials={testimonials}
          assessmentId={assessmentId}
        />
      </div>
    </div>
  );
}
