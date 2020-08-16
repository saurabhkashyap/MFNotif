const sgMail = require("@sendgrid/mail");

class SendGridClient {
	constructor() {
		this.msgFrom = process.env.SENDGRID_SENDER_EMAIL || "tarakeswararao.marla@gmail.com";
		sgMail.setApiKey(process.env.SENDGRID_API_KEY || "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");
	}
	async sendEmail(msgTo, subject, text, html) {
		return sgMail
			.send({
				from: this.msgFrom,
				to: msgTo,
				subject,
				text,
				html
			});
	}
}

module.exports = new SendGridClient();
