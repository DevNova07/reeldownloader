import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { getDictionary, isRTL, locales } from "@/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MegaFooterMap } from "@/components/layout/MegaFooterMap";
import { TrackVisit } from "@/components/shared/TrackVisit";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { InstallPWA } from "@/components/ui/InstallPWA";
import { Suspense } from "react";
import Script from "next/script";
import type { Viewport } from "next";

import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { Analytics } from "@/components/shared/Analytics";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter" 
});

const SITE_URL = "https://savclip.net";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const dict = await getDictionary(locale);
  
  const title = dict.seo?.title || "SavClip - Best Instagram Downloader";
  const description = dict.seo?.description || "Download Instagram Reels, Stories, Posts, and Music easily with SavClip.";
  
  return {
    title: {
      default: title,
      template: `%s | SavClip`
    },
    description: description,
    keywords: dict.seo?.keywords || "instagram downloader, reels download, story downloader",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: Object.fromEntries(locales.map(l => [l, `${SITE_URL}/${l}`]))
    },
    openGraph: {
      title: title,
      description: description,
      url: SITE_URL,
      siteName: "SavClip",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
    robots: {
      index: true,
      follow: true,
    },
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: "SavClip",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#ec4899",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale;
  const direction = isRTL(locale) ? "rtl" : "ltr";
  const fullDict = await getDictionary(locale);
  
  const { platforms, ...rest } = fullDict;
  const layoutDict = {
    ...rest,
    platforms: platforms ? Object.fromEntries(
      Object.entries(platforms).filter(([key]) => key !== 'seo_pages')
    ) : {}
  };

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          id="service-worker-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-white text-neutral-900 antialiased dark:bg-black dark:text-neutral-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <ScrollToTop />
          <Toaster 
            position="top-center" 
            reverseOrder={false}
            toastOptions={{
              className: 'font-sans font-bold rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white p-6 min-w-[320px]',
              duration: 5000,
              style: {
                zIndex: 999999,
                marginTop: '40px',
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
            containerStyle={{
              zIndex: 999999,
            }}
          />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "SavClip",
              "operatingSystem": "WINDOWS, macOS, Android, iOS",
              "applicationCategory": "UtilitiesApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "ratingCount": "15420"
              }
            })
          }}
        />
         <InstallPWA />
          <div className="flex min-h-screen flex-col overflow-x-hidden">
            <Navbar dict={layoutDict} />
            <main className="flex-1">
              <Suspense fallback={null}>
                {props.children}
              </Suspense>
            </main>
            <Footer locale={locale} dict={layoutDict}>
              <MegaFooterMap locale={locale} dict={fullDict} />
            </Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
