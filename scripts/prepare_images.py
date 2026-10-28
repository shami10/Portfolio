#!/usr/bin/env python3
"""
Turns the original design exports into optimized web assets.

Usage:  SRC=/path/to/Porfolio_Images python3 scripts/prepare_images.py
Needs:  pip install pillow numpy

Re-run it after you replace any original export (same file names) to refresh the site images.
Outputs: public/images/** (webp) and src/data/images.json (sizes used by the site).
"""
import json, os, glob
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops
import numpy as np

SRC = os.environ.get("SRC", "source-images")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")
os.makedirs(OUT, exist_ok=True)
manifest = {}

FONT_DIR = "/usr/share/fonts/truetype/google-fonts"
def font(name, size):
    for n in (name, "Poppins-SemiBold.ttf", "DejaVuSans-Bold.ttf"):
        for base in (FONT_DIR, "/usr/share/fonts/truetype/dejavu"):
            p = os.path.join(base, n)
            if os.path.exists(p):
                return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def src(*parts):
    return os.path.join(SRC, *parts)

def save(img, key, quality=84, maxw=None):
    if maxw and img.size[0] > maxw:
        r = maxw / img.size[0]
        img = img.resize((maxw, round(img.size[1] * r)), Image.LANCZOS)
    path = os.path.join(OUT, key + ".webp")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if img.mode == "RGBA":
        img.save(path, "WEBP", quality=quality, method=6)
    else:
        img.convert("RGB").save(path, "WEBP", quality=quality, method=6)
    manifest[key] = {"src": f"/images/{key}.webp", "w": img.size[0], "h": img.size[1]}
    return img

def load(*parts):
    im = Image.open(src(*parts))
    return im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")

# ---------------------------------------------------------------- project screens
GROUPS = {
    "gelameat/user": ("Gelameat/User Side", ["Get Started.png", "Home.png", "Dellivery Home.png", "View Item.png", "Checkout.png", "Order Placed.png", "Select Language.png"], 414),
    "gelameat/taker": ("Gelameat/Order Taker Side", ["Create Order.png", "Incoming Orders.png", "Incoming Order _ Details.png", "In Progress.png", "History.png"], 834),
    "gelameat/pos": ("Gelameat/POS Dashboard", ["Dashbord.jpg", "Inventory.jpg", "Add Inventory Item.jpg", "Add New Purchase.jpg", "Item Detail.jpg", "User Management Roles.jpg"], 1500),
    "heraf/admin": ("Heraf LMS/Admin Portal", ["Admin Dashboard.jpg", "Course Management.jpg", "Enrollment.jpg", "Registration Approvals.jpg", "Add New Course.jpg", "Student List.jpg"], 1500),
    "heraf/faculty": ("Heraf LMS/Faculty", ["Dashboard - Faculty.jpg", "Attendance.jpg", "Course Info.jpg", "Submissions.jpg"], 1500),
    "heraf/student": ("Heraf LMS/Student Portal/Web View", ["Dashboard - Registered Student.jpg", "Dashboard-My Course.jpg", "Course Material.jpg"], 1500),
    "heraf/mobile": ("Heraf LMS/Student Portal/Mobile View", ["Login-Mobile.png", "Material - Enrolled Student.png", "Lectures - Enrolled Student.png", "Course - Enrolled Student-scroll.png"], 414),
    "mood/s": ("MoodBites", ["Splash Screen.png", "Welcome Screen.png", "Location Screen-1.png", "Location Screen.png", "Home Screen.png", "Loading Screen.png", "Recommendation Screen.png", "Product Detailed Screen.png", "Cart Screen.png", "Checkout Screen.png", "Checkout Screen-1.png"], 390),
    "visionet/s": ("Visionet", ["Hero_Section.jpg", "Trusted_Section.jpg", "Enterprises_Section.jpg", "Services_Section.jpg", "Industries_Section.jpg", "Strategy_Section.jpg", "Success_Stories_Section.jpg", "Testimonials_Section.jpg", "News_Section.jpg", "Contact_Section.jpg", "Frame 168.jpg"], 1500),
    "buff/s": ("BUFF", ["1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp"], 230),
    # Facebloom: screens 2 and 5 show celebrity / third-party faces and are left out on purpose
    "facebloom/s": ("Facebloom", ["1.webp", "3.webp", "7.webp", "4.webp", "6.webp"], 230),
    "realestate/s": ("Real Estate", ["Splash Screen.png", "Home.png", "Real Estates List by Category.png", "Top Agents - Profile Detail.png", "Location - Choose Location.png", "Chat.png", "FAQ.png", "Payment - Paypal.png"], 375),
    "proposals/s": ("Proposal", ["Dashboard.jpg", "Contacts.jpg", "Configure.jpg", "Pricing Tool Set Up _ Pricing Settings-1.jpg", "Pricing Tool Set Up _ Pricing Settings.jpg", "Setting_Manage user.jpg", "Super Admin.jpg"], 1500),
}
for prefix, (folder, files, maxw) in GROUPS.items():
    for i, f in enumerate(files, 1):
        im = load(*folder.split("/"), f)
        save(im, f"{prefix}-{i}", quality=86 if im.mode == "RGBA" else 82, maxw=maxw)

# ---------------------------------------------------------------- live session dashboard (logo swapped for a neutral one)
dash = load("Live Session Dashboard", "Session Dashboard.jpg").convert("RGB")
arr = np.array(dash)
region = arr[0:80, 0:250]
mask = (region < 235).any(axis=2)
ys, xs = np.where(mask)
x0, x1, y0, y1 = xs.min() - 4, xs.max() + 4, ys.min() - 4, ys.max() + 4
d = ImageDraw.Draw(dash)
d.rectangle([x0, y0, x1, y1], fill=(255, 255, 255))
navy = (14, 42, 92)
h = y1 - y0
d.rounded_rectangle([x0 + 2, y0 + 6, x0 + 2 + h - 12, y0 + h - 6], radius=8, fill=navy)
d.ellipse([x0 + 9, y0 + 13, x0 + h - 19, y0 + h - 13], outline=(255, 255, 255), width=3)
d.text((x0 + h + 2, y0 + h / 2), "Session Lab", font=font("Poppins-SemiBold.ttf", 22), fill=navy, anchor="lm")
save(dash, "live/dashboard", quality=88, maxw=1600)
save(load("Live Session Dashboard", "Participant Side Drawer.jpg"), "live/drawer", quality=90, maxw=1000)

# ---------------------------------------------------------------- photos
PHOTO = os.environ.get("PHOTO", os.path.join(ROOT, "scripts", "assets", "portrait.png"))
ABOUT = os.environ.get("ABOUT", os.path.join(ROOT, "scripts", "assets", "about.jpg"))
APPROACH = os.path.join(ROOT, "scripts", "assets", "approach.jpg")
portrait = Image.open(PHOTO).convert("RGBA")
a = np.array(portrait)
alpha = Image.fromarray(a[:, :, 3])
alpha = alpha.point(lambda v: 255 if v > 200 else (0 if v < 20 else v))
alpha = alpha.filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(0.9))   # trims the light fringe left by the old background
portrait.putalpha(alpha)
save(portrait, "photo/portrait", quality=90)
save(Image.open(ABOUT).convert("RGB"), "photo/about", quality=86, maxw=1200)
save(Image.open(APPROACH).convert("RGB"), "photo/approach", quality=88)

# square headshot on a violet gradient (About preview, About page, social preview)
def violet_square(n):
    yy, xx = np.mgrid[0:n, 0:n]
    t = ((xx + (n - yy)) / (2 * n))[..., None]
    c1, c2 = np.array([36, 22, 110]), np.array([124, 92, 255])
    g = np.clip(1 - np.sqrt(((xx - n * .5) / (n * .7)) ** 2 + ((yy - n * .35) / (n * .7)) ** 2), 0, 1)[..., None] * 60
    return Image.fromarray(np.clip(c1 * (1 - t) + c2 * t + g, 0, 255).astype("uint8")).convert("RGBA")
head = portrait.crop((150, 10, 900, 760)).resize((900, 900), Image.LANCZOS)
sq = violet_square(900); sq.alpha_composite(head)
save(sq, "photo/headshot", quality=88)

# ---------------------------------------------------------------- cover compositions
W, H = 1600, 1000
def bg(c1, c2, glow, gpos=(0.7, 0.35)):
    yy, xx = np.mgrid[0:H, 0:W]
    t = (xx / W * 0.6 + yy / H * 0.4)[..., None]
    base = np.array(c1) * (1 - t) + np.array(c2) * t
    d = np.sqrt(((xx - W * gpos[0]) / (W * 0.55)) ** 2 + ((yy - H * gpos[1]) / (H * 0.6)) ** 2)
    g = (np.clip(1 - d, 0, 1) ** 1.6)[..., None] * np.array(glow)
    return Image.fromarray(np.clip(base + g, 0, 255).astype("uint8")).convert("RGBA")

def rounded(im, r):
    im = im.convert("RGBA")
    m = Image.new("L", im.size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, im.size[0] - 1, im.size[1] - 1], radius=r, fill=255)
    out = im.copy()
    out.putalpha(ImageChops.multiply(m, im.split()[3]))
    return out

def put(canvas, im, x, y, height=None, width=None, rot=0, radius=0, crop=None):
    im = im.convert("RGBA")
    if crop: im = im.crop(crop)
    if height: im = im.resize((round(im.size[0] * height / im.size[1]), height), Image.LANCZOS)
    if width: im = im.resize((width, round(im.size[1] * width / im.size[0])), Image.LANCZOS)
    if radius: im = rounded(im, radius)
    pad = 120
    layer = Image.new("RGBA", (im.size[0] + pad * 2, im.size[1] + pad * 2), (0, 0, 0, 0))
    sh = Image.new("RGBA", im.size, (6, 3, 24, 190))
    sh.putalpha(ImageChops.multiply(sh.split()[3], im.split()[3]))
    layer.paste(sh, (pad, pad + 26), sh)
    layer = layer.filter(ImageFilter.GaussianBlur(26))
    layer.alpha_composite(im, (pad, pad))
    if rot: layer = layer.rotate(rot, resample=Image.BICUBIC, expand=True)
    canvas.alpha_composite(layer, (x - pad, y - pad))

def L(*parts): return load(*parts)
def cover(key, canvas):
    os.makedirs(os.path.dirname(os.path.join(OUT, key)), exist_ok=True)
    canvas.convert("RGB").save(os.path.join(OUT, f"{key}.webp"), "WEBP", quality=84, method=6)
    manifest[key] = {"src": f"/images/{key}.webp", "w": W, "h": H}

c = bg((20, 14, 58), (34, 20, 92), (70, 40, 150), (0.75, 0.3))
put(c, L("Gelameat", "POS Dashboard", "Dashbord.jpg"), 640, 150, width=900, radius=18, crop=(0, 0, 1366, 920))
put(c, L("Gelameat", "Order Taker Side", "Incoming Orders.png"), 330, 260, height=640, radius=26)
put(c, L("Gelameat", "User Side", "Home.png"), 70, 330, height=620, radius=30)
cover("covers/gelameat", c)

c = bg((14, 12, 50), (22, 18, 80), (50, 90, 190), (0.3, 0.3))
put(c, Image.open(os.path.join(OUT, "live/dashboard.webp")), 90, 130, width=1060, radius=16)
put(c, Image.open(os.path.join(OUT, "live/drawer.webp")), 1090, 200, height=700, radius=18)
cover("covers/live", c)

c = bg((16, 12, 60), (30, 22, 96), (90, 60, 220), (0.5, 0.4))
xs_ = [150, 470, 790, 1110]
for i, k in enumerate([1, 2, 3, 4]):
    put(c, Image.open(os.path.join(OUT, f"facebloom/s-{k}.webp")) if k <= 5 else None, xs_[i], 150 + (i % 2) * 70, height=620, radius=26)
cover("covers/facebloom", c)

c = bg((14, 12, 46), (26, 20, 84), (255, 110, 70), (0.5, 0.5))
put(c, L("MoodBites", "Recommendation Screen.png"), 140, 200, height=720, radius=34)
put(c, L("MoodBites", "Home Screen.png"), 520, 120, height=780, radius=34)
put(c, L("MoodBites", "Product Detailed Screen.png"), 900, 230, height=720, radius=34)
put(c, L("MoodBites", "Welcome Screen.png"), 1280, 150, height=700, radius=34, rot=0)
cover("covers/mood", c)

c = bg((16, 12, 52), (28, 20, 88), (60, 150, 120), (0.7, 0.3))
put(c, L("Heraf LMS", "Admin Portal", "Admin Dashboard.jpg"), 90, 150, width=1020, radius=14)
put(c, L("Heraf LMS", "Student Portal", "Web View", "Dashboard - Registered Student.jpg"), 520, 420, width=760, radius=14)
put(c, L("Heraf LMS", "Student Portal", "Mobile View", "Material - Enrolled Student.png"), 1230, 200, height=640, radius=30)
cover("covers/heraf", c)

c = bg((12, 10, 40), (26, 18, 80), (210, 60, 150), (0.4, 0.4))
put(c, L("Visionet", "Hero_Section.jpg"), 90, 110, width=1100, radius=14)
put(c, L("Visionet", "Strategy_Section.jpg"), 420, 520, width=900, radius=14)
put(c, L("Visionet", "Industries_Section.jpg"), 800, 300, width=720, radius=14)
cover("covers/visionet", c)

c = bg((10, 40, 70), (18, 70, 120), (60, 190, 255), (0.5, 0.35))
xs_ = [140, 460, 780, 1100]
for i, k in enumerate([1, 2, 3, 5]):
    put(c, Image.open(os.path.join(OUT, f"buff/s-{k}.webp")), xs_[i], 150 + (i % 2) * 70, height=620, radius=26)
cover("covers/buff", c)

c = bg((16, 14, 50), (24, 30, 84), (130, 200, 60), (0.5, 0.4))
put(c, L("Real Estate", "Home.png"), 200, 190, height=720, radius=34)
put(c, L("Real Estate", "Real Estates List by Category.png"), 600, 120, height=780, radius=34)
put(c, L("Real Estate", "Top Agents - Profile Detail.png"), 1000, 220, height=720, radius=34)
cover("covers/realestate", c)

c = bg((16, 14, 56), (30, 36, 110), (80, 110, 255), (0.35, 0.4))
put(c, L("Proposal", "Dashboard.jpg"), 90, 150, width=1020, radius=14)
put(c, L("Proposal", "Pricing Tool Set Up _ Pricing Settings.jpg"), 640, 400, width=860, radius=14)
cover("covers/proposals", c)

# ---------------------------------------------------------------- hero frame thumbnails (4:5)
def thumb(key, im, crop_box):
    t = im.convert("RGB").crop(crop_box)
    t = t.resize((360, 450), Image.LANCZOS)
    save(t, key, quality=84)
thumb("hero/f1", L("Gelameat", "User Side", "Home.png"), (0, 0, 414, 517))
thumb("hero/f2", Image.open(os.path.join(OUT, "live/dashboard.webp")), (0, 0, 810, 1013))
thumb("hero/f3", L("MoodBites", "Home Screen.png"), (0, 0, 390, 487))
thumb("hero/f4", L("Visionet", "Hero_Section.jpg"), (0, 0, 643, 804))
thumb("hero/f5", L("Heraf LMS", "Admin Portal", "Admin Dashboard.jpg"), (0, 0, 816, 1020))
thumb("hero/f6", L("Gelameat", "POS Dashboard", "Dashbord.jpg"), (0, 0, 1286, 1608))
thumb("hero/f7", L("Real Estate", "Home.png"), (0, 0, 375, 469))
thumb("hero/f8", L("Heraf LMS", "Student Portal", "Web View", "Dashboard - Registered Student.jpg"), (0, 0, 860, 1075))

# ---------------------------------------------------------------- social preview
og = bg((16, 11, 48), (38, 22, 104), (110, 70, 255), (0.8, 0.4)).resize((1200, 630))
card = violet_square(460)
pr = portrait.resize((round(portrait.size[0] * 560 / portrait.size[1]), 560), Image.LANCZOS)
cm = Image.new("L", card.size, 0); ImageDraw.Draw(cm).rounded_rectangle([0, 0, 459, 459], radius=34, fill=255)
card.putalpha(cm)
og.alpha_composite(card, (690, 110))
og.alpha_composite(pr, (690 + 230 - pr.size[0] // 2, 110 + 460 - 560))
d = ImageDraw.Draw(og)
d.text((70, 200), "Ahtasham Anjum", font=font("Poppins-Bold.ttf", 64), fill=(244, 241, 255))
d.text((70, 296), "Senior UI/UX and Product Designer", font=font("Poppins-Regular.ttf", 29), fill=(188, 176, 255))
d.text((70, 340), "Web, mobile, dashboards and AI products", font=font("Poppins-Regular.ttf", 26), fill=(163, 156, 208))
og.convert("RGB").save(os.path.join(ROOT, "public", "og.jpg"), quality=88)

json.dump(manifest, open(os.path.join(ROOT, "src", "data", "images.json"), "w"), indent=1)
print(len(manifest), "images written")
