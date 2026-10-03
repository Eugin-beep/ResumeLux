import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/supabase/auth-context';
import { SupabaseSetupBanner } from '@/components/ui/SupabaseSetupBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
export const metadata: Metadata = {
  title: 'ResumeLux — Premium Online Resume Builder',
  description:
    'Create professional resumes with premium templates, live editing, cloud saving, and high-quality PDF export. Tailored for students, developers, and executives.',

  keywords: [
    'resume builder',
    'CV maker',
    'executive resume',
    'ATS friendly templates',
    'developer resume',
    'luxury portfolio',
    'PDF resume export',
  ],

  authors: [{ name: 'ResumeLux Studio' }],

  verification: {
    google: 'scXrTbL4MuRPTeJbcp66I8sR6KVSpe4I7rn9rbM_rR0',
  },

  openGraph: {
    title: 'ResumeLux — Premium Online Resume Builder',
    description:
      'Build a resume that gets remembered. Luxury templates, instant live preview, and high-precision PDF export.',
    url: 'https://resume-lux.vercel.app/',
    siteName: 'ResumeLux',
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ResumeLux — Premium Online Resume Builder',
    description:
      'Luxury digital resume studio with ATS compatibility and instant PDF export.',
  },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[#080808] text-white selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
        <AuthProvider>
          <div className="no-print">
            <SupabaseSetupBanner />
          </div>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
