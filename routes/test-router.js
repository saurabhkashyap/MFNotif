const express = require("express");

const TestHandler = require("../handlers/test-handler");
const catchErrors = require("../middlewares/catch-errors");

class TestRouter {
	constructor() {
		this.router = express.Router();
	}

	testRoutes() {
		this.router.post("/sms", catchErrors(TestHandler.sendSMS));
		this.router.post("/email", catchErrors(TestHandler.sendEmail));
		this.router.post("/whatsapp", catchErrors(TestHandler.sendWhatsAppMsg));
	}

	getRouter() {
		this.testRoutes();

		return this.router;
	}
}

module.exports = new TestRouter();