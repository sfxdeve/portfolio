import { spawn } from "node:child_process";

const port = "4173";
const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: {
    ...process.env,
    HOST: "127.0.0.1",
    NITRO_HOST: "127.0.0.1",
    NITRO_PORT: port,
    PORT: port,
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});

const deadline = Date.now() + 30_000;

try {
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited early.\n${output}`);
    }

    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      const body = await response.text();

      if (response.ok && body.includes("Start building your portfolio.")) {
        process.exitCode = 0;
        break;
      }
    } catch {
      // The server may not be listening yet.
    }

    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (process.exitCode !== 0) {
    throw new Error(`Production server did not become ready.\n${output}`);
  }
} finally {
  server.kill("SIGTERM");
}
