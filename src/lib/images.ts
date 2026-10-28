import manifest from "@/data/images.json";

export type Img = { src: string; w: number; h: number };
const m = manifest as Record<string, Img>;

export function img(key: string): Img {
  const v = m[key];
  if (!v) throw new Error(`Missing image: ${key}`);
  return v;
}
