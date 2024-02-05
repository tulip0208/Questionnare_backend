module.exports = (sequelize, Sequelize) => {
    const notification = sequelize.define("notification", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.INTEGER,
      }
    });
  
    return notification;
  };
  