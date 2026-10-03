'use client';

import React, {
  Suspense,
  use,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useAuth } from '@/lib/supabase/auth-context';
import { resumeService } from '@/lib/supabase/service';
import { ResumeData } from '@/types/resume';

import { EditorPanel } from '@/components/builder/EditorPanel';
import { PreviewPanel } from '@/components/builder/PreviewPanel';
import { TemplateSwitcherModal } from '@/components/builder/TemplateSwitcherModal';

import {
  exportResumeToPDF,
  printResumeViaBrowser,
} from '@/lib/pdf/exporter';

import { getTemplate } from '@/components/resume-templates/registry';

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Download,
  Loader2,
  Printer,
  Save,
  Sparkles,
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    resumeId: string;
  }>;
}

function BuilderContent({
  resumeId,
}: {
  resumeId: string;
}) {
  const searchParams = useSearchParams();
  const autoDownloadTriggered =
    searchParams.get('download') === 'true';

  const {
    user,
    profile,
    loading: authLoading,
  } = useAuth();

  const [resumeData, setResumeData] =
    useState<ResumeData | null>(null);

  const [templateId, setTemplateId] =
    useState('minimal-ats');

  const [resumeTitle, setResumeTitle] =
    useState('Untitled Resume');

  const [loading, setLoading] =
    useState(true);

  const [errorMsg, setErrorMsg] =
    useState<string | null>(null);

  const [saveStatus, setSaveStatus] =
    useState<'saved' | 'saving' | 'error'>(
      'saved'
    );

  const [templateModalOpen, setTemplateModalOpen] =
    useState(false);

  const [downloadDropdownOpen, setDownloadDropdownOpen] =
    useState(false);

  const [isExporting, setIsExporting] =
    useState(false);

  const [viewMode, setViewMode] =
    useState<'editor' | 'preview' | 'split'>(
      'split'
    );

  const saveTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  const isInitialLoad =
    useRef(true);

  /*
   * LOAD RESUME
   */
  useEffect(() => {
    let cancelled = false;

    async function loadResume() {
      try {
        setLoading(true);
        setErrorMsg(null);

        const record =
          await resumeService.getResume(resumeId);

        if (cancelled) {
          return;
        }

        if (!record) {
          setErrorMsg(
            'Resume record not found or inaccessible.'
          );
          return;
        }

        setResumeData(record.resume_data);
        setTemplateId(
          record.template_id || 'minimal-ats'
        );
        setResumeTitle(
          record.title || 'Untitled Resume'
        );
      } catch (error) {
        console.error(
          'Error fetching resume:',
          error
        );

        if (!cancelled) {
          setErrorMsg(
            'Failed to load resume details.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (!authLoading) {
      loadResume();
    }

    return () => {
      cancelled = true;
    };
  }, [resumeId, authLoading]);

  /*
   * AUTOSAVE
   */
  const triggerAutosave = (
    updatedData: ResumeData,
    updatedTitle: string,
    updatedTemplateId: string
  ) => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(
      async () => {
        try {
          await resumeService.updateResume(
            resumeId,
            {
              title: updatedTitle,
              template_id: updatedTemplateId,
              resume_data: updatedData,
            }
          );

          setSaveStatus('saved');
        } catch (error) {
          console.error(
            'Autosave error:',
            error
          );

          setSaveStatus('error');
        }
      },
      1200
    );
  };

  /*
   * CLEANUP AUTOSAVE
   */
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(
          saveTimeoutRef.current
        );
      }
    };
  }, []);

  /*
   * DATA CHANGE
   */
  const handleDataChange = (
    newData: ResumeData
  ) => {
    setResumeData(newData);

    triggerAutosave(
      newData,
      resumeTitle,
      templateId
    );
  };

  /*
   * TITLE CHANGE
   */
  const handleTitleChange = (
    newTitle: string
  ) => {
    setResumeTitle(newTitle);

    if (resumeData) {
      triggerAutosave(
        resumeData,
        newTitle,
        templateId
      );
    }
  };

  /*
   * TEMPLATE CHANGE
   */
  const handleTemplateSelect = (
    newTemplateId: string
  ) => {
    setTemplateId(newTemplateId);

    if (resumeData) {
      triggerAutosave(
        resumeData,
        resumeTitle,
        newTemplateId
      );
    }

    setTemplateModalOpen(false);
  };

  /*
   * MANUAL SAVE
   */
  const handleManualSave = async () => {
    if (!resumeData) {
      return;
    }

    setSaveStatus('saving');

    try {
      await resumeService.updateResume(
        resumeId,
        {
          title: resumeTitle,
          template_id: templateId,
          resume_data: resumeData,
        }
      );

      setSaveStatus('saved');
    } catch (error) {
      console.error(
        'Manual save error:',
        error
      );

      setSaveStatus('error');
    }
  };

  /*
   * DOWNLOAD PDF
   */
  const handleDownloadPDF = async () => {
    if (!resumeData) {
      return;
    }

    setDownloadDropdownOpen(false);
    setIsExporting(true);

    try {
      const authorName =
        resumeData.personal?.fullName ||
        profile?.full_name ||
        user?.email?.split('@')[0] ||
        'User';

      await exportResumeToPDF(
        'resume-preview-document',
        authorName
      );
    } catch (error) {
      console.error(
        'PDF export error:',
        error
      );

      printResumeViaBrowser();
    } finally {
      setIsExporting(false);
    }
  };

  /*
   * AUTOMATIC DOWNLOAD
   *
   * This effect is intentionally after
   * handleDownloadPDF so the function exists
   * before it is referenced.
   */
  useEffect(() => {
    if (
      autoDownloadTriggered &&
      resumeData &&
      !loading
    ) {
      const timer = setTimeout(() => {
        handleDownloadPDF();
      }, 800);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    autoDownloadTriggered,
    resumeData,
    loading,
  ]);

  /*
   * PRINT
   */
  const handlePrint = () => {
    setDownloadDropdownOpen(false);
    printResumeViaBrowser();
  };

  /*
   * LOADING SCREEN
   */
  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />

          <p className="text-xs uppercase tracking-widest text-zinc-400">
            Loading Resume Studio...
          </p>
        </div>
      </div>
    );
  }

  /*
   * ERROR SCREEN
   */
  if (errorMsg || !resumeData) {
    return (
      <div className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-2xl p-8 text-center">

          <div className="w-12 h-12 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="mt-4 text-lg font-serif font-bold">
            Resume Unavailable
          </h2>

          <p className="mt-2 text-xs text-zinc-400">
            {errorMsg ||
              'Could not locate the requested resume.'}
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentTemplate =
    getTemplate(templateId);

  /*
   * MAIN BUILDER
   */
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">

      {/* HEADER */}
      <header className="h-16 bg-[#0a0a0a] border-b border-white/5 px-3 sm:px-6 flex items-center justify-between gap-2 z-30 shrink-0 no-print">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0">

          <Link
            href="/dashboard"
            title="Return to Dashboard"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <input
            type="text"
            value={resumeTitle}
            onChange={(event) => {
              handleTitleChange(
                event.target.value
              );
            }}
            className="bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-[#D4AF37] text-xs sm:text-sm font-serif font-bold text-white focus:outline-none px-1 py-0.5 max-w-[130px] sm:max-w-[240px]"
          />

          <button
            type="button"
            onClick={() => {
              setTemplateModalOpen(true);
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181818] border border-white/10 hover:border-[#D4AF37]/50 text-xs text-zinc-300 transition-colors shrink-0"
          >
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />

            <span className="font-medium text-[11px] text-white">
              {currentTemplate.name}
            </span>

            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
        </div>

        {/* MOBILE VIEW TOGGLE */}
        <div className="flex md:hidden items-center bg-[#141414] p-0.5 rounded-lg border border-white/5">

          <button
            type="button"
            onClick={() => {
              setViewMode('editor');
            }}
            className={
              viewMode === 'editor'
                ? 'px-2.5 py-1 rounded text-xs font-semibold bg-[#D4AF37] text-zinc-950'
                : 'px-2.5 py-1 rounded text-xs font-semibold text-zinc-400'
            }
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => {
              setViewMode('preview');
            }}
            className={
              viewMode === 'preview'
                ? 'px-2.5 py-1 rounded text-xs font-semibold bg-[#D4AF37] text-zinc-950'
                : 'px-2.5 py-1 rounded text-xs font-semibold text-zinc-400'
            }
          >
            Preview
          </button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">

          {/* SAVE STATUS */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400">

            {saveStatus === 'saving' && (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-[#D4AF37]" />
                <span>Saving...</span>
              </>
            )}

            {saveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Saved</span>
              </>
            )}

            {saveStatus === 'error' && (
              <>
                <AlertCircle className="w-3 h-3 text-red-400" />
                <span className="text-red-400">
                  Save failed
                </span>
              </>
            )}
          </div>

          {/* SAVE BUTTON */}
          <button
            type="button"
            onClick={handleManualSave}
            disabled={
              saveStatus === 'saving'
            }
            title="Save to Cloud"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />

            <span className="hidden sm:inline">
              Save
            </span>
          </button>

          {/* DOWNLOAD */}
          <div className="relative">

            <div className="flex items-center rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-zinc-950 shadow-md">

              <button
                type="button"
                onClick={
                  handleDownloadPDF
                }
                disabled={isExporting}
                className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />

                    <span>
                      Exporting...
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />

                    <span>
                      Download PDF
                    </span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setDownloadDropdownOpen(
                    (current) => !current
                  );
                }}
                className="px-2 py-1.5 border-l border-zinc-950/20 hover:bg-black/10 rounded-r-xl transition-colors"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {downloadDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#141414] border border-white/10 rounded-xl shadow-2xl py-1 text-xs text-zinc-300 z-50">

                <button
                  type="button"
                  onClick={
                    handleDownloadPDF
                  }
                  className="w-full text-left px-3.5 py-2 hover:bg-white/5 hover:text-white flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />

                  <span>
                    Direct Download (A4 PDF)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full text-left px-3.5 py-2 hover:bg-white/5 hover:text-white flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-zinc-400" />

                  <span>
                    Print / Save as Vector PDF
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BUILDER AREA */}
      <div className="flex-1 flex overflow-hidden">

        {/* EDITOR */}
        <div
          className={
            viewMode === 'preview'
              ? 'hidden md:flex w-full md:w-1/2 lg:w-5/12 flex-col border-r border-white/5 h-[calc(100vh-64px)]'
              : 'flex w-full md:w-1/2 lg:w-5/12 flex-col border-r border-white/5 h-[calc(100vh-64px)]'
          }
        >
          <EditorPanel
            resumeData={resumeData}
            onChange={handleDataChange}
          />
        </div>

        {/* PREVIEW */}
        <div
          className={
            viewMode === 'editor'
              ? 'hidden md:flex w-full md:w-1/2 lg:w-7/12 flex-col h-[calc(100vh-64px)]'
              : 'flex w-full md:w-1/2 lg:w-7/12 flex-col h-[calc(100vh-64px)]'
          }
        >
          <PreviewPanel
            resumeData={resumeData}
            templateId={templateId}
          />
        </div>
      </div>

      {/* TEMPLATE MODAL */}
      <TemplateSwitcherModal
        isOpen={templateModalOpen}
        onClose={() => {
          setTemplateModalOpen(false);
        }}
        currentTemplateId={templateId}
        onSelectTemplate={
          handleTemplateSelect
        }
      />
    </div>
  );
}

/*
 * PAGE
 */
export default function BuilderPage({
  params,
}: PageProps) {
  const resolvedParams = use(params);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080808] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
        </div>
      }
    >
      <BuilderContent
        resumeId={resolvedParams.resumeId}
      />
    </Suspense>
  );
}