/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CustomerOrder', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    seller_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    product_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    customer_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    customer_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    paid_amount: {
      type: "DOUBLE",
      allowNull: false
    },
    current_order_status: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    customer_email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    customer_mobile_number: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    notification_status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    notification_type: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
	  freezeTableName: true,
	  timestamps: false,
	  underscored: true
  });
};
