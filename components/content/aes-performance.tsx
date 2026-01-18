"use client";
// vibe coding
import init, { decrypt as wasmDecrypt, encrypt as wasmEncrypt } from "crypto-aes-wasm";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type BenchmarkRow = {
  id: "wasm-encrypt" | "wasm-decrypt" | "webcrypto-encrypt" | "webcrypto-decrypt";
  item: string;
  ms: string;
  throughput: string;
};

type ControlsState = "initializing" | "ready" | "running";

const AES_KEY_BYTES = new Uint8Array([
  0x78, 0x73, 0x31, 0x30, 0x71, 0x6c, 0x6c, 0x77, 0x34, 0x46, 0x54, 0x63, 0x51, 0x38, 0x59, 0x55,
]);

const AES_IV_BYTES = new Uint8Array([
  0x6f, 0x6b, 0x75, 0x6b, 0x4a, 0x76, 0x56, 0x45, 0x38, 0x66, 0x48, 0x49, 0x58, 0x31, 0x4d, 0x79,
]);

function formatMiBPerSec(bytes: number, ms: number) {
  const mib = bytes / (1024 * 1024);
  const sec = ms / 1000;
  return sec === 0 ? "∞" : (mib / sec).toFixed(2);
}

function bytesToHex(bytes: Uint8Array) {
  const hex = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    hex[i] = bytes[i].toString(16).padStart(2, "0");
  }
  return hex.join("");
}

function hexToBytes(hex: string) {
  if (hex.length % 2 !== 0) throw new Error("invalid hex length");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = hex.slice(i * 2, i * 2 + 2);
    out[i] = Number.parseInt(byte, 16);
  }
  return out;
}

function buildPlaintext(size: number) {
  const base = "0123456789abcdef";
  let s = "";
  while (s.length < size) s += base;
  return s.slice(0, size);
}

function measureSyncTimeMs<T>(fn: () => T) {
  const t0 = performance.now();
  const res = fn();
  const t1 = performance.now();
  return { ms: t1 - t0, res };
}

async function measureAsyncTimeMs<T>(fn: () => Promise<T>) {
  const t0 = performance.now();
  const res = await fn();
  const t1 = performance.now();
  return { ms: t1 - t0, res };
}

function createInitialDataSource(): BenchmarkRow[] {
  return [
    { id: "wasm-encrypt", item: "WASM encrypt", ms: "-", throughput: "-" },
    { id: "wasm-decrypt", item: "WASM decrypt", ms: "-", throughput: "-" },
    { id: "webcrypto-encrypt", item: "WebCrypto AES-CBC encrypt -> hex", ms: "-", throughput: "-" },
    { id: "webcrypto-decrypt", item: "WebCrypto AES-CBC decrypt (from hex) -> string", ms: "-", throughput: "-" },
  ];
}

export function AesPerformance() {
  const [plaintextSizeBytes, setPlaintextSizeBytes] = useState(1024);
  const [iterations, setIterations] = useState(2000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [controlsState, setControlsState] = useState<ControlsState>("initializing");
  const webCryptoAesKeyRef = useRef<CryptoKey | null>(null);

  const [dataSource, setDataSource] = useState<BenchmarkRow[]>(() => createInitialDataSource());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await init();
        if (cancelled) return;

        if (!globalThis.crypto?.subtle) {
          throw new Error("WebCrypto 不可用（需要 https 或 localhost）");
        }
        const cryptoKey = await crypto.subtle.importKey("raw", AES_KEY_BYTES, { name: "AES-CBC" }, false, [
          "encrypt",
          "decrypt",
        ]);
        if (cancelled) return;
        webCryptoAesKeyRef.current = cryptoKey;
        setControlsState("ready");
      } catch (e) {
        if (cancelled) return;
        setErrorMessage(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const plaintext = useMemo(() => buildPlaintext(plaintextSizeBytes), [plaintextSizeBytes]);

  const handleVerify = useCallback(async () => {
    setErrorMessage(null);
    if (controlsState !== "ready") {
      setErrorMessage("未初始化");
      return;
    }
    const webCryptoAesKey = webCryptoAesKeyRef.current;
    if (!webCryptoAesKey) {
      setErrorMessage("WebCrypto 未初始化");
      return;
    }

    const plaintextBytes = new TextEncoder().encode(plaintext);
    const wasmHex = wasmEncrypt(plaintext);
    const ctBuf = await crypto.subtle.encrypt({ name: "AES-CBC", iv: AES_IV_BYTES }, webCryptoAesKey, plaintextBytes);
    const webHex = bytesToHex(new Uint8Array(ctBuf));
    if (wasmHex !== webHex) {
      setErrorMessage("不一致（如果浏览器 AES-CBC padding 实现不同，可能会出现）");
    } else {
      setErrorMessage(`校验一致 -> asmHex: ${wasmHex.slice(0, 32)}... webHex: ${webHex.slice(0, 32)}...`);
    }
  }, [controlsState, plaintext]);

  const handleRunBenchmark = useCallback(async () => {
    setErrorMessage(null);
    if (controlsState !== "ready") {
      setErrorMessage("未初始化");
      return;
    }

    setControlsState("running");
    setDataSource(createInitialDataSource());

    try {
      const webCryptoAesKey = webCryptoAesKeyRef.current;
      if (!webCryptoAesKey) throw new Error("WebCrypto 未初始化");

      const plaintextBytes = new TextEncoder().encode(plaintext);

      wasmEncrypt(plaintext);
      await crypto.subtle.encrypt({ name: "AES-CBC", iv: AES_IV_BYTES }, webCryptoAesKey, plaintextBytes);

      const wasmEncryptTime = measureSyncTimeMs(() => {
        let lastCipherTextHex = "";
        for (let i = 0; i < iterations; i++) lastCipherTextHex = wasmEncrypt(plaintext);
        return lastCipherTextHex;
      });

      const wasmCipherTextHex = wasmEncryptTime.res;
      const wasmDecryptTime = measureSyncTimeMs(() => {
        let lastPlaintext = "";
        for (let i = 0; i < iterations; i++) lastPlaintext = wasmDecrypt(wasmCipherTextHex);
        return lastPlaintext;
      });

      const webCryptoEncryptTime = await measureAsyncTimeMs(async () => {
        let lastCipherTextHex = "";
        for (let i = 0; i < iterations; i++) {
          const buf = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv: AES_IV_BYTES },
            webCryptoAesKey,
            plaintextBytes,
          );
          lastCipherTextHex = bytesToHex(new Uint8Array(buf));
        }
        return lastCipherTextHex;
      });

      const webCryptoCipherTextHex = webCryptoEncryptTime.res;
      const webCryptoDecryptTime = await measureAsyncTimeMs(async () => {
        let lastPlaintext = "";
        for (let i = 0; i < iterations; i++) {
          const bytes = hexToBytes(webCryptoCipherTextHex);
          const buf = await crypto.subtle.decrypt({ name: "AES-CBC", iv: AES_IV_BYTES }, webCryptoAesKey, bytes);
          lastPlaintext = new TextDecoder().decode(new Uint8Array(buf));
        }
        return lastPlaintext;
      });

      const totalBytes = plaintextBytes.length * iterations;
      const nextDataSource: BenchmarkRow[] = [
        {
          id: "wasm-encrypt",
          item: "WASM encrypt -> hex",
          ms: wasmEncryptTime.ms.toFixed(2),
          throughput: formatMiBPerSec(totalBytes, wasmEncryptTime.ms),
        },
        {
          id: "wasm-decrypt",
          item: "WASM decrypt -> string",
          ms: wasmDecryptTime.ms.toFixed(2),
          throughput: formatMiBPerSec(totalBytes, wasmDecryptTime.ms),
        },
        {
          id: "webcrypto-encrypt",
          item: "WebCrypto AES-CBC encrypt -> hex",
          ms: webCryptoEncryptTime.ms.toFixed(2),
          throughput: formatMiBPerSec(totalBytes, webCryptoEncryptTime.ms),
        },
        {
          id: "webcrypto-decrypt",
          item: "WebCrypto AES-CBC decrypt -> string",
          ms: webCryptoDecryptTime.ms.toFixed(2),
          throughput: formatMiBPerSec(totalBytes, webCryptoDecryptTime.ms),
        },
      ];
      setDataSource(nextDataSource);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e));
    } finally {
      setControlsState("ready");
    }
  }, [controlsState, iterations, plaintext]);

  return (
    <section className="space-y-4">
      <div className="text-sm text-zinc-500">
        对比：WASM（AES-128-CBC + PKCS#7，输出 hex） vs WebCrypto（AES-CBC，输出 hex）。
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-sm">
            明文大小（字节）
            <input
              className="border rounded px-2 py-1 w-44"
              type="number"
              min={1}
              step={1}
              value={plaintextSizeBytes}
              onChange={(e) => setPlaintextSizeBytes(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            循环次数
            <input
              className="border rounded px-2 py-1 w-44"
              type="number"
              min={1}
              step={1}
              value={iterations}
              onChange={(e) => setIterations(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <button
            type="button"
            className="border rounded px-2 py-0.5 cursor-pointer"
            onClick={handleRunBenchmark}
            disabled={controlsState !== "ready"}
          >
            {controlsState === "running" ? "测试中…" : "开始测试"}
          </button>
          <button
            type="button"
            className="border rounded px-2 py-0.5 cursor-pointer"
            onClick={handleVerify}
            disabled={controlsState !== "ready"}
          >
            验证一致性
          </button>
        </div>
      </div>

      {errorMessage ? <div className="text-sm text-red-600">{errorMessage}</div> : null}

      <div className="overflow-auto">
        <table className="border-collapse mt-0!">
          <thead>
            <tr className="bg-zinc-50">
              <th className="border px-2 py-2 text-left text-sm">项目</th>
              <th className="border px-2 py-2 text-left text-sm">耗时（ms）</th>
              <th className="border px-2 py-2 text-left text-sm">吞吐（MiB/s）</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((row) => (
              <tr key={row.id}>
                <td className="border px-2 py-2 text-sm">{row.item}</td>
                <td className="border px-2 py-2 text-sm">{row.ms}</td>
                <td className="border px-2 py-2 text-sm">{row.throughput}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AesPerformance;
