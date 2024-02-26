module.exports = (sequelize, Sequelize) => {
    const review1 = sequelize.define("review1", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      question_nos: {
        type: Sequelize.STRING
      },
      question_names: {
        type: Sequelize.STRING
      },
      answers: {
        type: Sequelize.STRING
      },
      //read state
      readState: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1]]
        }
      },
      //store info
      store_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_business_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_questionnare_url:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return review1;
  };
  