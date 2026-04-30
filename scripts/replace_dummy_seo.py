import os
import json
import re

def replace_dummy_seo():
    dict_dir = 'src/dictionaries'
    
    # 40 High-Intent SEO Keywords and their English content
    new_seo_keys = {
        "download_instagram_reels_on_iphone": {
            "title": "Download Instagram Reels on iPhone",
            "subtitle": "The easiest way to Save Instagram Reels directly to your iPhone camera roll.",
            "seo": {
                "title": "Download Instagram Reels on iPhone - Fast & Free",
                "desc": "Save Instagram Reels on iPhone in HD quality without any app installation."
            }
        },
        "save_tiktok_videos_without_app": {
            "title": "Save TikTok Videos Without App",
            "subtitle": "Download TikTok videos online without installing any extra applications.",
            "seo": {
                "title": "Save TikTok Videos Without App - No Watermark",
                "desc": "Quickly Save TikTok Videos Without App. 100% web-based and secure."
            }
        },
        "facebook_video_downloader_hd_1080p_free": {
            "title": "Facebook Video Downloader HD 1080p",
            "subtitle": "Extract Facebook videos in crystal clear 1080p HD quality for free.",
            "seo": {
                "title": "Facebook Video Downloader HD 1080p Free",
                "desc": "Best Facebook Video Downloader HD 1080p Free tool. Save FB videos in high resolution."
            }
        },
        "download_youtube_shorts_to_camera_roll": {
            "title": "Download YouTube Shorts to Camera Roll",
            "subtitle": "Save trending YouTube Shorts directly to your mobile device's gallery.",
            "seo": {
                "title": "Download YouTube Shorts to Camera Roll Instantly",
                "desc": "Learn how to Download YouTube Shorts to Camera Roll on iOS and Android easily."
            }
        },
        "save_twitter_videos_to_android_gallery": {
            "title": "Save Twitter Videos to Android Gallery",
            "subtitle": "The fastest way to download X/Twitter videos on your Android phone.",
            "seo": {
                "title": "Save Twitter Videos to Android Gallery - HD MP4",
                "desc": "Easily Save Twitter Videos to Android Gallery with our high-speed downloader."
            }
        },
        "snapchat_spotlight_downloader_no_watermark": {
            "title": "Snapchat Spotlight Downloader No Watermark",
            "subtitle": "Save funny and viral Snapchat Spotlights without any branding.",
            "seo": {
                "title": "Snapchat Spotlight Downloader No Watermark Free",
                "desc": "Use our Snapchat Spotlight Downloader No Watermark to save your favorite snaps."
            }
        },
        "instagram_story_saver_anonymous_viewer": {
            "title": "Instagram Story Saver & Anonymous Viewer",
            "subtitle": "Watch and download Instagram Stories without the creator knowing.",
            "seo": {
                "title": "Instagram Story Saver Anonymous Viewer",
                "desc": "Private Instagram Story Saver Anonymous Viewer. Save stories secretly."
            }
        },
        "download_private_facebook_videos_online": {
            "title": "Download Private Facebook Videos Online",
            "subtitle": "Securely save videos from private Facebook groups and profiles.",
            "seo": {
                "title": "Download Private Facebook Videos Online Free",
                "desc": "Tool to Download Private Facebook Videos Online. Fast, secure, and 100% working."
            }
        },
        "tiktok_to_mp3_audio_converter_free": {
            "title": "TikTok to MP3 Audio Converter Free",
            "subtitle": "Extract high-quality audio and sounds from any TikTok video.",
            "seo": {
                "title": "TikTok to MP3 Audio Converter Free - 320kbps",
                "desc": "Best TikTok to MP3 Audio Converter Free. Save trending TikTok sounds instantly."
            }
        },
        "youtube_music_downloader_320kbps": {
            "title": "YouTube Music Downloader 320kbps",
            "subtitle": "Convert YouTube videos to premium quality MP3 audio files.",
            "seo": {
                "title": "YouTube Music Downloader 320kbps High Quality",
                "desc": "Fast YouTube Music Downloader 320kbps. Build your offline playlist easily."
            }
        },
        "download_instagram_photos_high_resolution": {
            "title": "Download Instagram Photos High Resolution",
            "subtitle": "Save Instagram pictures in their original, uncompressed quality.",
            "seo": {
                "title": "Download Instagram Photos High Resolution Free",
                "desc": "Easily Download Instagram Photos High Resolution. Get original image quality."
            }
        },
        "save_instagram_carousel_multiple_images": {
            "title": "Save Instagram Carousel Multiple Images",
            "subtitle": "Download all photos and videos from an Instagram carousel post at once.",
            "seo": {
                "title": "Save Instagram Carousel Multiple Images in Bulk",
                "desc": "Tool to Save Instagram Carousel Multiple Images. Extract entire albums quickly."
            }
        },
        "facebook_reels_downloader_no_login": {
            "title": "Facebook Reels Downloader No Login",
            "subtitle": "Save viral Facebook Reels without needing to sign into your account.",
            "seo": {
                "title": "Facebook Reels Downloader No Login Required",
                "desc": "Fast Facebook Reels Downloader No Login. 100% secure and anonymous."
            }
        },
        "tiktok_video_downloader_without_watermark_hd": {
            "title": "TikTok Video Downloader Without Watermark HD",
            "subtitle": "The ultimate tool for clear, logo-free TikTok saves.",
            "seo": {
                "title": "TikTok Video Downloader Without Watermark HD Quality",
                "desc": "Premium TikTok Video Downloader Without Watermark HD. Fast and free."
            }
        },
        "twitter_gif_downloader_online_free": {
            "title": "Twitter GIF Downloader Online Free",
            "subtitle": "Convert and save animated GIFs from Twitter as MP4 videos.",
            "seo": {
                "title": "Twitter GIF Downloader Online Free & Fast",
                "desc": "Use our Twitter GIF Downloader Online Free to save memes and animations."
            }
        },
        "download_telegram_videos_from_private_channel": {
            "title": "Download Telegram Videos From Private Channel",
            "subtitle": "Securely extract media from Telegram groups and channels.",
            "seo": {
                "title": "Download Telegram Videos From Private Channel Tool",
                "desc": "How to Download Telegram Videos From Private Channel. Safe media extraction."
            }
        },
        "save_instagram_highlights_to_gallery": {
            "title": "Save Instagram Highlights to Gallery",
            "subtitle": "Archive your favorite Instagram Profile Highlights permanently.",
            "seo": {
                "title": "Save Instagram Highlights to Gallery - Story Downloader",
                "desc": "Easily Save Instagram Highlights to Gallery. Keep your favorite memories offline."
            }
        },
        "youtube_video_to_mp4_converter_hd": {
            "title": "YouTube Video to MP4 Converter HD",
            "subtitle": "Transform YouTube links into high-definition MP4 files.",
            "seo": {
                "title": "YouTube Video to MP4 Converter HD Online",
                "desc": "Free YouTube Video to MP4 Converter HD. Save videos for offline viewing."
            }
        },
        "download_facebook_live_streams_recorded": {
            "title": "Download Facebook Live Streams Recorded",
            "subtitle": "Save past Facebook Live broadcasts directly to your device.",
            "seo": {
                "title": "Download Facebook Live Streams Recorded Free",
                "desc": "Tool to Download Facebook Live Streams Recorded. Archive long videos easily."
            }
        },
        "tiktok_story_downloader_online_free": {
            "title": "TikTok Story Downloader Online Free",
            "subtitle": "Save disappearing TikTok Stories before they vanish.",
            "seo": {
                "title": "TikTok Story Downloader Online Free & Anonymous",
                "desc": "Use the TikTok Story Downloader Online Free to save temporary videos."
            }
        },
        "save_snapchat_stories_without_them_knowing": {
            "title": "Save Snapchat Stories Without Them Knowing",
            "subtitle": "Anonymously download Snapchat Stories securely.",
            "seo": {
                "title": "Save Snapchat Stories Without Them Knowing - Secret Downloader",
                "desc": "How to Save Snapchat Stories Without Them Knowing. 100% private and safe."
            }
        },
        "instagram_profile_picture_downloader_hd": {
            "title": "Instagram Profile Picture Downloader HD",
            "subtitle": "View and save full-size Instagram DP (profile pictures).",
            "seo": {
                "title": "Instagram Profile Picture Downloader HD Zoom",
                "desc": "Best Instagram Profile Picture Downloader HD. View any DP in full resolution."
            }
        },
        "download_youtube_thumbnails_high_quality": {
            "title": "Download YouTube Thumbnails High Quality",
            "subtitle": "Extract 4K and HD thumbnail images from any YouTube video.",
            "seo": {
                "title": "Download YouTube Thumbnails High Quality Free",
                "desc": "Quickly Download YouTube Thumbnails High Quality for your own projects."
            }
        },
        "facebook_audio_extractor_from_video": {
            "title": "Facebook Audio Extractor From Video",
            "subtitle": "Convert Facebook videos to MP3 audio files instantly.",
            "seo": {
                "title": "Facebook Audio Extractor From Video Online",
                "desc": "Free Facebook Audio Extractor From Video. Save speeches and music easily."
            }
        },
        "tiktok_sound_downloader_mp3": {
            "title": "TikTok Sound Downloader MP3",
            "subtitle": "Get the original audio track from viral TikToks.",
            "seo": {
                "title": "TikTok Sound Downloader MP3 - Fast Audio Save",
                "desc": "Use our TikTok Sound Downloader MP3 to save trending music and sounds."
            }
        },
        "twitter_media_downloader_all_in_one": {
            "title": "Twitter Media Downloader All In One",
            "subtitle": "Save videos, GIFs, and photos from X/Twitter in one place.",
            "seo": {
                "title": "Twitter Media Downloader All In One Tool",
                "desc": "The ultimate Twitter Media Downloader All In One. Fast, secure, and free."
            }
        },
        "instagram_igtv_video_downloader_online": {
            "title": "Instagram IGTV Video Downloader Online",
            "subtitle": "Save long-form Instagram IGTV videos to your computer or phone.",
            "seo": {
                "title": "Instagram IGTV Video Downloader Online HD",
                "desc": "Fast Instagram IGTV Video Downloader Online. Archive long videos instantly."
            }
        },
        "save_youtube_videos_for_offline_viewing": {
            "title": "Save YouTube Videos For Offline Viewing",
            "subtitle": "The best way to keep YouTube content when you have no internet.",
            "seo": {
                "title": "Save YouTube Videos For Offline Viewing Free",
                "desc": "Learn how to Save YouTube Videos For Offline Viewing safely and legally."
            }
        },
        "download_facebook_stories_anonymously": {
            "title": "Download Facebook Stories Anonymously",
            "subtitle": "Watch and save FB stories without appearing in the viewer list.",
            "seo": {
                "title": "Download Facebook Stories Anonymously & Free",
                "desc": "Tool to Download Facebook Stories Anonymously. Protect your privacy."
            }
        },
        "tiktok_slideshow_downloader_without_watermark": {
            "title": "TikTok Slideshow Downloader Without Watermark",
            "subtitle": "Extract all photos from a TikTok photo swipe post.",
            "seo": {
                "title": "TikTok Slideshow Downloader Without Watermark Online",
                "desc": "Fast TikTok Slideshow Downloader Without Watermark. Save images in bulk."
            }
        },
        "download_instagram_reels_audio_mp3": {
            "title": "Download Instagram Reels Audio MP3",
            "subtitle": "Extract the trending background music from IG Reels.",
            "seo": {
                "title": "Download Instagram Reels Audio MP3 Free",
                "desc": "Easily Download Instagram Reels Audio MP3. Save viral sounds instantly."
            }
        },
        "youtube_playlist_video_downloader_free": {
            "title": "YouTube Playlist Video Downloader Free",
            "subtitle": "Download multiple videos from a YouTube playlist efficiently.",
            "seo": {
                "title": "YouTube Playlist Video Downloader Free Tool",
                "desc": "Best YouTube Playlist Video Downloader Free. Save educational series quickly."
            }
        },
        "save_facebook_videos_on_macbook": {
            "title": "Save Facebook Videos On Macbook",
            "subtitle": "Mac-compatible downloader for Facebook media.",
            "seo": {
                "title": "Save Facebook Videos On Macbook Instantly",
                "desc": "Guide to Save Facebook Videos On Macbook. High-speed desktop downloading."
            }
        },
        "tiktok_video_downloader_for_pc": {
            "title": "TikTok Video Downloader For PC",
            "subtitle": "Save TikToks directly to your Windows or Mac computer.",
            "seo": {
                "title": "TikTok Video Downloader For PC - No Watermark",
                "desc": "Free TikTok Video Downloader For PC. Build your offline video archive."
            }
        },
        "twitter_video_downloader_iphone_shortcut": {
            "title": "Twitter Video Downloader iPhone Shortcut",
            "subtitle": "The quickest way to save X videos on iOS.",
            "seo": {
                "title": "Twitter Video Downloader iPhone Shortcut Guide",
                "desc": "Use our web-based Twitter Video Downloader iPhone Shortcut alternative."
            }
        },
        "instagram_reels_downloader_for_whatsapp_status": {
            "title": "Instagram Reels Downloader For WhatsApp Status",
            "subtitle": "Save Reels in the perfect format to share on WhatsApp.",
            "seo": {
                "title": "Instagram Reels Downloader For WhatsApp Status Quick",
                "desc": "Best Instagram Reels Downloader For WhatsApp Status. Share with friends easily."
            }
        },
        "download_youtube_shorts_in_4k": {
            "title": "Download YouTube Shorts in 4K",
            "subtitle": "Get ultra-high definition versions of YouTube Shorts.",
            "seo": {
                "title": "Download YouTube Shorts in 4K Resolution",
                "desc": "Tool to Download YouTube Shorts in 4K. Experience unparalleled clarity."
            }
        },
        "facebook_video_downloader_chrome_extension": {
            "title": "Facebook Video Downloader Chrome Extension",
            "subtitle": "One-click downloads right from your browser.",
            "seo": {
                "title": "Facebook Video Downloader Chrome Extension Alternative",
                "desc": "Use our fast web alternative to a Facebook Video Downloader Chrome Extension."
            }
        },
        "tiktok_no_watermark_downloader_ios": {
            "title": "TikTok No Watermark Downloader iOS",
            "subtitle": "Perfectly optimized for Apple devices.",
            "seo": {
                "title": "TikTok No Watermark Downloader iOS App Alternative",
                "desc": "Free web-based TikTok No Watermark Downloader iOS. Fast and secure."
            }
        },
        "save_instagram_live_videos_after_ended": {
            "title": "Save Instagram Live Videos After Ended",
            "subtitle": "Download recorded IG Live streams for offline viewing.",
            "seo": {
                "title": "Save Instagram Live Videos After Ended Free",
                "desc": "How to Save Instagram Live Videos After Ended. Archive long broadcasts."
            }
        }
    }

    # Reusing the translation map from the previous task
    translations = {
        "ar": { "Download": "تحميل", "Save": "حفظ", "Video": "فيديو", "Reels": "ريلز", "Photo": "صورة", "Story": "ستوري", "without watermark": "بدون علامة مائية", "Free": "مجاني", "Fast": "سريع", "Safe": "آمن", "HD": "عالي الجودة" },
        "bn": { "Download": "ডাউনলোড", "Save": "সংরক্ষণ", "Video": "ভিডিও", "Reels": "রিলস", "Photo": "ছবি", "Story": "স্টোরি", "without watermark": "ওয়াটারমার্ক ছাড়া", "Free": "ফ্রি", "Fast": "দ্রুত", "Safe": "নিরাপদ", "HD": "এইচডি" },
        "es": { "Download": "Descargar", "Save": "Guardar", "Video": "Video", "Reels": "Reels", "Photo": "Foto", "Story": "Historia", "without watermark": "sin marca de agua", "Free": "Gratis", "Fast": "Rápido", "Safe": "Seguro", "HD": "HD" },
        "hi": { "Download": "डाउनलोड", "Save": "सहेजें", "Video": "वीडियो", "Reels": "रील्स", "Photo": "फोटो", "Story": "स्टोरी", "without watermark": "बिना वॉटरमार्क के", "Free": "मुफ्त", "Fast": "तेज़", "Safe": "सुरक्षित", "HD": "एचडी" },
        "id": { "Download": "Unduh", "Save": "Simpan", "Video": "Video", "Reels": "Reels", "Photo": "Foto", "Story": "Cerita", "without watermark": "tanpa watermark", "Free": "Gratis", "Fast": "Cepat", "Safe": "Aman", "HD": "HD" },
        "pt": { "Download": "Baixar", "Save": "Salvar", "Video": "Vídeo", "Reels": "Reels", "Photo": "Foto", "Story": "Story", "without watermark": "sem marca d'água", "Free": "Grátis", "Fast": "Rápido", "Safe": "Seguro", "HD": "HD" },
        "ru": { "Download": "Скачать", "Save": "Сохранить", "Video": "Видео", "Reels": "Рилс", "Photo": "Фото", "Story": "Сторис", "without watermark": "без водяного знака", "Free": "Бесплатно", "Fast": "Быстро", "Safe": "Безопасно", "HD": "HD" },
        "tr": { "Download": "İndir", "Save": "Kaydet", "Video": "Video", "Reels": "Makaralar", "Photo": "Fotoğraf", "Story": "Hikaye", "without watermark": "filigransız", "Free": "Ücretsiz", "Fast": "Hızlı", "Safe": "Güvenli", "HD": "HD" },
        "vi": { "Download": "Tải về", "Save": "Lưu", "Video": "Video", "Reels": "Reels", "Photo": "Ảnh", "Story": "Tin", "without watermark": "không có logo", "Free": "Miễn phí", "Fast": "Nhanh", "Safe": "An toàn", "HD": "HD" },
        "ur": { "Download": "ڈاؤن لوڈ", "Save": "محفوظ", "Video": "ویڈیو", "Reels": "ریلز", "Photo": "تصویر", "Story": "سٹوری", "without watermark": "واٹر مارک کے بغیر", "Free": "مفت", "Fast": "تیز", "Safe": "محفوظ", "HD": "ایچ ڈی" },
        "ta": { "Download": "பதிவிறக்கம்", "Save": "சேமி", "Video": "வீடியோ", "Reels": "ரீல்கள்", "Photo": "புகைப்படம்", "Story": "ஸ்டோரி", "without watermark": "வாட்டர்மார்க் இல்லாமல்", "Free": "இலவசம்", "Fast": "வேகமாக", "Safe": "பாதுகாப்பானது", "HD": "எச்டி" },
        "th": { "Download": "ดาวน์โหลด", "Save": "บันทึก", "Video": "วิดีโอ", "Reels": "รีล", "Photo": "รูปภาพ", "Story": "สตอรี่", "without watermark": "ไม่มีลายน้ำ", "Free": "ฟรี", "Fast": "เร็ว", "Safe": "ปลอดภัย", "HD": "HD" },
        "uk": { "Download": "Завантажити", "Save": "Зберегти", "Video": "Відео", "Reels": "Рілс", "Photo": "Фото", "Story": "Сторіс", "without watermark": "без водяного знака", "Free": "Безкоштовно", "Fast": "Швидко", "Safe": "Безпечно", "HD": "HD" }
    }

    def translate_text(text, locale):
        if locale not in translations:
            return text
        lt = translations[locale]
        result = text
        for en_word, loc_word in lt.items():
            result = re.sub(r'\b' + re.escape(en_word) + r'\b', loc_word, result, flags=re.IGNORECASE)
        return result

    files = [f for f in os.listdir(dict_dir) if f.endswith('.json')]
    
    for filename in files:
        file_path = os.path.join(dict_dir, filename)
        locale = filename.replace('.json', '')
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        if 'platforms' not in data or 'seo_pages' not in data['platforms']:
            continue

        seo_pages = data['platforms']['seo_pages']
        
        # 1. Delete all dummy keys
        keys_to_delete = [k for k in seo_pages.keys() if k.startswith('social_downloader_pro_')]
        for k in keys_to_delete:
            del seo_pages[k]

        # 2. Insert new keys with translation
        for key, val in new_seo_keys.items():
            new_val = json.loads(json.dumps(val))
            
            def deep_translate(obj):
                if isinstance(obj, str):
                    return translate_text(obj, locale)
                elif isinstance(obj, dict):
                    return {k: deep_translate(v) for k, v in obj.items()}
                return obj
            
            seo_pages[key] = deep_translate(new_val)

        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
        print(f"Processed {filename}: Deleted {len(keys_to_delete)} dummies, Added {len(new_seo_keys)} high-intent keys.")

if __name__ == "__main__":
    replace_dummy_seo()
