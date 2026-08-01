import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates an ultra-high resolution (300 DPI), crystal-clear, high-fidelity PDF report.
 * Uses scale: 2 (300 DPI) and JPEG 0.92 high-fidelity compression for razor-sharp text and graphics (~3.5MB file size).
 */
/**
 * Generates an ultra-high resolution (300 DPI), crystal-clear, high-fidelity PDF report.
 * Uses scale: 3 (450 DPI) for razor-sharp text and graphics.
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
      scale: 2.5, // 375 DPI Ultra-Sharp High-Definition Resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 595,
      height: 842,
      onclone: (clonedDoc) => {
        const clonedPages = clonedDoc.querySelectorAll('.report-page');
        clonedPages.forEach((p) => {
          p.style.webkitFontSmoothing = 'antialiased';
          p.style.mozOsxFontSmoothing = 'grayscale';
          p.style.textRendering = 'optimizeLegibility';
        });
      },
    });

    // Lossless PNG encoding guarantees 100% crystal-clear font rendering without compression artifacts
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
 * Triggers instant, zero-delay browser download of a PDF Blob.
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

