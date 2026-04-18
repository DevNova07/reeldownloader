import * as React from "react"
import { Check, Info, Shield, Zap } from "lucide-react"

export interface ArticleSection {
  type: "paragraph" | "heading" | "list" | "callout" | "table"
  level?: 2 | 3 | 4
  content?: string
  items?: string[]
  title?: string
  columns?: string[]
  rows?: string[][]
}

interface RichArticleProps {
  sections?: ArticleSection[] | string
  accentColor?: string
  boilerplate?: string
}

export function RichArticle({ sections, accentColor = "text-pink-600", boilerplate }: RichArticleProps) {
  // Backward compatibility for old string content
  if (typeof sections === "string") {
    return (
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium opacity-90 first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left space-y-4">
          <div dangerouslySetInnerHTML={{ __html: sections.replace(/\n\n/g, '<br/><br/>') }} />
          {boilerplate && (
            <div className="mt-12 pt-12 border-t border-neutral-100 dark:border-neutral-800 opacity-60 italic text-sm">
               <div dangerouslySetInnerHTML={{ __html: boilerplate.replace(/\n\n/g, '<br/><br/>') }} />
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!sections || sections.length === 0) return null

  return (
    <div className="flex flex-col gap-10">
      {sections.map((section, idx) => {
        switch (section.type) {
          case "heading":
            const HeadingTag = `h${section.level || 3}` as React.ElementType
            return (
              <HeadingTag
                key={idx}
                className={`font-black uppercase italic tracking-widest text-neutral-900 dark:text-white ${
                  section.level === 2 ? "text-3xl" : "text-xl mt-4"
                }`}
              >
                {section.content}
              </HeadingTag>
            )

          case "paragraph":
            return (
              <p
                key={idx}
                className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium opacity-90"
              >
                {section.content}
              </p>
            )

          case "list":
            return (
              <ul key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.items?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800"
                  >
                    <Check className={`h-5 w-5 mt-0.5 shrink-0 ${accentColor}`} />
                    <span className="text-neutral-600 dark:text-neutral-400 font-bold text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )

          case "callout":
            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-3xl p-8 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-900/40 dark:to-neutral-900/20 border-l-4 border-pink-600 shadow-2xl`}
              >
                <div className="flex gap-4">
                  <Info className={`h-8 w-8 shrink-0 ${accentColor}`} />
                  <div>
                    <h4 className="font-black text-neutral-900 dark:text-white uppercase italic tracking-tighter text-lg mb-2">
                      {section.title || "Pro Tip"}
                    </h4>
                    <p className="text-neutral-500 dark:text-neutral-400 font-bold opacity-80">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            )

          case "table":
            return (
              <div key={idx} className="overflow-hidden rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-neutral-50 dark:bg-neutral-900">
                    <tr>
                      {section.columns?.map((col, i) => (
                        <th
                          key={i}
                          className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 bg-white dark:bg-black">
                    {section.rows?.map((row, i) => (
                      <tr key={i} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={`px-6 py-4 text-sm font-bold ${
                              j === 0 ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
