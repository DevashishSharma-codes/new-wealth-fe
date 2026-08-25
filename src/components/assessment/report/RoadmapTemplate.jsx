import React, { forwardRef } from 'react';
import { formatGoalTitle, getActualChildName } from '../../../utils/formatters';

/**
 * RoadmapTemplate React Component - 100% Exact Canva Template Replica
 * Draws custom SVG arrow pointer cards (rounded rectangle with pointer tip) on alternating sides of the road.
 * Top-Right Wealth Wisdom Crest Logo.
 */
export const RoadmapTemplate = forwardRef(({ goals = [], childrenData = [], clientName = '' }, ref) => {
  const sortedGoals = [...goals].sort((a, b) => {
    const yA = a.target_year || a.year || 0;
    const yB = b.target_year || b.year || 0;
    return yA - yB;
  });

  const chunkSize = 8; // Fits up to 8 goals per page, automatically creating a new page if > 8
  const pages = [];
  if (sortedGoals.length === 0) {
    pages.push([]);
  } else {
    for (let i = 0; i < sortedGoals.length; i += chunkSize) {
      pages.push(sortedGoals.slice(i, i + chunkSize));
    }
  }

  return (
    <div ref={ref} id="roadmap-template-capture">
      {pages.map((pageGoals, pageIdx) => {
        const count = pageGoals.length;
        const startY = 160;
        const endY = 720;
        const availableHeight = endY - startY;

        const isCompact = count > 5;
        const yearFontSize = isCompact ? '14px' : '16px';
        const titleFontSize = isCompact ? '12px' : '13px';

        return (
          <div
            key={pageIdx}
            className="report-page"
            style={{
              position: 'relative',
              width: '595px',
              height: '842px',
              margin: '0 auto',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              boxSizing: 'border-box',
              fontFamily: '"Montserrat", "Segoe UI", Helvetica, Arial, sans-serif',
              pageBreakAfter: 'always',
            }}
          >
            {/* Title */}
            <div style={{ position: 'absolute', top: '35px', left: '40px', zIndex: 10 }}>
              <h1
                style={{
                  fontSize: '32px',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Your<br />Financial<br />Roadmap {pages.length > 1 ? `(${pageIdx + 1}/${pages.length})` : ''}
              </h1>
            </div>

            {/* Top Right Logo */}
            <div style={{ position: 'absolute', top: '35px', right: '40px', zIndex: 10 }}>
              <img
                src="/assets/wealth-wisdom-logo.png"
                alt="Wealth Wisdom Logo"
                style={{ height: '52px', objectFit: 'contain' }}
              />
            </div>

            {/* Smooth Winding Road SVG Background */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '595px',
                height: '842px',
                zIndex: 1,
              }}
              viewBox="0 0 595 842"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Road Outer Border */}
              <path
                d="M 280 0 C 350 150, 310 240, 290 350 C 270 460, 240 600, 310 740 L 330 842"
                stroke="#eab308"
                strokeWidth="56"
                strokeLinecap="square"
                style={{ opacity: 0.35 }}
              />
              {/* Dark Asphalt Path */}
              <path
                d="M 280 0 C 350 150, 310 240, 290 350 C 270 460, 240 600, 310 740 L 330 842"
                stroke="#262626"
                strokeWidth="52"
                strokeLinecap="square"
              />
              {/* Yellow Dashed Center Line */}
              <path
                d="M 280 0 C 350 150, 310 240, 290 350 C 270 460, 240 600, 310 740 L 330 842"
                stroke="#eab308"
                strokeWidth="4"
                strokeDasharray="14 12"
              />
            </svg>

            {/* Dynamic Blocks with Auto-Expanding Pill Cards Closer to the Road */}
            {pageGoals.map((goal, idx) => {
              const year = goal.target_year || goal.year || 'TBD';
              const title = formatGoalTitle(goal, childrenData, sortedGoals);
              const isLeft = idx % 2 === 0;

              let yTop = startY;
              if (count > 1) {
                const step = availableHeight / (count - 1);
                yTop = startY + idx * step;
              } else {
                yTop = startY + 200;
              }

              // Positioned with a clean safety margin (Left: 20px, Right: 355px) to guarantee ZERO collision with the road
              const leftPos = isLeft ? '20px' : '355px';

              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    zIndex: 10,
                    top: `${yTop}px`,
                    left: leftPos,
                    width: '200px',
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      minWidth: '125px',
                      maxWidth: '185px',
                      width: 'fit-content',
                      backgroundColor: '#ffffff',
                      border: '2.5px solid #002b80',
                      borderRadius: isLeft ? '16px 2px 16px 16px' : '2px 16px 16px 16px',
                      padding: '10px 14px',
                      boxShadow: '0 4px 14px rgba(0, 43, 128, 0.14)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span style={{ fontSize: yearFontSize, fontWeight: 900, color: '#002b80', lineHeight: 1.1, marginBottom: '4px' }}>
                      {year}
                    </span>
                    <span
                      style={{
                        fontSize: titleFontSize,
                        fontWeight: 800,
                        color: '#0f172a',
                        textAlign: 'center',
                        lineHeight: 1.25,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                        maxWidth: '100%',
                      }}
                    >
                      {title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
});

RoadmapTemplate.displayName = 'RoadmapTemplate';
