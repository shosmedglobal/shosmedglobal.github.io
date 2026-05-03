"""
One-shot processor: takes the user-supplied JPGs from Desktop and stages them
into assets/lf3/ in the formats the homepage expects.

- Logos: removes near-white background -> transparent PNG so the
  CSS `filter: brightness(0) invert(1)` silhouette renders cleanly.
- Hero: resizes clinical training shot + emits a .webp sibling.
- FNKV + group: resized JPGs ready for credibility / community sections.
"""
from pathlib import Path
from PIL import Image

DESKTOP = Path.home() / "OneDrive" / "Desktop"
OUT = Path(__file__).resolve().parent.parent / "assets" / "lf3"
OUT.mkdir(parents=True, exist_ok=True)


def remove_white_bg(src: Path, dst: Path, hi: int = 248, lo: int = 215, max_w: int = 720) -> None:
    """Pixels with min(R,G,B) >= hi -> alpha 0; below lo -> alpha 255; soft ramp between.
    Logos render at 44-88px height, so cap width at 720px (retina-safe) to keep PNGs small."""
    img = Image.open(src).convert("RGBA")
    if img.width > max_w:
        ratio = max_w / img.width
        img = img.resize((max_w, int(img.height * ratio)), Image.LANCZOS)
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = px[x, y]
            luma = min(r, g, b)
            if luma >= hi:
                a = 0
            elif luma <= lo:
                a = 255
            else:
                a = int(255 * (hi - luma) / (hi - lo))
            px[x, y] = (r, g, b, a)
    img.save(dst, "PNG", optimize=True)


def resize_jpg(src: Path, dst: Path, max_w: int = 1600, quality: int = 84) -> Image.Image:
    img = Image.open(src).convert("RGB")
    if img.width > max_w:
        ratio = max_w / img.width
        img = img.resize((max_w, int(img.height * ratio)), Image.LANCZOS)
    img.save(dst, "JPEG", quality=quality, optimize=True, progressive=True)
    return img


def emit_webp(img: Image.Image, dst: Path, quality: int = 80) -> None:
    img.save(dst, "WEBP", quality=quality, method=6)


def main() -> None:
    # 1) Logos -> transparent PNG silhouettes
    remove_white_bg(DESKTOP / "LF3 Logo.jpg", OUT / "charles-uni-lf3-en.png")
    remove_white_bg(DESKTOP / "LF3 LOGO 2.jpg", OUT / "charles-uni-lf3-cs.png")

    # 2) Clinical hero (Students.jpg) -> jpg + webp
    hero = resize_jpg(DESKTOP / "Students.jpg", OUT / "clinical-hero.jpg", max_w=1600)
    emit_webp(hero, OUT / "clinical-hero.webp")

    # 3) FNKV credibility photos
    resize_jpg(DESKTOP / "FNKV.jpg", OUT / "fnkv-summer.jpg", max_w=1400)
    resize_jpg(DESKTOP / "FNKV2.jpg", OUT / "fnkv-winter.jpg", max_w=1400)

    # 4) Trimed-style group photo (testimonials / community)
    resize_jpg(DESKTOP / "Students 2.jpg", OUT / "students-group.jpg", max_w=1800, quality=82)

    print("done -> assets/lf3/")
    for p in sorted(OUT.glob("*")):
        print(f"  {p.name}: {p.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
