import type { ImageMetadata } from 'astro';

/**
 * Every photo in src/assets/photos, keyed by filename.
 *
 * The gallery content file refers to photos by name rather than by import path,
 * so Krista can add one through the CMS without anybody touching code. This is
 * what turns that name back into an image Astro can resize and re-encode.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/photos/*.{jpeg,jpg,png,webp,avif}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [
    path.split('/').pop()!,
    mod.default,
  ]),
);

/**
 * Accepts either a bare filename or a full path. The CMS writes the whole
 * path it uploaded to, while hand-edited entries tend to be just the name;
 * both should resolve to the same photo.
 */
export function photo(file: string): ImageMetadata | undefined {
  const name = decodeURIComponent(file).split('/').pop();
  return name ? byName.get(name) : undefined;
}

export interface GalleryItem {
  file: string;
  alt: string;
}

export interface ResolvedPhoto {
  image: ImageMetadata;
  alt: string;
}

/**
 * Drops any entry whose file is missing rather than failing the build — a
 * deleted photo should never take the whole site down.
 */
export function resolveGallery(items: GalleryItem[]): ResolvedPhoto[] {
  return items.flatMap((item) => {
    const image = photo(item.file);
    if (!image) {
      console.warn(`[gallery] no such photo: ${item.file} — skipping`);
      return [];
    }
    return [{ image, alt: item.alt }];
  });
}
