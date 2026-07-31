const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const smtpUser = defineSecret("SMTP_USER");
const smtpPass = defineSecret("SMTP_PASS");

const DEST_EMAIL = "plai@plai.cl";

exports.contactoDemo = onRequest(
  { region: "us-central1", secrets: [smtpUser, smtpPass] },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    const { name, empresa, email, plan, message } = req.body || {};
    if (!name || !email) {
      res.status(400).json({ ok: false, error: "Faltan campos requeridos: name, email" });
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: smtpUser.value(), pass: smtpPass.value() },
    });

    try {
      await transporter.sendMail({
        from: `"Formulario plai.cl" <${smtpUser.value()}>`,
        to: DEST_EMAIL,
        replyTo: email,
        subject: `Demo PLAI — ${plan || "consulta"} — ${name}`,
        text: `Nuevo lead desde el formulario "Agenda tu demo" de plai.cl\n\nNombre: ${name}\nEmpresa: ${empresa || "—"}\nEmail: ${email}\nProducto de interés: ${plan || "—"}\n\nMensaje:\n${message || "—"}`,
      });
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Error enviando email de contacto", err);
      res.status(502).json({ ok: false, error: "No se pudo enviar el correo" });
    }
  }
);
