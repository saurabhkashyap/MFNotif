const md5 = require("md5");
const moment = require("moment");
const QueryHandler = require("./query-handler");
const { genJwtToken } = require("../utils/jwt-client");

class AuthHandler {
	loginSellerParams() {
		return [
			{ type: "string", value: "username" },
			{ type: "string", value: "password" }
		];
	}
	async loginSeller(requestData, headers) {
		const { sequelize } = headers;
		const { username, password } = requestData;
		const passwordHash = md5(password);

		const sellerData = await QueryHandler.getSellerDetails(sequelize.orders, {
			username,
			password: passwordHash
		});
		if(!sellerData) {
			return {
				error: true,
				message: "Invalid Credentials"
			};
		}

		const lastLogin = moment().format("YYYY-MM-DD hh:mm:ss");
		const jwtToken = await genJwtToken({
			seller_id: sellerData.id,
			last_login: lastLogin
		});

		await QueryHandler.updateSellerDetails(sequelize.orders, sellerData.id, {
			last_login: lastLogin
		});

		return {
			error: false,
			message: "",
			data: {
				seller_id: sellerData.id,
				token: jwtToken
			}
		};
	}
}

module.exports = new AuthHandler();