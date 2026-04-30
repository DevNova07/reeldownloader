"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, CheckCircle2 } from "lucide-react";
import { cn } from "@/utils/cn";

interface RatingWidgetProps {
  platform: string;
  accentColor?: string;
}

export function RatingWidget({ platform, accentColor = "text-pink-500" }: RatingWidgetProps) {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [hasRated, setHasRated] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const rated = localStorage.getItem(`rated_${platform}`);
    if (rated) {
      setHasRated(true);
      setRating(parseInt(rated));
    }
  }, [platform]);

  const handleRate = (value: number) => {
    setRating(value);
    setHasRated(true);
    localStorage.setItem(`rated_${platform}`, value.toString());
    
    // Auto-hide after some time if needed, or just stay as "Thank you"
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto mt-12 w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-8 backdrop-blur-3xl shadow-2xl relative"
    >
      {/* Background Decorative Glow */}
      <div className={cn("absolute -right-10 -top-10 h-32 w-32 blur-[60px] opacity-20 rounded-full bg-current", accentColor)} />
      
      <AnimatePresence mode="wait">
        {!hasRated ? (
          <motion.div
            key="rating-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center text-center"
          >
            <div className="mb-4 rounded-2xl bg-white/10 p-3 ring-1 ring-white/20">
              <Star className={cn("h-6 w-6 fill-current", accentColor)} />
            </div>
            <h3 className="text-xl font-black uppercase italic tracking-widest text-white">
              Rate your experience
            </h3>
            <p className="mt-2 text-sm font-bold text-white/60">
              How do you like our {platform} downloader?
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRate(star)}
                  className="group relative p-1 transition-transform hover:scale-125 active:scale-90"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-all duration-300",
                      (hoverRating || rating) >= star
                        ? `${accentColor} fill-current drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]`
                        : "text-white/20"
                    )}
                  />
                </button>
              ))}
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/40">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                Anonymous
              </div>
              <div className="h-1 w-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-red-500" />
                Trustworthy
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="rounded-full bg-green-500 p-4 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
              >
                <CheckCircle2 className="h-10 w-10 text-white stroke-[3]" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-green-500/20 blur-xl -z-10"
              />
            </div>
            <h3 className="text-2xl font-black uppercase italic tracking-widest text-white">
              Thank you!
            </h3>
            <p className="mt-2 text-sm font-bold text-white/60">
              You gave us {rating} stars. Your feedback makes us better.
            </p>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="mt-6 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
