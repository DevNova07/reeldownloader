"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { type Locale } from "@/i18n"
import { getDictionary, type Dictionary } from "@/dictionaries/client"


interface VisualStep {
  title: string
  desc: string
  image?: string
}

interface VisualGuideProps {
  platformName: string
  accentColor: string
  bgAccentColor: string
  Icon: LucideIcon
  steps?: VisualStep[]
}

export function VisualGuide({ platformName, accentColor, bgAccentColor, Icon, steps: customSteps }: VisualGuideProps) {
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname() || ""

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const locale = (pathname.split('/')[1] || 'en') as Locale
  const dict: Dictionary = getDictionary(locale)

  if (!mounted) return null


  const defaultSteps = [
    {
      title: dict.guide.steps[0].title.replace('{platform}', platformName),
      desc: dict.guide.steps[0].desc.replace('{platform}', platformName),
      image: "/images/how-to/step1.webp"
    },
    {
      title: dict.guide.steps[1].title.replace('{platform}', platformName),
      desc: dict.guide.steps[1].desc.replace('{platform}', platformName),
      image: "/images/how-to/step2.webp"
    },
    {
      title: dict.guide.steps[2].title.replace('{platform}', platformName),
      desc: dict.guide.steps[2].desc.replace('{platform}', platformName),
      image: "/images/how-to/step3.webp"
    }
  ]

  const steps = customSteps || defaultSteps

  return (
    <section id="how-to-use" className="px-4 py-10 sm:py-20 bg-white dark:bg-black sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`flex items-center justify-center gap-3 text-3xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-4xl`}>
            <Icon className={`h-10 w-10 ${accentColor}`} />
            {dict.guide.title.replace('{platform}', platformName)}
          </h2>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            {dict.guide.subtitle.replace('{platform}', platformName)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative"
            >
              <div className="relative mb-8 overflow-hidden rounded-3xl border border-neutral-100 bg-neutral-50 shadow-2xl transition-all group-hover:-translate-y-2 dark:border-neutral-800 dark:bg-neutral-900/50">
                <div className={`absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full ${bgAccentColor} text-lg font-black text-white shadow-lg`}>
                  {idx + 1}
                </div>
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                  <Image
                    src={step.image || "/images/how-to/step1.webp"}
                    alt={step.title}
                    fill
                    loading={idx === 0 ? "eager" : "lazy"}
                    priority={idx === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{step.title}</h3>
              <p className="mt-3 text-neutral-500 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
