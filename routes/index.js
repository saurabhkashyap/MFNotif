const RouteHandler = require("../handlers/route-handler");

const TestRouter = require("./test-router");
const OrderRouter = require("./order-router");

class Routes {
	constructor(app) {
		this.app = app;
	}
	appRoutes() {
		this.app.use("/test", TestRouter.getRouter());
		this.app.use("/order", OrderRouter.getRouter());
		this.app.use("*", RouteHandler.routeNotFoundHandler);
		this.app.use(RouteHandler.errorHandler);
	}
	includeRoutes() {
		this.appRoutes();
	}
}

module.exports = Routes;