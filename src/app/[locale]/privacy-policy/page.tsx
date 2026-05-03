import * as React from "react"
import { Shield, Lock, Eye, FileText } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-600">
            <Shield className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase italic text-neutral-900 dark:text-white">Privacy Policy</h1>
            <p className="text-sm font-bold text-neutral-500 tracking-widest uppercase italic mt-1 hidden sm:block">Last Updated: April 2026</p>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 space-y-12">
          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-4 text-neutral-900 dark:text-white">
              <Lock className="h-5 w-5" />
              <h2 className="text-2xl font-black m-0">1. Commitment to Privacy</h2>
            </div>
            <p className="leading-relaxed font-medium">
              At SavClip (accessible from savclip.net), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SavClip and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-6">2. Log Files & Data Processing</h2>
            <p className="leading-relaxed mb-4">
              SavClip follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>
            <div className="bg-pink-500/5 border-l-4 border-pink-500 p-6 rounded-r-2xl">
               <p className="text-sm font-bold text-pink-600 dark:text-pink-400 m-0">Zero Tracking Policy:</p>
               <p className="text-sm font-medium mt-2 m-0">We do not store or log the URLs you process through our downloader. Your activity remains private and stateless.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-6">3. Cookies and Web Beacons</h2>
            <p className="leading-relaxed">
              Like any other website, SavClip uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-6 m-0">4. Google DoubleClick DART Cookie</h2>
            <p className="leading-relaxed mt-4">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to savclip.net and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-pink-600 hover:underline">https://policies.google.com/technologies/ads</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-6">5. CCPA & GDPR Data Protection Rights</h2>
            <p className="leading-relaxed mb-4">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-8 space-y-4 font-medium">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data.</li>
            </ul>
          </section>

          <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-4">6. Consent</h2>
            <p className="leading-relaxed font-bold">
              By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
