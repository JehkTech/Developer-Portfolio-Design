import * as THREE from "three";

export function createSacredFloorTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const cx = size / 2;
    const cy = size / 2;

    // Matte obsidian radial base
    const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, size * 0.5);
    grad.addColorStop(0, "#151c29");
    grad.addColorStop(0.55, "#0d121c");
    grad.addColorStop(1, "#07090e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Subtle concentric harmonic circles (3-6-9 proportions)
    const radii = [90, 180, 270, 360, 440, 485];
    radii.forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle =
        idx % 2 === 0 ? "rgba(245, 158, 11, 0.16)" : "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = idx === 3 ? 2 : 1.2;
      ctx.stroke();
    });

    // 9-fold and 12-fold sacred geometry radial spokes
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const innerR = i % 2 === 0 ? 90 : 180;
      const outerR = 485;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
      ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
      ctx.strokeStyle =
        i % 3 === 0 ? "rgba(245, 158, 11, 0.14)" : "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.8;
      ctx.stroke();
    }

    // Inner sacred triangle & inverted triangle (6-fold star)
    for (let t = 0; t < 2; t++) {
      ctx.beginPath();
      for (let v = 0; v < 3; v++) {
        const angle = (v / 3) * Math.PI * 2 + (t * Math.PI) / 3 - Math.PI / 2;
        const px = cx + Math.cos(angle) * 270;
        const py = cy + Math.sin(angle) * 270;
        if (v === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(245, 158, 11, 0.13)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    // Fine degree tick marks on outer ring
    for (let deg = 0; deg < 72; deg++) {
      const angle = (deg / 72) * Math.PI * 2;
      const r1 = 440;
      const r2 = deg % 6 === 0 ? 458 : 448;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
      ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
      ctx.strokeStyle =
        deg % 6 === 0 ? "rgba(245, 158, 11, 0.28)" : "rgba(148, 163, 184, 0.14)";
      ctx.lineWidth = deg % 6 === 0 ? 2 : 1;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

export function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const cx = size / 2;
    const grad = ctx.createRadialGradient(cx, cx, 10, cx, cx, cx);
    grad.addColorStop(0, "rgba(0, 0, 0, 0.72)");
    grad.addColorStop(0.5, "rgba(0, 0, 0, 0.32)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createBrushedMetalBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < size; y++) {
      const lum = 110 + ((y * 37) % 36);
      ctx.fillStyle = `rgb(${lum},${lum},${lum})`;
      ctx.fillRect(0, y, size, 1);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 3);
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}
