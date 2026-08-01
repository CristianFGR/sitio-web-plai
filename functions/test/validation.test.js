const test = require("node:test");
const assert = require("node:assert/strict");
const { isValidEmail } = require("../validation");

test("isValidEmail acepta direcciones bien formadas", () => {
  assert.equal(isValidEmail("ana@empresa.cl"), true);
  assert.equal(isValidEmail("ana.perez+demo@sub.empresa.cl"), true);
});

test("isValidEmail rechaza strings sin formato de email", () => {
  assert.equal(isValidEmail("no-es-un-email"), false);
  assert.equal(isValidEmail("ana@empresa"), false);
  assert.equal(isValidEmail("@empresa.cl"), false);
  assert.equal(isValidEmail("ana@.cl"), false);
  assert.equal(isValidEmail("ana empresa@empresa.cl"), false);
});

test("isValidEmail rechaza valores vacíos o no-string", () => {
  assert.equal(isValidEmail(""), false);
  assert.equal(isValidEmail(undefined), false);
  assert.equal(isValidEmail(null), false);
});
