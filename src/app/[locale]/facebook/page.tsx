import { getDictionary } from "@/i18n";
import FacebookView from "./FacebookView";
import { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  const dict = await getDictionary(locale);
  const fb = dict.platforms.facebook;
  
  return {
    title: fb.seo.title,
    description: fb.seo.desc,
    alternates: {
      canonical: `https://savclip.net/${locale}/facebook`,
    },
  };
}

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return <FacebookView dict={dict} locale={locale} />;
}
