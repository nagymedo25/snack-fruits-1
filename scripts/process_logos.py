"""
Generate optimized logos (WebP) + favicon set from the brand logos.
- Removes background → transparent
- Trims to content
- Upscales 2× for retina
- Saves as WebP (smallest)
- Generates favicon.ico, apple-touch-icon.png, favicon-16/32.png
"""
from PIL import Image, ImageChops
import os

def process_logo(src, dst_webp):
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    # Detect bg from corners
    corners = [img.getpixel((2, 2)), img.getpixel((w - 3, 2)), img.getpixel((2, h - 3)), img.getpixel((w - 3, h - 3))]
    bg_r = sum(c[0] for c in corners) // 4
    bg_g = sum(c[1] for c in corners) // 4
    bg_b = sum(c[2] for c in corners) // 4
    pixels = img.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            dist = abs(r - bg_r) + abs(g - bg_g) + abs(b - bg_b)
            if dist < 70:
                pixels[x, y] = (r, g, b, 0)
            else:
                pixels[x, y] = (r, g, b, 255 if a > 100 else a)
    # Trim transparent borders
    bg = Image.new("RGBA", img.size, (0, 0, 0, 0))
    diff = ImageChops.difference(img, bg)
    bbox = diff.getbbox()
    if bbox:
        pad = 6
        left = max(0, bbox[0] - pad); top = max(0, bbox[1] - pad)
        right = min(img.size[0], bbox[2] + pad); bottom = min(img.size[1], bbox[3] + pad)
        img = img.crop((left, top, right, bottom))
    # Upscale 2× for retina
    img = img.resize((img.size[0] * 2, img.size[1] * 2), Image.LANCZOS)
    img.save(dst_webp, "WEBP", quality=90, method=6)
    size_kb = os.path.getsize(dst_webp) / 1024
    print(f"{dst_webp}: {img.size[0]}x{img.size[1]}  ({size_kb:.1f} KB)")
    return img

os.makedirs("/home/z/my-project/public", exist_ok=True)

light_img = process_logo(
    "/home/z/my-project/upload/Light-Mode-Logo.png",
    "/home/z/my-project/public/light-logo.webp",
)
dark_img = process_logo(
    "/home/z/my-project/upload/Dark-Mode-Logo.png",
    "/home/z/my-project/public/dark-logo.webp",
)

# Generate favicon set from light logo
# favicon.ico (multi-size 16/32/48)
sizes = [16, 32, 48]
icons = [light_img.resize((s, s), Image.LANCZOS) for s in sizes]
icons[0].save(
    "/home/z/my-project/public/favicon.ico",
    format="ICO",
    sizes=[(s, s) for s in sizes],
    append_images=icons[1:],
)
print("favicon.ico saved")

# Apple touch icon (180×180 with white bg since iOS doesn't support transparency)
apple = Image.new("RGBA", (180, 180), (255, 255, 255, 255))
logo_resized = light_img.resize((140, 140), Image.LANCZOS)
apple.paste(logo_resized, (20, 20), logo_resized)
apple.save("/home/z/my-project/public/apple-touch-icon.png", "PNG", optimize=True)
print("apple-touch-icon.png saved")

# favicon-32.png and favicon-16.png (modern browsers prefer PNG)
light_img.resize((32, 32), Image.LANCZOS).save("/home/z/my-project/public/favicon-32.png", "PNG", optimize=True)
light_img.resize((16, 16), Image.LANCZOS).save("/home/z/my-project/public/favicon-16.png", "PNG", optimize=True)
print("favicon-32.png and favicon-16.png saved")

print("\nAll done.")
