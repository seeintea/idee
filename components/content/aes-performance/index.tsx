"use client";
// vide coding
import init, { decrypt as wasmDecrypt, encrypt as wasmEncrypt } from "crypto-aes-wasm";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { BenchmarkTable } from "./benchmark-table";
import { AES_IV_BYTES, AES_KEY_BYTES, createInitialDataSource } from "./constants";
import { ControlButton, NumberField, StatusTag } from "./primitives";
import type { BenchmarkRow, ControlsState } from "./types";
import {
  buildPlaintext,
  bytesToHex,
  formatMiBPerSec,
  hexToBytes,
  measureAsyncTimeMs,
  measureSyncTimeMs,
} from "./utils";

export function AesPerformance() {
  const [plaintextSizeBytes, setPlaintextSizeBytes] = useState(1024);
  const [iterations, setIterations] = useState(2000);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validSameHex, setValidSameHex] = useState<string | null>(null);
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
      setValidSameHex(`校验一致
asmHex: ${wasmHex.slice(0, 64)}...
webHex: ${webHex.slice(0, 64)}...`);
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
    <section className="not-prose my-6">
      <div className="flex flex-wrap items-end gap-3">
        <NumberField label="明文大小（字节）" value={plaintextSizeBytes} onChange={setPlaintextSizeBytes} />
        <NumberField label="循环次数" value={iterations} onChange={setIterations} />
        <ControlButton onClick={handleRunBenchmark} disabled={controlsState !== "ready"}>
          {controlsState === "running" ? "测试中…" : "开始测试"}
        </ControlButton>
        <ControlButton onClick={handleVerify} disabled={controlsState !== "ready"}>
          验证一致性
        </ControlButton>
      </div>

      {errorMessage ? <StatusTag tone="danger">{errorMessage}</StatusTag> : null}
      {validSameHex ? <StatusTag tone="success">{validSameHex}</StatusTag> : null}

      <BenchmarkTable dataSource={dataSource} />
    </section>
  );
}

export default AesPerformance;
