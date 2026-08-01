import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders development preview metadata", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders content-driven workbench", async () => {
  const response = await render("/workbench/seenfetch");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /PROJECT DIRECTORY/);
  assert.match(html, /SeenFetch/);
  assert.match(html, /3\.3×/);
});

test("renders screening details", async () => {
  const response = await render("/room-nine/touhou-project");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /东方 Project/);
  assert.match(html, /为什么会一直回来/);
});
