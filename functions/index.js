const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const { planLabel, buildEmailText, buildEmailHtml } = require("./email");
const { verifyRecaptcha } = require("./recaptcha");
const { isValidEmail } = require("./validation");
const { getTransporter } = require("./transporter");

const smtpUser = defineSecret("SMTP_USER");
const smtpPass = defineSecret("SMTP_PASS");
const recaptchaSecret = defineSecret("RECAPTCHA_SECRET");

const DEST_EMAIL = "plai@plai.cl";
const RECAPTCHA_ACTION = "contact_demo";
const RECAPTCHA_MIN_SCORE = 0.5;

exports.contactoDemo = onRequest(
  { region: "us-central1", secrets: [smtpUser, smtpPass, recaptchaSecret] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    const { name, empresa, email, plan, message, recaptchaToken } = req.body || {};
    if (!name || !email) {
      res.status(400).json({ ok: false, error: "Faltan campos requeridos: name, email" });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ ok: false, error: "El email no tiene un formato válido" });
      return;
    }

    if (!recaptchaToken) {
      res.status(400).json({ ok: false, error: "Falta verificación anti-spam" });
      return;
    }

    const verification = await verifyRecaptcha({
      token: recaptchaToken,
      secret: recaptchaSecret.value(),
      expectedAction: RECAPTCHA_ACTION,
      minScore: RECAPTCHA_MIN_SCORE,
      remoteIp: req.ip,
    });
    if (!verification.ok) {
      console.warn("reCAPTCHA rechazado", verification.reason, verification.score);
      res.status(403).json({ ok: false, error: "Verificación anti-spam falló" });
      return;
    }

    const transporter = getTransporter(() =>
      nodemailer.createTransport({
        service: "gmail",
        auth: { user: smtpUser.value(), pass: smtpPass.value() },
      })
    );

    try {
      await transporter.sendMail({
        from: `"Formulario plai.cl" <${smtpUser.value()}>`,
        to: DEST_EMAIL,
        replyTo: email,
        subject: `Demo PLAI — ${planLabel(plan)} — ${name}`,
        text: buildEmailText({ name, empresa, email, plan, message }),
        html: buildEmailHtml({ name, empresa, email, plan, message }),
      });
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Error enviando email de contacto", err);
      res.status(502).json({ ok: false, error: "No se pudo enviar el correo" });
    }
  }
);
