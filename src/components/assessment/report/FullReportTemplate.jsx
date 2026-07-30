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

  const fmtInrRange = (bInr) => {
    const low = Math.round(bInr * 0.85);
    const high = Math.round(bInr * 1.15);
    return `₹${low.toLocaleString('en-IN')} - ₹${high.toLocaleString('en-IN')}`;
  };

  const getDynamicTourOptions = (goalObj, formObj, calcObj) => {
    // 1. Check if backend calculationResult or goal object explicitly passed tour slots / destinations
    let explicit = goalObj?.suggested_tours || goalObj?.tour_slots || goalObj?.destinations || goalObj?.selected_countries || goalObj?.countries || calcObj?.tour_slots || formObj?.foreignTourDestinations || [];

    if (typeof explicit === 'string') {
      explicit = explicit.split(',').map(s => s.trim());
    }

    if (Array.isArray(explicit) && explicit.length > 0) {
      const list = [];
      explicit.forEach(item => {
        if (typeof item === 'object' && item && item.name) {
          let matched = DB_TOUR_DESTINATIONS.find(d => d.name.toLowerCase().includes(item.name.toLowerCase()));
          list.push({
            flag: matched ? matched.flag : '✈️',
            name: item.name,
            cost: item.cost || (matched ? fmtInrRange(matched.budget) : '₹3,50,000 - ₹5,00,000'),
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
      if (list.length > 0) return list;
    }

    // 2. Otherwise compute budget dynamically from goal's today_cost / current_cost
    let rawCostStr = goalObj?.current_cost?.inr || goalObj?.today_cost || goalObj?.cost || '200000';
    if (typeof rawCostStr === 'object') rawCostStr = rawCostStr.inr || '200000';
    let budgetVal = parseFloat(String(rawCostStr).replace(/[^0-9.]/g, ''));
    if (isNaN(budgetVal) || budgetVal <= 0) budgetVal = 200000;

    // Find 3 closest database destinations matching the exact budget
    const sorted = [...DB_TOUR_DESTINATIONS].sort((a, b) => Math.abs(a.budget - budgetVal) - Math.abs(b.budget - budgetVal));
    const top3 = sorted.slice(0, 3);

    return top3.map(d => ({
      flag: d.flag,
      name: d.name,
      cost: fmtInrRange(d.budget),
    }));
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

        const isForeignTour = goalName.toLowerCase().includes('foreign') || goalName.toLowerCase().includes('tour');
        const isEducation = goalName.toLowerCase().includes('graduation') || goalName.toLowerCase().includes('college') || goalName.toLowerCase().includes('university');

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
                <div style={{ width: '210px', height: '210px', marginTop: '-10px' }}>
                  <img src={iconPath} alt={goalName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#002b80', letterSpacing: '0.05em' }}>WEALTH WISDOM</div>
                  <div style={{ fontSize: '8px', fontWeight: 700, color: '#ff8c32', letterSpacing: '0.08em' }}>TAKE CHARGE OF YOUR FUTURE</div>
                </div>

                <div>
                  <h1 style={{ fontSize: '36px', fontWeight: 900, color: '#0f172a', margin: '0 0 30px 0' }}>
                    Suggested Foreign<br />Tour Options
                  </h1>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '420px', margin: '0 auto' }}>
                    {getDynamicTourOptions(g, formData, calculationResult).map((cOpt, cIdx) => (
                      <div key={cIdx} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <span style={{ fontSize: '36px' }}>{cOpt.flag}</span>
                        <div>
                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{cOpt.name}</div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: '#334155' }}>{cOpt.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ alignSelf: 'flex-end', width: '260px', height: '260px' }}>
                  <img src="/assets/report/real_3d_paper_plane.png" alt="Paper Plane" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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

                <div>
                  <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '0 0 10px 0' }}>
                    Suggested Universities<br />&amp; Colleges
                  </h1>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '20px' }}>
                    Today's Cost: {currentCost}
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '12px 0', fontWeight: 800, fontSize: '15px' }}>IIT Bombay</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>₹15,00,000</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '12px 0', fontWeight: 800, fontSize: '15px' }}>Shri Ram College of Commerce</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>₹12,00,000</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '12px 0', fontWeight: 800, fontSize: '15px' }}>Maulana Azad Institute of Dental Sciences</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>₹35,00,000</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '12px 0', fontWeight: 800, fontSize: '15px' }}>Kazakh National Medical University</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>₹40,00,000</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #cbd5e1' }}>
                        <td style={{ padding: '12px 0', fontWeight: 800, fontSize: '15px' }}>First Moscow State Medical University</td>
                        <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 800, fontSize: '15px' }}>₹45,00,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style={{ alignSelf: 'flex-end', width: '240px', height: '240px' }}>
                  <img src="/assets/report/real_3d_suggested_uni.png" alt="School Building" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
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
          <div style={{ width: '180px', height: '180px' }}>
            <img src="/assets/report/real_3d_retirement.png" alt="Beach Chair" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        {/* 3 Top Pills Row */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Retirement Age</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{clientRetAge}</div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Retirement Period</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{clientRetPeriod}</div>
          </div>
          <div style={{ flex: 1, backgroundColor: '#f1f5f9', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: '#64748b' }}>Years to Retirement</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>{clientYearsToRet}</div>
          </div>
        </div>

        {/* Dark Blue Corpus Pill */}
        <div style={{ backgroundColor: '#001a66', borderRadius: '24px', padding: '16px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '14px', color: '#ff8c32', fontWeight: 600 }}>Corpus Required</div>
          <div style={{ fontSize: '30px', fontWeight: 900, color: '#ff8c32', marginTop: '2px' }}>{clientCorpusReq}</div>
        </div>

        {/* Provisions Made */}
        <div style={{ backgroundColor: '#001a66', borderRadius: '18px', padding: '12px', textAlign: 'center', color: '#ff8c32', fontSize: '14px', fontWeight: 700 }}>
          Provisions Made (PF, NPS &amp; SA)
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
            Insurance<br />Calculations
          </h1>
          <div style={{ width: '160px', height: '160px' }}>
            <img src="/assets/report/insurance_cal_image1.png" alt="Shield Hand" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', border: '1px solid #cbd5e1' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800, textAlign: 'center' }}>
              <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Goals to be protected</th>
              <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>For/ After years</th>
              <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Amount</th>
              <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Today's/ Future cost</th>
              <th style={{ padding: '10px', border: '1px solid #cbd5e1' }}>INSURANCE REQUIRED</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Household Expense</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>18</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 1,44,00,000</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Today</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 21,80,49,597</td>
            </tr>
            {goals.slice(0, 1).map((g, idx) => (
              <tr key={idx}>
                <td style={{ padding: '10px', border: '1px solid #cbd5e1' }}>{g.goal}</td>
                <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>1</td>
                <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>{g.future_cost?.inr || '₹ 21,20,000'}</td>
                <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Future</td>
                <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 19,62,963</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1' }}>Retirement Income(50 %)</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>18</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 60,00,000</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Today</td>
              <td style={{ padding: '10px', border: '1px solid #cbd5e1', textAlign: 'right' }}>₹ 9,08,53,999</td>
            </tr>
            <tr style={{ backgroundColor: '#ff8c32', fontWeight: 900 }}>
              <td colSpan="4" style={{ padding: '12px', border: '1px solid #cbd5e1', fontSize: '13px' }}>Total insurance need</td>
              <td style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '15px' }}>{totalInsuranceNeed}</td>
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

        <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', textAlign: 'center', margin: '0 0 20px 0' }}>
          Summary
        </h1>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #cbd5e1' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800, textAlign: 'center' }}>
              <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Goals</th>
              <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Target Year</th>
              <th style={{ padding: '12px', border: '1px solid #cbd5e1' }}>Monthly Investment</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((g, idx) => (
              <tr key={idx}>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', fontWeight: 600 }}>{g.goal}</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{g.target_year}</td>
                <td style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'right', fontWeight: 700 }}>{g.monthly_sip?.inr || '—'}</td>
              </tr>
            ))}
            <tr style={{ backgroundColor: '#ff8c32', fontWeight: 900 }}>
              <td colSpan="2" style={{ padding: '14px', border: '1px solid #cbd5e1', fontSize: '14px' }}>Total Monthly Investment</td>
              <td style={{ padding: '14px', border: '1px solid #cbd5e1', textAlign: 'right', fontSize: '16px' }}>{totalGoalsMonthlySip}</td>
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
            What we<br />assume?
          </h1>
          <div style={{ width: '160px', height: '160px' }}>
            <img src="/assets/report/real_3d_scroll.png" alt="Scroll Ribbon" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', border: '1px solid #cbd5e1' }}>
          <thead>
            <tr style={{ backgroundColor: '#ff8c32', color: '#000000', fontWeight: 800 }}>
              <th style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'left' }}>Assumptions</th>
              <th style={{ padding: '12px', border: '1px solid #cbd5e1', textAlign: 'center' }}>Values</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Life Expectancy (Years)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>80</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Inflation (Post Retirement)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>6.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>ROI (Post Retirement)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>8.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Inflation (Pre Retirement)</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>6.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Return On Investment</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>12.0%</td>
            </tr>
            <tr>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', fontWeight: 700 }}>Yearly Increse in PF Contribution</td>
              <td style={{ padding: '10px 12px', border: '1px solid #cbd5e1', textAlign: 'center', fontWeight: 800, fontSize: '15px' }}>5%</td>
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
          <h1 style={{ fontSize: '44px', fontWeight: 900, color: '#001a66', textAlign: 'center', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
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

      {/* PAGE 14: TESTIMONIALS PAGE */}
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

        <h1 style={{ fontSize: '38px', fontWeight: 900, color: '#0f172a', textAlign: 'center', margin: 0 }}>
          Testimonials
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[1, 2, 3].map((tIdx) => (
            <div
              key={tIdx}
              style={{
                backgroundColor: '#ff8c32',
                border: '2.5px solid #002b80',
                borderRadius: '24px',
                padding: '20px 24px',
                color: '#ffffff',
                marginLeft: tIdx === 2 ? '40px' : '0px',
                marginRight: tIdx === 2 ? '0px' : '40px',
              }}
            >
              <div style={{ fontSize: '28px', color: '#002b80', lineHeight: 1, marginBottom: '6px' }}>❝❝</div>
              <p style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.4, margin: '0 0 10px 0', color: '#000000' }}>
                My life has changed after I have got their consulatation. Now I don't have any financial problems. Before I didn't have any saves now I have investments, savings and emergency funds as well!
              </p>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#000000', textAlign: 'right' }}>
                -Om Baval, Founder and CEO, 21 Spheres
              </div>
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
