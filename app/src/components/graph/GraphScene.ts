import * as THREE from "three";
import { neighbours, sectionOf, TERMS, type Term } from "@/data/terms";

export type ColorMode = "gray" | "section";

export interface GraphCallbacks {
  onSelect: (slug: string) => void;
  onBackground: () => void;
  onHover: (slug: string | null) => void;
  onInteract: () => void;
}

interface GNode {
  term: Term;
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  degree: number;
  size: number;
  shade: number;
  sprite: THREE.Sprite;
  label: HTMLDivElement;
  screen: { x: number; y: number; r: number; depth: number; visible: boolean };
  fade: number; // 0..1 current dim amount
}

const PAPER = new THREE.Color("#eaeae8");
const INK = new THREE.Color("#1a1a19");

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) / 4294967296;
}

function discTexture(ring = false) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fff";
  g.strokeStyle = "#fff";
  if (ring) {
    g.lineWidth = 3;
    g.beginPath();
    g.arc(64, 64, 60, 0, Math.PI * 2);
    g.stroke();
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(64, 64, 53, 0, Math.PI * 2);
    g.stroke();
  } else {
    g.beginPath();
    g.arc(64, 64, 62, 0, Math.PI * 2);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Lay the terms out in 3D with a small deterministic force simulation. */
function layout(nodes: GNode[], links: [number, number][]) {
  const rand = mulberry32(7);
  for (const n of nodes) {
    const u = rand() * 2 - 1;
    const th = rand() * Math.PI * 2;
    const r = 60 + rand() * 80;
    const s = Math.sqrt(1 - u * u);
    n.pos.set(r * s * Math.cos(th), r * u, r * s * Math.sin(th));
  }
  const tmp = new THREE.Vector3();
  for (let it = 0; it < 420; it++) {
    const alpha = 1 - it / 420;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        tmp.subVectors(nodes[i].pos, nodes[j].pos);
        const d2 = Math.max(tmp.lengthSq(), 25);
        const f = (2600 / d2) * alpha;
        tmp.normalize().multiplyScalar(f);
        nodes[i].vel.add(tmp);
        nodes[j].vel.sub(tmp);
      }
    }
    for (const [a, b] of links) {
      tmp.subVectors(nodes[b].pos, nodes[a].pos);
      const d = tmp.length() || 1;
      const f = ((d - 62) / d) * 0.035 * alpha;
      tmp.multiplyScalar(f);
      nodes[a].vel.add(tmp);
      nodes[b].vel.sub(tmp);
    }
    for (const n of nodes) {
      n.vel.addScaledVector(n.pos, -0.004 * alpha);
      n.vel.multiplyScalar(0.6);
      n.pos.add(n.vel);
    }
  }
  const c = new THREE.Vector3();
  for (const n of nodes) c.add(n.pos);
  c.divideScalar(nodes.length);
  let maxR = 0;
  for (const n of nodes) {
    n.pos.sub(c);
    maxR = Math.max(maxR, n.pos.length());
  }
  const k = 205 / maxR;
  for (const n of nodes) n.pos.multiplyScalar(k);
}

export class GraphScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private pivot = new THREE.Group();
  private nodes: GNode[] = [];
  private bySlug = new Map<string, GNode>();
  private links: [number, number][] = [];
  private ring: THREE.Sprite;
  private edgeLines: THREE.LineSegments;
  private edgeDots: THREE.Points;
  private pathLine: THREE.Line;
  private edgeData: { a: GNode; b: GNode; t: number; speed: number }[] = [];
  private selected: GNode | null = null;
  private hovered: GNode | null = null;
  private highlight: Set<string> | null = null;
  private colorMode: ColorMode = "gray";
  private raf = 0;
  private width = 1;
  private height = 1;
  private dist = 520;
  private targetDist = 520;
  private rotX = -0.12;
  private rotY = 0;
  private velX = 0;
  private velY = 0;
  private lastInteraction = 0;
  private pointers = new Map<number, { x: number; y: number }>();
  private downAt: { x: number; y: number; t: number } | null = null;
  private pinchStart = 0;
  private dragged = false;
  private ro: ResizeObserver;
  private disposed = false;
  private t0 = performance.now();

  constructor(
    private container: HTMLElement,
    private labelLayer: HTMLElement,
    private cb: GraphCallbacks,
  ) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(PAPER, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.touchAction = "none";

    this.camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);
    this.scene.fog = new THREE.Fog(PAPER, 380, 900);
    this.scene.add(this.pivot);

    const disc = discTexture();
    const index = new Map<Term, number>();
    TERMS.forEach((t, i) => index.set(t, i));
    for (const t of TERMS) {
      const deg = neighbours(t).length;
      const mat = new THREE.SpriteMaterial({ map: disc, color: 0xffffff, transparent: true, depthWrite: true, fog: true });
      mat.alphaTest = 0.5;
      const sprite = new THREE.Sprite(mat);
      const label = document.createElement("div");
      label.className = "g-label";
      label.textContent = t.name;
      labelLayer.appendChild(label);
      const n: GNode = {
        term: t,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        degree: deg,
        size: 7 + Math.sqrt(deg) * 4.2,
        shade: hash(t.slug),
        sprite,
        label,
        screen: { x: 0, y: 0, r: 0, depth: 0, visible: false },
        fade: 0,
      };
      this.nodes.push(n);
      this.bySlug.set(t.slug, n);
      this.pivot.add(sprite);
    }
    for (const t of TERMS) {
      for (const o of neighbours(t)) {
        const a = index.get(t)!;
        const b = index.get(o)!;
        if (a < b) this.links.push([a, b]);
      }
    }
    layout(this.nodes, this.links);
    for (const n of this.nodes) {
      n.sprite.position.copy(n.pos);
      n.sprite.scale.setScalar(n.size);
    }
    this.applyColors();

    this.ring = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: discTexture(true), color: INK, transparent: true, depthWrite: false, fog: false }),
    );
    this.ring.visible = false;
    this.pivot.add(this.ring);

    this.edgeLines = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.42, fog: true }),
    );
    this.pivot.add(this.edgeLines);
    this.edgeDots = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ color: INK, size: 2.4, sizeAttenuation: true, transparent: true, opacity: 0.9, fog: true }),
    );
    this.pivot.add(this.edgeDots);
    this.pathLine = new THREE.Line(
      new THREE.BufferGeometry(),
      new THREE.LineDashedMaterial({ color: INK, transparent: true, opacity: 0.55, dashSize: 4, gapSize: 3, fog: true }),
    );
    this.pivot.add(this.pathLine);

    const el = this.renderer.domElement;
    el.addEventListener("pointerdown", this.onDown);
    window.addEventListener("pointermove", this.onMove);
    window.addEventListener("pointerup", this.onUp);
    window.addEventListener("pointercancel", this.onUp);
    el.addEventListener("wheel", this.onWheel, { passive: false });
    el.addEventListener("pointerleave", () => this.setHovered(null));

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(container);
    this.resize();
    this.raf = requestAnimationFrame(this.frame);
  }

  // ── public API ──────────────────────────────────────────
  setSelected(slug: string | null) {
    const n = slug ? (this.bySlug.get(slug) ?? null) : null;
    this.selected = n;
    this.edgeData = [];
    if (n) {
      for (const o of neighbours(n.term)) {
        const b = this.bySlug.get(o.slug)!;
        for (let k = 0; k < 3; k++) this.edgeData.push({ a: n, b, t: Math.random(), speed: 0.12 + Math.random() * 0.18 });
      }
      this.targetDist = Math.min(this.targetDist, this.width < 800 ? 560 : 520);
    }
    this.rebuildEdges();
  }

  /** Draw a dashed route through these terms, in order (a guided tour). */
  setPath(slugs: string[] | null) {
    const pts: number[] = [];
    for (const sl of slugs ?? []) {
      const n = this.bySlug.get(sl);
      if (n) pts.push(n.pos.x, n.pos.y, n.pos.z);
    }
    this.pathLine.geometry.dispose();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    this.pathLine.geometry = g;
    this.pathLine.computeLineDistances();
    this.pathLine.visible = pts.length > 3;
  }

  setHighlight(slugs: Set<string> | null) {
    this.highlight = slugs;
  }

  setColorMode(mode: ColorMode) {
    this.colorMode = mode;
    this.applyColors();
  }

  /** Where a term currently sits on screen (CSS px inside the container). */
  screenOf(slug: string) {
    return this.bySlug.get(slug)?.screen ?? null;
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    window.removeEventListener("pointermove", this.onMove);
    window.removeEventListener("pointerup", this.onUp);
    window.removeEventListener("pointercancel", this.onUp);
    for (const n of this.nodes) n.label.remove();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  // ── internals ───────────────────────────────────────────
  private baseColor(n: GNode) {
    if (this.colorMode === "section") {
      const c = new THREE.Color(sectionOf(n.term.section).color);
      return c.lerp(INK, 0.15 + n.shade * 0.2);
    }
    const l = 0.04 + n.shade * 0.5; // dark ink → mid grey
    return new THREE.Color().copy(INK).lerp(new THREE.Color("#a6a6a4"), l);
  }

  private applyColors() {
    for (const n of this.nodes) (n.sprite.material as THREE.SpriteMaterial).color.copy(this.baseColor(n));
  }

  private rebuildEdges() {
    const pos: number[] = [];
    if (this.selected) {
      const seen = new Set<GNode>();
      for (const e of this.edgeData) {
        if (seen.has(e.b)) continue;
        seen.add(e.b);
        pos.push(e.a.pos.x, e.a.pos.y, e.a.pos.z, e.b.pos.x, e.b.pos.y, e.b.pos.z);
      }
    }
    this.edgeLines.geometry.dispose();
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    this.edgeLines.geometry = g;
    const dg = new THREE.BufferGeometry();
    dg.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(this.edgeData.length * 3), 3));
    this.edgeDots.geometry.dispose();
    this.edgeDots.geometry = dg;
  }

  private resize() {
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = w + "px";
    this.renderer.domElement.style.height = h + "px";
    this.camera.aspect = w / h;
    // Fit the cloud: narrow screens stand further back so it still fills most of the width.
    const halfTan = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const fitWidth = 175 / (halfTan * (w / h));
    this.targetDist = this.dist = THREE.MathUtils.clamp(fitWidth, 600, 1000);
    this.camera.updateProjectionMatrix();
  }

  private pick(x: number, y: number): GNode | null {
    let best: GNode | null = null;
    let bestDepth = Infinity;
    for (const n of this.nodes) {
      const s = n.screen;
      if (!s.visible) continue;
      const dx = x - s.x;
      const dy = y - s.y;
      if (dx * dx + dy * dy <= Math.max(s.r, 7) ** 2 && s.depth < bestDepth) {
        best = n;
        bestDepth = s.depth;
      }
    }
    return best;
  }

  private local(e: PointerEvent | WheelEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  private setHovered(n: GNode | null) {
    if (n === this.hovered) return;
    this.hovered = n;
    this.renderer.domElement.style.cursor = n ? "pointer" : "grab";
    this.cb.onHover(n ? n.term.slug : null);
  }

  private onDown = (e: PointerEvent) => {
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    this.downAt = { x: e.clientX, y: e.clientY, t: performance.now() };
    this.dragged = false;
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      this.pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
    }
    this.renderer.domElement.setPointerCapture?.(e.pointerId);
  };

  private onMove = (e: PointerEvent) => {
    const p = this.pointers.get(e.pointerId);
    if (!p) {
      if (e.target === this.renderer.domElement) {
        const l = this.local(e);
        this.setHovered(this.pick(l.x, l.y));
      }
      return;
    }
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    p.x = e.clientX;
    p.y = e.clientY;
    if (this.pointers.size === 2) {
      const [a, b] = [...this.pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (this.pinchStart > 0) {
        this.targetDist = THREE.MathUtils.clamp(this.targetDist * (this.pinchStart / d), 200, 1300);
        this.pinchStart = d;
      }
      this.dragged = true;
      this.interacted();
      return;
    }
    if (this.downAt && Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 5) {
      this.dragged = true;
      this.renderer.domElement.style.cursor = "grabbing";
    }
    if (this.dragged) {
      this.velY = dx * 0.0052;
      this.velX = dy * 0.0052;
      this.rotY += this.velY;
      this.rotX = THREE.MathUtils.clamp(this.rotX + this.velX, -1.3, 1.3);
      this.interacted();
    }
  };

  private onUp = (e: PointerEvent) => {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchStart = 0;
    if (this.pointers.size === 0) {
      if (!this.dragged && this.downAt) {
        const l = this.local(e);
        const n = this.pick(l.x, l.y);
        if (n) this.cb.onSelect(n.term.slug);
        else this.cb.onBackground();
      }
      this.downAt = null;
      this.renderer.domElement.style.cursor = this.hovered ? "pointer" : "grab";
    }
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.targetDist = THREE.MathUtils.clamp(this.targetDist * Math.exp(e.deltaY * 0.0012), 200, 1300);
    this.interacted();
  };

  private interacted() {
    this.lastInteraction = performance.now();
    this.cb.onInteract();
  }

  private frame = (now: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.frame);
    const dt = Math.min(0.05, (now - this.t0) / 1000);
    this.t0 = now;

    // Inertia + idle drift.
    if (this.pointers.size === 0) {
      this.rotY += this.velY;
      this.rotX = THREE.MathUtils.clamp(this.rotX + this.velX, -1.3, 1.3);
      this.velX *= 0.92;
      this.velY *= 0.92;
      if (!this.selected && now - this.lastInteraction > 2500) this.rotY += dt * 0.045;
    }
    this.pivot.rotation.set(this.rotX, this.rotY, 0, "YXZ");
    this.pivot.updateMatrixWorld(true);

    // Centre on the selected node.
    const target = new THREE.Vector3();
    if (this.selected) {
      target.copy(this.selected.pos).applyEuler(this.pivot.rotation).negate();
    }
    this.pivot.position.lerp(target, 1 - Math.pow(0.002, dt));

    this.dist += (this.targetDist - this.dist) * (1 - Math.pow(0.004, dt));
    const fog = this.scene.fog as THREE.Fog;
    fog.near = this.dist - 40;
    fog.far = this.dist + 520;
    this.camera.position.set(0, 0, this.dist);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateMatrixWorld();
    this.pivot.updateMatrixWorld(true);

    // Dimming.
    const sel = this.selected;
    const near = sel ? new Set(neighbours(sel.term).map((t) => t.slug)) : null;
    for (const n of this.nodes) {
      let dim = 0;
      if (sel && n !== sel && !near!.has(n.term.slug) && !this.highlight?.has(n.term.slug)) dim = 0.86;
      if (this.highlight && !this.highlight.has(n.term.slug)) dim = Math.max(dim, 0.82);
      n.fade += (dim - n.fade) * (1 - Math.pow(0.001, dt));
      const m = n.sprite.material as THREE.SpriteMaterial;
      m.color.copy(this.baseColor(n)).lerp(PAPER, n.fade * 0.9);
    }

    // Selection ring.
    if (sel) {
      this.ring.visible = true;
      this.ring.position.copy(sel.pos);
      this.ring.scale.setScalar(sel.size * 1.32);
    } else this.ring.visible = false;

    // Travelling dots on edges.
    if (this.edgeData.length) {
      const attr = this.edgeDots.geometry.getAttribute("position") as THREE.BufferAttribute;
      this.edgeData.forEach((e, i) => {
        e.t = (e.t + dt * e.speed) % 1;
        attr.setXYZ(
          i,
          e.a.pos.x + (e.b.pos.x - e.a.pos.x) * e.t,
          e.a.pos.y + (e.b.pos.y - e.a.pos.y) * e.t,
          e.a.pos.z + (e.b.pos.z - e.a.pos.z) * e.t,
        );
      });
      attr.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
    this.updateLabels();
  };

  private updateLabels() {
    const v = new THREE.Vector3();
    const view = new THREE.Vector3();
    const fovScale = this.height / 2 / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const sel = this.selected;
    const near = sel ? new Set(neighbours(sel.term).map((t) => t.slug)) : null;
    for (const n of this.nodes) {
      v.copy(n.pos).applyMatrix4(this.pivot.matrixWorld);
      view.copy(v).applyMatrix4(this.camera.matrixWorldInverse);
      const depth = -view.z;
      const s = n.screen;
      if (depth <= 1) {
        s.visible = false;
        n.label.style.opacity = "0";
        continue;
      }
      v.project(this.camera);
      s.x = (v.x * 0.5 + 0.5) * this.width;
      s.y = (-v.y * 0.5 + 0.5) * this.height;
      s.r = ((n.size / 2) * fovScale) / depth;
      s.depth = depth;
      s.visible = v.z < 1;
      // Closer nodes: bigger, darker labels. Far ones fade into the paper.
      const closeness = THREE.MathUtils.clamp((this.dist + 220 - depth) / 440, 0, 1);
      let op = 0.12 + closeness * 0.78;
      let size = 7 + closeness * 5;
      if (n.degree >= 7) size += 1.2;
      if (sel) {
        if (n === sel) {
          op = 1;
          size = 14;
        } else if (near!.has(n.term.slug)) op = Math.max(op, 0.75);
        else if (!this.highlight?.has(n.term.slug)) op *= 0.25;
      }
      if (this.highlight) op = this.highlight.has(n.term.slug) ? Math.max(op, 0.95) : op * 0.2;
      if (n === this.hovered) {
        op = 1;
        size = Math.max(size, 12);
      }
      size *= THREE.MathUtils.clamp(560 / this.dist, 0.62, 1.15);
      const lab = n.label;
      lab.style.opacity = String(op);
      lab.style.fontSize = size.toFixed(1) + "px";
      lab.style.transform = `translate(${s.x.toFixed(1)}px, ${(s.y - s.r - 6).toFixed(1)}px) translate(-50%, -100%)`;
      lab.style.zIndex = String(Math.round(10000 - depth));
      lab.dataset.active = n === sel || n === this.hovered ? "true" : "false";
    }
  }
}

export function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}
