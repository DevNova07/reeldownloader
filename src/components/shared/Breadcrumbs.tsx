"use client"

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Star } from 'lucide-react'
import { StructuredData } from './StructuredData'

interface BreadcrumbsProps {
  items: { name: string; item: string }[]
  rating?: string
  reviewCount?: string
}

export function Breadcrumbs({ items, rating = "4.9", reviewCount = "12,840" }: BreadcrumbsProps) {
  return (
    <>
      {/* JSON-LD Schema remains for SEO but UI is hidden as requested */}
      <StructuredData type="BreadcrumbList" data={items} />
    </>
  )
}
