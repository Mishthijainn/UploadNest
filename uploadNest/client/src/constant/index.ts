export const LAYOUT_VIEW = {
  GRID: "GRID",
  LIST: "LIST",
} as const;

export type LayoutViewType = keyof typeof LAYOUT_VIEW;

export const IMAGE_EXTENSIONS = ["JPG", "JPEG", "PNG", "GIF", "SVG"];
