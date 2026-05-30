const sendEmail = async (options) => {
  try {
    const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
    if (!BREVO_API_KEY) {
      console.error("missing brevo api key in .env file");
      throw new Error("missing email api key");
    }

    const data = {
      sender: {
        name: "Real Estate App",
        email: process.env.EMAIL_USER,
      },
      to: [{ email: options.email }],
      subject: options.subject,
      htmlContent: options.message,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("email sent successfully via Brevo", result.messageId);
    } else {
      console.log("brevo api key error", result);
      throw new Error(result.message || "could not send email via brevo");
    }
  } catch (error) {
  console.error("brevo email error", error.message);
  throw new Error(error.message || "could not send email via brevo");
}
};

export default sendEmail;
