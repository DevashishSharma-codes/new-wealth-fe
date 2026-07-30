import React, { forwardRef } from 'react';
import { RoadmapTemplate } from './RoadmapTemplate';

/**
 * FullReportTemplate React Component
 * 100% Exact Visual & Structural Replica of the 15-Page Backend Report PDF.
 * Renders every page in React HTML/CSS matching the exact templates, icons, pill boxes, tables, and colors.
 */
export const FullReportTemplate = forwardRef(({ formData = {}, childrenData = [], calculationResult = {}, assessmentId = '' }, ref) => {
  const clientName = formData.name || 'Valued Client';
  const reportDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const goals = calculationResult?.goals?.items || [];
  const activeChildren = childrenData.length > 0 ? childrenData : (formData.children || []);
  const totalGoalsMonthlySip = calculationResult?.goals?.total_monthly_sip?.inr || '₹0';

  // Retirement Summary
  const clientRet = calculationResult?.client || {};
  const clientRetAge = formData.targetRetireAge || '60';
  const clientYearsToRet = clientRet.years_to_retirement || '18';
  const clientRetPeriod = '18';
  const clientCorpusReq = clientRet.corpus?.inr || '₹52,39,41,846';
  const clientExpToday = clientRet.monthly_expense_today?.inr || '₹10,00,000';
  const clientExpAtRet = clientRet.monthly_expense_at_ret?.inr || '₹28,54,339';
  const clientMonthlySip = clientRet.monthly_sip?.inr || '₹7,43,139';
  const clientLumpSum = clientRet.lump_sum?.inr || '₹6,81,33,183';
  const clientProvisionsMade = clientRet.provisions_made?.inr || clientRet.provisions_made || calculationResult?.client_provisions_made?.inr || calculationResult?.client_provisions_made || formData.provisionsMade || formData.pf_nps_sa || '₹0';

  // Insurance
  const insuranceData = calculationResult?.insurance || {};
  const totalInsuranceNeed = insuranceData.total_required?.inr || '₹31,08,66,558';

  // Map exact real 3D icons attached by user
  const getGoalIcon = (goalType = '') => {
    const t = goalType.toLowerCase();
    if (t.includes('renovation')) return '/assets/report/real_3d_home_renovation.png';
    if (t.includes('holiday')) return '/assets/report/real_3d_holiday_home.png';
    if (t.includes('house') || t.includes('home') || t.includes('property')) return '/assets/report/real_3d_house_purchase.png';
    if (t.includes('car') || t.includes('vehicle')) return '/assets/report/real_3d_car_purchase.png';
    if (t.includes('foreign') || t.includes('tour') || t.includes('travel') || t.includes('vacation')) return '/assets/report/foreign_tour_image1.png';
    if (t.includes('gift') || t.includes('gifting')) return '/assets/report/real_3d_family_gifting.png';
    if (t.includes('charity') || t.includes('donation')) return '/assets/report/real_3d_charity.png';
    if (t.includes('birth') || t.includes('baby')) return '/assets/report/real_3d_child_birth.png';
    if (t.includes('big') || t.includes('purchase')) return '/assets/report/real_3d_big_purchases.png';
    if (t.includes('estate')) return '/assets/report/real_3d_estate_for_children.png';
    if (t.includes('post') || t.includes('master')) return '/assets/report/real_3d_post_graduation.png';
    if (t.includes('graduation') || t.includes('education') || t.includes('college') || t.includes('school')) return '/assets/report/real_3d_child_graduation.png';
    if (t.includes('marriage') || t.includes('wedding')) return '/assets/report/real_3d_child_marriage.png';
    if (t.includes('child')) return '/assets/report/real_3d_child_other.png';
    return '/assets/report/real_3d_other_goals.png';
  };

  const getGoalAdvisoryQuote = (goalType = '') => {
    const t = goalType.toLowerCase();
    if (t.includes('renovation')) {
      return "Home improvement expenses often arise when least expected. Preparing for them in advance can help preserve both comfort and financial stability.";
    }
    if (t.includes('house') || t.includes('home') || t.includes('property')) {
      return "Based on the timeline and projected cost of this goal, we suggest prioritising disciplined investments to ensure your home purchase remains a planned milestone rather than a financial burden.";
    }
    if (t.includes('car') || t.includes('vehicle')) {
      return "Since this goal directly impacts your lifestyle and convenience, a dedicated investment plan can help you make this purchase comfortably when required.";
    }
    if (t.includes('holiday')) {
      return "A vacation home creates a sanctuary for relaxation and family memories. Planning early ensures it enhances your wealth rather than overextending it.";
    }
    if (t.includes('gift')) {
      return "Gifting your family brings immense joy. Structuring your savings in advance allows you to celebrate life milestones without affecting your long-term wealth.";
    }
    if (t.includes('charity')) {
      return "Philanthropy leaves a lasting legacy. Disciplined planning allows you to fulfill your charitable aspirations sustainably.";
    }
    if (t.includes('birth') || t.includes('baby')) {
      return "Welcoming a child brings joy and new expenses. Early financial preparation creates a secure environment for your growing family.";
    }
    if (t.includes('big') || t.includes('purchase')) {
      return "High-value purchases require thoughtful planning. Allocating funds systematically ensures you achieve them comfortably.";
    }
    if (t.includes('estate')) {
      return "Building a legacy for your children ensures their future stability and financial independence for generations.";
    }
    if (t.includes('foreign') || t.includes('tour') || t.includes('vacation')) {
      return "Exploring the world offers unforgettable experiences. Structured travel investments ensure you enjoy luxury vacations stress-free.";
    }
    if (t.includes('graduation') || t.includes('education') || t.includes('college')) {
      return "Investing in higher education opens doors to lifelong success. Timely planning secures your child's academic ambitions without strain.";
    }
    if (t.includes('post') || t.includes('master')) {
      return "Advanced degrees shape successful careers. Preparing for post-graduation costs guarantees your child reaches their full professional potential.";
    }
    if (t.includes('marriage') || t.includes('wedding')) {
      return "A wedding is a joyous celebration of life. Strategic financial planning ensures your child's dream wedding is memorable and debt-free.";
    }
    return "Based on the timeline and projected cost of this goal, we suggest prioritising disciplined investments to ensure your milestone remains a planned milestone rather than a financial burden.";
  };

  const DB_TOUR_DESTINATIONS = [
    { name: 'Nepal', budget: 90000, flag: '🇳🇵' },
    { name: 'Sri Lanka', budget: 110000, flag: '🇱🇰' },
    { name: 'Thailand', budget: 120000, flag: '🇹🇭' },
    { name: 'Bhutan', budget: 120000, flag: '🇧🇹' },
    { name: 'Vietnam', budget: 130000, flag: '🇻🇳' },
    { name: 'Bali (Indonesia)', budget: 140000, flag: '🇮🇩' },
    { name: 'Malaysia', budget: 150000, flag: '🇲🇾' },
    { name: 'Dubai (UAE)', budget: 160000, flag: '🇦🇪' },
    { name: 'Singapore', budget: 180000, flag: '🇸🇬' },
    { name: 'Maldives', budget: 220000, flag: '🇲🇻' },
    { name: 'Egypt', budget: 230000, flag: '🇪🇬' },
    { name: 'Turkey', budget: 240000, flag: '🇹🇷' },
    { name: 'Mauritius', budget: 250000, flag: '🇲🇺' },
    { name: 'China', budget: 270000, flag: '🇨🇳' },
    { name: 'South Africa', budget: 280000, flag: '🇿🇦' },
    { name: 'Kenya', budget: 300000, flag: '🇰🇪' },
    { name: 'Seychelles', budget: 320000, flag: '🇸🇨' },
    { name: 'South Korea', budget: 320000, flag: '🇰🇷' },
    { name: 'Greece', budget: 320000, flag: '🇬🇷' },
    { name: 'Germany', budget: 340000, flag: '🇩🇪' },
    { name: 'Spain', budget: 350000, flag: '🇪🇸' },
    { name: 'Italy', budget: 360000, flag: '🇮🇹' },
    { name: 'Japan', budget: 380000, flag: '🇯🇵' },
    { name: 'France', budget: 380000, flag: '🇫🇷' },
    { name: 'United Kingdom', budget: 390000, flag: '🇬🇧' },
    { name: 'Australia', budget: 420000, flag: '🇦🇺' },
    { name: 'Canada', budget: 430000, flag: '🇨🇦' },
    { name: 'Switzerland', budget: 450000, flag: '🇨🇭' },
    { name: 'New Zealand', budget: 480000, flag: '🇳🇿' },
    { name: 'United States', budget: 520000, flag: '🇺🇸' },
  ];

  const DB_UNIVERSITIES = [
    { name: 'IIT Bombay', cost: 1500000 },
    { name: 'IIT Delhi', cost: 1600000 },
    { name: 'IIT Madras', cost: 1550000 },
    { name: 'Shri Ram College of Commerce (SRCC)', cost: 1200000 },
    { name: 'IIM Ahmedabad', cost: 2500000 },
    { name: 'IIM Bangalore', cost: 2450000 },
    { name: 'AIIMS New Delhi', cost: 1800000 },
    { name: 'Maulana Azad Institute of Dental Sciences', cost: 3500000 },
    { name: 'Manipal Academy of Higher Education', cost: 2800000 },
    { name: 'BITS Pilani', cost: 2200000 },
    { name: 'St. Xavier\'s College, Mumbai', cost: 1000000 },
    { name: 'Christ University, Bangalore', cost: 1400000 },
    { name: 'Kazakh National Medical University', cost: 4000000 },
    { name: 'First Moscow State Medical University', cost: 4500000 },
    { name: 'University of Oxford (UK)', cost: 6500000 },
    { name: 'Harvard University (USA)', cost: 8500000 },
    { name: 'Stanford University (USA)', cost: 9000000 },
    { name: 'National University of Singapore (NUS)', cost: 5500000 },
    { name: 'University of Toronto (Canada)', cost: 8000000 },
    { name: 'Technical University of Denmark', cost: 8000000 },
    { name: 'Singapore Management University', cost: 8000000 },
    { name: 'Politecnico di Milano', cost: 8000000 },
    { name: 'USC School of Cinematic Arts', cost: 8000000 },
    { name: 'University of Toronto Faculty of Dentistry', cost: 8000000 },
    { name: 'London Business School', cost: 8000000 },
    { name: 'MIT', cost: 9000000 },
    { name: 'University of Melbourne (Australia)', cost: 5800000 },
  ];

  const fmtInrRange = (bInr) => {
    const low = Math.round(bInr * 0.85);
    const high = Math.round(bInr * 1.15);
    return `₹${low.toLocaleString('en-IN')} - ₹${high.toLocaleString('en-IN')}`;
  };

  const extractTargetBudget = (goalObj, defaultVal) => {
    let raw =
      goalObj?.todaysCost ||
      goalObj?.today_cost ||
      goalObj?.current_cost?.inr ||
      goalObj?.current_cost?.raw ||
      goalObj?.current_cost ||
      goalObj?.cost ||
      goalObj?.budget;

    if (raw != null) {
      if (typeof raw === 'number' && raw > 0) return raw;
      if (typeof raw === 'object' && raw.raw && typeof raw.raw === 'number') return raw.raw;
      if (typeof raw === 'string') {
        const cleaned = raw.replace(/[^0-9.]/g, '');
        const parsed = parseFloat(cleaned);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    }
    return defaultVal;
  };

  const findFormGoal = (gObj, fObj, cData = []) => {
    if (!fObj && !cData) return null;
    const rawGType = gObj?.goal_type || gObj?.title || gObj?.goal || '';
    const gType = String(rawGType).toLowerCase();
    const isEdu = gType.includes('education') || gType.includes('graduation') || gType.includes('college');
    const isTour = gType.includes('tour') || gType.includes('foreign') || gType.includes('vacation') || gType.includes('trip');

    const goalsList = [
      ...(Array.isArray(fObj?.goals) ? fObj.goals : []),
      ...(Array.isArray(fObj?.activeGoals) ? fObj.activeGoals : []),
      ...(Array.isArray(fObj?.lifestyleGoals) ? fObj.lifestyleGoals : []),
    ];

    for (let fg of goalsList) {
      if (!fg) continue;
      const rawFg = fg?.goalType || fg?.goal_type || fg?.title || fg?.name || fg?.id || '';
      const fgType = String(rawFg).toLowerCase();

      if (isEdu && (fgType.includes('education') || fgType.includes('graduation') || fgType.includes('college'))) {
        return fg;
      }
      if (isTour && (fgType.includes('tour') || fgType.includes('foreign') || fgType.includes('vacation') || fgType.includes('trip'))) {
        return fg;
      }
      if (fgType && (gType.includes(fgType) || fgType.includes(gType))) {
        return fg;
      }
    }

    const childrenList = [
      ...(Array.isArray(cData) ? cData : []),
      ...(Array.isArray(fObj?.children) ? fObj.children : []),
      ...(Array.isArray(fObj?.childrenData) ? fObj.childrenData : []),
    ];

    for (let child of childrenList) {
      if (!child) continue;
      if (isEdu && (child.selectedColleges || child.selected_colleges || child.budgetOptions)) {
        return child;
      }
      if (Array.isArray(child.goals)) {
        for (let fg of child.goals) {
          if (!fg) continue;
          const rawFg = fg?.goalType || fg?.goal_type || fg?.title || fg?.name || fg?.id || '';
          const fgType = String(rawFg).toLowerCase();
          if (isEdu && (fgType.includes('education') || fgType.includes('graduation') || fgType.includes('college') || fg.selectedColleges || fg.budgetOptions)) {
            return fg;
          }
        }
      }
    }

    return null;
  };

  const getDynamicTourOptions = (goalObj, formObj, calcObj, cData = []) => {
    const matchedFormGoal = findFormGoal(goalObj, formObj, cData);
    const combinedGoal = { ...matchedFormGoal, ...goalObj };

    let explicit =
      combinedGoal?.selectedDestinations ||
      combinedGoal?.selected_destinations ||
      combinedGoal?.destinations ||
      combinedGoal?.suggested_tours ||
      combinedGoal?.tour_slots ||
      combinedGoal?.selected_countries ||
      combinedGoal?.countries ||
      combinedGoal?.budgetOptions ||
      combinedGoal?.budget_options ||
      formObj?.foreignTourDestinations ||
      formObj?.selectedDestinations ||
      [];

    if ((!explicit || explicit.length === 0) && Array.isArray(formObj?.goals)) {
      formObj.goals.forEach(g => {
        if ((g.selectedDestinations && g.selectedDestinations.length > 0) || (g.budgetOptions && g.budgetOptions.length > 0)) {
          explicit = g.selectedDestinations || g.budgetOptions;
        }
      });
    }

    if (typeof explicit === 'string') {
      try { explicit = JSON.parse(explicit); } catch (e) { explicit = explicit.split(',').map(s => s.trim()); }
    }

    if (Array.isArray(explicit) && explicit.length > 0) {
      const list = [];
      explicit.forEach(item => {
        if (typeof item === 'object' && item && (item.name || item.destination || item.country)) {
          const destName = item.name || item.destination || item.country;
          let matched = DB_TOUR_DESTINATIONS.find(d => d.name.toLowerCase().includes(destName.toLowerCase()));
          list.push({
            flag: item.flag || (matched ? matched.flag : '✈️'),
            name: destName,
            cost: item.cost ? (typeof item.cost === 'number' ? `₹${item.cost.toLocaleString('en-IN')}` : String(item.cost)) : (matched ? fmtInrRange(matched.budget) : '₹3,50,000 - ₹5,00,000'),
          });
        } else if (typeof item === 'string' && item) {
          let matched = DB_TOUR_DESTINATIONS.find(d => d.name.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(d.name.toLowerCase()));
          list.push({
            flag: matched ? matched.flag : '✈️',
            name: matched ? matched.name : item,
            cost: matched ? fmtInrRange(matched.budget) : '₹3,50,000 - ₹5,00,000',
          });
        }
      });
      if (list.length > 0) {
        const selectedNames = new Set(list.map(l => l.name.toLowerCase()));
        const rawBudget = extractTargetBudget(combinedGoal, 900000);
        const travellers = Number(combinedGoal?.travellers || formObj?.travellers || 3);
        const perPersonBudget = rawBudget > 150000 ? Math.round(rawBudget / travellers) : rawBudget;

        const fillers = [...DB_TOUR_DESTINATIONS]
          .sort((a, b) => Math.abs(a.budget - perPersonBudget) - Math.abs(b.budget - perPersonBudget))
          .filter(d => !selectedNames.has(d.name.toLowerCase()))
          .map(d => ({ flag: d.flag, name: d.name, cost: fmtInrRange(d.budget) }));

        const final5 = [...list, ...fillers].slice(0, 5);
        console.log('🚀 [REPORT LOGGER] Top 5 Tour Options for Report:', final5.map(x => x.name));
        return final5;
      }
    }

    // Dynamic budget distance calculation
    const rawBudget = extractTargetBudget(combinedGoal, 900000);
    const travellers = Number(combinedGoal?.travellers || formObj?.travellers || 3);
    const perPersonBudget = rawBudget > 150000 ? Math.round(rawBudget / travellers) : rawBudget;
    const sorted = [...DB_TOUR_DESTINATIONS].sort((a, b) => Math.abs(a.budget - perPersonBudget) - Math.abs(b.budget - perPersonBudget));

    const final5 = sorted.slice(0, 5).map(d => ({
      flag: d.flag,
      name: d.name,
      cost: fmtInrRange(d.budget),
    }));
    console.log('🚀 [REPORT LOGGER] Top 5 Tour Options for Report (Calculated):', final5.map(x => x.name));
    return final5;
  };

  const getDynamicUniversities = (goalObj, formObj, calcObj, cData = []) => {
    const matchedFormGoal = findFormGoal(goalObj, formObj, cData);
    const combinedGoal = { ...matchedFormGoal, ...goalObj };

    let explicit =
      combinedGoal?.selectedColleges ||
      combinedGoal?.selected_colleges ||
      combinedGoal?.colleges ||
      combinedGoal?.college_list ||
      combinedGoal?.budgetOptions ||
      combinedGoal?.budget_options ||
      formObj?.selectedColleges ||
      formObj?.education_colleges ||
      [];

    const childrenList = [
      ...(Array.isArray(cData) ? cData : []),
      ...(Array.isArray(formObj?.children) ? formObj.children : []),
      ...(Array.isArray(formObj?.childrenData) ? formObj.childrenData : []),
    ];

    if (!explicit || explicit.length === 0) {
      childrenList.forEach(c => {
        if (Array.isArray(c.selectedColleges) && c.selectedColleges.length > 0) {
          explicit = c.selectedColleges;
        } else if (Array.isArray(c.budgetOptions) && c.budgetOptions.length > 0) {
          explicit = c.budgetOptions;
        } else if (Array.isArray(c.goals)) {
          c.goals.forEach(cg => {
            if (cg.selectedColleges && cg.selectedColleges.length > 0) explicit = cg.selectedColleges;
            else if (cg.budgetOptions && cg.budgetOptions.length > 0) explicit = cg.budgetOptions;
          });
        }
      });
    }

    if (Array.isArray(formObj?.goals)) {
      formObj.goals.forEach(g => {
        if ((!explicit || explicit.length === 0) && g.selectedColleges && g.selectedColleges.length > 0) {
          explicit = g.selectedColleges;
        }
      });
    }

    if (typeof explicit === 'string') {
      try { explicit = JSON.parse(explicit); } catch (e) { explicit = [explicit]; }
    }

    if (Array.isArray(explicit) && explicit.length > 0) {
      const list = explicit.map(c => {
        if (typeof c === 'object' && c) {
          const cName = c.name || c.college_name || c.college || c.university || 'Selected University';
          const cCost = c.cost || c.todaysCost || c.today_cost || c.budget;
          return {
            name: cName,
            cost: cCost ? (typeof cCost === 'number' ? `₹${cCost.toLocaleString('en-IN')}` : String(cCost)) : '₹20,00,000'
          };
        }
        return { name: String(c), cost: '₹20,00,000' };
      });

      if (list.length > 0) {
        const selectedNames = new Set(list.map(l => l.name.toLowerCase()));
        const budgetVal = extractTargetBudget(combinedGoal, 6000000);

        const fillerColleges = [...DB_UNIVERSITIES]
          .sort((a, b) => Math.abs(a.cost - budgetVal) - Math.abs(b.cost - budgetVal))
          .filter(u => !selectedNames.has(u.name.toLowerCase()))
          .map(u => ({ name: u.name, cost: `₹${u.cost.toLocaleString('en-IN')}` }));

        const final5 = [...list, ...fillerColleges].slice(0, 5);
        console.log('🚀 [REPORT LOGGER] Top 5 Universities for Report:', final5.map(x => x.name));
        return final5;
      }
    }

    // Dynamic budget distance calculation
    const budgetVal = extractTargetBudget(goalObj, 6000000);
    const sorted = [...DB_UNIVERSITIES].sort((a, b) => Math.abs(a.cost - budgetVal) - Math.abs(b.cost - budgetVal));

    const final5 = sorted.slice(0, 5).map(u => ({
      name: u.name,
      cost: `₹${u.cost.toLocaleString('en-IN')}`,
    }));
    console.log('🚀 [REPORT LOGGER] Top 5 Universities for Report (Calculated):', final5.map(x => x.name));
    return final5;
  };

  return (
    <div
      ref={ref}
      id="full-report-capture-container"
      style={{
        width: '595px',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        fontFamily: '"Montserrat", "Segoe UI", Helvetica, Arial, sans-serif',
        color: '#1c1b1a',
      }}
    >
      {/* PAGE 1: COVER PAGE (100% Pure Dynamic React HTML/CSS/SVG - No Background PNG, Zero Artifacts) */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
          fontFamily: '"Montserrat", "Segoe UI", Helvetica, Arial, sans-serif',
          pageBreakAfter: 'always',
          breakAfter: 'page',
        }}
      >
        {/* 1. Pure SVG Vector Background Shapes */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '595px', height: '842px', zIndex: 1 }}
          viewBox="0 0 595 842"
        >
          {/* Top-Left Dark Navy Corner Slice */}
          <polygon points="0,0 200,0 0,310" fill="#001a66" />
          {/* Bottom-Right Vibrant Orange Diagonal Ribbon */}
          <polygon points="595,180 595,842 120,842" fill="#ff8c32" />
          {/* Bottom-Right Dark Navy Corner Accent */}
          <polygon points="595,540 595,842 360,842" fill="#001a66" />
        </svg>

        {/* 2. Top-Right Wealth Wisdom Crest Logo */}
        <div style={{ position: 'absolute', top: '35px', right: '40px', zIndex: 10, textAlign: 'right' }}>
          <img
            src="/assets/wealth-wisdom-logo.png"
            alt="Wealth Wisdom Logo"
            style={{ height: '62px', objectFit: 'contain', display: 'block' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        {/* 3. Dynamic Client Text Block (Pure White Background Space: top=230px, left=75px) */}
        <div style={{ position: 'absolute', top: '230px', left: '75px', width: '310px', zIndex: 10 }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 800,
              fontStyle: 'italic',
              color: '#002b80',
              margin: '0 0 14px 0',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            Goal Analysis Report
          </h2>
          <h1
            style={{
              fontSize: '38px',
              fontWeight: 900,
              fontStyle: 'italic',
              color: '#002b80',
              margin: '0 0 16px 0',
              lineHeight: 1.1,
              wordBreak: 'break-word',
              maxWidth: '300px',
            }}
          >
            {clientName.startsWith('Mr.') || clientName.startsWith('Ms.') || clientName.startsWith('Mrs.')
              ? clientName
              : `Mr. ${clientName}`}
          </h1>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
            Generated on: {reportDate}
          </div>
        </div>

        {/* 4. Dark Navy Blue Crescent Accent Ring (Wrapped around bottom-right of circular photo) */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '20px',
            width: '370px',
            height: '370px',
            borderRadius: '50%',
            border: '14px solid #001a66',
            zIndex: 4,
            boxSizing: 'border-box',
          }}
        />

        {/* 5. Circular Photo Frame (Brand New Photorealistic Gemini Photo - Zero Bleeding, Real People, No 2024 Numbers) */}
        <div
          style={{
            position: 'absolute',
            bottom: '45px',
            right: '35px',
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '6px solid #ffffff',
            boxShadow: '0 12px 32px rgba(0, 43, 128, 0.20)',
            zIndex: 5,
            backgroundColor: '#ffffff',
          }}
        >
          <img
            src="/assets/report/cover_photo_gemini_real.png"
            alt="Real Financial Planning Meeting"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>

      {/* DYNAMIC ROADMAP */}
      <RoadmapTemplate goals={goals} childrenData={activeChildren} clientName={clientName} />

      {/* PAGES 3..N: INDIVIDUAL GOAL PAGES */}
      {goals.map((g, idx) => {
        const rawTitle = g.goal_type || g.goal || 'Financial Goal';
        let childName = (g.child_name || g.childName || '').trim();

        // Infer child name from activeChildren if generic ("Child 1", "Child 2") or empty
        if (!childName || /^child\s*\d+('s)?$/i.test(childName)) {
          let childIdx = -1;
          if (g.child_number !== undefined && g.child_number !== null) {
            childIdx = parseInt(g.child_number, 10) - 1;
          } else if (g.child_index !== undefined && g.child_index !== null) {
            childIdx = parseInt(g.child_index, 10);
          } else {
            const match = `${rawTitle} ${g.goal || ''}`.match(/child\s*(\d+)/i);
            if (match && match[1]) {
              childIdx = parseInt(match[1], 10) - 1;
            }
          }
          if (childIdx >= 0 && activeChildren[childIdx] && activeChildren[childIdx].name) {
            childName = activeChildren[childIdx].name.trim();
          }
        }

        if (childName && /^child\s*\d+('s)?$/i.test(childName)) {
          childName = '';
        } else if (childName) {
          childName = childName.replace(/'s$/i, '');
        }

        // Clean specific goal name from backend data (e.g. "Higher Education", "Graduation", "Marriage", "Business Setup", "Other")
        let specificGoalType = (g.goal_type || g.title || g.goal || rawTitle || 'Goal').trim();
        const isOtherGoal = specificGoalType.toLowerCase().includes('other');

        specificGoalType = specificGoalType
          .replace(/^child\s*\d+('s)?\s*/i, '')
          .replace(/^child\s*/i, '')
          .replace(/\s*goal$/i, '')
          .trim();

        if (childName && (specificGoalType.toLowerCase() === childName.toLowerCase() || specificGoalType.toLowerCase().includes(childName.toLowerCase()))) {
          specificGoalType = 'Other Goal';
        } else if (!specificGoalType || specificGoalType.toLowerCase() === 'other') {
          specificGoalType = 'Other Goal';
        }

        let goalName = '';
        if (childName) {
          if (rawTitle.toLowerCase().startsWith(`${childName.toLowerCase()}'s`)) {
            goalName = rawTitle;
          } else if (isOtherGoal || specificGoalType === 'Other Goal') {
            goalName = `${childName}'s Other Goal`;
          } else {
            goalName = `${childName}'s ${specificGoalType}`;
          }
        } else {
          goalName = specificGoalType;
        }

        const targetYear = g.target_year || '2027';
        const currentCost = g.current_cost?.inr || g.today_cost || '₹20,00,000';
        const futureCost = g.future_cost?.inr || '₹21,20,000';
        const monthlySip = g.monthly_sip?.inr || '₹1,66,060';
        const iconPath = getGoalIcon(rawTitle);
        const advisoryQuote = getGoalAdvisoryQuote(rawTitle);

        const isForeignTour =
          goalName.toLowerCase().includes('foreign') ||
          goalName.toLowerCase().includes('tour') ||
          goalName.toLowerCase().includes('vacation') ||
          goalName.toLowerCase().includes('trip') ||
          goalName.toLowerCase().includes('travel') ||
          goalName.toLowerCase().includes('holiday') ||
          rawTitle.toLowerCase().includes('foreign') ||
          rawTitle.toLowerCase().includes('tour') ||
          rawTitle.toLowerCase().includes('vacation') ||
          rawTitle.toLowerCase().includes('trip') ||
          rawTitle.toLowerCase().includes('travel') ||
          rawTitle.toLowerCase().includes('holiday');

        const isEducation =
          goalName.toLowerCase().includes('education') ||
          goalName.toLowerCase().includes('graduation') ||
          goalName.toLowerCase().includes('college') ||
          goalName.toLowerCase().includes('university') ||
          goalName.toLowerCase().includes('school') ||
          rawTitle.toLowerCase().includes('education') ||
          rawTitle.toLowerCase().includes('graduation') ||
          rawTitle.toLowerCase().includes('college') ||
          rawTitle.toLowerCase().includes('university') ||
          rawTitle.toLowerCase().includes('school');

        return (
          <React.Fragment key={idx}>
            <div
              className="report-page"
              style={{
                width: '595px',
                height: '842px',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box',
                padding: '30px 40px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                pageBreakAfter: 'always',
              }}
            >
              {/* Header Logo */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
              </div>

              {/* Title and 3D Icon Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#0f172a', lineHeight: 1.05, margin: 0, maxWidth: '270px', letterSpacing: '-0.02em' }}>
                  {goalName}
                </h1>
                <div style={{ width: '210px', height: '190px', marginTop: '-10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <img src={iconPath} alt={goalName} style={{ maxWidth: '210px', maxHeight: '190px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>
              </div>

              {/* Middle Content Row: Left Column (Target Year + Speech Bubble) vs Right Column (Current Cost + Future Cost) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '16px' }}>
                {/* LEFT COLUMN: Target Year D-Pill + Speech Bubble PNG */}
                <div style={{ width: '235px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Target Year D-Shaped Half-Capsule Pill (Pure HTML/CSS - Flush at x = 0) */}
                  <div
                    style={{
                      position: 'relative',
                      width: '215px',
                      backgroundColor: '#ffffff',
                      border: '3px solid #001a66',
                      borderLeft: 'none',
                      borderRadius: '0 50px 50px 0',
                      padding: '12px 20px 12px 58px',
                      marginLeft: '-40px',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{ fontSize: '16px', color: '#ff8c32', fontWeight: 600, lineHeight: 1.1 }}>
                      Target Year
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#ff8c32', marginTop: '4px', lineHeight: 1.1 }}>
                      {targetYear}
                    </div>
                  </div>

                  {/* Speech Bubble Static PNG Image */}
                  <div style={{ width: '235px' }}>
                    <img
                      src="/assets/report/speech_bubble_raw.png"
                      alt="Goal Advisory Quote"
                      style={{
                        width: '100%',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Current Cost & Future Cost Pills */}
                <div style={{ width: '260px', display: 'flex', flexDirection: 'column', gap: '18px', justifyContent: 'center' }}>
                  {/* Current Cost Pill */}
                  <div
                    style={{
                      border: '3px solid #001a66',
                      borderRadius: '24px',
                      padding: '14px 20px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div style={{ fontSize: '16px', color: '#ff8c32', fontWeight: 600 }}>Current Cost</div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{currentCost}</div>
                  </div>

                  {/* Future Cost Pill */}
                  <div
                    style={{
                      border: '3px solid #001a66',
                      borderRadius: '24px',
                      padding: '14px 20px',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <div style={{ fontSize: '16px', color: '#ff8c32', fontWeight: 600 }}>Future Cost</div>
                    <div style={{ fontSize: '26px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{futureCost}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Full-Width Monthly Investment Required Pill */}
              <div
                style={{
                  backgroundColor: '#001a66',
                  borderRadius: '36px',
                  padding: '16px 24px',
                  textAlign: 'center',
                  marginTop: 'auto',
                }}
              >
                <div style={{ fontSize: '16px', color: '#ff8c32', fontWeight: 700, letterSpacing: '0.02em' }}>
                  Monthly Investment Required
                </div>
                <div style={{ fontSize: '32px', fontWeight: 900, color: '#ff8c32', marginTop: '4px' }}>
                  {monthlySip}
                </div>
              </div>
            </div>

            {/* If Foreign Tour -> Add Suggested Foreign Tour Options Page */}
            {isForeignTour && (
              <div
                className="report-page"
                style={{
                  width: '595px',
                  height: '842px',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  padding: '30px 40px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  pageBreakAfter: 'always',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                  <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
                </div>

                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 20px 0', textAlign: 'center' }}>
                    Suggested Foreign<br />Tour Options
                  </h1>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '440px', margin: '0 auto' }}>
                    {getDynamicTourOptions(g, formData, calculationResult, childrenData).map((cOpt, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span style={{ fontSize: '30px' }}>{cOpt.flag}</span>
                        <div>
                          <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>{cOpt.name}</div>
                          <div style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>{cOpt.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ alignSelf: 'flex-end', width: '210px', height: '180px', marginTop: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  <img src="/assets/report/real_3d_paper_plane.png" alt="Paper Plane" style={{ maxWidth: '210px', maxHeight: '180px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
                </div>
              </div>
            )}

            {/* If Education -> Add Suggested Universities Page */}
            {isEducation && (
              <div
                className="report-page"
                style={{
                  width: '595px',
                  height: '842px',
                  backgroundColor: '#ffffff',
                  boxSizing: 'border-box',
                  padding: '35px 40px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  pageBreakAfter: 'always',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.15 }}>
                    Suggested<br />Universities &amp; Colleges
                  </h1>

                  <div style={{ width: '180px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <img src="/assets/report/real_3d_suggested_uni.png" alt="School Building" style={{ maxWidth: '180px', maxHeight: '150px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
                  </div>
                </div>

                {/* Prominent Centered Today's Cost Banner */}
                <div
                  style={{
                    backgroundColor: '#001a66',
                    borderRadius: '20px',
                    padding: '16px 20px',
                    textAlign: 'center',
                    color: '#ffffff',
                    margin: '6px 0',
                    boxShadow: '0 4px 12px rgba(0, 26, 102, 0.12)',
                  }}
                >
                  <div style={{ fontSize: '13px', color: '#ff8c32', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Today's Cost
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#ff8c32', marginTop: '2px', letterSpacing: '-0.01em' }}>
                    {currentCost}
                  </div>
                </div>

                {/* Top 5 Colleges Table Equally Spaced Below */}
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13.5px', marginTop: '6px' }}>
                  <tbody>
                    {getDynamicUniversities(g, formData, calculationResult, childrenData).map((uni, uIdx) => (
                      <tr key={uIdx} style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '16px 0', fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{uni.name}</td>
                        <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{uni.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* PAGE 9: RETIREMENT PLANNING PAGE */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '30px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pageBreakAfter: 'always',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Retirement<br />Planning
          </h1>
          <div style={{ width: '190px', height: '170px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src="/assets/report/real_3d_retirement.png" alt="Beach Chair" style={{ maxWidth: '190px', maxHeight: '170px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        {/* 3 Top Pure Vector SVG Bubbly Inset Cards Row (Zero HTML2Canvas Corner Checkerboxes) */}
        <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
          {[
            { label: 'Retirement Age', val: clientRetAge },
            { label: 'Retirement Period', val: clientRetPeriod },
            { label: 'Years to Retirement', val: clientYearsToRet },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                height: '95px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
              }}
            >
              {/* Pure SVG Vector Bubbly Inset Shadow */}
              <svg
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  borderRadius: '22px',
                  overflow: 'hidden',
                }}
              >
                <defs>
                  <filter id={`neu-inset-${idx}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feOffset dx="3" dy="3" />
                    <feGaussianBlur stdDeviation="3.5" result="offset-blur" />
                    <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                    <feFlood flood-color="#94a3b8" flood-opacity="0.7" result="color" />
                    <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                    <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                  </filter>
                </defs>
                <rect width="100%" height="100%" rx="22" fill="#e6ebf2" stroke="#cbd5e1" strokeWidth="1.5" filter={`url(#neu-inset-${idx})`} />
              </svg>

              {/* Centered Content */}
              <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#475569',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    marginBottom: '6px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {card.label}
                </div>
                <div
                  style={{
                    fontSize: '26px',
                    fontWeight: 900,
                    color: '#0f172a',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {card.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dark Blue Corpus Pill */}
        <div style={{ backgroundColor: '#001a66', borderRadius: '24px', padding: '16px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '14px', color: '#ff8c32', fontWeight: 600 }}>Corpus Required</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientCorpusReq}</div>
        </div>

        {/* Provisions Made (PF, NPS & SA) - Label on Top, Value Centered Below */}
        <div style={{ backgroundColor: '#001a66', borderRadius: '18px', padding: '14px 20px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ color: '#ff8c32', fontSize: '14px', fontWeight: 700 }}>Provisions Made (PF, NPS &amp; SA)</div>
          <div style={{ color: '#ff8c32', fontSize: '24px', fontWeight: 900, marginTop: '4px' }}>{clientProvisionsMade}</div>
        </div>

        {/* Expense Pills Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div style={{ border: '2.5px solid #002b80', borderRadius: '18px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#ff8c32', fontWeight: 600 }}>Expense at today's rate</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientExpToday}</div>
          </div>
          <div style={{ border: '2.5px solid #002b80', borderRadius: '18px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#ff8c32', fontWeight: 600 }}>Expense at Retirement</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientExpAtRet}</div>
          </div>
          <div style={{ border: '2.5px solid #002b80', borderRadius: '18px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#ff8c32', fontWeight: 600 }}>Monthly Investment Required</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientMonthlySip}</div>
          </div>
          <div style={{ border: '2.5px solid #002b80', borderRadius: '18px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', color: '#ff8c32', fontWeight: 600 }}>Lump Sum Investment Required</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientLumpSum}</div>
          </div>
        </div>
      </div>

      {/* PAGE 10: INSURANCE CALCULATIONS PAGE */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '35px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          pageBreakAfter: 'always',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>
            Insurance<br />Calculations
          </h1>
          <div style={{ width: '150px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src="/assets/report/real_3d_insurance.png" alt="Shield Hand" style={{ maxWidth: '150px', maxHeight: '130px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #cbd5e1', marginTop: '8px' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800, textAlign: 'center' }}>
              <th style={{ padding: '12px 10px', border: '1px solid #cbd5e1' }}>Goals to be protected</th>
              <th style={{ padding: '12px 8px', border: '1px solid #cbd5e1' }}>For/ After years</th>
              <th style={{ padding: '12px 10px', border: '1px solid #cbd5e1' }}>Amount</th>
              <th style={{ padding: '12px 8px', border: '1px solid #cbd5e1' }}>Today's/ Future cost</th>
              <th style={{ padding: '12px 10px', border: '1px solid #cbd5e1' }}>INSURANCE REQUIRED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', fontWeight: 600 }}>Household Expense</td>
              <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>18</td>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 1,44,00,000</td>
              <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Today</td>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>₹ 21,80,49,597</td>
            </tr>
            {goals.slice(0, 1).map((g, idx) => (
              <tr key={idx}>
                <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{g.goal}</td>
                <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>1</td>
                <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>{g.future_cost?.inr || '₹ 21,20,000'}</td>
                <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Future</td>
                <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>₹ 19,62,963</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', fontWeight: 600 }}>Retirement Income(50 %)</td>
              <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>18</td>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 60,00,000</td>
              <td style={{ padding: '12px 8px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Today</td>
              <td style={{ padding: '12px 10px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>₹ 9,08,53,999</td>
            </tr>
            <tr style={{ backgroundColor: '#ff8c32', fontWeight: 900 }}>
              <td colSpan="4" style={{ padding: '14px 12px', border: '1px solid #cbd5e1', fontSize: '13px' }}>Total insurance need</td>
              <td style={{ padding: '14px 12px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '15px' }}>{totalInsuranceNeed}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 11: SUMMARY PAGE */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '35px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          pageBreakAfter: 'always',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            Investment Summary
          </h1>
          <div style={{ width: '150px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img
              src="/assets/report/summary_checklist_image.png"
              alt="Summary Checklist"
              style={{ maxWidth: '150px', maxHeight: '130px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #cbd5e1', marginTop: '8px' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800, textAlign: 'center' }}>
              <th style={{ padding: '14px 12px', border: '1px solid #cbd5e1' }}>Goals</th>
              <th style={{ padding: '14px 12px', border: '1px solid #cbd5e1' }}>Target Year</th>
              <th style={{ padding: '14px 12px', border: '1px solid #cbd5e1' }}>Monthly Investment</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((g, idx) => (
              <tr key={idx}>
                <td style={{ padding: '14px 12px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{g.goal}</td>
                <td style={{ padding: '14px 12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{g.target_year}</td>
                <td style={{ padding: '14px 12px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>{g.monthly_sip?.inr || '—'}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#ff8c32', fontWeight: 900 }}>
              <td colSpan="2" style={{ padding: '16px 14px', border: '1px solid #cbd5e1', fontSize: '14px' }}>Total Monthly Investment</td>
              <td style={{ padding: '16px 14px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '16px' }}>{totalGoalsMonthlySip}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 12: WHAT WE ASSUME? PAGE */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '35px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          pageBreakAfter: 'always',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: 0, lineHeight: 1.1 }}>
            What we<br />assume?
          </h1>
          <div style={{ width: '150px', height: '130px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <img src="/assets/report/real_3d_scroll.png" alt="Scroll Ribbon" style={{ maxWidth: '150px', maxHeight: '130px', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #cbd5e1', marginTop: '8px' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800 }}>
              <th style={{ padding: '14px 16px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Assumptions</th>
              <th style={{ padding: '14px 16px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Life Expectancy (Years)</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>80</td>
            </tr>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Inflation (Post Retirement)</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>6.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>ROI (Post Retirement)</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>8.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Inflation (Pre Retirement)</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>6.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Return On Investment</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>12.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Yearly Increse in PF Contribution</td>
              <td style={{ padding: '13px 16px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PAGE 13: OUR SERVICES PAGE */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: '30px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pageBreakAfter: 'always',
        }}
      >
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '220px', zIndex: 1 }} viewBox="0 0 220 220">
          <polygon points="0,0 220,0 0,220" fill="#002b80" />
        </svg>

        <svg style={{ position: 'absolute', bottom: 0, right: 0, width: '360px', height: '360px', zIndex: 1 }} viewBox="0 0 360 360">
          <polygon points="360,0 360,360 0,360" fill="#ff8c32" />
        </svg>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '16px' }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '48px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#000000', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Our Services
          </h1>
          <div style={{ width: '80px', height: '4px', backgroundColor: '#ff8c32', margin: '0 auto 28px auto', borderRadius: '2px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', maxWidth: '420px', margin: '0 auto' }}>
            {[
              'Financial Planning',
              'Mutual Funds',
              'PMS',
              'NRI Investments',
              'Life Insurance',
              'Health Insurance',
              'General Insurance',
              'Estate Planning',
            ].map((srv, idx) => (
              <div
                key={idx}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  padding: '10px 22px',
                  borderRadius: '20px',
                  backgroundColor: '#f8fafc',
                  boxShadow: '4px 4px 12px rgba(0, 26, 102, 0.06), -4px -4px 12px rgba(255, 255, 255, 0.9)',
                  boxSizing: 'border-box',
                }}
              >
                {/* 3D Neomorphic Tick Badge */}
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#e6effd',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '3px 3px 8px rgba(0, 26, 102, 0.15), -3px -3px 8px rgba(255, 255, 255, 0.9), inset 1.5px 1.5px 3px rgba(255, 255, 255, 0.9), inset -1.5px -1.5px 3px rgba(0, 26, 102, 0.08)',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: '#002b80', fontSize: '18px', fontWeight: 900 }}>✓</span>
                </div>

                <span style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                  {srv}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PAGE 14: TESTIMONIALS PAGE (Pixel-Perfect Spaced Vector Redesign) */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          boxSizing: 'border-box',
          padding: '30px 40px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pageBreakAfter: 'always',
          overflow: 'hidden',
        }}
      >
        {/* Top-Left Dark Blue Geometric Accent */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '190px', height: '190px', zIndex: 1 }}
          viewBox="0 0 190 190"
        >
          <polygon points="0,0 190,0 0,190" fill="#001866" />
        </svg>

        {/* Top Header Logo */}
        <div style={{ textAlign: 'center', zIndex: 2 }}>
          <img src="/assets/wealth-wisdom-logo.png" alt="Wealth Wisdom Logo" style={{ height: '50px', objectFit: 'contain', margin: '0 auto' }} />
        </div>

        {/* Main Title */}
        <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#111827', textAlign: 'center', margin: '10px 0', zIndex: 2, letterSpacing: '-0.02em' }}>
          Testimonials
        </h1>

        {/* 3 Staggered Speech Bubble Testimonial Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 2, marginBottom: '16px' }}>
          {[
            { indentLeft: '0px', indentRight: '45px', tailMargin: '0 0 0 60px', tailAlign: 'flex-start' },
            { indentLeft: '45px', indentRight: '0px', tailMargin: '0 60px 0 0', tailAlign: 'flex-end' },
            { indentLeft: '0px', indentRight: '45px', tailMargin: '0 0 0 60px', tailAlign: 'flex-start' },
          ].map((item, tIdx) => (
            <div
              key={tIdx}
              style={{
                marginLeft: item.indentLeft,
                marginRight: item.indentRight,
                display: 'flex',
                flexDirection: 'column',
                alignItems: item.tailAlign,
              }}
            >
              <div
                style={{
                  backgroundColor: '#f97316',
                  border: '3px solid #001866',
                  borderRadius: '24px',
                  padding: '16px 20px 12px 20px',
                  boxShadow: '4px 5px 0px #001866',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {/* Single Dark Blue Quotation Icon */}
                <div style={{ fontSize: '34px', color: '#001866', lineHeight: 0.9, marginBottom: '4px', fontWeight: 900 }}>
                  ❝
                </div>
                {/* Quote Text */}
                <p style={{ fontSize: '11.5px', fontWeight: 700, lineHeight: 1.4, margin: '0 0 8px 0', color: '#000000' }}>
                  My life has changed after I have got their consulatation. Now I don't have any financial problems. Before I didn't have any saves now I have investments, savings and emergency funds as well!
                </p>
                {/* Author Details */}
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#000000', textAlign: 'right' }}>
                  -Om Baval, Founder and CEO, 21 Spheres
                </div>
              </div>

              {/* Speech Bubble Triangular Pointer Notch */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '14px solid #f97316',
                  margin: item.tailMargin,
                  marginTop: '-2px',
                  filter: 'drop-shadow(2px 3px 0px #001866)',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 15: CONTACT BACK COVER PAGE (100% Static PNG Template) */}
      <div
        className="report-page"
        style={{
          width: '595px',
          height: '842px',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        }}
      >
        <img
          src="/assets/report/last_page_contact_static.png"
          alt="Wealth Wisdom Contact & Address"
          style={{
            width: '595px',
            height: '842px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
});

FullReportTemplate.displayName = 'FullReportTemplate';
