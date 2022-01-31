import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface, Sequelize: typeof DataTypes) => {
    return queryInterface.createTable('cakes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      name: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.TEXT
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      yumFactor: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('cakes');
  }
};