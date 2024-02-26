module.exports = (sequelize, Sequelize) => {
  const papersetting = sequelize.define("papersetting", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    select_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    question_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    question_no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    question_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    select1: {
      type: Sequelize.STRING,
    },
    select2: {
      type: Sequelize.STRING,
    },
    connect: {
      type: Sequelize.STRING,
    },
    require: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }

  });

  // Define hook before saving
  papersetting.beforeCreate(async (instance, options) => {
    const existingData = await papersetting.findOne({ where: { question_no: { [Sequelize.Op.like]: 'Q1' }, group_id: instance.dataValues.group_id } });
    if (instance.dataValues.question_no === 'Q1' && existingData) {
      throw new Error("Data with prefix 'Q1' already exists.");
    }
    else return true;
  });

  return papersetting;
};
