const test = require("node:test");
const assert = require("node:assert/strict");
const { planLabel, escapeHtml, buildEmailText, buildEmailHtml } = require("../email");

test("planLabel traduce valores conocidos", () => {
  assert.equal(planLabel("gema"), "GEMA — Marketing Automatizado");
  assert.equal(planLabel("eri"), "ERI — Agente IA de Ventas");
  assert.equal(planLabel("suite"), "Plan PLAI Suite (GEMA + ERI)");
  assert.equal(planLabel("none"), "Aún no lo tiene claro");
});

test("planLabel usa el fallback para valores vacíos o desconocidos", () => {
  assert.equal(planLabel(undefined), "Aún no lo tiene claro");
  assert.equal(planLabel(""), "Aún no lo tiene claro");
  assert.equal(planLabel("plan-que-no-existe"), "Aún no lo tiene claro");
});

test("escapeHtml neutraliza los caracteres especiales de HTML", () => {
  assert.equal(
    escapeHtml(`<script>alert("x")</script> & Cía`),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; Cía"
  );
});

test("buildEmailText incluye todos los campos y usa em-dash para vacíos", () => {
  const text = buildEmailText({
    name: "Ana Pérez",
    empresa: "",
    email: "ana@empresa.cl",
    plan: "gema",
    message: "",
  });
  assert.match(text, /Nombre: Ana Pérez/);
  assert.match(text, /Empresa: —/);
  assert.match(text, /Email: ana@empresa\.cl/);
  assert.match(text, /Producto de interés: GEMA — Marketing Automatizado/);
  assert.match(text, /Mensaje:\n—/);
  assert.match(text, /Responder: mailto:ana@empresa\.cl/);
});

test("buildEmailHtml escapa datos del lead para evitar inyección de HTML", () => {
  const html = buildEmailHtml({
    name: '<img src=x onerror=alert(1)>',
    empresa: "Acme & Cía",
    email: "atacante@evil.cl",
    plan: "eri",
    message: "hola",
  });
  assert.ok(!html.includes("<img src=x onerror=alert(1)>"));
  assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(html, /Acme &amp; Cía/);
});

test("buildEmailHtml arma el mailto de respuesta con el email codificado", () => {
  const html = buildEmailHtml({
    name: "Ana Pérez",
    empresa: "Acme",
    email: "ana+demo@empresa.cl",
    plan: "suite",
    message: "hola",
  });
  assert.match(html, /mailto:ana%2Bdemo%40empresa\.cl\?subject=Re%3A%20tu%20demo%20PLAI/);
});

test("buildEmailHtml conserva saltos de línea del mensaje como <br>", () => {
  const html = buildEmailHtml({
    name: "Ana",
    empresa: "Acme",
    email: "ana@empresa.cl",
    plan: "none",
    message: "línea 1\nlínea 2",
  });
  assert.match(html, /línea 1<br>línea 2/);
});
