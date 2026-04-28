"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, LucideIcon } from "lucide-react"
import { cn } from "@/utils/cn"

interface AccordionItem {
  id: string
  title: string
  icon?: LucideIcon
  children: React.ReactNode
}

interface MobileAccordionProps {
  items: AccordionItem[]
  className?: string
  accentColor?: string
}

export function MobileAccordion({ items, className, accentColor = "text-pink-600" }: MobileAccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:hidden px-4 mb-12", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        const Icon = item.icon

        return (
          <div 
            key={item.id} 
            className={cn(
              "overflow-hidden rounded-3xl border transition-all duration-300 bg-white dark:bg-neutral-900",
              isOpen ? "border-neutral-200 dark:border-neutral-800 shadow-xl" : "border-neutral-100 dark:border-neutral-800/50 shadow-sm"
            )}
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-800", isOpen && accentColor.replace('text', 'bg').replace('600', '600/10'))}>
                    <Icon className={cn("h-4 w-4", isOpen ? accentColor : "text-neutral-400")} />
                  </div>
                )}
                <span className={cn("text-sm font-black uppercase tracking-widest italic", isOpen ? "text-neutral-900 dark:text-white" : "text-neutral-500")}>
                  {item.title}
                </span>
              </div>
              <ChevronDown className={cn("h-4 w-4 text-neutral-400 transition-transform duration-500", isOpen && "rotate-180")} />
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="px-5 pb-8 pt-2">
                    {item.children}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
