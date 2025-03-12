import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {

  try {
    const { to, subject, text } = await req.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      text,
    });

    return Response.json(
      {
        success: true,
        message: "message sent successfully"
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
