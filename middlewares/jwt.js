const JWTClient = require("../utils/jwt-client");
const { isError } = require("../utils/supporter");
const CONSTANTS = require("../utils/constants");

const re = /(\S+)\s+(\S+)/;

const AUTH_HEADER = "authorization";
const BEARER_AUTH_SCHEME = "bearer";

function parseAuthHeader(hdrValue) {
	if (typeof hdrValue !== "string") {
		return null;
	}
	const matches = hdrValue.match(re);
	return matches && { scheme: matches[1], value: matches[2] };
}

function getJwtTokenFromRequest(request) {
	let token = null;
	if(request.headers[AUTH_HEADER]) {
		const authParams = parseAuthHeader(request.headers[AUTH_HEADER]);
		if (authParams && BEARER_AUTH_SCHEME === authParams.scheme.toLowerCase()) {
			token = authParams.value;
		}
	}
	return token;
}

class JWT {
	async validateToken(req, res, next) {
		const token = getJwtTokenFromRequest(req);
		if(!token) {
			const error = new Error("Jwt token is missing");
			error.status = CONSTANTS.SERVER_UNAUTHORIZED_CODE;
			return next(error);
		}
		console.log(token);
		const payload = await JWTClient.verifyJWTToken(token).catch(err => err);
		console.log(payload);
		if(isError(payload)) {
			const error = new Error("Jwt not valid anymore");
			error.status = CONSTANTS.SERVER_UNAUTHORIZED_CODE;
			return next(error);
		}
		req.headers.payload = payload;

		next();
	}
}

module.exports = new JWT();