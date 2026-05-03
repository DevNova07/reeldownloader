import { getSeoAlternates } from "@/lib/seo";
import * as React from "react";
import { getDictionary } from "@/i18n";
import FacebookPage from "@/components/templates/FacebookPage";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  
  if (!dict?.platforms?.facebook) {
    console.error("Dictionary missing facebook platform data for locale:", locale);
    return { title: "Facebook Downloader" };
  }
  
  const fb = dict.platforms.facebook;
  
  return {
    title: fb.seo?.title || "Facebook Downloader",
    description: fb.seo?.desc || "Download Facebook videos",
    alternates: getSeoAlternates("facebook", locale),
  };
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const dict = await getDictionary(locale);

  if (!dict?.platforms?.facebook) {
    return (
      <div className="p-20 text-center text-red-500">
        Error: Missing dictionary data for Facebook ({locale})
      </div>
    );
  }

  const { platforms, ...rest } = dict;
  const filteredDict = {
    ...rest,
    platforms: {
      facebook: platforms?.facebook
    }
  };
  
  return (
    <React.Suspense fallback={null}>
      <FacebookPage 
        content={platforms?.facebook} 
        locale={locale} 
        dict={filteredDict} 
        themeColor="blue"
      />
    </React.Suspense>
  );
}
