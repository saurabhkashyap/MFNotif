const express = require("express");

const OrderHandler = require("../handlers/order-handler");
const catchErrors = require("../middlewares/catch-errors");
const paramsValidator = require("../middlewares/params-validator");

class OrderRouter {
	constructor() {
		this.router = express.Router();
	}

	orderRoutes() {
		this.router.get(
			"/list",
			paramsValidator(OrderHandler.getOrderListParams()),
			catchErrors(OrderHandler.getOrderList)
		);

		this.router.get(
			"/details",
			paramsValidator(OrderHandler.getOrderDetailsParams()),
			catchErrors(OrderHandler.getOrderDetails)
		);

		this.router.post(
			"/update-status",
			paramsValidator(OrderHandler.updateOrderStatusParams()),
			catchErrors(OrderHandler.updateOrderStatus)
		);

		this.router.post(
			"/update-notification-status",
			paramsValidator(OrderHandler.updateOrderNotificationStatusParams()),
			catchErrors(OrderHandler.updateOrderNotificationStatus)
		);
	}

	getRouter() {
		this.orderRoutes();
		return this.router;
	}
}

module.exports = new OrderRouter();