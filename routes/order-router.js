const express = require("express");

const OrderHandler = require("../handlers/order-handler");
const catchErrors = require("../middlewares/catch-errors");

class OrderRouter {
	constructor() {
		this.router = express.Router();
	}

	orderRoutes() {
		this.router.get("/list", catchErrors(OrderHandler.getOrderList));
		this.router.get("/details", catchErrors(OrderHandler.getOrderDetails));
		this.router.post("/update-status", catchErrors(OrderHandler.updateOrderState));
	}

	getRouter() {
		this.orderRoutes();
		return this.router;
	}
}

module.exports = new OrderRouter();