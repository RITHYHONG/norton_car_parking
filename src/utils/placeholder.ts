export function generatePlaceholderSVG(width: number, height: number, text?: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#e2e8f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#64748b" text-anchor="middle" dy=".3em">
        ${text || `${width}x${height}`}
      </text>
    </svg>
  `)}`;
}
