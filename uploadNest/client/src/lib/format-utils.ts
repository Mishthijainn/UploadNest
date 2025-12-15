const BYTE_UNIT = 1024;

// Format bytes into human-readable string
export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;

  while (bytes >= BYTE_UNIT && i < units.length - 1) {
    bytes /= BYTE_UNIT;
    i++;
  }
  const value = new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(bytes);

  return `${value}${units[i]}`;
}

export function getCleanAssetType(mimeType: string, ext: string): string {
  if (mimeType.startsWith("image/")) {
    return "Image";
  }
  if (mimeType.startsWith("video/")) {
    return "Video";
  }
  if (mimeType.startsWith("audio/")) {
    return "Audio";
  }
  if (mimeType === "application/pdf") {
    return "PDF";
  }
  if (mimeType.includes("wordprocessingml") || ext.toUpperCase() === "DOCX") {
    return "Document (DOCX)";
  }
  if (mimeType.includes("spreadsheetml") || ext.toUpperCase() === "XLSX") {
    return "Spreadsheet (XLSX)";
  }
  if (mimeType.includes("presentationml") || ext.toUpperCase() === "PPTX") {
    return "Presentation (PPTX)";
  }
  if (mimeType.includes("zip") || ext.toUpperCase() === "ZIP") {
    return "Archive (ZIP)";
  }
  if (mimeType.includes("text/plain") || ext.toUpperCase() === "TXT") {
    return "Text File";
  }
  // Fallback for other types
  return ext.toUpperCase() || "Unknown";
}
