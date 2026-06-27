export type BenchmarkRow = {
  id: "wasm-encrypt" | "wasm-decrypt" | "webcrypto-encrypt" | "webcrypto-decrypt";
  item: string;
  ms: string;
  throughput: string;
};

export type ControlsState = "initializing" | "ready" | "running";
