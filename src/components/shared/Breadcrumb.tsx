"use client"

import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
  locale: string;
}

export function Breadcrumb({ items, locale }: BreadcrumbProps) {
  // Map label/href to name/item for compatibility with the newer Breadcrumbs component
  const mappedItems = items.map(item => ({
    name: item.label,
    item: item.href.startsWith('http') ? item.href : `${locale === 'en' ? '' : '/' + locale}${item.href.startsWith('/') ? item.href : '/' + item.href}`
  }));

  // Always add Home at the beginning if not present
  const finalItems = [
    { name: "Home", item: `${locale === 'en' ? '/' : '/' + locale}` },
    ...mappedItems
  ];

  return <Breadcrumbs items={finalItems} />;
}
