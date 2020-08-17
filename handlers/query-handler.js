const { getSingleRow, getDataList, createData, updateData } = require("../sequelize/");

class QueryHandler {
	getOrderListOfAProduct(db, sellerId, productId) {
		const where = {
			seller_id: sellerId,
			product_id: productId
		};
		return getDataList(db.CustomerOrder, where);
	}

	getOrderDetails(db, orderId) {
		const where = {
			id : orderId
		};
		return getSingleRow(db.CustomerOrder, where);
	}
	updateOrderDetails(db, orderId, dataToUpdate) {
		const where = {
			id : orderId
		};
		return updateData(db.CustomerOrder, where, dataToUpdate);
	}
	updateOrderStatus(db, orderId, status) {
		const dataToInsert = {
			order_id: orderId,
			status
		};
		return createData(db.OrderStatus, dataToInsert);
	}
}

module.exports = new QueryHandler();