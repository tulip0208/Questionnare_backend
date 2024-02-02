module.exports = (sequelize, Sequelize) => {
    const store = sequelize.define("store", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      store_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      store_business_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionnare_url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    });
  
    return store;
  };
  