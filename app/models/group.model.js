module.exports = (sequelize, Sequelize) => {
  const group = sequelize.define("group", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

  });

  return group;
};
