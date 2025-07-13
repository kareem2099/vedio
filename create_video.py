import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'venv/lib/python3.13/site-packages'))

from gtts import gTTS
from moviepy.editor import *
import arabic_reshaper
from bidi.algorithm import get_display
import os
import glob
from PIL import Image

# --- 1. النص العربي الطويل ---
arabic_text = """
كل عام وانت  بخير اسيلة قلبي هذا اليو ولدت فرحة قلبي
عام جديد مليئ بالخير والسعادة يا صديقتي الصدوقة
كل عام وانت  مصدر النور لقلبي
كل عام وانت مصدر الفرح لروحي
كل سنة وانا اجمع كلمات الحب من اجل ان اصنع لك اجمل قلادة واهديها اليك
كل عام وانت بخير يا رمز الامان والاخلاص
كل عام وانت الوطن والاخت التي لم تلدها امي
عهدا لك مني اقطعه على نفسي حتى اتلفظ اخر انفاسي سأكون مخلصة لك ولحبك وصداقتك
وحتما سأوفي بعهدي ووعدي
اقولها من اعماق قلبي وووجداني
احبك يا ضياء ينير دربي
اعدك يا رفيقة الدرب سأبقى لك الاخت والصديقة
الى جميلة القلب والقالب الى سيدة النساء الى جميلة الجميلات اسيل كنت لي خير الصديقة من بداية المشوار الى نهايته اشكرك من اعماق قلبي سأبقى ارددها لك انت  صديقتي الصدوقة ورفيقة القلب والروح
كل عام وانت شمعة تضيئ حياتي كل عام وزهرة جميلة تنير حياتي
كل عام وانت بتكبري سنة وحبك بكبر بقلي اضعاف وأضعاف
كل عام وانت  سعيدة كل عام وانتبألف مليون خير

هناكَ عِندَ المنعَطَفْ،
في آخرِ الطَّريقْ،
قد كانَ لي صَديقْ..
أعزّهُ، أحبُّهُ مَحبَّةَ الشَّقيقْ
"""

# --- 2. تحويل النص إلى صوت باستخدام gTTS (صوت فتاة) ---
print("Generating audio...")
tts = gTTS(text=arabic_text, lang='ar')
tts.save("voice.mp3")
print("Audio generated: voice.mp3")

# --- 3. تجهيز الفيديو من صور الخلفية ---
print("Preparing video from images...")
image_files = sorted(glob.glob("images/*.jpeg")) # Get all jpeg images and sort them
if not image_files:
    raise FileNotFoundError("No JPEG images found in the 'images/' directory.")

# Resize images to a consistent size
target_size = (1280, 720) # Standard HD resolution
print(f"Resizing images to {target_size}...")
for i, img_path in enumerate(image_files):
    try:
        with Image.open(img_path) as img:
            img_resized = img.resize(target_size, Image.LANCZOS)
            img_resized.save(img_path)
        print(f"Resized {img_path} ({i+1}/{len(image_files)})")
    except Exception as e:
        print(f"Error resizing {img_path}: {e}")
        # Optionally, you might want to remove the problematic image from image_files or handle it differently
        # For now, we'll let it potentially fail later if it's truly unreadable.

audio_duration = AudioFileClip("voice.mp3").duration
# Calculate fps to distribute images evenly over the audio duration
fps_calculated = len(image_files) / audio_duration
# Ensure a minimum FPS to avoid extremely slow transitions
if fps_calculated < 0.5: # Set a minimum of 0.5 FPS
    fps_calculated = 0.5
video = ImageSequenceClip(image_files, fps=fps_calculated)
video = video.set_duration(audio_duration) # Ensure video duration matches audio
print(f"Video prepared from {len(image_files)} images with calculated FPS: {fps_calculated}")

# --- 4. تجهيز الكتابة (مع دعم العربية بشكل صحيح) ---
print("Preparing text overlay...")
reshaped_text = arabic_reshaper.reshape(arabic_text)
bidi_text = get_display(reshaped_text)

txt_clip = TextClip(
    bidi_text,
    font='DejaVuSans',  # Changed from Amiri-Bold to DejaVuSans
    fontsize=32,
    color='white',
    bg_color='black',
    size=video.size,
    method='caption'
).set_duration(video.duration).set_position('bottom')
print("Text overlay prepared.")

# --- 5. دمج الفيديو والنص والصوت ---
print("Compositing final video...")
final_video = CompositeVideoClip([video, txt_clip])
final_video = final_video.set_audio(AudioFileClip("voice.mp3"))
print("Video compositing complete.")

# --- 6. إخراج الفيديو النهائي ---
print("Writing final video file...")
final_video.write_videofile("birthday_message.mp4", fps=24)
print("Video saved as birthday_message.mp4")
