// Canvas charts for Indonesia in Numbers.
//
// One small helper, drawBars, draws every chart on the site: a vertical
// bar chart with labelled axes, or a horizontal bar chart when the
// labels are long (provinces, sectors). No library is used — the whole
// site's first load stays small, and the charts render exactly the same
// on every run. Values are formatted by the caller.

const INK = '#1e2a32';
const GRID = '#e3ddd2';
const BAR = '#0b6e6e';
const BAR_HOT = '#e4572e';
const AXIS = '#6b7280';

function fitCanvas(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);
  return { ctx, width, height };
}

function niceMax(value) {
  if (value <= 0) return 1;
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

// Vertical bars. points: [{label, value, hot}]. valueLabel formats a value.
export function drawBars(canvas, points, valueLabel) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { left: 56, right: 12, top: 26, bottom: 34 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);
  const barW = Math.min(64, (plotW / points.length) * 0.58);
  const gap = plotW / points.length;

  ctx.clearRect(0, 0, width, height);
  ctx.font = '12px system-ui, sans-serif';
  ctx.textBaseline = 'middle';

  // Gridlines and the y-axis scale, four steps.
  for (let i = 0; i <= 4; i += 1) {
    const y = pad.top + (plotH * i) / 4;
    const v = max * (1 - i / 4);
    ctx.strokeStyle = GRID;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = AXIS;
    ctx.textAlign = 'right';
    ctx.fillText(valueLabel(v), pad.left - 8, y);
  }

  points.forEach((p, i) => {
    const x = pad.left + gap * i + (gap - barW) / 2;
    const h = (p.value / max) * plotH;
    const y = pad.top + plotH - h;
    ctx.fillStyle = p.hot ? BAR_HOT : BAR;
    ctx.fillRect(x, y, barW, h);
    ctx.fillStyle = INK;
    ctx.textAlign = 'center';
    ctx.fillText(valueLabel(p.value), x + barW / 2, y - 12);
    // On a narrow phone screen the year labels would collide, so draw
    // every second one there and keep the rest.
    if (gap >= 44 || i % 2 === 0) {
      ctx.fillStyle = AXIS;
      ctx.fillText(p.label, x + barW / 2, height - pad.bottom + 18);
    }
  });
}

// Horizontal bars for long labels. points: [{label, value, hot}].
export function drawHBars(canvas, points, valueLabel) {
  const { ctx, width, height } = fitCanvas(canvas);
  const pad = { left: 190, right: 64, top: 10, bottom: 10 };
  const plotW = width - pad.left - pad.right;
  const rowH = (height - pad.top - pad.bottom) / points.length;
  const max = niceMax(Math.max(...points.map((p) => p.value)) * 1.08);

  ctx.clearRect(0, 0, width, height);
  ctx.font = '13px system-ui, sans-serif';
  ctx.textBaseline = 'middle';

  points.forEach((p, i) => {
    const y = pad.top + rowH * i + rowH / 2;
    const barH = Math.min(22, rowH * 0.55);
    const w = (p.value / max) * plotW;
    ctx.fillStyle = AXIS;
    ctx.textAlign = 'right';
    ctx.fillText(p.label, pad.left - 10, y);
    ctx.fillStyle = p.hot ? BAR_HOT : BAR;
    ctx.fillRect(pad.left, y - barH / 2, w, barH);
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(valueLabel(p.value), pad.left + w + 8, y);
  });
}
