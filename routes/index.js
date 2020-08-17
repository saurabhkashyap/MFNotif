const RouteHandler = require("../handlers/route-handler");

// const TestRouter = require("./test-router");
const AuthRouter = require("./auth-router");
const OrderRouter = require("./order-router");
const { validateToken } = require("../middlewares/jwt");

class Routes {
	constructor(app) {
		this.app = app;
	}
	appRoutes() {
		// this.app.use("/test", TestRouter.getRouter());
		this.app.use("/seller", AuthRouter.getRouter());
		this.app.use("/order", validateToken, OrderRouter.getRouter());
		this.app.use("*", RouteHandler.routeNotFoundHandler);
		this.app.use(RouteHandler.errorHandler);
	}
	includeRoutes() {
		this.appRoutes();
	}
}

module.exports = Routes;