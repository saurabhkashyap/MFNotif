const CONSTANTS = require("../utils/constants");

class RouteHandler {
	routeNotFoundHandler(request, response, next) {
		response.status(CONSTANTS.SERVER_NOT_FOUND_HTTP_CODE).json({
			error: true,
			message: CONSTANTS.ROUTE_NOT_FOUND,
			errorCode: CONSTANTS.ROUTE_NOT_FOUND
		});
	}
	errorHandler(error, request, response, next) {
		response.status(error.status || CONSTANTS.SERVER_INTERNAL_ERROR_HTTP_CODE).json({
			error: true,
			message: error.message || CONSTANTS.INTERNAL_SERVER_ERROR,
			errorCode: error.error_code || CONSTANTS.INTERNAL_SERVER_ERROR
		});
	}
}

module.exports = new RouteHandler();