import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  locale: string;
  platform: string;
  platformPath: string;
  toolTitle: string;
}

export function Breadcrumbs({ locale, platform, platformPath, toolTitle }: BreadcrumbsProps) {
  const isEn = locale === 'en';
  const homePath = isEn ? '/' : `/${locale}`;
  const localizedPlatformPath = isEn ? `/${platformPath}` : `/${locale}/${platformPath}`;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://instasnap.net${homePath}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": platform,
        "item": `https://instasnap.net${localizedPlatformPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolTitle,
        "item": null
      }
    ]
  };

  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <ol className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        <li>
          <Link href={homePath} className="flex items-center hover:text-pink-600 transition-colors">
            <Home className="h-3 w-3 mr-1" />
            <span>Home</span>
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <ChevronRight className="h-3 w-3 text-neutral-300 dark:text-neutral-700" />
          <Link href={localizedPlatformPath} className="hover:text-pink-600 transition-colors">
            {platform}
          </Link>
        </li>
        <li className="flex items-center space-x-2">
          <ChevronRight className="h-3 w-3 text-neutral-300 dark:text-neutral-700" />
          <span className="text-neutral-900 dark:text-white truncate max-w-[150px] sm:max-w-none">
            {toolTitle}
          </span>
        </li>
      </ol>
    </nav>
  );
}
