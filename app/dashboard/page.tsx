'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/supabase/auth-context';
import { resumeService } from '@/lib/supabase/service';
import { ResumeRecord } from '@/types/user';
import { TEMPLATES } from '@/components/resume-templates/registry';
import { CreateResumeModal } from '@/components/dashboard/CreateResumeModal';
import { DeleteConfirmModal } from '@/components/dashboard/DeleteConfirmModal';
import {
  Sparkles,
  Plus,
  Edit3,
  Copy,
  Trash2,
  Download,
  LayoutDashboard,
  FileText,
  Palette,
  User,
  Settings,
  LogOut,
  Clock,
  Layers,
  Search,
  ExternalLink,
  Menu,
  X,
  FileDown
} from 'lucide-react';
import { exportResumeToPDF } from '@/lib/pdf/exporter';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ResumeRecord | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await resumeService.getResumes(user.id);
      setResumes(data);
    } catch (err) {
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchResumes();
      }
    }
  }, [user, authLoading, router, fetchResumes]);

  const handleDuplicate = async (r: ResumeRecord) => {
    if (!user) return;
    try {
      await resumeService.duplicateResume(r.id, user.id);
      await fetchResumes();
    } catch (err) {
      console.error('Failed to duplicate resume:', err);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await resumeService.deleteResume(deleteTarget.id);
      setDeleteTarget(null);
      await fetchResumes();
    } catch (err) {
      console.error('Failed to delete resume:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleQuickDownload = async (resume: ResumeRecord) => {
    setDownloadingId(resume.id);
    try {
      // Navigate to builder with print/download trigger or directly download
      router.push(`/builder/${resume.id}?download=true`);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredResumes = resumes.filter((r) =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.template_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayName = profile?.full_name?.trim() || user?.user_metadata?.full_name || 'Eugin';

  const lastUpdated = resumes.length > 0
    ? new Date(Math.max(...resumes.map(r => new Date(r.updated_at).getTime()))).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'None yet';

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
          <p className="text-xs uppercase tracking-widest text-zinc-400">Loading ResumeLux Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#0d0d0d] border-r border-white/5 flex-col justify-between shrink-0 fixed h-screen z-30">
        <div>
          {/* Brand */}
          <div className="h-20 px-6 flex items-center border-b border-white/5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#141414] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="font-serif tracking-wider text-lg font-bold text-white">
                Resume<span className="text-[#D4AF37]">Lux</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium text-zinc-400">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#171717] text-white border border-white/5 font-semibold"
            >
              <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
              Dashboard
            </Link>
            <a
              href="#my-resumes"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4 text-zinc-500" />
              My Resumes
            </a>
            <Link
              href="/templates"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              <Palette className="w-4 h-4 text-zinc-500" />
              Templates
            </Link>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors text-left"
            >
              <Plus className="w-4 h-4" />
              Create Resume
            </button>
            <Link
              href="/profile"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              <User className="w-4 h-4 text-zinc-500" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4 text-zinc-500" />
              Settings
            </Link>
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 truncate">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] text-xs font-bold shrink-0">
                {displayName[0]?.toUpperCase() || 'U'}
              </div>
              <div className="truncate text-xs">
                <p className="font-semibold text-white truncate">{displayName}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 text-zinc-500 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-20 bg-[#080808]/80 backdrop-blur-md border-b border-white/5 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg bg-white/5"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-serif font-bold text-white">
                Welcome back, {displayName}
              </h1>
              <p className="text-[11px] text-zinc-400">
                Manage your bespoke digital portfolios and resume versions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />
              <span className="hidden sm:inline">Create New Resume</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Dashboard Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Total Resumes</span>
                <div className="text-2xl font-serif font-bold text-white mt-1">{resumes.length}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Last Updated</span>
                <div className="text-base font-semibold text-white mt-1">{lastUpdated}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Templates Available</span>
                <div className="text-2xl font-serif font-bold text-[#D4AF37] mt-1">{TEMPLATES.length}+</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                <Layers className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Section: My Resumes */}
          <section id="my-resumes" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-white">My Resumes</h2>
                <p className="text-xs text-zinc-400">Select any resume to edit, preview, duplicate, or download as PDF</p>
              </div>

              {/* Search filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter resumes..."
                  className="w-full bg-[#141414] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Empty State */}
            {!loading && resumes.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center bg-[#0d0d0d] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center mx-auto">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white">
                    You haven&apos;t created a resume yet.
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    Start by selecting an ATS-friendly or executive layout and personalize it with your professional milestones.
                  </p>
                </div>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Resume</span>
                </button>
              </div>
            )}

            {/* Resume Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((resume) => {
                const template = TEMPLATES.find((t) => t.id === resume.template_id) || TEMPLATES[0];
                return (
                  <div
                    key={resume.id}
                    className="rounded-2xl bg-[#121212] border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/20">
                          {template.name}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(resume.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-base font-serif font-bold text-white group-hover:text-[#F3E5AB] transition-colors mb-1 truncate">
                        {resume.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-1 mb-4">
                        {resume.resume_data?.personal?.title || 'Professional CV'}
                      </p>

                      <div className="text-[11px] text-zinc-500 space-y-1 border-t border-white/5 pt-3">
                        <div className="flex justify-between">
                          <span>Experience Entries:</span>
                          <span className="text-zinc-300 font-medium">
                            {resume.resume_data?.experience?.length || 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Education Records:</span>
                          <span className="text-zinc-300 font-medium">
                            {resume.resume_data?.education?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Toolbar */}
                    <div className="p-4 bg-[#0e0e0e] border-t border-white/5 flex items-center justify-between gap-1">
                      <Link
                        href={`/builder/${resume.id}`}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDuplicate(resume)}
                        title="Duplicate Resume"
                        className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleQuickDownload(resume)}
                        title="Download PDF"
                        disabled={downloadingId === resume.id}
                        className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <FileDown className="w-3.5 h-3.5 text-blue-400" />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(resume)}
                        title="Delete Resume"
                        className="p-2 text-zinc-400 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm">
          <div className="w-64 bg-[#0d0d0d] border-r border-white/10 h-full p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <span className="font-serif font-bold text-lg text-white">
                  Resume<span className="text-[#D4AF37]">Lux</span>
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1.5 text-xs">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block px-3 py-2 rounded-lg bg-[#181818] text-white font-semibold"
                >
                  Dashboard
                </Link>
                <Link
                  href="/templates"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-white"
                >
                  Templates
                </Link>
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    setCreateModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-[#D4AF37]"
                >
                  + Create Resume
                </button>
                <Link
                  href="/profile"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="block px-3 py-2 rounded-lg text-zinc-400 hover:text-white"
                >
                  Settings
                </Link>
              </nav>
            </div>

            <button
              onClick={() => {
                setMobileSidebarOpen(false);
                signOut();
              }}
              className="flex items-center gap-2 text-xs text-red-400 py-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Create Resume Multi-Step Modal */}
      {user && (
        <CreateResumeModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          userId={user.id}
          onCreated={fetchResumes}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={deleteTarget?.title || ''}
        loading={deleting}
      />
    </div>
  );
}
