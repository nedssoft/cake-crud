import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.createTable('deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      symbol: {
        type: Sequelize.STRING
      },
      base_qty: {
        type: Sequelize.DECIMAL,
      },
      safety_qty: {
        type: Sequelize.DECIMAL,
      },
      safety_count: {
        type: Sequelize.INTEGER,
      },
      take_profit: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      ss: {
        type: Sequelize.DECIMAL, //step scale
      },
      vs: {
        type: Sequelize.DECIMAL, // volume scale
      },
      leverage: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'open', // open, closed
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.dropTable('deals');
  }
};