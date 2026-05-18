import os
import json
import re

def mega_seo_sync():
    dict_dir = 'src/dictionaries'
    en_path = os.path.join(dict_dir, 'en.json')
    
    if not os.path.exists(en_path):
        print(f"Error: {en_path} not found.")
        return

    with open(en_path, 'r', encoding='utf-8') as f:
        master_en = json.load(f)

    # Comprehensive translation map for countries and common terms
    translations = {
        "ar": { # Arabic
            "Download": "تحميل", "Save": "حفظ", "Video": "فيديو", "Reels": "ريلز", "Photo": "صورة", "Story": "ستوري",
            "without watermark": "بدون علامة مائية", "Free": "مجاني", "Fast": "سريع", "Safe": "آمن", "HD": "عالي الجودة",
            "India": "الهند", "USA": "أمريكا", "Brazil": "البرازيل", "Indonesia": "إندونيسيا", "Pakistan": "باكستان",
            "Bangladesh": "بنغلاديش", "Mexico": "المكسيك", "Germany": "ألمانيا", "France": "فرنسا", "Italy": "إيطاليا",
            "Spain": "إسبانيا", "Turkey": "تركيا", "Russia": "روسيا", "Japan": "اليابان", "Korea": "كوريا",
            "Vietnam": "فيتنام", "Thailand": "تايلاند", "Philippines": "الفلبين", "Egypt": "مصر", "Nigeria": "نيجيريا",
            "South Africa": "جنوب أفريقيا", "Canada": "كندا", "Australia": "أستراليا"
        },
        "bn": { # Bengali
            "Download": "ডাউনলোড", "Save": "সংরক্ষণ", "Video": "ভিডিও", "Reels": "রিলস", "Photo": "ছবি", "Story": "স্টোরি",
            "without watermark": "ওয়াটারমার্ক ছাড়া", "Free": "ফ্রি", "Fast": "দ্রুত", "Safe": "নিরাপদ", "HD": "এইচডি",
            "India": "ভারত", "USA": "ইউএসএ", "Brazil": "ব্রাজিল", "Indonesia": "ইন্দোনেশিয়া", "Pakistan": "পাকিস্তান",
            "Bangladesh": "বাংলাদেশ", "Mexico": "মেক্সিকো", "Germany": "জার্মানি", "France": "ফ্রান্স", "Italy": "ইতালি",
            "Spain": "স্পেন", "Turkey": "তুরস্ক", "Russia": "রাশিয়া", "Japan": "জাপান", "Korea": "কোরিয়া",
            "Vietnam": "ভিয়েতনাম", "Thailand": "থাইল্যান্ড", "Philippines": "ফিলিপাইন", "Egypt": "মিশর", "Nigeria": "নাইজেরিয়া",
            "South Africa": "দক্ষিণ আফ্রিকা", "Canada": "কানাডা", "Australia": "অস্ট্রেলিয়া"
        },
        "es": { # Spanish
            "Download": "Descargar", "Save": "Guardar", "Video": "Video", "Reels": "Reels", "Photo": "Foto", "Story": "Historia",
            "without watermark": "sin marca de agua", "Free": "Gratis", "Fast": "Rápido", "Safe": "Seguro", "HD": "HD",
            "India": "India", "USA": "EE. UU.", "Brazil": "Brasil", "Indonesia": "Indonesia", "Pakistan": "Pakistán",
            "Bangladesh": "Bangladesh", "Mexico": "México", "Germany": "Alemania", "France": "Francia", "Italy": "Italia",
            "Spain": "España", "Turkey": "Turquía", "Russia": "Rusia", "Japan": "Japón", "Korea": "Corea",
            "Vietnam": "Vietnam", "Thailand": "Tailandia", "Philippines": "Filipinas", "Egypt": "Egipto", "Nigeria": "Nigeria",
            "South Africa": "Sudáfrica", "Canada": "Canadá", "Australia": "Australia"
        },
        "hi": { # Hindi
            "Download": "डाउनलोड", "Save": "सहेजें", "Video": "वीडियो", "Reels": "रील्स", "Photo": "फोटो", "Story": "स्टोरी",
            "without watermark": "बिना वॉटरमार्क के", "Free": "मुफ्त", "Fast": "तेज़", "Safe": "सुरक्षित", "HD": "एचडी",
            "India": "भारत", "USA": "यूएसए", "Brazil": "ब्राजील", "Indonesia": "इंडोनेशिया", "Pakistan": "पाकिस्तान",
            "Bangladesh": "बांग्लादेश", "Mexico": "मेक्सिको", "Germany": "जर्मनी", "France": "फ्रांस", "Italy": "इटली",
            "Spain": "स्पेन", "Turkey": "तुर्की", "Russia": "रूस", "Japan": "जापान", "Korea": "कोरिया",
            "Vietnam": "वियतनाम", "Thailand": "थाईलैंड", "Philippines": "फिलीपींस", "Egypt": "मिस्र", "Nigeria": "नाइजीरिया",
            "South Africa": "दक्षिण अफ्रीका", "Canada": "कनाडा", "Australia": "ऑस्ट्रेलिया"
        },
        "id": { # Indonesian
            "Download": "Unduh", "Save": "Simpan", "Video": "Video", "Reels": "Reels", "Photo": "Foto", "Story": "Cerita",
            "without watermark": "tanpa watermark", "Free": "Gratis", "Fast": "Cepat", "Safe": "Aman", "HD": "HD",
            "India": "India", "USA": "AS", "Brazil": "Brasil", "Indonesia": "Indonesia", "Pakistan": "Pakistan",
            "Bangladesh": "Bangladesh", "Mexico": "Meksiko", "Germany": "Jerman", "France": "Prancis", "Italy": "Italia",
            "Spain": "Spanyol", "Turkey": "Turki", "Russia": "Rusia", "Japan": "Jepang", "Korea": "Korea",
            "Vietnam": "Vietnam", "Thailand": "Thailand", "Philippines": "Filipina", "Egypt": "Mesir", "Nigeria": "Nigeria",
            "South Africa": "Afrika Selatan", "Canada": "Kanada", "Australia": "Australia"
        },
        "pt": { # Portuguese
            "Download": "Baixar", "Save": "Salvar", "Video": "Vídeo", "Reels": "Reels", "Photo": "Foto", "Story": "Story",
            "without watermark": "sem marca d'água", "Free": "Grátis", "Fast": "Rápido", "Safe": "Seguro", "HD": "HD",
            "India": "Índia", "USA": "EUA", "Brazil": "Brasil", "Indonesia": "Indonésia", "Pakistan": "Paquistão",
            "Bangladesh": "Bangladesh", "Mexico": "México", "Germany": "Alemanha", "France": "França", "Italy": "Itália",
            "Spain": "Espanha", "Turkey": "Turquia", "Russia": "Rússia", "Japan": "Japão", "Korea": "Coreia",
            "Vietnam": "Vietnã", "Thailand": "Tailândia", "Philippines": "Filipinas", "Egypt": "Egito", "Nigeria": "Nigéria",
            "South Africa": "África do Sul", "Canada": "Canadá", "Australia": "Austrália"
        },
        "ru": { # Russian
            "Download": "Скачать", "Save": "Сохранить", "Video": "Видео", "Reels": "Рилс", "Photo": "Фото", "Story": "Сторис",
            "without watermark": "без водяного знака", "Free": "Бесплатно", "Fast": "Быстро", "Safe": "Безопасно", "HD": "HD",
            "India": "Индия", "USA": "США", "Brazil": "Бразилия", "Indonesia": "Индонезия", "Pakistan": "Пакистан",
            "Bangladesh": "Бангладеш", "Mexico": "Мексика", "Germany": "Германия", "France": "Франция", "Italy": "Италия",
            "Spain": "Испания", "Turkey": "Турция", "Russia": "Россия", "Japan": "Япония", "Korea": "Корея",
            "Vietnam": "Вьетнам", "Thailand": "Таиланд", "Philippines": "Филиппины", "Egypt": "Египет", "Nigeria": "Нигерия",
            "South Africa": "ЮАР", "Canada": "Канада", "Australia": "Австралия"
        },
        "tr": { # Turkish
            "Download": "İndir", "Save": "Kaydet", "Video": "Video", "Reels": "Makaralar", "Photo": "Fotoğraf", "Story": "Hikaye",
            "without watermark": "filigransız", "Free": "Ücretsiz", "Fast": "Hızlı", "Safe": "Güvenli", "HD": "HD",
            "India": "Hindistan", "USA": "ABD", "Brazil": "Brezilya", "Indonesia": "Endonezya", "Pakistan": "Pakistan",
            "Bangladesh": "Bangladeş", "Mexico": "Meksika", "Germany": "Almanya", "France": "Fransa", "Italy": "İtalya",
            "Spain": "İspanya", "Turkey": "Türkiye", "Russia": "Rusya", "Japan": "Japonya", "Korea": "Kore",
            "Vietnam": "Vietnam", "Thailand": "Tayland", "Philippines": "Filipinler", "Egypt": "Mısır", "Nigeria": "Nijerya",
            "South Africa": "Güney Afrika", "Canada": "Kanada", "Australia": "Avustralya"
        },
        "vi": { # Vietnamese
            "Download": "Tải về", "Save": "Lưu", "Video": "Video", "Reels": "Reels", "Photo": "Ảnh", "Story": "Tin",
            "without watermark": "không có logo", "Free": "Miễn phí", "Fast": "Nhanh", "Safe": "An toàn", "HD": "HD",
            "India": "Ấn Độ", "USA": "Mỹ", "Brazil": "Brazil", "Indonesia": "Indonesia", "Pakistan": "Pakistan",
            "Bangladesh": "Bangladesh", "Mexico": "Mexico", "Germany": "Đức", "France": "Pháp", "Italy": "Ý",
            "Spain": "Tây Ban Nha", "Turkey": "Thổ Nhĩ Kỳ", "Russia": "Nga", "Japan": "Nhật Bản", "Korea": "Hàn Quốc",
            "Vietnam": "Việt Nam", "Thailand": "Thái Lan", "Philippines": "Philippines", "Egypt": "Ai Cập", "Nigeria": "Nigeria",
            "South Africa": "Nam Phi", "Canada": "Canada", "Australia": "Úc"
        },
        "ur": { # Urdu
            "Download": "ڈاؤن لوڈ", "Save": "محفوظ", "Video": "ویڈیو", "Reels": "ریلز", "Photo": "تصویر", "Story": "سٹوری",
            "without watermark": "واٹر مارک کے بغیر", "Free": "مفت", "Fast": "تیز", "Safe": "محفوظ", "HD": "ایچ ڈی",
            "India": "بھارت", "USA": "امریکہ", "Brazil": "برازیل", "Indonesia": "انڈونیشیا", "Pakistan": "پاکستان",
            "Bangladesh": "بنگلہ دیش", "Mexico": "میکسیکو", "Germany": "جرمنی", "France": "فرانس", "Italy": "اٹلی",
            "Spain": "اسپین", "Turkey": "ترکی", "Russia": "روس", "Japan": "جاپان", "Korea": "کوریا",
            "Vietnam": "ویتنام", "Thailand": "تھائی لینڈ", "Philippines": "فلپائن", "Egypt": "مصر", "Nigeria": "نائیجیریا",
            "South Africa": "جنوبی افریقہ", "Canada": "کینیڈا", "Australia": "آسٹریلیا"
        },
        "ta": { # Tamil
            "Download": "பதிவிறக்கம்", "Save": "சேமி", "Video": "வீடியோ", "Reels": "ரீல்கள்", "Photo": "புகைப்படம்", "Story": "ஸ்டோரி",
            "without watermark": "வாட்டர்மார்க் இல்லாமல்", "Free": "இலவசம்", "Fast": "வேகமாக", "Safe": "பாதுகாப்பானது", "HD": "எச்டி",
            "India": "இந்தியா", "USA": "அமெரிக்கா", "Brazil": "பிரேசில்", "Indonesia": "இந்தோனேசியா", "Pakistan": "பாகிஸ்தான்",
            "Bangladesh": "வங்காளதேசம்", "Mexico": "மெக்சிகோ", "Germany": "ஜெர்மனி", "France": "பிரான்ஸ்", "Italy": "இத்தாலி",
            "Spain": "ஸ்பெயின்", "Turkey": "துருக்கி", "Russia": "ரஷ்யா", "Japan": "ஜப்பான்", "Korea": "கொரியா",
            "Vietnam": "வியட்நாம்", "Thailand": "தாய்லாந்து", "Philippines": "பிலிப்பைன்ஸ்", "Egypt": "எகிப்து", "Nigeria": "நைஜீரியா",
            "South Africa": "தென்னாப்பிரிக்கா", "Canada": "கனடா", "Australia": "ஆஸ்திரேலியா"
        },
        "th": { # Thai
            "Download": "ดาวน์โหลด", "Save": "บันทึก", "Video": "วิดีโอ", "Reels": "รีล", "Photo": "รูปภาพ", "Story": "สตอรี่",
            "without watermark": "ไม่มีลายน้ำ", "Free": "ฟรี", "Fast": "เร็ว", "Safe": "ปลอดภัย", "HD": "HD",
            "India": "อินเดีย", "USA": "สหรัฐอเมริกา", "Brazil": "บราซิล", "Indonesia": "อินโดนีเซีย", "Pakistan": "ปากีสถาน",
            "Bangladesh": "บังกลาเทศ", "Mexico": "เม็กซิโก", "Germany": "เยอรมนี", "France": "ฝรั่งเศส", "Italy": "อิตาลี",
            "Spain": "สเปน", "Turkey": "ตุรกี", "Russia": "รัสเซีย", "Japan": "ญี่ปุ่น", "Korea": "เกาหลี",
            "Vietnam": "เวียดนาม", "Thailand": "ไทย", "Philippines": "ฟิลิปปินส์", "Egypt": "อียิปต์", "Nigeria": "ไนจีเรีย",
            "South Africa": "แอฟริกาใต้", "Canada": "แคนาดา", "Australia": "ออสเตรเลีย"
        },
        "uk": { # Ukrainian
            "Download": "Завантажити", "Save": "Зберегти", "Video": "Відео", "Reels": "Рілс", "Photo": "Фото", "Story": "Сторіс",
            "without watermark": "без водяного знака", "Free": "Безкоштовно", "Fast": "Швидко", "Safe": "Безпечно", "HD": "HD",
            "India": "Індія", "USA": "США", "Brazil": "Бразилія", "Indonesia": "Індонезія", "Pakistan": "Пакистан",
            "Bangladesh": "Бангладеш", "Mexico": "Мексика", "Germany": "Німеччина", "France": "Франція", "Italy": "Італія",
            "Spain": "Іспанія", "Turkey": "Туреччина", "Russia": "Росія", "Japan": "Японія", "Korea": "Корея",
            "Vietnam": "Вьєтнам", "Thailand": "Таїланд", "Philippines": "Філіппіни", "Egypt": "Єгипет", "Nigeria": "Нігерія",
            "South Africa": "ПАР", "Canada": "Канада", "Australia": "Австраλία"
        }

    }

    # Helper for generic translation
    def translate_text(text, locale):
        if locale not in translations:
            return text
        
        lt = translations[locale]
        result = text
        for en_word, loc_word in lt.items():
            # Match whole words only to avoid partial replacements
            result = re.sub(r'\b' + re.escape(en_word) + r'\b', loc_word, result, flags=re.IGNORECASE)
        return result

    files = [f for f in os.listdir(dict_dir) if f.endswith('.json') and f != 'en.json']
    updated_count = 0

    for filename in files:
        file_path = os.path.join(dict_dir, filename)
        locale = filename.replace('.json', '')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        changed = False

        # Ensure platforms.seo_pages exists
        if 'platforms' not in data: data['platforms'] = {}
        if 'seo_pages' not in data['platforms']: data['platforms']['seo_pages'] = {}

        master_pages = master_en['platforms']['seo_pages']
        target_pages = data['platforms']['seo_pages']

        for key, master_val in master_pages.items():
            if key not in target_pages or target_pages[key] == master_val:
                # Key is missing or is exactly the English master value (placeholder)
                new_val = json.loads(json.dumps(master_val)) # Deep copy
                
                # Apply localized translations to strings
                def deep_translate(obj):
                    if isinstance(obj, str):
                        return translate_text(obj, locale)
                    elif isinstance(obj, dict):
                        return {k: deep_translate(v) for k, v in obj.items()}
                    elif isinstance(obj, list):
                        return [deep_translate(i) for i in obj]
                    return obj

                target_pages[key] = deep_translate(new_val)
                changed = True

        if changed:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            updated_count += 1
            print(f"Updated {filename} with localized SEO pages.")

    print(f"Successfully completed localization sync for {updated_count} files.")

if __name__ == "__main__":
    mega_seo_sync()
