const test = require("node:test");
const assert = require("node:assert/strict");
const { getTransporter, resetTransporterCache } = require("../transporter");

test.beforeEach(() => {
  resetTransporterCache();
});

test("getTransporter invoca la factory solo una vez entre llamadas (warm start)", () => {
  let calls = 0;
  const factory = () => {
    calls += 1;
    return { id: calls };
  };

  const first = getTransporter(factory);
  const second = getTransporter(factory);

  assert.equal(calls, 1);
  assert.equal(first, second);
});

test("resetTransporterCache fuerza a crear una nueva instancia", () => {
  let calls = 0;
  const factory = () => {
    calls += 1;
    return { id: calls };
  };

  const first = getTransporter(factory);
  resetTransporterCache();
  const second = getTransporter(factory);

  assert.equal(calls, 2);
  assert.notEqual(first, second);
});
