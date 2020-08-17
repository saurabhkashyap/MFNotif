const Queue = require("bull");

const TwilioClient = require("../utils/twilio-client");
const SendGridClient = require("../utils/sendgrid-client");
const CONSTANTS = require("../utils/constants");

const notifyCustomerQueue = new Queue("notify-customer", {
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD
	}
});

const sendEmail = async (jobData)=> {
	const { recipient, subject, text, html, sender } = jobData;
	await SendGridClient.sendEmail(recipient, subject, text, html, sender);
};

const sendSMS = async (jobData)=> {
	const { recipient, text } = jobData;
	await TwilioClient.sendShortMessage(recipient, text);
};

const sendWhatsAppMessage = async (jobData)=> {
	const { recipient, text } = jobData;
	await TwilioClient.sendWhatsAppMessage(recipient, text);
};


notifyCustomerQueue.process(async (job, done)=> {
	const jobData = job.data;
	try {
		if (jobData.method.toUpperCase() === CONSTANTS.EMAIL) {
			await sendEmail(jobData);
		} else if (jobData.method.toUpperCase() === CONSTANTS.SMS) {
			await sendSMS(jobData);
		} else if (jobData.method.toUpperCase() === CONSTANTS.WHATSAPP) {
			await sendWhatsAppMessage(jobData);
		} else {
			return done(new Error("Invalid method to notify customer"));
		}
	} catch (e) {
		return done(e);
	}
	return done();
});

module.exports = notifyCustomerQueue;