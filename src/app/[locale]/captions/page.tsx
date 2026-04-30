"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
    Copy,
    Check,
    ArrowRight,
    Heart,
    Zap,
    Share2,
    Smile,
    Flame,
    Video,
    Layout,
    Globe,
    Languages,
    Clock,
    Search,
    Rocket,
    Star,
    Sparkles,
    Target,
    Hash,
    ChevronRight,
    Trash2,
    Terminal,
    X,
    MessageCircle,
    Send,
    Bookmark,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/cn"
import { toast } from "react-hot-toast"
import { AISearchBar } from "@/components/shared/AISearchBar"
import { PremiumSearch } from "@/components/shared/PremiumSearch"

// ─── Constants & Mock Data ───────────────────────────────────────────────────

const PLATFORMS = [
    { id: "instagram", label: "Instagram", icon: Video, color: "text-pink-500" },
    { id: "tiktok", label: "TikTok", icon: Video, color: "text-black" },
    { id: "youtube", label: "YouTube", icon: Layout, color: "text-red-500" },
    { id: "facebook", label: "Facebook", icon: Globe, color: "text-blue-600" },
]

const TONES = [
    { id: "viral", label: "Viral", emoji: "🚀" },
    { id: "funny", label: "Funny", emoji: "😂" },
    { id: "attitude", label: "Attitude", emoji: "😎" },
    { id: "romantic", label: "Romantic", emoji: "💕" },
    { id: "savage", label: "Savage", emoji: "💀" },
    { id: "motivational", label: "Motivational", emoji: "🔥" },
]

const CAPTION_LIBRARY = [
    {
        id: "happy",
        title: "Happy & Sunshine",
        items: [
            "Keep smiling, it's free therapy. ✨",
            "Sunshine on my mind and joy in my soul.",
            "Choose happiness every single day.",
            "Life is better when you're laughing. 😂",
            "Collect moments of pure joy.",
            "Radiating positivity and good vibes.",
            "My happiness is a superpower.",
            "Glowing from the inside out.",
            "The best view is a happy heart.",
            "Smiling is my favorite exercise."
        ]
    },
    {
        id: "sad",
        title: "Sad & Deep",
        items: [
            "Sometimes the soul just needs a rainy day.",
            "It's okay not to be okay. 🌧️",
            "Healing isn't linear, take your time.",
            "Deep waters run quiet. 🌊",
            "The stars can't shine without darkness.",
            "Missing what used to be home.",
            "Pain reminds us that we are still alive.",
            "Silent tears speak the loudest.",
            "A heavy heart and a quiet mind.",
            "Just another chapter of growth through pain."
        ]
    },
    {
        id: "attitude",
        title: "Attitude & Boss",
        items: [
            "Own your vibe, don't let it own you.",
            "Classy, sassy, and a bit bad-assy. 🔥",
            "My life, my rules, my attitude. 😎",
            "Don't study me, you won't graduate.",
            "Living my best life, zero regrets.",
            "Too glam to give a damn.",

            "I'm not a backup plan. I'm a first choice.",
            "Silent but lethal, like my success.",
            "Kill them with success and bury them with a smile.",
            "I'm 100% focused on being the best version of me."
        ]
    },
    {
        id: "savage",
        title: "Savage & Sarcastic",
        items: [
            "I'm not short, I'm concentrated awesome. 💀",
            "Zero cares given, maximum life lived.",
            "If you're testing my water, you better know how to swim.",
            "Don't mistake my kindness for weakness.",
            "Brains are awesome. I wish everyone had one. 🧠",
            "I'm not lazy, I'm just on energy-saving mode.",
            "Sarcasm is my second language.",
            "Too busy making history to read your opinion.",
            "If I wanted to hear your opinion, I'd ask.",
            "I'm not rude, I'm just honest. You just can't handle the truth."
        ]
    },
    {
        id: "romantic",
        title: "Romantic & Love",
        items: [
            "Home is wherever I'm with you. ❤️",
            "You're my favorite kind of adventure.",
            "Every love story is beautiful, but ours is my favorite.",
            "Soulmates, partners, and best friends. ✨",
            "Falling for you more every day.",
            "You are the best thing that ever happened to me.",
            "Love is not something you find. Love is something you build.",
            "Forever is a long time, but I'd spend it with you.",
            "Your love is my favorite melody.",
            "In your arms, I've found my sanctuary."
        ]
    },
    {
        id: "grateful",
        title: "Grateful & Blessed",
        items: [
            "Gratitude turns what we have into enough. 🙏",
            "Blessed beyond measure.",
            "Take a moment to appreciate the small things.",
            "Focus on the good and the good gets better.",
            "Highly flavored and deeply grateful.",
            "Counting my blessings, not my problems.",
            "Thankful for the lessons and the growth.",
            "A grateful heart is a magnet for miracles.",
            "Thank you, universe, for this beautiful ride.",
            "Living life with a heart full of thanks."
        ]
    },
    {
        id: "birthday",
        title: "Birthday & Celebration",
        items: [
            "Level unlocked: [age]. 🎂",
            "Aging like a fine wine.",
            "HBD to the MVP! ✨",
            "Growing up is optional, growing old is mandatory.",
            "Chapter [age] begins now.",
            "Making [age] look good.",
            "Another trip around the sun, and still shining.",
            "Born to stand out, especially today. 👑",
            "Today's forecast: 100% chance of cake.",
            "Blessed to see another year of adventures."
        ]
    },
    {
        id: "funny",
        title: "Funny & Mini Humour",
        items: [
            "I'm not lazy, I'm on energy-saving mode. 😂",
            "Reality called, so I hung up.",
            "I need a six-month vacation, twice a year.",
            "I followed my heart and it led me to the fridge.",
            "Life is short. Smile while you still have teeth.",
            "Stressed, blessed, and coffee obsessed. ☕",
            "I'm on a seafood diet. I see food and I eat it.",
            "Stay weird, stay wonderful. ✨",
            "If I was a writer, I'd have a better caption.",

            "Adulting is soup and I am a fork. 🍴"
        ]
    },
    {
        id: "travel",
        title: "Travel & Wanderlust",
        items: [
            "Seas the day and catch the wave. 🌊",
            "Catch flights, not feelings.",
            "Travel is the only thing you buy that makes you richer.",
            "Wander where the Wi-Fi is weak. 🌿",
            "Paradise found and I'm not coming back.",
            "Sun, sand, and a drink in my hand.",
            "Adventure is out there, go find it! 🚀",
            "Living my best life one city at a time.",
            "Collect moments, not things.",
            "The world is a book and I'm reading every page."
        ]
    },
    {
        id: "gym",
        title: "Gym & Fitness",
        items: [
            "Hustle for the muscle. 💪",
            "Sweat is just fat crying.",
            "One more rep, one step closer. 🔥",
            "Stronger than my excuses.",
            "Train like a beast, look like a beauty.",
            "Focus on being productive instead of busy.",
            "Your only limit is you. 🏋️",
            "Fitness is a journey, not a destination.",
            "Make your body your most prized possession.",
            "Results happen over time, not overnight.",
            "Sweat is just fat crying. 😂",
            "Sore today, strong tomorrow. 💪",
            "Train insane or remain the same. 🔥",
            "Muscles in progress. 📈",
            "Excuses don't burn calories.",
            "My warmup is your workout. 😎",
            "Gym hair, don't care. 💁‍♂️",
            "Push yourself, because no one else is going to do it for you.",
            "Strong is the new sexy. ✨",
            "Working on my fitness, he's my witness."
        ]
    },
    {
        id: "success",
        title: "Success & Hustle",
        items: [
            "Making history while they're making excuses. 📈",
            "CEO of my own destiny.",
            "Slow progress is still progress.",
            "Success is the sum of small efforts repeated daily.",
            "Dream big, work hard, stay focused. ✨",
            "Stay hungry. Stay foolish.",
            "Work until your idols become your rivals. 🔥",
            "Don't stop until you're proud.",
            "The best is yet to come.",
            "Believe in the power of yet.",
            "Hustle until your haters ask if you're hiring. 🔥",
            "Success is a journey, not a destination.",
            "Dream big. Work hard. Stay humble. ✨",
            "Turning my 'can'ts' into 'cans'.",
            "The sky is not the limit, it's just the view. 🚀",
            "Hard work beats talent when talent doesn't work hard.",
            "Building my empire, one day at a time. 👑",
            "Consistency is the secret sauce. 🧂",
            "Focus on the goal, not the obstacles.",
            "Don't stop until you're proud. 🕊️"
        ]
    },
    {
        id: "friends",
        title: "Friendship & Squad",
        items: [
            "Partners in crime and best friends for life. 👯",
            "Good times and even better friends.",
            "Your vibe attracts your tribe.",
            "Friends don't let friends do silly things alone. 😂",
            "Found my soul family. ❤️",
            "Life is better with true friends.",
            "Side by side or miles apart, friends are always near.",
            "True friends are like stars; they always shine. ✨",
            "Making memories one laugh at a time.",
            "Blessed to have you in my corner."
        ]
    },
    {
        id: "selflove",
        title: "Self Love & Confidence",
        items: [
            "Unapologetically me. ✨",
            "Self-love is the best love.",
            "I'm not high maintenance, I'm high value.",
            "Confidence level: Selfie with no filter. 👑",
            "Born to stand out, never to fit in.",
            "Be your own kind of beautiful.",
            "Protecting my peace above all else. 🧘",
            "I am my own Muse.",
            "Learning to love every version of me.",
            "Own your story and you own your power.",
            "Be your own kind of beautiful. ✨",
            "Self-love is the best love.",
            "Confidence level: Selfie with no filter. 🤳",
            "Invest in yourself, it pays the best interest.",
            "Becoming the best version of me. 📈",
            "I am my own muse. 🎨",
            "Protecting my peace at all costs.",
            "Worth it. Always. ❤️",
            "Glowing from the inside out.",
            "Know your worth, then add tax. 💰"
        ]
    },
    {
        id: "foodie",
        title: "Food & Swag",
        items: [
            "First, we eat. Then we do everything else. 🍕",
            "In a committed relationship with pizza.",
            "Life is short, eat the dessert first. 🍰",
            "Good food, good mood.",
            "Food is my love language. ❤️",
            "Yum is an understatement.",
            "Savoring every single bite. 🍽️",
            "Everything is better with a little bit of spice.",
            "Fueled by coffee and ambition. ☕",
            "Eat well, travel often."
        ]
    },
    {
        id: "viral",
        title: "Viral & Trending",
        items: [
            "Manifesting big things only. ✨",
            "The vibe is unmatched.",
            "POV: You're living your best life.",
            "Main character energy activated. 📈",
            "Just another magic moment.",
            "Stay humble, but stay hungry. 🔥",
            "Living precisely how I planned.",
            "Focused on the goal, ignoring the noise.",
            "Savage vibes and sweet dreams. 💀",
            "The journey is just beginning."
        ]
    },

    {
        id: "nature",
        title: "Nature & Outdoors",
        items: [
            "The mountains are calling and I must go. 🏔️",
            "Salty air, sun-kissed hair.",
            "Nature: The best kind of therapy.",
            "Lost in the woods, found in the peace. 🌿",
            "Chasing sunsets and sea breezes. 🌅",
            "A hike a day keeps the stress away.",
            "Wild at heart and free at soul.",
            "Leave nothing but footprints, take nothing but pictures.",
            "Bloom where you are planted. 🌸",
            "The sky is not the limit, it's just the beginning.",
            "Lost in the woods and found in the soul. 🌿",
            "Nature: cheaper than therapy. ✨",
            "The mountains are calling and I must go.",
            "Leave only footprints, take only memories. 👣",
            "Sunshine is the best medicine. ☀️",
            "Breath in the wild air.",
            "Every sunset is an opportunity to reset. 🌅",
            "Earth laughs in flowers. 🌸",
            "Chasing waterfalls and mountain peaks.",
            "Wild and free, just like the sea. 🌊"
        ]
    },
    {
        id: "productivity",
        title: "Productivity & Work",
        items: [
            "Hustle in silence, let your success be the noise. 📈",
            "Mindset: On. Coffee: Strong.",
            "Don't wish for it, work for it.",
            "Productivity is the best kind of flex. 🔥",
            "Turn your cant's into cans and your dreams into plans.",
            "Working on my best self. One day at a time.",
            "The best way to predict the future is to create it.",
            "Stay focused, stay humble, stay hungry.",
            "CEO of my own journey. 💼",
            "Hustle looks good on everyone."
        ]
    },
    {
        id: "party",
        title: "Night Out & Party",
        items: [
            "Tonight's forecast: 100% chance of dancing. 💃",
            "The night is young and so are we. ✨",
            "Good music, grand vibes, great company.",
            "Less drama, more tequila. 🍸",
            "Shine like the disco ball you are.",
            "Making memories we'll barely remember. 😂",
            "Party like it's your first time out.",
            "The world looks better with a filter and a cocktail.",
            "Life is a party, dress like it. 👗",
            "Sipping on sunshine and city lights. 🌌",
            "Dance like nobody is watching. 💃",
            "Good vibes and neon lights. ✨",
            "Tonight's forecast: 100% chance of fun. 🥂",
            "Making memories under the disco ball.",
            "Eat, Sleep, Party, Repeat. 🔁",
            "Cheers to the nights we'll never forget. 🥂",
            "Party like a rockstar, sleep like a baby.",
            "The night is young and so are we. 🌃",
            "Sparkle all night long. ✨",
            "Vibing with the tribe tonight."
        ]
    },
    {
        id: "aesthetic",
        title: "Aesthetic & Minimalist",
        items: [
            "Simplicity is the ultimate sophistication. ✨",
            "Less is more, always.",
            "Golden hours and quiet thoughts. 🕊️",
            "Focus on the details.",
            "Aesthetic mind, beautiful life.",
            "Pure, simple, and honest.",
            "Whispering through the noise.",
            "Elegance is the only beauty that never fades.",
            "Neutral tones and good vibes. 🕰️",
            "Caught in a beautiful daydream."
        ]
    },
    {
        id: "coffee",
        title: "Coffee & Morning",
        items: [
            "But first, coffee. ☕",
            "May your coffee be strong and your Monday be short.",
            "Sips and smiles. 🥐",
            "Coffee: My favorite kind of magic.",
            "Mornings are for reflection and caffeine. 🌅",
            "Waking up with the sun and a warm cup.",
            "Coffee isn't a drink, it's an emotion. ❤️",
            "Espresso yourself. ✨",
            "Happiness is the first sip of a latte.",
            "Caffeine-fueled and ready for anything",
            "Espresso yourself. ☕",
            "Life begins after coffee. ✨",
            "First I drink the coffee, then I do the things.",
            "Depresso: the feeling you get when you run out of coffee. 😂",
            "A yawn is a silent scream for coffee.",
            "But first, coffee. ☕",
            "Stressed, blessed, and coffee obsessed.",
            "Coffee: my favorite coworker.",
            "Sip happens. ☕",
            "Hot, black, and strong—just how I like my coffee."
        ]
    },
    {
        id: "pets",
        title: "Pet Love",
        items: [
            "Who's the goodest boy? 🐕",
            "Life is better with a tail wag.",
            "My dog is my soulmate. 🐾",
            "Home is where the cat is. 🐈",
            "Furry friends, forever family.",
            "Unconditional love has four paws.",
            "Paw-sitive vibes only! ✨",
            "Sometimes you just need a purr.",
            "The best therapist has fur and a wet nose.",
            "Living my best life with my best furry friend."
        ]
    },
    {
        id: "sassy",
        title: "Sassy & Bold",
        items: [
            "I'm not a snack, I'm the whole meal. 💅",
            "Don't worry about what I'm doing, worry about why you're worrying.",
            "My mascara is too expensive to cry over you. 😂",
            "Confidence: Level expert. ✨",
            "I'm the main character, obviously.",
            "Too busy being a boss to be a hater.",
            "Sorry, I didn't see you there. I was too busy being fabulous.",
            "Handle with care (or don't, I'm expensive). 💎",
            "I don't need your approval, I have my own.",
            "Shine bright because you deserve to. 👑"
        ]
    },
    {
        id: "wedding",
        title: "Wedding & Ethnic",
        items: [
            "Desi vibes and traditional pride. ✨",
            "Shaadi season is in full swing! 💍",
            "Elegance in every fold of my saree.",
            "Jhumkas and joy. 💎",
            "Slaying in traditional wear.",
            "Traditional soul, modern mind. 🕊️",
            "Wrapped in heritage and happiness.",
            "Wedding bells and festive smells.",
            "Suit up, it's a Desi wedding! 🕺",
            "Mehendi nights and fairy lights."
        ]
    },
    {
        id: "recap",
        title: "Vibe Recap",
        items: [
            "Recent camera roll moments. 📸",
            "Vibe check: Passed. ✨",
            "A month full of magic and memories.",
            "The highlights of my week.",
            "Collecting moments, one photo at a time. 🧺",
            "Life lately... 🎥✨",
            "Current mood: Bliss. 🕊️",
            "Recap of the best times.",
            "Living, laughing, and documenting it all.",
            "Snippet of my favorite days."
        ]
    },
    {
        id: "modern",
        title: "Modern Moods",
        items: [
            "Creating my own sunshine. 🔥",
            "Quiet confidence is the loudest flex.",
            "Life is what you make it. ✨",
            "Full power adventure mode.",
            "Chasing dreams and catching flights. 😂",
            "My time is now. 📈",
            "Heart full of dreams. ❤️",
            "Pure vibes only.",
            "Savage energy, gentle heart. 💀",
            "Beyond expectations, closer to dreams."
        ]
    },
    {
        id: "gaming",
        title: "Gaming & Esports",
        items: [
            "Level unlocked: [Achievement]. 🎮",
            "Eat. Sleep. Game. Repeat.",
            "GG WP! 🚀",
            "Lag is for losers, skill is for legends.",
            "Just one more game... (it's been 5 hours). 😂",
            "Gaming isn't just a hobby, it's a lifestyle.",
            "Save world. Defeat boss. Get the loot.",
            "My controller is an extension of my soul. ✨",
            "Respawning in 3... 2... 1...",
            "The graphics are great, but the gameplay is everything."
        ]
    },
    {
        id: "anime",
        title: "Anime & Otaku",
        items: [
            "Omae wa mou shindeiru. 💀",
            "Believe in the me that believes in you. ✨",
            "Plus Ultra! 💥",
            "To know sorrow is not terrifying. 🕊️",
            "I'm not a hero because I want your approval.",
            "Whatever you lose, you'll find it again. But what you throw away is gone.",
            "Dattebayo! 👊",
            "Vibe check: S-Rank. 🔥",
            "My story is just beginning. 📖",
            "Caught in a beautiful Genjutsu."
        ]
    },
    {
        id: "art",
        title: "Photography & Art",
        items: [
            "Life is a canvas, make it a masterpiece. 🎨",
            "Focus on the good, blur the rest.",
            "Through my lens, everything looks better. 📸",
            "A picture is a secret about a secret. ✨",
            "Art is not what you see, but what you make others see.",
            "Perspective is everything.",
            "Capturing souls, not just smiles.",
            "Every photo has a story. This is mine. 🕊️",
            "Painting with light and shadows.",
            "Creation is the highest form of expression."
        ]
    },
    {
        id: "heartbreak",
        title: "Relationships & Heartbreak",
        items: [
            "The hardest part is not the ending, but starting over.",
            "Distance means so little when someone means so much. ❤️",
            "Healed, happy, and higher than ever. ✨",
            "You were my favorite 'almost'. 🕊️",
            "Self-love is the greatest romance of all.",
            "Sometimes the universe separates us to protect us.",
            "Our story was my favorite chapter.",
            "Healing isn't linear, but it's worth it. 🕯️",
            "Letting go is the ultimate flex.",
            "Soulmates are found within our own peace."
        ]
    },
    {
        id: "grit",
        title: "Motivation & Discipline",
        items: [
            "Discipline > Motivation. ⚡",
            "Show up even when you don't feel like it.",
            "Your future self will thank you for today's sweat. 🔥",
            "Comfort zones are where dreams go to die.",
            "The grind never stops, it just gets more efficient.",
            "Be the person you needed when you were younger. 👑",
            "Hard work beats talent when talent doesn't work hard.",
            "Consistency is the only secret to success.",
            "Stop dreaming, start doing. 🚀",
            "You are one decision away from a different life."
        ]
    },
    {
        id: "movies",
        title: "Movies & Pop Culture",
        items: [
            "Here's looking at you, kid. 🥂",
            "May the force be with my weekend vibes. ✨",
            "I'm the king of the world! (Or this photo). 😂",
            "It's not who I am underneath, but what I do. 🦇",
            "Keep your friends close, but your coffee closer.",
            "To infinity and beyond! 🚀",
            "I'll have what she's having... (Happiness).",
            "Just keep swimming. 🐠",
            "Life moves pretty fast. 📖",
            "You complete me. ❤️"
        ]
    },
    {
        id: "luxury",
        title: "Luxury & Wealth",
        items: [
            "Quiet luxury speaks the loudest. 💎",
            "Success is the best designer label.",
            "High-end vibes and low-key living.",
            "Living a life worth writing about. ✨",
            "Quality over quantity, always. 🏛️",
            "Wealth is a mindset, then it's a lifestyle.",
            "Opulence in the details.",
            "Stepping into my best era. 🥂",
            "Invest in yourself, it pays the best interest.",
            "Elegance isn't about being noticed, it's remembered."
        ]
    },
    {
        id: "zen",
        title: "Mindfulness & Zen",
        items: [
            "Breathe in the peace, exhale the chaos. 🧘",
            "Mindful moments in a mindless world.",
            "Peace is a choice I make every day.",
            "Present moment, beautiful soul. ✨",
            "In the midst of movement, find stillness.",
            "Protect your energy like it's gold. 🕯️",
            "Less noise, more soul.",
            "The quietest minds have the loudest insights.",
            "Trust the timing of your life.",
            "Slowing down to see clearly. 🕊️"
        ]
    },
    {
        id: "fashion",
        title: "Fashion & Style",
        items: [
            "OOTD: Confidence and a little bit of sass. 👗",
            "Style is saying who you are without speaking. ✨",
            "Fashion fades, only style remains the same.",
            "Life is short, make every outfit count. 👠",
            "Elegance is the beauty that never fades.",
            "Trends come and go, but vibes stay forever.",
            "Dress like you're already famous. 📸",
            "A little sparkle never hurt anyone.",
            "Stepping out with style and soul. 💃",
            "Fashion is what you buy, style is what you do."
        ]
    },
    {
        id: "books",
        title: "Bookworm & Literature",
        items: [
            "Lost in a world made of ink and paper. 📖",
            "A reader lives a thousand lives before he dies.",
            "The smell of old books and new adventures.",
            "Just one more chapter... (it's 3 AM). 😂",
            "Books are a uniquely portable magic. ✨",
            "My home is where my bookshelves are.",
            "Literary soul in a digital world. 🕯️",
            "Words are our most inexhaustible source of magic.",
            "Escaping reality, one page at a time.",
            "Life is a book and I'm on my favorite chapter."
        ]
    },
    {
        id: "summer",
        title: "Summer Vibes",
        items: [
            "Salty air, sun-kissed hair. 🌊",
            "Good vibes and tropical tides.",
            "Summer: The best kind of feeling. ✨",
            "Sun, sand, and a drink in my hand.",
            "High tides and good vibes only. 🏖️",
            "Living on island time.",
            "Sunshine is the best medicine. ☀️",
            "Girls just wanna have sun!",
            "Endless summer dreams. 🌅",
            "Caught in the summer glow."
        ]
    },
    {
        id: "winter",
        title: "Winter & Cozy",
        items: [
            "Sweater weather is the best weather. 🧶",
            "Cozy fires and cold nights. ❄️",
            "Winter is not a season, it's a feeling.",
            "Hot chocolate and warm hugs. ☕",
            "Snowflakes are kisses from heaven.",
            "Finding beauty in the frost. ✨",
            "Cuddles and candlelight. 🕯️",
            "The magic of a quiet winter morning.",
            "Bundled up in joy and wool. 🧣",
            "Stay cozy, stay kind."
        ]
    },
    {
        id: "wit",
        title: "Witty & Sarcastic",
        items: [
            "I'm not lazy, I'm just on energy saving mode. 😂",
            "I'm not rude, I'm just honest. 🔥",
            "I wasn't lucky, I deserved it. 📈",
            "Sarcasm is my spiritual cup of tea. 😂",
            "I'm not a snack, I'm the whole meal. ☕",
            "Don't worry about me, worry about your eyes. 💀",
            "My life, my rules, my logic.",
            "Success is the only noise I make. 😂",
            "Stay real or stay away. 🕊️",
            "Savage vibes only."
        ]
    },
    {
        id: "corporate",
        title: "Corporate & Work Life",
        items: [
            "This image could have been an email. 💻",
            "Per my last weekend, I am currently not working. 😂",
            "Corporate soul, creative heart. ✨",
            "Meeting about a meeting about the project. 💼",
            "Looking professional but thinking about lunch.",
            "Surviving on deadlines and caffeine. ☕",
            "Corporate grind, weekend mind.",
            "Leveling up, one zoom call at a time. 📈",
            "Taking the elevator, not the ladder. 🚀",
            "Work hard, dream harder."
        ]
    },
    {
        id: "music",
        title: "Music & Lyrics",
        items: [
            "Where words fail, music speaks. 🎵",
            "Life is a soundtrack. ✨",
            "Lost in the rhythm and the rhyme.",
            "Music is the wine that fills the cup of silence.",
            "Vibing to the melody of life. 🎧",
            "Lyrics that hit different at 2 AM. 🕯️",
            "Soul full of rhythm, heart full of song.",
            "Turn up the music, turn down the world.",
            "In my own world with my favorite song.",
            "Music: The pulse of my existence."
        ]
    },
    {
        id: "family",
        title: "Family & Friends",
        items: [
            "Family: where life begins and love never ends. ❤️",
            "Home is where your people are.",
            "Blessed with the best crew. ✨",
            "Making memories with my favorite humans.",
            "Side by side or miles apart, we are always connected.",
            "Friends are the family we choose. 👯‍♀️",
            "Laughter is louder when we're together.",
            "Good times + Crazy friends = Amazing memories!",
            "Through thick and thin, always them. 🕊️",
            "Nothing beats a day with the fam."
        ]
    }
]

const TRENDING_CAPTIONS = [
    { id: 1, text: "Sun-kissed and soul-blessed ☀️", tags: ["#goldenhour", "#vibes"] },
    { id: 2, text: "Born to stand out, not to fit in 👑", tags: ["#maincharacter", "#attitude"] },
    { id: 3, text: "Just vibing and thriving ✌️", tags: ["#chill", "#explore"] },
    { id: 4, text: "Confidence level: Selfie with no filter 🤳", tags: ["#nofilter", "#real"] },
    { id: 5, text: "The dream is free, but the hustle is sold separately 🔥", tags: ["#hustle", "#growth"] },
]

const VIRAL_QUOTES = [
    "Create the things you wish existed.",
    "Turning can't into can and dreams into plans.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "You didn't come this far to only come this far.",
    "The best way to predict the future is to create it.",
    "When nothing goes right, go left.",
    "The best view comes after the hardest climb.",
    "The sky is not the limit. Your mind is.",
    "The harder you work, the luckier you get.",
    "The secret of getting ahead is getting started.",
    "Small steps every day lead to big results.",
    "Dream it. Believe it. Achieve it.",
    "Doubt kills more dreams than failure ever will.",
    "Be so good they can't ignore you.",
    "Make today so awesome that yesterday gets jealous.",
    "Success doesn't come from what you do consistently; it comes from what you do consistently.",
    "If it doesn't challenge you, it won't change you.",
    "Your only limit is your mindset.",
    "Work until your idols become your rivals."
]



// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CaptionsPage() {
    const [topic, setTopic] = React.useState("")
    const [searchQuery, setSearchQuery] = React.useState("")
    const [copyStatus, setCopyStatus] = React.useState<Record<string, boolean>>({})
    const [liked, setLiked] = React.useState<Record<string, boolean>>({})
    const [savedCaptions, setSavedCaptions] = React.useState<string[]>([])
    const [showSaved, setShowSaved] = React.useState(false)
    const [expandedId, setExpandedId] = React.useState<string | null>(null)
    const [platform, setPlatform] = React.useState("instagram")
    const [tone, setTone] = React.useState("viral")
    const [language, setLanguage] = React.useState("en")
    const [length, setLength] = React.useState("medium")
    const [useEmojis, setUseEmojis] = React.useState(true)


    const resultsRef = React.useRef<HTMLDivElement>(null)

    // Load saved captions from LS
    React.useEffect(() => {
        const saved = localStorage.getItem("snap_saved_captions")
        if (saved) setSavedCaptions(JSON.parse(saved))
    }, [])

    const handleSearch = () => {
        if (!topic.trim()) {
            toast.error("Tell us what's the post about! 💡")
            return
        }
        setSearchQuery(topic)
        document.getElementById("mood-grid")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }



    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopyStatus((prev) => ({ ...prev, [text]: true }))
        toast.success("Copied to clipboard! ✅")
        
        // Haptic Feedback Simulation (Visual Pulse)
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(10)
        }
        
        setTimeout(() => setCopyStatus((prev) => ({ ...prev, [text]: false })), 2000)
    }

    const handleLike = (text: string) => {
        setLiked((prev) => ({ ...prev, [text]: !prev[text] }))
        const updatedSaved = liked[text] 
            ? savedCaptions.filter(c => c !== text)
            : [...savedCaptions, text]
        
        setSavedCaptions(updatedSaved)
        localStorage.setItem("snap_saved_captions", JSON.stringify(updatedSaved))
        
        if (!liked[text]) toast.success("Saved to your collection! ❤️")
    }

    const handleShare = (text: string) => {
        if (navigator.share) {
            navigator.share({
                title: 'Snap AI Caption',
                text: text,
                url: window.location.href,
            }).catch(console.error);
        } else {
            handleCopy(text)
        }
    }

    return (
        <main className="relative min-h-screen bg-linear-to-b from-[#f8fafc] via-[#eef2ff] to-[#e0f2fe] selection:bg-indigo-100 pb-20">
            {/* Hero Section with Background */}
            <section className="relative overflow-hidden min-h-[450px] flex items-center justify-center text-center">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-neutral-900"
                    style={{
                        backgroundImage: "url('/images/captions-hero.webp')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl space-y-6 px-4 py-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-light tracking-[0.2em] text-white uppercase md:text-5xl"
                    >
                        GENERATE <span className="text-[#a4d444] font-medium">AI</span> CAPTIONS
                    </motion.h1>

                    {/* Search Bar Container */}
                    <PremiumSearch 
                        value={topic}
                        onChange={setTopic}
                        onSearch={handleSearch}
                        placeholder="Describe your post topic..."
                        accentColor="text-[#a4d444]"
                        buttonColor="bg-[#a4d444]"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-medium text-white/90 tracking-wide brightness-110 uppercase"
                    >
                        enter your topic and we generate the best viral captions
                    </motion.p>
                </div>
            </section>


                 {/* 🎨 CAPTION LIBRARY BY MOOD (Accordion Style - Split UI) */}
            <section id="mood-grid" className="px-4 pt-12 pb-20 bg-neutral-50/50">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-16 lg:text-left">
                        <motion.h2
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl font-bold uppercase tracking-tighter text-neutral-900 md:text-6xl"
                        >
                            EXPLORE BY <span className="text-[#a4d444]">MOOD</span>
                        </motion.h2>
                        <p className="mt-2 text-[11px] font-bold text-neutral-400 uppercase tracking-[0.3em]">Use the search above to find your vibe</p>
                    </div>

                    <div className="lg:grid lg:grid-cols-[1fr_470px] lg:gap-16 lg:items-start">
                        {/* Left Column: Category Accordion */}
                        <div className="divide-y divide-neutral-100 border-y border-neutral-100 bg-white shadow-sm lg:shadow-none lg:bg-transparent">
                            {CAPTION_LIBRARY.filter(c => c.title.toLowerCase().includes(topic.toLowerCase())).map((collection, idx) => {
                                const isExpanded = expandedId === collection.id;
                                const showAd = (idx === 9) || (idx === 19) || (idx === 29);
                                const adImage = idx === 9 
                                    ? "/images/captions_ad_lifestyle.webp" 
                                    : idx === 19 
                                        ? "/images/captions_ad_hustle.webp"
                                        : "/images/captions_ad_desi.webp";

                                return (
                                    <React.Fragment key={collection.id}>
                                        <div className="overflow-hidden bg-white/50 backdrop-blur-sm transition-colors hover:bg-white">
                                            <button
                                                onClick={() => setExpandedId(isExpanded ? null : collection.id)}
                                                className="flex w-full items-center justify-between py-2.5 px-4 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <Hash className={cn(
                                                        "h-5 w-5 transition-all duration-300",
                                                        isExpanded ? "text-[#a4d444] scale-110" : "text-black group-hover:text-black/70"
                                                    )} />
                                                    <h3 className={cn(
                                                        "text-lg font-bold uppercase tracking-tighter transition-all duration-300",
                                                        isExpanded ? "text-neutral-900" : "text-black group-hover:text-neutral-600"
                                                    )}>
                                                        {collection.title}
                                                    </h3>
                                                </div>
                                                <div className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-none border border-neutral-100 text-neutral-300 transition-all duration-300",
                                                    isExpanded && "rotate-90 bg-[#a4d444] border-[#a4d444] text-white"
                                                )}>
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            </button>

                                            <AnimatePresence mode="wait">
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                    >
                                                        <div className="pb-8 pl-12 pr-6">
                                                            <ul className="space-y-4">
                                                                {collection.items.map((item, i) => (
                                                                    <li 
                                                                        key={i} 
                                                                        onClick={() => handleCopy(item)}
                                                                        className="group/item relative flex items-center justify-between gap-6 py-1 cursor-pointer select-none"
                                                                    >
                                                                        <div className="flex items-start gap-4">
                                                                            <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-neutral-900 opacity-20 group-hover/item:opacity-100 transition-opacity" />
                                                                            <p className="text-base font-medium text-neutral-600 transition-colors group-hover/item:text-neutral-900 leading-relaxed">
                                                                                &quot;{item}&quot;
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none bg-neutral-50 text-neutral-400 opacity-0 group-hover/item:opacity-100 transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-90 shadow-sm border border-neutral-100">
                                                                            <Copy className="h-3.5 w-3.5" />
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Mobile-Only In-feed Ad (Hidden on Desktop) */}
                                        {showAd && (
                                            <div className="lg:hidden py-10 px-4 bg-neutral-50/50">
                                                <div className="mx-auto max-w-lg overflow-hidden rounded-none bg-white shadow-2xl border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                                                    {/* Instagram Header Mockup (Same to Same) */}
                                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-neutral-100 p-0.5 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                                                                <div className="h-full w-full rounded-full bg-[#f8faf2] flex items-center justify-center">
                                                                    <Hash className="h-5 w-5 text-[#a4d444]" />
                                                                    </div>
                                                            </div>
                                                            <div className="leading-tight">
                                                                <p className="text-sm font-black text-neutral-900 dark:text-white flex items-center gap-1">snaphashtags_official</p>
                                                                <p className="text-xs font-medium text-neutral-400">1.1M followers</p>
                                                            </div>
                                                        </div>
                                                        <button className="rounded-lg border border-neutral-200 px-4 py-1.5 text-xs font-black text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                                            View profile
                                                        </button>
                                                    </div>

                                                    {/* The Post Image */}
                                                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
                                                        <Image 
                                                            src={adImage} 
                                                            alt="Snap Captions Discovery Ad"
                                                            width={500}
                                                            height={500}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>

                                                    {/* Interaction Row */}
                                                    <div className="p-4 bg-white dark:bg-neutral-900">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <div className="flex items-center gap-4">
                                                                <Heart className="h-7 w-7 text-neutral-900 dark:text-white" />
                                                                <MessageCircle className="h-7 w-7 text-neutral-900 dark:text-white" />
                                                                <Send className="h-7 w-7 text-neutral-900 dark:text-white" />
                                                            </div>
                                                            <Bookmark className="h-7 w-7 text-neutral-900 dark:text-white" />
                                                        </div>

                                                        {/* Likes & Caption Text */}
                                                        <div className="space-y-2">
                                                            <p className="text-sm font-black text-neutral-900 dark:text-white">42,704 likes</p>
                                                            <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                                                                <span className="font-black mr-2">snaphashtags_official</span>
                                                                Stop guessing and start growing! 🚀 We&apos;ve analyzed 1M+ viral posts to bring you the ultimate hashtag strategy. Use our AI to find your perfect vibe in seconds. 👑✨
                                                                <br /><br />
                                                                Ready to hit the Explore page? Let&apos;s go! 👇
                                                            </p>
                                                            
                                                            {/* The Massive Hashtag Cloud */}
                                                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-3 leading-relaxed tracking-tight">
                                                                #viral #growth #strategy #instagram #captions #ai #marketing #business #creators #explorepage #trending #contentcreator #socialmedia #hacks #tips #insta #reels #shorts #tiktok #success #mindset #hustle #digitalmarketing #seo #hashtags #best #yummy #lifestyle #desi #viralcontent
                                                            </p>
                                                            
                                                            <p className="text-sm font-medium text-neutral-400 mt-4">View all 97 comments</p>
                                                        </div>
                                                    </div>

                                                    {/* Add a comment bar */}
                                                    <div className="border-t border-neutral-100 p-4 flex items-center justify-between dark:border-neutral-800">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-7 w-7 rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800" />
                                                            <span className="text-sm text-neutral-300 font-medium">Add a comment...</span>
                                                        </div>
                                                        <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {/* Right Column: Sticky Discovery Sidebar (PC Only) */}
                        <aside className="hidden lg:block sticky top-32 space-y-12">
                           {/* Card 1: Viral Strategy */}
                           <div className="mx-auto max-w-lg overflow-hidden rounded-none bg-white shadow-3xl border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                                {/* Instagram Header */}
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-neutral-100 p-0.5 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                                            <div className="h-full w-full rounded-full bg-[#f8faf2] flex items-center justify-center">
                                                <Hash className="h-5 w-5 text-[#a4d444]" />
                                                </div>
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-sm font-black text-neutral-900 dark:text-white flex items-center gap-1">snaphashtags_official</p>
                                            <p className="text-xs font-medium text-neutral-400">1.1M followers</p>
                                        </div>
                                    </div>
                                    <button className="rounded-lg border border-neutral-200 px-4 py-1.5 text-xs font-black text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                        View profile
                                    </button>
                                </div>

                                {/* Product Image */}
                                <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
                                    <Image 
                                        src="/images/captions_ad_viral.webp" 
                                        alt="Snap Captions Discovery Ad"
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Interaction Row */}
                                <div className="p-4 bg-white dark:bg-neutral-900">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <Heart className="h-7 w-7 text-neutral-900 dark:text-white" />
                                            <MessageCircle className="h-7 w-7 text-neutral-900 dark:text-white" />
                                            <Send className="h-7 w-7 text-neutral-900 dark:text-white" />
                                        </div>
                                        <Bookmark className="h-7 w-7 text-neutral-900 dark:text-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-black text-neutral-900 dark:text-white">42,704 likes</p>
                                        <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                                            <span className="font-black mr-2">snaphashtags_official</span>
                                            THE ULTIMATE VIRAL STRATEGY IS HERE! 📈✨ Stop wasting time on dead tags. Our AI finds the hottest trending keywords so you can focus on creating. 🚀👑 
                                            <br /><br />
                                            Tag a creator who needs this! 🔥💎
                                        </p>
                                        <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-3 leading-relaxed tracking-tight underline decoration-blue-500/30 decoration-1 underline-offset-4">
                                            #viral #growth #strategy #instagram #captions #ai #marketing #business #creators #explorepage #trending #hacks #innovation #success #mindset #hustle #digitalmarketing #branding #socialmediamarketing #tips #tricks
                                        </p>
                                    </div>
                                </div>

                                {/* Comment Bar */}
                                <div className="border-t border-neutral-100 p-4 flex items-center justify-between dark:border-neutral-800">
                                    <div className="flex items-center gap-3">
                                        <div className="h-7 w-7 rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800" />
                                        <span className="text-sm text-neutral-300 font-medium whitespace-nowrap">Add a comment...</span>
                                    </div>
                                    <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                                </div>
                            </div>

                            {/* Card 2: Lifestyle Vibes */}
                            <div className="mx-auto max-w-lg overflow-hidden rounded-none bg-white shadow-3xl border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                                <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-neutral-100 p-0.5 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                                            <div className="h-full w-full rounded-full bg-[#f8faf2] flex items-center justify-center">
                                                <span className="text-[#a4d444] font-black italic">S</span>
                                            </div>
                                        </div>
                                        <div className="leading-tight">
                                            <p className="text-sm font-black text-neutral-900 dark:text-white">snaphashtags_official</p>
                                            <p className="text-xs font-medium text-neutral-400 uppercase tracking-widest">Sponsored</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 border-y border-neutral-50">
                                    <Image 
                                        src="/images/captions_ad_lifestyle.webp" 
                                        alt="Lifestyle Discovery Card"
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 border border-black/5 shadow-xl">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-900">Vibe Check</p>
                                        <p className="text-[10px] font-bold text-neutral-500 mt-1 uppercase">Level up your aesthetic</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-white dark:bg-neutral-900">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <Heart className="h-7 w-7 text-neutral-900 dark:text-white" />
                                            <MessageCircle className="h-7 w-7 text-neutral-900 dark:text-white" />
                                        </div>
                                        <Bookmark className="h-7 w-7 text-neutral-900 dark:text-white" />
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-neutral-900 dark:text-white">9,215 likes</p>
                                        <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                                            <span className="font-black mr-2">snaphashtags_official</span>
                                            VIBE CHECK! 📸✨ Unlock the secret to perfectly aesthetic Reels with our premium hashtags. Don&apos;t let your content go unseen. Turn views into followers today. 💎👑
                                            <br /><br />
                                            Get the look. Get the views. 💎👑
                                        </p>
                                        <p className="text-sm font-black text-blue-600 dark:text-blue-400 mt-3 leading-relaxed tracking-tight">
                                            #aesthetic #vibe #lifestyle #creators #quality #snaphashtags #trending #reels #foryou #fyp #picoftheday #instadaily #photooftheday #fashion #style #design #art #luxury #minimalist
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 bg-pink-600">
                                    <h4 className="text-white font-black uppercase tracking-tighter text-xl italic">Get Viral Now</h4>
                                    <p className="text-pink-100 text-[10px] font-bold uppercase tracking-widest mt-1">Free AI Hashtag Generator</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Final Ad at the end (Full Instagram Style Match) */}
            <div className="pt-16 pb-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 md:px-0 bg-neutral-50/50">
                <div className="mx-auto max-w-lg overflow-hidden rounded-none bg-white shadow-3xl border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-900">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-neutral-100 p-0.5 border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-800">
                                <div className="h-full w-full rounded-full bg-[#f8faf2] flex items-center justify-center">
                                    <Hash className="h-5 w-5 text-[#a4d444]" />
                                    </div>
                            </div>
                            <div className="leading-tight">
                                <p className="text-sm font-black text-neutral-900 dark:text-white flex items-center gap-1">snaphashtags_official</p>
                                <p className="text-xs font-medium text-neutral-400">1.1M followers</p>
                            </div>
                        </div>
                        <button className="rounded-lg border border-neutral-200 px-4 py-1.5 text-xs font-black text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                            View profile
                        </button>
                    </div>

                    {/* The Post Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-neutral-50">
                        <Image 
                            src="/images/captions_ad_viral.webp" 
                            alt="Snap Captions Discovery Ad"
                            width={500}
                            height={500}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Interaction Row */}
                    <div className="p-4 bg-white dark:bg-neutral-900">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <Heart className="h-7 w-7 text-neutral-900 dark:text-white" />
                                <MessageCircle className="h-7 w-7 text-neutral-900 dark:text-white" />
                                <Send className="h-7 w-7 text-neutral-900 dark:text-white" />
                            </div>
                            <Bookmark className="h-7 w-7 text-neutral-900 dark:text-white" />
                        </div>

                        {/* Likes & Caption Text */}
                        <div className="space-y-2">
                            <p className="text-sm font-black text-neutral-900 dark:text-white">42,704 likes</p>
                            <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
                                <span className="font-black mr-2">snaphashtags_official</span>
                                The ultimate caption strategy for viral growth.
                            </p>
                            
                            {/* The Massive Hashtag Cloud */}
                            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-3 leading-relaxed tracking-tight">
                                #foodie #food #foodporn #instafood #foodphotography #foodstagram #foodblogger #yummy #foodlover #delicious #foodgasm #instagood #foodies #homemade #healthyfood #tasty #foodpics #dinner #foodiesofinstagram #love #lunch #yum #dessert #cooking #breakfast #foodblog #chef #eat #restaurant #bhfyp
                            </p>
                        </div>
                    </div>

                    {/* Add a comment bar */}
                    <div className="border-t border-neutral-100 p-4 flex items-center justify-between dark:border-neutral-800">
                        <div className="flex items-center gap-3">
                            <div className="h-7 w-7 rounded-full border border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800" />
                            <span className="text-sm text-neutral-300 font-medium">Add a comment...</span>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700" />
                    </div>
                </div>
            </div>

            {/* Skeleton / Micro Animations */}
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes pulse-once {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-pulse-once {
                    animation: pulse-once 0.3s ease-in-out;
                }
            `}</style>
        </main>
    )
}

