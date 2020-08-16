const CONSTANTS = require("../utils/constants");

module.exports = (fn) => (request, response, next) => {
	let body = (request.method === "POST" ? request.body : (request.method === "GET" ? request.query : {}));
	body = Object.assign(body, request.params);
	const headers = request.headers;

	return fn(body, headers)
		.then(data => response.status(CONSTANTS.SERVER_OK_HTTP_CODE).json(data))
		.catch((e) => {
			if (e.response) {
				e.status = e.response.status;
			}
			next(e);
		});
};
