module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      useremail: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      permits: {
        type: Sequelize.INTEGER, //1: Admin, 2: user
      }
    });
  
    return user;
};