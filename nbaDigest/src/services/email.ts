import { Resend } from 'resend';
import { Subscriber, AppError } from '../types/index';

export async function sendDigestEmail(subscriber: Subscriber, htmlContent: string, dateStr: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new AppError('RESEND_API_KEY is not defined in environment variables');
  }

  const resend = new Resend(apiKey);
  
  try {
    const { error } = await resend.emails.send({
      from: 'NBA Digest <onboarding@resend.dev>', // Resend testing domain
      to: subscriber.email,
      subject: `🏀 NBA Digest — ${dateStr}`,
      html: htmlContent,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    // We log the error but do not throw, so the job can continue with the next subscriber
    console.error(`[Error] Failed to send email to ${subscriber.email}:`, error.message);
  }
}
