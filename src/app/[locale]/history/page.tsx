import { getDictionary } from "@/i18n";
import HistoryPageClient from "@/components/templates/HistoryPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.common?.history || "Download History",
    description: "View and manage your recent social media downloads.",
    robots: { index: false, follow: false }, // Don't index history pages
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return <HistoryPageClient dict={dict} locale={locale} />;
}
