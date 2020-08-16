const TwilioClient = require("../utils/twilio-client");
const SendGridClient = require("../utils/sendgrid-client");

class TestHandler {
	async sendSMS(requestData, headers) {
		const mobileNumber = requestData.mobile_number;
		const msg = requestData.message;

		await TwilioClient.sendShortMessage(mobileNumber, msg);
	}
	async sendEmail(requestData, headers) {
		const { email, subject, text, html } = requestData;

		await SendGridClient.sendEmail(email, subject, text, html);
	}
	async sendWhatsAppMsg(requestData, headers) {
		const whatsAppNumber = requestData.whatsapp_number;
		const msg = requestData.message;

		await TwilioClient.sendWhatsAppMessage(whatsAppNumber, msg);
	}
}

module.exports = new TestHandler();