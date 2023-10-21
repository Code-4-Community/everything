export default function generateSquareSVG(color: string) {
    return `<svg width="40" height="40" viewBox="0 0 120 120" fill="${color}" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="116" height="116" fill="${color}" stroke="#58585B" stroke-width="4"/>
    </svg>
    `;
  }