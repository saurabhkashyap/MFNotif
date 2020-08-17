const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(`${__dirname}/`, 'rsa_private.pem');
const publicKeyPath = path.join(`${__dirname}/`, 'rsa_public.pem');

const privateCert = fs.readFileSync(privateKeyPath);
const publicCert = fs.readFileSync(publicKeyPath);

const jwtIssuer = process.env.JWT_ISSUER;

module.exports = {
	privateCert,
	publicCert,
	jwtIssuer
};