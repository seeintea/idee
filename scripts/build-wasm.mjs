import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const workspaceRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const metadataResult = run("cargo", ["metadata", "--format-version=1", "--no-deps"], {
  captureOutput: true,
});
const metadata = JSON.parse(metadataResult.stdout);

const wasmCrates = metadata.packages
  .filter(
    (pkg) =>
      pkg.targets.some((target) => target.crate_types.includes("cdylib")) &&
      pkg.dependencies.some((dependency) => dependency.name === "wasm-bindgen"),
  )
  .sort((left, right) => left.name.localeCompare(right.name));

if (wasmCrates.length === 0) {
  console.error("No wasm-bindgen cdylib crates found in the Cargo workspace.");
  process.exit(1);
}

for (const pkg of wasmCrates) {
  const crateDirectory = dirname(pkg.manifest_path);
  console.log(`\nBuilding ${pkg.name} (${relative(workspaceRoot, crateDirectory)})`);
  run("wasm-pack", ["build", crateDirectory, "--target", "web", "--release", "--out-dir", "pkg"]);
  rmSync(join(crateDirectory, "pkg", ".gitignore"), { force: true });
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: workspaceRoot,
    encoding: "utf8",
    stdio: options.captureOutput ? "pipe" : "inherit",
  });

  if (result.error) {
    console.error(`Failed to run ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    if (options.captureOutput) {
      process.stderr.write(result.stderr);
    }
    process.exit(result.status ?? 1);
  }
  return result;
}
