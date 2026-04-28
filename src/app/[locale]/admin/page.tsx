"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Activity, HardDrive, Zap, Database, CheckCircle2, XCircle, Clock, Search, RefreshCw, Lock, Instagram, Youtube, Facebook, Ghost, Music, Send, Twitter } from "lucide-react"
import { toast } from "react-hot-toast"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const platformIcons: any = {
  instagram: <Instagram className="h-5 w-5" />,
  tiktok: <Music className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  facebook: <Facebook className="h-5 w-5" />,
  snapchat: <Ghost className="h-5 w-5" />,
  telegram: <Send className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  instagram_v2: <Zap className="h-5 w-5" />,
  other: <Database className="h-5 w-5" />
}

export default function AdminPage() {
  const [password, setPassword] = React.useState("")
  const [isAuthorized, setIsAuthorized] = React.useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/stats?password=${encodeURIComponent(password)}`)
      const result = await response.json()
      if (result.success) {
        setStats(result.stats)
        setIsAuthorized(true)
      } else {
        setError("Invalid Password")
      }
    } catch (err) {
      setError("Server connection failed")
    } finally {
      setIsLoading(false)
    }
  }

  const refreshStats = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/stats?password=${encodeURIComponent(password)}`)
      const result = await response.json()
      if (result.success) {
        setStats(result.stats)
      }
    } catch (err: any) {
      toast.error("Failed to refresh stats cluster.");
    } finally { setIsLoading(false) }
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl"
        >
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-tr from-pink-600 to-purple-600 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">Admin <span className="text-pink-600">Access</span></h1>
            <p className="mt-4 text-sm text-white/50">Enter password to manage API rotation nodes.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-pink-600 transition-colors">
                <Lock className="h-4 w-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-hidden focus:border-pink-600/50 focus:ring-4 focus:ring-pink-600/20 transition-all placeholder:text-white/20"
                autoFocus
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-2xl bg-white py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-pink-600 hover:text-white active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Validating..." : "Unlock Dashboard"}
            </button>

            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs font-bold text-red-500 uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    )
  }

  const maxActivity = stats?.realtime?.activityChart ? Math.max(...stats.realtime.activityChart, 1) : 1

  return (
    <div className="min-h-screen bg-neutral-950 p-6 sm:p-10 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter sm:text-4xl uppercase italic">
              API Cluster <span className="text-pink-600">Status</span>
            </h1>
            <p className="mt-1 text-sm text-white/40 font-medium">Monitoring real-time failover nodes and rate limits.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={refreshStats}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/10 active:scale-95"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="h-10 w-px bg-white/10 mx-2" />
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-2.5">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-green-500">System Live</span>
               </div>
            </div>
          </div>
        </div>

        {/* Global Overview Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: "Total Visitors", value: stats?.totalVisits || 0, icon: <Activity className="text-cyan-500" />, color: "bg-cyan-500/10" },
            { label: "Total Downloads", value: stats?.successfulRequests || 0, icon: <CheckCircle2 className="text-green-500" />, color: "bg-green-500/10" },
            { label: "Total Attempts", value: stats?.totalRequests || 0, icon: <Database className="text-blue-500" />, color: "bg-blue-500/10" },
            { label: "Failed Calls", value: stats?.failedRequests || 0, icon: <XCircle className="text-red-500" />, color: "bg-red-500/10" },
            { label: "Saved API Calls", value: stats?.savedRequests || 0, icon: <Zap className="text-yellow-500" />, color: "bg-yellow-500/10" },
          ].map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}>
                {card.icon}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{card.label}</p>
              <h3 className="mt-1 text-2xl font-black text-white">{card.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Real-time Traffic Section */}
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-1 rounded-3xl border border-white/10 bg-linear-to-br from-white/10 to-transparent p-8 backdrop-blur-3xl relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Zap className="h-24 w-24 text-pink-600" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 mb-2">Live Traffic</p>
              <h2 className="text-5xl font-black text-white italic tracking-tighter">
                {stats?.realtime?.activeUsers || 0}
              </h2>
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">Users handling links now</p>
              
              {/* Activity Sparkline */}
              <div className="mt-4 flex items-end gap-1 h-16 w-full">
                {stats?.realtime?.activityChart?.map((val: number, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ height: 0 }}
                    animate={{ height: `${(val / maxActivity) * 100}%` }}
                    className="flex-1 bg-pink-600/40 rounded-t-[2px] min-h-[2px]"
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/20">
                <span>30m ago</span>
                <span>Real-time Activity</span>
                <span>Now</span>
              </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl"
           >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-white uppercase italic">Most <span className="text-pink-600">Downloaded</span></h3>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Trending content across all platforms</p>
                </div>
                <Clock className="h-5 w-5 text-white/20" />
              </div>
              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                 {stats?.topLinks?.length > 0 ? (
                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                   stats.topLinks.map((link: any, i: number) => (
                     <div key={i} className="group flex items-center justify-between p-3 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4 overflow-hidden">
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/40 group-hover:text-pink-500 transition-colors">
                              {platformIcons[link.platform] || platformIcons.other}
                           </div>
                           <div className="overflow-hidden">
                              <p className="text-sm font-black text-white truncate pr-4">{link.title}</p>
                              <p className="text-[10px] font-bold text-white/20 truncate">{link.url}</p>
                           </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                           <p className="text-lg font-black text-pink-600 leading-none">{link.count}</p>
                           <p className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">Saves</p>
                        </div>
                     </div>
                   ))
                 ) : (
                   <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-3xl">
                      <Search className="h-8 w-8 text-white/10 mb-3" />
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic">No data logged yet...</p>
                   </div>
                 )}
              </div>
           </motion.div>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['instagram', 'tiktok', 'youtube', 'facebook', 'snapchat', 'telegram', 'twitter'].map((platformId, idx) => {
            // Collect all platform versions (e.g. instagram, instagram_v2, instagram_backup1, etc.)
            const relevantPlatformIds = Object.keys(stats?.platforms || {}).filter(p => 
              p === platformId || p.startsWith(`${platformId}_`)
            );

            // Sum totals and collect keys
            let total = 0;
            let success = 0;
            let fail = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const allKeysArr: any[] = [];

            relevantPlatformIds.forEach(id => {
               const pData = stats.platforms[id];
               total += pData.total || 0;
               success += pData.success || 0;
               fail += pData.fail || 0;
               
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               Object.entries(pData.keys || {}).forEach(([k, d]: any) => {
                  allKeysArr.push({ ...d, k, platformId: id });
               });
            });

            // Ensure unique display names for all nodes
            const allKeys = allKeysArr.map((kData, i) => ({
              ...kData,
              displayName: `API ${i + 1}`
            }));

            if (total === 0 && allKeys.length === 0 && !['instagram', 'facebook'].includes(platformId)) return null;

            return (
              <motion.div 
                key={platformId}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl hover:bg-white/8 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600/20 text-pink-600">
                      {platformIcons[platformId] || platformIcons.other}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase italic">{platformId}</h3>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{total} Total Requests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">{success} OK</span>
                    <div className="text-[10px] font-black text-red-500 uppercase tracking-widest">{fail} ERR</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {allKeys.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center">
                      <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest italic">Waiting for request...</p>
                    </div>
                  ) : (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    allKeys.map((kData: any) => (
                      <div key={`${kData.platformId}-${kData.k}`} className="rounded-2xl bg-black/40 p-4 border border-white/5 shadow-inner">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-black text-white/80 uppercase tracking-wider">{kData.displayName}</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${kData.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {kData.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="space-y-1">
                            <p className="text-[8px] font-bold text-white/30 uppercase">Limit</p>
                            <p className="text-sm font-black text-white">{kData.limit === 'unkn' ? '0' : kData.limit}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[8px] font-bold text-white/30 uppercase">Bacha</p>
                            <p className="text-sm font-black text-green-500">{kData.remaining === 'unkn' ? '0' : kData.remaining}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[8px] font-bold text-white/30 uppercase">Use</p>
                            <p className="text-sm font-black text-pink-600">{kData.used}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: (kData.limit !== 'unkn' && parseInt(kData.limit) > 0) ? `${Math.min(100, (parseInt(kData.used) / parseInt(kData.limit)) * 100)}%` : '0%' }}
                            className="h-full bg-linear-to-r from-pink-600 to-purple-600"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
