const twilio = require('twilio');

class TwilioClient {
	constructor() {
		this.accountSid = process.env.TWILIO_ACCOUNT_SID;
		this.authToken = process.env.TWILIO_AUTH_TOKEN;
		this.twilioNumber = process.env.TWILIO_NUMBER;
		this.twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

		this.client = twilio(this.accountSid, this.authToken);
	}
	async sendShortMessage(msgTo, msgBody) {
		return this.client
			.messages
			.create({
				from: this.twilioNumber,
				to: msgTo,
				body: msgBody
			}).then(message => {
				console.log(message);
				return true;
			}).catch(err=> {
				console.log(err);
				return false;
			});
	}
	sendWhatsAppMessage(msgTo, msgBody) {
		this.client
			.messages
			.create({
				from: `whatsapp:${this.twilioWhatsAppNumber}`,
				to: `whatsapp:${msgTo}`,
				body: msgBody
			}).then(message => {
				console.log(message);
				return true;
			}).catch(err=> {
				console.log(err);
				return false;
			});
	}
}

module.exports = new TwilioClient();