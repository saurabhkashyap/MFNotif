class OrderHandler {
	async getOrderList(requestData, headers) {
		return {
			error: false,
			message: "",
			data: []
		};
	}
	async getOrderDetails(requestData, headers) {
		return {
			error: false,
			message: "",
			data: {}
		}
	}
	async updateOrderState(requestData, headers) {
		return {
			error: false,
			message: "Successfully Updated"
		}
	}
}

module.exports = new OrderHandler();