import type { BenchmarkRow } from "./types";

export const AES_KEY_BYTES = new Uint8Array([
  0x78, 0x73, 0x31, 0x30, 0x71, 0x6c, 0x6c, 0x77, 0x34, 0x46, 0x54, 0x63, 0x51, 0x38, 0x59, 0x55,
]);

export const AES_IV_BYTES = new Uint8Array([
  0x6f, 0x6b, 0x75, 0x6b, 0x4a, 0x76, 0x56, 0x45, 0x38, 0x66, 0x48, 0x49, 0x58, 0x31, 0x4d, 0x79,
]);

export function createInitialDataSource(): BenchmarkRow[] {
  return [
    { id: "wasm-encrypt", item: "WASM encrypt", ms: "-", throughput: "-" },
    { id: "wasm-decrypt", item: "WASM decrypt", ms: "-", throughput: "-" },
    { id: "webcrypto-encrypt", item: "WebCrypto AES-CBC encrypt -> hex", ms: "-", throughput: "-" },
    { id: "webcrypto-decrypt", item: "WebCrypto AES-CBC decrypt (from hex) -> string", ms: "-", throughput: "-" },
  ];
}
