'use client';

import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf';

export interface PDFExportOptions {
  fileName?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Export a resume element to an A4 PDF.
 *
 * Uses html2canvas-pro instead of the original html2canvas
 * so modern CSS colors such as lab(), lch(), oklab()
 * and oklch() can be rendered.
 */
export async function exportResumeToPDF(
  elementId: string,
  userFullName: string = 'User',
  options?: PDFExportOptions
): Promise<void> {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error(
      `Resume preview element with id "${elementId}" not found`
    );
  }

  const cleanName = (userFullName || 'Resume')
    .trim()
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_');

  const fileName = `${cleanName}_Resume.pdf`;

  let wrapper: HTMLDivElement | null = null;

  try {
    options?.onProgress?.(10);

    /*
     * --------------------------------------------------
     * 1. Clone the resume
     * --------------------------------------------------
     */

    const clone = element.cloneNode(true) as HTMLElement;

    clone.setAttribute(
      'data-pdf-source',
      elementId
    );

    /*
     * --------------------------------------------------
     * 2. Create temporary off-screen container
     * --------------------------------------------------
     */

    wrapper = document.createElement('div');

    wrapper.style.position = 'fixed';
    wrapper.style.left = '-100000px';
    wrapper.style.top = '0';
    wrapper.style.width = `${element.scrollWidth}px`;
    wrapper.style.margin = '0';
    wrapper.style.padding = '0';
    wrapper.style.background = '#ffffff';
    wrapper.style.zIndex = '999999';
    wrapper.style.pointerEvents = 'none';

    clone.style.width = `${element.scrollWidth}px`;
    clone.style.height = 'auto';
    clone.style.margin = '0';

    /*
     * Remove editor controls/buttons.
     */
    clone
      .querySelectorAll<HTMLElement>('.no-print')
      .forEach((item) => {
        item.remove();
      });

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    options?.onProgress?.(25);

    /*
     * --------------------------------------------------
     * 3. Wait for fonts
     * --------------------------------------------------
     */

    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    /*
     * --------------------------------------------------
     * 4. Wait for images
     * --------------------------------------------------
     */

    const images = Array.from(
      clone.querySelectorAll<HTMLImageElement>('img')
    );

    await Promise.all(
      images.map((img) => {
        if (img.complete) {
          return Promise.resolve();
        }

        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      })
    );

    options?.onProgress?.(35);

    /*
     * --------------------------------------------------
     * 5. Render resume
     * --------------------------------------------------
     *
     * IMPORTANT:
     *
     * Do NOT sanitize lab(), lch(), oklab() or oklch()
     * manually.
     *
     * html2canvas-pro handles these modern CSS colors.
     */

    const canvas = await html2canvas(clone, {
      scale: 2,

      useCORS: true,

      allowTaint: false,

      logging: false,

      backgroundColor: '#ffffff',

      foreignObjectRendering: false,

      imageTimeout: 15000,

      onclone: (clonedDocument) => {
        /*
         * Find the cloned resume.
         */
        const pdfElement =
          clonedDocument.querySelector(
            `[data-pdf-source="${elementId}"]`
          ) as HTMLElement | null;

        if (!pdfElement) {
          return;
        }

        /*
         * Hide editor-only controls.
         */
        pdfElement
          .querySelectorAll<HTMLElement>('.no-print')
          .forEach((item) => {
            item.style.display = 'none';
          });
      },
    });

    options?.onProgress?.(65);

    /*
     * --------------------------------------------------
     * 6. Remove temporary DOM
     * --------------------------------------------------
     */

    wrapper.remove();
    wrapper = null;

    /*
     * --------------------------------------------------
     * 7. Create A4 PDF
     * --------------------------------------------------
     */

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;

    /*
     * PNG is better for resumes because it keeps
     * text, borders and fine lines sharper.
     */
    const imageData = canvas.toDataURL('image/png');

    const imageWidth = pageWidth;

    const imageHeight =
      (canvas.height * imageWidth) /
      canvas.width;

    let heightLeft = imageHeight;
    let position = 0;

    /*
     * --------------------------------------------------
     * 8. First page
     * --------------------------------------------------
     */

    pdf.addImage(
      imageData,
      'PNG',
      0,
      position,
      imageWidth,
      imageHeight,
      undefined,
      'FAST'
    );

    heightLeft -= pageHeight;

    /*
     * --------------------------------------------------
     * 9. Additional pages
     * --------------------------------------------------
     */

    while (heightLeft > 1) {
      position -= pageHeight;

      pdf.addPage();

      pdf.addImage(
        imageData,
        'PNG',
        0,
        position,
        imageWidth,
        imageHeight,
        undefined,
        'FAST'
      );

      heightLeft -= pageHeight;
    }

    options?.onProgress?.(90);

    /*
     * --------------------------------------------------
     * 10. Download
     * --------------------------------------------------
     */

    pdf.save(fileName);

    options?.onProgress?.(100);

  } catch (error) {
    console.error(
      'Resume PDF export failed:',
      error
    );

    throw error;

  } finally {
    /*
     * Always remove temporary DOM if an error occurs.
     */
    if (wrapper) {
      wrapper.remove();
    }
  }
}

/**
 * Alternative browser print function.
 */
export function printResumeViaBrowser() {
  if (typeof window !== 'undefined') {
    window.print();
  }
}