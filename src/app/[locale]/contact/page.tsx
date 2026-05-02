"use client"

import * as React from "react"
import { toast } from "react-hot-toast"
import { Send, Loader2, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
      const response = await fetch("https://formspree.io/f/xvgzlowq", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setIsSuccess(true)
        toast.success("Message sent successfully!")
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen px-4 py-20 sm:px-6 lg:px-8 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-3xl w-full relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter text-neutral-900 dark:text-white mb-4 uppercase italic">
            Get in <span className="text-pink-600">Touch</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg font-medium max-w-lg mx-auto hidden sm:block">
            Have questions, feedback, or business inquiries? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-3">
            {isSuccess ? (
              <div className="rounded-3xl bg-green-50 dark:bg-green-900/20 p-12 text-center border border-green-100 dark:border-green-900/30">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase italic mb-2">Message Sent!</h2>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium mb-8">Thank you for reaching out. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-sm font-black text-pink-600 uppercase tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 ml-1">Your Name</label>
                    <input 
                      required
                      name="name"
                      type="text" 
                      className="w-full h-14 rounded-2xl border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all focus:bg-white dark:focus:bg-neutral-900" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                    <input 
                      required
                      name="email"
                      type="email" 
                      className="w-full h-14 rounded-2xl border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all focus:bg-white dark:focus:bg-neutral-900" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 ml-1">Subject</label>
                  <select 
                    name="subject"
                    className="w-full h-14 rounded-2xl border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-6 text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all focus:bg-white dark:focus:bg-neutral-900 appearance-none"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Business Partnership</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 ml-1">Your Message</label>
                  <textarea 
                    required
                    name="message"
                    rows={5} 
                    className="w-full rounded-2xl border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-6 text-sm font-bold focus:ring-2 focus:ring-pink-500 outline-none transition-all focus:bg-white dark:focus:bg-neutral-900" 
                    placeholder="Write your message here..." 
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="h-14 w-full rounded-2xl bg-pink-600 text-white font-black uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-pink-600/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-10">
            <div>
               <h3 className="text-xs font-black text-pink-600 uppercase tracking-[0.3em] mb-6">Contact Info</h3>
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center border border-neutral-100 dark:border-neutral-800">
                        <Send className="h-5 w-5 text-neutral-400" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Direct Email</p>
                        <p className="text-sm font-bold text-neutral-900 dark:text-white">ramzaan0043@gmail.com</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 p-8 border border-neutral-100 dark:border-neutral-800">
               <h3 className="text-sm font-black text-neutral-900 dark:text-white uppercase italic mb-4">Response Time</h3>
               <p className="text-xs font-bold text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  We usually respond to all inquiries within 24-48 business hours. For urgent technical issues, please mention "URGENT" in the subject.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

