import React, { useState } from 'react';
import { useAssessment } from '../../../hooks/useAssessment';
import { calculateCorpus } from '../../../utils/formatters';
import { MetricCards } from './MetricCards';
import { RetirementTable } from './RetirementTable';
import { GoalsTable } from './GoalsTable';
import { InsuranceTable } from './InsuranceTable';
import client from '../../../config/api';

export function ReportView() {
  const {
    calculationResult,
    reportId,
    reportMessage,
    formData,
    childrenCount,
    assessmentId,
    downloadReport
  } = useAssessment();

  const [contactName, setContactName] = useState('');
  const [contactMobile, setContactMobile] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await client.post('/contact/get-in-touch', {
        name: contactName,
        mobile: contactMobile,
        email: contactEmail,
        message: contactMessage,
        assessment_id: assessmentId
      });
      alert("Thank you! Our expert financial advisor will get in touch with you shortly.");
      setContactName('');
      setContactMobile('');
      setContactEmail('');
      setContactMessage('');
    } catch (err) {
      console.error(err);
      alert("Failed to submit request: " + err.message);
    }
  };

  if (!calculationResult) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full border-4 border-orange-100 border-t-[#ED8B36] animate-spin" />
        <p className="text-sm text-slate-400">Loading calculation results...</p>
      </div>
    );
  }

  const insRaw = calculationResult.insurance?.total_required?.raw || 0;
  const displayInsurance = (insRaw / 10000000).toFixed(2);

  const clientCorpus = calculationResult.client?.corpus?.raw || 0;
  const spouseCorpus = calculationResult.spouse?.corpus?.raw || 0;
  const displayCorpus = ((clientCorpus + spouseCorpus) / 10000000).toFixed(2);

  const clientSip = calculationResult.client?.monthly_sip?.raw || 0;
  const spouseSip = calculationResult.spouse?.monthly_sip?.raw || 0;
  const goalsSip = calculationResult.goals?.total_monthly_sip?.raw || 0;
  const displayMonthly = Math.round(clientSip + spouseSip + goalsSip).toLocaleString('en-IN');

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
              {reportMessage === "Report sent to your email" ? "Report Sent Successfully!" : reportMessage || "Report Sent Successfully!"}
            </h1>
            <p className="text-[#8E8A80] text-xs sm:text-sm font-light">
              {reportMessage === "Report sent to your email" ? (
                <>
                  Your personalized retirement assessment report has been sent to:{' '}
                  <span className="font-semibold text-[#ED8B36]">{formData.email}</span>
                </>
              ) : reportMessage === "Report downloaded successfully" ? (
                "Your personalized retirement assessment report has been downloaded."
              ) : (
                <>
                  Your personalized retirement assessment report has been sent to:{' '}
                  <span className="font-semibold text-[#ED8B36]">{formData.email || '21spheres@gmail.com'}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {reportId && (
          <button
            type="button"
            onClick={downloadReport}
            className="bg-[#1C1B1A] hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center shrink-0"
          >
            <svg className="w-4 h-4 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF Report
          </button>
        )}
      </div>

      {/* Assessment Metrics Cards */}
      <MetricCards
        displayInsurance={displayInsurance}
        displayCorpus={displayCorpus}
        displayMonthly={displayMonthly}
      />

      {/* Detailed Financial Blueprint Report */}
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

      {/* Ready to Build Plan Banner */}
      <div className="bg-[#111E6C] rounded-[1.5rem] p-6 sm:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 border border-blue-900/10 shadow-lg text-white w-full">
        <div className="flex-1 space-y-4">
          <h2 className="font-heading text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
            Ready to Build Your Complete Financial Plan?
          </h2>
          <p className="text-blue-100/80 text-xs sm:text-[13px] leading-relaxed font-light">
            Your retirement assessment provides a strong starting point, but a personalized financial strategy can help you optimize investments, retirement income, insurance, tax efficiency, estate planning, and long-term wealth preservation.
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
                onClick={downloadReport}
                className="bg-white hover:bg-slate-50 text-[#1E2B49] border border-[#E5E2DA] px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xs hover:shadow-md flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
              >
                <svg className="w-4 h-4 text-[#ED8B36]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Report
              </button>
            )}
            <button
              type="button"
              onClick={() => alert("Unlocking complete financial plan features.")}
              className="bg-[#ED8B36] hover:bg-[#E56A1F] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md shadow-orange-500/20 hover:shadow-lg flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center whitespace-nowrap"
            >
              Unlock My Complete Financial Plan &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Get In Touch Contact Area */}
      <div className="space-y-1 pt-2">
        <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1C1B1A] text-center">Get In Touch</h2>
        <p className="text-[#8E8A80] text-xs sm:text-sm text-center">We're here to help you plan a financially secure future.</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">

          {/* Left Card: Contact Info */}
          <div className="lg:col-span-5 neu-card-raised rounded-2xl p-5 sm:p-6 space-y-5">

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#ED8B36] neu-card-inset bg-[#FAF7F2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-[#A69E90] tracking-wider uppercase block">PHONE</span>
                <a href="tel:+91942222162" className="text-xs sm:text-sm font-bold text-[#1C1B1A] hover:underline">+91 94222 22162</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#ED8B36] neu-card-inset bg-[#FAF7F2]">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.234 5.232.003 11.64.003c3.106.001 6.027 1.213 8.225 3.414 2.199 2.201 3.409 5.123 3.408 8.23-.004 6.407-5.233 11.637-11.641 11.637-2.007-.001-3.978-.52-5.748-1.503L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.336 0 9.684-4.32 9.688-9.626.002-2.57-1.002-4.986-2.825-6.809-1.824-1.824-4.244-2.827-6.818-2.829-5.342 0-9.69 4.32-9.694 9.628-.002 1.776.47 3.51 1.365 5.041L2.17 21.8l4.477-1.176z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-[#A69E90] tracking-wider uppercase block">WHATSAPP</span>
                <a href="https://wa.me/919503192225" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm font-bold text-[#1C1B1A] hover:underline">+91 95031 92225</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#ED8B36] neu-card-inset bg-[#FAF7F2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-[#A69E90] tracking-wider uppercase block">EMAIL</span>
                <a href="mailto:kallashmalpani@wealthwisdom.com" className="text-xs sm:text-sm font-bold text-[#1C1B1A] hover:underline block leading-tight font-sans">kallashmalpani@wealthwisdom.com</a>
                <a href="mailto:wealthwisdom86@gmail.com" className="text-xs sm:text-sm font-bold text-[#1C1B1A] hover:underline block leading-tight pt-0.5 font-sans">wealthwisdom86@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#ED8B36] neu-card-inset bg-[#FAF7F2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-[#A69E90] tracking-wider uppercase block">ADDRESS</span>
                <p className="text-xs sm:text-sm font-semibold text-[#1C1B1A] leading-relaxed">
                  D-184, FREEDOM TOWERS, Behind Asian Hospital, Akashwani Square, Chhatrapati Sambhaji Nagar (Aurangabad) 431005
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[#ED8B36] neu-card-inset bg-[#FAF7F2]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-bold text-[#A69E90] tracking-wider uppercase block">BRANCH OFFICE</span>
                <p className="text-xs sm:text-sm font-semibold text-[#1C1B1A] leading-relaxed">
                  1st Floor, MADSM Building More Chowk, Bajaj MIDC Ctr, Sambhajinagar (Aurangabad) - 431136
                </p>
              </div>
            </div>

          </div>

          {/* Right Card: Contact Form */}
          <form onSubmit={handleContactSubmit} className="lg:col-span-7 neu-card-raised rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="text-[11px] font-bold text-[#ED8B36] tracking-wider uppercase mb-1">
              GET EXPERT GUIDANCE FOR YOUR FINANCIAL FUTURE
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                rows="2"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Enter your message"
                className={`${contactMessage ? 'neu-field-filled' : 'neu-field'} w-full px-4 py-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-200 resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full neu-btn-raised py-3 font-bold text-xs sm:text-sm cursor-pointer mt-1"
            >
              Get My Complete Retirement Roadmap &rarr;
            </button>

          </form>

        </div>
      </div>

      {/* Thank You Envelope at the end on Mobile only */}
      <div className="block md:hidden text-center py-5 border-t border-[#EFE9DF] mt-2 select-none">
        <div className="w-16 h-16 mx-auto select-none pointer-events-none drop-shadow-sm">
          <img
            src="/assets/thank_you_envelope.png"
            alt="3D Envelope Thank You illustration"
            className="w-full h-auto object-contain animate-float"
          />
        </div>
        <p className="text-[#8E8A80] text-xs font-semibold mt-2">
          Thank you for trusting Wealth Wisdom!
        </p>
      </div>

    </div>
  );
}