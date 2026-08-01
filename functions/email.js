const PLAN_LABELS = {
  gema: "GEMA — Marketing Automatizado",
  eri: "ERI — Agente IA de Ventas",
  suite: "Plan PLAI Suite (GEMA + ERI)",
  none: "Aún no lo tiene claro",
};

function planLabel(plan) {
  return PLAN_LABELS[plan] || "Aún no lo tiene claro";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailText({ name, empresa, email, plan, message }) {
  return `Nuevo lead desde el formulario "Agenda tu demo" de plai.cl\n\nNombre: ${name}\nEmpresa: ${empresa || "—"}\nEmail: ${email}\nProducto de interés: ${planLabel(plan)}\n\nMensaje:\n${message || "—"}\n\nResponder: mailto:${email}`;
}

function buildEmailHtml({ name, empresa, email, plan, message }) {
  const safe = {
    name: escapeHtml(name),
    empresa: escapeHtml(empresa || "—"),
    email: escapeHtml(email),
    plan: escapeHtml(planLabel(plan)),
    message: escapeHtml(message || "—").replace(/\n/g, "<br>"),
  };
  const replySubject = encodeURIComponent(`Re: tu demo PLAI`);
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${replySubject}`;

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background-color:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#0064ff,#00a7ff);padding:24px 32px;">
                <p style="margin:0;color:#ffffff;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;opacity:0.85;">Nuevo lead · plai.cl</p>
                <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;font-weight:800;">Agenda tu demo gratuita</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <span style="display:inline-block;background-color:#0064ff1a;color:#0064ff;font-size:12px;font-weight:700;padding:6px 12px;border-radius:999px;">${safe.plan}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#8a8a94;font-size:13px;width:110px;vertical-align:top;">Nombre</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#1b004f;font-size:14px;font-weight:600;">${safe.name}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#8a8a94;font-size:13px;vertical-align:top;">Empresa</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#1b004f;font-size:14px;">${safe.empresa}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;color:#8a8a94;font-size:13px;vertical-align:top;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #eef0f3;font-size:14px;"><a href="mailto:${safe.email}" style="color:#0064ff;text-decoration:none;font-weight:600;">${safe.email}</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 0;">
                <p style="margin:0 0 6px;color:#8a8a94;font-size:13px;">Mensaje</p>
                <p style="margin:0;color:#393841;font-size:14px;line-height:1.6;background-color:#f9fafb;border-radius:12px;padding:14px 16px;">${safe.message}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px;">
                <a href="${replyHref}" style="display:inline-block;background-color:#0064ff;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:10px;">Responder al lead →</a>
                <p style="margin:16px 0 0;color:#b3b3ba;font-size:12px;">Compromiso: responder en menos de 24 horas.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

module.exports = { PLAN_LABELS, planLabel, escapeHtml, buildEmailText, buildEmailHtml };
