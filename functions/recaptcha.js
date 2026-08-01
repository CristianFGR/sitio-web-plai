const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/**
 * Verifica un token de reCAPTCHA v3 contra la API de Google.
 * @param {{token: string, secret: string, expectedAction: string, minScore: number, remoteIp?: string, fetchImpl?: typeof fetch}} params
 * @returns {Promise<{ok: boolean, score?: number, reason?: string}>}
 */
async function verifyRecaptcha({ token, secret, expectedAction, minScore, remoteIp, fetchImpl = fetch }) {
  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp) params.set("remoteip", remoteIp);

  let data;
  try {
    const res = await fetchImpl(VERIFY_URL, { method: "POST", body: params });
    data = await res.json();
  } catch {
    return { ok: false, reason: "network_error" };
  }

  if (!data.success) {
    return { ok: false, reason: (data["error-codes"] || []).join(",") || "verify_failed" };
  }
  if (data.action !== expectedAction) {
    return { ok: false, score: data.score, reason: `action_mismatch:${data.action}` };
  }
  if (typeof data.score !== "number" || data.score < minScore) {
    return { ok: false, score: data.score, reason: "low_score" };
  }

  return { ok: true, score: data.score };
}

module.exports = { verifyRecaptcha };
