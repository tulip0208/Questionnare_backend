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
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      store_url_name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      store_business_url: {
        type: Sequelize.STRING,
        unique: true,
        // validate: {
        //   isUrl: true,
        // }
      },
      store_group_id: {
        type: Sequelize.INTEGER
      },
      questionnare_url: {
        type: Sequelize.STRING,
        unique: true,
        // validate: {
        //   isUrl: true,
        // }
      }
    });
  
    return store;
  };
  