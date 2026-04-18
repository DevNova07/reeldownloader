import * as React from "react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-3xl w-full">
        <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white mb-8">Contact Us</h1>
        <div className="prose prose-pink dark:prose-invert max-w-none">
          <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-8">
            Have questions, feedback, or business inquiries? We&apos;d love to hear from you.
          </p>
          <form className="space-y-6 max-w-md">
            <div>
               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Name</label>
               <input type="text" className="w-full h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 focus:ring-2 focus:ring-pink-500 outline-none" placeholder="Your Name" />
            </div>
            <div>
               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Email</label>
               <input type="email" className="w-full h-12 rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 focus:ring-2 focus:ring-pink-500 outline-none" placeholder="you@example.com" />
            </div>
            <div>
               <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Message</label>
               <textarea rows={4} className="w-full rounded-xl border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-4 focus:ring-2 focus:ring-pink-500 outline-none" placeholder="How can we help?" />
            </div>
            <button type="button" className="h-12 w-full rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition-all shadow-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
