import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TEAM_EMAIL = 'siddharthgadhia@pocketed.in';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, role, message } = body;

    if (!fullName || !email || !role || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtppro.zoho.in',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.ZOHO_EMAIL_USER || TEAM_EMAIL,
        pass: process.env.ZOHO_EMAIL_PASS,
      },
    });

    const firstName = fullName.split(' ')[0];
    const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

    // ── 1. Internal notification email to the PocketEd team ──
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
    const roleColors: Record<string, { bg: string; text: string; border: string }> = {
      student: { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' },
      parent:  { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff' },
      school:  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0' },
    };
    const roleStyle = roleColors[role] || { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };

    const internalMail = {
      from: `"PocketEd Website" <${process.env.ZOHO_EMAIL_USER || TEAM_EMAIL}>`,
      to: TEAM_EMAIL,
      subject: `📬 New Enquiry from ${fullName} (${roleLabel})`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>New Enquiry</title></head>
<body style="margin:0;padding:24px 16px;background:#f1f5f9;font-family:'Helvetica Neue',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;">

    <!-- HEADER -->
    <tr><td>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#014aac 0%,#0260d4 60%,#0284c7 100%);border-radius:20px 20px 0 0;overflow:hidden;">
        <tr>
          <td style="padding:36px 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:12px;padding:8px 14px;margin-bottom:14px;">
                    <span style="color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">📬 New Enquiry</span>
                  </div>
                  <h1 style="margin:0 0 6px;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">Someone wants to connect!</h1>
                  <p style="margin:0;color:rgba(255,255,255,0.72);font-size:13.5px;">Received on ${now} IST via pocketed.in</p>
                </td>
                <td width="72" style="vertical-align:top;text-align:right;">
                  <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-block;line-height:56px;text-align:center;font-size:24px;">
                    ✉️
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Decorative wave bar -->
        <tr><td style="height:6px;background:linear-gradient(90deg,#ffd21f 0%,#facc15 50%,#fbbf24 100%);"></td></tr>
      </table>
    </td></tr>

    <!-- CONTACT DETAILS CARD -->
    <tr><td style="background:#ffffff;padding:32px 40px 24px;">
      <p style="margin:0 0 20px;font-size:11px;font-weight:700;color:#94a3b8;letter-spacing:1.2px;text-transform:uppercase;">Contact Details</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <!-- Name -->
          <td width="50%" style="padding-right:8px;vertical-align:top;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;">
              <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">👤 Full Name</p>
              <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${fullName}</p>
            </div>
          </td>
          <!-- Role -->
          <td width="50%" style="padding-left:8px;vertical-align:top;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;">
              <p style="margin:0 0 6px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">🎭 Role</p>
              <span style="display:inline-block;padding:4px 14px;background:${roleStyle.bg};color:${roleStyle.text};border:1px solid ${roleStyle.border};border-radius:999px;font-size:13px;font-weight:700;">${roleLabel}</span>
            </div>
          </td>
        </tr>
        <tr><td colspan="2" style="padding-top:12px;">
          <!-- Email -->
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:14px;padding:16px 18px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.8px;">📧 Email Address</p>
            <a href="mailto:${email}" style="font-size:16px;font-weight:700;color:#014aac;text-decoration:none;">${email}</a>
            <span style="display:inline-block;margin-left:10px;font-size:11px;color:#60a5fa;">← Click to reply</span>
          </div>
        </td></tr>
      </table>
    </td></tr>

    <!-- MESSAGE CARD -->
    <tr><td style="background:#ffffff;padding:0 40px 32px;">
      <div style="border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;">
        <div style="background:linear-gradient(90deg,#f8fafc,#f1f5f9);padding:14px 20px;border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-size:11px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1px;">💬 Message</p>
        </div>
        <div style="background:#ffffff;padding:20px;">
          <p style="margin:0;font-size:15px;color:#334155;line-height:1.85;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
    </td></tr>

    <!-- CTA BUTTON -->
    <tr><td style="background:#ffffff;padding:0 40px 36px;text-align:center;">
      <a href="mailto:${email}?subject=Re: Your PocketEd Enquiry" style="display:inline-block;background:linear-gradient(135deg,#014aac,#0369d1);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:999px;letter-spacing:0.2px;">
        ↩ &nbsp;Reply to ${firstName}
      </a>
    </td></tr>

    <!-- FOOTER -->
    <tr><td style="background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 20px 20px;padding:20px 40px;text-align:center;">
      <p style="margin:0 0 4px;font-size:12px;color:#64748b;font-weight:600;">PocketEd — Internal Notification</p>
      <p style="margin:0;font-size:11px;color:#94a3b8;">This message was automatically generated from the contact form on your website.</p>
    </td></tr>

  </table>
</body>
</html>
      `,
      replyTo: email,
    };

    // ── 2. Warm acknowledgment email back to the user ──
    const acknowledgmentMail = {
      from: `"Team PocketEd" <${process.env.ZOHO_EMAIL_USER || TEAM_EMAIL}>`,
      to: email,
      subject: `Thanks for reaching out, ${firstName}! 👋`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
          <div style="background:linear-gradient(135deg,#014aac 0%,#0369d1 100%);padding:36px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:28px;margin-bottom:12px;">✉️</div>
            <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.4px;">We got your message!</h1>
          </div>
          <div style="padding:36px 32px;">
            <p style="margin:0 0 16px;font-size:16px;color:#111827;line-height:1.7;">Hi <strong>${firstName}</strong>,</p>
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.8;">
              Thanks so much for reaching out! 🙌 We've received your enquiry and really appreciate you taking the time to get in touch with us.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.8;">
              Our team is already on it — we'll review your message and get back to you as soon as possible, usually within 1–2 business days.
            </p>
            <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.8;">
              In the meantime, if there's anything else you'd like to add or if something changes, just hit reply — we're always listening. 😊
            </p>

            <!-- Divider -->
            <div style="border-top:1px solid #f3f4f6;margin:0 0 24px;"></div>

            <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">
              Warm regards,<br/>
              <strong style="color:#014aac;font-size:16px;">Team PocketEd</strong><br/>
              <span style="font-size:13px;color:#9ca3af;">Making financial literacy simple &amp; accessible</span>
            </p>
          </div>
          <div style="background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              This is an automated confirmation. Please don't hesitate to reply if you have further questions.
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(internalMail),
      transporter.sendMail(acknowledgmentMail),
    ]);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email. Ensure EMAIL_PASS is set properly.' }, { status: 500 });
  }
}
