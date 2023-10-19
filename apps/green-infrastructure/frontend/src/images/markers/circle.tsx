export default function generateCircleSVG(color: string) {
  return `<svg width="40" height="40" viewBox="0 0 120 120" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="58" fill="${color}" stroke="#58585B" stroke-width="4"/>
  </svg>
  `;
}