import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      deal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'deals',
          key: 'id',
        },
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      pd: {
        type: Sequelize.DECIMAL, // price deviation
      },
      qty: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      side: {
        type: Sequelize.STRING,
        defaultValue: 'Buy', // Buy, Sell
      },
      order_type: {
        type: Sequelize.STRING,
        defaultValue: 'Limit', // Market, Limit
      },
      exchange_uid: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      order_link_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING, // new, filled, cancelled
        defaultValue: 'new',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.dropTable('orders');
  },
};
