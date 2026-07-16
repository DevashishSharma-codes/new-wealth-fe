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
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] font-sans selection:bg-brand-gold/30 selection:text-brand-blue">
      
      <Header currentStep={step} totalSteps={5} goToStep={goToStep} showReport={showReport} />

      <main className="flex-1 w-full py-10 sm:py-14" style={{ paddingLeft: 'clamp(16px, 5vw, 80px)', paddingRight: 'clamp(16px, 5vw, 80px)' }}>
        
        {apiError && (
          <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-3xl text-xs sm:text-sm font-semibold shadow-xs flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        {renderStepComponent()}

      </main>

      <Footer />

    </div>
  );
}
