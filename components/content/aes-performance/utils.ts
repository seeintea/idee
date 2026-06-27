export function formatMiBPerSec(bytes: number, ms: number) {
  const mib = bytes / (1024 * 1024);
  const sec = ms / 1000;
  return sec === 0 ? "∞" : (mib / sec).toFixed(2);
}

export function bytesToHex(bytes: Uint8Array) {
  const hex = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    hex[i] = bytes[i].toString(16).padStart(2, "0");
  }
  return hex.join("");
}

export function hexToBytes(hex: string) {
  if (hex.length % 2 !== 0) throw new Error("invalid hex length");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = hex.slice(i * 2, i * 2 + 2);
    out[i] = Number.parseInt(byte, 16);
  }
  return out;
}

export function buildPlaintext(size: number) {
  const base = "0123456789abcdef";
  let s = "";
  while (s.length < size) s += base;
  return s.slice(0, size);
}

export function measureSyncTimeMs<T>(fn: () => T) {
  const t0 = performance.now();
  const res = fn();
  const t1 = performance.now();
  return { ms: t1 - t0, res };
}

export async function measureAsyncTimeMs<T>(fn: () => Promise<T>) {
  const t0 = performance.now();
  const res = await fn();
  const t1 = performance.now();
  return { ms: t1 - t0, res };
}
