/* HTTP status codes */
module.exports.SERVER_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;


/* ERROR CODES */
module.exports.MISSING_PARAMETER = "MISSING_PARAMETER";
module.exports.ROUTE_NOT_FOUND = "ROUTE_NOT_FOUND";
module.exports.INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR";
module.exports.SEQUELIZE_ERROR = "SEQUELIZE_ERROR";


/* ORDER Constants */
module.exports.ORDER_PLACED = "ORDER_PLACED";
module.exports.ORDER_PACKED = "ORDER_PACKED";
module.exports.ORDER_SHIPPED = "ORDER_SHIPPED";
module.exports.ORDER_CANCELLED = "ORDER_CANCELLED";

module.exports.ORDER_NOT_EXISTED = "ORDER_NOT_EXISTED";

/* Notification Methods */
module.exports.SMS = "SMS";
module.exports.WHATSAPP = "WHATSAPP";
module.exports.EMAIL = "EMAIL";