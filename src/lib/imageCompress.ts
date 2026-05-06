// Compressão client-side com canvas. Sem dependências.
export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0..1
  mime?: "image/jpeg" | "image/webp";
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
  ext: string;
}

export async function compressImage(
  file: File,
  opts: CompressOptions = {},
): Promise<CompressResult> {
  const { maxWidth = 1600, maxHeight = 1600, quality = 0.82, mime = "image/jpeg" } = opts;

  const bitmap = await createImageBitmap(file).catch(async () => {
    // fallback via <img>
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = url;
      });
      return img as unknown as ImageBitmap;
    } finally {
      URL.revokeObjectURL(url);
    }
  });

  const w0 = (bitmap as ImageBitmap).width;
  const h0 = (bitmap as ImageBitmap).height;
  const ratio = Math.min(maxWidth / w0, maxHeight / h0, 1);
  const w = Math.round(w0 * ratio);
  const h = Math.round(h0 * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, w, h);

  const blob: Blob = await new Promise((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob falhou"))), mime, quality),
  );

  return {
    blob,
    width: w,
    height: h,
    size: blob.size,
    ext: mime === "image/webp" ? "webp" : "jpg",
  };
}

export function slugifyName(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
