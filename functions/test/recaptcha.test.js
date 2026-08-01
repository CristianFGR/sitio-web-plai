const test = require("node:test");
const assert = require("node:assert/strict");
const { verifyRecaptcha } = require("../recaptcha");

function fakeFetch(response, { ok = true, throws = false } = {}) {
  return async () => {
    if (throws) throw new Error("network down");
    return { ok, json: async () => response };
  };
}

test("verifyRecaptcha acepta un token válido con score suficiente", async () => {
  const result = await verifyRecaptcha({
    token: "tok",
    secret: "sec",
    expectedAction: "contact_demo",
    minScore: 0.5,
    fetchImpl: fakeFetch({ success: true, score: 0.9, action: "contact_demo" }),
  });
  assert.deepEqual(result, { ok: true, score: 0.9 });
});

test("verifyRecaptcha rechaza cuando Google responde success: false", async () => {
  const result = await verifyRecaptcha({
    token: "tok",
    secret: "sec",
    expectedAction: "contact_demo",
    minScore: 0.5,
    fetchImpl: fakeFetch({ success: false, "error-codes": ["timeout-or-duplicate"] }),
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "timeout-or-duplicate");
});

test("verifyRecaptcha rechaza cuando la acción no coincide", () => {
  return verifyRecaptcha({
    token: "tok",
    secret: "sec",
    expectedAction: "contact_demo",
    minScore: 0.5,
    fetchImpl: fakeFetch({ success: true, score: 0.9, action: "otra_accion" }),
  }).then((result) => {
    assert.equal(result.ok, false);
    assert.equal(result.reason, "action_mismatch:otra_accion");
  });
});

test("verifyRecaptcha rechaza cuando el score es menor al umbral", async () => {
  const result = await verifyRecaptcha({
    token: "tok",
    secret: "sec",
    expectedAction: "contact_demo",
    minScore: 0.5,
    fetchImpl: fakeFetch({ success: true, score: 0.2, action: "contact_demo" }),
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "low_score");
});

test("verifyRecaptcha rechaza sin lanzar cuando falla la red", async () => {
  const result = await verifyRecaptcha({
    token: "tok",
    secret: "sec",
    expectedAction: "contact_demo",
    minScore: 0.5,
    fetchImpl: fakeFetch({}, { throws: true }),
  });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "network_error");
});
