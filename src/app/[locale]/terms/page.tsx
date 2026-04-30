import * as React from "react"
import { Scale, Gavel, AlertTriangle, FileCheck } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-[60vh] px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600">
            <Scale className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white uppercase italic">Terms of Service</h1>
            <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mt-1">Last Updated: April 2026</p>
          </div>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-400 space-y-12">
          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-4 text-neutral-900 dark:text-white">
              <Gavel className="h-5 w-5" />
              <h2 className="text-2xl font-black uppercase italic m-0">1. Acceptance of Terms</h2>
            </div>
            <p className="leading-relaxed font-medium">
              By accessing the website at <a href="https://savclip.net" className="text-blue-600">savclip.net</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic mb-6">2. Use License & Ethical Usage</h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to use SavClip for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-8 space-y-3 font-medium">
              <li>Use the downloaded materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on SavClip's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <div className="mt-6 p-6 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-2xl">
              <p className="text-sm font-bold text-amber-600 uppercase italic m-0 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> Important Responsibility:
              </p>
              <p className="text-sm font-medium mt-2 m-0 italic">SavClip does not own the media processed through the service. Users are solely responsible for ensuring they have the legal right or explicit permission from the original content creator before downloading any media.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic mb-6">3. Disclaimer</h2>
            <p className="leading-relaxed">
              The materials on SavClip's website are provided on an 'as is' basis. SavClip makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="bg-neutral-50 dark:bg-neutral-900/50 p-8 rounded-[2rem] border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic mb-6 m-0">4. Limitations of Liability</h2>
            <p className="leading-relaxed mt-4">
              In no event shall SavClip or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SavClip's website, even if SavClip or a SavClip authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic mb-6">5. Accuracy of Materials & External Links</h2>
            <p className="leading-relaxed mb-4">
              The materials appearing on SavClip's website could include technical, typographical, or photographic errors. SavClip does not warrant that any of the materials on its website are accurate, complete or current. SavClip may make changes to the materials contained on its website at any time without notice.
            </p>
            <p className="leading-relaxed">
              SavClip has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by SavClip of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="pt-10 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-4 text-neutral-900 dark:text-white">
              <FileCheck className="h-5 w-5" />
              <h2 className="text-2xl font-black uppercase italic m-0">6. Governing Law</h2>
            </div>
            <p className="leading-relaxed font-bold">
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
