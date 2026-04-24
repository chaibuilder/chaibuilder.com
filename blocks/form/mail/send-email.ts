import { Autosend } from "autosendjs";

const AUTOSEND_API_KEY = process.env.AUTOSEND_API_KEY!;

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  if (!AUTOSEND_API_KEY) {
    throw new Error("Autosend API key not configured");
  }
  const autosend = new Autosend(AUTOSEND_API_KEY);

  return await autosend.emails.send({
    from: { email: `no-reply@chaibuilder.app`, name: "Chaibuilder" },
    to: { email: to, name: to },
    subject: subject,
    html: html,
  });
};
