'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { getTemplateComponent, getTemplate } from '@/components/resume-templates/registry';
import { ZoomIn, ZoomOut, Maximize2, FileText, CheckCircle2 } from 'lucide-react';

interface PreviewPanelProps {
  resumeData: ResumeData;
  templateId: string;
}

export function PreviewPanel({ resumeData, templateId }: PreviewPanelProps) {
  const [zoom, setZoom] = useState<number>(100);
  const TemplateComponent = getTemplateComponent(templateId);
  const currentTemplate = getTemplate(templateId);

  const zoomIn = () => setZoom((z) => Math.min(z + 15, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 15, 60));
  const resetZoom = () => setZoom(100);

  return (
    <div className="flex flex-col h-full bg-[#080808] border-l border-white/5 relative">
      {/* Top Preview Controls Toolbar */}
      <div className="h-12 px-4 bg-[#0d0d0d] border-b border-white/5 flex items-center justify-between text-xs text-zinc-400 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-semibold text-white truncate max-w-[150px] sm:max-w-none">
            {currentTemplate.name}
          </span>
          <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-zinc-400 font-mono hidden sm:inline">
            A4 Standard (210 × 297mm)
          </span>
        </div>

        {/* Zoom Level Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={zoomOut}
            title="Zoom Out"
            className="p-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetZoom}
            className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono hover:bg-white/10 text-zinc-200"
          >
            {zoom}%
          </button>
          <button
            onClick={zoomIn}
            title="Zoom In"
            className="p-1.5 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-[#070707] custom-scroll print-area-wrapper">
        <div
          id="resume-preview-document"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease'
          }}
          className="a4-page-container shadow-2xl rounded-sm transition-all"
        >
          <TemplateComponent resume={resumeData} />
        </div>
      </div>
    </div>
  );
}
