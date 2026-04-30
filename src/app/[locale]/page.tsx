import * as React from "react"
import { type Locale, getDictionary } from "@/i18n"
import { HomeView } from "./HomeView"

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const fullDict = await getDictionary(locale);
  const { platforms, ...rest } = fullDict;
  const dict = {
    ...rest,
    platforms: {
      instagram: platforms?.instagram
    }
  };

  return <HomeView locale={locale} dict={dict} />
}
