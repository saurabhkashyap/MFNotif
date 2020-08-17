const moment = require("moment");
const QueryHandler = require("./query-handler");
const CONSTANTS = require("../utils/constants");
const notifyCustomerQueue = require("../queues/notify-customer");


class OrderHandler {

	getOrderListParams() {
		return [
			{ type: "string", value: "seller_id" },
			{ type: "string", value: "product_id" },
		];
	}
	async getOrderList(requestData, headers) {
		const { sequelize } = headers;

		const sellerId = requestData.seller_id;
		const productId = requestData.product_id;

		const orderList = await QueryHandler.getOrderListOfAProduct(sequelize.orders, sellerId, productId);
		const requiredData = orderList.map(data => {
			return {
				order_id: data.id,
				product_name: data.product_name,
				customer_id: data.customer_id,
				customer_name: data.customer_name,
				paid_amount: data.paid_amount,
				order_status: data.current_order_status,
				notification_status: data.notification_status,
				notification_type: data.notification_type,
				order_placed_on: moment(data.created_at).format("YYYY-MM-DD hh:mm:ss")
			};
		});
		return {
			error: false,
			message: "",
			data: requiredData
		};
	}

	getOrderDetailsParams() {
		return [
			{ type: "string", value: "order_id" }
		];
	}
	async getOrderDetails(requestData, headers) {
		const { sequelize } = headers;
		const orderId = requestData.order_id;

		const orderDetails = await QueryHandler.getOrderDetails(sequelize.orders, orderId);
		if(!orderDetails) {
			return {
				error: true,
				message: "order details not existed for this id",
				error_code: CONSTANTS.ORDER_NOT_EXISTED
			};
		}

		return {
			error: false,
			message: "",
			data: {
				order_id: orderDetails.id,
				seller_id: orderDetails.seller_id,
				product_id: orderDetails.product_id,
				product_name: orderDetails.product_name,
				customer_id: orderDetails.customer_id,
				customer_name: orderDetails.customer_name,
				paid_amount: orderDetails.paid_amount,
				order_status: orderDetails.current_order_status,
				notification_status: orderDetails.notification_status,
				notification_type: orderDetails.notification_type,
				order_placed_on: moment(orderDetails.created_at).format("YYYY-MM-DD hh:mm:ss")
			}
		};
	}

	updateOrderStatusParams() {
		return [
			{ type: "string", value: "order_id" },
			{ type: "string", value: "order_status" }
		];
	}
	async updateOrderStatus(requestData, headers) {
		const { sequelize } = headers;
		const orderId = requestData.order_id;
		const orderStatus = requestData.order_status;

		const orderDetails = await QueryHandler.getOrderDetails(sequelize.orders, orderId);
		if(!orderDetails) {
			return {
				error: true,
				message: "order details not existed for this id",
				error_code: CONSTANTS.ORDER_NOT_EXISTED
			};
		}

		const jobData = {
			method: orderDetails.notification_type,
			type: "",
			text: "",
			recipient: (orderDetails.notification_type === "email"? orderDetails.customer_email : orderDetails.customer_mobile_number),
			subject: ""
		};


		if (orderStatus.toUpperCase() === CONSTANTS.ORDER_PLACED) {
			jobData.type = "Order Placed";
			jobData.subject = `Order No ${orderId} has been Placed`;
			jobData.text = `Your ${orderDetails.product_name} order has been placed - Your order number is ${orderId}`;
		} else if (orderStatus.toUpperCase() === CONSTANTS.ORDER_PACKED) {
			jobData.type = "Order Packed";
			jobData.subject = `Order No ${orderId} has been Packed`;
			jobData.text = `Your Order No ${orderId} (${orderDetails.product_name}) has been packed`;
		} else if (orderStatus.toUpperCase() === CONSTANTS.ORDER_SHIPPED) {
			jobData.type = "Order Shipped";
			jobData.subject = `Order No ${orderId} has been shipped`;
			jobData.text = `Your Order No ${orderId} (${orderDetails.product_name}) has been shipped`;
		} else if (orderStatus.toUpperCase() === CONSTANTS.ORDER_CANCELLED) {
			jobData.type = "Order Cancelled";
			jobData.subject = `Order No ${orderId} has been cancelled`;
			jobData.text = `Your Order No ${orderId} (${orderDetails.product_name}) has been cancelled`;
		} else {
			return {
				error: true,
				message: "Invalid Event Type"
			}
		}

		await Promise.all([
			QueryHandler.updateOrderDetails(sequelize.orders, orderId, { current_order_status: orderStatus }),
			QueryHandler.updateOrderStatus(sequelize.orders, orderId, orderStatus)
		]);

		if(orderDetails.notification_status === 1 && orderDetails.notification_type) {
			notifyCustomerQueue.add(jobData);
		}

		return {
			error: false,
			message: "Successfully Updated"
		};
	}

	updateOrderNotificationStatusParams() {
		return [
			{ type: "string", value: "order_id" },
			{ type: "int", value: "notification_status" },
			{ type: "string", value: "notification_type" },
		];
	}
	async updateOrderNotificationStatus(requestData, headers) {
		const { sequelize } = headers;
		const orderId = requestData.order_id;
		const notificationStatus = requestData.notification_status;
		const notificationType = requestData.notification_type;

		await QueryHandler.updateOrderDetails(sequelize.orders, orderId, {
			notification_status: notificationStatus,
			notification_type: notificationType
		});

		return {
			error: false,
			message: "Successfully updated"
		};
	}
}

module.exports = new OrderHandler();