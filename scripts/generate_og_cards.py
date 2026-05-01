"""
Generate 1200x630 OG (Open Graph) social-share cards for shosmed.com.

Output: assets/og/<slug>.png  (committed to repo, served as og:image)

Design:
  - Navy gradient background (brand: #1B2137 -> #2A3352)
  - Gold accent rule (brand: #E8A44C)
  - SHOS Med logo (white) bottom-left
  - Page-specific title (Georgia bold) + subtitle (Arial)
  - URL ribbon top-right
  - Subtle teal border element

Run:
  python scripts/generate_og_cards.py
"""

from PIL import Image, ImageDraw, ImageFont
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "assets", "og")
LOGO_PATH = os.path.join(ROOT, "assets", "shos-logo-full-white.png")

# Brand colors (lifted from style.css :root)
NAVY        = (27, 33, 55)
NAVY_LIGHT  = (42, 51, 82)
GOLD        = (232, 164, 76)
GOLD_LIGHT  = (240, 192, 120)
TEAL        = (94, 234, 212)
WHITE       = (255, 255, 255)
WHITE_DIM   = (255, 255, 255, 200)
WHITE_VDIM  = (255, 255, 255, 110)

W, H = 1200, 630

# Fonts (Windows paths)
F_TITLE_BOLD     = r"C:\Windows\Fonts\georgiab.ttf"
F_TITLE          = r"C:\Windows\Fonts\georgia.ttf"
F_SANS_BOLD      = r"C:\Windows\Fonts\arialbd.ttf"
F_SANS           = r"C:\Windows\Fonts\arial.ttf"


def make_gradient(width, height, top, bottom):
    """Vertical linear gradient from top to bottom."""
    img = Image.new("RGB", (width, height), top)
    pix = img.load()
    for y in range(height):
        ratio = y / max(1, height - 1)
        r = int(top[0] + (bottom[0] - top[0]) * ratio)
        g = int(top[1] + (bottom[1] - top[1]) * ratio)
        b = int(top[2] + (bottom[2] - top[2]) * ratio)
        for x in range(width):
            pix[x, y] = (r, g, b)
    return img


def wrap_text(text, font, max_width, draw):
    """Break `text` into lines that each fit within `max_width` pixels in `font`."""
    words = text.split()
    lines, line = [], []
    for w in words:
        candidate = (" ".join(line + [w])).strip()
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if (bbox[2] - bbox[0]) > max_width and line:
            lines.append(" ".join(line))
            line = [w]
        else:
            line.append(w)
    if line:
        lines.append(" ".join(line))
    return lines


def render_card(slug, title, subtitle, eyebrow, out_path):
    img = make_gradient(W, H, NAVY, NAVY_LIGHT)
    draw = ImageDraw.Draw(img, "RGBA")

    # Subtle vignette: dark spot in upper-right and lower-left for depth
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    # diagonal accent strokes (tertiary brand element)
    for i, alpha in enumerate([14, 10, 6]):
        offset = i * 18
        od.line(
            [(W - 360 - offset, -40), (W + 40, 320 - offset)],
            fill=(232, 164, 76, alpha),
            width=80,
        )
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img, "RGBA")

    # Eyebrow tag (top-left), gold uppercase
    f_eyebrow = ImageFont.truetype(F_SANS_BOLD, 22)
    draw.text((72, 78), eyebrow.upper(), font=f_eyebrow, fill=GOLD)

    # Gold accent rule under eyebrow
    draw.rectangle((72, 116, 72 + 88, 120), fill=GOLD)

    # Title (Georgia Bold), wrap to fit
    f_title = ImageFont.truetype(F_TITLE_BOLD, 64)
    title_lines = wrap_text(title, f_title, max_width=W - 144, draw=draw)
    # If title is too tall (> 3 lines), shrink font
    if len(title_lines) > 3:
        f_title = ImageFont.truetype(F_TITLE_BOLD, 54)
        title_lines = wrap_text(title, f_title, max_width=W - 144, draw=draw)

    y = 158
    for line in title_lines:
        draw.text((72, y), line, font=f_title, fill=WHITE)
        bbox = draw.textbbox((0, 0), line, font=f_title)
        y += (bbox[3] - bbox[1]) + 14

    # Subtitle (Arial), 28pt, white-dim
    f_sub = ImageFont.truetype(F_SANS, 28)
    sub_lines = wrap_text(subtitle, f_sub, max_width=W - 144, draw=draw)[:3]
    y += 18
    for line in sub_lines:
        draw.text((72, y), line, font=f_sub, fill=(220, 220, 230))
        bbox = draw.textbbox((0, 0), line, font=f_sub)
        y += (bbox[3] - bbox[1]) + 8

    # Bottom-left: logo
    if os.path.exists(LOGO_PATH):
        logo = Image.open(LOGO_PATH).convert("RGBA")
        # Scale logo to height ~58px
        target_h = 58
        ratio = target_h / logo.size[1]
        target_w = int(logo.size[0] * ratio)
        logo = logo.resize((target_w, target_h), Image.LANCZOS)
        img.paste(logo, (72, H - 72 - target_h), logo)

    # Bottom-right: domain
    f_url = ImageFont.truetype(F_SANS_BOLD, 22)
    url_text = "shosmed.com"
    bbox = draw.textbbox((0, 0), url_text, font=f_url)
    url_w = bbox[2] - bbox[0]
    draw.text((W - 72 - url_w, H - 72 - 32), url_text, font=f_url, fill=GOLD_LIGHT)

    # Save
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    img.save(out_path, "PNG", optimize=True)
    print(f"  wrote {out_path}  ({img.size[0]}x{img.size[1]})")


# Per-page card definitions
CARDS = [
    {
        "slug": "home",
        "eyebrow": "SHOS Med",
        "title": "Study Medicine in Europe & Match in the US",
        "subtitle": "English-taught MD at Charles University in Prague (no MCAT). Plus USMLE and residency mentorship from physicians who walked this path.",
    },
    {
        "slug": "applicants",
        "eyebrow": "Med School Applicants",
        "title": "Apply to Charles University Medical School",
        "subtitle": "English-taught MD program in Prague. No MCAT. Application help, 1,000+ entrance exam questions, visa guidance.",
    },
    {
        "slug": "students",
        "eyebrow": "IMG Residency Match",
        "title": "Match into US Residency from European Med School",
        "subtitle": "USMLE prep, ERAS strategy, CV review, mock interviews. Mentorship from physicians who matched from Prague to US residency.",
    },
    {
        "slug": "lf3",
        "eyebrow": "Charles University LF3",
        "title": "The Third Faculty of Medicine, Prague",
        "subtitle": "Founded 1348. English-taught 6-year MD program since 1991. Top 2% of universities worldwide. No MCAT.",
    },
    {
        "slug": "mentors",
        "eyebrow": "Meet Your Mentors",
        "title": "Charles University Alumni, US-Practicing Physicians",
        "subtitle": "Physicians who walked the European med school to US residency path now guide you through every step.",
    },
    {
        "slug": "community",
        "eyebrow": "Community & Blog",
        "title": "Articles & Q&A from Physicians Who Lived It",
        "subtitle": "Charles University admissions, the LF3 entrance exam, USMLE prep, OET Medicine, IMG residency match strategy.",
    },
    {
        "slug": "blog-applying",
        "eyebrow": "Applying  ·  4 min read",
        "title": "5 Things I Wish I Knew Before Applying to Charles University",
        "subtitle": "Practical advice from a Charles University grad who is now a US physician. What I would tell my younger self.",
    },
    {
        "slug": "blog-residency",
        "eyebrow": "Residency  ·  5 min read",
        "title": "From Acceptance to Residency: Planning Your US Pathway",
        "subtitle": "A year-by-year roadmap for European medical students who want to match into US residency.",
    },
    {
        "slug": "blog-step1-pf",
        "eyebrow": "Residency  ·  6 min read",
        "title": "USMLE Step 1 Pass/Fail: What It Means for IMGs in 2026",
        "subtitle": "Four years after the switch, what actually changed for IMGs and how programs filter applicants now.",
    },
    {
        "slug": "blog-tuition",
        "eyebrow": "Applying  ·  7 min read",
        "title": "Charles University Tuition & Total Cost in 2026",
        "subtitle": "Honest 6-year breakdown: tuition, housing, food, transit, books, fees. No marketing math.",
    },
    {
        "slug": "blog-entrance-exam",
        "eyebrow": "Applying  ·  8 min read",
        "title": "LF3 Entrance Exam: What's Actually On It",
        "subtitle": "Topic-by-topic breakdown of the Charles University LF3 entrance exam: format, biology and chemistry topics tested, sample question types.",
    },
    {
        "slug": "blog-mcat-vs",
        "eyebrow": "Applying  ·  7 min read",
        "title": "MCAT vs. Charles University Entrance Exam",
        "subtitle": "Direct side-by-side comparison: length, scope, cost, timing, difficulty. Which path suits which student.",
    },
    {
        "slug": "blog-czech-visa",
        "eyebrow": "Applying  ·  9 min read",
        "title": "Czech Student Visa for US & Canadian Medical Students",
        "subtitle": "Step-by-step long-term student visa guide for medical students starting at Charles University: timing, documents, OAMP registration.",
    },
]


def main():
    print(f"Output directory: {OUT_DIR}")
    os.makedirs(OUT_DIR, exist_ok=True)
    for card in CARDS:
        out = os.path.join(OUT_DIR, f"{card['slug']}.png")
        render_card(
            slug=card["slug"],
            title=card["title"],
            subtitle=card["subtitle"],
            eyebrow=card["eyebrow"],
            out_path=out,
        )
    print(f"\nGenerated {len(CARDS)} OG cards.")


if __name__ == "__main__":
    main()
