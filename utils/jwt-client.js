const jwt = require("jsonwebtoken");
const { privateCert, publicCert, jwtIssuer } = require("../config/keys");

class JWTClient {
	constructor() {}

	genJwtToken(payload) {
		return new Promise((resolve, reject) =>
			jwt.sign(
				{...payload},
				privateCert,
				{
					algorithm: 'RS256',
					expiresIn: '1d',
					issuer: jwtIssuer
				}, (err, token) => {
					if (err) return reject(new Error('Error while generating Jwt Token'));
					return resolve(token);
				}
			));
	}

	verifyJWTToken(token) {
		return new Promise((resolve, reject) =>
			jwt.verify(
				token,
				publicCert,
				{
					algorithm: 'RS256',
					issuer: jwtIssuer
				}, (err, decoded) => {
					if (err) return reject(err);
					return resolve(decoded);
				}
			));
	}
}

module.exports = new JWTClient();