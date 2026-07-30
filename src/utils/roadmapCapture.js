import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Capture the RoadmapTemplate React element and export as a PDF Blob or High-Res PNG Image.
 */
export async function captureRoadmapImage(element) {
  if (!element) {
    throw new Error('Roadmap DOM element reference is null');
  }

  const canvas = await html2canvas(element, {
    scale: 3, // Ultra High Resolution (450 DPI equivalent for crystal clear text)
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');

  // Create A4 PDF using jsPDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

  const pdfBlob = pdf.output('blob');

  return {
    canvas,
    imgData,
    pdfBlob,
  };
}
