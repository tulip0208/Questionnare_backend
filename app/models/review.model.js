module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      happy: {
        type: Sequelize.STRING,
        comment: "1: 満足  2: いくつかの苦情",
        validate: {
          isIn: [["満足", "いくつかの苦情"]]
        }
      },
      //happy point
      sex: {
        type: Sequelize.STRING, 
        comment: "1: 男性, 2: 女性, 3: その他, 4: 回答しない",
        validate: {
          isIn: [["男性", "女性", "その他", "回答しない"]]
        }
      },
      age: {
        type: Sequelize.STRING, 
        comment: "1: 10代以下, 2: 20代, 3: 30代, 4: 40代, 5: 50代, 6: 60代以上",
        validate: {
          isIn: [["10代以下", "20代", "30代", "40代", "50代", "60代以上"]]
        }
      },
      sex_doctor: {
        type: Sequelize.STRING,
        comment: "1: 男性, 2: 女性",
        validate: {
          isIn: [["男性", "女性"]]
        }
      },
      age_doctor: {
        type: Sequelize.STRING,
        comment: "1: 10代以下, 2: 20代, 3: 30代, 4: 40代, 5: 50代, 6: 60代以上",
        validate: {
          isIn: [["10代以下", "20代", "30代", "40代", "50代", "60代以上"]]
        }
      },
      stage_today: {
        type: Sequelize.STRING,
        comment: "1: 通りすがりで気になって, 2: 近所, 3: 食べログ, 4: Instagram, 5: Twitter, 6: Google Mapsの検索, 7: Googleのクチコミ, 8: 広告, 9: 知人からの紹介, 10: その他",
        validate: {
          isIn: [["通りすがりで気になって", "近所", "食べログ", "Instagram", "Twitter", "Google Mapsの検索", "Googleのクチコミ", "広告", "知人からの紹介", "その他"]]
        }
      },

      //no happy point
      cure: {
        type: Sequelize.STRING,
        comment: "1: かなり良い, 2: 良い, 3: 普通, 4: 良くない, 5: 悪い",
        validate: {
          isIn: [["かなり良い", "良い", "普通", "良くない", "悪い"]]
        }
      },
      waiter: {
        type: Sequelize.STRING,
        comment: "1: かなり良い, 2: 良い, 3: 普通, 4: 良くない, 5: 悪い",
        validate: {
          isIn: [["かなり良い", "良い", "普通", "良くない", "悪い"]]
        }
      },
      technical: {
        type: Sequelize.STRING,
        comment: "1: かなり良い, 2: 良い, 3: 普通, 4: 良くない, 5: 悪い",
        validate: {
          isIn: [["かなり良い", "良い", "普通", "良くない", "悪い"]]
        }
      },
      pointer: {
        type: Sequelize.STRING,
        comment: "ユーザーが望むポイントを保管してください。"
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
  
    return review;
  };
  