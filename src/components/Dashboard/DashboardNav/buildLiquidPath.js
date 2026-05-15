/**
 * viewBox 0–100, stretched with preserveAspectRatio="none" to the fill.
 * px, py: pointer in button space, roughly −1…1 (smoothed).
 * Goo: FM on phase + slower secondary blob + stretch from pseudo-velocity (R→L flow).
 */
export function buildLiquidPath(angle, px = 0, py = 0) {
  const W = 100;
  const waveAnchorY = 10 + py * 4;
  const amp = 3.8 + Math.min(Math.abs(px) + Math.abs(py) * 0.35, 1) * 1.35;
  const spatial = (0.42 + px * 0.06) * 0.5;
  const phaseSkew = px * 0.65;
  const pointerX = 50 + px * 48;
  const bulgeSigma = 12 * (1 + Math.abs(px) * 0.14);
  const bulgeGain = 6.2;
  const segments = 64;
  const parts = [];

  for (let i = 0; i <= segments; i += 1) {
    const x = (i / segments) * W;
    const nx = (x / W) * 2 - 1;
    const tilt = px * 8 * nx * (0.55 + Math.abs(py) * 0.25);
    const bulge = bulgeGain * Math.exp(-((x - pointerX) ** 2) / (2 * bulgeSigma ** 2));
    const ripples = 0.55 * py * Math.sin((x / W) * Math.PI * 0.2 + angle * 0.2);

    const gooFM =
      0.2 * Math.sin(x * spatial * 0.38 + angle * 0.64) +
      0.22 * Math.sin(x * spatial * 0.2 - angle * 0.31);
    const slug = 0.72 * Math.sin(x * spatial * 0.32 + angle + px * 0.2);
    const stretch =
      0.45 *
      Math.cos(x * spatial + angle + phaseSkew * (x / W) + gooFM * 0.35) *
      Math.sin(angle * 0.19);

    const y =
      waveAnchorY +
      amp * Math.sin(x * spatial + angle + phaseSkew * (x / W) + gooFM) +
      slug +
      stretch +
      tilt +
      bulge +
      ripples;
    parts.push(
      i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`
    );
  }
  parts.push(`L${W},100`, 'L0,100', 'Z');
  return parts.join(' ');
}
