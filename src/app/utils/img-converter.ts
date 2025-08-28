/**
 * Converts a video or thumbnail path to a full Supabase public URL if needed.
 * @param path The path to the video or thumbnail (string)
 * @param type Either 'video' or 'thumbnail'
 * @returns The full public URL
 */
export function convertToSupabaseUrl(path: string, type: 'video' | 'thumbnail'): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = 'https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public';
  if (type === 'video') {
    return `${base}/videos/${path}`;
  } else {
    return `${base}/thumbnails/${path}`;
  }
}

