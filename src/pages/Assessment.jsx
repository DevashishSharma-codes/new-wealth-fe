import React from 'react';
import { useAssessment } from '../hooks/useAssessment';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { StepIndicator } from '../components/assessment/StepIndicator';
import { Step1Communication } from '../components/assessment/steps/Step1Communication';
import { Step2PersonalDetails } from '../components/assessment/steps/Step2PersonalDetails';
import { Step3FamilyDetails } from '../components/assessment/steps/Step3FamilyDetails';
import { Step4LifestyleGoals } from '../components/assessment/steps/Step4LifestyleGoals';
import { Step5RetirementSavings } from '../components/assessment/steps/Step5RetirementSavings';
import { ReportView } from '../components/assessment/report/ReportView';

export default function Assessment() {
  const {
    step,
    showReport,
    isCalculating,
    apiError,
    goToStep
  } = useAssessment();

  const renderStepComponent = () => {
    switch (step) {
      case 1:
        return <Step1Communication />;
      case 2:
        return <Step2PersonalDetails />;
      case 3:
        return <Step3FamilyDetails />;
      case 4:
        return <Step4LifestyleGoals />;
      case 5:
        return showReport ? <ReportView /> : <Step5RetirementSavings />;
      default:
        return <Step1Communication />;
    }
  };



  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step, showReport]);

  return (
    <div className="min-h-screen flex flex-col bg-[#070D1B] text-white font-sans selection:bg-sky-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambient Celestial Lighting (Planetary Horizon Atmosphere) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-sky-500/15 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[60%] -right-[10%] w-[500px] h-[500px] bg-sky-900/10 blur-[120px] rounded-full" />
      </div>

      {/* Return to Home Action Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("ww_assessment_state");
            localStorage.removeItem("ww_assessment_id");
            window.location.href = "/";
          }}
          className="relative group inline-flex items-center gap-2 px-5 py-2.5 rounded-full overflow-hidden backdrop-blur-2xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-white/40 text-white transition-all text-xs sm:text-sm font-medium cursor-pointer shadow-sm hover:shadow-md active:scale-95"
        >
          <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Return Home</span>
        </button>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <Header currentStep={step} totalSteps={5} goToStep={goToStep} showReport={showReport} />

        <main className="flex-1 w-full py-8 sm:py-12 relative z-10" style={{ paddingLeft: 'clamp(16px, 5vw, 80px)', paddingRight: 'clamp(16px, 5vw, 80px)' }}>
          
          {apiError && (
            <div className="max-w-4xl mx-auto mb-6 bg-red-500/10 border border-red-500/30 text-red-200 px-5 py-4 rounded-3xl text-xs sm:text-sm font-medium backdrop-blur-xl shadow-lg flex items-center gap-3">
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{apiError}</span>
            </div>
          )}

          {renderStepComponent()}

        </main>

        <Footer />
      </div>

    </div>
  );
}
