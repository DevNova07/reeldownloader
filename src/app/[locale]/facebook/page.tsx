import { getDictionary } from "@/i18n";
import FacebookView from "./FacebookView";

export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = params.locale;
  const dict = await getDictionary(locale);

  return <FacebookView dict={dict} locale={locale} />;
}
