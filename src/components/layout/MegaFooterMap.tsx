import Link from "next/link";
import { getDictionary } from "@/i18n";
import { PLATFORM_NAV_CONFIG } from "@/lib/nav-config";

interface MegaFooterMapProps {
  locale: string;
  dict: any;
}

export async function MegaFooterMap({ locale, dict }: MegaFooterMapProps) {

  const getLabel = (href: string, fallback: string) => {
    const slug = href.replace("/", "").replace(/-/g, "_");
    const platforms = dict.platforms as any;
    const targets = ["instagram", "facebook", "tiktok", "youtube", "snapchat", "telegram", "twitter", "seo_pages"];
    
    for (const p of targets) {
      if (platforms?.[p]?.[slug]?.title) {
        return platforms[p][slug].title;
      }
    }
    return fallback;
  };

  const getLocalizedHref = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (locale === "en" && cleanPath === "/") return "/";
    return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
  };

  return (
    <div className="mt-0 pt-0">
      <div className="mb-8 text-center">
        <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-neutral-400 dark:text-neutral-500">
          Our Global Tool Directory
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {Object.entries(PLATFORM_NAV_CONFIG).map(([key, platform]) => (
          <div key={key} className="flex flex-col gap-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-white border-b-2 border-pink-500/20 pb-4 mb-2">
              {dict.categories?.[key as keyof typeof dict.categories] || platform.id}
            </h3>
            
            <div className="space-y-8">
              {platform.categories.map((category) => (
                <div key={category.titleKey} className="flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                    {dict.navbar?.[category.titleKey as keyof typeof dict.navbar] || category.titleKey}
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={getLocalizedHref(link.href)}
                          className="text-[13px] font-bold text-neutral-500 hover:text-pink-600 dark:text-neutral-400 transition-all hover:translate-x-1 inline-block"
                        >
                          {getLabel(link.href, link.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
