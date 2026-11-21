// Tiny synthesised interface sounds (no audio files).
let ctx: AudioContext | null = null;
let muted = false;

export function setMuted(v: boolean) {
  muted = v;
}

export function blip(kind: "select" | "hover" | "open" | "close" = "select") {
  if (muted || typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const freq = { select: 660, hover: 1320, open: 520, close: 390 }[kind];
    const vol = kind === "hover" ? 0.012 : 0.035;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * (kind === "close" ? 0.7 : 1.25), now + 0.08);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(vol, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "hover" ? 0.05 : 0.14));
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } catch {
    /* audio unavailable */
  }
}
