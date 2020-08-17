const express = require("express");

const AuthHandler = require("../handlers/auth-handler");
const paramsValidator = require("../middlewares/params-validator");
const catchErrors = require("../middlewares/catch-errors");

class AuthRouter {
	constructor() {
		this.router = express.Router();
	}

	authRoutes() {
		this.router.post(
			"/login",
			paramsValidator(AuthHandler.loginSellerParams()),
			catchErrors(AuthHandler.loginSeller)
		);
	}

	getRouter() {
		this.authRoutes();

		return this.router;
	}
}

module.exports = new AuthRouter();