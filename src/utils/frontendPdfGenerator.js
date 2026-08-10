import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Simple OKLCH to RGB converter for CSS sanitization in html2canvas.
 */
function oklchToRgb(lStr, cStr, hStr, aStr) {
  let L = parseFloat(lStr);
  if (lStr.includes('%')) L = L / 100;
  let C = parseFloat(cStr);
  let H = parseFloat(hStr);

  let a = 1;
  if (aStr) {
    a = parseFloat(aStr);
    if (aStr.includes('%')) a = a / 100;
  }

  const hr = (H * Math.PI) / 180;
  const aLab = C * Math.cos(hr);
  const bLab = C * Math.sin(hr);

  const l_ = L + 0.3963377774 * aLab + 0.2158037573 * bLab;
  const m_ = L - 0.1055613458 * aLab - 0.0638541728 * bLab;
  const s_ = L - 0.0894841775 * aLab - 1.291485548 * bLab;

  const lVal = l_ * l_ * l_;
  const mVal = m_ * m_ * m_;
  const sVal = s_ * s_ * s_;

  let r = +4.0767416621 * lVal - 3.3077115913 * mVal + 0.2309699292 * sVal;
  let g = -1.2684380046 * lVal + 2.6097574011 * mVal - 0.3413193965 * sVal;
  let b = -0.0041960863 * lVal - 0.7034186147 * mVal + 1.707614701 * sVal;

  const gamma = (v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
  r = Math.min(255, Math.max(0, Math.round(gamma(r) * 255)));
  g = Math.min(255, Math.max(0, Math.round(gamma(g) * 255)));
  b = Math.min(255, Math.max(0, Math.round(gamma(b) * 255)));

  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function sanitizeOklchInString(str) {
  if (!str || typeof str !== 'string' || !str.includes('oklch')) return str;
  return str.replace(/oklch\(\s*([\d.%]+)\s+([\d.%]+)\s+([\d.%]+)(?:\s*\/\s*([\d.%]+))?\s*\)/gi, (match, l, c, h, a) => {
    try {
      return oklchToRgb(l, c, h, a);
    } catch {
      return '#2b7fff';
    }
  });
}

function sanitizeOklchInDoc(clonedDoc) {
  const styleElements = clonedDoc.querySelectorAll('style');
  styleElements.forEach((s) => {
    if (s.textContent && s.textContent.includes('oklch')) {
      s.textContent = sanitizeOklchInString(s.textContent);
    }
  });

  const allElements = clonedDoc.querySelectorAll('*');
  allElements.forEach((el) => {
    if (el.style && el.style.cssText && el.style.cssText.includes('oklch')) {
      el.style.cssText = sanitizeOklchInString(el.style.cssText);
    }
  });

  try {
    const defaultView = clonedDoc.defaultView || window;
    const colorProps = ['color', 'backgroundColor', 'borderColor', 'outlineColor', 'boxShadow', 'fill', 'stroke'];
    allElements.forEach((el) => {
      const computed = defaultView.getComputedStyle(el);
      colorProps.forEach((prop) => {
        const val = computed[prop];
        if (val && typeof val === 'string' && val.includes('oklch')) {
          el.style[prop] = sanitizeOklchInString(val);
        }
      });
    });
  } catch (e) {
    console.warn('[onclone oklch sanitize error]:', e);
  }
}

/**
 * Generates an ultra-high resolution (300 DPI), crystal-clear, high-fidelity PDF report.
 * Uses scale: 2.5 for razor-sharp text and graphics.
 * @param {HTMLElement} containerElement Container containing .report-page elements
 * @param {string} filename Output PDF filename
 * @param {boolean} autoDownload If true, triggers browser download dialog immediately
 * @returns {Promise<Blob>} The generated PDF Blob
 */
export async function generateFullFrontendPdf(containerElement, filename = 'wealth-wisdom-report.pdf', autoDownload = false) {
  if (!containerElement) {
    throw new Error('Report container element not found for PDF capture.');
  }

  const pageElements = containerElement.querySelectorAll('.report-page');
  if (!pageElements || pageElements.length === 0) {
    throw new Error('No report pages found to generate PDF.');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  for (let i = 0; i < pageElements.length; i++) {
    const pageEl = pageElements[i];

    const canvas = await html2canvas(pageEl, {
      scale: 2.5, // 375 DPI High-Definition Resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 595,
      height: 842,
      onclone: (clonedDoc) => {
        sanitizeOklchInDoc(clonedDoc);
        const clonedPages = clonedDoc.querySelectorAll('.report-page');
        clonedPages.forEach((p) => {
          p.style.webkitFontSmoothing = 'antialiased';
          p.style.mozOsxFontSmoothing = 'grayscale';
          p.style.textRendering = 'optimizeLegibility';
        });
      },
    });

    const imgData = canvas.toDataURL('image/png');

    if (i > 0) {
      pdf.addPage('a4', 'portrait');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297, undefined, 'SLOW');
  }

  if (autoDownload) {
    pdf.save(filename);
  }

  return pdf.output('blob');
}

/**
 * Triggers instant browser download of a PDF Blob.
 */
export function triggerBlobDownload(pdfBlob, filename = 'wealth-wisdom-report.pdf') {
  if (!pdfBlob) return;
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
