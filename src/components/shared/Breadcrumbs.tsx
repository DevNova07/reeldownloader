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
    <div className="flex flex-col gap-2 mb-6">
      <nav className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-neutral-400">
        {items.map((item, index) => (
          <React.Fragment key={item.item}>
            {index > 0 && <ChevronRight className="h-3 w-3 text-neutral-600" />}
            {index === items.length - 1 ? (
              <span className="text-neutral-500 truncate max-w-[150px] sm:max-w-none">{item.name}</span>
            ) : (
              <Link 
                href={item.item}
                className="hover:text-[#a4d444] transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Trust Rating Bar */}
      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-neutral-500">
        <div className="flex items-center gap-1 text-[#a4d444]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
          <span className="ml-1">{rating}</span>
        </div>
        <span className="text-neutral-700 dark:text-neutral-300">|</span>
        <span>{reviewCount} Reviews</span>
      </div>

      {/* JSON-LD Schema */}
      <StructuredData type="BreadcrumbList" data={items} />
    </div>
  )
}
